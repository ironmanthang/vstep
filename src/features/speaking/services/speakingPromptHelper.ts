import type { SpeakingTest } from '../../../types/schemas';

export interface SpeakingPartPromptData {
  partTitle: string;
  promptDescription: string;
  sampleResponse?: {
    band?: 'B1' | 'B2' | 'C1';
    text: string;
    analysis_vi?: string;
  };
}

export function getSpeakingPartPromptData(
  test: SpeakingTest,
  part: 1 | 2 | 3
): SpeakingPartPromptData {
  if (part === 1) {
    return {
      partTitle: 'Social Interaction',
      promptDescription: `Topics:\n${test.part1.topics.map((t) => `${t.topic_name}: ${t.questions.join('; ')}`).join('\n')}`,
      sampleResponse: test.part1.sample_response,
    };
  }

  if (part === 2) {
    return {
      partTitle: 'Solution Discussion',
      promptDescription: `Situation: ${test.part2.situation}\nOptions:\n${test.part2.options.map((o) => `${o.title}: ${o.description}`).join('\n')}`,
      sampleResponse: test.part2.sample_response,
    };
  }

  return {
    partTitle: 'Topic Development',
    promptDescription: `Topic: ${test.part3.topic}\nMindmap Ideas: ${test.part3.mindmap_ideas.join(', ')}\nFollow-ups: ${test.part3.follow_up_questions.join('; ')}`,
    sampleResponse: test.part3.sample_response,
  };
}
