import type { SpeakingTest } from '../../../../types/schemas';

/**
 * Authentic ULIS VSTEP Speaking Test 03
 * Sourced from "7 Vstep Tests B1-B2-C1 Full Key" (ULIS - ĐHQGHN, 2019)
 */

export const ULIS_SPEAKING_TEST_03: SpeakingTest = {
  "id": "ulis_spk_test_03",
  "test_number": 3,
  "title": "ULIS Authentic VSTEP Speaking Test 03",
  "part1": {
    "title": "Social Interaction",
    "duration_minutes": 3,
    "topics": [
      {
        "topic_name": "Holiday",
        "topic_name_vi": "Kỳ nghỉ",
        "questions": [
          "What did you do on your last holiday?",
          "Who do you prefer spending your holiday with? Relatives or friends?",
          "Do you prefer going on holiday abroad?"
        ]
      },
      {
        "topic_name": "TV programmes",
        "topic_name_vi": "Chương trình truyền hình",
        "questions": [
          "How many hours a day do you watch television?",
          "Which programmes do you like?",
          "Do you prefer watching television alone or with other people? Why?"
        ]
      }
    ],
    "sample_response": {
      "band": "B1",
      "text": "1. What did you do on your last holiday? - I went to Halong Bay.\n2. Who do you prefer spending your holiday with? Relatives or friends? - With my friends. I have more fun\n3. Do you prefer going on holiday abroad? - No. It's too expensive\n4. How many hours a day do you watch television? - For about two hours\n5. Which programmes do you like? - I like films most\n6. Do you prefer watching television alone or with other people? Why? - With other people because I can share with them anything about what I am watching",
      "analysis_vi": "Cầu trả lời trực tiếp, rõ ràng, sử dụng từ vựng và cấu trúc ngữ pháp cơ bản phù hợp với trình độ B1."
    }
  },
  "part2": {
    "title": "Solution Discussion",
    "duration_minutes": 4,
    "situation": "If you won the lottery of 1 billion VND, what would you do with the money?",
    "options": [
      {
        "key": "Option 1",
        "title": "Buy a new house.",
        "description": "Buy a new house."
      },
      {
        "key": "Option 2",
        "title": "Start a business.",
        "description": "Start a business."
      },
      {
        "key": "Option 3",
        "title": "Deposit the money in the bank.",
        "description": "Deposit the money in the bank."
      }
    ],
    "sample_response": {
      "band": "B1",
      "text": "I would start a business as I have always wanted to have my own shop. I really like fashion so I will open a clothes shop. I think I would get a lot of experience of being a saleswoman and I would be able to get a lot of money",
      "analysis_vi": "Thí sinh đã chọn được 1 phương án (start a business), đưa ra lý do cụ thể và giải thích rõ ràng mạch lạc."
    }
  },
  "part3": {
    "title": "Topic Development",
    "duration_minutes": 5,
    "topic": "Describe a popular holiday destination in your country.",
    "mindmap_ideas": [
      "Location and scenery",
      "Things to do and see",
      "Best time to visit"
    ],
    "follow_up_questions": [
      "Why do you think this destination is so popular?",
      "How has tourism changed this place over recent years?"
    ],
    "sample_response": {
      "band": "B1",
      "text": "I am going to talk about Halong Bay. It is a popular holiday destination in Vietnam. It is very beautiful and famous. It is one of the seven wonders of the world. Here we can go sightseeing, climb mountains and eat seafood. Every year, millions of people come here to enjoy their holiday.",
      "analysis_vi": "Phát triển chủ đề mạch lạc bằng cách giới thiệu địa điểm, mô tả đặc điểm nổi bật và các hoạt động có thể làm tại đây."
    }
  }
};
