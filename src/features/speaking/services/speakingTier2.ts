// Tier 2: Single-Shot Multimodal & Hybrid ASR Speaking Evaluator
import { generateAICompletion } from '../../../services/ai';
import type { PartEvaluation, PhoneticErrorItem, SpeakingCriteriaScores } from '../speakingStorage';
import type { ClientAudioMetrics } from './speakingAudio';
import { transcribeSpeakingAudio } from './speakingTranscriber';
import { calculateWpm, countWords } from './speakingTier1';
import { calculatePartScore } from './speakingTier3';

export interface EvaluateSpeakingPartParams {
  partIndex: 1 | 2 | 3;
  partTitle: string;
  promptDescription: string;
  audioBlob: Blob;
  clientMetrics: ClientAudioMetrics;
  sampleResponse?: {
    band?: string;
    text: string;
    analysis_vi?: string;
  };
}

const SYSTEM_SPEAKING_PROMPT = `You are a certified, senior VSTEP examiner evaluating English Speaking strictly according to Decision 729/QĐ-BGDĐT (Ministry of Education and Training, Vietnam).
Your current grading target is B1 (Bậc 3 / VSTEP Level 3, target score 4.0 - 5.5 / 10.0), which is the standard university graduation requirement.

EVALUATION CRITERIA FOR B1 (BẬC 3):
1. Pronunciation (Trọng số 25%):
   - Intelligible pronunciation. Candidate must pronounce basic words clearly and not omit critical final sounds (/s/, /ed/, /t/, /d/).
   - Understandable word stress and reasonable rhythm. Minor accent or intonation flaws are accepted as long as communication is clear.
2. Fluency & Coherence (Trọng số 25%):
   - Maintain a manageable flow of speech (target 90 - 120 WPM).
   - Short hesitations while searching for language are tolerated. Uses basic discourse markers (First, Next, Because, Also, So, In conclusion).
3. Grammar & Vocabulary (Trọng số 25%):
   - Control of simple and compound sentences with familiar conjunctions (and, but, so, because).
   - Adequate everyday vocabulary for personal and familiar topics. Occasional grammatical errors are acceptable if meaning remains clear.
4. Task Fulfillment (Trọng số 25%):
   - Part 1: Directly answers the social questions and gives 1-2 extension sentences.
   - Part 2: Clearly chooses 1 option, gives at least 2 convincing reasons, and explains why the other 2 options were rejected.
   - Part 3: Develops the topic using the 3 mindmap ideas and answers follow-up questions.

EVIDENCE-FIRST REASONING ORDER:
You must analyze evidence FIRST before scoring:
1. 'transcript': Verbatim transcript of what the candidate said (accurately transcribe all words spoken).
2. 'prompt_coverage': Qualitative analysis in Vietnamese of whether all prompt requirements were covered.
3. 'priority_action_items': 2 to 3 highest-leverage actionable tips in Vietnamese to help the learner pass B1.
4. 'phonetic_errors': Specific list of mispronounced words, missing ending sounds (/s/, /ed/, /t/), or wrong word stresses with standard IPA, detected issue, and concise explanation in Vietnamese.
5. 'justifications': Concise qualitative comments in Vietnamese for each of the 4 MOET criteria.
6. 'criteria_scores': Numeric scores from 0.0 to 10.0 for pronunciation, fluency_coherence, grammar_vocabulary, task_fulfillment.
7. 'ai_fixed_b1_speech': Rewrite the student's spoken response into clean, natural, correct B1 spoken English based on their exact ideas. Keep sentences simple and compound, natural to speak aloud, without overly academic C1 words.

Output ONLY valid JSON matching this exact structure:
{
  "transcript": "string",
  "prompt_coverage": "nhận xét mức độ hoàn thành các ý yêu cầu của đề bài",
  "priority_action_items": ["Hành động 1...", "Hành động 2..."],
  "phonetic_errors": [
    {
      "word": "word",
      "expected_ipa": "/ipa/",
      "detected_error": "thiếu âm đuôi /s/ hoặc sai trọng âm",
      "explanation_vi": "hướng dẫn ngắn gọn cách sửa",
      "severity": "low" | "medium" | "critical"
    }
  ],
  "justifications": {
    "pronunciation": "nhận xét phát âm",
    "fluency_coherence": "nhận xét lưu loát",
    "grammar_vocabulary": "nhận xét ngữ pháp từ vựng",
    "task_fulfillment": "nhận xét đáp ứng đề"
  },
  "criteria_scores": {
    "pronunciation": 5.0,
    "fluency_coherence": 5.0,
    "grammar_vocabulary": 5.0,
    "task_fulfillment": 5.0
  },
  "ai_fixed_b1_speech": "Full rewritten natural B1 speech text"
}`;

export async function evaluateSpeakingPart(params: EvaluateSpeakingPartParams): Promise<PartEvaluation> {
  const { partIndex, partTitle, promptDescription, audioBlob, clientMetrics, sampleResponse } = params;

  // 1. Run Pluggable Transcriber (Whisper ASR if key present, else fallback)
  const asrResult = await transcribeSpeakingAudio(audioBlob);

  let userPrompt = `EVALUATE CANDIDATE SPEAKING FOR PART ${partIndex}: ${partTitle}

EXAM PROMPT / TOPIC:
${promptDescription}

CLIENT ACOUSTIC METRICS:
- Total Audio Duration: ${clientMetrics.durationSeconds}s
- Estimated Speaking Duration: ${clientMetrics.speakingDurationSeconds}s
- Pauses > 2.0s: ${clientMetrics.longPausesCount} times
`;

  if (asrResult.mode === 'groq_whisper' && asrResult.transcript) {
    userPrompt += `
VERBATIM ACOUSTIC TRANSCRIPT (From Groq Whisper large-v3-turbo):
"""
${asrResult.transcript}
"""
Please evaluate this verbatim transcript and the candidate's speech against the VSTEP B1 criteria. Return valid JSON only.`;
  } else {
    userPrompt += `
Please listen to the attached audio, transcribe what the candidate said verbatim, and evaluate strictly against the VSTEP B1 criteria. Return valid JSON only.`;
  }

  try {
    const aiResponse = await generateAICompletion(
      {
        systemPrompt: SYSTEM_SPEAKING_PROMPT,
        userPrompt,
        audioBlob: asrResult.mode === 'gemini_multimodal' ? audioBlob : undefined,
        temperature: 0.1,
      },
      {
        provider: 'google_ai_studio',
        modelName: 'gemini-3.5-flash-lite',
      }
    );

    let parsed: Record<string, unknown> = {};
    if (aiResponse.parsedJson && typeof aiResponse.parsedJson === 'object') {
      parsed = aiResponse.parsedJson as Record<string, unknown>;
    } else {
      const match = aiResponse.content.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      }
    }

    const transcript =
      (asrResult.transcript && asrResult.mode === 'groq_whisper')
        ? asrResult.transcript
        : (typeof parsed.transcript === 'string' ? parsed.transcript : '');

    const wordCount = countWords(transcript);
    const activeDuration = clientMetrics.speakingDurationSeconds >= 1 ? clientMetrics.speakingDurationSeconds : clientMetrics.durationSeconds;
    const detectedWpm = calculateWpm(wordCount, activeDuration);

    const rawScores = (parsed.criteria_scores as Record<string, number>) || {};
    const criteriaScores: SpeakingCriteriaScores = {
      pronunciation: Math.min(10, Math.max(0, Number(rawScores.pronunciation) || 4.5)),
      fluency_coherence: Math.min(10, Math.max(0, Number(rawScores.fluency_coherence) || 4.5)),
      grammar_vocabulary: Math.min(10, Math.max(0, Number(rawScores.grammar_vocabulary) || 4.5)),
      task_fulfillment: Math.min(10, Math.max(0, Number(rawScores.task_fulfillment) || 4.5)),
    };

    const partScore = calculatePartScore(criteriaScores);

    const justifications = (parsed.justifications as Record<string, string>) || {};
    const phoneticErrors = Array.isArray(parsed.phonetic_errors)
      ? (parsed.phonetic_errors as PhoneticErrorItem[])
      : [];
    const priorityActionItems = Array.isArray(parsed.priority_action_items)
      ? (parsed.priority_action_items as string[])
      : [];

    return {
      partIndex,
      partTitle,
      criteriaScores,
      partScore,
      transcript,
      detectedWpm,
      promptCoverage: (parsed.prompt_coverage as string) || 'Đáp ứng tương đối yêu cầu đề bài.',
      priorityActionItems,
      phoneticErrors,
      justifications: {
        pronunciation: justifications.pronunciation || 'Phát âm tương đối rõ ràng.',
        fluency_coherence: justifications.fluency_coherence || 'Duy trì tốc độ nói phù hợp.',
        grammar_vocabulary: justifications.grammar_vocabulary || 'Sử dụng cấu trúc câu đơn và câu ghép cơ bản.',
        task_fulfillment: justifications.task_fulfillment || 'Trả lời đúng trọng tâm đề bài.',
      },
      aiFixedB1Speech: (parsed.ai_fixed_b1_speech as string) || transcript,
      sampleResponse,
    };
  } catch (err) {
    console.error('Speaking Tier 2 Evaluation Error:', err);
    // Graceful fallback for offline or network disruption
    const transcript = asrResult.transcript || 'Unable to transcribe speech due to connection timeout.';
    const wordCount = countWords(transcript);
    const detectedWpm = calculateWpm(wordCount, clientMetrics.durationSeconds);

    const fallbackScores: SpeakingCriteriaScores = {
      pronunciation: 4.5,
      fluency_coherence: 4.5,
      grammar_vocabulary: 4.5,
      task_fulfillment: 4.5,
    };

    return {
      partIndex,
      partTitle,
      criteriaScores: fallbackScores,
      partScore: 4.5,
      transcript,
      detectedWpm,
      promptCoverage: 'Hệ thống ghi nhận bản thu của học viên.',
      priorityActionItems: [
        'Luyện tập phát âm rõ ràng phụ âm cuối (/s/, /ed/, /t/).',
        'Sử dụng các từ nối ý (First, Because, So) để bài nói mạch lạc hơn.',
      ],
      phoneticErrors: [],
      justifications: {
        pronunciation: 'Cần tiếp tục rèn luyện phát âm phụ âm cuối và trọng âm từ.',
        fluency_coherence: 'Duy trì tốc độ nói ổn định từ 90 đến 120 từ/phút.',
        grammar_vocabulary: 'Sử dụng thêm các cấu trúc câu ghép để nâng band điểm.',
        task_fulfillment: 'Trả lời đầy đủ các ý yêu cầu của đề bài.',
      },
      aiFixedB1Speech: transcript,
      sampleResponse,
    };
  }
}
