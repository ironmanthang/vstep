// Canonical Data Schemas for VSTEP PWA Platform (Single Source of Truth)

export interface FlashcardItem {
  id: string;                      // e.g., "fc_env_001"
  topic: string;                   // 1 trong 8 cụm chủ đề VSTEP (Education, Technology, Environment...)
  level: "B1" | "B2" | "C1";
  word: string;                    // e.g., "biodegradable"
  phonetic: string;                // e.g., "/ˌbaɪ.əʊ.dɪˈɡreɪ.də.bəl/"
  part_of_speech: "noun" | "verb" | "adjective" | "adverb" | "phrase";
  definition_vi: string;
  collocations: string[];          // e.g., ["biodegradable waste", "biodegradable packaging"]
  example_sentence_en: string;
  example_sentence_vi: string;
  audio_url: string;
  srs_metadata: SRSMetadata;
}

/** FSRS-compatible SRS metadata stored per card */
export interface SRSMetadata {
  stability: number;               // FSRS stability: days until retrievability drops to 90%
  difficulty: number;              // FSRS difficulty: 1–10 scale (0 for new cards)
  reps: number;                    // Total successful reviews (correct answers)
  lapses: number;                  // Total times answered wrong (lifetime)
  last_reviewed_at: number | null; // Unix timestamp ms
  next_review_timestamp: number;   // Unix timestamp ms (0 = new/never scheduled)
  state: 0 | 1 | 2 | 3;          // 0=New, 1=Learning, 2=Review, 3=Relearning
}

/** Binary user rating: correct or wrong */
export type SRSRating = "wrong" | "correct";

/** Default SRS metadata for new/unreviewed cards */
export const DEFAULT_SRS_METADATA: SRSMetadata = {
  stability: 0,
  difficulty: 0,
  reps: 0,
  lapses: 0,
  last_reviewed_at: null,
  next_review_timestamp: 0,
  state: 0,
};


export interface GrammarDrillItem {
  id: string;
  drill_type: "error_correction" | "sentence_combining" | "fill_in_blank" | "word_form";
  category: "tenses" | "articles" | "prepositions" | "subject_verb_agreement" | "complex_sentences" | "word_forms";
  level: "B1" | "B2" | "C1";
  prompt: string;
  options: {
    key: "A" | "B" | "C" | "D";
    text: string;
  }[];
  correct_key: "A" | "B" | "C" | "D";
  rule_explanation_vi: string;
}

export interface VocabDrillItem {
  id: string;
  drill_type: "cloze_test" | "context_guessing" | "paraphrase_drill";
  topic: string;
  level: "B1" | "B2" | "C1";
  passage_context?: string;
  question_text: string;
  options: { key: string; text: string }[];
  correct_key: string;
  explanation_vi: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  topic: string;
  word_count: number;
  difficulty: "B1" | "B2" | "C1";
  content_paragraphs: string[];
  questions: {
    id: string;
    type: "main_idea" | "vocab_in_context" | "factual_detail" | "negative_fact" | "inference" | "author_attitude" | "sentence_insertion";
    question_text: string;
    options: { key: "A" | "B" | "C" | "D"; text: string }[];
    correct_key: "A" | "B" | "C" | "D";
    clue_paragraph_index: number;
    clue_sentence: string;
    paraphrase_analysis?: {
      question_phrase: string;
      passage_phrase: string;
      explanation: string;
    };
    explanation_vi: string;
  }[];
}

export interface ListeningTest {
  id: string;
  part: 1 | 2 | 3;
  title: string;
  audio_url: string;
  duration_seconds: number;
  difficulty: "B1" | "B2" | "C1";
  transcript: {
    start_ms: number;
    end_ms: number;
    text_en: string;
    text_vi: string;
    is_clue_for_question?: string;
  }[];
  questions: {
    id: string;
    question_text: string;
    options: { key: "A" | "B" | "C" | "D"; text: string }[];
    correct_key: "A" | "B" | "C" | "D";
    explanation_vi: string;
    distractor_explanations?: Record<string, string>;
  }[];
}

export interface UserProfile {
  user_id: string;
  user_name: string;
  target_band: "B1" | "B2" | "C1";
  target_exam_date?: string;
  mock_test_history?: {
    test_id: string;
    timestamp: number;
    listening_score: number;
    reading_score: number;
    writing_score: number;
    speaking_score: number;
    overall_score: number;
    achieved_band: "Below B1" | "B1" | "B2" | "C1";
  }[];
}

export interface WritingEvaluationResult {
  submission_id: string;
  task_type: "task1_letter" | "task2_essay";
  word_count: number;
  scores: {
    task_fulfillment: {
      score: number;               // 0.0 - 10.0
      band: "Below B1" | "B1" | "B2" | "C1";
      feedback: string;
    };
    organization: {
      score: number;
      band: "Below B1" | "B1" | "B2" | "C1";
      feedback: string;
    };
    vocabulary: {
      score: number;
      band: "Below B1" | "B1" | "B2" | "C1";
      feedback: string;
    };
    grammar: {
      score: number;
      band: "Below B1" | "B1" | "B2" | "C1";
      feedback: string;
    };
    overall: number;               // Điểm trung bình làm tròn chuẩn 0.5
  };
  annotations: {
    id: string;
    start_index: number;
    end_index: number;
    original_text: string;
    category: "vietlish" | "grammar" | "lexical_upgrade" | "praise" | "spelling";
    severity: "critical" | "warning" | "suggestion" | "info";
    display_color: "red" | "purple" | "yellow" | "green";
    title: string;
    explanation: string;
    replacement_suggestions: {
      text: string;
      band: "B1" | "B2" | "C1";
    }[];
  }[];
  paragraph_analyses: {
    paragraph_index: number;
    role: "Introduction" | "Body Paragraph 1" | "Body Paragraph 2" | "Conclusion";
    thesis_statement_detected?: boolean;
    word_count: number;
    feedback: string;
  }[];
  revised_essay: string;           // Bài viết mẫu band B2+/C1 viết lại từ ý của học viên
}

export interface SpeakingEvaluationResult {
  submission_id: string;
  part: "Part 1 - Social Interaction" | "Part 2 - Solution Discussion" | "Part 3 - Topic Development";
  scores: {
    pronunciation: number;         // 0.0 - 10.0
    fluency: number;
    grammar: number;
    vocabulary: number;
    topic_development: number;
    overall: number;
    cefr_level: "Below B1" | "B1" | "B2" | "C1";
  };
  acoustic_metrics: {
    speech_rate_wpm: number;
    wpm_evaluation: string;
    filler_words_count: number;
    filler_words_list: string[];
    long_pauses_count: number;
    total_speaking_duration_seconds: number;
  };
  rubric_feedback: {
    pronunciation_notes: string;
    fluency_notes: string;
    grammar_notes: string;
    vocabulary_notes: string;
    topic_development_notes: string;
  };
  mispronounced_words: {
    word: string;
    expected_ipa: string;
    detected_error: string;
    severity: "low" | "medium" | "critical";
  }[];
  sample_improved_speech: string;
}

export interface SpeakingTest {
  id: string;
  test_number?: number;
  exam_date?: string;
  title: string;
  part1: {
    title: string;
    duration_minutes: number;
    topics: {
      topic_name: string;
      topic_name_vi?: string;
      questions: string[];
    }[];
    sample_response?: {
      band?: "B1" | "B2" | "C1";
      text: string;
      analysis_vi?: string;
    };
  };
  part2: {
    title: string;
    duration_minutes: number;
    situation: string;
    options: {
      key: string;
      title: string;
      description?: string;
    }[];
    sample_response?: {
      band?: "B1" | "B2" | "C1";
      text: string;
      analysis_vi?: string;
    };
  };
  part3: {
    title: string;
    duration_minutes: number;
    topic: string;
    mindmap_ideas: string[];
    follow_up_questions: string[];
    sample_response?: {
      band?: "B1" | "B2" | "C1";
      text: string;
      analysis_vi?: string;
    };
  };
}

export interface WritingPrompt {
  id: string;
  task_type: "task1_letter" | "task2_essay";
  title: string;
  time_allowed_minutes: number;
  min_words: number;
  prompt_text: string;
  context_info?: string;
  sample_response?: {
    band: "B1" | "B2" | "C1";
    text: string;
    analysis_vi?: string;
  };
}

export interface ReadingTest {
  id: string;
  title: string;
  duration_minutes: number;
  difficulty: "B1" | "B2" | "C1";
  passages: ReadingPassage[];
}

export interface MockTest {
  id: string;
  test_number: number;
  title: string;
  institution: string;
  total_duration_minutes: number;
  listening: ListeningTest;
  reading: ReadingTest;
  writing: {
    task1: WritingPrompt;
    task2: WritingPrompt;
  };
  speaking: SpeakingTest;
}

export type TestSkill = 'listening' | 'reading' | 'writing' | 'speaking' | 'mock_test';
export type TestMode = 'practice' | 'exam';

export interface DbTestSubmission {
  id?: string;
  user_id: string;
  test_id: string;
  skill: TestSkill;
  mode: TestMode;
  score: number;
  correct_count: number;
  total_questions: number;
  time_spent_seconds: number;
  answers: Record<string, string>;
  notes: Record<string, string>;
  flagged_questions: string[];
  completed_at?: string;
  created_at?: string;
}

