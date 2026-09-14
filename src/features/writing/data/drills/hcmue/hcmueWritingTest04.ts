import type { WritingPrompt } from '../../../../../types/schemas';
import type { WritingTestInput } from '../../../types';

/**
 * Authentic HCMUE VSTEP Writing Test 04
 * Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017)
 */

export const HCMUE_WRITING_TEST_04_TASK1: WritingPrompt = {
  "id": "hcmue_writing_test_04_t1",
  "task_type": "task1_letter",
  "title": "Letter to Mary reuniting high school memories from Oxford",
  "time_allowed_minutes": 20,
  "min_words": 120,
  "prompt_text": "Your English-speaking friend, Mary, whom you haven't met for a long time, sent you an email. Read part of her email below:\n\n...\nDo you remember me? We met when you visited my high school in Oxford during your summer trip to England 3 years ago. We haven't heard from each other for a long time, right?\nAnyway, how are you? What have you been doing? You always wanted to be a teacher!\nHere some of my news. I'm studying Laws at Oxford University. I think I have changed a lot over the years. I don't like thrillers any more. I prefer history books now. Do you remember Pete, the tall thin guy with glasses? He's on the same course as me. We are best friends now!\nWell, I must finish now because I have an exam tomorrow. It would be really good if we could get together again.\nWrite back soon and tell me all your news.\nMary.\n\nWrite a reply to Mary. In your email, you have to tell her you still remember her and the time you visited her high school, tell her all your news, and ask her to send your regards to Pete.\nYou should write at least 120 words.",
  "context_info": "Informal Letter / Reconnecting with Friends",
  "sample_response": {
    "band": "B2",
    "text": "Hi Mary,\n\nI'm very happy to hear from you again. It's been such a long time. Of course, I still remember you and the time I visited your high school in Oxford. I had lots of nice memories with you and your classmates that summer.\n\nI'm studying English at Ho Chi Minh City University of Education. I will be a teacher of English after graduation. I also work part-time as a tutor. I love to teach English to children because they look so adorable and seem eager to study another language.\n\nYou know, it's great to tell you that I will have a chance to return to Oxford this summer and definitely see you again there. As the best student of the course I'm taking at university, I have been awarded a two-week trip to Oxford this June. Just think and tell me what we are doing then.\n\nPlease send my best regards to Pete.\n\nKeep in touch.",
    "analysis_vi": "Bức thư kết nối ký ức đẹp ở trường cấp 3 Oxford, cập nhật việc học sư phạm tại ĐH Sư phạm TP.HCM, công việc gia sư và bất ngờ về chuyến đi học bổng trở lại Oxford vào tháng 6."
  }
};

export const HCMUE_WRITING_TEST_04_TASK2: WritingPrompt = {
  "id": "hcmue_writing_test_04_t2",
  "task_type": "task2_essay",
  "title": "Reasons and solutions for rising youth crime in major cities",
  "time_allowed_minutes": 40,
  "min_words": 250,
  "prompt_text": "Levels of youth crime are increasing rapidly in major cities in Viet Nam.\nWhat are the reasons for this? Suggest some solutions.\nGive reasons for your answer and include any relevant examples from your own experience or knowledge.\nYou should write at least 250 words.",
  "context_info": "Causes and Solutions Essay",
  "sample_response": {
    "band": "C1",
    "text": "Over the last few years, many cities throughout the country have seen an alarming increase in the levels of youth crime. This has become a question that not only the authorities but also parents are concerned about. In this essay, I would like to analyze some reasons for this and suggest some possible solutions.\n\nThe causes of this issue lies in the way the youth are brought up by their parents and the increasing level of poverty in cities. The first reason is connected with the family. In order for a child to grow up in a balanced way, it is very important that he or she must be nurtured by his or her parents with love, care, and support. However, these days, it is often the case that children are neglected due to the fact that many parents in cities now are too busy with their work to give their children good advice and support in time. Another factor to consider is the increasing levels of poverty around the world. We have seen with globalization the rich get far richer and the poor get much poorer, and this inevitably means that those who were unfortunately born into a poor family and are reluctant to work hard, but want to live in comfort turn to robbing and stealing. Reality shows that they even dare to kill others to grab what they desire.\n\nTo solve the problem, we should take several measures on the part of families as well as society. First, parents must spend more time with their children to control what they do and how they behave so as to offer them timely guidance and prevent them from making a mistake and then committing a crime. Second, those who commit a crime must be severely punished; for example, a teenage murderer can be sentenced to death. It is also essential that the authorities send young criminals to a rehabilitation center, where they have a chance to learn how to behave well and get some vocational training so that they can find a job to support themselves later.\n\nIn conclusion, several factors have led to a dramatic increase in youth crime at present, but feasible solutions are available to tackle this problem. I'm convinced that taking the above-mentioned measures can help to reduce the level of youth crime substantially in big cities of Viet Nam.",
    "analysis_vi": "Bài luận dạng Nguyên nhân & Giải pháp (Causes & Solutions) trình độ C1, phân tích sâu hai gốc rễ (thiếu giáo dục gia đình và phân hóa giàu nghèo), kèm giải pháp răn đe và phục hồi nhân phẩm qua trường giáo dưỡng."
  }
};

export const HCMUE_WRITING_TEST_04: WritingTestInput = {
  id: 'hcmue_writing_test_04',
  test_number: 4,
  title: 'HCMUE Authentic VSTEP Writing Test 04',
  institution: 'HCMUE - ĐH Sư phạm TP.HCM',
  total_duration_minutes: 60,
  task1: HCMUE_WRITING_TEST_04_TASK1,
  task2: HCMUE_WRITING_TEST_04_TASK2,
};
