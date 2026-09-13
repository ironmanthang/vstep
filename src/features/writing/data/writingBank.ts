import type { WritingPrompt } from '../../../types/schemas';
import type { WritingTestInput } from '../WritingRunner';

/**
 * Authentic VSTEP Writing Practice Bank (Task 1 Letters & Task 2 Essays)
 * Sourced from MOET VSTEP Authentic Exam Archive & Benchmark Responses
 */

export const WRITING_TASK1_BANK: WritingPrompt[] = [
  {
    id: 'vstep_w_t1_01',
    task_type: 'task1_letter',
    title: 'Letter 1: Course Evaluation & Feedback to Center Manager',
    time_allowed_minutes: 20,
    min_words: 120,
    prompt_text: `You have recently finished a 3-month English speaking course at Sunrise Language Center. Write a letter to the center director (Mr. Davis). In your letter:
- Express your gratitude and mention what you liked most about the course.
- Point out one or two aspects that could be improved (e.g., classroom facilities or speaking practice time).
- Suggest ideas for future advanced workshops.`,
    context_info: 'Formal Letter / Course Feedback',
    sample_response: {
      band: 'B2',
      text: `Dear Mr. Davis,

I am writing to express my sincere appreciation for the three-month English speaking course that I recently completed at Sunrise Language Center. Overall, the course provided me with tremendous confidence in communicative English.

First and foremost, I would like to commend our instructor, Ms. Sarah, whose engaging interactive activities and patient feedback greatly improved our pronunciation and natural conversational rhythm. 

However, I would like to offer a constructive suggestion regarding the course structure. On several occasions, the 90-minute class duration felt slightly rushed for pairwise debates. Allocating an extra fifteen minutes for peer feedback would enable students to consolidate teacher corrections more effectively. Furthermore, introducing specialized weekend workshops on academic presentation skills would be immensely beneficial for students preparing for international certifications.

Thank you once again for providing such a rewarding learning environment. I look forward to enrolling in future advanced modules at your center.

Yours sincerely,
Nguyen Van An`,
      analysis_vi: 'Bài viết đạt chuẩn cấu trúc thư trang trọng (Dear Mr. Davis / Yours sincerely), hoàn thành đầy đủ 3 ý của đề bài với từ vựng học thuật tự nhiên (commend, constructive suggestion, allocate, peer feedback).',
    },
  },
  {
    id: 'vstep_w_t1_02',
    task_type: 'task1_letter',
    title: 'Letter 2: Job Application for Community Sports Assistant',
    time_allowed_minutes: 20,
    min_words: 120,
    prompt_text: `You saw an advertisement for a part-time Assistant Coordinator at the City Youth Community Sports Club. Write a letter to the club manager (Ms. Laura Roberts). In your letter:
- State why you are writing and where you saw the job advertisement.
- Describe your relevant experience, athletic background, and English communication skills.
- State your availability for an interview and when you can start working.`,
    context_info: 'Formal Letter / Job Application',
    sample_response: {
      band: 'B2',
      text: `Dear Ms. Roberts,

I am writing to express my strong interest in the part-time Assistant Coordinator position advertised on the City Youth Community portal on May 10th.

As a final-year student majoring in Physical Education with an active passion for youth mentorship, I believe my background aligns well with your club’s mission. Over the past two years, I have volunteered as a team captain in university football leagues, where I developed robust leadership, event scheduling, and conflict resolution abilities. Additionally, possessing a VSTEP B2 English certificate allows me to communicate effortlessly with international club members and coaches.

I am enthusiastic about the opportunity to contribute to your community sports initiatives and am available for an interview at your earliest convenience. If selected, I would be able to commence work immediately on weekday afternoons and weekends.

Thank you for your time and consideration.

Yours sincerely,
Tran Minh Duc`,
      analysis_vi: 'Bài viết triển khai mạch lạc mục đích ứng tuyển, làm nổi bật kinh nghiệm phù hợp (leadership, event scheduling) và khả năng ngôn ngữ.',
    },
  },
  {
    id: 'vstep_w_t1_03',
    task_type: 'task1_letter',
    title: 'Letter 3: Complaint & Refund Request for Damaged Delivery',
    time_allowed_minutes: 20,
    min_words: 120,
    prompt_text: `You ordered an ergonomic study desk and chair from ModernLiving Online Store, but the package arrived two weeks late with noticeable scratches and missing assembly screws. Write a letter of complaint to the customer service department. In your letter:
- Provide details of your order (order ID, purchase date).
- Describe the problems with the delivery delay and damaged merchandise.
- Clearly state the resolution you expect (replacement parts or a partial refund).`,
    context_info: 'Formal Letter / Customer Complaint',
    sample_response: {
      band: 'C1',
      text: `Dear Customer Support Team,

I am writing to formally register a complaint regarding order #ML-84920, which comprised an ergonomic study desk and executive chair purchased on April 12th through your official website.

To my disappointment, the consignment arrived two weeks past the guaranteed delivery window without prior notification. More critically, upon unboxing the parcel, I discovered deep scratches along the wooden tabletop surface, and the essential hardware kit containing assembly screws was entirely missing, rendering the furniture unusable.

Given the inconvenience caused and the substandard condition of the delivered goods, I request that you dispatch the missing hardware immediately alongside a 20% partial refund for the cosmetic damage. Alternatively, I am prepared to accept a complete replacement of the damaged tabletop at no additional shipping fee.

I have attached photographic evidence of the damaged package for your review and expect your prompt response within three business days.

Yours faithfully,
Le Hoang Long`,
      analysis_vi: 'Văn phong trang trọng chính xác (formally register a complaint, consignment, dispatch, photographic evidence). Đưa ra yêu cầu bồi hoàn cụ thể, dứt khoát.',
    },
  },
];

export const WRITING_TASK2_BANK: WritingPrompt[] = [
  {
    id: 'vstep_w_t2_01',
    task_type: 'task2_essay',
    title: 'Essay 1: The Impact of Social Media on Youth Self-Esteem and Mental Health',
    time_allowed_minutes: 40,
    min_words: 250,
    prompt_text: `In contemporary society, an increasing number of young individuals spend considerable hours on social networking platforms such as Instagram and TikTok. Some people argue that social media fosters global connectivity, while others contend that it severely harms young people's self-esteem and mental well-being.

Discuss both views and give your own opinion. Support your position with relevant arguments and real-life examples.`,
    context_info: 'Discussion Essay / Technology & Psychology',
    sample_response: {
      band: 'B2',
      text: `In the digital era, the ubiquitous presence of social networking platforms has profoundly transformed how young people communicate, learn, and perceive themselves. While these virtual spaces offer unprecedented opportunities for global interaction, I firmly believe that the psychological detriments—specifically regarding self-esteem and peer comparison—outweigh the benefits.

On the one hand, proponents of social media highlight its power to bridge geographical divides and nurture supportive communities. Through platforms like TikTok and Instagram, adolescents can discover like-minded peers, exchange educational resources, and participate in creative expression regardless of location. For marginalized individuals, online groups often serve as a vital emotional sanctuary where they can voice concerns without fear of immediate social stigma.

On the other hand, extensive exposure to idealized digital personas poses severe hazards to adolescent self-worth. Social media feeds are predominantly curated highlights of users' lives, characterized by filtered aesthetics and unrealistic lifestyles. When adolescents constantly compare their daily realities to these polished portrayals, feelings of inadequacy, anxiety, and body dissatisfaction frequently ensue. Furthermore, the addictive pursuit of social validation through "likes" and comments fosters an externalized sense of self-esteem that can lead to depressive symptoms when validation is withheld.

In conclusion, while social networks facilitate meaningful connections, their pervasive culture of comparison and validation-seeking exerts a toxic influence on young minds. To mitigate these adverse outcomes, educational institutions and parents must actively promote digital literacy, encouraging mindful consumption rather than passive scrolling.`,
      analysis_vi: 'Bài luận 4 đoạn cân đối hoàn hảo (Mở bài - 2 Thân bài đối chiếu - Kết bài), sử dụng các cụm liên kết và thuật ngữ chuyên ngành (ubiquitous presence, psychological detriments, idealized digital personas, social validation, digital literacy).',
    },
  },
  {
    id: 'vstep_w_t2_02',
    task_type: 'task2_essay',
    title: 'Essay 2: The Integration of Educational Video Games into School Curricula',
    time_allowed_minutes: 40,
    min_words: 250,
    prompt_text: `Many educators and researchers advocate incorporating interactive video games and simulation software into traditional school curricula, arguing that gamification boosts student engagement and critical problem-solving skills. However, critics argue that video games encourage screen addiction and distract from rigorous academic fundamentals.

To what extent do you agree or disagree with the use of video games in schools?`,
    context_info: 'Opinion / Argumentative Essay',
    sample_response: {
      band: 'C1',
      text: `The incorporation of digital gamification into mainstream education has ignited vigorous debate among educators and policymakers. While detractors worry that gaming promotes screen addiction and trivializes traditional learning, I strongly argue that purpose-built educational video games are invaluable pedagogical instruments that cultivate problem-solving acumen and deep conceptual understanding.

The foremost advantage of gamified learning lies in its extraordinary capacity to stimulate intrinsic motivation. Traditional rote memorization frequently alienates students, whereas interactive simulations—such as historical role-playing games or physics puzzle solvers—require active trial-and-error experimentation. By navigating complex in-game scenarios, learners synthesize theoretical knowledge into practical decision-making. For instance, simulation programs like Minecraft Education allow students to grasp architectural engineering and collaborative resource management through immersive tactile experiences.

Furthermore, educational video games provide immediate formative feedback, which is crucial for cognitive development. In conventional classroom settings, grading feedback often takes days, whereas digital games instantly illuminate logical errors without social embarrassment, encouraging a growth mindset and persistence. 

Critics legitimately highlight the risk of excessive screen time and potential distraction. However, these concerns can be systematically addressed through structured pedagogical governance. Games should not replace teachers, but rather function as supplementary tools deployed within strict time limits and aligned with clear curricular benchmarks.

In conclusion, when thoughtfully calibrated and pedagogically anchored, educational video games transcend mere entertainment to become powerful catalysts for 21st-century problem-solving skills. Educational institutions should embrace gamification rather than resist it.`,
      analysis_vi: 'Lập luận sắc sảo, cấu trúc từ vựng C1 xuất sắc (pedagogical instruments, intrinsic motivation, formative feedback, cognitive development, pedagogical governance).',
    },
  },
];

export const ALL_WRITING_PRACTICE_PROMPTS = [
  ...WRITING_TASK1_BANK,
  ...WRITING_TASK2_BANK,
];

export const ALL_PRACTICE_WRITING_TESTS: WritingTestInput[] = [
  {
    id: 'vstep_writing_prac_01',
    test_number: 1,
    title: 'Đề Luyện Viết 1: Đánh Giá Khóa Học & Mạng Xã Hội',
    institution: 'VSTEP Authentic Practice Bank',
    total_duration_minutes: 60,
    task1: WRITING_TASK1_BANK[0],
    task2: WRITING_TASK2_BANK[0],
  },
  {
    id: 'vstep_writing_prac_02',
    test_number: 2,
    title: 'Đề Luyện Viết 2: Đơn Xin Việc & Trò Chơi Giáo Dục',
    institution: 'VSTEP Authentic Practice Bank',
    total_duration_minutes: 60,
    task1: WRITING_TASK1_BANK[1],
    task2: WRITING_TASK2_BANK[1],
  },
  {
    id: 'vstep_writing_prac_03',
    test_number: 3,
    title: 'Đề Luyện Viết 3: Khiếu Nại Đơn Hàng & Mạng Xã Hội',
    institution: 'VSTEP Authentic Practice Bank',
    total_duration_minutes: 60,
    task1: WRITING_TASK1_BANK[2],
    task2: WRITING_TASK2_BANK[0],
  },
];

