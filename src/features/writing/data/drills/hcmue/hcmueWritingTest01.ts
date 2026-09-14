import type { WritingPrompt } from '../../../../../types/schemas';
import type { WritingTestInput } from '../../../types';

/**
 * Authentic HCMUE VSTEP Writing Test 01
 * Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017)
 */

export const HCMUE_WRITING_TEST_01_TASK1: WritingPrompt = {
  "id": "hcmue_writing_test_01_t1",
  "task_type": "task1_letter",
  "title": "Letter to a friend about living and studying in Manchester",
  "time_allowed_minutes": 20,
  "min_words": 120,
  "prompt_text": "You live in Ho Chi Minh City. You moved to Manchester to study English three months ago. You have just received an email from a friend, Sara from London. Read part of her email below.\n\n...\nWhat's Manchester like? I bet the weather's not too good!\nHave you still got that part-time job in the fast-food restaurant? It must be a good way of speaking to new people and making friends.\nWhat about the family you're staying with? Do you go out much in the evening? I hope the English classes are going well.\nSara\n\nWrite a reply to Sara. In your email, you have to describe Manchester and the weather there, tell her about your part-time job, the family you are staying with, your activities in the evening, and your English classes.\nYou should write at least 120 words.",
  "context_info": "Informal Letter / Personal Email",
  "sample_response": {
    "band": "B2",
    "text": "Dear Sara,\n\nManchester is a really interesting city. There are a lot of shops here. The people are friendly and the night life is fantastic. It's a pity it's always raining!\n\nAs you know, I'm working in a fast-food restaurant. I go to work from 5 to 9 in the evening, so I don't go out with my friends very often. I go straight home after work to review the lessons and get ready for the class the next day. However, I love my job because I have lots of chances to practice speaking English with the customers. I believe that I can improve my spoken English so much. However, I don't like my boss because he's too strict.\n\nI was living with an English family, but I didn't get on very well with them. Therefore, now I'm sharing a flat with 4 French students. We have a lot of fun together, but I'm not speaking much English at home because we always use French.\n\nI'm going to English classes every morning in a language school next to my flat. I can learn a lot here and make great progress.\n\nWell, it's time for work now. Looking forward to hearing from you.\n\nBest wishes,",
    "analysis_vi": "Bài viết đạt chuẩn B2 nhờ cách diễn đạt tự nhiên, bố cục thư thân mật chuẩn mực (Dear Sara / Best wishes), hoàn thành đầy đủ 4 ý theo yêu cầu (miêu tả thành phố & thời tiết, công việc bán thời gian, điều kiện ăn ở và tiến độ học tiếng Anh)."
  }
};

export const HCMUE_WRITING_TEST_01_TASK2: WritingPrompt = {
  "id": "hcmue_writing_test_01_t2",
  "task_type": "task2_essay",
  "title": "Heavy taxes on private cars to improve public transportation",
  "time_allowed_minutes": 40,
  "min_words": 250,
  "prompt_text": "In order to solve traffic problems, Vietnamese government should tax private car owners heavily and use the money to improve public transportation.\nWhat are the advantages and disadvantages of such a solution?\nGive reasons for your answer and include any relevant examples from your own experience or knowledge.\nYou should write at least 250 words.",
  "context_info": "Advantages and Disadvantages Essay",
  "sample_response": {
    "band": "C1",
    "text": "Traffic congestion in many big cities of Viet Nam is getting more and more serious. Many people believe that one possible solution to this problem is to impose heavy taxes on car drivers and spend this money on making public transport better. However, there are both pros and cons to decide to do this. This essay will discuss the benefits and drawbacks of such a measure and draw a conclusion.\n\nLet's begin by looking at the positive aspects of such a solution. One of the main advantages would be that the heavy taxes would discourage car owners from using their cars because it would become very expensive to drive. This would mean that they would begin to make use of public transport instead to travel here and there, thus reducing road accidents and pollution as well. Another good point would be that more people would use public transport if it were improved. In fact, public transport in major cities like Hanoi and Saigon is very poor. For example, we often see old and dirty buses and trains that no one wants to take a ride on. High taxes would create enough money to make the necessary changes.\n\nOn the other hand, there are some negative points of such a measure. First, this would be a heavy burden on car drivers. At present, taxes on private cars are already high for a lot of people, and so further taxes would only mean less money at the end of the month for most people who may have no choice but to drive every day. Another problem is that this type of tax would likely be set at a fixed amount for all who use car as a means of transport. This would mean that it would hit those with less money harder, while the rich could afford it. It is, therefore, not a fair tax.\n\nIn conclusion, there are two sides to everything and applying this solution is not an exception. However, personally I think it's time for us to do something to tackle the problem of traffic jams in big cities of Viet Nam. This measure is, therefore, obviously worth considering to improve the current situation.",
    "analysis_vi": "Bài luận dạng Lợi ích & Bất lợi (Advantages & Disadvantages) đạt chuẩn C1 với cấu trúc 4 đoạn cân xứng, lập luận sắc sảo về giảm ùn tắc và phát triển hạ tầng đối chiếu với gánh nặng tài chính lên người thu nhập thấp."
  }
};

export const HCMUE_WRITING_TEST_01: WritingTestInput = {
  id: 'hcmue_writing_test_01',
  test_number: 1,
  title: 'HCMUE Authentic VSTEP Writing Test 01',
  institution: 'HCMUE - ĐH Sư phạm TP.HCM',
  total_duration_minutes: 60,
  task1: HCMUE_WRITING_TEST_01_TASK1,
  task2: HCMUE_WRITING_TEST_01_TASK2,
};
