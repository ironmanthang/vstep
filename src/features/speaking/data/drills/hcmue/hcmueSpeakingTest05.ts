import type { SpeakingTest } from '../../../../../types/schemas';

/**
 * Authentic HCMUE VSTEP Speaking Test 05
 * Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017)
 */

export const HCMUE_SPEAKING_TEST_05: SpeakingTest = {
  "id": "hcmue_spk_test_05",
  "test_number": 5,
  "title": "HCMUE Authentic VSTEP Speaking Test 05",
  "part1": {
    "title": "Social Interaction",
    "duration_minutes": 3,
    "topics": [
      {
        "topic_name": "Parties",
        "topic_name_vi": "Tiệc tùng và sự kiện họp mặt",
        "questions": [
          "Do you enjoy going to a party?",
          "What do you usually do at a party?",
          "On what occasions do you hold a party?"
        ]
      },
      {
        "topic_name": "Your City",
        "topic_name_vi": "Khám phá thành phố nơi bạn sống",
        "questions": [
          "Which part of the city do you like best?",
          "Why do you like it?",
          "Are there any changes you would like to make to the place?"
        ]
      }
    ],
    "sample_response": {
      "band": "B2",
      "text": "I definitely enjoy attending social parties because they provide refreshing opportunities to catch up with acquaintances, savor festive cuisine, and unwind with lively music. I usually host parties for significant milestones such as birthdays, Lunar New Year reunions, or celebrating exam completions with classmates. Speaking of Ho Chi Minh City, the area I adore the most is the historic downtown around District 1 and the Saigon River promenade. I love its vibrant juxtaposition of French colonial architecture and modern skyscrapers. If I could implement changes, I would expand pedestrian-only green boulevards and upgrade the public transit bus network to alleviate rush-hour congestion.",
      "analysis_vi": "Phản xạ mượt mà, trả lời trọn vẹn cả 6 câu hỏi của 2 chủ đề Tiệc tùng & Thành phố với hình ảnh so sánh sống động (vibrant juxtaposition, promenade, colonial architecture)."
    }
  },
  "part2": {
    "title": "Solution Discussion",
    "duration_minutes": 4,
    "situation": "You are considering buying a brand watch. There are three suggestions for how to get it: placing an order through a website, shopping in a mall, and calling over the phone. Which one is the best option for you?",
    "options": [
      {
        "key": "Option 1",
        "title": "Placing an order through a website",
        "description": "Convenient online browsing, price comparisons, customer reviews, and doorstep delivery."
      },
      {
        "key": "Option 2",
        "title": "Shopping in a mall",
        "description": "Hands-on tactile try-on, verifying authenticity directly, and obtaining instant warranty service."
      },
      {
        "key": "Option 3",
        "title": "Calling over the phone",
        "description": "Personalized telephone customer assistance, checking stock availability, and placing orders."
      }
    ],
    "sample_response": {
      "band": "B2",
      "text": "When investing in a premium brand watch, shopping directly in an authorized shopping mall is undoubtedly the most prudent approach. A luxury watch is a significant financial investment, and visiting an official boutique allows me to inspect the craftsmanship firsthand, try it on my wrist to assess fit and weight, and verify authentic warranties and serial certificates. Conversely, although online ordering offers convenience and price comparisons, there is an inherent risk of receiving counterfeit merchandise or damaged packaging during shipment. Ordering via telephone lacks visual inspection entirely, making it difficult to evaluate aesthetics accurately. Therefore, buying at a shopping mall guarantees genuine quality and peace of mind.",
      "analysis_vi": "Lập luận sắc bén, chú trọng yếu tố thẩm định giá trị món hàng cao cấp (craftsmanship, serial certificates, counterfeit merchandise), loại bỏ thuyết phục 2 kênh mua từ xa."
    }
  },
  "part3": {
    "title": "Topic Development",
    "duration_minutes": 5,
    "topic": "There are several factors that lead to success in life.",
    "mindmap_ideas": [
      "Education and skills",
      "Vision",
      "Passion"
    ],
    "follow_up_questions": [
      "Why is money the most common way of judging success?",
      "Is your idea of success the same as your parents' idea of success?",
      "Does luck play a part in success?"
    ],
    "sample_response": {
      "band": "B2",
      "text": "Achieving success in life is a multifaceted endeavor driven by several fundamental factors. Firstly, education and practical skills lay the indispensable bedrock, equipping individuals with technical competence and critical problem-solving faculties. Secondly, having a clear strategic vision allows people to set long-term milestones and navigate unpredictable obstacles with resilience. Thirdly, relentless passion fuels perseverance during difficult setbacks; without intrinsic enthusiasm, sustained excellence is impossible. Society often equates success with financial wealth because monetary assets are easily quantifiable, yet true fulfillment encompasses emotional contentment and societal contribution. While my parents often associate success with steady professional security, I view success as self-actualization and continuous growth. Fortunate timing and luck may offer sudden openings, but only consistent preparation transforms luck into enduring achievement.",
      "analysis_vi": "Triển khai tư duy trừu tượng xuất sắc, phân tích sâu sắc mối quan hệ giữa học thức, tầm nhìn, đam mê với tiền tài và sự tự hoàn thiện bản thân (self-actualization, quantifiable, perseverance)."
    }
  }
};
