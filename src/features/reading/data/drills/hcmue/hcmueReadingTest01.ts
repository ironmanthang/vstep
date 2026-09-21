import type { ReadingTest } from '../../../../../types/schemas';

/**
 * Authentic VSTEP Reading Practice Drill 1 (HCMUE Standard)
 * Source: "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017), Test 1 Reading (PDF Pages 11–24), Key page 145 (Book p. 146)
 * Format: 4 Passages, 40 Questions, 60 Minutes.
 */
export const HCMUE_READING_TEST_01: ReadingTest = {
  "id": "hcmue_read_test_01",
  "title": "VSTEP Reading Practice Drill 1 (Chuẩn ĐH Sư Phạm TP.HCM)",
  "duration_minutes": 60,
  "difficulty": "B2",
  "passages": [
    {
      "title": "Passage 1: Great Horned Owls",
      "topic": "Animal Behavior",
      "word_count": 343,
      "difficulty": "B1",
      "content_paragraphs": [
        "It takes a long time to raise a family of owlets, so the great horned owl begins early in the year. In January and February, or as late as March in the North, the male calls to the female with **a resonant hoot**. The female is larger than the male. She sometimes reaches a body length of twenty-two to twenty-four inches, with a wingspread up to fifty inches. To impress her, the male does a strange courtship dance. He bobs. He bows. He ruffles his feathers and hops around with an important air. He flutters from limb to limb and makes flying sorties into the air. Sometimes he returns with an offering of food. They share the repast, after which she joins the dance, hopping and bobbing about as though keeping time to the beat of an inner drum.",
        "Owls are poor home builders. They prefer to nest in a large hollow in a tree or even to occupy the deserted nest of a hawk or crow. These structures are large and rough, built of sticks and bark and lined with leaves and feathers. Sometimes owls nest on a rocky ledge, or even on the bare ground.",
        "The mother lays two or three round, dull white eggs. Then she stoically settles herself on the nest and spreads her feather skirts about her to protect her **precious charges** from snow and cold. It is five weeks before the first downy white owlet pecks its way out of the shell. As the young birds feather out, **they** look like wise old men with their wide eyes and quizzical expressions. They clamor for food and keep the parents busy supplying mice, squirrels, rabbits, crayfish, and beetles. Later in the season baby crows are taken. Migrating songsters, waterfowl, and game birds all fall prey to the hungry family. It is nearly ten weeks before fledglings leave the nest to search for their own food. The parent birds **weary of** family life by November and drive the young owls away to establish hunting ranges of their own."
      ],
      "questions": [
        {
          "id": "hcmue_r01_q01",
          "type": "main_idea",
          "question_text": "What is the topic of this passage?",
          "options": [
            {
              "key": "A",
              "text": "Raising a family of great horned owls"
            },
            {
              "key": "B",
              "text": "Mating rituals of great horned owls"
            },
            {
              "key": "C",
              "text": "Nest building of great horned owls"
            },
            {
              "key": "D",
              "text": "Habits of young great horned owls"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "It takes a long time to raise a family of owlets, so the great horned owl begins early in the year.",
          "explanation_vi": "Toàn bộ bài đọc miêu tả quá trình nuôi dưỡng gia đình chim cú sừng lớn, từ giai đoạn tán tỉnh, làm tổ, ấp trứng cho đến khi nuôi con trưởng thành và xua chúng đi. Do đó, chủ đề chung của bài là quá trình nuôi dưỡng gia đình của loài cú này (Raising a family of great horned owls)."
        },
        {
          "id": "hcmue_r01_q02",
          "type": "vocab_in_context",
          "question_text": "The phrase \"**a resonant hoot**\" in the passage is closest in meaning to _____.",
          "options": [
            {
              "key": "A",
              "text": "an instrument"
            },
            {
              "key": "B",
              "text": "a sound"
            },
            {
              "key": "C",
              "text": "a movement"
            },
            {
              "key": "D",
              "text": "an offering of food"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "In January and February, or as late as March in the North, the male calls to the female with **a resonant hoot**.",
          "explanation_vi": "Từ \"hoot\" chỉ tiếng kêu của con cú, do đó \"a resonant hoot\" là một âm thanh (a sound).",
          "paraphrase_analysis": {
            "question_phrase": "a resonant hoot",
            "passage_phrase": "calls to the female with a resonant hoot",
            "explanation": "Hoot là tiếng kêu của chim cú, thuộc nhóm từ chỉ âm thanh."
          }
        },
        {
          "id": "hcmue_r01_q03",
          "type": "inference",
          "question_text": "It can be inferred from the passage that the courtship of great horned owls _____.",
          "options": [
            {
              "key": "A",
              "text": "takes place on the ground"
            },
            {
              "key": "B",
              "text": "is an active process"
            },
            {
              "key": "C",
              "text": "happens in the fall"
            },
            {
              "key": "D",
              "text": "involves the male alone"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "He bobs. He bows. He ruffles his feathers and hops around with an important air. He flutters from limb to limb and makes flying sorties into the air.",
          "explanation_vi": "Đoạn 1 mô tả cuộc tán tỉnh bao gồm rất nhiều hành động như nhún nhảy, cúi chào, xù lông, bay từ cành này sang cành khác và chim mái cũng tham gia nhảy múa. Điều này cho thấy nghi thức tán tỉnh là một quá trình rất sôi nổi/năng động (an active process)."
        },
        {
          "id": "hcmue_r01_q04",
          "type": "factual_detail",
          "question_text": "According to the passage, great horned owls _____.",
          "options": [
            {
              "key": "A",
              "text": "are discriminate nest builders"
            },
            {
              "key": "B",
              "text": "need big nests for their numerous eggs"
            },
            {
              "key": "C",
              "text": "may inhabit a previously used nest"
            },
            {
              "key": "D",
              "text": "build nests on tree limbs"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "They prefer to nest in a large hollow in a tree or even to occupy the deserted nest of a hawk or crow.",
          "explanation_vi": "Trong đoạn 2 có đề cập cú sừng lớn thích ở trong hốc cây lớn hoặc chiếm tổ bỏ hoang của diều hâu/quạ (occupy the deserted nest of a hawk or crow), tương ứng với việc sử dụng tổ đã từng được dùng trước đó (inhabit a previously used nest)."
        },
        {
          "id": "hcmue_r01_q05",
          "type": "factual_detail",
          "question_text": "According to the passage, which of the following is the mother owl's job?",
          "options": [
            {
              "key": "A",
              "text": "To initiate the courtship ritual"
            },
            {
              "key": "B",
              "text": "To feed the young"
            },
            {
              "key": "C",
              "text": "To sit on the nest"
            },
            {
              "key": "D",
              "text": "To build the nest"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "Then she stoically settles herself on the nest and spreads her feather skirts about her to protect her **precious charges** from snow and cold.",
          "explanation_vi": "Đoạn 3 ghi rõ sau khi đẻ trứng, chim mẹ ngồi lên tổ (settles herself on the nest) để bảo vệ trứng khỏi tuyết và lạnh. Do đó nhiệm vụ của chim mẹ là ngồi trên tổ (To sit on the nest)."
        },
        {
          "id": "hcmue_r01_q06",
          "type": "vocab_in_context",
          "question_text": "The phrase \"**precious charges**\" in paragraph 3 refers to ________.",
          "options": [
            {
              "key": "A",
              "text": "the eggs"
            },
            {
              "key": "B",
              "text": "the nest"
            },
            {
              "key": "C",
              "text": "the hawks and crows"
            },
            {
              "key": "D",
              "text": "other nesting owls"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "The mother lays two or three round, dull white eggs. Then she stoically settles herself on the nest and spreads her feather skirts about her to protect her **precious charges** from snow and cold.",
          "explanation_vi": "Cụm \"precious charges\" ngay sau câu đẻ trứng dùng để chỉ những quả trứng mà chim mẹ đang bảo vệ khỏi cái lạnh."
        },
        {
          "id": "hcmue_r01_q07",
          "type": "negative_fact",
          "question_text": "According to the passage, young owlets eat everything EXCEPT ________.",
          "options": [
            {
              "key": "A",
              "text": "other small birds"
            },
            {
              "key": "B",
              "text": "insects"
            },
            {
              "key": "C",
              "text": "small mammals"
            },
            {
              "key": "D",
              "text": "nuts and seeds"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "They clamor for food and keep the parents busy supplying mice, squirrels, rabbits, crayfish, and beetles.",
          "explanation_vi": "Đoạn 3 liệt kê thức ăn của cú con gồm động vật nhỏ (chuột, thỏ, sóc), côn trùng (bọ bọ, tôm bọ), các loài chim khác (quạ, chim di cư, thủy cầm). Hạt và quả (nuts and seeds) không được nhắc đến."
        },
        {
          "id": "hcmue_r01_q08",
          "type": "vocab_in_context",
          "question_text": "The word \"**they**\" in the passage refers to ________.",
          "options": [
            {
              "key": "A",
              "text": "the wise old men"
            },
            {
              "key": "B",
              "text": "the adult birds"
            },
            {
              "key": "C",
              "text": "the young birds"
            },
            {
              "key": "D",
              "text": "the prey"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "As the young birds feather out, **they** look like wise old men with their wide eyes and quizzical expressions.",
          "explanation_vi": "Từ \"they\" thay thế cho chủ ngữ \"the young birds\" ở vế trước."
        },
        {
          "id": "hcmue_r01_q09",
          "type": "inference",
          "question_text": "What can be inferred from the passage about the adult parents of the young great horned owls?",
          "options": [
            {
              "key": "A",
              "text": "They are sorry to see their young leave home."
            },
            {
              "key": "B",
              "text": "They are lazy and careless about feeding the small owlets."
            },
            {
              "key": "C",
              "text": "They probably don't see their young after November."
            },
            {
              "key": "D",
              "text": "They don't eat while they are feeding their young."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "The parent birds **weary of** family life by November and drive the young owls away to establish hunting ranges of their own.",
          "explanation_vi": "Đoạn cuối viết đến tháng 11, chim bố mẹ mệt mỏi với cuộc sống gia đình và đuổi chim con đi tự lập. Có thể suy luận rằng sau tháng 11 chim bố mẹ nhiều khả năng không gặp lại chim con nữa."
        },
        {
          "id": "hcmue_r01_q10",
          "type": "vocab_in_context",
          "question_text": "The phrase \"**weary of**\" in the passage is closest in meaning to ________.",
          "options": [
            {
              "key": "A",
              "text": "tire of"
            },
            {
              "key": "B",
              "text": "become sad about"
            },
            {
              "key": "C",
              "text": "support"
            },
            {
              "key": "D",
              "text": "are attracted to"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "The parent birds **weary of** family life by November and drive the young owls away to establish hunting ranges of their own.",
          "explanation_vi": "Cụm \"weary of\" có nghĩa là mệt mỏi, chán nản với cái gì, đồng nghĩa với \"tire of\"."
        }
      ],
      "id": "hcmue_r01_p1"
    },
    {
      "title": "Passage 2: Overland Trek to the West",
      "topic": "History & Culture",
      "word_count": 315,
      "difficulty": "B2",
      "content_paragraphs": [
        "In the early 1800s, to reach the **jump-off point** for the West, a family from the East of the United States could either buy steamboat passage to Missouri for themselves, their wagons, and their livestock or - as happened more often- simply pile everything into a wagon, hitch up a team, and begin their overland trek right in their front yard.",
        "Along the macadamized roads and turnpikes east of the Missouri River, travel was comparatively fast, camping easy, and supplies plentiful. Then, in one river town or another, the **neophyte** emigrants would pause to lay in provisions. For outfitting purposes, the town of Independence had been **preeminent** ever since 1827, but the rising momentum of pioneer emigration had produced some rival jump-off points. Westport and Fort Leavenworth flourished a few miles upriver. St. Joseph had sprung up 55 miles to the northwest; in fact, emigrants who went to Missouri by riverboat could save four days on the trail by staying on the paddle-wheelers to St. Joe before **striking** overland.",
        "At whatever jump-off point they chose, the emigrants studied guidebooks and directions, asked questions of others as green as themselves, and made their final decisions about outfitting. They had various, sometimes conflicting, options. For example, either pack animals or two-wheel carts or wagons could be used for the overland crossing. A family man usually chose the wagon. It was the costliest and slowest of the three, but it provided space and shelter for children and for a wife who likely as not was pregnant. Everybody knew that a top-heavy covered wagon might blow over in a prairie wind or be overturned by mountain rocks, that it might mire in river mud or sink to its hubs in desert sand - but maybe if those things happened on this trip, they would happen to someone else. Anyway, most pioneers, with their farm background, were used to wagons."
      ],
      "questions": [
        {
          "id": "hcmue_r01_q11",
          "type": "main_idea",
          "question_text": "What is the topic of this passage?",
          "options": [
            {
              "key": "A",
              "text": "Important river towns"
            },
            {
              "key": "B",
              "text": "Getting started on the trip west"
            },
            {
              "key": "C",
              "text": "The advantages of traveling by wagon"
            },
            {
              "key": "D",
              "text": "Choosing a point of departure"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "In the early 1800s, to reach the **jump-off point** for the West, a family from the East of the United States could either buy steamboat passage to Missouri for themselves, their wagons, and their livestock or - as happened more often- simply pile everything into a wagon, hitch up a team, and begin their overland trek right in their front yard.",
          "explanation_vi": "Đoạn văn mô tả quá trình chuẩn bị và bắt đầu cuộc hành trình về phía Tây của các gia đình người Mỹ ở thế kỷ 19, bao gồm việc lựa chọn điểm xuất phát, chuẩn bị nhu yếu phẩm và lựa chọn phương tiện di chuyển. Do đó, chủ đề phù hợp nhất là việc bắt đầu chuyến đi về phía Tây."
        },
        {
          "id": "hcmue_r01_q12",
          "type": "negative_fact",
          "question_text": "All of the following can be inferred from the passage about travel east of the Missouri EXCEPT that it ______.",
          "options": [
            {
              "key": "A",
              "text": "was faster than in the West"
            },
            {
              "key": "B",
              "text": "was easier than in the West"
            },
            {
              "key": "C",
              "text": "took place on good roads"
            },
            {
              "key": "D",
              "text": "was usually by steamboat"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "Along the macadamized roads and turnpikes east of the Missouri River, travel was comparatively fast, camping easy, and supplies plentiful.",
          "explanation_vi": "Đoạn văn cho biết việc di chuyển ở phía đông sông Missouri diễn ra trên các con đường rải đá (macadamized roads) và đường thu phí (turnpikes), giúp việc đi lại tương đối nhanh và dễ dàng hơn. Tuy nhiên, không có thông tin nào cho thấy việc di chuyển ở khu vực này chủ yếu bằng tàu thủy (steamboat), vì nhiều người chỉ đơn giản là chất đồ lên xe ngựa và đi ngay từ sân nhà họ."
        },
        {
          "id": "hcmue_r01_q13",
          "type": "vocab_in_context",
          "question_text": "The phrase \"**jump-off point**\" in the passage is closest in meaning to ______.",
          "options": [
            {
              "key": "A",
              "text": "a bridge across a river"
            },
            {
              "key": "B",
              "text": "a point of departure"
            },
            {
              "key": "C",
              "text": "a gathering place"
            },
            {
              "key": "D",
              "text": "a trading post"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "In the early 1800s, to reach the **jump-off point** for the West, a family from the East of the United States could either buy steamboat passage to Missouri for themselves, their wagons, and their livestock or - as happened more often- simply pile everything into a wagon, hitch up a team, and begin their overland trek right in their front yard.",
          "explanation_vi": "Cụm từ \"jump-off point\" chỉ địa điểm xuất phát hoặc điểm khởi hành của một cuộc hành trình dài, tương đương với \"a point of departure\"."
        },
        {
          "id": "hcmue_r01_q14",
          "type": "inference",
          "question_text": "Which of the cities that served as a jump-off point can be inferred from the passage to be farthest west?",
          "options": [
            {
              "key": "A",
              "text": "Independence"
            },
            {
              "key": "B",
              "text": "St. Joseph"
            },
            {
              "key": "C",
              "text": "Westport"
            },
            {
              "key": "D",
              "text": "Fort Leavenworth"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "St. Joseph had sprung up 55 miles to the northwest; in fact, emigrants who went to Missouri by riverboat could save four days on the trail by staying on the paddle-wheelers to St. Joe before **striking** overland.",
          "explanation_vi": "Đoạn văn cho biết St. Joseph nằm cách 55 dặm về phía tây bắc (northwest) và việc đi tàu thủy đến đây giúp người di cư tiết kiệm được 4 ngày đi đường bộ. Điều này chứng tỏ St. Joseph nằm xa hơn về phía Tây so với các điểm xuất phát khác."
        },
        {
          "id": "hcmue_r01_q15",
          "type": "vocab_in_context",
          "question_text": "The word \"**preeminent**\" in the passage is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "oldest"
            },
            {
              "key": "B",
              "text": "superior"
            },
            {
              "key": "C",
              "text": "most easily reached"
            },
            {
              "key": "D",
              "text": "closest"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "For outfitting purposes, the town of Independence had been **preeminent** ever since 1827, but the rising momentum of pioneer emigration had produced some rival jump-off points.",
          "explanation_vi": "Từ \"preeminent\" có nghĩa là ưu thế vượt trội, nổi bật nhất, xuất sắc nhất, gần nghĩa nhất với \"superior\" (vượt trội, ưu việt)."
        },
        {
          "id": "hcmue_r01_q16",
          "type": "inference",
          "question_text": "The author implies in the passage that the early emigrants",
          "options": [
            {
              "key": "A",
              "text": "knew a lot about travel"
            },
            {
              "key": "B",
              "text": "were well stocked with provisions when they left their homes"
            },
            {
              "key": "C",
              "text": "left from the same place in Missouri"
            },
            {
              "key": "D",
              "text": "preferred wagon travel to other types of travel"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "Anyway, most pioneers, with their farm background, were used to wagons.",
          "explanation_vi": "Tác giả ngụ ý rằng những người di cư thời kỳ đầu ưa chuộng việc di chuyển bằng xe ngựa hơn các phương tiện khác vì họ đã quen thuộc với chúng từ cuộc sống làm nông trước đây (\"most pioneers, with their farm background, were used to wagons\")."
        },
        {
          "id": "hcmue_r01_q17",
          "type": "vocab_in_context",
          "question_text": "The word \"**neophyte**\" in the passage is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "eager"
            },
            {
              "key": "B",
              "text": "courageous"
            },
            {
              "key": "C",
              "text": "prosperous"
            },
            {
              "key": "D",
              "text": "inexperienced"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "Then, in one river town or another, the **neophyte** emigrants would pause to lay in provisions.",
          "explanation_vi": "Từ \"neophyte\" chỉ những người mới bắt đầu, chưa có kinh nghiệm. Ở đoạn sau, tác giả cũng mô tả họ là \"as green as themselves\" (non nớt, chưa có kinh nghiệm). Do đó, từ này gần nghĩa nhất với \"inexperienced\"."
        },
        {
          "id": "hcmue_r01_q18",
          "type": "negative_fact",
          "question_text": "All of the following were mentioned in the passage as options for modes of transportation from the Missouri River to the West EXCEPT",
          "options": [
            {
              "key": "A",
              "text": "a wagon"
            },
            {
              "key": "B",
              "text": "a riverboat"
            },
            {
              "key": "C",
              "text": "a pack animal"
            },
            {
              "key": "D",
              "text": "a two-wheel cart"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "For example, either pack animals or two-wheel carts or wagons could be used for the overland crossing.",
          "explanation_vi": "Đoạn văn đề cập đến ba phương tiện để băng qua lục địa (overland crossing) từ sông Missouri về phía Tây là: thú thồ hàng (pack animals), xe kéo hai bánh (two-wheel carts) và xe ngựa (wagons). Tàu thủy (riverboat) chỉ được dùng để di chuyển đến Missouri chứ không dùng để đi tiếp về phía Tây."
        },
        {
          "id": "hcmue_r01_q19",
          "type": "vocab_in_context",
          "question_text": "The word \"**striking**\" in the passage is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "hitting"
            },
            {
              "key": "B",
              "text": "orienting"
            },
            {
              "key": "C",
              "text": "departing"
            },
            {
              "key": "D",
              "text": "marking"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "St. Joseph had sprung up 55 miles to the northwest; in fact, emigrants who went to Missouri by riverboat could save four days on the trail by staying on the paddle-wheelers to St. Joe before **striking** overland.",
          "explanation_vi": "Cụm từ \"striking overland\" có nghĩa là bắt đầu lên đường đi bằng đường bộ, di chuyển sâu vào đất liền. Do đó, \"striking\" ở đây gần nghĩa nhất với \"departing\" (khởi hành, lên đường)."
        },
        {
          "id": "hcmue_r01_q20",
          "type": "negative_fact",
          "question_text": "All of the following features of the covered wagon made it unattractive to the emigrants EXCEPT",
          "options": [
            {
              "key": "A",
              "text": "speed at which it could travel"
            },
            {
              "key": "B",
              "text": "its bulk"
            },
            {
              "key": "C",
              "text": "its familiarity and size"
            },
            {
              "key": "D",
              "text": "its cost"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "It was the costliest and slowest of the three, but it provided space and shelter for children and for a wife who likely as not was pregnant.",
          "explanation_vi": "Các đặc điểm khiến xe ngựa không hấp dẫn là chi phí đắt đỏ (costliest), tốc độ chậm (slowest) và sự cồng kềnh dễ lật (bulk). Ngược lại, sự quen thuộc (familiarity) và kích thước rộng rãi cung cấp chỗ trú ẩn (size/space and shelter) là những điểm cộng thu hút người di cư chọn nó."
        }
      ],
      "id": "hcmue_r01_p2"
    },
    {
      "title": "Passage 3: The Royal Library of Alexandria",
      "topic": "History & Culture",
      "difficulty": "B2",
      "content_paragraphs": [
        "Alexander the Great commissioned the city of Alexandria to create a Mediterranean stronghold in Egypt to rival Rome and cities in Greece. He died before his idea came to fruition, but his successors built it into one of the greatest cities of the Hellenistic world. The Royal Library of Alexandria has achieved an almost mythical status among scholars of classical studies. As with many ancient topics, scholarship on the matter often conflicts and relies heavily on hearsay and supposition. We will examine the importance of the library during its heyday and how it operated.",
        "As with many ancient landmarks, there is much debate and controversy over Alexandria's library, especially regarding **its destruction**. The tale has been retold by countless historians and attributed to just as many different **factions** and rulers, not to profile this landmark of education, but as a tool for political slander. It is estimated that there are over 4000 writings regarding **its** destruction, yet very little data exists regarding the structure, layout, organization, administration, or whereabouts of the complex. The accuracy of the available information is suspect. However, 20th century scholars have reached some general consensus from the remaining sources.",
        "Most historians have come to the conclusion that the original library (also known as the Temple of the Muses) was commissioned by Ptolemy I, Alexander's key general. More accurately, it was commissioned by the Athenian exile Demetrius of Phaleron under Ptolemy I's patronage. Traditionally it was attributed to his son Ptolemy II. However, it was later shown that Demetrius was antagonistic toward Ptolemy II and did not survive for much of his reign. Ptolemy II can be seen as responsible for the fruition and completion of the library and museum complex. H.G. Wells asserts that Ptolemy and his son encouraged 'a blaze of knowledge and discovery at Alexandria' through their funding of the library and other endowments.",
        "The library itself was not a 'library' in the modern etymology. **In fact, the library was essentially a collection of scholars and scribes encouraged to expand scientific and philosophical wisdom and musings brought about because of the ambition and drive of Ptolemy I.** It was not the first institution of its type, developing about a half-century after Plato's Academy and Aristotle's Lyceum. About 30-50 scholars were probably permanently housed there, fed, and funded, first by the royal family, and later, according to an early Roman scroll, by public money. It served a religious, as well as an intellectual, function and it was the centerpiece of a so-called cult of the muses, governed by a priest.",
        "[A] The library's output was created through observation and deduction in math, medicine, astronomy, and geometry, the editing of texts and manuscripts, and debating various advances in Western knowledge. [B] For two or three generations, the scientific output at Alexandria was considerably good. Its achievements included the introduction of the first steam engine, the first star map, and an astoundingly accurate estimate of the Earth's diameter. [C] Famous scholars employed there included Euclid, Eratosthenes, Apollonius, and Hero. [D]",
        "The library may have consisted of a group of buildings, including lecture halls, study rooms, dining rooms, gardens, and an astronomical observatory. In organization of the library, it is believed that, in the time of Ptolemy II, the scrolls were haphazardly stored and grouped by general category. From the time of Callimachus onwards, they used an early iteration of a subject catalog. Subject divisions outlined by Callimachus included mathematics, medicine, astronomy, and geometry, as well as philology. At its peak, it is estimated about 600,000 scrolls were held within its walls, although that is likely an **overstatement**.",
        "The Ptolemys achieved their goal of creating the largest collection of its kind by varied and often forceful means. At the time of its founding, Greek libraries were usually collections of manuscripts by private individuals. Ptolemy had a vision to collect all accepted literature on all matters scientific, philosophical and spiritual. The library tried to get copies of all known books and would send agents far and wide to acquire them. Ptolemy III wrote a letter \"to all the world's sovereigns\" asking to borrow their books. On more than a few occasions, scribes made copies and kept the originals. Supposedly, all ships entering Alexandria's harbor were searched for books to copy.",
        "The Royal Library of Alexandria was created at an ideal time and place in world history. It was able to combine the deductive techniques of Greek thought toward the learning of other world cultures. As such, it holds a legendary position among historians as an important center of classical knowledge. Although much of the story has been buried with time and conflict, the importance and significance of its contributions are clear."
      ],
      "word_count": 810,
      "questions": [
        {
          "id": "hcmue_r01_q21",
          "type": "negative_fact",
          "question_text": "All of the following sentences express important ideas in the passage EXCEPT ________.",
          "options": [
            {
              "key": "A",
              "text": "The library was essentially a collection of scholars and scribes encouraged to expand scientific and philosophical wisdom."
            },
            {
              "key": "B",
              "text": "In the time of Callimachus, the scrolls were haphazardly stored and grouped by general category."
            },
            {
              "key": "C",
              "text": "It is estimated that there are over 4000 writings about its destruction, yet very little evidence exists."
            },
            {
              "key": "D",
              "text": "The library tried to get copies of all known books and would employ several methods of acquiring them."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 5,
          "clue_sentence": "In organization of the library, it is believed that, in the time of Ptolemy II, the scrolls were haphazardly stored and grouped by general category.",
          "explanation_vi": "Đáp án đúng là B vì đoạn 6 nêu rõ việc các cuộn giấy được cất giữ hỗn loạn diễn ra vào thời Ptolemy II, chứ không phải vào thời của Callimachus (thời Callimachus đã sử dụng danh mục theo chủ đề). Do đó, câu B miêu tả sai thời điểm."
        },
        {
          "id": "hcmue_r01_q22",
          "type": "vocab_in_context",
          "question_text": "The word \"**factions**\" in the passage is closest in meaning to ________.",
          "options": [
            {
              "key": "A",
              "text": "sections"
            },
            {
              "key": "B",
              "text": "insubordinates"
            },
            {
              "key": "C",
              "text": "cliques"
            },
            {
              "key": "D",
              "text": "conspiracies"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "The tale has been retold by countless historians and attributed to just as many different **factions** and rulers, not to profile this landmark of education, but as a tool for political slander.",
          "explanation_vi": "Từ \"factions\" trong ngữ cảnh này chỉ các phe phái, nhóm lợi ích hoặc bè phái chính trị đổ lỗi cho nhau. Từ đồng nghĩa gần nhất trong các lựa chọn là \"cliques\" (các bè phái/nhóm người)."
        },
        {
          "id": "hcmue_r01_q23",
          "type": "factual_detail",
          "question_text": "The word \"**its**\" in the passage refers to ________.",
          "options": [
            {
              "key": "A",
              "text": "data"
            },
            {
              "key": "B",
              "text": "education"
            },
            {
              "key": "C",
              "text": "the Royal Library of Alexandria"
            },
            {
              "key": "D",
              "text": "destruction"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "It is estimated that there are over 4000 writings regarding **its** destruction, yet very little data exists regarding the structure, layout, organization, administration, or whereabouts of the complex.",
          "explanation_vi": "Đại từ \"its\" trong cụm \"regarding its destruction\" ở đoạn 2 thay thế cho danh từ trung tâm của đoạn là Thư viện Hoàng gia Alexandria (the Royal Library of Alexandria). Các phương án khác (data, education, destruction) đều là các danh từ xung quanh trong ngữ cảnh."
        },
        {
          "id": "hcmue_r01_q24",
          "type": "main_idea",
          "question_text": "The author mentions \"**its destruction**\" in the passage in order to ________.",
          "options": [
            {
              "key": "A",
              "text": "introduce the idea that the destruction was caused by natural disaster"
            },
            {
              "key": "B",
              "text": "illustrate that there are so many arguments surrounding its demise and disappearance"
            },
            {
              "key": "C",
              "text": "indicate the difference between its destruction and other libraries destruction"
            },
            {
              "key": "D",
              "text": "highlight the difference between the library and other historic sites"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "As with many ancient landmarks, there is much debate and controversy over Alexandria's library, especially regarding **its destruction**.",
          "explanation_vi": "Tác giả nhắc đến \"its destruction\" nhằm minh họa rằng có rất nhiều tranh cãi, ý kiến trái chiều và sự quy trách nhiệm xung quanh sự sụp đổ và biến mất của nó."
        },
        {
          "id": "hcmue_r01_q25",
          "type": "inference",
          "question_text": "Which of the following best expresses the essential information in the highlighted sentence in the passage? Incorrect answer choices change the meaning in important ways or leave out essential information.",
          "options": [
            {
              "key": "A",
              "text": "Commissioned by Ptolemy I, the Royal Library was a place where people who wanted to learn gathered to study and record their philosophies."
            },
            {
              "key": "B",
              "text": "The library was a large building where students gathered to research and study."
            },
            {
              "key": "C",
              "text": "Philosophers often visited the library to further their studies."
            },
            {
              "key": "D",
              "text": "Many people gathered at the Royal Library in Alexandria in order to socialize with their friends."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 3,
          "clue_sentence": "The library itself was not a 'library' in the modern etymology. **In fact, the library was essentially a collection of scholars and scribes encouraged to expand scientific and philosophical wisdom and musings brought about because of the ambition and drive of Ptolemy I.**",
          "explanation_vi": "Câu tóm tắt tốt nhất thông tin cốt lõi (rằng thư viện thực chất là tập hợp các học giả, nhà chép sử do Ptolemy I thúc đẩy để mở rộng tri thức khoa học và triết học) chính là phương án A."
        },
        {
          "id": "hcmue_r01_q26",
          "type": "factual_detail",
          "question_text": "According to paragraph 6, what was true about the early iteration of a subject catalog?",
          "options": [
            {
              "key": "A",
              "text": "All the books were grouped within two general categories."
            },
            {
              "key": "B",
              "text": "The books were chosen for their innovation, thematic impact, and popular appeal."
            },
            {
              "key": "C",
              "text": "The librarians organized the collection of books systematically."
            },
            {
              "key": "D",
              "text": "The library achieved an astonishing collection and many developments."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 5,
          "clue_sentence": "From the time of Callimachus onwards, they used an early iteration of a subject catalog. Subject divisions outlined by Callimachus included mathematics, medicine, astronomy, and geometry, as well as philology.",
          "explanation_vi": "Đoạn 6 nêu rõ từ thời Callimachus trở đi, họ sử dụng danh mục chủ đề được phân chia theo các lĩnh vực cụ thể (toán học, y học, thiên văn học...), chứng tỏ bộ sưu tập đã được tổ chức một cách hệ thống."
        },
        {
          "id": "hcmue_r01_q27",
          "type": "vocab_in_context",
          "question_text": "The word \"**overstatement**\" in the passage is closest in meaning to ____________.",
          "options": [
            {
              "key": "A",
              "text": "estimation"
            },
            {
              "key": "B",
              "text": "falsehood"
            },
            {
              "key": "C",
              "text": "exaggeration"
            },
            {
              "key": "D",
              "text": "presumption"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 5,
          "clue_sentence": "At its peak, it is estimated about 600,000 scrolls were held within its walls, although that is likely an **overstatement**.",
          "explanation_vi": "Từ \"overstatement\" có nghĩa là sự phóng đại, nói quá lên. Do đó, từ đồng nghĩa chính xác nhất trong các phương án là \"exaggeration\"."
        },
        {
          "id": "hcmue_r01_q28",
          "type": "inference",
          "question_text": "Which of the following can be inferred about the Royal Library from the passage?",
          "options": [
            {
              "key": "A",
              "text": "Most of the manuscripts from the library are preserved in modem museums."
            },
            {
              "key": "B",
              "text": "Several writings from the library have been scanned and can be viewed on the Internet."
            },
            {
              "key": "C",
              "text": "Little of the manuscripts contained in the library are in existence today."
            },
            {
              "key": "D",
              "text": "The library is currently being reconstructed."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "As with many ancient topics, scholarship on the matter often conflicts and relies heavily on hearsay and supposition.",
          "explanation_vi": "Bài đọc chỉ ra rằng có rất nhiều tranh cãi, thông tin đáng ngờ và sự phá hủy bao trùm thư viện, đồng thời các học giả phải dựa vào tin đồn và giả thiết, từ đó suy luận ra rằng hiện nay rất ít bản thảo của thư viện còn tồn tại."
        },
        {
          "id": "hcmue_r01_q29",
          "type": "negative_fact",
          "question_text": "According to historians, all of the following were true about the Royal Library of Alexandria EXCEPT ______.",
          "options": [
            {
              "key": "A",
              "text": "It probably contained over 600,000 writings."
            },
            {
              "key": "B",
              "text": "Little is known of its exact location."
            },
            {
              "key": "C",
              "text": "It was responsible for the first star map."
            },
            {
              "key": "D",
              "text": "It was the largest and most magnificent library in history."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 4,
          "clue_sentence": "Its achievements included the introduction of the first steam engine, the first star map, and an astoundingly accurate estimate of the Earth's diameter.",
          "explanation_vi": "Bài đọc khẳng định thư viện đạt mục tiêu tạo ra bộ sưu tập lớn nhất *loại hình đó* (the largest collection of its kind), chứ không nói đó là thư viện lớn và tráng lệ nhất trong toàn bộ lịch sử loài người. Do đó câu D là đáp án ngoại trừ (EXCEPT)."
        },
        {
          "id": "hcmue_r01_q30",
          "type": "sentence_insertion",
          "question_text": "Look at the four squares [ ] that indicate where the following sentence can be added to the passage.\n\n*It remained an important intellectual center for over 500 years until numerous fires and other problems eroded its significance.*\n\n**Where would the sentence best fit?**",
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
          "clue_paragraph_index": 4,
          "clue_sentence": "[A] The library's output was created through observation and deduction in math, medicine, astronomy, and geometry, the editing of texts and manuscripts, and debating various advances in Western knowledge.",
          "explanation_vi": "Vị trí [D] là nơi thích hợp nhất để đặt câu nói về việc thư viện duy trì là trung tâm tri thức trong hơn 500 năm cho đến khi bị tàn phá, vì nó nối tiếp ngay sau đoạn liệt kê các thành tựu khoa học và các học giả nổi tiếng làm việc tại đây."
        }
      ],
      "id": "hcmue_r01_p3"
    },
    {
      "title": "Passage 4: The Pacific Islands and Ecosystems",
      "topic": "Environmental Science",
      "difficulty": "C1",
      "content_paragraphs": [
        "The Pacific Ocean contains approximately 20,000 to 30,000 islands. Islands, excluding Australia, that are south of the Tropic of Cancer are grouped into three divisions: Melanesia, Micronesia, and Polynesia.",
        "Melanesia includes the nation of Papua New Guinea, provinces of Indonesia, and the Solomon Islands. Micronesia means 'small islands,' most of which are north of the equator. Finally, Polynesia, which means 'many islands,' includes the Hawaiian Islands, Tonga, Tuvalu, and Easter Island, among others. Migrants from South East Asian cities were the first settlers. The next wave of migrants **populated** New Guinea, gradually spreading to Fiji. The last of the Pacific islands to be settled was Polynesia. Hawaii was discovered sometime between the 7th and 13th centuries.",
        "Bats were the only mammals on these islands until the arrival of the first humans. Birds adapted to environmental niches, like grazers and insectivores. Due to the cool and humid location, New Zealand lost plants and animals, like the giant flightless bird, that were intolerant of its climate. However, the extinction coincided with the arrival of the Melanesians, so **it** was probably caused by hunting and fires. Adding to that, mining and a natural drought destroyed a majority of the natural habitat. This was repeated on Easter Island, where early settlers wiped out 22 species of sea birds and land birds. By the time the Europeans had arrived, most of the plant life was extinct and nearly 30% of the forests were cleared.",
        "**The invasion of New Zealand by the Europeans** resulted in a complete transformation of the island, importing over 3,198 species of plants and animals and filling most of the wetlands. Australia also imported animals and plants from many Pacific island countries. Sheep, pigs, goats and foxes were brought to Australia, which further disrupted the native ecosystems. Many plants and animals are presently endangered.",
        "The plants and animals that inhabit Pacific islands are found nowhere else on earth. They are often adapted to specific habitats and live on a small part of a few islands. New Caledonia is an island that has been isolated from other lands for over 80 million years. 66 percent of the plant life there evolved on the island. Numerous plant species, unique in the world, are on a small area of one mountain and are represented by only a few **specimens**.",
        "This varied genetic heritage is of such scientific importance that New Caledonia has been listed as one of the ten hot spots where the primary forest is in danger of extinction. It also boasts 68 species of bird; the most diverse bird life in the Southwest Pacific.",
        "During the first Ice Age, ocean levels were much lower than they are at present. Levels in the shallow seas, now separating Asia from North America near the present-day Bering strait, dropped approximately 300 feet, creating 1,000 miles of grassland plain. Called the ‘Bering Land Bridge,’ this linked Asia and North America together. The Bering Sea has a long history of stable animal populations, despite the harsh environments, which sustain human life. Lemmings, ox, and mammoths all made the journey across the land bridge. Although mammoths have been extinct for quite a while now, the other two have remained.",
        "Pacific walruses inhabit shallow waters of the Bering Sea during winter. They congregate to feed on clams, their principal food. [A] This type of feeding releases nutrients into the water, providing food for starfish and increasing the roughness of the sea floor. [B] Actual impact of the ecology of bottom communities is unknown, but walruses, along with other animals like beavers and sea otters, have huge effects on the biological communities they occupy. [C] Animals such as seals, bowhead whales, and walruses are important for the subsistence of their community. [D]",
        "Pacific islands have the same pollution and over fishing problems as most countries. Destructive forms of fishing in Asian nations have taken their toll on marine animals such as birds and tuna. Many of these nations have now entered joint venture agreements to enable them to develop their marine resources more efficiently."
      ],
      "word_count": 655,
      "questions": [
        {
          "id": "hcmue_r01_q31",
          "type": "vocab_in_context",
          "question_text": "The word \"**populated**\" in the passage is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "inhabited"
            },
            {
              "key": "B",
              "text": "exiled"
            },
            {
              "key": "C",
              "text": "traveled"
            },
            {
              "key": "D",
              "text": "governed"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "The next wave of migrants **populated** New Guinea, gradually spreading to Fiji.",
          "explanation_vi": "Từ \"populated\" trong ngữ cảnh này mang nghĩa là có người đến sinh sống, định cư. Do đó, \"inhabited\" (có người ở, sinh sống) là từ đồng nghĩa chính xác nhất.",
          "paraphrase_analysis": {
            "question_phrase": "populated",
            "passage_phrase": "populated",
            "explanation": "To populate an area means to live there or inhabit it."
          }
        },
        {
          "id": "hcmue_r01_q32",
          "type": "inference",
          "question_text": "The word \"**it**\" in the passage refers to",
          "options": [
            {
              "key": "A",
              "text": "arrival"
            },
            {
              "key": "B",
              "text": "extinction"
            },
            {
              "key": "C",
              "text": "climate"
            },
            {
              "key": "D",
              "text": "hunting"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "However, the extinction coincided with the arrival of the Melanesians, so **it** was probably caused by hunting and",
          "explanation_vi": "Đại từ \"it\" ở đây quy chiếu về sự tuyệt chủng của các loài động thực vật (extinction) được nhắc đến ở ngay vế trước trong câu.",
          "paraphrase_analysis": {
            "question_phrase": "it",
            "passage_phrase": "the extinction",
            "explanation": "The pronoun 'it' replaces 'the extinction' to state that the extinction was probably caused by hunting and fires."
          }
        },
        {
          "id": "hcmue_r01_q33",
          "type": "factual_detail",
          "question_text": "Why does the author mention \"**The invasion of New Zealand by the Europeans**\" in the passage?",
          "options": [
            {
              "key": "A",
              "text": "To demonstrate its destructive effect on local ecosystems"
            },
            {
              "key": "B",
              "text": "To explain how many of New Zealand's species came into being"
            },
            {
              "key": "C",
              "text": "To show the lack of responsibility that early settlers had toward new places"
            },
            {
              "key": "D",
              "text": "To draw a comparison to the way Australia expanded in the Pacific"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 3,
          "clue_sentence": "**The invasion of New Zealand by the Europeans** resulted in a complete transformation of the island, importing over 3,198 species of plants and animals and filling most of the wetlands.",
          "explanation_vi": "Tác giả đề cập đến sự xâm chiếm New Zealand của người châu Âu nhằm minh họa cho tác động phá hủy và biến đổi hoàn toàn hệ sinh thái bản địa (nhập khẩu hàng nghìn loài, làm đầy các vùng đất ngập nước).",
          "paraphrase_analysis": {
            "question_phrase": "destructive effect on local ecosystems",
            "passage_phrase": "complete transformation of the island, importing over 3,198 species of plants and animals and filling most of the wetlands",
            "explanation": "European invasion transformed the island negatively by introducing invasive species and disrupting wetlands."
          }
        },
        {
          "id": "hcmue_r01_q34",
          "type": "factual_detail",
          "question_text": "According to paragraph 5, what is unique about the Pacific Islands?",
          "options": [
            {
              "key": "A",
              "text": "They have a long history of traditional management approaches for marine resources."
            },
            {
              "key": "B",
              "text": "They are home to rare and unique animals."
            },
            {
              "key": "C",
              "text": "They are made up of 66% plant life."
            },
            {
              "key": "D",
              "text": "They have all been damaged by European settlers."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 4,
          "clue_sentence": "The plants and animals that inhabit Pacific islands are found nowhere else on earth.",
          "explanation_vi": "Đoạn 5 nêu rõ rằng các loài thực vật và động vật sinh sống trên quần đảo Thái Bình Dương không thể tìm thấy ở bất kỳ nơi nào khác trên Trái Đất, tức là chúng quý hiếm và độc đáo.",
          "paraphrase_analysis": {
            "question_phrase": "home to rare and unique animals",
            "passage_phrase": "found nowhere else on earth",
            "explanation": "Animals and plants exclusive to the Pacific islands mean they are unique and rare globally."
          }
        },
        {
          "id": "hcmue_r01_q35",
          "type": "vocab_in_context",
          "question_text": "The word \"**specimens**\" in the passage is closest in meaning to ____.",
          "options": [
            {
              "key": "A",
              "text": "genres"
            },
            {
              "key": "B",
              "text": "features"
            },
            {
              "key": "C",
              "text": "examples"
            },
            {
              "key": "D",
              "text": "images"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 4,
          "clue_sentence": "Numerous plant species, unique in the world, are on a small area of one mountain and are represented by only a few **specimens**.",
          "explanation_vi": "Từ \"specimens\" (mẫu vật, cá thể đại diện) trong ngữ cảnh này đồng nghĩa với \"examples\" (ví dụ, cá thể tiêu biểu).",
          "paraphrase_analysis": {
            "question_phrase": "specimens",
            "passage_phrase": "specimens",
            "explanation": "Specimens refer to individual examples representing a species."
          }
        },
        {
          "id": "hcmue_r01_q36",
          "type": "factual_detail",
          "question_text": "According to paragraph 7, how has the Bering Sea aided life forms in the past?",
          "options": [
            {
              "key": "A",
              "text": "By providing creatures with plentiful food"
            },
            {
              "key": "B",
              "text": "By being home to a diverse and varied ecosystem"
            },
            {
              "key": "C",
              "text": "By allowing transit across the great iceshelves in the Americas"
            },
            {
              "key": "D",
              "text": "By keeping creatures cool and comfortable in the ice"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 6,
          "clue_sentence": "Called the ‘Bering Land Bridge,’ this linked Asia and North America together.",
          "explanation_vi": "Đoạn 7 đề cập đến Cầu đất liền Bering (Bering Land Bridge) nối liền Châu Á và Bắc Mỹ, cho phép các loài động vật di chuyển qua lại.",
          "paraphrase_analysis": {
            "question_phrase": "allowing transit across",
            "passage_phrase": "linked Asia and North America together",
            "explanation": "The land bridge created by lowered sea levels enabled animals to travel between continents."
          }
        },
        {
          "id": "hcmue_r01_q37",
          "type": "factual_detail",
          "question_text": "According to the passage, which of the following is true of walruses?",
          "options": [
            {
              "key": "A",
              "text": "They protect the surrounding ecosystem by preventing over-fishing."
            },
            {
              "key": "B",
              "text": "Their unique feeding habits enrich the ecosystem with nutrients."
            },
            {
              "key": "C",
              "text": "They are solitary animals which hunt and eat by themselves."
            },
            {
              "key": "D",
              "text": "They are usually found living in the deepest regions of the Bering Sea."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 7,
          "clue_sentence": "This type of feeding releases nutrients into the water, providing food for starfish and increasing the roughness of the sea floor.",
          "explanation_vi": "Đoạn 7 chỉ ra rằng cách kiếm ăn của hải mã (walruses) giải phóng chất dinh dưỡng vào nước, làm phong phú thêm hệ sinh thái.",
          "paraphrase_analysis": {
            "question_phrase": "feeding habits enrich the ecosystem with nutrients",
            "passage_phrase": "This type of feeding releases nutrients into the water",
            "explanation": "Walruses' feeding behavior releases nutrients into the water."
          }
        },
        {
          "id": "hcmue_r01_q38",
          "type": "inference",
          "question_text": "Which of the following best expresses the essential information in the highlighted sentence? Incorrect answer choices change the meaning in important ways or leave out essential information.",
          "options": [
            {
              "key": "A",
              "text": "Although ecological impacts are not known, many species are largely dependent on animals occupying a sub-level."
            },
            {
              "key": "B",
              "text": "The true biological diversity of all the walruses is revealed only below the species level."
            },
            {
              "key": "C",
              "text": "Beavers and otters are strongly related to the walrus family because there is a clear cause-effect relationship."
            },
            {
              "key": "D",
              "text": "There is a great deal that still needs to be learned about biological communities and ecosystems."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 7,
          "clue_sentence": "Actual impact of the ecology of bottom communities is unknown, but walruses, along with other animals like beavers and sea otters, have huge effects on the biological communities they occupy.",
          "explanation_vi": "Câu in đậm (trong bài là câu bắt đầu với 'Actual impact...') diễn tả ý rằng dù tác động sinh thái cụ thể chưa được biết rõ, nhưng hải mã và các loài khác có ảnh hưởng lớn đến cộng đồng sinh học của chúng.",
          "paraphrase_analysis": {
            "question_phrase": "Actual impact... is unknown, but... have huge effects",
            "passage_phrase": "Although ecological impacts are not known, many species are largely dependent on animals occupying a sub-level",
            "explanation": "Paraphrases the dual idea of unknown direct impact yet massive overall ecological effect."
          }
        },
        {
          "id": "hcmue_r01_q39",
          "type": "factual_detail",
          "question_text": "According to paragraph 9, what measures have been taken to protect sea creatures?",
          "options": [
            {
              "key": "A",
              "text": "Protection agencies have begun guarding areas known for high fish population."
            },
            {
              "key": "B",
              "text": "Destructive fishing methods such as drag-nets have been outlawed."
            },
            {
              "key": "C",
              "text": "Agreements have been made to ensure that marine resources are used carefully."
            },
            {
              "key": "D",
              "text": "Restrictions have been placed on amounts permitted to be fished in certain areas."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 8,
          "clue_sentence": "Many of these nations have now entered joint venture agreements to enable them to develop their marine resources more efficiently.",
          "explanation_vi": "Đoạn 9 nêu rõ các quốc gia đã tham gia vào các hiệp định liên doanh (joint venture agreements) để khai thác và phát triển tài nguyên biển hiệu quả và bền vững hơn.",
          "paraphrase_analysis": {
            "question_phrase": "Agreements have been made",
            "passage_phrase": "entered joint venture agreements",
            "explanation": "Countries entered joint venture agreements to manage marine resources."
          }
        },
        {
          "id": "hcmue_r01_q40",
          "type": "sentence_insertion",
          "question_text": "Look at the four squares [ ] that indicate where the following sentence can be added to the passage.\n\n*Walruses blow the clams loose with a jet of water, then suck them from their shells.*\n\nWhere would the sentence best fit?",
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
          "clue_paragraph_index": 7,
          "clue_sentence": "They congregate to feed on clams, their principal food. [A] This type of feeding releases nutrients into the water",
          "explanation_vi": "Câu cần điền giải thích chi tiết cách hải mã ăn nghêu (\"blow the clams loose with a jet of water, then suck them from their shells\"), vị trí thích hợp nhất là ngay sau câu đề cập đến việc chúng ăn nghêu và trước câu nói về kiểu ăn đó (\"This type of feeding...\"), tương ứng với ô [A].",
          "paraphrase_analysis": {
            "question_phrase": "feed on clams",
            "passage_phrase": "They congregate to feed on clams, their principal food.",
            "explanation": "The inserted sentence describes the exact mechanism of feeding on clams, fitting right after [A]."
          }
        }
      ],
      "id": "hcmue_r01_p4"
    }
  ]
};
