import type { ListeningTest } from './types';

export interface QuestionTranscriptContext {
  segment: ListeningTest['transcript'][number] | null;
  isFirstInGroup: boolean;
  groupTitle: string;
  groupQuestionIds: string[];
  groupId: string;
}

/**
 * Pure helper to resolve transcript segment, conversation/lecture grouping,
 * and display title for a given question in a listening test.
 */
export function getQuestionTranscriptContext(
  test: ListeningTest,
  questionId: string
): QuestionTranscriptContext {
  const segment = test.transcript.find(t => {
    if (!t.is_clue_for_question) return false;
    const ids = t.is_clue_for_question.split(',').map(s => s.trim());
    return ids.includes(questionId);
  });

  if (!segment) {
    return {
      segment: null,
      isFirstInGroup: false,
      groupTitle: '',
      groupQuestionIds: [],
      groupId: '',
    };
  }

  const groupQuestionIds = segment.is_clue_for_question
    ? segment.is_clue_for_question.split(',').map(s => s.trim())
    : [];

  const isGroup = groupQuestionIds.length > 1;
  const isFirstInGroup = isGroup && groupQuestionIds[0] === questionId;
  const groupId = isGroup ? groupQuestionIds[0] : '';

  let groupTitle = '';
  if (isFirstInGroup) {
    const firstQIndex = test.questions.findIndex(q => q.id === groupQuestionIds[0]) + 1;
    const lastQIndex = test.questions.findIndex(q => q.id === groupQuestionIds[groupQuestionIds.length - 1]) + 1;

    const textLower = segment.text_en.toLowerCase();
    if (textLower.includes('conversation') || (firstQIndex >= 9 && lastQIndex <= 20)) {
      const convIndex = Math.ceil((firstQIndex - 8) / 4);
      groupTitle = `Đoạn Hội Thoại ${convIndex > 0 ? convIndex : ''} (Câu ${firstQIndex} – ${lastQIndex})`;
    } else if (textLower.includes('lecture') || textLower.includes('talk') || firstQIndex >= 21) {
      const lecIndex = Math.ceil((firstQIndex - 20) / 5);
      groupTitle = `Bài Giảng Học Thuật ${lecIndex > 0 ? lecIndex : ''} (Câu ${firstQIndex} – ${lastQIndex})`;
    } else {
      groupTitle = `Đoạn Nghe (Câu ${firstQIndex} – ${lastQIndex})`;
    }
  }

  return {
    segment,
    isFirstInGroup,
    groupTitle,
    groupQuestionIds,
    groupId,
  };
}
