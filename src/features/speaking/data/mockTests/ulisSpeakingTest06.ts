import type { SpeakingTest } from '../../../../types/schemas';

/**
 * Authentic ULIS VSTEP Speaking Test 06
 * Sourced from "7 Vstep Tests B1-B2-C1 Full Key" (ULIS - ĐHQGHN, 2019)
 */

export const ULIS_SPEAKING_TEST_06: SpeakingTest = {
  "id": "ulis_spk_test_06",
  "test_number": 6,
  "title": "ULIS Authentic VSTEP Speaking Test 06",
  "part1": {
    "title": "Social Interaction",
    "duration_minutes": 3,
    "topics": [
      {
        "topic_name": "Hometown",
        "topic_name_vi": "Quê hương",
        "questions": [
          "Where are you from?",
          "How far is it from your hometown?",
          "What do you like about your hometown?"
        ]
      },
      {
        "topic_name": "Job & Career",
        "topic_name_vi": "Công việc & Nghề nghiệp",
        "questions": [
          "What do you do?",
          "Do you earn much money from your job?",
          "Do you choose a job because of high salary or other things?"
        ]
      }
    ],
    "sample_response": {
      "band": "B1",
      "text": "1. Where are you from? - I am from Hai Phong City.\n2. How far is it from your hometown? - It is about 70 kilometres from here.\n3. What do you like about your hometown? - I like the food and the people. We have seafood which is tasty and cheap. The people are friendly and helpful. They are willing to help you when you need.\n4. What do you do? - I am a doctor.\n5. Do you earn much money from your job? - No. But it is enough for my family to live here in Hanoi.\n6. Do you choose a job because if high salary or other things? - I choose the job that I like",
      "analysis_vi": "Các câu trả lời ngắn gọn, rõ ràng, sử dụng từ vựng quen thuộc (friendly, helpful, tasty) và cấu trúc ngữ pháp cơ bản đạt chuẩn bậc 3 (B1)."
    }
  },
  "part2": {
    "title": "Solution Discussion",
    "duration_minutes": 4,
    "situation": "If you have $500, what phone would you buy?",
    "options": [
      {
        "key": "Option 1",
        "title": "Phone A",
        "description": "Phone option 1"
      },
      {
        "key": "Option 2",
        "title": "Phone B",
        "description": "Phone option 2"
      },
      {
        "key": "Option 3",
        "title": "Phone C",
        "description": "Phone option 3"
      }
    ],
    "sample_response": {
      "band": "B1",
      "text": "If I have $500, I would buy an Iphone because it is reliable, fashionable and easy to use. It has the best security. It is the fact that today a big number of people in the world use Iphone",
      "analysis_vi": "Bài nói đưa ra một lựa chọn cụ thể (mua iPhone với $500) và cung cấp các lý do đơn giản nhưng thuyết phục, đúng chuẩn cấu trúc giải quyết vấn đề B1."
    }
  },
  "part3": {
    "title": "Topic Development",
    "duration_minutes": 5,
    "topic": "Describe a means of public transport",
    "mindmap_ideas": [
      "What means of public transport it is",
      "Where is it popular?",
      "What do you like and dislike about it?"
    ],
    "follow_up_questions": [
      "Why do people use public transport?",
      "How to improve public transport in your city?"
    ],
    "sample_response": {
      "band": "B1",
      "text": "Buses are very popular in big cities. People use buses to go to work or school. They are cheap, safe and convenient. However, they are dirty, noisy and smelly. Sometimes, it takes a lot of time to wait for the bus",
      "analysis_vi": "Bài phát triển chủ đề đề cập đầy đủ các khía cạnh: loại phương tiện, nơi phổ biến, và nêu rõ các ưu điểm cũng như nhược điểm với từ vựng dễ hiểu."
    }
  }
};
