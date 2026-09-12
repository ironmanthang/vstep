import type { ReadingTest } from '../../../../types/schemas';

/**
 * Authentic VSTEP Reading Test 4 (ULIS - ĐHQGHN Standard)
 * Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Pages 50–55, Key page 145
 * Format: 4 Passages, 40 Questions, 60 Minutes.
 */
export const ULIS_READING_TEST_04: ReadingTest = {
  "id": "ulis_read_test_04",
  "title": "VSTEP Reading Mock Test 4 (Chuẩn ĐHNN - ĐHQGHN)",
  "duration_minutes": 60,
  "difficulty": "B2",
  "passages": [
    {
      "title": "Passage 1: The Development of New York Apartment Buildings",
      "topic": "Architecture & Housing",
      "difficulty": "B1",
      "content_paragraphs": [
        "In the last third of the nineteenth century a new housing form was quietly being developed. In 1869 the Stuyvesant, considered New York's first apartment house was built on East Eighteenth Street. The building was financed by the developer Rutherfurd Stuyvesant and designed by Richard Morris Hunt, the first American architect to graduate from the Ecole des Beaux Arts in Paris. Each man had lived in Paris, and each understood the economics and social potential of this Parisian housing form. But the Stuyvesant was at best a limited success. In spite of Hunt's inviting façade, the living space was awkwardly arranged. Those who could afford them were quite content to remain in the more sumptuous, single-family homes, leaving the Stuyvesant to young married couples and bachelors.",
        "The fundamental problem with the Stuyvesant and the other early apartment buildings that quickly followed, in the 1870's and early 1880's was that they were confined to the typical New York building lot. That lot was a rectangular area 25 feet wide by 100 feet deep - a shape perfectly suited for a row house. The lot could also accommodate a rectangular tenement, though it could not yield the square, well-lighted, and logically arranged rooms that great apartment buildings require. But even with the awkward interior configurations of the early apartment buildings, the idea caught on. It met the needs of a large and growing population that wanted something better than tenements but could not afford or did not want row houses.",
        "So while the city's newly emerging social leadership commissioned their mansions, apartment houses and hotels began to sprout in multiple lots, thus breaking the initial space constraints. In the closing decades of the nineteenth century, large apartment houses began dotting the developed portions of New York City, and by the opening decades of the twentieth century, spacious buildings, such as the Dakota and the Ansonia finally transcended the tight confinement of row house building lots. From there it was only a small step to building luxury apartment houses on the newly created Park Avenue, right next to the fashionable Fifth Avenue shopping area."
      ],
      "word_count": 332,
      "questions": [
        {
          "id": "ulis_r04_q01",
          "type": "factual_detail",
          "question_text": "The new housing form discussed in the passage refers to",
          "options": [
            {
              "key": "A",
              "text": "single-family homes"
            },
            {
              "key": "B",
              "text": "apartment buildings"
            },
            {
              "key": "C",
              "text": "row houses"
            },
            {
              "key": "D",
              "text": "hotels"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "In 1869 the Stuyvesant, considered New York's first apartment house was built on East Eighteenth Street.",
          "explanation_vi": "Đoạn văn mở đầu bằng việc giới thiệu một hình thức nhà ở mới: 'In 1869 the Stuyvesant, considered New York's first apartment house was built...'. Do đó, hình thức nhà ở mới được nhắc đến là tòa nhà căn hộ (apartment buildings)."
        },
        {
          "id": "ulis_r04_q02",
          "type": "vocab_in_context",
          "question_text": "The word 'inviting' in line 6 is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "open"
            },
            {
              "key": "B",
              "text": "encouraging"
            },
            {
              "key": "C",
              "text": "attractive"
            },
            {
              "key": "D",
              "text": "asking"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "In spite of Hunt's inviting façade, the living space was awkwardly arranged.",
          "explanation_vi": "Từ 'inviting' trong ngữ cảnh miêu tả mặt tiền của tòa nhà (façade) mang ý nghĩa thu hút, lôi cuốn, đồng nghĩa với 'attractive'. Các lựa chọn khác không phù hợp về nghĩa.",
          "paraphrase_analysis": {
            "question_phrase": "inviting",
            "passage_phrase": "attractive",
            "explanation": "Inviting applied to architecture means visually appealing or attractive."
          }
        },
        {
          "id": "ulis_r04_q03",
          "type": "factual_detail",
          "question_text": "Why was the Stuyvesant a limited success?",
          "options": [
            {
              "key": "A",
              "text": "The arrangement of the rooms was not convenient."
            },
            {
              "key": "B",
              "text": "Most people could not afford to live there."
            },
            {
              "key": "C",
              "text": "There were no shopping areas nearby."
            },
            {
              "key": "D",
              "text": "It was in a crowded neighborhood."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "In spite of Hunt's inviting façade, the living space was awkwardly arranged.",
          "explanation_vi": "Đoạn 1 nêu rõ lý do Stuyvesant chỉ đạt thành công hạn chế là do không gian sống được bố trí bất tiện, vụng về ('the living space was awkwardly arranged'), tương ứng với đáp án A."
        },
        {
          "id": "ulis_r04_q04",
          "type": "vocab_in_context",
          "question_text": "The word 'sumptuous' in line 8 is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "luxurious"
            },
            {
              "key": "B",
              "text": "unique"
            },
            {
              "key": "C",
              "text": "modern"
            },
            {
              "key": "D",
              "text": "distant"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "Those who could afford them were quite content to remain in the more sumptuous, single-family homes, leaving the Stuyvesant to young married couples and bachelors.",
          "explanation_vi": "Từ 'sumptuous' dùng để chỉ những ngôi nhà đơn gia đình đắt tiền, sang trọng, tương đương với nghĩa của 'luxurious'.",
          "paraphrase_analysis": {
            "question_phrase": "sumptuous",
            "passage_phrase": "luxurious",
            "explanation": "Sumptuous describes things that are lavish and expensive, which is synonymous with luxurious."
          }
        },
        {
          "id": "ulis_r04_q05",
          "type": "inference",
          "question_text": "It can be inferred that the majority of people who lived in New York's first apartments were",
          "options": [
            {
              "key": "A",
              "text": "highly educated"
            },
            {
              "key": "B",
              "text": "unemployed"
            },
            {
              "key": "C",
              "text": "wealthy"
            },
            {
              "key": "D",
              "text": "young"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "Those who could afford them were quite content to remain in the more sumptuous, single-family homes, leaving the Stuyvesant to young married couples and bachelors.",
          "explanation_vi": "Vì những người có điều kiện vẫn ở nhà riêng sang trọng, tòa nhà Stuyvesant đành phải nhường lại cho các cặp vợ chồng trẻ và những người độc thân ('young married couples and bachelors'), suy ra đa số người sống ở đây là người trẻ."
        },
        {
          "id": "ulis_r04_q06",
          "type": "inference",
          "question_text": "It can be inferred that the typical New York building lot of the 1870's and 1880's looked MOST like which of the following?",
          "options": [
            {
              "key": "A",
              "text": "An L-shaped lot wrapping around a street corner"
            },
            {
              "key": "B",
              "text": "A small square lot along the street"
            },
            {
              "key": "C",
              "text": "A wide rectangular lot running horizontally along the street"
            },
            {
              "key": "D",
              "text": "A tall, narrow rectangular lot extending 100 feet deep from a 25-foot street frontage"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "That lot was a rectangular area 25 feet wide by 100 feet deep - a shape perfectly suited for a row house.",
          "explanation_vi": "Đoạn 2 nêu rõ lô đất xây dựng điển hình ở New York thời kỳ đó có dạng hình chữ nhật rộng 25 feet và sâu 100 feet (\"25 feet wide by 100 feet deep\"). Trong hình vẽ, ô (D) mô tả chính xác một lô đất hẹp về bề ngang mặt đường (25 feet) nhưng kéo rất sâu vào bên trong (100 feet). Do đó, đáp án đúng là D.",
          "paraphrase_analysis": {
            "question_phrase": "typical New York building lot looked MOST like",
            "passage_phrase": "That lot was a rectangular area 25 feet wide by 100 feet deep",
            "explanation": "Lô đất chữ nhật 25x100 feet tương ứng với hình chữ nhật hẹp và sâu theo phương thẳng đứng (D)."
          }
        },
        {
          "id": "ulis_r04_q07",
          "type": "negative_fact",
          "question_text": "It can be inferred that a New York apartment building in the 1870's and 1880's had all of the following characteristics EXCEPT",
          "options": [
            {
              "key": "A",
              "text": "Its room arrangement was not logical."
            },
            {
              "key": "B",
              "text": "It was rectangular."
            },
            {
              "key": "C",
              "text": "It was spacious inside."
            },
            {
              "key": "D",
              "text": "It had limited light."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "The lot could also accommodate a rectangular tenement, though it could not yield the square, well-lighted, and logically arranged rooms that great apartment buildings require.",
          "explanation_vi": "Đoạn 2 chỉ ra rằng các tòa nhà chung cư thời kỳ đầu không thể tạo ra các phòng vuông vức, đủ ánh sáng và bố trí hợp lý do bị giới hạn bởi lô đất hẹp. Chúng không hề rộng rãi bên trong ('spacious'). Do đó C là đáp án đúng cho dạng câu hỏi ngoại trừ (EXCEPT)."
        },
        {
          "id": "ulis_r04_q08",
          "type": "vocab_in_context",
          "question_text": "The word 'yield' in line 13 is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "harvest"
            },
            {
              "key": "B",
              "text": "surrender"
            },
            {
              "key": "C",
              "text": "amount"
            },
            {
              "key": "D",
              "text": "provide"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "The lot could also accommodate a rectangular tenement, though it could not yield the square, well-lighted, and logically arranged rooms that great apartment buildings require.",
          "explanation_vi": "Trong ngữ cảnh này, 'yield' mang nghĩa tạo ra, cung cấp ra được những căn phòng vuông vức và đủ ánh sáng, tương đương với từ 'provide'."
        },
        {
          "id": "ulis_r04_q09",
          "type": "factual_detail",
          "question_text": "Why did the idea of living in an apartment become popular in the late 1800's?",
          "options": [
            {
              "key": "A",
              "text": "Large families needed housing with sufficient space."
            },
            {
              "key": "B",
              "text": "Apartments were preferable to tenements and cheaper than row houses"
            },
            {
              "key": "C",
              "text": "The city officials of New York wanted housing that was centrally located."
            },
            {
              "key": "D",
              "text": "The shape of early apartments could accommodate a variety of interior designs."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "It met the needs of a large and growing population that wanted something better than tenements but could not afford or did not want row houses.",
          "explanation_vi": "Đoạn 2 giải thích ý tưởng căn hộ trở nên phổ biến vì nó đáp ứng nhu cầu của người dân muốn có nơi ở tốt hơn nhà trọ tồi tàn (tenements) nhưng không đủ tiền hoặc không thích nhà liền kề (row houses)."
        },
        {
          "id": "ulis_r04_q10",
          "type": "factual_detail",
          "question_text": "The author mentions the Dakota and the Ansonia in line 22 because",
          "options": [
            {
              "key": "A",
              "text": "they are examples of large, well designed apartment buildings"
            },
            {
              "key": "B",
              "text": "their design is similar to that of row houses"
            },
            {
              "key": "C",
              "text": "they were built on a single building lot"
            },
            {
              "key": "D",
              "text": "they are famous hotels"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "In the closing decades of the nineteenth century, large apartment houses began dotting the developed portions of New York City, and by the opening decades of the twentieth century, spacious buildings, such as the Dakota and the Ansonia finally transcended the tight confinement of row house building lots.",
          "explanation_vi": "Tác giả nhắc đến Dakota và Ansonia như những ví dụ điển hình cho các tòa nhà rộng rãi, phá vỡ sự kìm kẹp của các lô đất xây nhà liền kề nhỏ hẹp vào đầu thế kỷ 20."
        }
      ],
      "id": "ulis_r04_p1"
    },
    {
      "title": "Passage 2: The Formation and Characteristics of Snowfall",
      "topic": "Meteorology & Science",
      "difficulty": "B2",
      "content_paragraphs": [
        "A snowfall consists of myriads of minute ice crystals that fall to the ground in the form of frozen precipitation. The formation of snow begins with these ice crystals in the subfreezing strata of the middle and upper atmosphere when there is an adequate supply of moisture present. At the core of every ice crystal is a minuscule nucleus, a solid particle of matter around which moisture condenses and freezes. Liquid water droplets floating in the supercooled atmosphere and free ice crystals cannot coexist within the same cloud, since the vapor pressure of ice is less than that of water. This enables the ice crystals to rob the liquid droplets of their moisture and grow continuously. The process can be very rapid, quickly creating sizable ice crystals, some of which adhere to each other to create a cluster of ice crystals or a snowflake. Simple flakes possess a variety of beautiful forms, usually hexagonal, though the symmetrical shapes reproduced in most microscope photography of snowflakes are not usually found in actual snowfalls. Typically, snowflakes in actual snowfall consists of broken fragments and clusters of adhering ice crystals.",
        "For a snowfall to continue once it starts, there must be a constant inflow of moisture to supply the nuclei. This moisture is supplied by the passage of an airstream over a water surface and its subsequent lifting to higher regions of the atmosphere. The Pacific Ocean is the source of moisture for most snowfalls west of the Rocky Mountains, while the Gulf of Mexico and the Atlantic Ocean feed water vapor into the air currents over the central and eastern sections of the United States. Other geographical features also can be the source of moisture for some snowstorms. For example, areas adjacent to the Great Lakes experience their own unique lake-effect storms, employing a variation of the process on a local scale. In addition, mountainous section or rising terrain can initiate snowfalls by the geographical lifting of a moist airstream."
      ],
      "word_count": 277,
      "questions": [
        {
          "id": "ulis_r04_q11",
          "type": "author_attitude",
          "question_text": "Which of the following questions does the author answer in the first paragraph?",
          "options": [
            {
              "key": "A",
              "text": "Why are snowflakes hexagonal?"
            },
            {
              "key": "B",
              "text": "What is the optimum temperature for snow?"
            },
            {
              "key": "C",
              "text": "In which months does most snowfall fall?"
            },
            {
              "key": "D",
              "text": "How are snowflakes formed?"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "The formation of snow begins with these ice crystals in the subfreezing strata of the middle and upper atmosphere when there is an adequate supply of moisture present.",
          "explanation_vi": "Đoạn 1 giải thích chi tiết quá trình hình thành của tuyết, từ các tinh thể băng ban đầu đến khi chúng kết hợp lại thành bông tuyết. Do đó, câu hỏi về cách bông tuyết được hình thành (How are snowflakes formed?) được trả lời ở đoạn này. Các đáp án A, B, C không được đề cập hoặc không phải là trọng tâm giải thích quá trình ở đoạn 1."
        },
        {
          "id": "ulis_r04_q12",
          "type": "vocab_in_context",
          "question_text": "The word \"minute\" in line 1 is closest in meaning to ...........",
          "options": [
            {
              "key": "A",
              "text": "tiny"
            },
            {
              "key": "B",
              "text": "quick"
            },
            {
              "key": "C",
              "text": "clear"
            },
            {
              "key": "D",
              "text": "sharp"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "A snowfall consists of myriads of minute ice crystals that fall to the ground in the form of frozen precipitation.",
          "explanation_vi": "Từ \"minute\" (nhấn trọng âm ở âm tiết thứ hai /maɪˈnuːt/) trong ngữ cảnh này có nghĩa là rất nhỏ, li ti, đồng nghĩa với \"tiny\". Các từ còn lại không phù hợp về nghĩa."
        },
        {
          "id": "ulis_r04_q13",
          "type": "factual_detail",
          "question_text": "What is at the center of an ice crystal?",
          "options": [
            {
              "key": "A",
              "text": "A small snowflake"
            },
            {
              "key": "B",
              "text": "A nucleus"
            },
            {
              "key": "C",
              "text": "A drop of water"
            },
            {
              "key": "D",
              "text": "A hexagon"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "At the core of every ice crystal is a minuscule nucleus, a solid particle of matter around which moisture condenses and freezes.",
          "explanation_vi": "Dựa vào câu văn trong bài, ở phần lõi (core) của mỗi tinh thể băng là một hạt nhân nhỏ (nucleus). Do đó đáp án B là chính xác."
        },
        {
          "id": "ulis_r04_q14",
          "type": "vocab_in_context",
          "question_text": "The word \"adhere\" in line 8 is closest in meaning to .................",
          "options": [
            {
              "key": "A",
              "text": "belong"
            },
            {
              "key": "B",
              "text": "relate"
            },
            {
              "key": "C",
              "text": "stick"
            },
            {
              "key": "D",
              "text": "speed"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "The process can be very rapid, quickly creating sizable ice crystals, some of which adhere to each other to create a cluster of ice crystals or a snowflake.",
          "explanation_vi": "Từ \"adhere\" có nghĩa là dính vào, bám chặt vào nhau, đồng nghĩa với từ \"stick\". Các lựa chọn khác không tương đương về nghĩa."
        },
        {
          "id": "ulis_r04_q15",
          "type": "main_idea",
          "question_text": "What is the main topic of the second paragraph?",
          "options": [
            {
              "key": "A",
              "text": "How ice crystals form"
            },
            {
              "key": "B",
              "text": "How moisture affects temperature"
            },
            {
              "key": "C",
              "text": "What happens when ice crystals melt"
            },
            {
              "key": "D",
              "text": "Where the moisture to supply the nuclei comes from"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "For a snowfall to continue once it starts, there must be a constant inflow of moisture to supply the nuclei.",
          "explanation_vi": "Đoạn 2 tập trung thảo luận về việc độ ẩm đến từ đâu để duy trì tuyết rơi (từ các đại dương, hồ lớn, hoặc địa hình núi non nâng dòng không khí ẩm). Do đó, đáp án D là chủ đề chính xác nhất của đoạn 2."
        },
        {
          "id": "ulis_r04_q16",
          "type": "factual_detail",
          "question_text": "The word \"it\" in line 13 refers to ...............",
          "options": [
            {
              "key": "A",
              "text": "snowfall"
            },
            {
              "key": "B",
              "text": "snowflake"
            },
            {
              "key": "C",
              "text": "cluster"
            },
            {
              "key": "D",
              "text": "moisture"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "For a snowfall to continue once it starts, there must be a constant inflow of moisture to supply the nuclei.",
          "explanation_vi": "Đại từ \"it\" ở đây thay thế cho chủ ngữ \"snowfall\" (trận tuyết rơi) trong mệnh đề \"For a snowfall to continue once it starts\" (Để một trận tuyết rơi tiếp tục một khi nó bắt đầu...). Do đó, đáp án A là đúng."
        },
        {
          "id": "ulis_r04_q17",
          "type": "factual_detail",
          "question_text": "What is necessary for a snowfall to persist?",
          "options": [
            {
              "key": "A",
              "text": "A decrease in the number of snowflakes"
            },
            {
              "key": "B",
              "text": "Lowered vapor pressure in ice crystals"
            },
            {
              "key": "C",
              "text": "A continuous infusion of moisture"
            },
            {
              "key": "D",
              "text": "A change in the direction of the airstream"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "For a snowfall to continue once it starts, there must be a constant inflow of moisture to supply the nuclei.",
          "explanation_vi": "Bài đọc nêu rõ: \"For a snowfall to continue once it starts, there must be a constant inflow of moisture to supply the nuclei.\" (Để tuyết tiếp tục rơi, phải có nguồn cung cấp độ ẩm liên tục). Điều này tương đương với \"A continuous infusion of moisture\" (sự bổ sung độ ẩm liên tục). Do đó, C là đáp án đúng."
        },
        {
          "id": "ulis_r04_q18",
          "type": "factual_detail",
          "question_text": "How do lake-effect snowstorms form?",
          "options": [
            {
              "key": "A",
              "text": "Water temperature drop below freezing."
            },
            {
              "key": "B",
              "text": "Moisture rises from a lake into the airstream."
            },
            {
              "key": "C",
              "text": "Large quantities of wet air come off a nearby mountain."
            },
            {
              "key": "D",
              "text": "Millions of ice crystals form on the surface of a large lake."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "For example, areas adjacent to the Great Lakes experience their own unique lake-effect storms, employing a variation of the process on a local scale.",
          "explanation_vi": "Bão hiệu ứng hồ (lake-effect storms) sử dụng quá trình tương tự ở quy mô địa phương, trong đó độ ẩm bốc lên từ mặt nước hồ vào dòng không khí. Do đó, đáp án B phản ánh chính xác cơ chế này."
        },
        {
          "id": "ulis_r04_q19",
          "type": "vocab_in_context",
          "question_text": "The word \"initiate\" in line 20 is closest in meaning to .................",
          "options": [
            {
              "key": "A",
              "text": "enhance"
            },
            {
              "key": "B",
              "text": "alter"
            },
            {
              "key": "C",
              "text": "increase"
            },
            {
              "key": "D",
              "text": "begin"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "In addition, mountainous section or rising terrain can initiate snowfalls by the geographical lifting of a moist airstream.",
          "explanation_vi": "Từ \"initiate\" có nghĩa là khởi xướng, bắt đầu, đồng nghĩa với từ \"begin\". Các phương án enhance (tăng cường), alter (thay đổi), increase (tăng lên) không tương đương nghĩa."
        },
        {
          "id": "ulis_r04_q20",
          "type": "inference",
          "question_text": "Which of the following could account for the lack of snowfall in a geographical location close to mountains and a major water source?",
          "options": [
            {
              "key": "A",
              "text": "Ground temperatures below the freezing point"
            },
            {
              "key": "B",
              "text": "Too much moisture in the air"
            },
            {
              "key": "C",
              "text": "Too much wind off the mountains"
            },
            {
              "key": "D",
              "text": "Atmospheric temperatures above the freezing point."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "The formation of snow begins with these ice crystals in the subfreezing strata of the middle and upper atmosphere when there is an adequate supply of moisture present.",
          "explanation_vi": "Sự hình thành tuyết đòi hỏi nhiệt độ ở tầng khí quyển phải ở mức dưới điểm đóng băng (subfreezing strata). Nếu nhiệt độ khí quyển ở trên điểm đóng băng (above the freezing point), tuyết sẽ tan chảy thành mưa hoặc dạng kết tủa lỏng thay vì tạo thành tuyết rơi, dù có đủ núi và nguồn nước. Do đó, đáp án D là suy luận hợp lý nhất."
        }
      ],
      "id": "ulis_r04_p2"
    },
    {
      "title": "Passage 3: Social Parasitism in Ants",
      "topic": "Animal Behavior & Science",
      "difficulty": "B2",
      "content_paragraphs": [
        "Social parasitism involves one species relying on another to raise its young. Among vertebrates, the best known social parasites are such birds as cuckoos and cowbirds; the female lays an egg in a nest belonging to another species and leaves it for the host to rear.",
        "The dulotic species of ants, however, are the supreme social parasites. Consider, for example, the unusual behavior of ants belonging to the genus Polyergus. All species of this ant have lost the ability to care for themselves. The workers do not forage for food. feed their brood or queen, or even clean their own nest. To compensate for these deficits, Polyergus has become specialized at obtaining workers from the related genus Formica to do these chores.",
        "In a raid, several thousand Polyergus workers will travel up to 500 feet in search of a Formica nest, penetrate it, drive off the queen and their workers, capture the pupal brood, and transport it back to their nest. The captured brood is then reared by the resident Formica workers until the developing pupae emerge to add to the Formica population, which maintains the mixed-species nest The Formica workers forage for food and give it to colony members of both species. They also remove wastes and excavate new chambers as the population increases.",
        "The true extent of the Polyergus ants' dependence on the Formica becomes apparent when the worker population grows too large for the existing nest. Formica scouts locate a new nesting site, return to the mixed-species colony, and recruit additional Formica nest mates. During a period that may last seven days, the Formica workers carry to the new nest all the Polyergus eggs, larvae, and pupae, every Polyergus adult, and even the Polyergus queen.",
        "Of the approximately 8,000 species of ants in the world, all 5 species of Polyergus and some 200 species in other genera have evolved some degree of parasitic relationship with other ants."
      ],
      "word_count": 331,
      "questions": [
        {
          "id": "ulis_r04_q21",
          "type": "main_idea",
          "question_text": "Which of the following statements best represents the main idea of the passage?",
          "options": [
            {
              "key": "A",
              "text": "Ants belonging to the genus Formica are incapable of performing certain tasks."
            },
            {
              "key": "B",
              "text": "The genus Polyergus is quite similar to the genus Formica."
            },
            {
              "key": "C",
              "text": "Ants belonging to the genus Polyergus have an unusual relationship with ants belonging to the genus Formica."
            },
            {
              "key": "D",
              "text": "Polyergus ants frequently leave their nests to build new colonies."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "Consider, for example, the unusual behavior of ants belonging to the genus Polyergus.",
          "explanation_vi": "Đoạn văn tập trung giới thiệu và miêu tả mối quan hệ sống ký sinh đặc biệt giữa loài kiến thuộc chi Polyergus và loài kiến thuộc chi Formica, trong đó Polyergus phụ thuộc hoàn toàn vào Formica để sinh tồn.",
          "paraphrase_analysis": {
            "question_phrase": "have an unusual relationship with ants belonging to the genus Formica",
            "passage_phrase": "unusual behavior of ants belonging to the genus Polyergus... specialized at obtaining workers from the related genus Formica to do these chores",
            "explanation": "Ý chính của bài viết nói về mối quan hệ ký sinh xã hội độc đáo và lệ thuộc giữa hai chi kiến này."
          }
        },
        {
          "id": "ulis_r04_q22",
          "type": "vocab_in_context",
          "question_text": "The word \"raise\" in line 1 is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "rear"
            },
            {
              "key": "B",
              "text": "lift"
            },
            {
              "key": "C",
              "text": "collect"
            },
            {
              "key": "D",
              "text": "increase"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "Social parasitism involves one species relying on another to raise its young.",
          "explanation_vi": "Từ \"raise\" ở đây có nghĩa là nuôi dưỡng con non, đồng nghĩa với từ \"rear\" xuất hiện ở câu tiếp theo (\"leaves it for the host to rear\"). Các lựa chọn khác (lift, collect, increase) không phù hợp về ngữ cảnh nuôi nấng con vật."
        },
        {
          "id": "ulis_r04_q23",
          "type": "factual_detail",
          "question_text": "The author mentions cuckoos and cowbirds in line 2 because they",
          "options": [
            {
              "key": "A",
              "text": "share their nests with each other"
            },
            {
              "key": "B",
              "text": "closely related species"
            },
            {
              "key": "C",
              "text": "raise the young of other birds"
            },
            {
              "key": "D",
              "text": "are social parasites"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "Among vertebrates, the best known social parasites are such birds as cuckoos and cowbirds; the female lays an egg in a nest belonging to another species and leaves it for the host to rear.",
          "explanation_vi": "Tác giả nhắc đến chim cu gáy (cuckoos) và chim sáo bò (cowbirds) để minh họa cho nhóm động vật có xương sống là những loài ký sinh xã hội nổi tiếng nhất (social parasites)."
        },
        {
          "id": "ulis_r04_q24",
          "type": "factual_detail",
          "question_text": "The word \"it\" in line 3 refers to",
          "options": [
            {
              "key": "A",
              "text": "species"
            },
            {
              "key": "B",
              "text": "nest"
            },
            {
              "key": "C",
              "text": "egg"
            },
            {
              "key": "D",
              "text": "female"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "the female lays an egg in a nest belonging to another species and leaves it for the host to rear.",
          "explanation_vi": "Đại từ \"it\" thay thế cho danh từ số ít đứng trước nó trong mệnh đề là \"an egg\" (quả trứng mà con cái đẻ vào tổ của loài khác và để cho chủ nhà nuôi hộ)."
        },
        {
          "id": "ulis_r04_q25",
          "type": "inference",
          "question_text": "What does the author mean by stating that \"The dulotic species of ants... are the supreme social parasites\" (line 4)?",
          "options": [
            {
              "key": "A",
              "text": "The Polyergus are more highly developed than the Formica."
            },
            {
              "key": "B",
              "text": "The Formica have developed specialized roles."
            },
            {
              "key": "C",
              "text": "The Polyergus are heavily dependent on the Formica."
            },
            {
              "key": "D",
              "text": "The Formica do not reproduce rapidly enough to care for themselves"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "To compensate for these deficits, Polyergus has become specialized at obtaining workers from the related genus Formica to do these chores.",
          "explanation_vi": "Cụm từ \"supreme social parasites\" (những kẻ ký sinh xã hội tối thượng) dùng để chỉ mức độ phụ thuộc hoàn toàn vào loài khác (Formica) vì bản thân loài Polyergus đã mất khả năng tự chăm sóc, tự kiếm ăn hay làm tổ."
        },
        {
          "id": "ulis_r04_q26",
          "type": "factual_detail",
          "question_text": "Which of the following is a task that an ant of the genus Polyergus might do?",
          "options": [
            {
              "key": "A",
              "text": "Look for food."
            },
            {
              "key": "B",
              "text": "Raid another nest"
            },
            {
              "key": "C",
              "text": "Care for the young."
            },
            {
              "key": "D",
              "text": "Clean its own nest."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "In a raid, several thousand Polyergus workers will travel up to 500 feet in search of a Formica nest, penetrate it, drive off the queen and their workers, capture the pupal brood, and transport it back to their nest.",
          "explanation_vi": "Đoạn văn nêu rõ kiến Polyergus không tự đi kiếm ăn, chăm sóc con non hay dọn tổ mà chuyên đi đột kích (raid) tổ của kiến Formica để bắt kén."
        },
        {
          "id": "ulis_r04_q27",
          "type": "vocab_in_context",
          "question_text": "The word \"excavate\" in line 14 is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "find"
            },
            {
              "key": "B",
              "text": "clean"
            },
            {
              "key": "C",
              "text": "repair"
            },
            {
              "key": "D",
              "text": "dig"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "They also remove wastes and excavate new chambers as the population increases.",
          "explanation_vi": "Từ \"excavate\" có nghĩa là đào bới, khoét (để tạo ra các căn phòng mới trong tổ), đồng nghĩa với từ \"dig\"."
        },
        {
          "id": "ulis_r04_q28",
          "type": "vocab_in_context",
          "question_text": "The word \"recruit\" in line 18 is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "create"
            },
            {
              "key": "B",
              "text": "enlist"
            },
            {
              "key": "C",
              "text": "endure"
            },
            {
              "key": "D",
              "text": "capture"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "Formica scouts locate a new nesting site, return to the mixed-species colony, and recruit additional Formica nest mates.",
          "explanation_vi": "Từ \"recruit\" trong ngữ cảnh này mang nghĩa huy động, chiêu mộ thêm các thành viên khác cùng loài đi cùng, đồng nghĩa với từ \"enlist\"."
        },
        {
          "id": "ulis_r04_q29",
          "type": "factual_detail",
          "question_text": "What happens when a mixed colony of Polyergus and Formica ants becomes too large?",
          "options": [
            {
              "key": "A",
              "text": "The Polyergus workers enlarge the existing nest."
            },
            {
              "key": "B",
              "text": "The captured Formica workers return to their original nest."
            },
            {
              "key": "C",
              "text": "The Polyergus and the Formica build separate nests."
            },
            {
              "key": "D",
              "text": "The Polyergus and the Formica move to a new nest."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 3,
          "clue_sentence": "During a period that may last seven days, the Formica workers carry to the new nest all the Polyergus eggs, larvae, and pupae, every Polyergus adult, and even the Polyergus queen.",
          "explanation_vi": "Khi tổ trở nên quá lớn, kiến Formica sẽ tìm địa điểm mới và chuyển toàn bộ thuộc địa (cả kiến Polyergus lẫn Formica) sang tổ mới."
        },
        {
          "id": "ulis_r04_q30",
          "type": "negative_fact",
          "question_text": "According to the information in the passage, all of the following terms refer to ants belonging to the genus Formica EXCEPT the",
          "options": [
            {
              "key": "A",
              "text": "dulotic species of ants"
            },
            {
              "key": "B",
              "text": "captured brood"
            },
            {
              "key": "C",
              "text": "developing pupae"
            },
            {
              "key": "D",
              "text": "worker population"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "The dulotic species of ants, however, are the supreme social parasites. Consider, for example, the unusual behavior of ants belonging to the genus Polyergus.",
          "explanation_vi": "Thuật ngữ \"dulotic species of ants\" dùng để chỉ loài kiến ký sinh thuộc chi Polyergus (những kẻ đi bắt nô lệ), chứ không phải chỉ kiến Formica. Các đáp án B, C, D đều đề cập đến kén/ấu trùng hoặc thợ thuộc loài Formica bị bắt về tổ."
        }
      ],
      "id": "ulis_r04_p3"
    },
    {
      "title": "Passage 4: The Winterthur Museum",
      "topic": "Art & Museums",
      "difficulty": "C1",
      "content_paragraphs": [
        "The Winterthur Museum is a collection and a house. There are many museums devoted to the decorative arts and many house museums, but rarely in the United States is a great collection displayed in a great country house. Passing through successive generations of a single family, Winterthur has been a private estate for more than a century. Even after the extensive renovations made to it between 1929 and 1931, the house remained a family residence. This fact is of importance to the atmosphere and effect of the museum. The impression of a lived-in house is apparent to the visitor; the rooms look as if they were vacated only a short while ago whether by the original owners of the furniture or the most recent residents of the house can be a matter of personal interpretation. Winterthur remains, then, a house in which a collection of furniture and architectural elements has been assembled. Like an English country house, it is an organic structure; the house, as well as the collection and manner of displaying it to the visitor, has changed over the years. The changes have coincided with developing concepts of the American arts, increased knowledge on the part of collectors and students, and a progression toward the achievement of a historical effect in period-room displays. The rooms at Winterthur have followed this current, yet still retained the character of a private house.",
        "The concept of a period room as a display technique has developed gradually over the years in an effort to present works of art in a context that would show them to greater effect and would give them more meaning for the viewer. Comparable to the habitat group in a natural history museum, the period room represents the decorative arts in a lively and interesting manner and provides an opportunity to assemble objects related by style, date, or place of manufacture."
      ],
      "word_count": 277,
      "questions": [
        {
          "id": "ulis_r04_q31",
          "type": "main_idea",
          "question_text": "What does the passage mainly discuss?",
          "options": [
            {
              "key": "A",
              "text": "The reason that Winterthur was redesigned"
            },
            {
              "key": "B",
              "text": "Elements that make Winterthur an unusual museum"
            },
            {
              "key": "C",
              "text": "How Winterthur compares to English country houses"
            },
            {
              "key": "D",
              "text": "Historical furniture contained in Winterthur"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "There are many museums devoted to the decorative arts and many house museums, but rarely in the United States is a great collection displayed in a great country house.",
          "explanation_vi": "Đoạn văn thảo luận về Bảo tàng Winterthur, một bảo tàng kết hợp giữa bộ sưu tập nghệ thuật trang trí và một ngôi nhà lớn từng là dinh thự tư gia, tạo nên nét đặc biệt hiếm có ở Mỹ. Do đó, ý chính của bài là những yếu tố làm cho Winterthur trở thành một bảo tàng bất thường/đặc biệt.",
          "paraphrase_analysis": {
            "question_phrase": "Elements that make Winterthur an unusual museum",
            "passage_phrase": "rarely in the United States is a great collection displayed in a great country house",
            "explanation": "Đoạn văn nhấn mạnh sự kết hợp hiếm có giữa một bộ sưu tập lớn và một ngôi nhà tư gia mang hơi hướng sống động, khác với các bảo tàng thông thường."
          }
        },
        {
          "id": "ulis_r04_q32",
          "type": "vocab_in_context",
          "question_text": "The phrase \"devoted to\" in line 1 is closest in meaning to ..........",
          "options": [
            {
              "key": "A",
              "text": "surrounded by"
            },
            {
              "key": "B",
              "text": "specilizing in"
            },
            {
              "key": "C",
              "text": "successful with"
            },
            {
              "key": "D",
              "text": "sentimental about"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "There are many museums devoted to the decorative arts and many house museums, but rarely in the United States is a great collection displayed in a great country house.",
          "explanation_vi": "Cụm từ \"devoted to\" trong ngữ cảnh này mang nghĩa là chuyên về, hướng toàn bộ sự chú ý hoặc chuyên môn vào một lĩnh vực nào đó, đồng nghĩa với \"specializing in\"."
        },
        {
          "id": "ulis_r04_q33",
          "type": "factual_detail",
          "question_text": "What happened at Winterthur between 1929 and 1931?",
          "options": [
            {
              "key": "A",
              "text": "The owners moved out."
            },
            {
              "key": "B",
              "text": "The house was repaired."
            },
            {
              "key": "C",
              "text": "The old furniture was replaced."
            },
            {
              "key": "D",
              "text": "The estate became a museum."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "Even after the extensive renovations made to it between 1929 and 1931, the house remained a family residence.",
          "explanation_vi": "Văn bản nêu rõ: \"Even after the extensive renovations made to it between 1929 and 1931...\" (Ngay cả sau những đợt đại tu/sửa chữa lớn được thực hiện đối với nó từ năm 1929 đến 1931...). Do đó, đáp án đúng là ngôi nhà đã được sửa chữa (renovations/repaired)."
        },
        {
          "id": "ulis_r04_q34",
          "type": "inference",
          "question_text": "What does the author mean by stating \"The impression of a lived-in house is apparent to the visitor\" (line 6)?",
          "options": [
            {
              "key": "A",
              "text": "Winterthur is very old."
            },
            {
              "key": "B",
              "text": "Few people visit Winterthur."
            },
            {
              "key": "C",
              "text": "Winterthur does not look like a typical museum."
            },
            {
              "key": "D",
              "text": "The furniture at Winterthur looks comfortable."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "The impression of a lived-in house is apparent to the visitor; the rooms look as if they were vacated only a short while ago whether by the original owners of the furniture or the most recent residents of the house can be a matter of personal interpretation.",
          "explanation_vi": "Câu này diễn tả rằng các căn phòng mang lại cảm giác như có người đang sinh sống (lived-in house), trông như vừa mới được rời đi cách đây không lâu, điều này có nghĩa là Winterthur không giống một bảo tàng trưng bày thông thường và khô khan."
        },
        {
          "id": "ulis_r04_q35",
          "type": "vocab_in_context",
          "question_text": "The word \"assembled\" in line 9 is closest in meaning to ............",
          "options": [
            {
              "key": "A",
              "text": "summoned"
            },
            {
              "key": "B",
              "text": "appreciated"
            },
            {
              "key": "C",
              "text": "brought together"
            },
            {
              "key": "D",
              "text": "fundamentally changed"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "Winterthur remains, then, a house in which a collection of furniture and architectural elements has been assembled.",
          "explanation_vi": "Từ \"assembled\" trong ngữ cảnh tập hợp đồ đạc và các yếu tố kiến trúc lại với nhau có nghĩa là được thu thập, tập hợp lại, tương đương với \"brought together\"."
        },
        {
          "id": "ulis_r04_q36",
          "type": "inference",
          "question_text": "The word \"it\" in line 10 refers to ............",
          "options": [
            {
              "key": "A",
              "text": "Winterthur"
            },
            {
              "key": "B",
              "text": "collection"
            },
            {
              "key": "C",
              "text": "English country house"
            },
            {
              "key": "D",
              "text": "visitor"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "Like an English country house, it is an organic structure; the house, as well as the collection and manner of displaying it to the visitor, has changed over the years.",
          "explanation_vi": "Đại từ \"it\" trong câu \"Like an English country house, it is an organic structure; the house...\" quy chiếu về chủ thể đang được miêu tả chính là dinh thự Winterthur."
        },
        {
          "id": "ulis_r04_q37",
          "type": "vocab_in_context",
          "question_text": "The word \"developing\" in line 11 is closest in meaning to ............",
          "options": [
            {
              "key": "A",
              "text": "traditional"
            },
            {
              "key": "B",
              "text": "exhibiting"
            },
            {
              "key": "C",
              "text": "informative"
            },
            {
              "key": "D",
              "text": "evolving"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "The changes have coincided with developing concepts of the American arts, increased knowledge on the part of collectors and students, and a progression toward the achievement of a historical effect in period-room displays.",
          "explanation_vi": "Từ \"developing\" trong cụm \"developing concepts\" chỉ các khái niệm đang phát triển, tiến triển theo thời gian, đồng nghĩa với \"evolving\"."
        },
        {
          "id": "ulis_r04_q38",
          "type": "negative_fact",
          "question_text": "According to the passage, objects in a period room are related by all of the following EXCEPT ..........",
          "options": [
            {
              "key": "A",
              "text": "date"
            },
            {
              "key": "B",
              "text": "style"
            },
            {
              "key": "C",
              "text": "place of manufacture"
            },
            {
              "key": "D",
              "text": "past ownership"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "Comparable to the habitat group in a natural history museum, the period room represents the decorative arts in a lively and interesting manner and provides an opportunity to assemble objects related by style, date, or place of manufacture.",
          "explanation_vi": "Văn bản liệt kê các yếu tố liên kết các hiện vật trong phòng kiểu mẫu gồm: \"style, date, or place of manufacture\" (phong cách, niên đại, hoặc nơi sản xuất). Yếu tố \"past ownership\" (quyền sở hữu trong quá khứ) không được nhắc tới, do đó đây là đáp án ngoại trừ (EXCEPT)."
        },
        {
          "id": "ulis_r04_q39",
          "type": "inference",
          "question_text": "What is the relationship between the two paragraphs in the passage?",
          "options": [
            {
              "key": "A",
              "text": "The second paragraph explains a term that was mentioned in the first paragraph."
            },
            {
              "key": "B",
              "text": "Each paragraph describes a different approach to the display of objects in a museum."
            },
            {
              "key": "C",
              "text": "The second paragraph explains a philosophy of art appreciation that contrasts with the philosophy explained in the first paragraph."
            },
            {
              "key": "D",
              "text": "Each paragraph describes a different historical period."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "The concept of a period room as a display technique has developed gradually over the years in an effort to present works of art in a context that would show them to greater effect and would give them more meaning for the viewer.",
          "explanation_vi": "Cuối đoạn 1 tác giả có nhắc đến cụm từ \"period-room displays\", và sang đoạn 2 tác giả mở đầu bằng việc giải thích khái niệm \"The concept of a period room as a display technique...\". Do đó đoạn 2 giải thích một thuật ngữ được nêu ở đoạn 1."
        },
        {
          "id": "ulis_r04_q40",
          "type": "factual_detail",
          "question_text": "Where in the passage does the author explain why displays at Winterthur have changed?",
          "options": [
            {
              "key": "A",
              "text": "lines 1-3"
            },
            {
              "key": "B",
              "text": "lines 4-6"
            },
            {
              "key": "C",
              "text": "lines 5-7"
            },
            {
              "key": "D",
              "text": "lines 9-12"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "The changes have coincided with developing concepts of the American arts, increased knowledge on the part of collectors and students, and a progression toward the achievement of a historical effect in period-room displays.",
          "explanation_vi": "Tác giả giải thích lý do các trưng bày thay đổi (The changes have coincided with...) ở phần câu bắt đầu từ giữa đoạn 1 (tương ứng với phạm vi dòng 9-12 trong văn bản gốc)."
        }
      ],
      "id": "ulis_r04_p4"
    }
  ]
};
