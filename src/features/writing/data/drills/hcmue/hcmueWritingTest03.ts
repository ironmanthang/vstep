import type { WritingPrompt } from '../../../../../types/schemas';
import type { WritingTestInput } from '../../../types';

/**
 * Authentic HCMUE VSTEP Writing Test 03
 * Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017)
 */

export const HCMUE_WRITING_TEST_03_TASK1: WritingPrompt = {
  "id": "hcmue_writing_test_03_t1",
  "task_type": "task1_letter",
  "title": "Letter to Clare asking about her new home and settling down",
  "time_allowed_minutes": 20,
  "min_words": 120,
  "prompt_text": "Your English-speaking friend, Clare, has recently gone to live in another city. Read part of her email below:\n\n...\nWell, I've now been here for two weeks and I'm beginning to get used to my new life here. I've certainly been very busy since I moved here - there have been all sorts of things happening!\nI'm quite happy in my new home although lots of my belongings are still in bags and boxes! I'm hoping to find time to unpack everything soon.\nI'm glad I decided to come and live here - it's a really good city. But there are some things and people that I miss of course!\nIt would be really good if you could come and stay with me here, perhaps in a couple of months when I really settle down. What do you think?\nKeep in touch.\nClare.\n\nWrite a reply to Clare. In your email, you have to ask her what is happening to her, tell her to describe her new home, ask her to tell you what and who she misses after she moves there and suggest the time when you can visit her.\nYou should write at least 120 words.",
  "context_info": "Informal Letter / Friendship Catch-up",
  "sample_response": {
    "band": "B2",
    "text": "Dear Clare,\n\nI'm very happy to get your email yesterday and know that you are getting used to your new life. Why don't you tell me why have you been so busy and what is going on there?\n\nHow many bedrooms are there in your new house? Is there a garden in front? What do you like most about the house? Remember to send me some photos of it. I love to see them.\n\nYou know, missing some things and people here after you have moved to a new place is a matter-of-course. However, I wonder who and what you miss. Do you miss me and the time we got together?\n\nI can't wait to visit you there. What about next September? I have a week off then, so I can arrange to go and stay with you for a few days.\n\nHope to hear from you soon.\n\nAll the best,",
    "analysis_vi": "Bức thư trả lời bạn thân khéo léo, tự nhiên, đặt câu hỏi quan tâm về ngôi nhà mới, những kỷ niệm thân quen và đề xuất mốc thời gian cụ thể (tháng 9) cho chuyến thăm bạn."
  }
};

export const HCMUE_WRITING_TEST_03_TASK2: WritingPrompt = {
  "id": "hcmue_writing_test_03_t2",
  "task_type": "task2_essay",
  "title": "Fast food: convenience for busy lives versus serious health hazards",
  "time_allowed_minutes": 40,
  "min_words": 250,
  "prompt_text": "Some people argue that we have to think twice before deciding to eat fast food because of some health problems it may cause, while others believe that this kind of food is a good choice for those with a very busy life.\nWhich opinion do you agree with?\nUse specific reasons and examples to support your answer.\nYou should write at least 250 words.",
  "context_info": "Opinion / Discussion Essay",
  "sample_response": {
    "band": "B2",
    "text": "In most parts of the world, including Vietnam, the popularity of fast food is growing at a considerable rate. Some people hold the view that fast food poses several health hazards to consumers. However, personally, I strongly believe that eating fast food is a great idea for busy people for two following reasons.\n\nTo begin with, most people, especially young adults consider fast food as a convenient source of food. In fact, fast food can be prepared and served within a very short time. One day, if you get stuck in a traffic jam on the way home from work and don't have enough time to cook dinner, just take the whole family straight to a KFC restaurant to eat some fried chicken with french fries. Obviously, fast food industry helps to save human time.\n\nAnother reason is that eaters can enjoy the pleasant atmosphere in an air-conditioned fast food restaurant which is beautifully decorated with colorful lights, nice paintings, and modern multi-shaped tables and chairs. It can't be denied that you will definitely feel relaxed and comfortable after hard work and enjoy the good taste of hamburgers, hot dogs, pizzas, and so on here.\n\nTurning to the other side of the argument, consuming too much fast food is the cause of obesity, diabetes, high blood pressure, and heart disease. In fact, this kind of food is rich in fat, salt, artificial substances and oils, all of which increase the risk of those health problems. Some recent surveys show that the number of obese children is alarmingly on the increase.\n\nAll in all, I'm in favor of the idea that going to a fast food restaurant for meals is the best choice when you are as busy as a bee. However, you should limit the amount of oily and salty fast food consumed due to lots of warnings of health threat suggested by doctors and nutritionists.",
    "analysis_vi": "Bài luận cân đối giữa tính tiện lợi tiết kiệm thời gian của thức ăn nhanh cho cuộc sống hiện đại và những cảnh báo y tế về béo phì, bệnh tim mạch."
  }
};

export const HCMUE_WRITING_TEST_03: WritingTestInput = {
  id: 'hcmue_writing_test_03',
  test_number: 3,
  title: 'HCMUE Authentic VSTEP Writing Test 03',
  institution: 'HCMUE - ĐH Sư phạm TP.HCM',
  total_duration_minutes: 60,
  task1: HCMUE_WRITING_TEST_03_TASK1,
  task2: HCMUE_WRITING_TEST_03_TASK2,
};
