import type { WritingPrompt } from '../../../../types/schemas';

/**
 * Authentic ULIS VSTEP Writing Test 04
 * Sourced from "7 Vstep Tests B1-B2-C1 Full Key" (ULIS - ĐHQGHN, 2019)
 */

export const ULIS_WRITING_TEST_04_TASK1: WritingPrompt = {
  "id": "ulis_writing_test_04_t1",
  "task_type": "task1_letter",
  "title": "Letter to a friend about a new job",
  "time_allowed_minutes": 20,
  "min_words": 120,
  "prompt_text": "You have recently started work in a new company.\n\nWrite a letter to an English-speaking friend. In your letter\n\n- explain why you changed jobs\n- describe your new job\n- tell him/her your other news\n\nYou should write at least 120 words. Your response will be evaluated in terms of Task fulfillment, Organization, Vocabulary and Grammar.",
  "context_info": "Informal Letter",
  "sample_response": {
    "band": "B1",
    "text": "Dear Tom\n\nI'm just writing to let you know I quit my old job and found something new.\n\nI was really fed up with being a brain surgeon because it wasn't really much of a challenge anymore. You know me; if I'm not learning new tricks, I get bored too easily and have to find something new.\nI'm now teaching English as a foreign language in Vietnam and it suits me down to the ground. I teach two adult classes and a kindergarten class, which is not only challenging but also rewarding too. Can you believe it?\n\nI also have some other amazing news- I'm getting married. She was one of my first ever students and I guess it was love at first sight for both of us. Make sure you keep the first weekend in July free, so you can come and celebrate with us.\n\nKeep in touch\nChris",
    "analysis_vi": "Bài viết sử dụng cấu trúc ngữ pháp và từ vựng phong phú ở mức độ trung cấp (B1-B2), truyền đạt rõ ràng các ý theo yêu cầu đề bài gồm lý do đổi việc, mô tả công việc mới và tin tức khác."
  }
};

export const ULIS_WRITING_TEST_04_TASK2: WritingPrompt = {
  "id": "ulis_writing_test_04_t2",
  "task_type": "task2_essay",
  "title": "Taxing private car owners to improve public transportation",
  "time_allowed_minutes": 40,
  "min_words": 250,
  "prompt_text": "In order to solve traffic problems, government should tax private car owners heavily and use the money to improve public transportation. What are the advantages and disadvantages of such a solution?\n\nGive reasons for your answer and include any relevant examples from your own experience or knowledge. Your response will be evaluated in terms of Task fulfillment, Organization, Vocabulary and Grammar.",
  "context_info": "Advantages and Disadvantages Essay",
  "sample_response": {
    "band": "B1",
    "text": "Traffic congestion in many cities around the world is a big problem. One possible solution to this problem is to impose heavy taxes on car drivers and use this money to make public transport better. This essay will discuss the benefits and drawbacks of such a measure.\n\nOne of the first benefits of such a measure is that the heavy taxes would discourage car owners from using their cars because it would become very expensive to drive. This would mean that they would begin to make use of public transport instead, thus reducing traffic problems and pollution as well. Another benefit would be that much more use would be made of public transport if it was improved. It is often the case that public transport in cities is very poor. For example, we often see old buses and trains that people would rather not use. High taxes would generate enough money to make the necessary changes.\n\nNevertheless, there are drawbacks to such a solution. First and foremost, this would be a heavy burden on the car drivers. At present, taxes are already high for a lot of people, and so further taxes would only mean less money at the end of the month for most people who may have no choice but to drive every day. In addition, this type of tax would likely be set at a fixed amount. This would mean that it would hit those with less money harder, whilst the rich could likely afford it. It is therefore not a fair tax.\n\nTo conclude, this solution is worth considering to improve the current situation, but there are advantages and disadvantages of introducing such a policy.",
    "analysis_vi": "Bài viết đạt mức B1 nhờ bố cục rõ ràng theo dạng nghị luận (mở bài, thân bài nêu lợi-hại, kết luận), sử dụng từ vựng và cấu trúc ngữ pháp tương đối linh hoạt, dù đôi chỗ còn lặp ý và từ ngữ."
  }
};

export const ULIS_WRITING_TEST_04 = {
  id: 'ulis_writing_test_04',
  test_number: 4,
  title: 'ULIS Authentic VSTEP Writing Test 04',
  institution: 'ULIS - ĐHQGHN',
  total_duration_minutes: 60,
  task1: ULIS_WRITING_TEST_04_TASK1,
  task2: ULIS_WRITING_TEST_04_TASK2,
};
