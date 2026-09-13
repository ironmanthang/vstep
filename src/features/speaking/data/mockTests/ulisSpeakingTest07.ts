import type { SpeakingTest } from '../../../../types/schemas';

/**
 * Authentic ULIS VSTEP Speaking Test 07
 * Sourced from "7 Vstep Tests B1-B2-C1 Full Key" (ULIS - ĐHQGHN, 2019)
 */

export const ULIS_SPEAKING_TEST_07: SpeakingTest = {
  "id": "ulis_spk_test_07",
  "test_number": 7,
  "title": "ULIS Authentic VSTEP Speaking Test 07",
  "part1": {
    "title": "Social Interaction",
    "duration_minutes": 3,
    "topics": [
      {
        "topic_name": "Seasons",
        "topic_name_vi": "Các mùa trong năm",
        "questions": [
          "What season do you like best? Why?",
          "What is the weather like in your favorite season?",
          "What do you usually do in that season?"
        ]
      },
      {
        "topic_name": "Sports",
        "topic_name_vi": "Thể thao & Rèn luyện",
        "questions": [
          "Do you play any sports?",
          "How often do you play sports?",
          "Why do you like playing sports?"
        ]
      }
    ],
    "sample_response": {
      "band": "B1",
      "text": "1. What season do you like best? Why? - I like autumn most because the weather is so pleasant, not too hot and not too cold. 2. Do you play sports? - Yes, of course. I often play football with my friends. 3. How often do you play sports? - I play sports every day, after work. 4. Why do you like sports? - It is not only relaxing after a hard-working day but also very good for my health.",
      "analysis_vi": "Các câu trả lời sử dụng ngữ pháp và từ vựng đơn giản, quen thuộc, đủ ý đáp ứng các câu hỏi giao tiếp cơ bản."
    }
  },
  "part2": {
    "title": "Solution Discussion",
    "duration_minutes": 4,
    "situation": "One of your foreign friends wants to get to know one festival in Vietnam. Tell her one festival you recommend.",
    "options": [
      {
        "key": "Option 1",
        "title": "Tết (Lunar New Year)",
        "description": "The largest and most meaningful traditional celebration with family reunions and lucky money"
      },
      {
        "key": "Option 2",
        "title": "Mid-Autumn Festival (Tết Trung Thu)",
        "description": "Festive night celebration with colorful lantern parades, lion dances, and mooncakes"
      },
      {
        "key": "Option 3",
        "title": "Hương Pagoda Festival (Lễ hội Chùa Hương)",
        "description": "Historic spring pilgrimage with scenic boat rides along the Yen River"
      }
    ],
    "sample_response": {
      "band": "B1",
      "text": "I am going to talk about Tet. It is the biggest festival in Vietnam. It is on the first days of the year. It is very important. All Vietnamese people come home and have Tet with their family. People often make Chung cake, clean and decorate the house. Children are the happiest because they have new clothes, eat good food and get a lot of lucky money.",
      "analysis_vi": "Bài nói triển khai đúng trọng tâm yêu cầu đề bài (giới thiệu một lễ hội), sử dụng từ vựng phổ biến và các câu đơn, câu ghép ở mức B1."
    }
  },
  "part3": {
    "title": "Topic Development",
    "duration_minutes": 5,
    "topic": "Describe the activity you do when you have free time",
    "mindmap_ideas": [
      "What activity it is",
      "How often do you do it",
      "Why do you like this activity"
    ],
    "follow_up_questions": [
      "Do people in your country have enough free time nowadays?",
      "How do young people usually spend their leisure time?"
    ],
    "sample_response": {
      "band": "B1",
      "text": "In my free time, I really enjoy playing football. I usually play it twice a week on weekends with my colleagues and friends from university. I like this activity very much because it helps me relieve stress after working long hours in front of the computer. Furthermore, it keeps me physically fit and strengthens our friendship.",
      "analysis_vi": "Bài phát triển chủ đề bám sát 3 nhánh gợi ý (What activity it is, How often you do it, Why you like it) bằng các cấu trúc câu rõ ràng, mạch lạc."
    }
  }
};
