import type { ReadingTest } from '../../../../../types/schemas';

/**
 * Authentic VSTEP Reading Practice Drill 4 (HCMUE Standard)
 * Source: "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017), Test 4 Reading (PDF Pages 91–104), Key page 177 (Book p. 178)
 * Format: 4 Passages, 40 Questions, 60 Minutes.
 */
export const HCMUE_READING_TEST_04: ReadingTest = {
  "id": "hcmue_read_test_04",
  "title": "VSTEP Reading Practice Drill 4 (Chuẩn ĐH Sư Phạm TP.HCM)",
  "duration_minutes": 60,
  "difficulty": "B2",
  "passages": [
    {
      "title": "Passage 1: The Evolution and Styles of Row Houses in the 19th-Century United States",
      "topic": "History & Culture",
      "word_count": 252,
      "difficulty": "B1",
      "content_paragraphs": [
        "As new industrialism swept over the land in the wake of the Civil War, people flocked to the nation's cities in unprecedented numbers from rural regions, villages, and foreign countries. Housing for the new city-dwellers took many forms as new architectural styles were developed.",
        "During this period of urban expansion, speculative builders discovered **a bonanza** in the form of the row house. Designed for single-family occupancy, these dwellings cost relatively little to construct because they shared common walls with their neighbors and because many could be erected side by side on a narrow street frontage. Along New York's gridiron of streets and avenues rose block after block of row houses, which, by the 1880s, were **almost invariably** faced with brownstone. In contrast, wooden row houses on the West Coast appeared light and airy with their coats of bright paint. San Francisco developed a particularly successful row vernacular, suitable for rich and poor alike, as typified by clusters of homes like the Rountree group, which featured Queen Anne elements in their pitched roofs and heavily decorated exteriors. Although critics likened the facades of such structures to the \"puffing, paint, and powder of our female friends\", the houses were efficiently planned, sanitary, and well-lighted. Virtually every dwelling boasted one or more bay windows, which were important to sun-loving San Franciscans as brownstone fronts were to New Yorkers. As an English traveler observed, California architecture, \"with all the windows gracefully leaping out at themselves\", should rightly be called the \"bay-window order\"."
      ],
      "questions": [
        {
          "id": "hcmue_r04_q01",
          "type": "main_idea",
          "question_text": "The main purpose of the author in this passage is",
          "options": [
            {
              "key": "A",
              "text": "to contrast two versions of a similar architectural form"
            },
            {
              "key": "B",
              "text": "to persuade people to live in row houses"
            },
            {
              "key": "C",
              "text": "to argue for the excellence of California row houses"
            },
            {
              "key": "D",
              "text": "to describe the effects of urbanization"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "Along New York's gridiron of streets and avenues rose block after block of row houses, which, by the 1880s, were **almost invariably** faced with brownstone. In contrast, wooden row houses on the West Coast appeared light and airy with their coats of bright paint.",
          "explanation_vi": "Bài đọc thảo luận và so sánh hai dạng nhà liền kề (row houses) tiêu biểu: nhà ốp đá brownstone ở New York và nhà gỗ nhẹ nhàng, nhiều màu sắc ở Bờ Tây (San Francisco). Do đó, mục đích chính là đối chiếu hai phiên bản của một dạng kiến trúc tương tự. Các lựa chọn khác không phản ánh đúng tổng thể bài đọc.",
          "paraphrase_analysis": {
            "question_phrase": "contrast two versions of a similar architectural form",
            "passage_phrase": "Along New York's gridiron of streets and avenues rose block after block of row houses... In contrast, wooden row houses on the West Coast...",
            "explanation": "Tác giả so sánh nhà liền kề ở New York và nhà liền kề bằng gỗ ở Bờ Tây."
          }
        },
        {
          "id": "hcmue_r04_q02",
          "type": "vocab_in_context",
          "question_text": "The phrase \"**a bonanza**\" in the passage is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "a confusing choice"
            },
            {
              "key": "B",
              "text": "a difficult challenge"
            },
            {
              "key": "C",
              "text": "an exciting design"
            },
            {
              "key": "D",
              "text": "a good investment"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "During this period of urban expansion, speculative builders discovered **a bonanza** in the form of the row house.",
          "explanation_vi": "Từ \"a bonanza\" có nghĩa là một mỏ vàng, một nguồn lợi lớn hoặc một khoản đầu tư sinh lời tốt. Trong ngữ cảnh này, các nhà xây dựng đầu cơ phát hiện ra nhà liền kề mang lại lợi nhuận kinh tế cao (\"a good investment\").",
          "paraphrase_analysis": {
            "question_phrase": "a good investment",
            "passage_phrase": "a bonanza",
            "explanation": "Bonanza chỉ một cơ hội mang lại nhiều lợi nhuận lớn về tài chính."
          }
        },
        {
          "id": "hcmue_r04_q03",
          "type": "vocab_in_context",
          "question_text": "The phrase \"**almost invariably**\" in the passage is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "usually"
            },
            {
              "key": "B",
              "text": "seldom"
            },
            {
              "key": "C",
              "text": "sometimes"
            },
            {
              "key": "D",
              "text": "never"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "Along New York's gridiron of streets and avenues rose block after block of row houses, which, by the 1880s, were **almost invariably** faced with brownstone.",
          "explanation_vi": "Cụm từ \"almost invariably\" có nghĩa là hầu như luôn luôn, tương đương với \"usually\". Các phương án khác (seldom: hiếm khi, sometimes: thỉnh thoảng, never: không bao giờ) trái nghĩa hoặc không chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "usually",
            "passage_phrase": "almost invariably",
            "explanation": "Almost invariably diễn tả một đặc điểm xảy ra hầu như trong mọi trường hợp."
          }
        },
        {
          "id": "hcmue_r04_q04",
          "type": "factual_detail",
          "question_text": "According to the passage, why did speculative builders profit from row houses?",
          "options": [
            {
              "key": "A",
              "text": "Because they cost very little to build."
            },
            {
              "key": "B",
              "text": "Because they were for single families."
            },
            {
              "key": "C",
              "text": "Because they were well-constructed."
            },
            {
              "key": "D",
              "text": "Because they were attractive."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "Designed for single-family occupancy, these dwellings cost relatively little to construct because they shared common walls with their neighbors and because many could be erected side by side on a narrow street frontage.",
          "explanation_vi": "Đoạn văn nêu rõ nhà liền kề có chi phí xây dựng tương đối thấp do chung tường và có thể xây dựng sát nhau trên mặt tiền đường hẹp, giúp các nhà đầu cơ thu lợi nhuận cao.",
          "paraphrase_analysis": {
            "question_phrase": "cost very little to build",
            "passage_phrase": "cost relatively little to construct",
            "explanation": "Chi phí xây dựng thấp là nguyên nhân chính mang lại lợi nhuận cho nhà thầu."
          }
        },
        {
          "id": "hcmue_r04_q05",
          "type": "negative_fact",
          "question_text": "All of the following can be inferred about row houses from the passage EXCEPT",
          "options": [
            {
              "key": "A",
              "text": "they provided for high-density housing"
            },
            {
              "key": "B",
              "text": "they housed people of different economic classes"
            },
            {
              "key": "C",
              "text": "they provided a new and popular form of architectural design"
            },
            {
              "key": "D",
              "text": "they had no front yards"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "San Francisco developed a particularly successful row vernacular, suitable for rich and poor alike, as typified by clusters of homes like the Rountree group, which featured Queen Anne elements in their pitched roofs and heavily decorated exteriors.",
          "explanation_vi": "Theo đáp án chính thức từ sách VSTEP Collection 20 Mock Tests của NXB ĐH Sư Phạm TP.HCM, đáp án là B.",
          "paraphrase_analysis": {
            "question_phrase": "they had no front yards",
            "passage_phrase": "not mentioned in the text",
            "explanation": "Thông tin về sân trước không xuất hiện trong văn bản."
          }
        },
        {
          "id": "hcmue_r04_q06",
          "type": "factual_detail",
          "question_text": "The phrase \"such structures\" in the passage refers to",
          "options": [
            {
              "key": "A",
              "text": "West Coast wooden row houses"
            },
            {
              "key": "B",
              "text": "poor people's houses"
            },
            {
              "key": "C",
              "text": "the homes in the Rountree group"
            },
            {
              "key": "D",
              "text": "Queen Anne's home"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "San Francisco developed a particularly successful row vernacular, suitable for rich and poor alike, as typified by clusters of homes like the Rountree group, which featured Queen Anne elements in their pitched roofs and heavily decorated exteriors.",
          "explanation_vi": "Cụm từ \"such structures\" quy chiếu ngược về các ngôi nhà thuộc nhóm Rountree (the homes in the Rountree group) được nhắc đến ngay trước đó, có phần ngoại thất trang trí đậm nét.",
          "paraphrase_analysis": {
            "question_phrase": "the homes in the Rountree group",
            "passage_phrase": "clusters of homes like the Rountree group",
            "explanation": "Such structures thay thế cho các ngôi nhà thuộc nhóm Rountree vừa được mô tả."
          }
        },
        {
          "id": "hcmue_r04_q07",
          "type": "inference",
          "question_text": "What can be inferred from the passage about New York row houses?",
          "options": [
            {
              "key": "A",
              "text": "They were less colorful than row houses on the West Coast."
            },
            {
              "key": "B",
              "text": "They were windowless."
            },
            {
              "key": "C",
              "text": "They were smaller than California row houses."
            },
            {
              "key": "D",
              "text": "They were less similar in appearance than row houses in California."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "Along New York's gridiron of streets and avenues rose block after block of row houses, which, by the 1880s, were **almost invariably** faced with brownstone. In contrast, wooden row houses on the West Coast appeared light and airy with their coats of bright paint.",
          "explanation_vi": "Nhà liền kề ở New York được ốp bằng đá brownstone (màu nâu sẫm trầm), trong khi nhà ở Bờ Tây có lớp sơn sáng màu (\"bright paint\"). Do đó, có thể suy luận nhà ở New York ít sặc sỡ hơn nhà ở Bờ Tây.",
          "paraphrase_analysis": {
            "question_phrase": "less colorful than row houses on the West Coast",
            "passage_phrase": "faced with brownstone. In contrast, wooden row houses on the West Coast appeared light and airy with their coats of bright paint.",
            "explanation": "Nhà ốp đá nâu màu trầm đối lập với nhà sơn sáng màu ở Bờ Tây chứng tỏ nhà New York ít rực rỡ, nhiều màu sắc hơn."
          }
        },
        {
          "id": "hcmue_r04_q08",
          "type": "factual_detail",
          "question_text": "In the passage, critics of California row houses commented on their",
          "options": [
            {
              "key": "A",
              "text": "excessive use of bay windows"
            },
            {
              "key": "B",
              "text": "ostentatious decoration"
            },
            {
              "key": "C",
              "text": "repetitive nature"
            },
            {
              "key": "D",
              "text": "lack of light"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "Although critics likened the facades of such structures to the \"puffing, paint, and powder of our female friends\", the houses were efficiently planned, sanitary, and well-lighted.",
          "explanation_vi": "Các nhà phê bình ví mặt tiền của những ngôi nhà này giống như \"sự phồng rộp, son phấn và phấn trang điểm\", ám chỉ việc trang trí quá mức hoặc phô trương (\"ostentatious decoration\").",
          "paraphrase_analysis": {
            "question_phrase": "ostentatious decoration",
            "passage_phrase": "heavily decorated exteriors... puffing, paint, and powder",
            "explanation": "Việc so sánh với son phấn và trang trí nặng nề phản ánh sự trang trí phô trương."
          }
        },
        {
          "id": "hcmue_r04_q09",
          "type": "vocab_in_context",
          "question_text": "The word \"boasted\" in the passage is used to indicate the owners'",
          "options": [
            {
              "key": "A",
              "text": "skill"
            },
            {
              "key": "B",
              "text": "wealth"
            },
            {
              "key": "C",
              "text": "intelligence"
            },
            {
              "key": "D",
              "text": "pride"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "Virtually every dwelling boasted one or more bay windows, which were important to sun-loving San Franciscans as brownstone fronts were to New Yorkers.",
          "explanation_vi": "Từ \"boasted\" trong văn cảnh này mang nghĩa tự hào sở hữu (\"pride\"), thể hiện sự hãnh diện của chủ nhà khi ngôi nhà của họ có các ô cửa sổ lồi.",
          "paraphrase_analysis": {
            "question_phrase": "pride",
            "passage_phrase": "boasted",
            "explanation": "Boasted diễn tả niềm tự hào về đặc điểm nổi bật của ngôi nhà."
          }
        },
        {
          "id": "hcmue_r04_q10",
          "type": "inference",
          "question_text": "The author of the passage implies that the most important feature for Californians living in row houses was",
          "options": [
            {
              "key": "A",
              "text": "the color"
            },
            {
              "key": "B",
              "text": "the price"
            },
            {
              "key": "C",
              "text": "the windows"
            },
            {
              "key": "D",
              "text": "the heavily decorated exteriors"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "Virtually every dwelling boasted one or more bay windows, which were important to sun-loving San Franciscans as brownstone fronts were to New Yorkers. As an English traveler observed, California architecture, \"with all the windows gracefully leaping out at themselves\", should rightly be called the \"bay-window order\".",
          "explanation_vi": "Đoạn văn nhấn mạnh cửa sổ lồi rất quan trọng đối với người dân San Francisco thích ánh nắng mặt trời và kiến trúc nơi đây được gọi là \"bay-window order\", ngụ ý cửa sổ là đặc điểm quan trọng nhất đối với họ.",
          "paraphrase_analysis": {
            "question_phrase": "the windows",
            "passage_phrase": "bay windows... bay-window order",
            "explanation": "Cửa sổ lồi là điểm nhấn quan trọng nhất được nhắc đến xuyên suốt đối với kiến trúc California."
          }
        }
      ],
      "id": "hcmue_r04_p1"
    },
    {
      "title": "Passage 2: Desert Animal Survival",
      "topic": "Environmental Science",
      "word_count": 339,
      "difficulty": "B2",
      "content_paragraphs": [
        "Since water is the basis of life, composing the **greater** part of the tissues of all living things, the crucial problem of desert animals is to survive in a world where sources of flowing water are rare. And since man's inexorable necessity is to absorb large quantities of water at frequent intervals, he can scarcely comprehend that many creatures of the desert pass their entire lives without a single drop. Uncompromising as it is, the desert has not eliminated life but only **those forms** unable to withstand its **desiccating** effects. No moist-skinned, water-loving animals can exist there. Few large animals are found: the giants of the North American desert are the deer, the coyote, and the bobcat. Since desert country is open, it holds more swift-footed, running, and leaping creatures than the tangled forest. Its population are largely nocturnal, silent, filled with reticence, and ruled by stealth. Yet they are not **emaciated**. Having adapted to their austere environment, they are as healthy as animals anywhere in the world.",
        "The secret of their adjustment lies in a combination of behavior and physiology. None could survive if, like mad dogs and Englishmen, they went out in the midday sun; many would die in a matter of minutes. So most of them pass the burning hours asleep in cool, humid burrows underneath the ground, emerging to hunt only by night. The surface of the sun-baked desert averages around 150 degrees, but 18 inches down the temperature is only 60 degrees.",
        "An example of a desert animal that has adapted to **subterranean** living and lack of water is the kangaroo rat. Like many desert animals, kangaroo rats stay underground during the day. At night, they go outside to look for food. As evening temperatures drop, moisture from the air forms on plants and seeds. **They** absorb some of this moisture and kangaroo rats take in the life-giving water as they eat."
      ],
      "questions": [
        {
          "id": "hcmue_r04_q11",
          "type": "main_idea",
          "question_text": "What is the topic of this passage?",
          "options": [
            {
              "key": "A",
              "text": "Desert plants"
            },
            {
              "key": "B",
              "text": "Life underground"
            },
            {
              "key": "C",
              "text": "Animal life in a desert environment"
            },
            {
              "key": "D",
              "text": "Man's life in the desert"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "Since water is the basis of life, composing the **greater** part of the tissues of all living things, the crucial problem of desert animals is to survive in a world where sources of flowing water are rare.",
          "explanation_vi": "Đoạn văn tập trung thảo luận về cách các loài động vật sa mạc sinh tồn và thích nghi với môi trường thiếu nước khắc nghiệt. Do đó, đáp án chính xác là C (Đời sống động vật trong môi trường sa mạc)."
        },
        {
          "id": "hcmue_r04_q12",
          "type": "vocab_in_context",
          "question_text": "The word \"**greater**\" in the passage is closest in meaning to_____.",
          "options": [
            {
              "key": "A",
              "text": "stronger"
            },
            {
              "key": "B",
              "text": "larger"
            },
            {
              "key": "C",
              "text": "more noticeable"
            },
            {
              "key": "D",
              "text": "heavier"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "Since water is the basis of life, composing the **greater** part of the tissues of all living things, the crucial problem of desert animals is to survive in a world where sources of flowing water are rare.",
          "explanation_vi": "Từ \"greater\" trong ngữ cảnh này chỉ phần lớn hoặc phần lớn hơn của các mô sinh vật (greater part = phần lớn), đồng nghĩa với \"larger\" (lớn hơn)."
        },
        {
          "id": "hcmue_r04_q13",
          "type": "negative_fact",
          "question_text": "The phrase \"**those forms**\" in the passage refers to all of the following EXCEPT_____.",
          "options": [
            {
              "key": "A",
              "text": "water-loving animals"
            },
            {
              "key": "B",
              "text": "the bobcat"
            },
            {
              "key": "C",
              "text": "moist-skinned animals"
            },
            {
              "key": "D",
              "text": "many large animals"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "Uncompromising as it is, the desert has not eliminated life but only **those forms** unable to withstand its **desiccating** effects.",
          "explanation_vi": "\"Those forms\" ám chỉ những hình thức sự sống không thể chịu đựng được tác động làm khô cạn của sa mạc, bao gồm động vật ưa nước (water-loving animals), động vật da ẩm (moist-skinned animals) và các loài lớn không thích nghi được (ngoại trừ một số ít động vật lớn như linh cẩu, mèo đuôi cộc vẫn sống được). Bobcat là loài động vật vẫn sống được ở sa mạc Bắc Mỹ nên không thuộc nhóm bị loại bỏ bởi sa mạc."
        },
        {
          "id": "hcmue_r04_q14",
          "type": "vocab_in_context",
          "question_text": "The word \"**desiccating**\" in the passage means_____.",
          "options": [
            {
              "key": "A",
              "text": "drying"
            },
            {
              "key": "B",
              "text": "humidifying"
            },
            {
              "key": "C",
              "text": "killing"
            },
            {
              "key": "D",
              "text": "life threatening"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "Uncompromising as it is, the desert has not eliminated life but only **those forms** unable to withstand its **desiccating** effects.",
          "explanation_vi": "Từ \"desiccating\" có nghĩa là làm khô kiệt, làm mất nước. Do đó, nó đồng nghĩa với \"drying\" (làm khô)."
        },
        {
          "id": "hcmue_r04_q15",
          "type": "negative_fact",
          "question_text": "The author mentions all of the following as examples of the behavior of desert animals EXCEPT_____.",
          "options": [
            {
              "key": "A",
              "text": "animals sleep during the day"
            },
            {
              "key": "B",
              "text": "animals dig homes underground"
            },
            {
              "key": "C",
              "text": "animals are noisy and aggressive"
            },
            {
              "key": "D",
              "text": "animals are watchful and quiet"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "Its population are largely nocturnal, silent, filled with reticence, and ruled by stealth.",
          "explanation_vi": "Đoạn văn mô tả động vật sa mạc là \"silent, filled with reticence\" (yên lặng, kín đáo), trái ngược với đáp án C cho rằng chúng ồn ào và hung dữ (noisy and aggressive)."
        },
        {
          "id": "hcmue_r04_q16",
          "type": "vocab_in_context",
          "question_text": "The word \"**emaciated**\" in the passage is closest in meaning to_____.",
          "options": [
            {
              "key": "A",
              "text": "wild"
            },
            {
              "key": "B",
              "text": "cunning"
            },
            {
              "key": "C",
              "text": "unmanageable"
            },
            {
              "key": "D",
              "text": "unhealthy"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "Yet they are not **emaciated**. Having adapted to their austere environment, they are as healthy as animals anywhere in the world.",
          "explanation_vi": "Từ \"emaciated\" nghĩa là gầy gò, ốm yếu do thiếu ăn/thiếu nước. Câu tiếp theo đối lập \"they are as healthy as animals\" cho thấy từ này đồng nghĩa với \"unhealthy\" (không khỏe mạnh, gầy mòn)."
        },
        {
          "id": "hcmue_r04_q17",
          "type": "factual_detail",
          "question_text": "The author states that one characteristic of animals who live in the desert is that they_____.",
          "options": [
            {
              "key": "A",
              "text": "are smaller and fleeter than forest animals"
            },
            {
              "key": "B",
              "text": "are less healthy than animals who live in different places"
            },
            {
              "key": "C",
              "text": "can hunt in temperatures of 150 degrees"
            },
            {
              "key": "D",
              "text": "live in an accommodating environment"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "Since desert country is open, it holds more swift-footed, running, and leaping creatures than the tangled forest.",
          "explanation_vi": "Đoạn văn nêu rõ vì vùng đất sa mạc trống trải nên nó có nhiều sinh vật chạy nhanh, linh hoạt và nhảy nhót hơn so với rừng rậm (swift-footed, running, and leaping creatures), tương đương với ý A."
        },
        {
          "id": "hcmue_r04_q18",
          "type": "vocab_in_context",
          "question_text": "The word \"**subterranean**\" in the passage is closest in meaning to ____________.",
          "options": [
            {
              "key": "A",
              "text": "underground"
            },
            {
              "key": "B",
              "text": "safe"
            },
            {
              "key": "C",
              "text": "precarious"
            },
            {
              "key": "D",
              "text": "harsh"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "An example of a desert animal that has adapted to **subterranean** living and lack of water is the kangaroo rat.",
          "explanation_vi": "Từ \"subterranean\" có nghĩa là ở dưới lòng đất, đồng nghĩa với từ \"underground\" được dùng ở câu tiếp theo \"stay underground during the day\"."
        },
        {
          "id": "hcmue_r04_q19",
          "type": "factual_detail",
          "question_text": "The word \"**they**\" in the passage refers to ____________.",
          "options": [
            {
              "key": "A",
              "text": "kangaroo rats"
            },
            {
              "key": "B",
              "text": "the desert population"
            },
            {
              "key": "C",
              "text": "plants and seeds"
            },
            {
              "key": "D",
              "text": "the burrows of desert animals"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "As evening temperatures drop, moisture from the air forms on plants and seeds. **They** absorb some of this moisture and kangaroo rats take in the life-giving water as they eat.",
          "explanation_vi": "Trong câu \"They absorb some of this moisture\", từ \"They\" thay thế cho chủ ngữ đứng ngay trước đó là \"plants and seeds\" (thực vật và hạt) hút hơi ẩm từ không khí."
        },
        {
          "id": "hcmue_r04_q20",
          "type": "inference",
          "question_text": "Which of the following generalizations are supported by the passage?",
          "options": [
            {
              "key": "A",
              "text": "Water is the basis of life."
            },
            {
              "key": "B",
              "text": "All living things adjust to their environments."
            },
            {
              "key": "C",
              "text": "Desert life is colorful."
            },
            {
              "key": "D",
              "text": "Healthy animals live longer lives."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "Having adapted to their austere environment, they are as healthy as animals anywhere in the world.",
          "explanation_vi": "Toàn bộ bài đọc mô tả việc động vật sa mạc thích nghi (điều chỉnh hành vi và sinh lý) với môi trường sống khắc nghiệt để sinh tồn, hỗ trợ cho kết luận chung là các sinh vật thích nghi với môi trường của chúng (B)."
        }
      ],
      "id": "hcmue_r04_p2"
    },
    {
      "title": "Passage 3: Nitrogen Fixation",
      "topic": "Environmental Science",
      "difficulty": "B2",
      "content_paragraphs": [
        "Animals and higher-order plants depend on nitrogen that is present in soil as they cannot utilize free nitrogen from the atmosphere. To enter living systems, nitrogen must be combined with oxygen or hydrogen to form compounds such as ammonia or nitrates that plants are able to use. Nitrogen gas is converted to ammonia fertilizer by a chemical process involving high pressure and high temperature. This process is called nitrogen fixation. Martinus Willem Beijerinck discovered nitrogen fixation.",
        "The nitrogen molecule is quite inert and breaking it apart requires a considerable amount of energy. There are three processes that are responsible for most of the nitrogen fixation in the biosphere. They are atmospheric fixation, biological fixation, and industrial fixation. Atmospheric fixation occurs through lightning, forest fires, or even hot lava flows where energy **breaks down** nitrogen molecules and enables their atoms to combine with oxygen in the air, thus forming nitrogen oxides. These liquefy in rain, forming nitrates, that are then carried to earth.",
        "In biological nitrogen fixation, the nitrogen is available to some species of microorganisms. Atmospheric nitrogen is converted to ammonia by bacterial enzymes called nitrogenase. More than 90% of all nitrogen fixation is **affected** by them. There are two kinds of nitrogen-fixing microorganisms: free-living (non-symbiotic) bacteria and symbiotic bacteria. Microorganisms that fix nitrogen are called diazotrophs. These need a chemical energy source if they are non-photosynthetic. However, if they are photosynthetic, they can utilize light energy. The free-living diazotrophs supply little fixed nitrogen to agricultural crops, whereas the symbiotic, nitrogen-fixing bacterias live close to plant roots and can obtain energy materials from the plants.",
        "The symbiotic, nitrogen-fixing bacteria **invade** the root hairs of plants. Here they multiply the formation of root nodules, and enlargements of plant cells and bacteria in close proximity. Within the nodules, the bacteria convert the free nitrogen to nitrates, which the plant makes use of for its development.",
        "To make certain of sufficient nodule formation and the best possible growth of legumes (beans, clover, peas, soybeans), seeds are usually inoculated, particularly in poor soils where bacteria is lacking. **This system is the most important for agriculture as many legumes are then able to grow vigorously under nitrogen deficient conditions, contributing nitrogen to the farming system or as green manure included in the soil.** Legumes are also a significant source of protein primarily for the developing world.",
        "Industrial fixation takes place at a temperature of 600 degrees Celsius. In this method, atmospheric nitrogen and hydrogen can be combined to form ammonia, which in turn can be used directly as a fertilizer. It was during the early 19th century that the importance of fixed nitrogen to growing plants was understood. Where people practiced intensive agriculture, demand arose for nitrogen compounds to augment the natural supply present in the soil.",
        "Around the same time, Chilean saltpeter was increasingly used to make gunpowder. This led to a global search for natural deposits of this nitrogen compound. Toward the end of the 19th century, it was realized that Chilean imports would not meet future demands, and, in the event of a major war, without the Chilean supply, manufacturing sufficient weapons would not be possible.",
        "[A] Several processes were then developed: directly combining oxygen with nitrogen, the reaction of nitrogen with calcium carbide, and the direct combination of nitrogen with hydrogen. [B] Combining oxygen and nitrogen was inefficient in its use of energy. Both were costly and the process was abandoned. [C] It is named after Fritz Haber and Carl Bosch, who determined that nitrogen from the air could be combined with nitrogen under enormously high pressures and fairly high temperatures in the presence of an active mechanism to produce an extremely high quantity of ammonia. [D]",
        "Germany heavily relied on this process during World War I, which led to a rapid expansion of the construction of nitrogen plants in many other countries. This method is now one of the leading processes of the chemical industry throughout the world."
      ],
      "word_count": 625,
      "questions": [
        {
          "id": "hcmue_r04_q21",
          "type": "factual_detail",
          "question_text": "According to paragraph 1, how must nitrogen molecules enter living organisms?",
          "options": [
            {
              "key": "A",
              "text": "They must be converted to ammonia or nitrates."
            },
            {
              "key": "B",
              "text": "They must be combined with oxygen in the form of nitrate."
            },
            {
              "key": "C",
              "text": "They must be absorbed by the plant to furnish its nitrogen."
            },
            {
              "key": "D",
              "text": "They must be mixed with oxygen or hydrogen."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "To enter living systems, nitrogen must be combined with oxygen or hydrogen to form compounds such as ammonia or nitrates that plants are able to use.",
          "explanation_vi": "Theo đoạn 1, câu \"To enter living systems, nitrogen must be combined with oxygen or hydrogen...\" chỉ ra rằng nitơ phải được kết hợp với oxy hoặc hydro để đi vào hệ thống sinh vật. Do đó, đáp án D là chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "must enter living organisms",
            "passage_phrase": "enter living systems",
            "explanation": "Câu hỏi diễn đạt lại yêu cầu nitơ thâm nhập vào cơ thể sống bằng cách kết hợp với oxy hoặc hydro."
          }
        },
        {
          "id": "hcmue_r04_q22",
          "type": "vocab_in_context",
          "question_text": "The phrase \"**breaks down**\" in the passage is closest in meaning to _________.",
          "options": [
            {
              "key": "A",
              "text": "destroys"
            },
            {
              "key": "B",
              "text": "discontinues"
            },
            {
              "key": "C",
              "text": "ceases"
            },
            {
              "key": "D",
              "text": "decomposes"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "Atmospheric fixation occurs through lightning, forest fires, or even hot lava flows where energy **breaks down** nitrogen molecules and enables their atoms to combine with oxygen in the air, thus forming nitrogen oxides.",
          "explanation_vi": "Cụm từ \"breaks down\" trong ngữ cảnh phân hủy các phân tử nitơ thành các nguyên tử mang nghĩa tương đương với \"decomposes\" (phân hủy). Do đó, D là đáp án đúng.",
          "paraphrase_analysis": {
            "question_phrase": "breaks down",
            "passage_phrase": "breaks down",
            "explanation": "Trong ngữ cảnh hóa học/sinh học, phân giải/phân hủy các phân tử đồng nghĩa với decompose."
          }
        },
        {
          "id": "hcmue_r04_q23",
          "type": "inference",
          "question_text": "Which of the following can be inferred from paragraph 2 about nitrogen fixation?",
          "options": [
            {
              "key": "A",
              "text": "Nature cannot make it occur by itself."
            },
            {
              "key": "B",
              "text": "It is a process that does not necessarily require the influence of man."
            },
            {
              "key": "C",
              "text": "The process needs perfect circumstances to happen."
            },
            {
              "key": "D",
              "text": "Nitrogen is essential to all life on Earth."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "There are three processes that are responsible for most of the nitrogen fixation in the biosphere. They are atmospheric fixation, biological fixation, and industrial fixation.",
          "explanation_vi": "Đoạn 2 đề cập đến cố định nitơ khí quyển (atmospheric fixation) và sinh học (biological fixation) xảy ra tự nhiên thông qua sấm chớp, cháy rừng và vi sinh vật mà không cần sự can thiệp của con người. Do đó, có thể suy ra rằng quá trình này không nhất thiết phải do con người tác động (B).",
          "paraphrase_analysis": {
            "question_phrase": "does not necessarily require the influence of man",
            "passage_phrase": "Atmospheric fixation occurs through lightning, forest fires...",
            "explanation": "Các hiện tượng tự nhiên như sấm chớp, cháy rừng tạo ra cố định nitơ mà không cần con người."
          }
        },
        {
          "id": "hcmue_r04_q24",
          "type": "factual_detail",
          "question_text": "According to paragraph 3, one factor needed for photosynthetic biological fixation is ___.",
          "options": [
            {
              "key": "A",
              "text": "a light source"
            },
            {
              "key": "B",
              "text": "the presence of ammonia"
            },
            {
              "key": "C",
              "text": "90% rainfall for a week"
            },
            {
              "key": "D",
              "text": "a chemical energy source"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "However, if they are photosynthetic, they can utilize light energy.",
          "explanation_vi": "Theo đoạn 3, vi khuẩn cố định nitơ quang hợp (photosynthetic) sử dụng năng lượng ánh sáng (light energy/source). Do đó, đáp án A là chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "a light source",
            "passage_phrase": "utilize light energy",
            "explanation": "Sử dụng năng lượng ánh sáng tương đương với việc cần nguồn sáng."
          }
        },
        {
          "id": "hcmue_r04_q25",
          "type": "vocab_in_context",
          "question_text": "The word \"**affected**\" in the passage is closest in meaning to ___.",
          "options": [
            {
              "key": "A",
              "text": "driven"
            },
            {
              "key": "B",
              "text": "influenced"
            },
            {
              "key": "C",
              "text": "stopped"
            },
            {
              "key": "D",
              "text": "changed"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "More than 90% of all nitrogen fixation is **affected** by them.",
          "explanation_vi": "Trong ngữ cảnh này, từ \"affected\" mang nghĩa được thực hiện, chịu ảnh hưởng hoặc tác động bởi các enzyme vi khuẩn, đồng nghĩa gần nhất với \"influenced\" (mặc dù mang nghĩa thực hiện/chiếm phần lớn trong tiếng Anh cổ hoặc chuyên ngành, ở đây xét về lựa chọn trắc nghiệm chuẩn).",
          "paraphrase_analysis": {
            "question_phrase": "affected",
            "passage_phrase": "affected by them",
            "explanation": "Được tác động/thực hiện bởi vi khuẩn."
          }
        },
        {
          "id": "hcmue_r04_q26",
          "type": "factual_detail",
          "question_text": "Why does the author mention \"diazotrophs\" in the passage?",
          "options": [
            {
              "key": "A",
              "text": "To explain the industrial process of nitrogen fixation"
            },
            {
              "key": "B",
              "text": "To show how a plants roots are important for this process"
            },
            {
              "key": "C",
              "text": "To give an example of a living organism capable of fixing nitrogen"
            },
            {
              "key": "D",
              "text": "To explain the impact of nitrogen on a microorganism"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "Microorganisms that fix nitrogen are called diazotrophs.",
          "explanation_vi": "Tác giả nhắc đến \"diazotrophs\" để định nghĩa và đưa ra ví dụ về các vi sinh vật có khả năng cố định nitơ. Do đó, đáp án C là chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "give an example of a living organism capable of fixing nitrogen",
            "passage_phrase": "Microorganisms that fix nitrogen are called diazotrophs.",
            "explanation": "Diazotrophs là tên gọi của các vi sinh vật cố định nitơ."
          }
        },
        {
          "id": "hcmue_r04_q27",
          "type": "vocab_in_context",
          "question_text": "The word \"**invade**\" in the passage is closest in meaning to ___.",
          "options": [
            {
              "key": "A",
              "text": "attack"
            },
            {
              "key": "B",
              "text": "defend"
            },
            {
              "key": "C",
              "text": "occupy"
            },
            {
              "key": "D",
              "text": "dominate"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "The symbiotic, nitrogen-fixing bacteria **invade** the root hairs of plants.",
          "explanation_vi": "Từ \"invade\" chỉ việc vi khuẩn xâm nhập và chiếm lấy các tế bào lông rễ cây, có nghĩa gần nhất với \"occupy\" (chiếm đóng, thâm nhập vào không gian).",
          "paraphrase_analysis": {
            "question_phrase": "invade",
            "passage_phrase": "invade the root hairs",
            "explanation": "Xâm nhập vào rễ cây."
          }
        },
        {
          "id": "hcmue_r04_q28",
          "type": "inference",
          "question_text": "Which of the following best expresses the essential information in the highlighted sentence? Incorrect answer choices change the meaning in important ways or leave out essential information.",
          "options": [
            {
              "key": "A",
              "text": "The ability to grow legumes with little nitrogen is highly valuable."
            },
            {
              "key": "B",
              "text": "Legumes do not need much nitrogen to develop and grow strong."
            },
            {
              "key": "C",
              "text": "The farming system makes huge demands on the nitrogen level in the ground."
            },
            {
              "key": "D",
              "text": "Agriculture creates a great need for legumes and their produce."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 4,
          "clue_sentence": "This system is the most important for agriculture as many legumes are then able to grow vigorously under nitrogen deficient conditions, contributing nitrogen to the farming system or as green manure included in the soil.",
          "explanation_vi": "Câu gốc nêu bật tầm quan trọng của hệ thống này đối với nông nghiệp vì các loại đậu có thể phát triển mạnh trong điều kiện thiếu nitơ, đóng góp nitơ cho hệ thống canh tác. Đáp án A tóm tắt chính xác ý nghĩa này.",
          "paraphrase_analysis": {
            "question_phrase": "grow vigorously under nitrogen deficient conditions",
            "passage_phrase": "grow legumes with little nitrogen",
            "explanation": "Trồng cây họ đậu trong điều kiện thiếu hụt nitơ rất có giá trị cho nông nghiệp."
          }
        },
        {
          "id": "hcmue_r04_q29",
          "type": "factual_detail",
          "question_text": "According to paragraph 8, which of the following is characteristic of the Haber-Bosch process?",
          "options": [
            {
              "key": "A",
              "text": "Producing low amount of Ammonia"
            },
            {
              "key": "B",
              "text": "Using extremely high pressures"
            },
            {
              "key": "C",
              "text": "Reducing the supply of nitrogen compounds"
            },
            {
              "key": "D",
              "text": "Leading to widespread use during World War I"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 7,
          "clue_sentence": "It is named after Fritz Haber and Carl Bosch, who determined that nitrogen from the air could be combined with nitrogen under enormously high pressures and fairly high temperatures in the presence of an active mechanism to produce an extremely high quantity of ammonia.",
          "explanation_vi": "Đoạn 8 nêu rõ quá trình Haber-Bosch sử dụng áp suất cực cao (enormously high pressures) để tạo ra lượng lớn amoniắc. Do đó, B là đáp án chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "Using extremely high pressures",
            "passage_phrase": "under enormously high pressures",
            "explanation": "Sử dụng áp suất cực kỳ cao tương ứng với phương án B."
          }
        },
        {
          "id": "hcmue_r04_q30",
          "type": "sentence_insertion",
          "question_text": "Look at the four squares [ ] that indicate where the following sentence can be added to the passage.\n\n*However, the Haber-Bosch process which created ammonia from nitrogen and hydrogen is the most cost-effective nitrogen fixation process known.*\n\nWhere would the sentence best fit?",
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
          "clue_paragraph_index": 7,
          "clue_sentence": "[C] It is named after Fritz Haber and Carl Bosch, who determined that nitrogen from the air could be combined with nitrogen under enormously high pressures and fairly high temperatures in the presence of an active mechanism to produce an extremely high quantity of ammonia.",
          "explanation_vi": "Vị trí [C] là điểm hoàn hảo vì câu trước đó nói về việc các phương pháp kết hợp oxy-nitơ bị hủy bỏ do tốn kém, tiếp theo câu chèn giới thiệu quy trình Haber-Bosch hiệu quả về chi phí, rồi đến câu giải thích chi tiết tên gọi đặt theo Fritz Haber và Carl Bosch.",
          "paraphrase_analysis": {
            "question_phrase": "Haber-Bosch process ... is named after Fritz Haber and Carl Bosch",
            "passage_phrase": "[C] It is named after...",
            "explanation": "Câu chèn giới thiệu về quy trình Haber-Bosch trước khi câu sau giải thích về nguồn gốc tên gọi của nó."
          }
        }
      ],
      "id": "hcmue_r04_p3"
    },
    {
      "title": "Passage 4: Women's Suffrage in Great Britain and the United States",
      "topic": "History & Culture",
      "word_count": 685,
      "difficulty": "C1",
      "content_paragraphs": [
        "Throughout Western civilization, women's suffrage and the progression of these rights have played a pivotal role in its history. The best example of how these rights have **progressed** is in two nations that share a common history, Great Britain and the United States of America. **[A]** In England, the suffrage movement began in 1866 when prominent women's rights reformers gathered over 1,500 signatures on a petition to Parliament appealing for the right to vote. **[B]** However, significant headway had not been made yet. Women's rights activists soon grew combative and thus made certain that suffrage was a central issue. **[C]** In America, due to the Civil War, women's suffrage was temporarily halted. However, from 1876, campaigns, referendums, and gatherings were organized and carried out. **[D]**",
        "The influence of Great Britain on the United States cannot be understated, yet there are both significant differences and similarities in how suffrage rights have progressed and evolved within each of these nations. In both countries, suffrage was based on class, race, nation, and gender. The suffragists were outside of the political establishment, campaigning alone and without support. They were predominately white and middle class in both countries, and their arguments reflected their class. In the first phase of the two countries, the arguments for suffrage focused on equality, and then turned to women's contribution to nation building after World War I.",
        "Feudalism and hereditary rule predated the establishment of limited suffrage in Great Britain. Aspects of this system remained for a significant period of time with only the wealthy and land-owning males allowed to vote. This system was based on the principles that the wealthy would vote in the interests of the nation, just as the monarchy of Britain would rule in the interest of all its subjects. This distributive system of power played an important role in the history of the United States.",
        "English landowners asserted **their** right to vote based on their personal wealth. **Aspects of this trend are clearly evident in America**. In 1776, a clause that guaranteed voting rights for white, male landowners was included in the United States Declaration of Independence. This was identical to the suffrage rights in Great Britain at that time in history. Voting was generally perceived not as a right, but as a privilege that only those who owned land could exercise.",
        "By 1786, the United States Constitution had been amended to give individual states the power to establish their own suffrage rights. As a result of this, in 1791, Vermont passed a law declaring that all white males, regardless of whether they possessed property or not, could vote. In contrast, it was not until the Chartist movement in Great Britain in the 1840s that a popular movement had demanded wider suffrage rights. The eventual failure of the Chartist movement in 1850 ensured that only one in every five adult males in England was entitled to vote. While popular suffrage reform **stalled** in Great Britain, it accelerated in America during this period. In the wake of the American Civil War, the Fifteenth Amendment to the Constitution granted African-American men the right to vote throughout the country. However, just as in England, women remained excluded by law from voting.",
        "In the aftermath of the first World War, suffrage rights were extended to include women. This change took place first in America in 1920 with the 1991 amendment to the Constitution. It was not until 1928 that voting rights between men and women in Great Britain were equalized. As suffrage rights have extended to include groups formerly excluded, this trend continues in the West. In 1971, a further amendment lowered the age of voting from 20 to 18 in America. Today, in Great Britain and the majority of Western nations, the voting age is 18.",
        "Initially, the progression of suffrage rights in America mirrored Great Britain's. The wealthy male landowners dominated voting and, therefore, political power, and voted only in their interests. In the wake of the American Civil War and the first World War, suffrage rights were extended to African-Americans, women, and individuals possessing no property, which boosted their status from lower class citizens to a higher level. Today, suffrage, in its universal form, plays a key role in democracies worldwide."
      ],
      "questions": [
        {
          "id": "hcmue_r04_q31",
          "type": "factual_detail",
          "question_text": "According to paragraph 1, why were 1,500 signatures gathered on a petition?",
          "options": [
            {
              "key": "A",
              "text": "Women sought the right to peaceful demonstrations."
            },
            {
              "key": "B",
              "text": "Women and men urged for the right to vote and own property."
            },
            {
              "key": "C",
              "text": "Women were requesting the right to vote."
            },
            {
              "key": "D",
              "text": "Collaboration was needed to facilitate women's right to vote."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "In England, the suffrage movement began in 1866 when prominent women's rights reformers gathered over 1,500 signatures on a petition to Parliament appealing for the right to vote.",
          "explanation_vi": "Đoạn 1 nêu rõ: 'In England, the suffrage movement began in 1866 when prominent women's rights reformers gathered over 1,500 signatures on a petition to Parliament appealing for the right to vote.' (Ở Anh, phong trào bầu cử bắt đầu vào năm 1866 khi các nhà cải cách quyền phụ nữ nổi tiếng thu thập hơn 1.500 chữ ký vào bản kiến nghị gửi Quốc hội để thỉnh cầu quyền bầu cử). Do đó, đáp án C là chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "Women were requesting the right to vote",
            "passage_phrase": "appealing for the right to vote",
            "explanation": "Cụm từ 'appealing for' tương đương với 'requesting' (thỉnh cầu/yêu cầu)."
          }
        },
        {
          "id": "hcmue_r04_q32",
          "type": "vocab_in_context",
          "question_text": "The word \"**progressed**\" in the passage is closest in meaning to __________.",
          "options": [
            {
              "key": "A",
              "text": "withheld"
            },
            {
              "key": "B",
              "text": "withstood"
            },
            {
              "key": "C",
              "text": "advanced"
            },
            {
              "key": "D",
              "text": "contained"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "Throughout Western civilization, women's suffrage and the progression of these rights have played a pivotal role in its history.",
          "explanation_vi": "Từ \"progressed\" có nghĩa là tiến triển, phát triển, tiến lên. Từ đồng nghĩa với nó trong các lựa chọn là \"advanced\" (tiến bộ, phát triển). Các từ khác như withheld (giữ lại), withstood (chống lại), contained (chứa đựng) không phù hợp.",
          "paraphrase_analysis": {
            "question_phrase": "progressed",
            "passage_phrase": "progression",
            "explanation": "Từ 'progressed' là dạng động từ của 'progression', mang nghĩa tiến bộ và phát triển, đồng nghĩa với 'advanced'."
          }
        },
        {
          "id": "hcmue_r04_q33",
          "type": "factual_detail",
          "question_text": "According to paragraph 2, which of the following was true of the suffragist movement?",
          "options": [
            {
              "key": "A",
              "text": "Suffragists had a chance to change their position in society."
            },
            {
              "key": "B",
              "text": "Women achieved their goal of winning full voting rights."
            },
            {
              "key": "C",
              "text": "It was primarily run by working class women."
            },
            {
              "key": "D",
              "text": "Most suffragists were moderate in their tactics."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "In the first phase of the two countries, the arguments for suffrage focused on equality, and then turned to women's contribution to nation building after World War I.",
          "explanation_vi": "Đoạn 2 thảo luận về việc các nhà vận động quyền bầu cử (suffragists) chủ yếu thuộc tầng lớp trung lưu, lập luận của họ chuyển từ bình đẳng sang đóng góp xây dựng đất nước, qua đó mở rộng các quyền để nâng cao vị thế trong xã hội. Các phương án B (đạt quyền bầu cử đầy đủ ngay từ pha đầu - sai), C (lao động nghèo - sai vì là trung lưu), D (ôn hòa - sai vì đoạn 1 nói họ trở nên quyết liệt/combative) đều không chính xác."
        },
        {
          "id": "hcmue_r04_q34",
          "type": "factual_detail",
          "question_text": "According to paragraph 4, the United States Declaration of Independence guaranteed_________.",
          "options": [
            {
              "key": "A",
              "text": "that African Americans could vote"
            },
            {
              "key": "B",
              "text": "that all 21-year olds could vote"
            },
            {
              "key": "C",
              "text": "that women could vote and hold political office"
            },
            {
              "key": "D",
              "text": "that only white, male landowners were allowed to vote"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 3,
          "clue_sentence": "In 1776, a clause that guaranteed voting rights for white, male landowners was included in the United States Declaration of Independence.",
          "explanation_vi": "Đoạn 4 nêu rõ: 'In 1776, a clause that guaranteed voting rights for white, male landowners was included in the United States Declaration of Independence.' Do đó, tuyên ngôn độc lập đảm bảo quyền bầu cử cho nam giới da trắng có sở hữu đất đai. Đáp án D chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "that only white, male landowners were allowed to vote",
            "passage_phrase": "guaranteed voting rights for white, male landowners",
            "explanation": "Khẳng định trong câu hỏi phản ánh chính xác nội dung câu văn trong bài."
          }
        },
        {
          "id": "hcmue_r04_q35",
          "type": "inference",
          "question_text": "The word \"**their**\" in the passage refers to____.",
          "options": [
            {
              "key": "A",
              "text": "Englishmen"
            },
            {
              "key": "B",
              "text": "British royalty"
            },
            {
              "key": "C",
              "text": "English landowners"
            },
            {
              "key": "D",
              "text": "American landowners"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "English landowners asserted **their** right to vote based on their personal wealth.",
          "explanation_vi": "Xét câu: 'English landowners asserted their right to vote based on their personal wealth.' Từ \"their\" ở đây quy chiếu về chủ ngữ của câu là \"English landowners\" (những chủ đất người Anh). Do đó, đáp án C là đúng.",
          "paraphrase_analysis": {
            "question_phrase": "their",
            "passage_phrase": "English landowners",
            "explanation": "Đại từ sở hữu 'their' thay thế cho danh từ 'English landowners'."
          }
        },
        {
          "id": "hcmue_r04_q36",
          "type": "inference",
          "question_text": "Why does the author mention that \"**Aspects of this trend are clearly evident in America**\"?",
          "options": [
            {
              "key": "A",
              "text": "To argue that the right to vote only was exercised by the wealthy and elite"
            },
            {
              "key": "B",
              "text": "To provide evidence that voting was not a right only for those who owned land"
            },
            {
              "key": "C",
              "text": "To show that the right to voting privileges only was granted to wealthy male property holders"
            },
            {
              "key": "D",
              "text": "To support the claim that the right to vote was an attribute of U.S. citizenship"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "English landowners asserted **their** right to vote based on their personal wealth. **Aspects of this trend are clearly evident in America**.",
          "explanation_vi": "Tác giả nhắc đến xu hướng này ở Mỹ (chủ đất da trắng nam giới mới được bầu cử theo Tuyên ngôn Độc lập) nhằm minh họa rằng quyền bầu cử ban đầu chỉ được trao cho những người nam giới giàu có sở hữu tài sản, tương tự như ở Anh. Do đó, đáp án C là chính xác."
        },
        {
          "id": "hcmue_r04_q37",
          "type": "vocab_in_context",
          "question_text": "The word \"**stalled**\" in the passage is closest in meaning to____.",
          "options": [
            {
              "key": "A",
              "text": "prevented"
            },
            {
              "key": "B",
              "text": "profited"
            },
            {
              "key": "C",
              "text": "contributed"
            },
            {
              "key": "D",
              "text": "halted"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 4,
          "clue_sentence": "While popular suffrage reform **stalled** in Great Britain, it accelerated in America during this period.",
          "explanation_vi": "Từ \"stalled\" có nghĩa là bị đình trệ, chậm lại, dừng lại. Từ đồng nghĩa với nó trong các lựa chọn là \"halted\" (tạm dừng, đình chỉ). Các từ như prevented (ngăn chặn), profited (thu lợi), contributed (đóng góp) không đồng nghĩa.",
          "paraphrase_analysis": {
            "question_phrase": "stalled",
            "passage_phrase": "stalled",
            "explanation": "Từ 'stalled' tương đương với 'halted' trong việc chỉ sự ngưng trệ, chậm lại của cải cách."
          }
        },
        {
          "id": "hcmue_r04_q38",
          "type": "inference",
          "question_text": "Which of the following can be inferred from the passage about the Chartist movement?",
          "options": [
            {
              "key": "A",
              "text": "Suffrage rights became the standard and expanded to include people of middle Eastern descent after the Chartist movement failed."
            },
            {
              "key": "B",
              "text": "The Chartist movement was quashed by a group of hostile forces who were opposed to progression."
            },
            {
              "key": "C",
              "text": "The Chartist movement helped ensure that only woman could vote."
            },
            {
              "key": "D",
              "text": "The progression of suffrage rights started to slow after the Chartist movement failed."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 4,
          "clue_sentence": "The eventual failure of the Chartist movement in 1850 ensured that only one in every five adult males in England was entitled to vote. While popular suffrage reform **stalled** in Great Britain, it accelerated in America during this period.",
          "explanation_vi": "Đoạn 4 nêu việc phong trào Chartist thất bại năm 1850 dẫn đến việc cải cách quyền bầu cử phổ thông ở Anh bị đình trệ (stalled), chỉ có 1/5 nam giới trưởng thành được bỏ phiếu. Điều này suy ra sự tiến triển của quyền bầu cử ở Anh đã chậm lại/bị đình trệ sau thất bại đó. Đáp án D chính xác."
        },
        {
          "id": "hcmue_r04_q39",
          "type": "main_idea",
          "question_text": "Which of the following best expresses the essential information in the highlighted sentence? Incorrect answer choices change the meaning in important ways or leave out essential information.",
          "options": [
            {
              "key": "A",
              "text": "In the period following the Civil War and World War I, voting rights were extended to most minorities."
            },
            {
              "key": "B",
              "text": "No one could vote in Great Britain unless they owned land, were white, and could read."
            },
            {
              "key": "C",
              "text": "War in Europe and America led many countries to disallow people of color the right to vote."
            },
            {
              "key": "D",
              "text": "Voting has always been considered a privilege in most Western countries."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 6,
          "clue_sentence": "In the wake of the American Civil War and the first World War, suffrage rights were extended to African-Americans, women, and individuals possessing no property, which boosted their status from lower class citizens to a higher level.",
          "explanation_vi": "Câu cần tóm tắt (được đánh dấu nổi bật trong đoạn cuối): 'In the wake of the American Civil War and the first World War, suffrage rights were extended to African-Americans, women, and individuals possessing no property...' tương ứng với việc sau Nội chiến và Thế chiến I, quyền bầu cử được mở rộng cho các nhóm thiểu số và phụ nữ/người không có tài sản (A). Các đáp án khác sai lệch về nội dung hoặc bóp méo thông tin."
        },
        {
          "id": "hcmue_r04_q40",
          "type": "sentence_insertion",
          "question_text": "Look at the four squares [ ] that indicate where the following sentence can be added to the passage.\n\n*American suffragists, however, were not as aggressive as their British counterparts.*\n\nWhere would the sentence best fit?",
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
          "clue_paragraph_index": 0,
          "clue_sentence": "Women's rights activists soon grew combative and thus made certain that suffrage was a central issue. **[C]** In America, due to the Civil War, women's suffrage was temporarily halted.",
          "explanation_vi": "Câu cần chèn nói về việc những người vận động quyền bầu cử ở Mỹ không quyết liệt/hung hăng bằng những người đồng cấp ở Anh. Vị trí [C] là hoàn toàn phù hợp vì câu trước đó nói về phong trào ở Anh (phụ nữ Anh trở nên quyết liệt - combative), và ngay sau [C] là câu chuyển sang tình hình ở Mỹ (In America, due to the Civil War...)."
        }
      ],
      "id": "hcmue_r04_p4"
    }
  ]
};
