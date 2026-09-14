import type { SpeakingTest } from '../../../../../types/schemas';

/**
 * Authentic HCMUE VSTEP Speaking Test 03
 * Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017)
 */

export const HCMUE_SPEAKING_TEST_03: SpeakingTest = {
  "id": "hcmue_spk_test_03",
  "test_number": 3,
  "title": "HCMUE Authentic VSTEP Speaking Test 03",
  "part1": {
    "title": "Social Interaction",
    "duration_minutes": 3,
    "topics": [
      {
        "topic_name": "Noise",
        "topic_name_vi": "Tiếng ồn và môi trường sống",
        "questions": [
          "Do you like to live in a noisy place or a quiet place?",
          "What kind of noise disturbs you most?",
          "Does noise affect your health?"
        ]
      },
      {
        "topic_name": "Favorite Photograph",
        "topic_name_vi": "Bức ảnh kỷ niệm yêu thích",
        "questions": [
          "What is your favorite photograph?",
          "When was it taken?",
          "What makes the photograph special to you?"
        ]
      }
    ],
    "sample_response": {
      "band": "B2",
      "text": "I definitely prefer residing in a quiet neighborhood because tranquility allows me to concentrate on my research and sleep soundly. The noise that disturbs me the most is honking from heavy traffic and continuous drilling from construction sites. Constant acoustic pollution severely harms health, inducing hypertension, chronic headaches, and sleep disturbances. Regarding photographs, my absolute favorite picture is a family portrait taken during my high school graduation three years ago. What makes it extraordinarily special is that it captured all three generations of my family smiling together, celebrating a milestone in my academic journey.",
      "analysis_vi": "Câu trả lời cô đọng, giàu từ vựng học thuật (acoustic pollution, hypertension, family portrait, academic milestone)."
    }
  },
  "part2": {
    "title": "Solution Discussion",
    "duration_minutes": 4,
    "situation": "You are thinking about how to spend your evening. There are three options: hanging out with friends, reading books, and surfing the Internet. Explain your choice.",
    "options": [
      {
        "key": "Option 1",
        "title": "Hanging out with friends",
        "description": "Meeting up at a coffee shop, having dinner, and catching up on personal stories."
      },
      {
        "key": "Option 2",
        "title": "Reading books",
        "description": "Reading engaging fiction or non-fiction books before bedtime for quiet mindfulness."
      },
      {
        "key": "Option 3",
        "title": "Surfing the Internet",
        "description": "Browsing social media, watching video streams, and researching online topics."
      }
    ],
    "sample_response": {
      "band": "B2",
      "text": "Among the three activities for spending a relaxing evening, I would personally choose reading books. Immersing myself in a compelling novel or an insightful non-fiction book allows my mind to unwind peacefully without digital distractions. It broadens my vocabulary and fosters deep mindfulness before sleep. In contrast, while hanging out with friends is enjoyable and fosters camaraderie, it requires traveling outside through bustling traffic, which can be exhausting after a long day. Surfing the internet often leads to mindless scrolling on social feeds, and the blue light emitted from screens disrupts sleep cycles. Therefore, quiet reading is the most rewarding way to spend my evening.",
      "analysis_vi": "Lựa chọn phương án đọc sách, phản biện hợp lý về sự mệt mỏi khi ra đường gặp bạn bè và tác hại ánh sáng xanh khi lướt web."
    }
  },
  "part3": {
    "title": "Topic Development",
    "duration_minutes": 5,
    "topic": "There are several ways for people to make friends.",
    "mindmap_ideas": [
      "Joining social events",
      "Forming interest-based groups",
      "Attending parties"
    ],
    "follow_up_questions": [
      "Should people trust online friends? Why or why not?",
      "What factors can contribute to a true friendship?",
      "Which one is more important: family or friends?"
    ],
    "sample_response": {
      "band": "B2",
      "text": "Human beings are inherently social creatures, and forging meaningful friendships is essential for emotional well-being. There are several effective ways to connect with new people. First, participating in social and volunteer events provides opportunities to meet civic-minded individuals who share common philanthropic values. Second, joining interest-based clubs—such as sports, photography, or book clubs—allows people to bond effortlessly over shared passions. Third, attending communal celebrations and parties creates informal, joyful atmospheres for spontaneous interactions. Regarding online relationships, while the internet broadens social reach, one must exercise caution because virtual personas can be fabricated. A genuine friendship is founded on mutual loyalty, empathy, and active listening. Both family and friends are vital; however, familial ties offer unconditional lifelong support.",
      "analysis_vi": "Khai triển 3 nhánh tạo dựng tình bạn, phân tích sâu tính chân thật của bạn bè qua mạng và các giá trị cốt lõi của tình bạn đích thực."
    }
  }
};
