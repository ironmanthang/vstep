import type { SpeakingTest } from '../../../../../types/schemas';

/**
 * Authentic HCMUE VSTEP Speaking Test 01
 * Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017)
 */

export const HCMUE_SPEAKING_TEST_01: SpeakingTest = {
  "id": "hcmue_spk_test_01",
  "test_number": 1,
  "title": "HCMUE Authentic VSTEP Speaking Test 01",
  "part1": {
    "title": "Social Interaction",
    "duration_minutes": 3,
    "topics": [
      {
        "topic_name": "Walking",
        "topic_name_vi": "Đi bộ và vận động",
        "questions": [
          "Do you like walking? When and where do you walk?",
          "Do you think walking is important?",
          "Do you think walking in the countryside is better than walking in the city?"
        ]
      },
      {
        "topic_name": "Eating Habits",
        "topic_name_vi": "Thói quen ăn uống",
        "questions": [
          "Do you often eat healthy food?",
          "What do you usually eat at school/ at work?",
          "What is the unhealthiest food you can think of?"
        ]
      }
    ],
    "sample_response": {
      "band": "B2",
      "text": "Yes, I really enjoy walking, especially in the early morning around the local park near my house. It is a wonderful way to breathe fresh air and kick-start my day. I strongly believe walking is essential for our physical well-being because it enhances blood circulation and reduces stress after intense working hours. While walking in the countryside offers scenic greenery and peaceful tranquility without heavy traffic, city walking can also be convenient for daily commuting and socializing with neighborhood friends. Regarding eating habits, I always try to maintain a balanced diet with green vegetables, fresh fruits, and fish. At work, I usually pack homemade meals to avoid oily fast food, which I consider the unhealthiest due to excessive saturated fats and processed sodium.",
      "analysis_vi": "Câu trả lời phát triển tự nhiên đầy đủ các ý của 2 chủ đề (Đi bộ & Thói quen ăn uống), kết hợp từ vựng diễn đạt phong phú (kick-start, blood circulation, tranquility, balanced diet, processed sodium)."
    }
  },
  "part2": {
    "title": "Solution Discussion",
    "duration_minutes": 4,
    "situation": "You are choosing a birthday gift for your friend. There are three suggestions: a book, a music show ticket, and a shopping coupon. Which do you think is the best choice?",
    "options": [
      {
        "key": "Option 1",
        "title": "A book",
        "description": "An affordable gift, creating good memories and high availability with diverse genres."
      },
      {
        "key": "Option 2",
        "title": "A music show ticket",
        "description": "A special memorable gift, providing enjoyment of watching live music and meeting idols."
      },
      {
        "key": "Option 3",
        "title": "A shopping coupon",
        "description": "A flexible and convenient gift for friends to pick their own favorite items."
      }
    ],
    "sample_response": {
      "band": "B2",
      "text": "If I had to choose a birthday gift for my close friend, I would definitely opt for a book. First of all, a book is not only affordable but also carries lasting sentimental value. Whenever my friend reads it, they will be reminded of our friendship, and there is a vast selection of inspirational or literary genres to match their specific interest. Although a music show ticket offers an exhilarating live experience and the chance to see beloved artists, it is quite expensive and dependent on whether my friend is free on that particular evening. A shopping coupon is undoubtedly practical and convenient, yet it somewhat lacks emotional warmth and personal thoughtfulness. Therefore, a meaningful book remains the best option for me.",
      "analysis_vi": "Bài nói hoàn thành xuất sắc cấu trúc Part 2: nêu rõ lựa chọn (cuốn sách), giải thích 2 ưu điểm thuyết phục và phản biện so sánh loại trừ 2 phương án còn lại (vé ca nhạc & phiếu mua hàng)."
    }
  },
  "part3": {
    "title": "Topic Development",
    "duration_minutes": 5,
    "topic": "Cheap air travel should be promoted.",
    "mindmap_ideas": [
      "Offers a flexible travelling mode",
      "Reduces travelling costs",
      "Creates business opportunities"
    ],
    "follow_up_questions": [
      "Do you think that governments should encourage cheap flights?",
      "Are there any problems with low-cost air travel?",
      "Cheap air tickets should be offered on domestic flights or international flights?"
    ],
    "sample_response": {
      "band": "B2",
      "text": "In contemporary society, affordable air travel plays a vital role in modern transport. I firmly agree that cheap flights should be widely promoted for three principal reasons. First, low-cost carriers significantly reduce travelling expenses, allowing low-income citizens and students to visit relatives or explore distant regions without financial strain. Second, cheap air travel offers a flexible travelling mode with numerous daily flight schedules and promotional fares, making travel planning more accessible. Third, it creates tremendous business opportunities by connecting regional enterprises, facilitating swift trade of perishable goods, and boosting tourism revenue for local communities. Nevertheless, low-cost travel often involves drawbacks such as cramped legroom, extra fees for baggage, and frequent flight delays. In my view, governments should support affordable domestic routes first to bolster national economic integration before expanding low-cost international corridors.",
      "analysis_vi": "Bài phát triển chủ đề bám sát 3 nhánh sơ đồ tư duy (tiết kiệm chi phí, linh hoạt lịch trình, tạo cơ hội kinh doanh) và giải quyết trọn vẹn các câu hỏi mở rộng về hạn chế và phạm vi đường bay."
    }
  }
};
