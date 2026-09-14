import type { WritingPrompt } from '../../../../../types/schemas';
import type { WritingTestInput } from '../../../types';

/**
 * Authentic HCMUE VSTEP Writing Test 05
 * Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017)
 */

export const HCMUE_WRITING_TEST_05_TASK1: WritingPrompt = {
  "id": "hcmue_writing_test_05_t1",
  "task_type": "task1_letter",
  "title": "Letter to Natalie giving directions and weather advice for Viet Nam trip",
  "time_allowed_minutes": 20,
  "min_words": 120,
  "prompt_text": "Your English-speaking friend, Natalie sent you an email. Read part of her email below.\n\n...\nThanks for inviting me to stay with you when I visit your country next month.\nI'm not sure how to get to your apartment from the airport. Could you write back giving me some simple directions? What's the cheapest means of transport?\nWhat will the weather be like when I get there? I'll need to know which clothes to pack.\nHope to get your early reply.\nNatalie\n\nWrite a reply to Natalie. In your email, you have to express your excitement of her trip to your country, tell her how to get to your apartment from the airport and what the cheapest means of transport is, and tell her about the weather next month.\nYou should write at least 120 words.",
  "context_info": "Informal Letter / Visitor Directions & Travel Advice",
  "sample_response": {
    "band": "B2",
    "text": "Hi Natalie,\n\nHow's it going? I hope you're well and looking forward to your trip to Viet Nam. It'll be great to see you again. I'll be on holiday when you come, so I've got plenty of time to spend with you. We'll definitely be able to visit a few places together.\n\nThe cheapest and easiest way to get to my apartment from the airport is on the bus. The Number 30 Bus will drop you off at Bến Thành Market. I'll be waiting for you at the bus stop when you get there, so you won't get lost!\n\nIt will still be quite hot here next month, so bring some summer clothes. It might rain as well, but you can borrow my umbrella!\n\nWell, that's all for now, Natalie. When you have a moment, drop me a line and confirm your flight and arrival times. I'm sure you'll have a great time here.\n\nSee you soon,",
    "analysis_vi": "Bức thư đón tiếp bạn chu đáo, hướng dẫn chi tiết tuyến xe buýt số 30 giá rẻ về chợ Bến Thành, tư vấn thời tiết nhiệt đới và nhắc nhở trang phục mùa hè phù hợp."
  }
};

export const HCMUE_WRITING_TEST_05_TASK2: WritingPrompt = {
  "id": "hcmue_writing_test_05_t2",
  "task_type": "task2_essay",
  "title": "Positive and negative impacts of computer games on children",
  "time_allowed_minutes": 40,
  "min_words": 250,
  "prompt_text": "Nowadays many people have access to computers on a wide basis and a large number of children play computer games. What are the positive and negative impacts of playing computer games and what can be done to minimize the bad effects?\nGive reasons for your answer and include any relevant examples from your own experience or knowledge.\nYou should write at least 250 words.",
  "context_info": "Two-part / Mixed Essay (Impacts & Solutions)",
  "sample_response": {
    "band": "C1",
    "text": "Access to computers has become more and more popular over recent decades, and the number of children playing games on computers has increased considerably too. While there is no doubt that children can get some benefits from this leisure activity, this trend is a big concern to all parents due to plenty of serious downsides it may cause. This essay will consider the positive and negative impacts of playing computer games and discuss ways to mitigate the potential bad effects.\n\nWith regards to the advantages, playing computer games can develop children's cognitive skills. Many popular games require abstract and high level thinking skills in order to win. For instance, children need to follow instructions, solve complex problems and use logic in many of the games that are currently popular. Such experience will be beneficial to a child's development into an adult.\n\nTurning to the other side of the argument, most computer games played by children contain a great deal of violence. The problem is that in many of the games children are rewarded for being more violent, and this violence is repeated again and again. For instance, many games involve children helping their character to kill, kick, stab and shoot. This may lead to increasing aggressive feelings, thoughts, and behaviors. Also, if children are absorbed in computer games, they may distract themselves from their studies. As a result, they inevitably perform worse and worse at school.\n\nIn order to minimize these negative impacts, parents need to take certain steps. The way forward might be to choose a suitable computer games for children and ensure that they are not allowed to have access to too many violent games. Parents can also set limits on the length of time games are played. For example, their children only spend no more than thirty minutes a day playing computer games.\n\nTo sum up, there are both pros and cons to everything, and playing computer games is not an exception. From my perspective, the negatives of this activity obviously outweigh its positives. However, if parents take adequate precautions, the above-mentioned drawbacks can be avoided.",
    "analysis_vi": "Bài luận đa chiều C1 về trò chơi điện tử: nêu bật lợi ích rèn luyện nhận thức tư duy logic, phản ánh nguy cơ bạo lực và sa sút học tập, đồng thời đưa ra giải pháp định hướng và giới hạn 30 phút mỗi ngày."
  }
};

export const HCMUE_WRITING_TEST_05: WritingTestInput = {
  id: 'hcmue_writing_test_05',
  test_number: 5,
  title: 'HCMUE Authentic VSTEP Writing Test 05',
  institution: 'HCMUE - ĐH Sư phạm TP.HCM',
  total_duration_minutes: 60,
  task1: HCMUE_WRITING_TEST_05_TASK1,
  task2: HCMUE_WRITING_TEST_05_TASK2,
};
