import type { SpeakingTest } from '../../../../../types/schemas';

/**
 * Authentic HCMUE VSTEP Speaking Test 02
 * Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017)
 */

export const HCMUE_SPEAKING_TEST_02: SpeakingTest = {
  "id": "hcmue_spk_test_02",
  "test_number": 2,
  "title": "HCMUE Authentic VSTEP Speaking Test 02",
  "part1": {
    "title": "Social Interaction",
    "duration_minutes": 3,
    "topics": [
      {
        "topic_name": "Weather",
        "topic_name_vi": "Thời tiết và cảm xúc",
        "questions": [
          "What kind of weather do you like?",
          "Does weather affect your mood/ feeling?",
          "What do you usually do in hot/ cold weather?"
        ]
      },
      {
        "topic_name": "Favorite Childhood Game",
        "topic_name_vi": "Trò chơi tuổi thơ",
        "questions": [
          "What game(s) did you enjoy playing when you were a child?",
          "Who did you play with?",
          "Did you need any skills to play the game?"
        ]
      }
    ],
    "sample_response": {
      "band": "B2",
      "text": "My favorite weather is cool, breezy autumn weather because it makes outdoor activities comfortable and refreshing. Weather undeniably influences human feelings; sunny days always make me energetic and cheerful, whereas overcast, rainy days tend to make me slightly lethargic. On scorching hot summer days, I prefer swimming or staying indoors in air-conditioned spaces, while in chilly winter weather, I enjoy curling up with a hot cup of tea and reading books. Talking about my childhood, I used to love playing hide-and-seek with my neighborhood peers and school classmates. It was truly thrilling because it required agility, stealth, and quick observation skills to outsmart the seeker without getting caught.",
      "analysis_vi": "Trả lời lưu loát 2 chủ đề với vốn từ phong phú miêu tả trạng thái thời tiết và kỷ niệm tuổi thơ (breezy, lethargic, agility, stealth)."
    }
  },
  "part2": {
    "title": "Solution Discussion",
    "duration_minutes": 4,
    "situation": "You are planning your holiday. There are three suggestions: a beach holiday, a climbing holiday, and a sight-seeing holiday. Which do you think is the best choice for you?",
    "options": [
      {
        "key": "Option 1",
        "title": "A beach holiday",
        "description": "Relaxing and sunbathing on the beach, swimming in the sea, and enjoying water sports."
      },
      {
        "key": "Option 2",
        "title": "A climbing holiday",
        "description": "Climbing mountains or rocks, camping on the summit, and discovering natural caves."
      },
      {
        "key": "Option 3",
        "title": "A sight-seeing holiday",
        "description": "Visiting famous tourist attractions, appreciating nature and wildlife, and trying local foods."
      }
    ],
    "sample_response": {
      "band": "B2",
      "text": "Given the three holiday alternatives, I believe a beach holiday is the most ideal choice for me. After months of grueling work and study, my primary goal is relaxation, and the tranquil sea breeze, sunbathing on golden sand, and swimming in crystal-clear waters provide the ultimate rejuvenation. On the other hand, while a climbing holiday offers adventurous thrills and cave exploration, it demands rigorous physical endurance and carries potential risks of injury. A sight-seeing holiday is undeniably educational for discovering heritage monuments and local cuisine, but it often involves rushed tour schedules and crowded tourist hubs. Therefore, taking a leisurely beach vacation remains the most rejuvenating option.",
      "analysis_vi": "Lập luận thuyết phục theo tiêu chí xả stress, so sánh đối chiếu rõ nét với kỳ nghỉ leo núi (đòi hỏi thể lực cao) và tham quan ngắm cảnh (dễ mệt mỏi vì đông đúc)."
    }
  },
  "part3": {
    "title": "Topic Development",
    "duration_minutes": 5,
    "topic": "Music should be taught in schools.",
    "mindmap_ideas": [
      "Can be relaxing",
      "Improves memory",
      "Helps develop language and reasoning"
    ],
    "follow_up_questions": [
      "Should children be encouraged to learn music early?",
      "Do you agree that music can change people's moods/feelings?",
      "How would life be like without music?"
    ],
    "sample_response": {
      "band": "B2",
      "text": "Music education plays an indispensable role in holistic student development, and I strongly support incorporating music into the school curriculum. First, musical sessions serve as a natural stress reliever, offering students a soothing emotional outlet amidst heavy academic pressure. Second, learning musical melodies and notations significantly enhances memory retention, as learners train their brains to memorize rhythmic structures and chords. Third, neuroscience demonstrates that musical training stimulates neural pathways associated with language acquisition and logical reasoning. Children who learn musical instruments early often exhibit superior verbal fluency and spatial reasoning. Life without music would be remarkably dull and monochromatic, stripping humanity of a universal emotional language. Hence, schools should foster music appreciation from early childhood.",
      "analysis_vi": "Phát triển luận điểm bài bản với liên kết câu chặt chẽ (holistic development, neural pathways, language acquisition, monochromatic)."
    }
  }
};
