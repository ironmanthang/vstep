import { generateAICompletion } from '../../../services/ai';
import type { TaskEvaluation, WritingErrorItem } from '../writingStorage';
import type { Tier1PrecalcResult } from './writingTier1';
import { calculateTaskScore } from './writingTier3';

export interface Tier2EvaluationParams {
  taskType: 'task1_letter' | 'task2_essay';
  promptTitle: string;
  promptText: string;
  minWords: number;
  candidateText: string;
  tier1Result: Tier1PrecalcResult;
}

const SYSTEM_EVALUATOR_PROMPT = `You are a certified, senior VSTEP examiner evaluating English Writing strictly according to Decision 729/QĐ-BGDĐT (Ministry of Education and Training, Vietnam).
Your current grading target is B1 (Bậc 3 / VSTEP Level 3, target score 4.0 - 5.5 / 10.0), which is the standard university graduation requirement.

EVALUATION CRITERIA FOR B1 (BẬC 3):
1. Task Fulfillment (Trọng số 25%):
   - Task 1 (Letter): Candidate must address all 3 bullet points, use proper greeting/closing, and write >= 120 words.
   - Task 2 (Essay): Candidate must clearly state an opinion/thesis, provide at least 2 body arguments, and write >= 250 words.
   - For B1, arguments can be simple as long as they are directly relevant to the prompt.
2. Organization (Trọng số 25%):
   - Clear paragraph structure (Task 1: Greeting - Opening - Main Body - Closing; Task 2: 4 paragraphs: Intro, Body 1, Body 2, Conclusion).
   - Use basic connecting words (Firstly, Secondly, In addition, However, For example, To sum up).
3. Vocabulary (Trọng số 25%):
   - Everyday functional vocabulary. Repetitions or simple word choices are acceptable for B1 as long as meaning is clear.
4. Grammar (Trọng số 25%):
   - Control of simple and compound sentences (with and, but, so, because).
   - Minor errors in articles (a/an/the), prepositions, or occasional verb forms are tolerated if communication is not blocked.
   - Watch out for severe Vietnamese L1 transfer (Vietlish) that distorts meaning.

EVIDENCE-FIRST REASONING ORDER:
You must analyze evidence FIRST before scoring:
1. 'prompt_points_analysis': List each required point from the prompt and quote the candidate's sentence addressing it (or state missing).
2. 'thesis_statement': (For Task 2) Quote the thesis sentence stating the candidate's stance.
3. 'priority_action_items': 2 to 3 highest-leverage tips in Vietnamese to help the learner pass B1.
4. 'error_catalog': Catalog of specific errors (Grammar, Vietlish, Vocabulary, Spelling) with the exact original text, fix, and explanation in Vietnamese.
5. 'praise_highlights': 1-2 strengths in Vietnamese.
6. 'justifications': Short qualitative comments in Vietnamese for each of the 4 MOET criteria.
7. 'criteria_scores': Numeric scores from 0.0 to 10.0 for task_fulfillment, organization, vocabulary, grammar.
8. 'ai_fixed_b1_essay': Rewrite the student's submission into clean, correct, achievable B1 English. Keep the student's exact ideas and flow, but fix all grammar errors and Vietlish structures. Do NOT use overly complex C1 words. Keep it natural and accessible for a B1 student.

Output ONLY valid JSON matching this exact structure:
{
  "prompt_points_analysis": ["Point 1: ...", "Point 2: ...", "Point 3: ..."],
  "thesis_statement": "string",
  "priority_action_items": ["Hành động 1...", "Hành động 2..."],
  "error_catalog": [
    {
      "type": "grammar" | "vietlish" | "vocabulary" | "spelling",
      "original_text": "quoted substring",
      "suggested_replacement": "corrected text",
      "explanation_vi": "giải thích ngắn gọn nguyên nhân và cách sửa"
    }
  ],
  "praise_highlights": ["Khen ngợi 1...", "Khen ngợi 2..."],
  "justifications": {
    "task_fulfillment": "nhận xét độ đáp ứng đề bài",
    "organization": "nhận xét bố cục và liên kết",
    "vocabulary": "nhận xét vốn từ",
    "grammar": "nhận xét ngữ pháp"
  },
  "criteria_scores": {
    "task_fulfillment": 5.0,
    "organization": 5.0,
    "vocabulary": 4.5,
    "grammar": 4.5
  },
  "ai_fixed_b1_essay": "Full rewritten B1 essay text"
}`;

export async function evaluateWritingTask(params: Tier2EvaluationParams): Promise<TaskEvaluation> {
  const { taskType, promptTitle, promptText, minWords, candidateText, tier1Result } = params;

  const vietlishNotice = tier1Result.detected_vietlish_patterns.length > 0
    ? `\nClient-side regex pre-filter detected these surface patterns: ${JSON.stringify(tier1Result.detected_vietlish_patterns.map(p => p.pattern))}. Verify and include them in error_catalog if confirmed.`
    : '';

  const userPrompt = `EVALUATE THE FOLLOWING CANDIDATE SUBMISSION:

TASK TYPE: ${taskType === 'task1_letter' ? 'Task 1 (Letter/Email)' : 'Task 2 (Essay)'}
PROMPT TITLE: ${promptTitle}
PROMPT INSTRUCTIONS:
${promptText}

CANDIDATE ESSAY:
"""
${candidateText}
"""

VERIFIED STATS:
- Word Count: ${tier1Result.word_count} words (Requirement: minimum ${minWords} words)
- Meets word count: ${tier1Result.meets_word_count ? 'YES' : 'NO'}
- Tri-gram prompt copying ratio: ${(tier1Result.prompt_copying_ratio * 100).toFixed(1)}%${vietlishNotice}

Provide the complete diagnostic evaluation in valid JSON.`;

  try {
    const aiResponse = await generateAICompletion({
      messages: [
        { role: 'system', content: SYSTEM_EVALUATOR_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.1,
      responseFormat: 'json_object'
    });

    const parsed = parseAIJsonOutput(aiResponse.content);
    const taskScore = calculateTaskScore(parsed.criteria_scores);

    return {
      criteriaScores: parsed.criteria_scores,
      taskScore,
      prompt_points_analysis: parsed.prompt_points_analysis || [],
      thesis_statement: parsed.thesis_statement || '',
      priority_action_items: parsed.priority_action_items || [],
      error_catalog: parsed.error_catalog || [],
      praise_highlights: parsed.praise_highlights || [],
      ai_fixed_b1_essay: parsed.ai_fixed_b1_essay || candidateText,
      justifications: parsed.justifications || {
        task_fulfillment: '',
        organization: '',
        vocabulary: '',
        grammar: ''
      }
    };
  } catch (err: unknown) {
    console.error('Tier 2 AI evaluation failed, falling back to heuristic evaluation:', err);
    return createFallbackEvaluation(candidateText, tier1Result, minWords);
  }
}

interface RawAIJson {
  prompt_points_analysis?: string[];
  thesis_statement?: string;
  priority_action_items?: string[];
  error_catalog?: WritingErrorItem[];
  praise_highlights?: string[];
  justifications?: {
    task_fulfillment: string;
    organization: string;
    vocabulary: string;
    grammar: string;
  };
  criteria_scores: {
    task_fulfillment: number;
    organization: number;
    vocabulary: number;
    grammar: number;
  };
  ai_fixed_b1_essay?: string;
}

function parseAIJsonOutput(rawContent: string): RawAIJson {
  let cleaned = rawContent.trim();
  // Strip markdown code block wrappers if present
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();

  const parsed = JSON.parse(cleaned) as RawAIJson;

  // Clamp criteria scores between 0.0 and 10.0
  if (parsed.criteria_scores) {
    for (const key of ['task_fulfillment', 'organization', 'vocabulary', 'grammar'] as const) {
      const val = Number(parsed.criteria_scores[key]);
      parsed.criteria_scores[key] = isNaN(val) ? 4.0 : Math.min(10.0, Math.max(0.0, Number(val.toFixed(1))));
    }
  } else {
    parsed.criteria_scores = {
      task_fulfillment: 4.5,
      organization: 4.5,
      vocabulary: 4.0,
      grammar: 4.0
    };
  }

  return parsed;
}

function createFallbackEvaluation(
  candidateText: string,
  tier1: Tier1PrecalcResult,
  minWords: number
): TaskEvaluation {
  const baseScore = tier1.meets_word_count ? 4.5 : 3.5;
  const errors: WritingErrorItem[] = tier1.detected_vietlish_patterns.map(p => ({
    type: 'vietlish',
    original_text: p.matched_text,
    suggested_replacement: '',
    explanation_vi: p.explanation_vi
  }));

  return {
    criteriaScores: {
      task_fulfillment: baseScore,
      organization: baseScore,
      vocabulary: baseScore,
      grammar: baseScore
    },
    taskScore: baseScore,
    prompt_points_analysis: [
      `Bài viết đạt ${tier1.word_count}/${minWords} từ yêu cầu.`
    ],
    priority_action_items: [
      tier1.meets_word_count
        ? 'Duy trì độ dài tối thiểu và tập trung phát triển ý rõ ràng hơn.'
        : `Cần viết tối thiểu ${minWords} từ để tránh bị trừ điểm Task Fulfillment.`,
      'Rà soát các liên từ kép (Although... but, Because... so) trước khi nộp bài.'
    ],
    error_catalog: errors,
    praise_highlights: ['Đã hoàn thành bài viết trong thời gian quy định.'],
    ai_fixed_b1_essay: candidateText,
    justifications: {
      task_fulfillment: `Độ dài ${tier1.word_count}/${minWords} từ.`,
      organization: 'Bố cục cơ bản.',
      vocabulary: 'Vốn từ quen thuộc.',
      grammar: 'Cần chú ý chia thì và hòa hợp chủ vị.'
    }
  };
}
