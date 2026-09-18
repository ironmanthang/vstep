import type { ReadingTest } from '../../../../types/schemas';

/**
 * Authentic VSTEP Reading Test 2 (ULIS - ĐHQGHN Standard)
 * Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Pages 24–31, Key page 136
 * Format: 4 Passages, 40 Questions, 60 Minutes.
 */
export const ULIS_READING_TEST_02: ReadingTest = {
  "id": "ulis_read_test_02",
  "title": "VSTEP Reading Mock Test 2 (Chuẩn ĐHNN - ĐHQGHN)",
  "duration_minutes": 60,
  "difficulty": "B2",
  "passages": [
    {
      "title": "Passage 1: Doctors treat patients for free at clinic in Ha Noi",
      "topic": "Community & Healthcare",
      "word_count": 367,
      "difficulty": "B1",
      "content_paragraphs": [
        "For 20 years, Dang Thi Nhan, 67, has been waking up about 30 minutes earlier each day to bake cakes or prepare tea for two retired doctors in a clinic near her house in Ha Noi's Giap Bat Ward. That is all Nhan can offer as thanks to doctors who provide free health checks for herself, her paralysed husband and their 43-year-old disabled son. \"If one day **they** cannot take care of themselves and need some one to look after, I will do it voluntarily till the day they are gone,\" Nhan said.",
        "The small clinic, situated on Kim Dong Street, has become familiar to many people in Ha Noi. It was established in 1992 by Dr Truong Thi Hoi To, 84, a former principal of Nam Dinh Medical College, Le Thi Soc, 87, a retired nurse from Saint Paul Municipal Hospital, and Le Thanh Thuoc, the **late** deputy director of the Viet Nam National Cancer Hospital, who died last year. The clinic used to open every Monday and Thursday. However, after doctor Thuoc died and due to the deteriorating health of the two other medics, the clinic now only opens on Monday mornings at 8 am. Patients not only receive health checks, but they also receive free medicine. [A]",
        "Since 2014, the clinic has treated about 8,500 patients, according to Giap Bat ward's Red Cross Association. On **its** first days, the clinic faced numerous difficulties due to lack of money. Mrs. To, founder of the clinic, had to spend her own pension and encourage her children and relatives to **donate** money to purchase medical equipment and medicine. The clinic also had to relocate seven times as To and her co-workers could not afford high rents. Despite these difficulties, they never thought of giving up. \"Being able to help my patients brings me unspeakable joy. This is also my life target. It warms my heart to see the happy faces of the patients,\" To said. [B]",
        "Tran Thi Toan, 64, a patient from Nam Dinh Province, now works as a servant in Ha Noi. She is grateful to doctor To and nurse Soc not just for the free treatment, but for their caring manner. Toan said: \"They give me meticulous treatment and clear, detailed instruction as well as advise me on a healthy and happy lifestyle\". Toan feels shy about her job, so the doctors' care and compassionate attitude have become her inspiration in life. [C]",
        "To the doctors, the most precious thing they receive from their patients is confidence in their skills, which can only be achieved through ethics and medical excellence. \"The success of a doctor does not lies in how much money they earn, but how many people they help\", Soc said. Sharing Soc's opinion, To said that \"Medical practitioners should not consider their profession as a tool to get rich. They should not benefit from their patients' pain. Patients come first, not money.\" [D]"
      ],
      "questions": [
        {
          "id": "ulis_r02_q01",
          "type": "factual_detail",
          "question_text": "How old was Dang Thi Nhan when she first started to bake cakes or prepare tea for the two doctors?",
          "options": [
            {
              "key": "A",
              "text": "20"
            },
            {
              "key": "B",
              "text": "67"
            },
            {
              "key": "C",
              "text": "43"
            },
            {
              "key": "D",
              "text": "47"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "For 20 years, Dang Thi Nhan, 67, has been waking up about 30 minutes earlier each day to bake cakes or prepare tea for two retired doctors in a clinic near her house in Ha Noi's Giap Bat Ward.",
          "explanation_vi": "Bà Đặng Thị Nhàn hiện tại 67 tuổi và đã làm việc này được 20 năm, nên khi bắt đầu bà: 67 - 20 = 47 tuổi."
        },
        {
          "id": "ulis_r02_q02",
          "type": "vocab_in_context",
          "question_text": "The word \"**they**\" in paragraph 1 refers to ................",
          "options": [
            {
              "key": "A",
              "text": "two doctors"
            },
            {
              "key": "B",
              "text": "husband and son"
            },
            {
              "key": "C",
              "text": "health checks"
            },
            {
              "key": "D",
              "text": "cakes"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "\"If one day **they** cannot take care of themselves and need some one to look after, I will do it voluntarily till the day they are gone,\" Nhan said.",
          "explanation_vi": "Từ \"they\" trong câu nói của bà Nhàn dùng để chỉ hai bác sĩ đã nghỉ hưu (two retired doctors) mà bà chăm sóc để trả ơn."
        },
        {
          "id": "ulis_r02_q03",
          "type": "vocab_in_context",
          "question_text": "The word \"**late**\" in paragraph 2 is closest in meaning to ....................",
          "options": [
            {
              "key": "A",
              "text": "last-minute"
            },
            {
              "key": "B",
              "text": "behind"
            },
            {
              "key": "C",
              "text": "delayed"
            },
            {
              "key": "D",
              "text": "deceased"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "It was established in 1992 by Dr Truong Thi Hoi To, 84, a former principal of Nam Dinh Medical College, Le Thi Soc, 87, a retired nurse from Saint Paul Municipal Hospital, and Le Thanh Thuoc, the **late** deputy director of the Viet Nam National Cancer Hospital, who died last year.",
          "explanation_vi": "Từ \"late\" khi đứng trước chức danh/tên người có nghĩa là \"cố/đã qua đời\" (deceased), phù hợp với mệnh đề giải thích \"who died last year\" ngay sau đó."
        },
        {
          "id": "ulis_r02_q04",
          "type": "vocab_in_context",
          "question_text": "The word \"**its**\" in paragraph 3 refers to ..................",
          "options": [
            {
              "key": "A",
              "text": "Red Cross Association"
            },
            {
              "key": "B",
              "text": "the clinic"
            },
            {
              "key": "C",
              "text": "medicine"
            },
            {
              "key": "D",
              "text": "pension"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "On **its** first days, the clinic faced numerous difficulties due to lack of money.",
          "explanation_vi": "\"its first days\" chỉ những ngày đầu hoạt động của phòng khám (the clinic)."
        },
        {
          "id": "ulis_r02_q05",
          "type": "negative_fact",
          "question_text": "Who probably did not work in a hospital before retirement?",
          "options": [
            {
              "key": "A",
              "text": "Le Thi Soc"
            },
            {
              "key": "B",
              "text": "Le Thanh Thuoc"
            },
            {
              "key": "C",
              "text": "Truong Thi Hoi To"
            },
            {
              "key": "D",
              "text": "All of them"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "It was established in 1992 by Dr Truong Thi Hoi To, 84, a former principal of Nam Dinh Medical College, Le Thi Soc, 87, a retired nurse from Saint Paul Municipal Hospital, and Le Thanh Thuoc, the **late** deputy director of the Viet Nam National Cancer Hospital, who died last year.",
          "explanation_vi": "Bà Trương Thị Hội Tố là cựu hiệu trưởng Trường Cao đẳng Y tế Nam Định (Nam Dinh Medical College - một trường học), trong khi bà Sóc làm ở Bệnh viện Saint Paul và ông Thước làm ở Bệnh viện K."
        },
        {
          "id": "ulis_r02_q06",
          "type": "factual_detail",
          "question_text": "In which lines does the author mention about the bad health condition of the doctors at the clinic.....",
          "options": [
            {
              "key": "A",
              "text": "line 5"
            },
            {
              "key": "B",
              "text": "line 13"
            },
            {
              "key": "C",
              "text": "line 23"
            },
            {
              "key": "D",
              "text": "line 28"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "However, after doctor Thuoc died and due to the deteriorating health of the two other medics, the clinic now only opens on Monday mornings at 8 am.",
          "explanation_vi": "Thông tin về sức khỏe giảm sút của các bác sĩ (\"due to the deteriorating health of the two other medics\") xuất hiện ở đoạn 2, tương ứng với dòng 12-13 của bài đọc."
        },
        {
          "id": "ulis_r02_q07",
          "type": "vocab_in_context",
          "question_text": "The word \"**donate**\" in paragraph 3 could be best replaced by ................",
          "options": [
            {
              "key": "A",
              "text": "give"
            },
            {
              "key": "B",
              "text": "take"
            },
            {
              "key": "C",
              "text": "keep"
            },
            {
              "key": "D",
              "text": "get"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "Mrs. To, founder of the clinic, had to spend her own pension and encourage her children and relatives to **donate** money to purchase medical equipment and medicine.",
          "explanation_vi": "Từ \"donate\" nghĩa là quyên góp, đóng góp/cho tặng tiền bạc, đồng nghĩa với \"give\"."
        },
        {
          "id": "ulis_r02_q08",
          "type": "factual_detail",
          "question_text": "What has helped Mrs. Tran Thi Toan gain confidence in her life?",
          "options": [
            {
              "key": "A",
              "text": "her job as a servant"
            },
            {
              "key": "B",
              "text": "her gratitude to all doctors"
            },
            {
              "key": "C",
              "text": "her healthy and happy lifestyle"
            },
            {
              "key": "D",
              "text": "doctors' caring manner and free treatment at clinic"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 3,
          "clue_sentence": "Toan feels shy about her job, so the doctors' care and compassionate attitude have become her inspiration in life.",
          "explanation_vi": "Đoạn 4 nêu rõ bà Toàn cảm thấy tự ti về công việc của mình, chính sự chăm sóc chu đáo, thái độ tận tâm và sự chữa trị miễn phí của các bác sĩ đã truyền cảm hứng và niềm tin cho bà."
        },
        {
          "id": "ulis_r02_q09",
          "type": "sentence_insertion",
          "question_text": "In which space (marked A, B, C and D in the passage) will the following sentence fit?\n\"They treat me as a close member of their family. There is no discrimination between the rich and the poor. Everyone is treated equally.\" She added.",
          "options": [
            {
              "key": "A",
              "text": "A"
            },
            {
              "key": "B",
              "text": "B"
            },
            {
              "key": "C",
              "text": "C"
            },
            {
              "key": "D",
              "text": "D"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "Toan feels shy about her job, so the doctors' care and compassionate attitude have become her inspiration in life. [C]",
          "explanation_vi": "Câu cần chèn trích lời nói của bà Toàn (\"She added\"), tiếp nối lời chia sẻ về thái độ đối đãi bình đẳng, ấm áp của các bác sĩ dành cho một người làm nghề giúp việc như bà ở vị trí [C]."
        },
        {
          "id": "ulis_r02_q10",
          "type": "factual_detail",
          "question_text": "The last paragraph indicates Mrs. Soc's opinion that a doctor is successful if ....",
          "options": [
            {
              "key": "A",
              "text": "he/ she earns a lot of money"
            },
            {
              "key": "B",
              "text": "he/ she is confident in his/her skills"
            },
            {
              "key": "C",
              "text": "he/ she helps a lot of patients"
            },
            {
              "key": "D",
              "text": "he/ she benefits from their patients' pain"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 4,
          "clue_sentence": "\"The success of a doctor does not lies in how much money they earn, but how many people they help\", Soc said.",
          "explanation_vi": "Bà Sóc phát biểu: \"Thành công của bác sĩ không nằm ở việc kiếm được bao nhiêu tiền, mà ở việc giúp đỡ được bao nhiêu người\"."
        }
      ],
      "id": "ulis_r02_p1"
    },
    {
      "title": "Passage 2: To Get a Job in Your 50s, Maintain Friendships in Your 40s",
      "topic": "Employment & Aging",
      "word_count": 406,
      "difficulty": "B2",
      "content_paragraphs": [
        "We hear it all the time: People who are over 50 take longer to find jobs than younger people. Connie Wanberg, a professor at the Carlson School of Management at the University of Minnesota, had long heard **gloom-and-doom** stories to that effect, but she wondered how strong the data was to support them.",
        "Very, as it turned out. According to a study by Professor Wanberg and others, job seekers over 50 were unemployed 5.8 weeks longer than those from the ages of 30 to 49. That number rose to 10.6 weeks when the comparison group was from 20 to 29. Professor Wanberg and three other researchers — Darla J. Hamann, Ruth Kanfer and Zhen Zhang — arrived at those numbers by analyzing and synthesizing hundreds of studies by economists, sociologists and psychologists.",
        "But it is important not to jump to conclusions about the cause, Professor Wanberg said. “It’s not very unusual for everybody to think that the reason for the difficulty in finding jobs at 50s is discrimination,” she said. That can sometimes be the case, but the reality is that the behavior required to find work does not play to many older people’s strengths. Once they become aware of this, they can act to compensate.",
        "In **their** study, the researchers found that older people on average had smaller social networks than younger people, Professor Wanberg said. This is not necessarily bad — as we age, many of us find that the quality of our relationships is more important than the quantity. But in the job search process, the number of connections we maintain in our professional and personal networks is often **critical**.",
        "As people age, they also tend to stay in the same job longer, consistent with a pattern of wanting to put down roots. During that time, the skills people have learned and the job search strategies they once used may become outdated — especially as technology evolves ever more quickly.",
        "The cure for **these drawbacks** is fairly straightforward. Once you hit your early 40s, even if you are not looking for a job, work to learn new skills and stretch yourself, Professor Wanberg said. Also, keep your networks strong by staying in touch with former colleagues and classmates, along with current co-workers and clients whom you don’t see regularly, she said.",
        "Finding a job after 50 doesn’t have to be as discouraging as it is often portrayed to be, Professor Wanberg said. Just recognize that some of the obstacles you face are inherent to the aging process, she said. She stressed that her findings reflected only averages and that individual behavior varies greatly. Certainly, many older people maintain wide social circles and often learn skills. But in general, older job seekers must take more steps to find employment than younger ones, she said.",
        "Once older workers do find a new employer, they can use their knowledge, wisdom and emotional intelligence — qualities that older people often possess in abundance — to thrive in their new positions."
      ],
      "questions": [
        {
          "id": "ulis_r02_q11",
          "type": "vocab_in_context",
          "question_text": "The word \"**gloom-and-doom**\" in the first paragraph could be best replaced by ...............",
          "options": [
            {
              "key": "A",
              "text": "hopeless"
            },
            {
              "key": "B",
              "text": "interesting"
            },
            {
              "key": "C",
              "text": "cheerful"
            },
            {
              "key": "D",
              "text": "strange"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "Connie Wanberg, a professor at the Carlson School of Management at the University of Minnesota, had long heard **gloom-and-doom** stories to that effect, but she wondered how strong the data was to support them.",
          "explanation_vi": "Cụm từ \"gloom-and-doom\" mang nghĩa bi quan, u ám hoặc tuyệt vọng. Do đó, nó đồng nghĩa nhất với \"hopeless\" (tuyệt vọng, không có hy vọng)."
        },
        {
          "id": "ulis_r02_q12",
          "type": "factual_detail",
          "question_text": "According to the study, which age group has the least unemployed time?",
          "options": [
            {
              "key": "A",
              "text": "less than 20"
            },
            {
              "key": "B",
              "text": "from 20 to 29"
            },
            {
              "key": "C",
              "text": "from 30 to 49"
            },
            {
              "key": "D",
              "text": "over 50"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "That number rose to 10.6 weeks when the comparison group was from 20 to 29.",
          "explanation_vi": "Đoạn 2 nêu rõ người trên 50 tuổi thất nghiệp lâu hơn 5.8 tuần so với nhóm 30-49 tuổi, và con số này tăng lên 10.6 tuần khi so với nhóm 20-29 tuổi. Điều này nghĩa là nhóm 20-29 tuổi có thời gian thất nghiệp ngắn nhất."
        },
        {
          "id": "ulis_r02_q13",
          "type": "inference",
          "question_text": "In the third paragraph, what best paraphrases the sentence “It’s not very unusual for everybody to think that the reason for the difficulty in finding jobs at 50s is discrimination”?",
          "options": [
            {
              "key": "A",
              "text": "People do not usually think about the cause of discrimination in finding jobs at 50s."
            },
            {
              "key": "B",
              "text": "People do not usually think that discrimination is the reason for the difficulty at 50s."
            },
            {
              "key": "C",
              "text": "People commonly believe that finding jobs at 50s causes discrimination."
            },
            {
              "key": "D",
              "text": "People commonly believe that discrimination makes finding jobs at 50s difficult."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "“It’s not very unusual for everybody to think that the reason for the difficulty in finding jobs at 50s is discrimination,” she said.",
          "explanation_vi": "\"It's not very unusual for everybody to think...\" đồng nghĩa với \"People commonly believe...\" (Mọi người thường tin rằng...). Vế sau \"the reason for the difficulty in finding jobs at 50s is discrimination\" nghĩa là sự phân biệt đối xử khiến việc tìm việc ở tuổi 50 gặp khó khăn. Do đó đáp án D diễn đạt chính xác nhất.",
          "paraphrase_analysis": {
            "question_phrase": "It’s not very unusual for everybody to think that the reason for the difficulty in finding jobs at 50s is discrimination",
            "passage_phrase": "People commonly believe that discrimination makes finding jobs at 50s difficult.",
            "explanation": "\"not very unusual to think\" tương đương với \"commonly believe\", và \"reason for the difficulty... is discrimination\" tương đương với \"discrimination makes... difficult\"."
          }
        },
        {
          "id": "ulis_r02_q14",
          "type": "vocab_in_context",
          "question_text": "The word \"**their**\" in paragraph 4 refers to ...............",
          "options": [
            {
              "key": "A",
              "text": "the researchers"
            },
            {
              "key": "B",
              "text": "older people"
            },
            {
              "key": "C",
              "text": "social networks"
            },
            {
              "key": "D",
              "text": "younger people"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 3,
          "clue_sentence": "In **their** study, the researchers found that older people on average had smaller social networks than younger people, Professor Wanberg said.",
          "explanation_vi": "Trong câu \"In their study, the researchers found...\", tính từ sở hữu \"their\" quy chiếu đến \"the researchers\" (các nhà nghiên cứu)."
        },
        {
          "id": "ulis_r02_q15",
          "type": "vocab_in_context",
          "question_text": "The word \"**critical**\" in paragraph 4 could be best replaced by .............",
          "options": [
            {
              "key": "A",
              "text": "huge"
            },
            {
              "key": "B",
              "text": "demanding"
            },
            {
              "key": "C",
              "text": "trivial"
            },
            {
              "key": "D",
              "text": "important"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 3,
          "clue_sentence": "But in the job search process, the number of connections we maintain in our professional and personal networks is often **critical**.",
          "explanation_vi": "Từ \"critical\" trong ngữ cảnh này mang nghĩa cực kỳ quan trọng, quyết định, đồng nghĩa với \"important\"."
        },
        {
          "id": "ulis_r02_q16",
          "type": "factual_detail",
          "question_text": "What advice does Professor Wanberg give to over 50 year-old job seekers when they are still at early 40s?",
          "options": [
            {
              "key": "A",
              "text": "maintaining small but strong social networks"
            },
            {
              "key": "B",
              "text": "becoming aware of their strengths"
            },
            {
              "key": "C",
              "text": "learning new skills and keeping wide social circles"
            },
            {
              "key": "D",
              "text": "staying in the same job longer."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 5,
          "clue_sentence": "Once you hit your early 40s, even if you are not looking for a job, work to learn new skills and stretch yourself, Professor Wanberg said.",
          "explanation_vi": "Ở đoạn 6, Giáo sư Wanberg khuyên khi bước sang tuổi 40, cần học các kỹ năng mới và giữ mạng lưới quan hệ xã hội mạnh mẽ (\"learn new skills\" và \"keep your networks strong\")."
        },
        {
          "id": "ulis_r02_q17",
          "type": "vocab_in_context",
          "question_text": "The word \"**these drawbacks**\" in paragraph 6 refers to .............",
          "options": [
            {
              "key": "A",
              "text": "outdated skills and job search strategies"
            },
            {
              "key": "B",
              "text": "small numbers of connection networks"
            },
            {
              "key": "C",
              "text": "lost social circles with co-workers and clients"
            },
            {
              "key": "D",
              "text": "low quality and small quantity of relationships"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 4,
          "clue_sentence": "During that time, the skills people have learned and the job search strategies they once used may become outdated — especially as technology evolves ever more quickly.",
          "explanation_vi": "Cụm từ \"these drawbacks\" (nhược điểm này) ở đầu đoạn 6 liên hệ trực tiếp tới ý ở đoạn 5 ngay trước đó, nhắc về kỹ năng và chiến lược tìm việc bị lỗi thời (\"skills... and job search strategies... become outdated\")."
        },
        {
          "id": "ulis_r02_q18",
          "type": "negative_fact",
          "question_text": "What of the following statements is not true according to the passage?",
          "options": [
            {
              "key": "A",
              "text": "Finding a job after 50 is not at all hopeless"
            },
            {
              "key": "B",
              "text": "Older people hardly learn new skills and maintain wide social networks"
            },
            {
              "key": "C",
              "text": "Older people often have many good qualities"
            },
            {
              "key": "D",
              "text": "Findings of the study does not hold true for all older people."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 6,
          "clue_sentence": "Certainly, many older people maintain wide social circles and often learn skills.",
          "explanation_vi": "Đoạn 7 khẳng định \"Certainly, many older people maintain wide social circles and often learn skills\" (Chắc chắn nhiều người lớn tuổi duy trì các mối quan hệ xã hội rộng và thường xuyên học kỹ năng). Vì vậy câu B nói họ \"hầu như không học kỹ năng mới và duy trì mạng lưới xã hội\" là KHÔNG đúng."
        },
        {
          "id": "ulis_r02_q19",
          "type": "author_attitude",
          "question_text": "Which of the following would best describe Professor Wanberg's attitude towards finding a job after 50?",
          "options": [
            {
              "key": "A",
              "text": "hopeless"
            },
            {
              "key": "B",
              "text": "frustrated"
            },
            {
              "key": "C",
              "text": "optimistic"
            },
            {
              "key": "D",
              "text": "discouraging"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 6,
          "clue_sentence": "Finding a job after 50 doesn’t have to be as discouraging as it is often portrayed to be, Professor Wanberg said.",
          "explanation_vi": "Giáo sư Wanberg tin rằng việc tìm việc ở tuổi 50 không hẳn nản lòng như hay bị gán ghép, và có những giải pháp cụ thể. Thái độ của bà mang tính lạc quan (optimistic)."
        },
        {
          "id": "ulis_r02_q20",
          "type": "main_idea",
          "question_text": "What is the purpose of this passage?",
          "options": [
            {
              "key": "A",
              "text": "To report the difficulties of finding jobs at 50s."
            },
            {
              "key": "B",
              "text": "To discuss the advantages and disadvantages of 50 year-old job seekers."
            },
            {
              "key": "C",
              "text": "To warn people against skipping jobs at later ages."
            },
            {
              "key": "D",
              "text": "To raise awareness on the importance of maintaining social connections and learning new skills at early stages."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 5,
          "clue_sentence": "Once you hit your early 40s, even if you are not looking for a job, work to learn new skills and stretch yourself, Professor Wanberg said.",
          "explanation_vi": "Mục đích chính của bài đọc (thể hiện ngay từ tiêu đề và đoạn 6) là nâng cao nhận thức về việc duy trì kết nối xã hội và học kỹ năng mới ở giai đoạn sớm (tuổi 40) để chuẩn bị cho công việc khi ở độ tuổi 50."
        }
      ],
      "id": "ulis_r02_p2"
    },
    {
      "title": "Passage 3: Mary's First Job",
      "topic": "Personal Memoir & Work",
      "word_count": 443,
      "difficulty": "B2",
      "content_paragraphs": [
        "When I was just fifteen, my father purchased an old hostel in the country where we lived and decided to turn **it** into a luxury hotel. At the early stages of the hotel, he experimented with everything. None of us had ever worked in a hotel before, but my dad had a vision of what guests wanted. His standards were extremely high and he believed that to reach those standards the most important thing was work.",
        "For a month that summer I worked as a waitress at breakfast and dinner. As part of the job I had to lay the tables in the dining room beforehand and clean up afterwards. This gave me the middle of the day free for studying because my school report predictably had not lived up to my father's high expectations.",
        "Like all the other waitresses, I was equipped with a neat uniform and told to treat the guests as though they were special visitors in my own home. Although I felt more like a stranger in theirs, I did not express my feelings. Instead I concentrated on doing the job as well as, if not better than, the older girls.",
        "In the kitchen I learned how to deal with Gordon, the chef, who I found rather daunting. He had an impressive chef's hat and a terrifying ability to lose his temper and get violent for no clear reason. I avoided close contact with him and always grabbed the dishes he gave me with a cold look on my face. Then, as I walked from the kitchen to the dining room, my cold expression used to change into a charming smile.",
        "I found waiting at breakfast was more enjoyable than at dinner. The guests came wandering into the dining room from seven-thirty onwards, staring with pleasure at the view of the sea and the islands through the dining room window. I always made sure that everyone got their order quickly and I enjoyed getting on well with the people at each table.",
        "In the evenings it was funny how differently people behaved; they talked with louder, less friendly voices, and did not always return my smile. However, that all changed when Dad created a special role for me which improved my status considerably.",
        "I started by making simple cakes for guests' picnics and soon progressed to more elaborate cakes for afternoon teas. I found that recipes were easy to follow and it was amusing to improvise. This led to a nightly event known as Mary's Sweet Trolley. I used to enter the dining room every evening pushing a trolley carrying an extraordinary collection of puddings, cakes and other desserts. Most of them were of my own invention, I had cooked them all myself, and some were undeniably strange."
      ],
      "questions": [
        {
          "id": "ulis_r02_q21",
          "type": "factual_detail",
          "question_text": "The word \"**it**\" in line 2 refers to ..................",
          "options": [
            {
              "key": "A",
              "text": "an old hostel"
            },
            {
              "key": "B",
              "text": "the country"
            },
            {
              "key": "C",
              "text": "a luxury hotel"
            },
            {
              "key": "D",
              "text": "Mary's first job"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "When I was just fifteen, my father purchased an old hostel in the country where we lived and decided to turn **it** into a luxury hotel.",
          "explanation_vi": "Từ \"it\" thay thế cho danh từ \"an old hostel\" được nhắc đến ngay trước đó, diễn tả việc cha của Mary đã mua một nhà trọ cũ và biến nó thành một khách sạn sang trọng."
        },
        {
          "id": "ulis_r02_q22",
          "type": "factual_detail",
          "question_text": "What did the people working at the hotel have in common?",
          "options": [
            {
              "key": "A",
              "text": "They knew what the guests expected."
            },
            {
              "key": "B",
              "text": "They shared all the jobs."
            },
            {
              "key": "C",
              "text": "They lacked experience."
            },
            {
              "key": "D",
              "text": "They enjoyed the work."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "None of us had ever worked in a hotel before, but my dad had a vision of what guests wanted.",
          "explanation_vi": "Câu \"None of us had ever worked in a hotel before\" cho thấy điểm chung giữa những người làm việc ở đây là họ đều thiếu kinh nghiệm làm việc trong khách sạn."
        },
        {
          "id": "ulis_r02_q23",
          "type": "factual_detail",
          "question_text": "Mary's working day was organized in order to give her ...............",
          "options": [
            {
              "key": "A",
              "text": "time for her school work."
            },
            {
              "key": "B",
              "text": "working experience."
            },
            {
              "key": "C",
              "text": "time at midday to relax."
            },
            {
              "key": "D",
              "text": "time to have lunch with her father."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "This gave me the middle of the day free for studying because my school report predictably had not lived up to my father's high expectations.",
          "explanation_vi": "Mary làm việc vào buổi sáng và buổi tối để có khoảng thời gian giữa ngày rảnh rỗi dành cho việc học tập (studying = time for her school work)."
        },
        {
          "id": "ulis_r02_q24",
          "type": "inference",
          "question_text": "In the second paragraph, what best paraphrases the sentence \"my school report predictably had not lived up to my father's high expectations\"",
          "options": [
            {
              "key": "A",
              "text": "The school made a report about my expectations to my father."
            },
            {
              "key": "B",
              "text": "My father has not satisfied with my results at school."
            },
            {
              "key": "C",
              "text": "The report from school is highly predictable to my father."
            },
            {
              "key": "D",
              "text": "My father expects to receive the school report soon."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "This gave me the middle of the day free for studying because my school report predictably had not lived up to my father's high expectations.",
          "explanation_vi": "Cụm \"had not lived up to my father's high expectations\" nghĩa là kết quả học tập không đáp ứng được kỳ vọng của cha cô, đồng nghĩa với việc cha cô không hài lòng với kết quả học tập của cô.",
          "paraphrase_analysis": {
            "question_phrase": "not lived up to my father's high expectations",
            "passage_phrase": "My father has not satisfied with my results at school",
            "explanation": "Cả hai câu đều thể hiện việc cha của Mary không hài lòng với kết quả học tập của cô."
          }
        },
        {
          "id": "ulis_r02_q25",
          "type": "vocab_in_context",
          "question_text": "What does the writer mean by \"daunting\" in line 16?",
          "options": [
            {
              "key": "A",
              "text": "disgusting"
            },
            {
              "key": "B",
              "text": "frightening"
            },
            {
              "key": "C",
              "text": "interesting"
            },
            {
              "key": "D",
              "text": "strange"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "In the kitchen I learned how to deal with Gordon, the chef, who I found rather daunting.",
          "explanation_vi": "Từ \"daunting\" mô tả một người gây nản lòng, đáng sợ. Ngay sau đó tác giả mô tả ông bếp trưởng có khả năng nổi giận rất đáng sợ (\"terrifying ability to lose his temper\"), do đó \"daunting\" đồng nghĩa với \"frightening\"."
        },
        {
          "id": "ulis_r02_q26",
          "type": "factual_detail",
          "question_text": "What did Mary do while she walked from the kitchen to the dining room?",
          "options": [
            {
              "key": "A",
              "text": "She smiled at Gordon in a friendly way."
            },
            {
              "key": "B",
              "text": "She avoided touching Gordon."
            },
            {
              "key": "C",
              "text": "She checked the food Gordon gave her."
            },
            {
              "key": "D",
              "text": "She started to look more friendly."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 3,
          "clue_sentence": "Then, as I walked from the kitchen to the dining room, my cold expression used to change into a charming smile.",
          "explanation_vi": "Khi đi từ bếp ra phòng ăn, vẻ mặt lạnh lùng của Mary chuyển thành một nụ cười duyên dáng (charming smile), tức là trông thân thiện hơn."
        },
        {
          "id": "ulis_r02_q27",
          "type": "factual_detail",
          "question_text": "Why did Mary enjoy serving breakfasts more than dinners?",
          "options": [
            {
              "key": "A",
              "text": "She enjoyed the view from the dining room while working."
            },
            {
              "key": "B",
              "text": "She had a better relationship with the guests."
            },
            {
              "key": "C",
              "text": "The guests were more punctual than at dinner."
            },
            {
              "key": "D",
              "text": "She worked more efficiently at breakfast."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 4,
          "clue_sentence": "I always made sure that everyone got their order quickly and I enjoyed getting on well with the people at each table.",
          "explanation_vi": "Mary thích phục vụ bữa sáng hơn vì cô có mối quan hệ tốt hơn với thực khách (getting on well with the people = better relationship with the guests)."
        },
        {
          "id": "ulis_r02_q28",
          "type": "factual_detail",
          "question_text": "How did Mary's father improve her position in the hotel?",
          "options": [
            {
              "key": "A",
              "text": "He put her in charge of the restaurant."
            },
            {
              "key": "B",
              "text": "He asked her to provide entertainment for the guests."
            },
            {
              "key": "C",
              "text": "He made her responsible for part of dinner."
            },
            {
              "key": "D",
              "text": "He gave her a special uniform."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 5,
          "clue_sentence": "However, that all changed when Dad created a special role for me which improved my status considerably.",
          "explanation_vi": "Bố của Mary tạo cho cô một vai trò đặc biệt vào buổi tối (Mary's Sweet Trolley phục vụ món tráng miệng), giao trách nhiệm một phần của bữa tối cho cô."
        },
        {
          "id": "ulis_r02_q29",
          "type": "factual_detail",
          "question_text": "What was special about the food on Mary's Sweet Trolley?",
          "options": [
            {
              "key": "A",
              "text": "Mary made it following traditional recipes."
            },
            {
              "key": "B",
              "text": "Mary made the same food for picnics."
            },
            {
              "key": "C",
              "text": "Mary and Gordon made it together."
            },
            {
              "key": "D",
              "text": "Most of the desserts were invented and cooked by Mary herself."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 6,
          "clue_sentence": "Most of them were of my own invention, I had cooked them all myself, and some were undeniably strange.",
          "explanation_vi": "Điểm đặc biệt của món ăn trên xe đẩy tráng miệng là hầu hết các món do chính Mary sáng tạo ra và tự tay nấu."
        },
        {
          "id": "ulis_r02_q30",
          "type": "main_idea",
          "question_text": "What is the best title for the passage?",
          "options": [
            {
              "key": "A",
              "text": "Working with a Difficult Chef"
            },
            {
              "key": "B",
              "text": "Mary's Experience Working in Her Father's Hotel"
            },
            {
              "key": "C",
              "text": "How to Run a Luxury Hotel"
            },
            {
              "key": "D",
              "text": "The Secret of Baking Great Cakes"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "When I was just fifteen, my father purchased an old hostel in the country where we lived and decided to turn **it** into a luxury hotel.",
          "explanation_vi": "Toàn bộ bài đọc kể lại trải nghiệm đầu đời của tác giả Mary khi làm việc tại khách sạn do cha cô sở hữu."
        }
      ],
      "id": "ulis_r02_p3"
    },
    {
      "title": "Passage 4: Potash in Colonial North America",
      "topic": "Industrial History & Science",
      "word_count": 321,
      "difficulty": "C1",
      "content_paragraphs": [
        "Potash (the old name for potassium carbonate) is one of the two alkalis (the other being soda, sodium carbonate) that were used from remote antiquity in the making of glass, and from the early Middle Ages in the making of soap: the former being the product of heating a mixture of alkali and sand, **the latter** a product of alkali and vegetable oil. Their importance in the communities of colonial North America need hardly be **stressed**.",
        "Potash and soda are not **interchangeable** for all purposes, but for glass-or soap-making either would do. Soda was obtained largely from the ashes of certain Mediterranean sea plants, potash from those of inland vegetation. Hence potash was more familiar to the early European settlers of the North American continent.",
        "The settlement at Jamestown in Virginia was in many ways a microcosm of the economy of colonial North America, and potash was one of its first concerns. It was required for the glassworks, the first factory in the British colonies, and was produced in sufficient quantity to permit the inclusion of potash in the first cargo shipped out of Jamestown. The second ship to arrive in the settlement from England included among its passengers experts in potash making.",
        "The method of making potash was simple enough. Logs was piled up and burned in the open, and the ashes collected. The ashes were placed in a barrel with holes in the bottom, and water was poured over them. The solution draining from the barrel was boiled down in iron kettles. The resulting mass was further heated to fuse the mass into what was called potash.",
        "In North America, potash making quickly became an **adjunct** to the clearing of land for agriculture, for it was estimated that as much as half the cost of clearing land could be recovered by the sale of potash. Some potash was exported from Maine and New Hampshire in the seventeenth century, but the market turned out to be mainly domestic, consisting mostly of shipments from the northern to the southern colonies. For despite the beginning of the trade at Jamestown and such encouragements as a series of acts to encourage the making of potash, beginning in 1707 in South Carolina, the softwoods in the South proved to be poor sources of the substance."
      ],
      "questions": [
        {
          "id": "ulis_r02_q31",
          "type": "main_idea",
          "question_text": "What aspect of potash does the passage mainly discuss?",
          "options": [
            {
              "key": "A",
              "text": "How it was made"
            },
            {
              "key": "B",
              "text": "Its value as a product for export"
            },
            {
              "key": "C",
              "text": "How it differs from other alkalis"
            },
            {
              "key": "D",
              "text": "Its importance in colonial North America"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "Their importance in the communities of colonial North America need hardly be **stressed**.",
          "explanation_vi": "Bài đọc xoay quanh vai trò, ứng dụng và tầm quan trọng của tro bồ đề (potash) trong nền kinh tế và đời sống của các thuộc địa Bắc Mỹ thời kỳ thuộc địa. Do đó đáp án D là chính xác."
        },
        {
          "id": "ulis_r02_q32",
          "type": "negative_fact",
          "question_text": "All of the following statements are true of both potash and soda EXCEPT ...............",
          "options": [
            {
              "key": "A",
              "text": "They are alkalis."
            },
            {
              "key": "B",
              "text": "They are made from sea plants."
            },
            {
              "key": "C",
              "text": "They are used in making soap."
            },
            {
              "key": "D",
              "text": "They are used in making glass."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "Soda was obtained largely from the ashes of certain Mediterranean sea plants, potash from those of inland vegetation.",
          "explanation_vi": "Đoạn 2 nêu rõ soda được làm từ thực vật biển (sea plants), trong khi potash được làm từ thực vật đất liền (inland vegetation). Do đó, phát biểu B (Cả hai đều làm từ thực vật biển) là sai."
        },
        {
          "id": "ulis_r02_q33",
          "type": "vocab_in_context",
          "question_text": "They phrase \"**the latter**\" in paragraph 1 refers to ....................",
          "options": [
            {
              "key": "A",
              "text": "alkali"
            },
            {
              "key": "B",
              "text": "glass"
            },
            {
              "key": "C",
              "text": "sand"
            },
            {
              "key": "D",
              "text": "soap"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "Potash (the old name for potassium carbonate) is one of the two alkalis (the other being soda, sodium carbonate) that were used from remote antiquity in the making of glass, and from the early Middle Ages in the making of soap: the former being the product of heating a mixture of alkali and sand, **the latter** a product of alkali and vegetable oil.",
          "explanation_vi": "Trong đoạn 1, \"making of glass\" và \"making of soap\" được nhắc tới theo thứ tự. \"the former\" quy chiếu tới việc làm thủy tinh (glass), còn \"the latter\" quy chiếu tới việc làm xà phòng (soap)."
        },
        {
          "id": "ulis_r02_q34",
          "type": "vocab_in_context",
          "question_text": "The word \"**stressed**\" in paragraph 1 could be best replaced by .....................",
          "options": [
            {
              "key": "A",
              "text": "defined"
            },
            {
              "key": "B",
              "text": "emphasized"
            },
            {
              "key": "C",
              "text": "adjusted"
            },
            {
              "key": "D",
              "text": "mentioned"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "Their importance in the communities of colonial North America need hardly be **stressed**.",
          "explanation_vi": "Từ \"stressed\" trong ngữ cảnh này có nghĩa là nhấn mạnh (emphasized), hàm ý tầm quan trọng của chúng là điều không cần phải nhấn mạnh thêm nữa."
        },
        {
          "id": "ulis_r02_q35",
          "type": "vocab_in_context",
          "question_text": "The word \"**interchangeable**\" in paragraph 2 is closest in meaning to .....",
          "options": [
            {
              "key": "A",
              "text": "convenient"
            },
            {
              "key": "B",
              "text": "identifiable"
            },
            {
              "key": "C",
              "text": "equivalent"
            },
            {
              "key": "D",
              "text": "advantageous"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "Potash and soda are not **interchangeable** for all purposes, but for glass-or soap-making either would do.",
          "explanation_vi": "\"Interchangeable\" có nghĩa là có thể thay thế cho nhau, tương đương nhau (equivalent)."
        },
        {
          "id": "ulis_r02_q36",
          "type": "inference",
          "question_text": "It can be inferred from the passage that potash was more common than soda in colonial North America because ........",
          "options": [
            {
              "key": "A",
              "text": "the materials needed for making soda were not readily available"
            },
            {
              "key": "B",
              "text": "making potash required less time than making soda"
            },
            {
              "key": "C",
              "text": "potash was better than soda for making glass and soap"
            },
            {
              "key": "D",
              "text": "the colonial glassworks found soda more difficult to use"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "Soda was obtained largely from the ashes of certain Mediterranean sea plants, potash from those of inland vegetation. Hence potash was more familiar to the early European settlers of the North American continent.",
          "explanation_vi": "Đoạn 2 giải thích soda được làm từ thực vật biển Địa Trung Hải (không sẵn có ở Bắc Mỹ), còn potash làm từ thực vật nội địa. Do đó nguyên liệu làm soda không có sẵn tại Bắc Mỹ."
        },
        {
          "id": "ulis_r02_q37",
          "type": "negative_fact",
          "question_text": "According to paragraph 4, all of the following were needed for making potash EXCEPT ......",
          "options": [
            {
              "key": "A",
              "text": "wood"
            },
            {
              "key": "B",
              "text": "fire"
            },
            {
              "key": "C",
              "text": "sand"
            },
            {
              "key": "D",
              "text": "water"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "Logs was piled up and burned in the open, and the ashes collected. The ashes were placed in a barrel with holes in the bottom, and water was poured over them.",
          "explanation_vi": "Đoạn 4 miêu tả quy trình sản xuất potash gồm: gỗ (logs), đốt cháy (burned - cần lửa fire), và nước (water). Cát (sand) chỉ dùng khi làm thủy tinh (đoạn 1), không dùng để chế tạo potash."
        },
        {
          "id": "ulis_r02_q38",
          "type": "vocab_in_context",
          "question_text": "The word \"**adjunct**\" in paragraph 5 is closest in meaning to ......",
          "options": [
            {
              "key": "A",
              "text": "addition"
            },
            {
              "key": "B",
              "text": "answer"
            },
            {
              "key": "C",
              "text": "problem"
            },
            {
              "key": "D",
              "text": "possibility"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 4,
          "clue_sentence": "In North America, potash making quickly became an **adjunct** to the clearing of land for agriculture, for it was estimated that as much as half the cost of clearing land could be recovered by the sale of potash.",
          "explanation_vi": "Từ \"adjunct\" có nghĩa là phần bổ sung, phần đính kèm thêm vào (addition)."
        },
        {
          "id": "ulis_r02_q39",
          "type": "factual_detail",
          "question_text": "According to the passage, a major benefit of making potash was that .......",
          "options": [
            {
              "key": "A",
              "text": "it could be exported to Europe in exchange for other goods"
            },
            {
              "key": "B",
              "text": "it helped finance the creation of farms"
            },
            {
              "key": "C",
              "text": "it could be made with a variety of materials"
            },
            {
              "key": "D",
              "text": "stimulated the development of new ways of glassmaking"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 4,
          "clue_sentence": "In North America, potash making quickly became an **adjunct** to the clearing of land for agriculture, for it was estimated that as much as half the cost of clearing land could be recovered by the sale of potash.",
          "explanation_vi": "Đoạn 5 nêu rõ tiền bán potash giúp thu hồi tới một nửa chi phí khai hoang đất làm nông nghiệp (creation of farms), tức hỗ trợ tài chính cho việc tạo dựng trang trại."
        },
        {
          "id": "ulis_r02_q40",
          "type": "factual_detail",
          "question_text": "According to paragraph 5, the softwoods in the South posed which of the following problems for southern settles?",
          "options": [
            {
              "key": "A",
              "text": "The softwoods were not very plentiful."
            },
            {
              "key": "B",
              "text": "The softwoods could not be used to build houses."
            },
            {
              "key": "C",
              "text": "The softwoods were not very marketable."
            },
            {
              "key": "D",
              "text": "The softwoods were not very useful for making potash."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 4,
          "clue_sentence": "For despite the beginning of the trade at Jamestown and such encouragements as a series of acts to encourage the making of potash, beginning in 1707 in South Carolina, the softwoods in the South proved to be poor sources of the substance.",
          "explanation_vi": "Câu cuối đoạn 5 ghi rõ \"the softwoods in the South proved to be poor sources of the substance\" (gỗ mềm ở miền Nam là nguồn nguyên liệu kém để sản xuất chất này/potash)."
        }
      ],
      "id": "ulis_r02_p4"
    }
  ]
};
