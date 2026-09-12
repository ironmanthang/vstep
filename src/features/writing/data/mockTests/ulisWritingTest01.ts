import type { WritingPrompt } from '../../../../types/schemas';

/**
 * Authentic ULIS VSTEP Writing Test 01
 * Sourced from "7 Vstep Tests B1-B2-C1 Full Key" (ULIS - ĐHQGHN, 2019)
 */

export const ULIS_WRITING_TEST_01_TASK1: WritingPrompt = {
  "id": "ulis_writing_test_01_t1",
  "task_type": "task1_letter",
  "title": "Cancelling a meeting with a friend",
  "time_allowed_minutes": 20,
  "min_words": 120,
  "prompt_text": "You had arranged to meet a friend next week, but you have realized that you will not be able to go. Write a letter to your friend. In your letter:\n\n- Cancel the meeting with your friend and apologize\n- Explain why you cannot be able to meet your friend\n- Suggest where and when you could see each other instead\n\nYou should write at least 120 words. Your response will be evaluated in terms of Task fulfillment, Organization, Vocabulary and Grammar.",
  "context_info": "Letter to a Friend",
  "sample_response": {
    "band": "B1",
    "text": "Dear John,\n\nHow are you? I wish everything is going well with you.\n\nI am writing this email to tell you that I can't meet you on Friday next week. On that day, I have an important exam in the morning and in the afternoon I have a meeting with my teacher at school. I have a lot of work to do there.\n\nCan I see you on Sunday morning next week? I really want to see you and talk with you. My parents are excited to see you, too. I can pick you up at the station. Then we go home and have lunch with my family. In the evening we can hang out round Hoan Kiem Lake. It's so interesting.\n\nPlease let me know your decision as soon as possible\n\nLove",
    "analysis_vi": "Bài viết mẫu đạt band B1 nhờ bố cục thư rõ ràng với lời chào và lời kết thân thiện, giải thích được lý do không thể gặp và đưa ra đề xuất thời gian, địa điểm thay thế sử dụng các cấu trúc câu đơn và câu ghép cơ bản."
  }
};

export const ULIS_WRITING_TEST_01_TASK2: WritingPrompt = {
  "id": "ulis_writing_test_01_t2",
  "task_type": "task2_essay",
  "title": "Advantages and disadvantages of living in big cities",
  "time_allowed_minutes": 40,
  "min_words": 250,
  "prompt_text": "There is a big number of people who wish to live in big cities.\n\nWrite an essay to an educated reader to discuss the advantages and disadvantages of living in big cities. Include reasons and any relevant examples to support your answer.\n\nYou should write at least 250 words. Your response will be evaluated in terms of Task Fulfillment, Organization, Vocabulary and Grammar.",
  "context_info": "Advantages and Disadvantages Essay",
  "sample_response": {
    "band": "B1",
    "text": "It is the fact that more and more people are becoming interested in living in big cities. However, there are both advantages and disadvantages of living there.\n\nOn the one hand, living in big cities, we can find good jobs and make more money. There are many big companies and factories for us to choose. We can go to good schools to learn and go to the cinema or the theatre to watch films or relax. We can also go to big shopping centres to buy things. There is everything here in big cities.\n\nHowever, it is dirty, noisy in big cities. We do not have enough houses to live. We have to live in small houses or we have to rent a small flat. It is not comfortable. There are a lot of people and cars, motorbikes, buses so it is very noisy, from morning to midnight.\n\nTo sum up, there are both advantages and disadvantages of living in big cities.",
    "analysis_vi": "Bài luận đạt band B1 vì cấu trúc bài viết gồm 4 đoạn rõ ràng với câu mở đầu nêu rõ chủ đề, các đoạn thân bài trình bày ưu và nhược điểm sử dụng từ nối cơ bản như On the one hand, However, To sum up."
  }
};

export const ULIS_WRITING_TEST_01 = {
  id: 'ulis_writing_test_01',
  test_number: 1,
  title: 'ULIS Authentic VSTEP Writing Test 01',
  institution: 'ULIS - ĐHQGHN',
  total_duration_minutes: 60,
  task1: ULIS_WRITING_TEST_01_TASK1,
  task2: ULIS_WRITING_TEST_01_TASK2,
};
