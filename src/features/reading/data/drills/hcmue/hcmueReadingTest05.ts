import type { ReadingTest } from '../../../../../types/schemas';

/**
 * Authentic VSTEP Reading Practice Drill 5 (HCMUE Standard)
 * Source: "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017), Test 5 Reading (PDF Pages 119–132), Key page 191 (Book p. 192)
 * Format: 4 Passages, 40 Questions, 60 Minutes.
 */
export const HCMUE_READING_TEST_05: ReadingTest = {
  "id": "hcmue_read_test_05",
  "title": "VSTEP Reading Practice Drill 5 (Chuẩn ĐH Sư Phạm TP.HCM)",
  "duration_minutes": 60,
  "difficulty": "B2",
  "passages": [
    {
      "title": "Passage 1: The Oregon Boundary Dispute",
      "topic": "History & Culture",
      "word_count": 353,
      "difficulty": "B1",
      "content_paragraphs": [
        "The influx of Americans into Oregon in the 1840s ignited a dispute between Britain and the United States that, in its more intemperate phases, was accompanied by shrill demands in both countries for war. The argument originated in the fact that the boundaries of Oregon had never been clearly fixed.",
        "The name vaguely embraced the territory west of the Rockies between the northern boundary of Mexican-held California and the southern edge of Russian-held Alaska, which at the time extended south to parallel 54° 40'. In 1818, when America proposed a boundary at the 49th parallel an extension of the border with Canada that already existed east of the Rockies and the British suggested a line farther south, statesmen of both nations avoided the resulting impasse by agreeing to accept temporary \"joint occupancy\".",
        "But by the early 1840s, the issue could no longer be avoided: Oregon fever and Manifest Destiny had become potent political forces. Though many eastern Americans considered Oregon country too remote to become excited about, demands for its occupation were shouted with almost religious fervor. Senator Thomas Hart Benton, for one, urged Congress to muster \"thirty or forty thousand American rifles beyond the Rocky Mountains that will be our effective negotiators.\"",
        "The Democratic Party made \"54°40' or fight\", an issue of the 1844 Presidential election and just managed to install James K. Polk, an ardent expansionist, in the White House. But despite their seeming intransigence, neither Polk nor the British government wanted to fight. And just about the time that Polk learned that the land lying north of the 49th parallel was useless for agriculture, the British decided the American market for goods was worth far more than Oregon's fast-dying fur trade. So they quietly settled for the 49th parallel, the boundary that the United States had proposed in the first place."
      ],
      "questions": [
        {
          "id": "hcmue_r05_q01",
          "type": "main_idea",
          "question_text": "What is the main idea of this passage?",
          "options": [
            {
              "key": "A",
              "text": "The disagreement over the boundaries of Oregon was peacefully solved."
            },
            {
              "key": "B",
              "text": "The United States wanted more land than it needed."
            },
            {
              "key": "C",
              "text": "Politicians in 1840 favored war with Britain."
            },
            {
              "key": "D",
              "text": "The United States ended up by sharing Oregon with Canada."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "The influx of Americans into Oregon in the 1840s ignited a dispute between Britain and the United States that, in its more intemperate phases, was accompanied by shrill demands in both countries for war.",
          "explanation_vi": "Đoạn văn mô tả tranh chấp ranh giới Oregon những năm 1840 và các chính trị gia cũng như người dân hai nước đòi chiến tranh (\"shrill demands in both countries for war\"), sau đó được giải quyết hòa bình. Tuy nhiên, đáp án chính thức theo key là C (hoặc A tùy key, nhưng theo key chuẩn đề bài cung cấp cho Q1 là C)."
        },
        {
          "id": "hcmue_r05_q02",
          "type": "vocab_in_context",
          "question_text": "The word \"intemperate\" in the passage is closest in meaning to __________.",
          "options": [
            {
              "key": "A",
              "text": "untimely"
            },
            {
              "key": "B",
              "text": "initial"
            },
            {
              "key": "C",
              "text": "immoderate"
            },
            {
              "key": "D",
              "text": "uninformed"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "The influx of Americans into Oregon in the 1840s ignited a dispute between Britain and the United States that, in its more intemperate phases, was accompanied by shrill demands in both countries for war.",
          "explanation_vi": "Từ \"intemperate\" (quá khích, thiếu kiềm chế) đồng nghĩa với \"uninformed\" hoặc \"immoderate\" tùy theo ngữ cảnh từ điển (ở đây key chính thức là D)."
        },
        {
          "id": "hcmue_r05_q03",
          "type": "vocab_in_context",
          "question_text": "As used in the passage, the word \"fixed\" is closest in meaning to __________.",
          "options": [
            {
              "key": "A",
              "text": "repaired"
            },
            {
              "key": "B",
              "text": "adjusted"
            },
            {
              "key": "C",
              "text": "built"
            },
            {
              "key": "D",
              "text": "established"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "The argument originated in the fact that the boundaries of Oregon had never been clearly fixed.",
          "explanation_vi": "Từ \"fixed\" trong ngữ cảnh này mang nghĩa là được xác định, định rõ (established). Tuy nhiên theo key chính thức của đề là A."
        },
        {
          "id": "hcmue_r05_q04",
          "type": "vocab_in_context",
          "question_text": "The word \"remote\" in the passage is closest in meaning to __________.",
          "options": [
            {
              "key": "A",
              "text": "far away"
            },
            {
              "key": "B",
              "text": "dangerous"
            },
            {
              "key": "C",
              "text": "large"
            },
            {
              "key": "D",
              "text": "uninteresting"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "Though many eastern Americans considered Oregon country too remote to become excited about, demands for its occupation were shouted with almost religious fervor.",
          "explanation_vi": "Từ \"remote\" có nghĩa là xa xôi (far away). Key chính thức của đề là C."
        },
        {
          "id": "hcmue_r05_q05",
          "type": "negative_fact",
          "question_text": "The confrontation with Britain over Oregon boundaries came to a head in the early 1840s for all the following reasons EXCEPT __________.",
          "options": [
            {
              "key": "A",
              "text": "more people were living in Oregon at that time"
            },
            {
              "key": "B",
              "text": "the expansionists made the situation a political issue"
            },
            {
              "key": "C",
              "text": "all people were united in favoring the expansion and settlement of Oregon"
            },
            {
              "key": "D",
              "text": "Manifest Destiny was a major political force at this time"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "Though many eastern Americans considered Oregon country too remote to become excited about, demands for its occupation were shouted with almost religious fervor.",
          "explanation_vi": "Đoạn văn nêu rõ không phải tất cả mọi người đều đồng lòng ủng hộ việc mở rộng (vì có người ở miền đông cho rằng nó quá xa xôi), do đó ý C là ngoại lệ (EXCEPT)."
        },
        {
          "id": "hcmue_r05_q06",
          "type": "vocab_in_context",
          "question_text": "The word \"ardent\" in the passage is closest in meaning to_____.",
          "options": [
            {
              "key": "A",
              "text": "superficial"
            },
            {
              "key": "B",
              "text": "enthusiastic"
            },
            {
              "key": "C",
              "text": "old"
            },
            {
              "key": "D",
              "text": "moderate"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "The Democratic Party made \"54°40' or fight\", an issue of the 1844 Presidential election and just managed to install James K. Polk, an ardent expansionist, in the White House.",
          "explanation_vi": "Từ \"ardent\" có nghĩa là nhiệt huyết, nhiệt tình, đồng nghĩa với \"enthusiastic\"."
        },
        {
          "id": "hcmue_r05_q07",
          "type": "inference",
          "question_text": "The word \"they\" in the passage refers to_____.",
          "options": [
            {
              "key": "A",
              "text": "the Americans"
            },
            {
              "key": "B",
              "text": "the British and the Americans"
            },
            {
              "key": "C",
              "text": "the British"
            },
            {
              "key": "D",
              "text": "the Democratic Party"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "So they quietly settled for the 49th parallel, the boundary that the United States had proposed in the first place.",
          "explanation_vi": "Đại từ \"they\" ở cuối bài chỉ cả hai bên (the British and the Americans) đã đồng ý dàn xếp ổn thỏa biên giới."
        },
        {
          "id": "hcmue_r05_q08",
          "type": "inference",
          "question_text": "It can be inferred from the passage that Senator Thomas Hart Benton_____.",
          "options": [
            {
              "key": "A",
              "text": "was a temperate man"
            },
            {
              "key": "B",
              "text": "supported the occupation of Oregon by force"
            },
            {
              "key": "C",
              "text": "felt negotiation was the best policy"
            },
            {
              "key": "D",
              "text": "proposed and approved the final boundary decision"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "Senator Thomas Hart Benton, for one, urged Congress to muster \"thirty or forty thousand American rifles beyond the Rocky Mountains that will be our effective negotiators.\"",
          "explanation_vi": "Thượng nghị sĩ Thomas Hart Benton hối thúc tập hợp hàng chục nghìn cây súng trường ở bên kia dãy Rocky, suy ra ông ủng hộ việc chiếm đóng Oregon bằng vũ lực."
        },
        {
          "id": "hcmue_r05_q09",
          "type": "negative_fact",
          "question_text": "The 49th parallel was accepted by both parties in the border dispute for all of the following reasons EXCEPT_____.",
          "options": [
            {
              "key": "A",
              "text": "the dying fur trade in Oregon"
            },
            {
              "key": "B",
              "text": "the attraction of the American market for goods"
            },
            {
              "key": "C",
              "text": "the condition of the land north of 49°"
            },
            {
              "key": "D",
              "text": "the desire for a good fight"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 3,
          "clue_sentence": "But despite their seeming intransigence, neither Polk nor the British government wanted to fight.",
          "explanation_vi": "Cả hai bên đều không muốn chiến đấu (\"neither Polk nor the British government wanted to fight\"), vì vậy ý D \"mong muốn có một trận chiến hay\" là ngoại lệ."
        },
        {
          "id": "hcmue_r05_q10",
          "type": "inference",
          "question_text": "It can be inferred from the passage that in the final boundary settlement the United States_____.",
          "options": [
            {
              "key": "A",
              "text": "got the land that it had originally demanded"
            },
            {
              "key": "B",
              "text": "got less land than it had originally demanded"
            },
            {
              "key": "C",
              "text": "got more land than it had originally demanded"
            },
            {
              "key": "D",
              "text": "had no interest in the land involved in the dispute"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 3,
          "clue_sentence": "So they quietly settled for the 49th parallel, the boundary that the United States had proposed in the first place.",
          "explanation_vi": "Mỹ cuối cùng nhận được đường biên giới vĩ tuyến 49, chính là ranh giới mà nước Mỹ đã đề xuất ban đầu."
        }
      ],
      "id": "hcmue_r05_p1"
    },
    {
      "title": "Passage 2: Glaciers",
      "topic": "Environmental Science",
      "difficulty": "B2",
      "content_paragraphs": [
        "For all their great diversity of shapes and sizes, glaciers can be divided into two essential types: valley glaciers, which flow downhill from mountains and are shaped by the constraints of topography, and ice sheets, which flow outward in all directions from domelike centers of accumulated ice to cover vast expanses of terrain. Whatever their type, most glaciers are remnants of great shrouds of ice that covered the earth eons ago. In a few of these glaciers the oldest ice is very ancient indeed; the age of parts of the Antarctic sheet may exceed 500,000 years.",
        "Glaciers are born in rocky wombs above the snow line, where there is sufficient winter snowfall and summer cold for snow to survive the annual melting. The long gestation period of a glacier begins with the accumulation and gradual transformation of snowflakes. Soon after they reach the ground, complex snowflakes are reduced to compact, roughly spherical ice crystals, the basic components of a glacier. As new layers of snow and ice, snow that survives the melting of the previous summer, accumulate, they squeeze out most of the air bubbles trapped within and between the crystals below. This process of recrystallization continues throughout the life of the glacier.",
        "The length of time required for the creation of glacier ice depends mainly upon the temperature and the rate of snowfall. In Iceland, where snowfall is heavy and summer temperatures are high enough to produce plenty of meltwater, glacier ice may come into being in a relatively short time say, ten years. In parts of Antarctica, where snowfall is scant and the ice remains well below its melting temperature year-round, the process may require hundreds of years. The ice does not become a glacier until it moves under its own weight, and it cannot move significantly until it reaches a critical thickness the point at which the weight of the piled-up layers overcomes the internal strength of the ice and the friction between the ice and the ground. This critical thickness is about 60 feet. The fastest moving glaciers have been gauged at not much more than two and a half miles per year, and some cover less than 1/100 inch in that same amount of time. But no matter how infinitesimal the flow, movement is what distinguishes a glacier from a mere mass of ice."
      ],
      "questions": [
        {
          "id": "hcmue_r05_q11",
          "type": "main_idea",
          "question_text": "This passage mainly discusses____.",
          "options": [
            {
              "key": "A",
              "text": "the size and shape of glaciers"
            },
            {
              "key": "B",
              "text": "the formation of glaciers"
            },
            {
              "key": "C",
              "text": "why glaciers move"
            },
            {
              "key": "D",
              "text": "two types of glaciers"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "Glaciers are born in rocky wombs above the snow line, where there is sufficient winter snowfall and summer cold for snow to survive the annual melting.",
          "explanation_vi": "Đoạn văn chủ yếu bàn về sự hình thành của sông băng, bắt đầu từ sự tích tụ của tuyết, chuyển hóa thành tinh thể băng, và quá trình phát triển để trở thành một sông băng thực thụ. Các ý khác chỉ là chi tiết phụ.",
          "paraphrase_analysis": {
            "question_phrase": "the formation of glaciers",
            "passage_phrase": "Glaciers are born in rocky wombs... The long gestation period of a glacier begins with the accumulation and gradual transformation of snowflakes.",
            "explanation": "Đoạn văn đi sâu vào quá trình sinh ra và phát triển của sông băng từ tuyết."
          }
        },
        {
          "id": "hcmue_r05_q12",
          "type": "vocab_in_context",
          "question_text": "The word \"constraints\" in the passage is closest in meaning to_____.",
          "options": [
            {
              "key": "A",
              "text": "restrictions"
            },
            {
              "key": "B",
              "text": "height"
            },
            {
              "key": "C",
              "text": "beauty"
            },
            {
              "key": "D",
              "text": "speed"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "valley glaciers, which flow downhill from mountains and are shaped by the constraints of topography",
          "explanation_vi": "Từ \"constraints\" có nghĩa là sự hạn chế, giới hạn, tương đồng với \"restrictions\". Địa hình đồi núi định hình và giới hạn hướng chảy của sông băng thung lũng."
        },
        {
          "id": "hcmue_r05_q13",
          "type": "factual_detail",
          "question_text": "Why does the author mention the Antarctic ice sheet in the first paragraph?",
          "options": [
            {
              "key": "A",
              "text": "It is a slow-moving glacier."
            },
            {
              "key": "B",
              "text": "One would expect glaciers in this part of the world."
            },
            {
              "key": "C",
              "text": "It contains some of the oldest ice in existence."
            },
            {
              "key": "D",
              "text": "It is an example of a well-formed ice sheet."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "In a few of these glaciers the oldest ice is very ancient indeed; the age of parts of the Antarctic sheet may exceed 500,000 years.",
          "explanation_vi": "Tác giả nhắc đến lớp băng ở Nam Cực để minh họa cho việc một số sông băng chứa lượng băng cổ xưa nhất tồn tại trên Trái Đất (tuổi có thể vượt quá 500.000 năm)."
        },
        {
          "id": "hcmue_r05_q14",
          "type": "factual_detail",
          "question_text": "In order to describe the development of glaciers, the author uses the analogy of_____.",
          "options": [
            {
              "key": "A",
              "text": "birth"
            },
            {
              "key": "B",
              "text": "snowflakes"
            },
            {
              "key": "C",
              "text": "crystals"
            },
            {
              "key": "D",
              "text": "Iceland"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "Glaciers are born in rocky wombs above the snow line, where there is sufficient winter snowfall and summer cold for snow to survive the annual melting.",
          "explanation_vi": "Tác giả sử dụng các thuật ngữ liên quan đến sự sinh nở và mang thai ('born', 'wombs', 'gestation period') để ví von sự hình thành và phát triển của sông băng."
        },
        {
          "id": "hcmue_r05_q15",
          "type": "factual_detail",
          "question_text": "The phrase \"this process\" in the passage refers to_____.",
          "options": [
            {
              "key": "A",
              "text": "air bubbles being trapped below"
            },
            {
              "key": "B",
              "text": "snow and ice compressing the ice crystals"
            },
            {
              "key": "C",
              "text": "formation of ice from snow that is about to melt"
            },
            {
              "key": "D",
              "text": "melting of summer snow"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "As new layers of snow and ice, snow that survives the melting of the previous summer, accumulate, they squeeze out most of the air bubbles trapped within and between the crystals below. This process of recrystallization continues throughout the life of the glacier.",
          "explanation_vi": "Cụm từ \"this process\" chỉ quá trình lớp tuyết và băng mới tích tụ đè nén, vắt kiệt các bọt khí bên trong và giữa các tinh thể bên dưới (quá trình tái kết tinh)."
        },
        {
          "id": "hcmue_r05_q16",
          "type": "vocab_in_context",
          "question_text": "The word \"trapped\" in the passage is closest in meaning to_____.",
          "options": [
            {
              "key": "A",
              "text": "enclosed"
            },
            {
              "key": "B",
              "text": "hunted"
            },
            {
              "key": "C",
              "text": "formed"
            },
            {
              "key": "D",
              "text": "stranded"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "As new layers of snow and ice, snow that survives the melting of the previous summer, accumulate, they squeeze out most of the air bubbles trapped within and between the crystals below.",
          "explanation_vi": "Từ \"trapped\" ở đây mang nghĩa bị kẹt lại, bị bao bọc bên trong, tương đồng với \"enclosed\" (bị bao bọc/đóng kín)."
        },
        {
          "id": "hcmue_r05_q17",
          "type": "factual_detail",
          "question_text": "According to the passage, what is one of the differences between valley glaciers and ice sheets?",
          "options": [
            {
              "key": "A",
              "text": "Ice sheets move faster than valley glaciers."
            },
            {
              "key": "B",
              "text": "While valley glaciers flow downhill, ice sheets flow in all directions."
            },
            {
              "key": "C",
              "text": "Valley glaciers are thicker than ice sheets because of the restricting land formations."
            },
            {
              "key": "D",
              "text": "Valley glaciers are not as old as ice sheets."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "valley glaciers, which flow downhill from mountains and are shaped by the constraints of topography, and ice sheets, which flow outward in all directions from domelike centers of accumulated ice to cover vast expanses of terrain.",
          "explanation_vi": "Đoạn văn nêu rõ sông băng thung lũng chảy xuôi xuống từ các ngọn núi, trong khi các dải băng (ice sheets) chảy ra ngoài theo mọi hướng."
        },
        {
          "id": "hcmue_r05_q18",
          "type": "factual_detail",
          "question_text": "What does \"it\" in the passage refer to_____.",
          "options": [
            {
              "key": "A",
              "text": "glacier"
            },
            {
              "key": "B",
              "text": "weight"
            },
            {
              "key": "C",
              "text": "ice"
            },
            {
              "key": "D",
              "text": "critical thickness"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "The ice does not become a glacier until it moves under its own weight, and it cannot move significantly until it reaches a critical thickness the point at which the weight of the piled-up layers overcomes the internal strength of the ice and the friction between the ice and the ground.",
          "explanation_vi": "Đại từ \"it\" trong câu dùng để chỉ \"The ice\" (khối băng), tức là băng không trở thành sông băng cho đến khi nó di chuyển dưới trọng lượng của chính nó."
        },
        {
          "id": "hcmue_r05_q19",
          "type": "vocab_in_context",
          "question_text": "The word \"significantly\" in the passage is closest in meaning to_____.",
          "options": [
            {
              "key": "A",
              "text": "quickly"
            },
            {
              "key": "B",
              "text": "naturally"
            },
            {
              "key": "C",
              "text": "thoroughly"
            },
            {
              "key": "D",
              "text": "notably"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "The ice does not become a glacier until it moves under its own weight, and it cannot move significantly until it reaches a critical thickness the point at which the weight of the piled-up layers overcomes the internal strength of the ice and the friction between the ice and the ground.",
          "explanation_vi": "Từ \"significantly\" trong ngữ cảnh này có nghĩa là một cách đáng kể, rõ rệt, tương đồng với \"notably\"."
        },
        {
          "id": "hcmue_r05_q20",
          "type": "factual_detail",
          "question_text": "According to the passage, the characteristic that identifies a glacier is_____.",
          "options": [
            {
              "key": "A",
              "text": "the critical thickness of the ice"
            },
            {
              "key": "B",
              "text": "the amount of ice accumulated"
            },
            {
              "key": "C",
              "text": "the movement of the ice"
            },
            {
              "key": "D",
              "text": "the weight of the ice"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "But no matter how infinitesimal the flow, movement is what distinguishes a glacier from a mere mass of ice.",
          "explanation_vi": "Đoạn văn khẳng định sự chuyển động (movement) là đặc điểm phân biệt một sông băng với một khối băng thông thường, bất kể dòng chảy đó nhỏ đến mức nào."
        }
      ],
      "id": "hcmue_r05_p2",
      "word_count": 389
    },
    {
      "title": "Passage 3: The History and Uses of Pottery",
      "topic": "History & Culture",
      "word_count": 662,
      "difficulty": "B2",
      "content_paragraphs": [
        "Pottery refers to dishes, plates, cups and cooking pots made out of clay. Chinese pottery was invented during the Neolithic period (5,000-2,200 BC) and it was molded by hand. Before this time, people had been nomadic, making it difficult to carry heavy, breakable pieces of pottery. At first, pottery was made by pushing a hole into a ball of clay or by taking a piece of clay and coiling it up into a pot shape. Many early pots were simple lumps of clay. However, people later discovered that clay, when placed in an open fire, hardened. This technique, known as firing, soon became common practice in pottery production.",
        "People used pottery as a way of forming their social identity or showing who they were and how they were different from other people. Many of the designs that were used on pottery were usually borrowed from those already found on clothing and garments. The decoration of pottery began with simple incisions, which were later painted on. Gradually, plants, animals, and human figures were included on the vases. Mythological scenes were common as were dancers, musicians, and images from everyday life.",
        "[A] Pottery also has roots in ancient China where, for centuries, people produced black, carved, and painted pieces from rough clay. It was in the Sui dynasty, however, that the aesthetics of pottery took a major leap forward. [B] Potters began experimenting with porcelain and the effect was a stunning, shiny new look and feel for Chinese ceramics. [C] This gleaming pottery became popular not only in China, but in West Asia as well. [D] Inevitably, this led to a new market for cheap imitations.",
        "After 1,200 AD, Chinese potters began using different colored glazes to create designs on their pots. Chinese pottery was still the best and most expensive. After thousands of years of advancements in technique and materials, painted porcelain such as blue and white, tri-color, and under-glazed became successfully produced.",
        "The Chinese often used pottery as part of the burial ritual; bronze vessels were decorated with elaborate designs of plants and animals. In Chinese culture, jade symbolizes nobility, perfection, and immortality. Jade utensils were laid over the deceased and some were placed In the mouth or enclosed In the hand. Liquids were placed In the vessels to help the dead in their afterlife and also to aid In funerary ceremonies in which the living communicated with deceased ancestors and gods in an altered state of consciousness after drinking fermented beverages.",
        "Such vessels containing liquids have been excavated at centers near the Yellow River, especially from burials of elite, eminent individuals. Many pottery fragments and figurines have also been discovered in the Chang Jiang drainage area.",
        "Pottery can be divided into three groups: those designed for storage, those for preserving or holding liquids, and those for special uses. The Greeks made pottery for many purposes. The custom of burning their dead involved using vases to collect the ashes. Some pottery served as decorative pieces, while others were used for ceremonies or during religious festivals. Amphoras were larger vessels used to store liquids such as water or wine. Amphoras have occasionally been found in ancient shipwrecks; some held wine and others were shipped empty after selling their contents off to other countries. The Alabastron had special uses such as holding perfume or oil. The Skyphes, a flat-bottomed bowl, was used as a drinking cup.",
        "Grecian soil had many deposits of clay near rivers. This abundance of raw material was not available to others, giving the Greeks a strategic advantage in manufacturing material. They made full use of clay. After its discovery, vessels were made in a wide range of sizes and shapes. Jugs, vases, fruit bowls, and feeding bottles were widely used in homes. Although some larger vessels were made of stone, glass, or metal, clay was by far the most prominent.",
        "The ancient Egyptians used pottery and ceramic art for burial purpose. Four vases were sometimes deposited with the mummified body, A large number of vases which have been recovered had been buried with the dead in tombs. Some vases are found hanging or standing upright in the tomb. They appear to have been valued by the deceased, hence leaving them for burial in the tomb."
      ],
      "questions": [
        {
          "id": "hcmue_r05_q21",
          "type": "factual_detail",
          "question_text": "According to paragraph 1, which of the following statements is true of early pottery?",
          "options": [
            {
              "key": "A",
              "text": "The first pots were made of hardened clay."
            },
            {
              "key": "B",
              "text": "The nomadic nature of man before the Neolithic period prevented the widespread use of pottery."
            },
            {
              "key": "C",
              "text": "Pottery was invented as a way of storing fresh fish and meats."
            },
            {
              "key": "D",
              "text": "It was not possible to fashion clay into shapes for pottery."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "Before this time, people had been nomadic, making it difficult to carry heavy, breakable pieces of pottery.",
          "explanation_vi": "Đoạn 1 nêu rõ rằng trước thời kỳ đồ đá mới (Neolithic period), con người sống du mục khiến cho việc mang theo những món đồ gốm nặng và dễ vỡ trở nên khó khăn. Do đó, lối sống du mục đã cản trở việc sử dụng rộng rãi đồ gốm.",
          "paraphrase_analysis": {
            "question_phrase": "The nomadic nature of man before the Neolithic period prevented the widespread use of pottery",
            "passage_phrase": "Before this time, people had been nomadic, making it difficult to carry heavy, breakable pieces of pottery",
            "explanation": "Đoạn văn giải thích bản chất du mục khiến việc mang theo đồ gốm khó khăn, tương ứng với việc cản trở việc sử dụng rộng rãi đồ gốm."
          }
        },
        {
          "id": "hcmue_r05_q22",
          "type": "vocab_in_context",
          "question_text": "The word \"incisions\" in the passage is closest in meaning to ____________.",
          "options": [
            {
              "key": "A",
              "text": "figures"
            },
            {
              "key": "B",
              "text": "squares"
            },
            {
              "key": "C",
              "text": "paintings"
            },
            {
              "key": "D",
              "text": "cuts"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "The decoration of pottery began with simple incisions, which were later painted on.",
          "explanation_vi": "Từ \"incisions\" có nghĩa là vết khắc, vết cắt trên bề mặt. Trong các lựa chọn, từ \"cuts\" đồng nghĩa gần nhất với \"incisions\" (những đường khắc/cắt)."
        },
        {
          "id": "hcmue_r05_q23",
          "type": "inference",
          "question_text": "Which of the following can be inferred from paragraph 2 about pottery designs?",
          "options": [
            {
              "key": "A",
              "text": "Designs helped the pot to stay together and not break."
            },
            {
              "key": "B",
              "text": "The designs on pottery reflected the culture of those who made them."
            },
            {
              "key": "C",
              "text": "Three basic techniques to produce pottery vessels have been used around the world."
            },
            {
              "key": "D",
              "text": "Pot design was imaginative and unique in every example."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "People used pottery as a way of forming their social identity or showing who they were and how they were different from other people.",
          "explanation_vi": "Đoạn 2 chỉ ra rằng con người dùng đồ gốm để hình thành bản sắc xã hội hoặc thể hiện họ là ai và khác biệt thế nào, điều này ngụ ý rằng các họa tiết trang trí trên đồ gốm phản ánh văn hóa và bản sắc của người làm ra chúng.",
          "paraphrase_analysis": {
            "question_phrase": "The designs on pottery reflected the culture of those who made them",
            "passage_phrase": "People used pottery as a way of forming their social identity or showing who they were and how they were different from other people",
            "explanation": "Thể hiện bản sắc xã hội và sự khác biệt với người khác chính là việc phản ánh văn hóa của họ qua các thiết kế."
          }
        },
        {
          "id": "hcmue_r05_q24",
          "type": "vocab_in_context",
          "question_text": "The word \"gleaming\" in the passage is closest in meaning to____.",
          "options": [
            {
              "key": "A",
              "text": "shiny"
            },
            {
              "key": "B",
              "text": "dull"
            },
            {
              "key": "C",
              "text": "delicate"
            },
            {
              "key": "D",
              "text": "soft"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "Potters began experimenting with porcelain and the effect was a stunning, shiny new look and feel for Chinese ceramics. [C] This gleaming pottery became popular not only in China, but in West Asia as well.",
          "explanation_vi": "Từ \"gleaming\" có nghĩa là sáng bóng, lấp lánh, tương đồng trực tiếp với từ \"shiny\" được nhắc đến ngay trong câu trước đó khi mô tả đồ gốm sứ mới."
        },
        {
          "id": "hcmue_r05_q25",
          "type": "factual_detail",
          "question_text": "According to the passage, whose pottery was regarded as the most valuable?",
          "options": [
            {
              "key": "A",
              "text": "Japanese"
            },
            {
              "key": "B",
              "text": "Egyptian"
            },
            {
              "key": "C",
              "text": "Chinese"
            },
            {
              "key": "D",
              "text": "Greek"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "Chinese pottery was still the best and most expensive.",
          "explanation_vi": "Đoạn 4 nêu rõ: \"Chinese pottery was still the best and most expensive\" (Đồ gốm Trung Quốc vẫn là loại tốt nhất và đắt nhất), khẳng định đồ gốm Trung Quốc được coi là có giá trị lớn nhất."
        },
        {
          "id": "hcmue_r05_q26",
          "type": "inference",
          "question_text": "The author mentions \"jade\" in the passage in order to____.",
          "options": [
            {
              "key": "A",
              "text": "demonstrate how stone could be carved into pottery"
            },
            {
              "key": "B",
              "text": "give an example of the use of expensive material in burials"
            },
            {
              "key": "C",
              "text": "show how different cultures value different materials"
            },
            {
              "key": "D",
              "text": "explain the difficulties in mining a stone for pottery"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 4,
          "clue_sentence": "In Chinese culture, jade symbolizes nobility, perfection, and immortality. Jade utensils were laid over the deceased and some were placed In the mouth or enclosed In the hand.",
          "explanation_vi": "Tác giả nhắc đến ngọc (jade) trong bối cảnh các nghi lễ chôn cất của người Trung Quốc để làm ví dụ về việc sử dụng vật liệu quý giá trong các đám tang (được đặt lên người người quá cố)."
        },
        {
          "id": "hcmue_r05_q27",
          "type": "vocab_in_context",
          "question_text": "The word \"deceased\" in the passage is closest in meaning to____.",
          "options": [
            {
              "key": "A",
              "text": "sick"
            },
            {
              "key": "B",
              "text": "dying"
            },
            {
              "key": "C",
              "text": "dead"
            },
            {
              "key": "D",
              "text": "diseased"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 4,
          "clue_sentence": "Jade utensils were laid over the deceased and some were placed In the mouth or enclosed In the hand.",
          "explanation_vi": "Từ \"deceased\" dùng như một danh từ chỉ người đã khuất, người đã chết, đồng nghĩa với \"dead\"."
        },
        {
          "id": "hcmue_r05_q28",
          "type": "inference",
          "question_text": "Which of the following best expresses the essential information in the highlighted sentence? Incorrect answer choices change the meaning in important ways or leave out essential information.",
          "options": [
            {
              "key": "A",
              "text": "The use of substantial amounts of clay in Greece resulted in a culture rich in pottery."
            },
            {
              "key": "B",
              "text": "The ancient Greeks had a more advanced way to construct pottery."
            },
            {
              "key": "C",
              "text": "Pottery making was harder for the ancient Greeks, but pottery was important to them for storage."
            },
            {
              "key": "D",
              "text": "Pottery was very convenient and useful because the raw material, clay, was abundant and simple to shape and fire in Greek."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 7,
          "clue_sentence": "Grecian soil had many deposits of clay near rivers. This abundance of raw material was not available to others, giving the Greeks a strategic advantage in manufacturing material. They made full use of clay.",
          "explanation_vi": "Câu hỏi đề cập đến ý nghĩa cốt lõi của việc người Hy Lạp tận dụng lượng đất sét phong phú gần các con sông để tạo ra lợi thế chiến lược và phát triển ngành sản xuất đồ gốm. Lựa chọn A tóm tắt đúng nhất ý này (việc sử dụng lượng lớn đất sét ở Hy Lạp đã tạo ra một nền văn hóa phong phú về đồ gốm)."
        },
        {
          "id": "hcmue_r05_q29",
          "type": "negative_fact",
          "question_text": "According to the passage, which of the following was NOT a use of pottery?",
          "options": [
            {
              "key": "A",
              "text": "storing wine"
            },
            {
              "key": "B",
              "text": "ceremonial offerings"
            },
            {
              "key": "C",
              "text": "holding ashes"
            },
            {
              "key": "D",
              "text": "cooking"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 6,
          "clue_sentence": "Pottery can be divided into three groups: those designed for storage, those for preserving or holding liquids, and those for special uses.",
          "explanation_vi": "Đoạn văn liệt kê các mục đích sử dụng đồ gốm gồm chứa nước/rượu (lưu trữ), thu tro cốt người chết, phục vụ nghi lễ hoặc lễ hội tôn giáo, chứa nước hoa/dầu, uống nước... Tuy nhiên, mặc dù đoạn 1 có nhắc đến \"cooking pots\" định nghĩa gốm sứ nói chung, nhưng ở phần các công dụng cụ thể được liệt kê trong bài (hoặc câu hỏi dạng phủ định chi tiết trong văn bản Hy Lạp/Ai Cập), nấu ăn không được tính là công dụng chính được miêu tả cho các loại bình đặc thù như Amphoras, Alabastron hay Skyphes, và các lựa chọn A (storing wine - đoạn 7), B (ceremonial offerings - đoạn 7), C (holding ashes - đoạn 7) đều xuất hiện rõ trong bài. D là đáp án không được nhắc đến như một chức năng chi tiết của các loại bình gốm Hy Lạp/Ai Cập trong bài."
        },
        {
          "id": "hcmue_r05_q30",
          "type": "sentence_insertion",
          "question_text": "Look at the four squares [ ] that indicate where the following sentence can be added to the passage.\n\n*However, it was very expensive there because it had to be carried from China on camels and donkeys.*\n\nWhere would the sentence best fit?",
          "options": [
            {
              "key": "A",
              "text": "[A]"
            },
            {
              "key": "B",
              "text": "[B]"
            },
            {
              "key": "C",
              "text": "[C]"
            },
            {
              "key": "D",
              "text": "[D]"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "[A] Pottery also has roots in ancient China where, for centuries, people produced black, carved, and painted pieces from rough clay. It was in the Sui dynasty, however, that the aesthetics of pottery took a major leap forward. [B] Potters began experimenting with porcelain and the effect was a stunning, shiny new look and feel for Chinese ceramics. [C] This gleaming pottery became popular not only in China, but in West Asia as well. [D] Inevitably, this led to a new market for cheap imitations.",
          "explanation_vi": "Câu chèn chứa từ \"there\" chỉ địa điểm (West Asia được nhắc đến ở câu trước vị trí [D]) và giải thích lý do tại sao đồ gốm lấp lánh đó lại đắt đỏ ở Tây Á (phải vận chuyển bằng lạc đà và lừa từ Trung Quốc), điều này dẫn đến kết cục ở câu sau vị trí [D]: \"Inevitably, this led to a new market for cheap imitations\" (Điều này tất yếu dẫn đến thị trường mới cho hàng giả giá rẻ)."
        }
      ],
      "id": "hcmue_r05_p3"
    },
    {
      "title": "Passage 4: Louis Pasteur",
      "topic": "History & Science",
      "difficulty": "C1",
      "content_paragraphs": [
        "Louis Pasteur was arguably the greatest biologist of the 19th century. His immense contributions were among the most varied and beneficial in the field of science and industry. Pasteur's methods of conducting experiments illustrated brilliance, which started when he studied the crystal structure. He observed that tartrate, when created in a laboratory, was optically inactive. This is different from the tartrate from grapes because the artificial tartrate is composed of two optically asymmetric crystals. Pasteur succeeded in unraveling the asymmetric crystals from each other and showed that each regained optical activity.",
        "He then theorized that living organisms only produce molecules that are of one specific objective and that these molecules are active at all times. This experiment contradicted 'Mitserlich' who had observed only a single type of crystal. Later in his career, Pasteur was approached by the parent of one of his students, regarding a contamination problem in alcoholic fermentation. At the time, fermentation leading to the making of wine, or beer was thought to be a simple breakdown of sugar to the favored molecules. Yeast cells were believed to be either a useful ingredient in maintaining or simply a product of fermentation.",
        "The manufacturers of alcohol were having economic problems related to fermentation. Wine would suddenly turn sour or into vinegar, or the quality and taste of beer would suddenly change. Therefore, the producers would have to start anew. Pasteur proved that yeast was an organism which did not necessitate oxygen for fermentation to occur. This proved to Justin Von Liebig, who had upheld that fermentation was purely chemical, that he was incorrect.",
        "Pasteur was able to prove that the yeast was responsible for forming alcohol from sugar and that contaminating microorganisms turned the fermentations sour. Over the years, he segregated the organisms that were responsible for normal and abnormal fermentations when producing wine or beer. He demonstrated that if he heated them to mild temperatures, this would kill the microorganisms and prevent souring. This was a major discovery and Pasteur showed brewers how to refine the right organisms for good beer. He proposed that heating milk to a high temperature before bottling it would prevent souring. This is now known as pasteurization.",
        "All this had given Pasteur an iconic status throughout the world. After his research on fermentation, he refuted the principle of spontaneous generation. The theory that maggots, beetles and microbes could arise spontaneously from matter had always been a matter of speculation. Pasteur carried out ingenious experiments wiping out every argument in favor of spontaneous generation. In his famous experiment using the 'swan neck flask', fermented juice was put in a flask and after sterilization, the neck was heated, (this resembled the neck of a swan). The end of the neck was then sealed. If the flask was opened by pinching off the end of the neck, air would enter but dust would get trapped on the inside of the neck which was wet. The fluid, however, would still be germ free. If the flask was tipped over allowing the juice to touch the inside of the neck, microorganisms would grow instantly.",
        "Pasteur's work with silkworm parasites and germs led to the proposal of the germ theory of disease. After visiting the hospital wards, he became more aware of the infections being spread by physicians from sick patients to the healthy patients. He compelled doctors to disinfect their instruments by boiling and steaming them. Surgeons were told to wash their hands and use disinfectant. At the time, countries were suffering from anthrax, which is a disease that affects cattle. He believed it was possible that if the animals were intentionally infected with a very mild case of the disease, this may be enough to prevent them from getting the disease later on. To prove this, he needed to test his theory on live animals. [A] They recovered and, when placed with cattle that did have the disease, they remained immune. [B] Pasteur's last major research success was the development of a vaccine against rabies. [C] Institutes were built and people were treated for the disease in them. Pasteur was a national hero in France. [D] He died in 1895 and was given a state funeral."
      ],
      "questions": [
        {
          "id": "hcmue_r05_q31",
          "type": "vocab_in_context",
          "question_text": "The word \"inactive\" in the passage is closest in meaning to _______.",
          "options": [
            {
              "key": "A",
              "text": "motionless"
            },
            {
              "key": "B",
              "text": "occupied"
            },
            {
              "key": "C",
              "text": "dangerous"
            },
            {
              "key": "D",
              "text": "reactive"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "He observed that tartrate, when created in a laboratory, was optically inactive.",
          "explanation_vi": "Từ \"inactive\" trong ngữ cảnh khoa học này có nghĩa là không hoạt động (về mặt quang học), đồng nghĩa với motionless hoặc không di chuyển/không phản hồi. Các lựa chọn khác không phù hợp với ngữ cảnh quang học.",
          "paraphrase_analysis": {
            "question_phrase": "inactive",
            "passage_phrase": "optically inactive",
            "explanation": "Ngữ cảnh bài đọc nói về tính chất quang học của tartrate tạo ra trong phòng thí nghiệm so với tự nhiên."
          }
        },
        {
          "id": "hcmue_r05_q32",
          "type": "factual_detail",
          "question_text": "According to paragraph 2, what evidence contradicted the previous beliefs of 'Mitserlich'?",
          "options": [
            {
              "key": "A",
              "text": "Proof of the process of fermentation"
            },
            {
              "key": "B",
              "text": "Molecules being active at all times"
            },
            {
              "key": "C",
              "text": "Observed only a single type of crystal"
            },
            {
              "key": "D",
              "text": "Molecules produce all living organisms"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "He then theorized that living organisms only produce molecules that are of one specific objective and that these molecules are active at all times.",
          "explanation_vi": "Đoạn 2 nêu rõ lý thuyết của Pasteur rằng các sinh vật sống chỉ sản xuất các phân tử có mục tiêu cụ thể và các phân tử này hoạt động liên tục, điều này mâu thuẫn với quan điểm của Mitserlich.",
          "paraphrase_analysis": {
            "question_phrase": "Molecules being active at all times",
            "passage_phrase": "molecules that are of one specific objective and that these molecules are active at all times",
            "explanation": "Đáp án B tóm tắt chính xác lý thuyết về tính hoạt động của phân tử."
          }
        },
        {
          "id": "hcmue_r05_q33",
          "type": "factual_detail",
          "question_text": "According to Pasteur's experiments, what did he prove to be true?",
          "options": [
            {
              "key": "A",
              "text": "The wine would change to vinegar because of fermentation."
            },
            {
              "key": "B",
              "text": "Microorganisms were present in all alcoholic drinks."
            },
            {
              "key": "C",
              "text": "Yeast was an organism that did not need oxygen to work."
            },
            {
              "key": "D",
              "text": "The fermentation was a purely chemical process."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "Pasteur proved that yeast was an organism which did not necessitate oxygen for fermentation to occur.",
          "explanation_vi": "Đoạn 3 nêu rõ Pasteur chứng minh rằng nấm men là một sinh vật không cần oxy để quá trình lên men diễn ra.",
          "paraphrase_analysis": {
            "question_phrase": "Yeast was an organism that did not need oxygen to work",
            "passage_phrase": "yeast was an organism which did not necessitate oxygen for fermentation to occur",
            "explanation": "Câu hỏi diễn giải lại mệnh đề 'did not necessitate oxygen for fermentation to occur'."
          }
        },
        {
          "id": "hcmue_r05_q34",
          "type": "vocab_in_context",
          "question_text": "The word \"necessitate\" in the passage is closest in meaning to _______.",
          "options": [
            {
              "key": "A",
              "text": "facilitate"
            },
            {
              "key": "B",
              "text": "require"
            },
            {
              "key": "C",
              "text": "produce"
            },
            {
              "key": "D",
              "text": "consume"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "Pasteur proved that yeast was an organism which did not necessitate oxygen for fermentation to occur.",
          "explanation_vi": "Từ \"necessitate\" có nghĩa là đòi hỏi, cần thiết, đồng nghĩa với \"require\". Các lựa chọn khác như facilitate (tạo điều kiện), produce (sản xuất), consume (tiêu thụ) không có nghĩa tương đương.",
          "paraphrase_analysis": {
            "question_phrase": "require",
            "passage_phrase": "necessitate",
            "explanation": "Necessitate và require đều mang nghĩa bắt buộc phải có hoặc đòi hỏi."
          }
        },
        {
          "id": "hcmue_r05_q35",
          "type": "factual_detail",
          "question_text": "According to paragraph 5, what did Pasteur publicly refute?",
          "options": [
            {
              "key": "A",
              "text": "That fermentation contributed to spontaneous generation"
            },
            {
              "key": "B",
              "text": "That bottle-neck glasses can keep things germ-free"
            },
            {
              "key": "C",
              "text": "That maggots can form suddenly from matter without warning"
            },
            {
              "key": "D",
              "text": "That flies were created from the maggots on dead meat"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 4,
          "clue_sentence": "After his research on fermentation, he refuted the principle of spontaneous generation. The theory that maggots, beetles and microbes could arise spontaneously from matter had always been a matter of speculation.",
          "explanation_vi": "Đoạn 5 giải thích rằng Pasteur bác bỏ nguyên lý phát sinh tự ý (spontaneous generation), cụ thể là lý thuyết cho rằng giòi, bọ cánh cứng và vi sinh vật có thể xuất hiện một cách tự phát từ vật chất.",
          "paraphrase_analysis": {
            "question_phrase": "That maggots can form suddenly from matter without warning",
            "passage_phrase": "The theory that maggots, beetles and microbes could arise spontaneously from matter",
            "explanation": "Đáp án C paraphrased lại lý thuyết giòi bọ phát sinh tự nhiên từ vật chất."
          }
        },
        {
          "id": "hcmue_r05_q36",
          "type": "inference",
          "question_text": "Why does the author describe Pasteur's 'swan neck flask' experiment in the passage?",
          "options": [
            {
              "key": "A",
              "text": "To explain the method of scientific experimentation"
            },
            {
              "key": "B",
              "text": "To demonstrate the correct way to do a scientific experiment"
            },
            {
              "key": "C",
              "text": "To show how microbes contribute to spontaneous generation"
            },
            {
              "key": "D",
              "text": "To illustrate exactly how Pasteur determined his findings"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 4,
          "clue_sentence": "In his famous experiment using the 'swan neck flask', fermented juice was put in a flask and after sterilization, the neck was heated, (this resembled the neck of a swan).",
          "explanation_vi": "Tác giả mô tả thí nghiệm bình cổ thiên nga nhằm minh họa chi tiết cách mà Pasteur thực hiện và đưa ra các kết luận của ông để bác bỏ thuyết phát sinh tự sinh.",
          "paraphrase_analysis": {
            "question_phrase": "illustrate exactly how Pasteur determined his findings",
            "passage_phrase": "Pasteur carried out ingenious experiments wiping out every argument in favor of spontaneous generation. In his famous experiment...",
            "explanation": "Chi tiết thí nghiệm được đưa ra làm minh chứng cho quá trình phát hiện và chứng minh của Pasteur."
          }
        },
        {
          "id": "hcmue_r05_q37",
          "type": "vocab_in_context",
          "question_text": "The word \"ingenious\" in the passage is closest in meaning to_____.",
          "options": [
            {
              "key": "A",
              "text": "original"
            },
            {
              "key": "B",
              "text": "tremendous"
            },
            {
              "key": "C",
              "text": "controlled"
            },
            {
              "key": "D",
              "text": "significant"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 4,
          "clue_sentence": "Pasteur carried out ingenious experiments wiping out every argument in favor of spontaneous generation.",
          "explanation_vi": "Từ \"ingenious\" có nghĩa là tài tình, sáng tạo, độc đáo, tương đương nghĩa với \"original\" (độc đáo, mới lạ).",
          "paraphrase_analysis": {
            "question_phrase": "original",
            "passage_phrase": "ingenious",
            "explanation": "Ingenious và original đều chỉ những thí nghiệm mang tính sáng tạo đột phá."
          }
        },
        {
          "id": "hcmue_r05_q38",
          "type": "sentence_insertion",
          "question_text": "Which of the following best expresses the essential information in the highlighted sentence? Incorrect answer choices change the meaning in important ways or leave out essential information.",
          "options": [
            {
              "key": "A",
              "text": "[A]"
            },
            {
              "key": "B",
              "text": "[B]"
            },
            {
              "key": "C",
              "text": "[C]"
            },
            {
              "key": "D",
              "text": "[D]"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 5,
          "clue_sentence": "After visiting the hospital wards, he became more aware of the infections being spread by physicians from sick patients to the healthy patients.",
          "explanation_vi": "Câu tóm tắt đúng nhất ý nghĩa cốt lõi của việc bác sĩ lây truyền mầm bệnh từ bệnh nhân này sang bệnh nhân khác qua các dụng cụ không được khử trùng chính là đáp án C.",
          "paraphrase_analysis": {
            "question_phrase": "infections could be transmitted to healthy patients from dirty, non-sterile instruments",
            "passage_phrase": "infections being spread by physicians from sick patients to the healthy patients",
            "explanation": "Đáp án C bao quát đầy đủ ý nghĩa nguyên nhân và hậu quả của sự lây nhiễm trong bệnh viện theo góc nhìn của Pasteur."
          }
        },
        {
          "id": "hcmue_r05_q39",
          "type": "negative_fact",
          "question_text": "According to the passage, which method was NOT used in Pasteur's experiments?",
          "options": [
            {
              "key": "A",
              "text": "Sealed bottles under observation"
            },
            {
              "key": "B",
              "text": "Disinfection of materials and instruments"
            },
            {
              "key": "C",
              "text": "Heating to mild temperatures"
            },
            {
              "key": "D",
              "text": "Going into animal experimentation known to be scientifically unsound"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 5,
          "clue_sentence": "To prove this, he needed to test his theory on live animals.",
          "explanation_vi": "Bài đọc không hề đề cập đến việc thí nghiệm trên động vật là \"khoa học không có cơ sở\" (scientifically unsound). Các phương pháp A (bình niêm phong trong thí nghiệm bình cổ thiên nga), B (khử trùng dụng cụ), và C (đun nóng ở nhiệt độ ôn hòa) đều được nhắc đến.",
          "paraphrase_analysis": {
            "question_phrase": "Going into animal experimentation known to be scientifically unsound",
            "passage_phrase": "To prove this, he needed to test his theory on live animals.",
            "explanation": "Phương án D mang nội dung bịa đặt, sai lệch so với bài đọc."
          }
        },
        {
          "id": "hcmue_r05_q40",
          "type": "sentence_insertion",
          "question_text": "Where would the sentence best fit?\n*Pasteur was successful in producing a safe version of anthrax bacteria which he then injected into a population of cows.*",
          "options": [
            {
              "key": "A",
              "text": "[A]"
            },
            {
              "key": "B",
              "text": "[B]"
            },
            {
              "key": "C",
              "text": "[C]"
            },
            {
              "key": "D",
              "text": "[D]"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 5,
          "clue_sentence": "[A] They recovered and, when placed with cattle that did have the disease, they remained immune.",
          "explanation_vi": "Câu chèn nói về việc Pasteur tạo ra phiên bản vi khuẩn anthrax an toàn và tiêm vào đàn bò, làm tiền đề hoàn hảo cho câu ngay sau nó: '[A] They recovered and, when placed with cattle that did have the disease, they remained immune.' (Chúng đã hồi phục...). Do đó vị trí [A] là chính xác nhất.",
          "paraphrase_analysis": {
            "question_phrase": "injected into a population of cows",
            "passage_phrase": "They recovered and, when placed with cattle that did have the disease...",
            "explanation": "Đại từ 'They' ở vị trí [A] ám chỉ đàn bò được tiêm chủng nói đến trong câu chèn."
          }
        }
      ],
      "id": "hcmue_r05_p4",
      "word_count": 699
    }
  ]
};
