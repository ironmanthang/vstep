import type { WritingPrompt } from '../../../../../types/schemas';
import type { WritingTestInput } from '../../../types';

/**
 * Authentic HCMUE VSTEP Writing Test 02
 * Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017)
 */

export const HCMUE_WRITING_TEST_02_TASK1: WritingPrompt = {
  "id": "hcmue_writing_test_02_t1",
  "task_type": "task1_letter",
  "title": "Letter to a friend after a holiday trip to Ha Long Bay",
  "time_allowed_minutes": 20,
  "min_words": 120,
  "prompt_text": "You live in Ho Chi Minh city. You just took a trip to Ha Long Bay with an English friend named Daisy. You received an email from her after she returned to London. Read part of her email below.\n\n...\nI hope you like the photos we took in Ha Long Bay. Did you get home all right?\nI'm back at work now, but it's a bit difficult to start again. I wish we were still on holiday.\nWhy don't we plan another trip this spring if you've got time and money? Any suggestions where we could go?\n...\nDaisy\n\nWrite a reply to Daisy. In your email, you have to tell her that you really like the photos and the time you got together, describe a problem you had at the airport to her and suggest the time and place for the next trip.\nYou should write at least 120 words.",
  "context_info": "Informal Letter / Holiday Follow-up",
  "sample_response": {
    "band": "B2",
    "text": "Dear Daisy,\n\nIt's great to hear from you again. I hope everything is going well in London.\n\nThanks for sending me the photos. I really like them because they remind me of the great time we spent with each other in Ha Long Bay. I believe that you enjoyed the breath-taking scenery here so much.\n\nAs you probably know, I had a bit of trouble at Tân Sơn Nhất airport because of the accidental power-cut, but I got home safely in the end.\n\nI'm afraid I won't be able to get away this spring as I have to visit my grandparents in Central Vietnam then. What about a trip to Hà Nội, the capital City of Viet Nam next summer? I will have graduated from university by next June, and I've got a whole month to travel before starting my first job.\n\nWell that's all for now, Daisy. Drop me a line when you have time and let me know what you think about my plan.\n\nAll the best,",
    "analysis_vi": "Văn phong thư thân mật mạch lạc, xử lý trọn vẹn 3 yêu cầu đề bài: bày tỏ cảm xúc về bức ảnh, kể sự cố cúp điện tại sân bay Tân Sơn Nhất, và đề xuất chuyến du lịch Hà Nội vào mùa hè tới."
  }
};

export const HCMUE_WRITING_TEST_02_TASK2: WritingPrompt = {
  "id": "hcmue_writing_test_02_t2",
  "task_type": "task2_essay",
  "title": "Problems and solutions when workforce is replaced by machinery",
  "time_allowed_minutes": 40,
  "min_words": 250,
  "prompt_text": "Recent advances in technology leads the fact that human workforce is gradually replaced with machinery.\nWhat are some problems caused by this trend, and how could they be dealt with?\nGive reasons for your answer and include any relevant examples from your own experience or knowledge.\nYou should write at least 250 words.",
  "context_info": "Problems and Solutions Essay",
  "sample_response": {
    "band": "C1",
    "text": "Technological advances in the past few decades help to gradually replace human workforce with the-state-of-the-art machines in a wide range of industries. Although people can benefit a lot from the replacement, personally I think there are some drawbacks of this ongoing trend. This essay will examine the negative effects of the development of technology on human-beings and then propose some solutions.\n\nOne of the biggest problems is that there is less social interaction among factory workers because they always have to work with machines. They just focus on the machine they operate instead of communicating with their co-workers. The solution is for the board of directors to organize social activities such as team building, going for a picnic at an amusement park, having staff parties on national holidays and so on. Thanks to these activities, workers have a chance to spend time together talking and sharing their work experience as well as life experience with one another.\n\nAnother issue is that this trend has made workers lazier because they tend to heavily depend on machines. In some cases, they can, but they are unwilling, and even refuse to fulfill their task by hand when a technical problems like a breakdown or power cut occurs. To tackle this problem, the management, along with the trainer should raise the workers' sense of responsibility to make efforts to do their duty if possible without assistance of machinery.\n\nLast but not least, this replacement may increase the unemployment rate. As machines can perform faster and more efficiently, the need for manpower will decrease dramatically. There might be only vacancies for highly-qualified technicians who can operate modern machines. As a result, unskilled manual workers may run the risk of being jobless. Dealing with this issue involves the government, local authority and vocational schools' launching some specific programs or training courses in which manual workers are trained to control fashionable machines. Moreover, they should be encouraged to update themselves with the development of today's science and technology so as not to be left behind.\n\nAll things considered, no one can deny that there are two sides of the same coin; we can, therefore, see both the pros and cons of substituting machinery for manpower. However, the government, the factory management, and the vocational school can take the above-mentioned measures to make a great contribution to minimizing its downsides.",
    "analysis_vi": "Bài viết dạng Vấn đề & Giải pháp (Problems & Solutions) chuẩn C1, phân tích logic 3 vấn đề nổi cộm (suy giảm giao tiếp xã hội, sự phụ thuộc ỷ lại, và nguy cơ thất nghiệp lao động phổ thông) kèm giải pháp đào tạo thực tế."
  }
};

export const HCMUE_WRITING_TEST_02: WritingTestInput = {
  id: 'hcmue_writing_test_02',
  test_number: 2,
  title: 'HCMUE Authentic VSTEP Writing Test 02',
  institution: 'HCMUE - ĐH Sư phạm TP.HCM',
  total_duration_minutes: 60,
  task1: HCMUE_WRITING_TEST_02_TASK1,
  task2: HCMUE_WRITING_TEST_02_TASK2,
};
