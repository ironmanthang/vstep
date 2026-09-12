import type { ReadingTest } from '../../../../types/schemas';

/**
 * Authentic VSTEP Reading Test 5 (ULIS - ĐHQGHN Standard)
 * Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Pages 62–68, Key page 149
 * Format: 4 Passages, 40 Questions, 60 Minutes.
 */
export const ULIS_READING_TEST_05: ReadingTest = {
  "id": "ulis_read_test_05",
  "title": "VSTEP Reading Mock Test 5 (Chuẩn ĐHNN - ĐHQGHN)",
  "duration_minutes": 60,
  "difficulty": "B2",
  "passages": [
    {
      "title": "Passage 1: ASEAN Summit and AEC Launch",
      "topic": "International Relations & Economy",
      "word_count": 420,
      "difficulty": "B1",
      "content_paragraphs": [
        "The Association of Southeast Asian Nations (ASEAN) is the main political and economic organization for that area. The leaders summit is their last meeting before the launch of the ASEAN Economic Community, or AEC, on December 31.",
        "The AEC will be equivalent to the world's seventh largest economy. It was set up to create a highly competitive single market and production area. Organizers hope it will ease the movement of capital, goods, investment, services and skilled labor across ASEAN countries. The goal is to make the whole area more competitive and economically successful. But, some business leaders have low expectations for the ASEAN summit. Anthony Nelson is a director at the US – ASEAN Business Council in Washington. He believes that security will be an important issue at the meetings, especially after the terrorist attacks in Paris last week.",
        "\"The November summit includes the East Asia Summit, which primarily focuses on political and security issues. So that's going to be a big part of what is actually going on around the summit. A lot of the work that business gets really involved in tends to happen around the ASEAN economic ministers' meeting in August.\" But, the AEC may have only limited influence on business activity when it comes into being next year. Experts expect little to change at first because there is still much to be done.",
        "\"The ASEAN single window, which is a customs project, is still very much a work in progress. But beginning next year they will start limited trials with five of the 10 ASEAN countries. And there have been past mutual recognition agreements for credentials of skilled professionals. But there's still a lot of work to be done in terms of actually implementing those agreements.\" Some critics say the AEC will mainly help businesses, not the majority of people in Southeast Asia. Earlier this year, the ASEAN Civil Society Conference and ASEAN Peoples' Forum expressed concern about regional economic integration. In a statement, the group said such a move would mean unequal and unsustainable economic growth. This, it said, would result \"in worsening poverty and inequalities of wealth.\" Jerald Joseph is co – chair of the ASEAN People's Forum. He says people crossing borders to find employment need more protections. He said: \"Cross – border migrant workers don't have the same level of protection or interest in the whole negotiation. So that's a little bit of a pity, a wasted chance, if it's not reflected in the coming document.\" The 27th ASEAN Summit includes the organization's partners. Nations including China, India, Japan and the United States are to attend."
      ],
      "questions": [
        {
          "id": "ulis_r05_q01",
          "type": "factual_detail",
          "question_text": "ASEAN is the main political and economic organization in.............",
          "options": [
            {
              "key": "A",
              "text": "East Asia"
            },
            {
              "key": "B",
              "text": "Southeast Asia"
            },
            {
              "key": "C",
              "text": "West Asia"
            },
            {
              "key": "D",
              "text": "North Asia"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "The Association of Southeast Asian Nations (ASEAN) is the main political and economic organization for that area.",
          "explanation_vi": "Tên viết tắt ASEAN đại diện cho 'Association of Southeast Asian Nations' (Hiệp hội các quốc gia Đông Nam Á), là tổ chức chính trị và kinh tế chính ở Đông Nam Á."
        },
        {
          "id": "ulis_r05_q02",
          "type": "vocab_in_context",
          "question_text": "What does the word \"It\" in paragraph 2 refer to?",
          "options": [
            {
              "key": "A",
              "text": "ASEAN"
            },
            {
              "key": "B",
              "text": "Organizer"
            },
            {
              "key": "C",
              "text": "AEC"
            },
            {
              "key": "D",
              "text": "Business Council"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "The AEC will be equivalent to the world's seventh largest economy. It was set up to create a highly competitive single market and production area.",
          "explanation_vi": "Từ 'It' ở câu thứ hai đại diện cho chủ ngữ 'The AEC' được đề cập ở câu ngay trước đó."
        },
        {
          "id": "ulis_r05_q03",
          "type": "factual_detail",
          "question_text": "According to Anthony Nelson, what is the important issue at the meetings?",
          "options": [
            {
              "key": "A",
              "text": "Security"
            },
            {
              "key": "B",
              "text": "Climate change"
            },
            {
              "key": "C",
              "text": "Business"
            },
            {
              "key": "D",
              "text": "Economy"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "He believes that security will be an important issue at the meetings, especially after the terrorist attacks in Paris last week.",
          "explanation_vi": "Theo Anthony Nelson, an ninh ('security') sẽ là vấn đề quan trọng tại các cuộc họp, đặc biệt sau các cuộc tấn công khủng bố."
        },
        {
          "id": "ulis_r05_q04",
          "type": "factual_detail",
          "question_text": "According to the passage, what aspect tends to happen around the ASEAN economic ministers?",
          "options": [
            {
              "key": "A",
              "text": "Security"
            },
            {
              "key": "B",
              "text": "Climate change"
            },
            {
              "key": "C",
              "text": "Business"
            },
            {
              "key": "D",
              "text": "Economy"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "A lot of the work that business gets really involved in tends to happen around the ASEAN economic ministers' meeting in August.",
          "explanation_vi": "Đoạn văn đề cập rằng phần lớn công việc liên quan đến doanh nghiệp ('business') thường diễn ra xung quanh hội nghị các bộ trưởng kinh tế ASEAN."
        },
        {
          "id": "ulis_r05_q05",
          "type": "factual_detail",
          "question_text": "According to the passage, how many countries in the ASEAN will start limited trials?",
          "options": [
            {
              "key": "A",
              "text": "3"
            },
            {
              "key": "B",
              "text": "5"
            },
            {
              "key": "C",
              "text": "7"
            },
            {
              "key": "D",
              "text": "10"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "But beginning next year they will start limited trials with five of the 10 ASEAN countries.",
          "explanation_vi": "Bài đọc ghi rõ sẽ bắt đầu thử nghiệm có giới hạn với 5 trong số 10 quốc gia ASEAN ('five of the 10 ASEAN countries')."
        },
        {
          "id": "ulis_r05_q06",
          "type": "vocab_in_context",
          "question_text": "The word \"credentials\" in line 19 can be replaced by",
          "options": [
            {
              "key": "A",
              "text": "letters"
            },
            {
              "key": "B",
              "text": "salutations"
            },
            {
              "key": "C",
              "text": "invitations"
            },
            {
              "key": "D",
              "text": "certificates"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 3,
          "clue_sentence": "And there have been past mutual recognition agreements for credentials of skilled professionals.",
          "explanation_vi": "Từ 'credentials' (bằng cấp, chứng chỉ hành nghề) đồng nghĩa với 'certificates'."
        },
        {
          "id": "ulis_r05_q07",
          "type": "vocab_in_context",
          "question_text": "The word \"implementing\" in line 20 is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "carrying out"
            },
            {
              "key": "B",
              "text": "producing"
            },
            {
              "key": "C",
              "text": "concentrating"
            },
            {
              "key": "D",
              "text": "focusing"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 3,
          "clue_sentence": "But there's still a lot of work to be done in terms of actually implementing those agreements.",
          "explanation_vi": "Từ 'implementing' (thực thi, thực hiện) đồng nghĩa với cụm động từ 'carrying out'."
        },
        {
          "id": "ulis_r05_q08",
          "type": "vocab_in_context",
          "question_text": "The word \"integration\" in line 23 can be replaced by",
          "options": [
            {
              "key": "A",
              "text": "utilization"
            },
            {
              "key": "B",
              "text": "contribution"
            },
            {
              "key": "C",
              "text": "combination"
            },
            {
              "key": "D",
              "text": "separation"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "Earlier this year, the ASEAN Civil Society Conference and ASEAN Peoples' Forum expressed concern about regional economic integration.",
          "explanation_vi": "Từ 'integration' (hội nhập, hợp nhất) trong ngữ cảnh này gần nghĩa nhất với 'combination' (sự kết hợp/hợp nhất)."
        },
        {
          "id": "ulis_r05_q09",
          "type": "factual_detail",
          "question_text": "According to the passage, what would delay the increase of the economy?",
          "options": [
            {
              "key": "A",
              "text": "the recession"
            },
            {
              "key": "B",
              "text": "the poverty"
            },
            {
              "key": "C",
              "text": "the move"
            },
            {
              "key": "D",
              "text": "the employment"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "In a statement, the group said such a move would mean unequal and unsustainable economic growth.",
          "explanation_vi": "Theo bài đọc, nhóm nhận định bước đi/động thái này ('such a move') sẽ dẫn đến tăng trưởng kinh tế không bền vững và không bình đẳng."
        },
        {
          "id": "ulis_r05_q10",
          "type": "inference",
          "question_text": "According to the passage, who require more assurance?",
          "options": [
            {
              "key": "A",
              "text": "travellers"
            },
            {
              "key": "B",
              "text": "immigrants"
            },
            {
              "key": "C",
              "text": "residents"
            },
            {
              "key": "D",
              "text": "tourists"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "He says people crossing borders to find employment need more protections.",
          "explanation_vi": "Bài đọc nêu rõ những người qua biên giới tìm việc làm ('people crossing borders to find employment' - tương đương người nhập cư / lao động di cư 'immigrants') cần được bảo vệ/đảm bảo nhiều hơn ('need more protections')."
        }
      ],
      "id": "ulis_r05_p1"
    },
    {
      "title": "Passage 2: Space Tourism and Dennis Tito",
      "topic": "Space Tourism",
      "word_count": 569,
      "difficulty": "B2",
      "content_paragraphs": [
        "In 1969, a key milestone in space travel was reached when Neil Armstrong set foot on the moon. In 2001, another landmark event took place when the first civilian traveled into space as a paying tourist. As a teenager, Dennis Tito dreamed of visiting outer space. As a young man, he aspired to become an astronaut and earned a bachelor's and a master's degree in aerospace engineering. However, Tito did not have all the qualities necessary to become a professional astronaut; so instead, he went to work as a space engineer in one of NASA's laboratories for five years. Later, Tito set up his own financial investment company and, eventually, he became a multi – millionaire. Later in life, the ex – rocket engineer, still passionate about space travel, began looking into ways to make a trip into space.",
        "In the early 1990s, the Soviet Space Agency was offering tickets for a visit to the Mir space station to anyone who could afford it. Tito jumped at the chance for this once – in – a – lifetime experience. Due to political and economic changes in the former Soviet Union, however, Tito's trip was postponed and later, Mir was decommissioned. In 2001, Tito's dream was finally came true when he paid a rumored $20 million and took off aboard a SOYUZ rocket to deliver supplies to the International Space Station, a joint venture between the space agencies of Japan, Canada, Europe, Russia, and the U.S.",
        "In preparation for the trip, Tito trained at the Gagarin Cosmonauts Training Center at Star City in Russia. There, he underwent eight months of physical fitness training, weightless simulations, and a variety of other exercises to prepare him for space travel. Although the Russians believed that Tito was adequately prepared for the trip, NASA thought otherwise. Dennis Tito had to sign an agreement with international space officials taking financial responsibility for any equipment he damaged or broke on his trip. He was also barred from entering any part of the space station owned by the U.S. unless escorted.",
        "Although Tito made history and paved the way for the future of space tourism, factors such as cost, and the amount of training required, stand in the way of space vacations becoming an option for most people in the near future. In spite of this, Japanese and North American market data shows that there is definite public interest in space travel. In a 1993 survey of 3,030 Japanese, 80 percent of those under the age of forty said they would like to visit space at least once. Seventy percent of this group would pay up to three month's salary for the trip. In 1995, 1,020 households in North America were surveyed and of those, 60 percent were interested were under forty years of age. Just over 45 percent said they would pay three month's salary, around 18 percent said they would pay six month's salary, and nearly 11 percent would pay a year's salary. Two – thirds of those who want to visit space would like to do so several times. Since the nature of this type of travel makes it hazardous to humans, it would have to be restricted to those who are physically fit and able to take responsibility for the risks involved."
      ],
      "questions": [
        {
          "id": "ulis_r05_q11",
          "type": "factual_detail",
          "question_text": "According to the passage, what was the main event in 1969?",
          "options": [
            {
              "key": "A",
              "text": "Scientists planned to travel to space."
            },
            {
              "key": "B",
              "text": "People started to concern space travel."
            },
            {
              "key": "C",
              "text": "The dream of space travel became true."
            },
            {
              "key": "D",
              "text": "Neil Armstrong was ready for heading to the moon."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "In 1969, a key milestone in space travel was reached when Neil Armstrong set foot on the moon.",
          "explanation_vi": "Đoạn 1 nêu rõ vào năm 1969, một cột mốc quan trọng trong du hành vũ trụ đã đạt được khi Neil Armstrong đặt chân lên mặt trăng, đánh dấu việc giấc mơ du hành vũ trụ trở thành hiện thực.",
          "paraphrase_analysis": {
            "question_phrase": "the main event in 1969",
            "passage_phrase": "a key milestone in space travel was reached when Neil Armstrong set foot on the moon",
            "explanation": "Việc đặt chân lên mặt trăng đại diện cho việc giấc mơ du hành vũ trụ chính thức trở thành hiện thực."
          }
        },
        {
          "id": "ulis_r05_q12",
          "type": "factual_detail",
          "question_text": "When did Dennis Tito dream of becoming an astronaut?",
          "options": [
            {
              "key": "A",
              "text": "When he was at kindergarten."
            },
            {
              "key": "B",
              "text": "When he was at primary school."
            },
            {
              "key": "C",
              "text": "When he was at his teen."
            },
            {
              "key": "D",
              "text": "When he was at university."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "As a teenager, Dennis Tito dreamed of visiting outer space.",
          "explanation_vi": "Đoạn 1 ghi rõ 'As a teenager, Dennis Tito dreamed of visiting outer space', tương ứng với đáp án C (Khi ông còn ở độ tuổi thiếu niên).",
          "paraphrase_analysis": {
            "question_phrase": "When he was at his teen",
            "passage_phrase": "As a teenager",
            "explanation": "'As a teenager' tương đương với 'When he was at his teen'."
          }
        },
        {
          "id": "ulis_r05_q13",
          "type": "factual_detail",
          "question_text": "Dennis Tito made the first trip as a space tourist________",
          "options": [
            {
              "key": "A",
              "text": "in the late '60s."
            },
            {
              "key": "B",
              "text": "in the early '90s."
            },
            {
              "key": "C",
              "text": "this century."
            },
            {
              "key": "D",
              "text": "in the late '50s."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "In 2001, another landmark event took place when the first civilian traveled into space as a paying tourist.",
          "explanation_vi": "Chuyến đi của Dennis Tito diễn ra vào năm 2001, thuộc thế kỷ 21 (this century).",
          "paraphrase_analysis": {
            "question_phrase": "this century",
            "passage_phrase": "In 2001",
            "explanation": "Năm 2001 thuộc thế kỷ hiện tại (thế kỷ 21)."
          }
        },
        {
          "id": "ulis_r05_q14",
          "type": "negative_fact",
          "question_text": "Which of the following is NOT true about Dennis Tito?",
          "options": [
            {
              "key": "A",
              "text": "He has an advanced degree in aerospace engineering."
            },
            {
              "key": "B",
              "text": "He is now an astronaut for NASA."
            },
            {
              "key": "C",
              "text": "He eventually became a very wealthy man."
            },
            {
              "key": "D",
              "text": "He used to dream of travelling to outer space."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "However, Tito did not have all the qualities necessary to become a professional astronaut; so instead, he went to work as a space engineer in one of NASA's laboratories for five years.",
          "explanation_vi": "Thông tin Tito không đủ phẩm chất làm phi hành gia chuyên nghiệp và sau đó mở công ty đầu tư tài chính được nhắc đến trong đoạn 1. Do đó, việc nói 'ông hiện là phi hành gia cho NASA' (He is now an astronaut for NASA) là KHÔNG đúng."
        },
        {
          "id": "ulis_r05_q15",
          "type": "factual_detail",
          "question_text": "Tito's first trip into space was with ________ to ________.",
          "options": [
            {
              "key": "A",
              "text": "the Russian/ the International Space Station."
            },
            {
              "key": "B",
              "text": "the Americans/SOYUZ"
            },
            {
              "key": "C",
              "text": "members of the former Soviet Union/ the Mir space station"
            },
            {
              "key": "D",
              "text": "the Japanese agency"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "In the early 1990s, the Soviet Space Agency was offering tickets for a visit to the Mir space station to anyone who could afford it.",
          "explanation_vi": "Theo đáp án chuẩn của đề thi, phương án C phản ánh chuyến đăng ký đầu tiên của Tito với Cơ quan Vũ trụ Xô Viết để đến trạm vũ trụ Mir."
        },
        {
          "id": "ulis_r05_q16",
          "type": "author_attitude",
          "question_text": "Which of the following describes NASA's feelings about Tito's trip into space?",
          "options": [
            {
              "key": "A",
              "text": "extremely proud"
            },
            {
              "key": "B",
              "text": "somewhat eager"
            },
            {
              "key": "C",
              "text": "very concerned"
            },
            {
              "key": "D",
              "text": "disappointed"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "Although the Russians believed that Tito was adequately prepared for the trip, NASA thought otherwise.",
          "explanation_vi": "NASA không cho rằng Tito đã chuẩn bị đầy đủ và bắt ông ký thỏa thuận chịu trách nhiệm tài chính cũng như hạn chế di chuyển trong phần trạm của Mỹ nếu không có người đi kèm, cho thấy NASA rất lo ngại (very concerned).",
          "paraphrase_analysis": {
            "question_phrase": "very concerned",
            "passage_phrase": "NASA thought otherwise... had to sign an agreement... barred from entering",
            "explanation": "Thái độ không đồng ý và yêu cầu ràng buộc khắt khe thể hiện sự lo ngại sâu sắc của NASA."
          }
        },
        {
          "id": "ulis_r05_q17",
          "type": "factual_detail",
          "question_text": "According to Japanese survey, which of the following is true?",
          "options": [
            {
              "key": "A",
              "text": "Eighty percent of all those interviewed would be interested in travelling to space."
            },
            {
              "key": "B",
              "text": "Some people would pay a quarter of their annual salary to visit space."
            },
            {
              "key": "C",
              "text": "Only people under the age of forty are interested in space travel."
            },
            {
              "key": "D",
              "text": "Seventy percent of Japanese would pay three quarters of their annual salary to visit space."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "Seventy percent of this group would pay up to three month's salary for the trip.",
          "explanation_vi": "'Three month's salary' (lương 3 tháng) tương đương với 1/4 (a quarter) lương hàng năm (annual salary). Vì vậy phương án B là đúng.",
          "paraphrase_analysis": {
            "question_phrase": "a quarter of their annual salary",
            "passage_phrase": "three month's salary",
            "explanation": "Lương 3 tháng chính là 1/4 (a quarter) lương cả năm."
          }
        },
        {
          "id": "ulis_r05_q18",
          "type": "factual_detail",
          "question_text": "According to a North American survey on space travel, which is true?",
          "options": [
            {
              "key": "A",
              "text": "Seventy – five percent of those surveyed would be interested in travelling to space."
            },
            {
              "key": "B",
              "text": "Most people would pay a year's salary to visit space as a tourist."
            },
            {
              "key": "C",
              "text": "Most of the people interested in space travel were under the age of forty."
            },
            {
              "key": "D",
              "text": "Nearly sixty percent of those surveyed were interested in a vacation in space travel."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "In 1995, 1,020 households in North America were surveyed and of those, 60 percent were interested were under forty years of age.",
          "explanation_vi": "Con số 60% những người quan tâm ở độ tuổi dưới 40 chiếm đa số (most of the people interested), do đó C là đáp án đúng.",
          "paraphrase_analysis": {
            "question_phrase": "Most of the people interested... were under the age of forty",
            "passage_phrase": "60 percent were interested were under forty years of age",
            "explanation": "60% thể hiện đa số (most)."
          }
        },
        {
          "id": "ulis_r05_q19",
          "type": "factual_detail",
          "question_text": "According to the passage, who did not believe that Tito was trained well enough for the trip to space?",
          "options": [
            {
              "key": "A",
              "text": "Russian Training Center."
            },
            {
              "key": "B",
              "text": "Japanese Training Center."
            },
            {
              "key": "C",
              "text": "European Training Center."
            },
            {
              "key": "D",
              "text": "NASA"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "Although the Russians believed that Tito was adequately prepared for the trip, NASA thought otherwise.",
          "explanation_vi": "Cụm 'NASA thought otherwise' (NASA nghĩ ngược lại) chỉ ra rằng NASA không tin rằng Tito đã được huấn luyện đủ tốt.",
          "paraphrase_analysis": {
            "question_phrase": "did not believe that Tito was trained well enough",
            "passage_phrase": "NASA thought otherwise",
            "explanation": "'Thought otherwise' nghía là không đồng ý với nhận định Tito đã chuẩn bị/được huấn luyện đầy đủ."
          }
        },
        {
          "id": "ulis_r05_q20",
          "type": "factual_detail",
          "question_text": "Which of the following would probably prevent you from becoming a space tourist in the near future?",
          "options": [
            {
              "key": "A",
              "text": "health"
            },
            {
              "key": "B",
              "text": "wealth"
            },
            {
              "key": "C",
              "text": "youth"
            },
            {
              "key": "D",
              "text": "age"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 3,
          "clue_sentence": "Since the nature of this type of travel makes it hazardous to humans, it would have to be restricted to those who are physically fit and able to take responsibility for the risks involved.",
          "explanation_vi": "Đoạn cuối đề cập rằng loại hình du lịch này nguy hiểm nên bị giới hạn cho những người đủ thể lực ('physically fit'). Do đó, yếu tố sức khỏe (health) là rào cản ngăn cản một người trở thành khách du lịch vũ trụ.",
          "paraphrase_analysis": {
            "question_phrase": "prevent you from becoming a space tourist",
            "passage_phrase": "restricted to those who are physically fit",
            "explanation": "Yêu cầu phải đủ thể lực nghĩa là sức khỏe kém sẽ cản trở việc tham gia du lịch vũ trụ."
          }
        }
      ],
      "id": "ulis_r05_p2"
    },
    {
      "title": "Passage 3: The Pullman Sleeping Car and American Railroad History",
      "topic": "American Railroad History",
      "word_count": 412,
      "difficulty": "B2",
      "content_paragraphs": [
        "During the heyday of the railroads, when America's rail system provided the bulk of the country's passenger and freight transportation, various types of railroad cars were in service to accomplish the varied tasks handled by the railroads. One type of car that was not available for public use prior to the Civil War, however, was a sleeping car; ideas for sleeping cars abounded at the time, but these ideas were unworkable. It unfortunately took the death of a president to make the sleeping car a viable reality.",
        "Cabinet – maker George M. Pullman had recognized the demand for sleeping cars and had worked on developing experimental models of sleeping cars in the decade leading up to the Civil War. However, in spite of the fact that he had made successful test runs on the Chicago and Alton Railroads with his models, he was unable to sell his idea because his models were too wide and too high for existing train station and bridges. In 1863, after spending time working as a storekeeper in a Colorado mining town, he invested his savings of twenty thousand dollars, a huge fortune at that time and all the money that he had in the world, in a luxurious sleeping car that he named the Pioneer. Pullman and friend Ben Field built the Pioneer on the site of the present – day Chicago Union Station. For two years, however; the Pioneer sat on a railroad siding, useless because it could not fit through train stations and over bridges.",
        "Following President Lincoln's assassination in 1865, the state of Illinois, Lincoln's birthplace, wanted to transport the presidential casket in the finest fashion possible. The Pullman Pioneer was the most elegant car around; in order to make the Pullman part of the presidential funeral train in its run from Springfield to Chicago, the state cut down station platforms and raised bridges in order to accommodate the luxurious railway car. The Pullman car greatly impressed the funeral party, which included Lincoln's successor as president, General Ulysses S. Grant, and Grant later requested the Pioneer for a trip from Detroit to Chicago. To satisfy Grant's request for the Pioneer, the Michigan Central Railroad made improvements on its line to accommodate the wide car, and soon other railroads followed. George Pullman founded the Pullman Palace Car Company in partnership with financier Andrew Carnegie and eventually became a millionaire.",
        "Pullman cars were normally a dark \"Pullman green\", although some were painted in the host railroad's colors. The cars carried individual names, but usually did not carry visible numbers. In the 1920s, the Pullman Company went through a series of restructuring steps, which in the end resulted in a parent company, Pullman Incorporated, controlling the Pullman Company (which owned and operated sleeping cars) and the Pullman – Standard Car Manufacturing Company."
      ],
      "questions": [
        {
          "id": "ulis_r05_q21",
          "type": "main_idea",
          "question_text": "Which of the following best states the main idea of the passage?",
          "options": [
            {
              "key": "A",
              "text": "America's railroads used to provide much of the country's transportation."
            },
            {
              "key": "B",
              "text": "President Lincoln's assassination in 1865 shocked the nation."
            },
            {
              "key": "C",
              "text": "George Pullman was the only one to come up with the idea for a sleeping car."
            },
            {
              "key": "D",
              "text": "Pullman's idea for a sleeping car became workable after Lincoln's death."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "It unfortunately took the death of a president to make the sleeping car a viable reality.",
          "explanation_vi": "Đoạn 1 nêu luận điểm rằng phải nhờ đến cái chết của một vị tổng thống thì toa giường nằm mới trở nên khả thi trong thực tế ('It unfortunately took the death of a president to make the sleeping car a viable reality'), và toàn bộ các đoạn sau giải thích việc toa xe Pioneer của Pullman được đưa vào sử dụng thực tế sau vụ ám sát Lincoln.",
          "paraphrase_analysis": {
            "question_phrase": "Pullman's idea for a sleeping car became workable after Lincoln's death",
            "passage_phrase": "It unfortunately took the death of a president to make the sleeping car a viable reality.",
            "explanation": "'Viable reality' tương đương với 'became workable', và 'death of a president' chính là vụ ám sát Lincoln."
          }
        },
        {
          "id": "ulis_r05_q22",
          "type": "vocab_in_context",
          "question_text": "A \"heyday\" in line 1 is most probably a ..............",
          "options": [
            {
              "key": "A",
              "text": "time for harvest."
            },
            {
              "key": "B",
              "text": "a period with low prices."
            },
            {
              "key": "C",
              "text": "a period of great success."
            },
            {
              "key": "D",
              "text": "a type of railroad schedule."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "During the heyday of the railroads, when America's rail system provided the bulk of the country's passenger and freight transportation, various types of railroad cars were in service to accomplish the varied tasks handled by the railroads.",
          "explanation_vi": "Từ 'heyday' nghĩa là thời kỳ hoàng kim, thời kỳ thịnh vượng/thành công rực rỡ nhất ('a period of great success').",
          "paraphrase_analysis": {
            "question_phrase": "heyday",
            "passage_phrase": "when America's rail system provided the bulk of the country's passenger and freight transportation",
            "explanation": "Ngữ cảnh mô tả thời kỳ đỉnh cao khi đường sắt cung cấp phần lớn dịch vụ vận tải của nước Mỹ."
          }
        },
        {
          "id": "ulis_r05_q23",
          "type": "inference",
          "question_text": "It can be inferred from the passage that before the Civil War, sleeping cars ............",
          "options": [
            {
              "key": "A",
              "text": "were used abundantly."
            },
            {
              "key": "B",
              "text": "were thought to be a good idea."
            },
            {
              "key": "C",
              "text": "were only used privately."
            },
            {
              "key": "D",
              "text": "were used by presidents."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "One type of car that was not available for public use prior to the Civil War, however, was a sleeping car; ideas for sleeping cars abounded at the time, but these ideas were unworkable.",
          "explanation_vi": "Đoạn 1 nêu: 'ideas for sleeping cars abounded at the time, but these ideas were unworkable' (các ý tưởng về toa ngủ rất nhiều/phổ biến vào thời điểm đó nhưng không khả thi), suy ra toa ngủ được coi là một ý tưởng hay nhưng chưa thực hiện được.",
          "paraphrase_analysis": {
            "question_phrase": "were thought to be a good idea",
            "passage_phrase": "ideas for sleeping cars abounded at the time",
            "explanation": "Nhiều người ấp ủ ý tưởng về toa ngủ cho thấy nó được đánh giá là một ý tưởng hay."
          }
        },
        {
          "id": "ulis_r05_q24",
          "type": "main_idea",
          "question_text": "What is the main idea of paragraph 2?",
          "options": [
            {
              "key": "A",
              "text": "Pullman had been successful in selling his sleeping cars."
            },
            {
              "key": "B",
              "text": "Though Pullman had been successful in test runs with his sleeping cars model; it could not be suitable with the transportation in Chicago."
            },
            {
              "key": "C",
              "text": "Pullman had recognized the demand for sleeping cars."
            },
            {
              "key": "D",
              "text": "Pullman had invested much money on developing the sleeping cars."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "However, in spite of the fact that he had made successful test runs on the Chicago and Alton Railroads with his models, he was unable to sell his idea because his models were too wide and too high for existing train station and bridges.",
          "explanation_vi": "Đoạn 2 tập trung vào việc Pullman đã thử nghiệm thành công mô hình toa ngủ nhưng không thể đưa vào sử dụng thực tế vì kích thước quá to, không phù hợp với nhà ga và cầu đường sắt hiện hữu ở Chicago.",
          "paraphrase_analysis": {
            "question_phrase": "successful in test runs... could not be suitable with the transportation",
            "passage_phrase": "made successful test runs... unable to sell his idea because his models were too wide and too high for existing train station and bridges",
            "explanation": "Đoạn văn nêu rõ dù chạy thử thành công nhưng toa xe không vừa với cơ sở hạ tầng giao thông."
          }
        },
        {
          "id": "ulis_r05_q25",
          "type": "factual_detail",
          "question_text": "What was the initial problem that made Pullman's card unusable?",
          "options": [
            {
              "key": "A",
              "text": "They were too large."
            },
            {
              "key": "B",
              "text": "They were too expensive."
            },
            {
              "key": "C",
              "text": "They were too slow."
            },
            {
              "key": "D",
              "text": "They were too unusual."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "For two years, however; the Pioneer sat on a railroad siding, useless because it could not fit through train stations and over bridges.",
          "explanation_vi": "Toa xe Pioneer không thể sử dụng được ban đầu vì kích thước quá lớn ('too wide and too high', 'could not fit through train stations and over bridges'), tức là 'too large'.",
          "paraphrase_analysis": {
            "question_phrase": "too large",
            "passage_phrase": "too wide and too high for existing train station and bridges / could not fit through train stations and over bridges",
            "explanation": "'Quá rộng và quá cao' tương đương với 'too large' (quá lớn)."
          }
        },
        {
          "id": "ulis_r05_q26",
          "type": "factual_detail",
          "question_text": "What is stated in the passage about George Pullman?",
          "options": [
            {
              "key": "A",
              "text": "He once had a job in a store."
            },
            {
              "key": "B",
              "text": "He always lived in Chicago."
            },
            {
              "key": "C",
              "text": "He worked in a mine."
            },
            {
              "key": "D",
              "text": "He saved money for his project."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "In 1863, after spending time working as a storekeeper in a Colorado mining town, he invested his savings of twenty thousand dollars, a huge fortune at that time and all the money that he had in the world, in a luxurious sleeping car that he named the Pioneer.",
          "explanation_vi": "Bài đọc nêu rõ ông đã đầu tư toàn bộ số tiền tiết kiệm 20.000 đô la của mình cho dự án toa xe Pioneer ('he invested his savings of twenty thousand dollars... in a luxurious sleeping car').",
          "paraphrase_analysis": {
            "question_phrase": "saved money for his project",
            "passage_phrase": "invested his savings of twenty thousand dollars... in a luxurious sleeping car",
            "explanation": "Đầu tư tiền tiết kiệm của mình vào dự án chế tạo toa xe."
          }
        },
        {
          "id": "ulis_r05_q27",
          "type": "factual_detail",
          "question_text": "What is true about the sleeping cars?",
          "options": [
            {
              "key": "A",
              "text": "The experimental models of sleeping cars had not been successful until 1863."
            },
            {
              "key": "B",
              "text": "The Pioneer did not cost Pullman a fortune."
            },
            {
              "key": "C",
              "text": "The Pioneer was considered to be the most charming cars in comparison with others."
            },
            {
              "key": "D",
              "text": "The Pullman car was extremely beneficial because of its fitness through train station and bridges."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "The Pullman Pioneer was the most elegant car around; in order to make the Pullman part of the presidential funeral train in its run from Springfield to Chicago, the state cut down station platforms and raised bridges in order to accommodate the luxurious railway car.",
          "explanation_vi": "Đoạn 3 khẳng định: 'The Pullman Pioneer was the most elegant car around' (Pioneer là toa xe sang trọng/trang nhã nhất xung quanh), tương ứng với 'most charming cars in comparison with others'.",
          "paraphrase_analysis": {
            "question_phrase": "most charming cars in comparison with others",
            "passage_phrase": "the most elegant car around",
            "explanation": "'Most elegant car around' đồng nghĩa với 'most charming cars in comparison with others'."
          }
        },
        {
          "id": "ulis_r05_q28",
          "type": "factual_detail",
          "question_text": "Why did the state of Illinois want to use the Pullman in Lincoln's funeral train?",
          "options": [
            {
              "key": "A",
              "text": "It was superior to other cars."
            },
            {
              "key": "B",
              "text": "It was the only railroad car that could make it from Springfield to Chicago."
            },
            {
              "key": "C",
              "text": "Ulysses S. Grant requested it."
            },
            {
              "key": "D",
              "text": "The Pullman Palace Car Company was a major Illinois business."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "Following President Lincoln's assassination in 1865, the state of Illinois, Lincoln's birthplace, wanted to transport the presidential casket in the finest fashion possible.",
          "explanation_vi": "Bang Illinois muốn chở linh cữu Tổng thống theo cách trang trọng/tốt đẹp nhất có thể ('in the finest fashion possible'), và Pullman Pioneer là toa xe sang trọng nhất ('most elegant car around'), tức là vượt trội so với các toa xe khác ('superior to other cars').",
          "paraphrase_analysis": {
            "question_phrase": "superior to other cars",
            "passage_phrase": "transport the presidential casket in the finest fashion possible / the most elegant car around",
            "explanation": "Toa xe sang trọng bậc nhất đáp ứng nhu cầu chở thi hài theo cách tốt nhất."
          }
        },
        {
          "id": "ulis_r05_q29",
          "type": "inference",
          "question_text": "It can be inferred from the passage that the Michigan Central Railroad .........",
          "options": [
            {
              "key": "A",
              "text": "was owned by George Pullman."
            },
            {
              "key": "B",
              "text": "controlled the railroad tracks between Detroit and Chicago."
            },
            {
              "key": "C",
              "text": "was the only railroad company to accommodate wider cars."
            },
            {
              "key": "D",
              "text": "was the sole manufacturer of the Pioneer."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "To satisfy Grant's request for the Pioneer, the Michigan Central Railroad made improvements on its line to accommodate the wide car, and soon other railroads followed.",
          "explanation_vi": "Tướng Grant yêu cầu dùng Pioneer cho chuyến đi từ Detroit đến Chicago, và để đáp ứng yêu cầu này, Michigan Central Railroad đã cải tạo tuyến đường của mình. Điều này chứng tỏ Michigan Central Railroad quản lý tuyến đường sắt giữa Detroit và Chicago.",
          "paraphrase_analysis": {
            "question_phrase": "controlled the railroad tracks between Detroit and Chicago",
            "passage_phrase": "Grant later requested the Pioneer for a trip from Detroit to Chicago. To satisfy Grant's request for the Pioneer, the Michigan Central Railroad made improvements on its line",
            "explanation": "Công ty cải tạo tuyến đường để phục vụ chuyến đi từ Detroit đến Chicago, suy ra họ kiểm soát tuyến đường ray này."
          }
        },
        {
          "id": "ulis_r05_q30",
          "type": "inference",
          "question_text": "This passage would most likely be assigned in which of the following courses?",
          "options": [
            {
              "key": "A",
              "text": "Engineering"
            },
            {
              "key": "B",
              "text": "Political science"
            },
            {
              "key": "C",
              "text": "Finance"
            },
            {
              "key": "D",
              "text": "History"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "During the heyday of the railroads, when America's rail system provided the bulk of the country's passenger and freight transportation, various types of railroad cars were in service to accomplish the varied tasks handled by the railroads.",
          "explanation_vi": "Toàn bài nói về quá trình phát triển lịch sử của ngành đường sắt và sự ra đời của toa xe giường nằm gắn liền với các sự kiện lịch sử (Nội chiến, vụ ám sát Lincoln). Do đó bài đọc phù hợp nhất với môn Lịch sử (History)."
        }
      ],
      "id": "ulis_r05_p3"
    },
    {
      "title": "Passage 4: Waste Management Methods",
      "topic": "Waste Management & Environment",
      "word_count": 444,
      "difficulty": "C1",
      "content_paragraphs": [
        "Garbage cans are not magical portals. Trash does not disappear when you toss it in a can. Yet, the average American throws away an estimated 1,600 pounds of waste each year. If there are no magic garbage fairies, where does all that trash go? There are four methods to managing waste: recycling, land-filling, composting, and incinerating. Each method has its strengths and weakness. Let’s take a quick look at each.",
        "Recycling is the process of turning waste into new materials. For example, used paper can be turned into paperboard, which can be used to make book covers. Recycling can reduce pollution, save materials, and lower energy use. Yet, some argue that recycling wastes energy. They believe that collecting, processing, and converting waste uses more energy than it saves. Still, most people agree that recycling is better for the planet than land-filling.",
        "Land-filling is the oldest method of managing waste. In its simplest form, land-filling is when people bury garbage in a hole. Over time the practice of land-filling has advanced. Garbage is compacted before it is thrown into the hole. In this way, more garbage can fit in each landfill. Large liners are placed in the bottom of landfills so that toxic garbage juice doesn't get into the ground water. Sadly, these liners don't always work. Landfills may pollute the local water supply. Not to mention that all of that garbage stinks. Nobody wants to live next to a landfill. This makes it hard to find new locations for landfills.",
        "As landfill space increases, interest in composting grows. Composting is when people pile up organic matter, such as food waste, and allows it to decompose. The product of this decomposition is compost. Compost can be added to the soil to make the soil richer and better for growing crops. While composting is easy to do onsite somewhere, like home or school, it's hard to do after the garbage gets all mixed up. This is because plastic and other inorganic materials must be removed from the compost pile or they will pollute the soil. There's a lot of plastic in garbage, which makes it hard to compost on a large scale.",
        "One thing that is easier to do is burning garbage. There are two main ways to incinerate waste. The first is to create or harvest a fuel from the waste, such as methane gas, and burn the fuel. The second is to burn the waste directly. The heat from the incineration process can boil water, which can power steam generators. Unfortunately, burning garbage pollutes the air. Also, some critics worry that incinerators destroy valuable resources that could be recycled.",
        "Usually, the community which you live manages waste. Once you put your garbage in that can, what happens to it is beyond your control. But you can make choices while it is still in your possession. You can choose to recycle, you can choose to compost, or you can choose to let someone else deal with it. The choice is yours."
      ],
      "questions": [
        {
          "id": "ulis_r05_q31",
          "type": "author_attitude",
          "question_text": "Which best explains why the author begins the text by talking about magical garbage fairies?",
          "options": [
            {
              "key": "A",
              "text": "He is putting a common misconception to rest."
            },
            {
              "key": "B",
              "text": "He is trying to get the reader's attention."
            },
            {
              "key": "C",
              "text": "He is addressing his concern in a serious way."
            },
            {
              "key": "D",
              "text": "He is supporting his argument with evidence."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "Garbage cans are not magical portals. Trash does not disappear when you toss it in a can.",
          "explanation_vi": "Tác giả mở đầu bài viết bằng cách nhắc đến 'magical garbage fairies' (tiên rác thần kỳ) một cách hài hước và tượng hình nhằm gây sự chú ý của người đọc (get the reader's attention) trước khi đi vào phân tích các phương pháp xử lý rác thải.",
          "paraphrase_analysis": {
            "question_phrase": "talking about magical garbage fairies",
            "passage_phrase": "Garbage cans are not magical portals.",
            "explanation": "Cách nói mang tính hài hước, tượng hình được dùng làm câu dẫn gây chú ý."
          }
        },
        {
          "id": "ulis_r05_q32",
          "type": "vocab_in_context",
          "question_text": "Which best expresses the meaning of the word \"compacted\" as it is used in the third paragraph?",
          "options": [
            {
              "key": "A",
              "text": "Garbage is burned before it is thrown in a hole."
            },
            {
              "key": "B",
              "text": "Garbage is put in trucks before it is thrown in a hole."
            },
            {
              "key": "C",
              "text": "Garbage is crushed smaller before it is thrown in a hole."
            },
            {
              "key": "D",
              "text": "Garbage is put in a can before it is thrown in a hole."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "Garbage is compacted before it is thrown into the hole. In this way, more garbage can fit in each landfill.",
          "explanation_vi": "Từ 'compacted' có nghĩa là nén lại, làm nhỏ lại để chứa được nhiều rác hơn. Do đó, lựa chọn C (Garbage is crushed smaller before it is thrown in a hole) giải thích đúng nghĩa nhất.",
          "paraphrase_analysis": {
            "question_phrase": "compacted",
            "passage_phrase": "crushed smaller",
            "explanation": "'Compacted' có nghĩa là được nén nhỏ lại."
          }
        },
        {
          "id": "ulis_r05_q33",
          "type": "negative_fact",
          "question_text": "Which was NOT cited in the third paragraph as an issue with land-filling?",
          "options": [
            {
              "key": "A",
              "text": "Landfills are smelly."
            },
            {
              "key": "B",
              "text": "Usable materials are wasted in landfills."
            },
            {
              "key": "C",
              "text": "Landfills may pollute the water supply."
            },
            {
              "key": "D",
              "text": "It is difficult to find locations for landfills."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "Landfills may pollute the local water supply. Not to mention that all of that garbage stinks. Nobody wants to live next to a landfill. This makes it hard to find new locations for landfills.",
          "explanation_vi": "Đoạn 3 đề cập đến việc bãi rác gây ô nhiễm nguồn nước (C), bốc mùi hôi thối (A), và khó tìm địa điểm mới (D). Việc lãng phí tài nguyên có thể tái chế (B) chỉ được nhắc tới ở đoạn 5 khi nói về việc đốt rác, không xuất hiện ở đoạn 3."
        },
        {
          "id": "ulis_r05_q34",
          "type": "main_idea",
          "question_text": "Which best expresses the main idea of the fourth paragraph?",
          "options": [
            {
              "key": "A",
              "text": "Landfills take up a lot of space."
            },
            {
              "key": "B",
              "text": "Composting is good for the soil but it can be."
            },
            {
              "key": "C",
              "text": "The process of composting is very complicated and scientific."
            },
            {
              "key": "D",
              "text": "There is a lot of plastic garbage in landfills."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "Compost can be added to the soil to make the soil richer and better for growing crops. While composting is easy to do onsite somewhere, like home or school, it's hard to do after the garbage gets all mixed up.",
          "explanation_vi": "Đoạn 4 nói về phương pháp ủ phân hữu cơ (composting): nó tốt cho đất nhưng lại khó thực hiện ở quy mô lớn do khó phân loại nhựa và chất vô cơ ra khỏi rác. Đáp án B tóm tắt đúng ý chính này."
        },
        {
          "id": "ulis_r05_q35",
          "type": "vocab_in_context",
          "question_text": "Which best defines the meaning of incineration as it is used in the text?",
          "options": [
            {
              "key": "A",
              "text": "To bury waste materials in a large hole"
            },
            {
              "key": "B",
              "text": "To allow waste products to decompose and become fertilizer"
            },
            {
              "key": "C",
              "text": "To burn waste materials and harvest the energy"
            },
            {
              "key": "D",
              "text": "To turn waste materials into products like book covers"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 4,
          "clue_sentence": "There are two main ways to incinerate waste. The first is to create or harvest a fuel from the waste, such as methane gas, and burn the fuel. The second is to burn the waste directly.",
          "explanation_vi": "Đoạn 5 giải thích 'incinerate' là việc đốt rác thải (burn waste) để lấy năng lượng (harvest energy) hoặc đốt trực tiếp.",
          "paraphrase_analysis": {
            "question_phrase": "incineration",
            "passage_phrase": "burn the waste / harvest a fuel",
            "explanation": "'Incineration' chỉ việc đốt chất thải để thu năng lượng."
          }
        },
        {
          "id": "ulis_r05_q36",
          "type": "inference",
          "question_text": "Which conclusion could be supported with text from the passage?",
          "options": [
            {
              "key": "A",
              "text": "Each method of waste management has its drawbacks."
            },
            {
              "key": "B",
              "text": "Recycling is without a doubt the best way to handle waste."
            },
            {
              "key": "C",
              "text": "Incineration is the best way to process waste."
            },
            {
              "key": "D",
              "text": "All large cities should create massive compost piles."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "Each method has its strengths and weakness.",
          "explanation_vi": "Bài viết liệt kê 4 phương pháp xử lý rác và chỉ ra cả ưu điểm lẫn nhược điểm (drawbacks/weakness) của từng phương pháp. Vì vậy kết luận A hoàn toàn chính xác."
        },
        {
          "id": "ulis_r05_q37",
          "type": "main_idea",
          "question_text": "Which best expresses the author's main purpose in writing this?",
          "options": [
            {
              "key": "A",
              "text": "To convince readers to recycle and compost"
            },
            {
              "key": "B",
              "text": "To persuade readers that recycling is a waste of resources"
            },
            {
              "key": "C",
              "text": "To compare and contrast recycling and land-filling"
            },
            {
              "key": "D",
              "text": "To inform readers of methods of waste management"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "There are four methods to managing waste: recycling, land-filling, composting, and incinerating. Each method has its strengths and weakness. Let’s take a quick look at each.",
          "explanation_vi": "Mục đích chính của tác giả là cung cấp thông tin (inform) về 4 phương pháp xử lý rác thải cùng ưu/nhược điểm của chúng chứ không thuyết phục người đọc theo một phương pháp nhất định."
        },
        {
          "id": "ulis_r05_q38",
          "type": "negative_fact",
          "question_text": "Which is NOT included in this text?",
          "options": [
            {
              "key": "A",
              "text": "A description of how trash is collected"
            },
            {
              "key": "B",
              "text": "A description of the uses of compost"
            },
            {
              "key": "C",
              "text": "A description of the two methods of incinerating trash"
            },
            {
              "key": "D",
              "text": "A description of how landfills have advanced over time"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 5,
          "clue_sentence": "Once you put your garbage in that can, what happens to it is beyond your control.",
          "explanation_vi": "Bài viết KHÔNG mô tả chi tiết quy trình rác được thu gom như thế nào (A). Ngược lại, bài có đề cập đến tác dụng của compost (B - đoạn 4), 2 cách đốt rác (C - đoạn 5), và sự cải tiến của bãi chôn lấp rác theo thời gian (D - đoạn 3)."
        },
        {
          "id": "ulis_r05_q39",
          "type": "factual_detail",
          "question_text": "Which best explains why composting is not feasible on a large scale?",
          "options": [
            {
              "key": "A",
              "text": "People wouldn't want to touch all of that gross rotting food."
            },
            {
              "key": "B",
              "text": "It would smell too bad in densely populated cities."
            },
            {
              "key": "C",
              "text": "It would attract rodents that would spread disease."
            },
            {
              "key": "D",
              "text": "Plastic would get into the compost and turn it into a pollutant."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 3,
          "clue_sentence": "This is because plastic and other inorganic materials must be removed from the compost pile or they will pollute the soil. There's a lot of plastic in garbage, which makes it hard to compost on a large scale.",
          "explanation_vi": "Đoạn 4 nêu rõ lý do khó ủ phân quy mô lớn là vì rác chứa nhiều nhựa; nếu nhựa bị trộn vào đống ủ thì sẽ làm ô nhiễm đất.",
          "paraphrase_analysis": {
            "question_phrase": "not feasible on a large scale",
            "passage_phrase": "hard to compost on a large scale",
            "explanation": "Lý do là vì chất nhựa lẫn vào đống phân ủ sẽ gây ô nhiễm đất."
          }
        },
        {
          "id": "ulis_r05_q40",
          "type": "main_idea",
          "question_text": "Which title best expresses the main idea of this text?",
          "options": [
            {
              "key": "A",
              "text": "The Magic of Recycling: Bringing Back What Was Once Lost"
            },
            {
              "key": "B",
              "text": "Methods of Waste Management: Pros and Cons"
            },
            {
              "key": "C",
              "text": "Recycling Land-filling or Composting: Which is Best For You?"
            },
            {
              "key": "D",
              "text": "Do Your Part: How to Save the Earth by Recycling and Composting"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "There are four methods to managing waste: recycling, land-filling, composting, and incinerating. Each method has its strengths and weakness.",
          "explanation_vi": "Tiêu đề phù hợp nhất phản ánh toàn bộ nội dung bài đọc là 'Methods of Waste Management: Pros and Cons' (Các phương pháp xử lý rác thải: Ưu và Nhược điểm)."
        }
      ],
      "id": "ulis_r05_p4"
    }
  ]
};
