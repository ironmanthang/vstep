import type { ReadingTest } from '../../../../types/schemas';

/**
 * Authentic VSTEP Reading Test 1 (ULIS - ĐHQGHN Standard)
 * Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019)
 * Format: 4 Passages, 40 Questions, 60 Minutes.
 * Verified against official answer key (PDF page 131).
 */
export const ULIS_READING_TEST_01: ReadingTest = {
  "id": "ulis_read_test_01",
  "title": "VSTEP Reading Mock Test 1 (Chuẩn ĐHNN - ĐHQGHN)",
  "duration_minutes": 60,
  "difficulty": "B2",
  "passages": [
    {
      "title": "Passage 1: Smoking Epidemic in China",
      "topic": "Health & Medicine",
      "word_count": 365,
      "difficulty": "B1",
      "content_paragraphs": [
        "A new study, conducted by scientists from Oxford University, the Chinese Academy of Medical Sciences and the Chinese Center for Disease Control, has warned that a third of all men currently under the age of 20 in China will eventually die prematurely if they do not give up smoking.",
        "The research, published in The Lancet medical journal, says two-thirds of men in China now start to smoke before 20. Around half of **those men** will die from the habit, it concludes.",
        "In 2010, around one million people in China died from tobacco usage. But researchers say that if current trends continue, that will double to two million people - mostly men - dying every year by 2030, making it a \"growing epidemic of premature death\".",
        "But co-author Richard Peto said there was hope - if people can be persuaded to quit. \"The key to avoid this huge wave of deaths is cessation, and if you are a young man, don't start,\" he said.",
        "In many parts of China, meals often fit a comfortable pattern. After putting down their chopsticks, men commonly push their chairs back from the table and light cigarettes. No wonder China has struggled to impose a smoking ban in public places. Here, relationships are often built amid clouds of smoke.",
        "Expensive brands of cigarettes, often decorated with gold detailing on the cartons, are given as gifts. And ordinary brands are affordable to all but the very poor, costing just 2.5 yuan ($0.4; £0.25) a pack.",
        "In a country where smoking is so ingrained in daily life, few understand the harmful effects of tobacco use. According to the World Health Organization (WHO), only 25% of Chinese adults can list the specific health hazards of smoking, from lung cancer to heart disease.",
        "Perhaps it should come as no surprise, then, that only 10% of Chinese smokers quit by choice. Instead, most are forced to give up their cigarettes because they're too sick to continue.",
        "While smoking rates have fallen in developed countries - to less than one in five in the US - they have risen in China, as cigarettes have become more available and consumers richer.",
        "Authorities have shown concern over the rise, with **Beijing** even introducing a public smoking ban. But efforts have been **hampered** by the habit's popularity, and its usefulness as a source of tax - the government collects about 428 billion yuan (£44billion, $67billion) in tobacco taxes each year.",
        "Globally, tobacco kills up to half of its users, according to the World Health Organization."
      ],
      "questions": [
        {
          "id": "ulis_r01_q01",
          "type": "factual_detail",
          "question_text": "How many Chinese men start to smoke before the age of 20?",
          "options": [
            {
              "key": "A",
              "text": "one-third"
            },
            {
              "key": "B",
              "text": "two-thirds"
            },
            {
              "key": "C",
              "text": "half"
            },
            {
              "key": "D",
              "text": "all of them"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "The research, published in The Lancet medical journal, says two-thirds of men in China now start to smoke before 20.",
          "explanation_vi": "Đoạn 2 nêu rõ: \"two-thirds of men in China now start to smoke before 20\" (hai phần ba nam giới ở Trung Quốc hiện nay bắt đầu hút thuốc trước 20 tuổi). Do đó, đáp án đúng là B."
        },
        {
          "id": "ulis_r01_q02",
          "type": "vocab_in_context",
          "question_text": "What does the word \"**those men**\" in paragraph 2 refer to?",
          "options": [
            {
              "key": "A",
              "text": "Men who smoke under the age of 20"
            },
            {
              "key": "B",
              "text": "Men who smoke above the age of 20"
            },
            {
              "key": "C",
              "text": "Men who give up smoking"
            },
            {
              "key": "D",
              "text": "Men who smoke in public"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "The research, published in The Lancet medical journal, says two-thirds of men in China now start to smoke before 20. Around half of **those men** will die from the habit, it concludes.",
          "explanation_vi": "Cụm từ \"those men\" (những người đàn ông đó) ở câu thứ hai thay thế cho đối tượng được nhắc đến ở câu trước: \"men in China now start to smoke before 20\" (nam giới ở Trung Quốc bắt đầu hút thuốc trước 20 tuổi). Do đó, đáp án đúng là A."
        },
        {
          "id": "ulis_r01_q03",
          "type": "factual_detail",
          "question_text": "By 2030, how many men in China may die from smoking every year?",
          "options": [
            {
              "key": "A",
              "text": "one million"
            },
            {
              "key": "B",
              "text": "two million"
            },
            {
              "key": "C",
              "text": "three million"
            },
            {
              "key": "D",
              "text": "four million"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "But researchers say that if current trends continue, that will double to two million people - mostly men - dying every year by 2030, making it a \"growing epidemic of premature death\".",
          "explanation_vi": "Đoạn 3 chỉ ra rằng nếu xu hướng hiện tại tiếp tục, số người chết sẽ tăng gấp đôi lên 2 triệu người mỗi năm vào năm 2030 (\"double to two million people - mostly men - dying every year by 2030\"). Do đó, đáp án đúng là B."
        },
        {
          "id": "ulis_r01_q04",
          "type": "factual_detail",
          "question_text": "In many areas of China, when do men usually smoke?",
          "options": [
            {
              "key": "A",
              "text": "Before a meal"
            },
            {
              "key": "B",
              "text": "After a meal"
            },
            {
              "key": "C",
              "text": "Before they go to sleep"
            },
            {
              "key": "D",
              "text": "When they get up"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 4,
          "clue_sentence": "After putting down their chopsticks, men commonly push their chairs back from the table and light cigarettes.",
          "explanation_vi": "Hành động \"putting down their chopsticks\" (đặt đũa xuống) và \"light cigarettes\" (châm thuốc) ám chỉ việc hút thuốc sau bữa ăn (After a meal). Do đó, đáp án đúng là B."
        },
        {
          "id": "ulis_r01_q05",
          "type": "factual_detail",
          "question_text": "According to WHO, only_______ of Chinese adults can list bad effects of smoking.",
          "options": [
            {
              "key": "A",
              "text": "one-third"
            },
            {
              "key": "B",
              "text": "one-fourth"
            },
            {
              "key": "C",
              "text": "one-fifth"
            },
            {
              "key": "D",
              "text": "a half"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 6,
          "clue_sentence": "According to the World Health Organization (WHO), only 25% of Chinese adults can list the specific health hazards of smoking, from lung cancer to heart disease.",
          "explanation_vi": "Theo WHO, chỉ có 25% người trưởng thành Trung Quốc có thể liệt kê các tác hại cụ thể của việc hút thuốc. 25% tương đương với một phần tư (one-fourth). Do đó, đáp án đúng là B."
        },
        {
          "id": "ulis_r01_q06",
          "type": "vocab_in_context",
          "question_text": "\"**Beijing**\" refers to ..........",
          "options": [
            {
              "key": "A",
              "text": "China"
            },
            {
              "key": "B",
              "text": "The city of Beijing"
            },
            {
              "key": "C",
              "text": "The Chinese government"
            },
            {
              "key": "D",
              "text": "People who live in Beijing"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 9,
          "clue_sentence": "Authorities have shown concern over the rise, with **Beijing** even introducing a public smoking ban.",
          "explanation_vi": "Trong ngữ cảnh này, \"Beijing\" (Bắc Kinh) được dùng để chỉ chính quyền thành phố Bắc Kinh đã ban hành lệnh cấm hút thuốc công cộng. Theo đáp án chính thức, \"Beijing\" ám chỉ \"The city of Beijing\". Do đó, đáp án đúng là B."
        },
        {
          "id": "ulis_r01_q07",
          "type": "author_attitude",
          "question_text": "What is Richard Peto's attitude toward smoking in China?",
          "options": [
            {
              "key": "A",
              "text": "He doesn't believe that people will give up smoking"
            },
            {
              "key": "B",
              "text": "He is disappointed with the Chinese government."
            },
            {
              "key": "C",
              "text": "He thinks that people possibly stop smoking if they see reasons."
            },
            {
              "key": "D",
              "text": "He is sure about the rise of future deaths in China."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "But co-author Richard Peto said there was hope - if people can be persuaded to quit.",
          "explanation_vi": "Richard Peto cho rằng vẫn có hy vọng nếu mọi người có thể được thuyết phục để bỏ thuốc (\"there was hope - if people can be persuaded to quit\"), tức là ông nghĩ mọi người có thể dừng hút thuốc nếu họ thấy được lý do thuyết phục. Do đó, đáp án đúng là C."
        },
        {
          "id": "ulis_r01_q08",
          "type": "vocab_in_context",
          "question_text": "Which of the following words does the word \"**hamper**\" have closest meaning to?",
          "options": [
            {
              "key": "A",
              "text": "basket"
            },
            {
              "key": "B",
              "text": "assist"
            },
            {
              "key": "C",
              "text": "prohibit"
            },
            {
              "key": "D",
              "text": "restrict"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 9,
          "clue_sentence": "But efforts have been **hampered** by the habit's popularity, and its usefulness as a source of tax - the government collects about 428 billion yuan (£44billion, $67billion) in tobacco taxes each year.",
          "explanation_vi": "Từ \"hamper\" có nghĩa là cản trở, gây khó khăn, gần nghĩa nhất với \"restrict\" (hạn chế, kiềm chế). Do đó, đáp án đúng là D."
        },
        {
          "id": "ulis_r01_q09",
          "type": "main_idea",
          "question_text": "What is the writer's purpose?",
          "options": [
            {
              "key": "A",
              "text": "To argue over smoking policy in China"
            },
            {
              "key": "B",
              "text": "To support smoking in China"
            },
            {
              "key": "C",
              "text": "To warn and prevent smoking in China"
            },
            {
              "key": "D",
              "text": "To report the result of a research paper"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "A new study, conducted by scientists from Oxford University, the Chinese Academy of Medical Sciences and the Chinese Center for Disease Control, has warned that a third of all men currently under the age of 20 in China will eventually die prematurely if they do not give up smoking.",
          "explanation_vi": "Mục đích của tác giả xuyên suốt bài viết là đưa ra những cảnh báo về tác hại của thuốc lá đối với nam giới Trung Quốc và kêu gọi ngăn chặn thói quen này (\"To warn and prevent smoking in China\"). Do đó, đáp án đúng là C."
        },
        {
          "id": "ulis_r01_q10",
          "type": "inference",
          "question_text": "What does the writer imply about Chinese government?",
          "options": [
            {
              "key": "A",
              "text": "They do not want to stop people from smoking."
            },
            {
              "key": "B",
              "text": "They have tried to stop people from smoking in public but with little success."
            },
            {
              "key": "C",
              "text": "They have tried to close tobacco companies."
            },
            {
              "key": "D",
              "text": "They do not care about smoking."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 4,
          "clue_sentence": "No wonder China has struggled to impose a smoking ban in public places.",
          "explanation_vi": "Tác giả ngụ ý rằng chính phủ Trung Quốc đã cố gắng ngăn chặn việc hút thuốc ở nơi công cộng nhưng gặp nhiều khó khăn và ít thành công (\"struggled to impose a smoking ban in public places\" và \"efforts have been hampered\"). Do đó, đáp án đúng là B."
        }
      ],
      "id": "ulis_r01_p1"
    },
    {
      "title": "Passage 2: Global Warming Solutions",
      "topic": "Environment",
      "word_count": 445,
      "difficulty": "B2",
      "content_paragraphs": [
        "The evidence that humans are causing global warming is strong, but the question of what to do about it remains controversial. Economics, sociology, and politics are all important factors in planning for the future.",
        "Even if we stopped emitting greenhouse gases (GHGs) today, the Earth would still warm by another degree Fahrenheit or so. But what we do from today forward makes a big difference. Depending on our choices, scientists predict that the Earth could eventually warm by as little as 2.5 degrees or as much as 10 degrees Fahrenheit.",
        "A commonly cited goal is to stabilize GHG concentrations around 450-550 parts per million (ppm), or about twice pre-industrial levels. This is the point at which many believe the most damaging impacts of climate change can be avoided. Current concentrations are about 380 ppm, **which** means there isn't much time to lose. According to the IPCC, we'd have to reduce GHG emissions by 50% to 80% of what they're on track to be in the next century to reach this level.",
        "Is this possible?",
        "Many people and governments are already working hard to cut greenhouse gases, and everyone can help.",
        "Researchers Stephen Pacala and Robert Socolow at Princeton University have suggested one approach that they call \"stabilization wedges.\" This means reducing GHG emissions from a variety of sources with technologies available in the next few decades, rather than relying on an enormous change in a single area. They suggest 7 wedges that could each reduce emissions, and all of **them** together could hold emissions at approximately current levels for the next 50 years, putting us on a potential path to stabilize around 500 ppm.",
        "There are many possible wedges, including improvements to energy efficiency and vehicle fuel economy (so less energy has to be produced), and increases in wind and solar power, hydrogen produced from renewable sources, biofuels (produced from crops), natural gas, and nuclear power. There is also the potential to capture the carbon dioxide emitted from fossil fuels and store it underground—a process called \"carbon sequestration.\"",
        "In addition to reducing the gases we emit to the atmosphere, we can also increase the amount of gases we take out of the atmosphere. Plants and trees absorb CO2 as they grow, \"sequestering\" carbon naturally. Increasing forestlands and making changes to the way we farm could increase the amount of carbon we're storing.",
        "Some of these technologies have **drawbacks**, and different communities will make different decisions about how to power their lives, but the good news is that there are a variety of options to put us on a path toward a stable climate."
      ],
      "questions": [
        {
          "id": "ulis_r01_q11",
          "type": "vocab_in_context",
          "question_text": "The word “we” in paragraph 2 refers to ...........",
          "options": [
            {
              "key": "A",
              "text": "humans"
            },
            {
              "key": "B",
              "text": "economists, sociologists, and politicians"
            },
            {
              "key": "C",
              "text": "animals"
            },
            {
              "key": "D",
              "text": "scientists"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "Even if we stopped emitting greenhouse gases (GHGs) today, the Earth would still warm by another degree Fahrenheit or so.",
          "explanation_vi": "Từ \"we\" trong đoạn 2 ám chỉ con người (\"humans\"). Trong ngữ cảnh \"Even if we stopped emitting greenhouse gases today\" (Ngay cả khi chúng ta ngừng thải khí nhà kính hôm nay), \"we\" ở đây chỉ toàn thể nhân loại đang gây ra biến đổi khí hậu. Do đó chọn A."
        },
        {
          "id": "ulis_r01_q12",
          "type": "factual_detail",
          "question_text": "According to paragraph 2, how many degrees could the Earth warm up?",
          "options": [
            {
              "key": "A",
              "text": "2.5"
            },
            {
              "key": "B",
              "text": "2.5 or 10"
            },
            {
              "key": "C",
              "text": "10"
            },
            {
              "key": "D",
              "text": "from 2.5 to 10"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "Depending on our choices, scientists predict that the Earth could eventually warm by as little as 2.5 degrees or as much as 10 degrees Fahrenheit.",
          "explanation_vi": "Đoạn 2 viết: \"scientists predict that the Earth could eventually warm by as little as 2.5 degrees or as much as 10 degrees Fahrenheit\" (các nhà khoa học dự báo Trái Đất có thể ấm lên ít nhất là 2,5 độ hoặc nhiều nhất là 10 độ Fahrenheit). Như vậy mức tăng là từ 2,5 đến 10 độ. Chọn D."
        },
        {
          "id": "ulis_r01_q13",
          "type": "factual_detail",
          "question_text": "According to paragraph 3, why should we stabilize GHG concentrations around 450-550 parts per million?",
          "options": [
            {
              "key": "A",
              "text": "to avoid the most serious effects of climate change"
            },
            {
              "key": "B",
              "text": "to avoid all damaging impacts of climate change"
            },
            {
              "key": "C",
              "text": "to mend the most damaging impacts of climate change"
            },
            {
              "key": "D",
              "text": "to stop climate change"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "This is the point at which many believe the most damaging impacts of climate change can be avoided.",
          "explanation_vi": "Đoạn 3 viết: \"This is the point at which many believe the most damaging impacts of climate change can be avoided.\" (Đây là thời điểm mà nhiều người tin rằng những tác động gây hại nhất của biến đổi khí hậu có thể tránh được). \"the most damaging impacts\" tương đương với \"the most serious effects\". Chọn A."
        },
        {
          "id": "ulis_r01_q14",
          "type": "vocab_in_context",
          "question_text": "What does \"**which**\" in paragraph 3 refer to?",
          "options": [
            {
              "key": "A",
              "text": "current concentrations"
            },
            {
              "key": "B",
              "text": "that current concentrations are about 380 ppm"
            },
            {
              "key": "C",
              "text": "380 ppm"
            },
            {
              "key": "D",
              "text": "ppm"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "Current concentrations are about 380 ppm, **which** means there isn't much time to lose.",
          "explanation_vi": "Từ \"which\" trong câu \"Current concentrations are about 380 ppm, which means there isn't much time to lose\" dùng để thay thế cho cả mệnh đề đứng trước nó: việc nồng độ hiện tại đang ở mức khoảng 380 ppm đồng nghĩa với việc không còn nhiều thời gian để lãng phí. Do đó chọn B."
        },
        {
          "id": "ulis_r01_q15",
          "type": "inference",
          "question_text": "Why does the author mention Stephen Pacala and Robert Socolow?",
          "options": [
            {
              "key": "A",
              "text": "To introduce two researchers in the field"
            },
            {
              "key": "B",
              "text": "To proves that researchers are working to reduce GHG emission"
            },
            {
              "key": "C",
              "text": "To introduce one way to reduce GHG emission"
            },
            {
              "key": "D",
              "text": "To introduce Princeton University"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 5,
          "clue_sentence": "Researchers Stephen Pacala and Robert Socolow at Princeton University have suggested one approach that they call \"stabilization wedges.\"",
          "explanation_vi": "Tác giả nhắc đến Stephen Pacala và Robert Socolow để giới thiệu một phương pháp giảm phát thải khí nhà kính gọi là \"stabilization wedges\" (các lát cắt ổn định). Đoạn văn viết: \"suggested one approach that they call 'stabilization wedges'\". Chọn C."
        },
        {
          "id": "ulis_r01_q16",
          "type": "negative_fact",
          "question_text": "What stabilization wedges are NOT mentioned in the passage?",
          "options": [
            {
              "key": "A",
              "text": "create environment-friendly materials"
            },
            {
              "key": "B",
              "text": "capture and store carbon dioxide underground"
            },
            {
              "key": "C",
              "text": "increase the use of renewable energy"
            },
            {
              "key": "D",
              "text": "grow more trees"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 6,
          "clue_sentence": "There are many possible wedges, including improvements to energy efficiency and vehicle fuel economy (so less energy has to be produced), and increases in wind and solar power, hydrogen produced from renewable sources, biofuels (produced from crops), natural gas, and nuclear power.",
          "explanation_vi": "Các giải pháp được nhắc đến bao gồm: cải thiện hiệu suất năng lượng, tăng năng lượng gió/mặt trời, nhiên liệu sinh học, hạt nhân, thu giữ carbon dưới lòng đất (B), trồng thêm rừng (D), tăng năng lượng tái tạo (C). Việc \"tạo ra vật liệu thân thiện với môi trường\" (A) không được nhắc đến. Chọn A."
        },
        {
          "id": "ulis_r01_q17",
          "type": "vocab_in_context",
          "question_text": "What does \"**them**\" refer to?",
          "options": [
            {
              "key": "A",
              "text": "researchers"
            },
            {
              "key": "B",
              "text": "humans"
            },
            {
              "key": "C",
              "text": "renewable resources"
            },
            {
              "key": "D",
              "text": "wedges"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 5,
          "clue_sentence": "They suggest 7 wedges that could each reduce emissions, and all of **them** together could hold emissions at approximately current levels for the next 50 years, putting us on a potential path to stabilize around 500 ppm.",
          "explanation_vi": "Từ \"them\" trong câu \"They suggest 7 wedges that could each reduce emissions, and all of them together...\" thay thế cho danh từ \"wedges\" (các lát cắt ổn định) được nhắc đến ngay trước đó. Chọn D."
        },
        {
          "id": "ulis_r01_q18",
          "type": "main_idea",
          "question_text": "What is the best title for this passage?",
          "options": [
            {
              "key": "A",
              "text": "Arguments over Global Warming"
            },
            {
              "key": "B",
              "text": "Global Warming and its Causes"
            },
            {
              "key": "C",
              "text": "Global Warming Solutions"
            },
            {
              "key": "D",
              "text": "Global Warming's Effect on Earth"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 8,
          "clue_sentence": "Some of these technologies have **drawbacks**, and different communities will make different decisions about how to power their lives, but the good news is that there are a variety of options to put us on a path toward a stable climate.",
          "explanation_vi": "Bài viết tập trung thảo luận về các giải pháp khác nhau để giảm thiểu khí nhà kính và ổn định khí hậu (như stabilization wedges, năng lượng tái tạo, trồng rừng, thu giữ carbon). Do đó tiêu đề phù hợp nhất là \"Global Warming Solutions\" (Các giải pháp cho sự nóng lên toàn cầu). Chọn C."
        },
        {
          "id": "ulis_r01_q19",
          "type": "vocab_in_context",
          "question_text": "\"Sequestering\" has closest meaning to ..........",
          "options": [
            {
              "key": "A",
              "text": "absorb"
            },
            {
              "key": "B",
              "text": "isolate"
            },
            {
              "key": "C",
              "text": "release"
            },
            {
              "key": "D",
              "text": "emit"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 7,
          "clue_sentence": "Plants and trees absorb CO2 as they grow, \"sequestering\" carbon naturally.",
          "explanation_vi": "Trong đoạn 7, câu \"Plants and trees absorb CO2 as they grow, 'sequestering' carbon naturally\" cho thấy \"sequestering\" (giữ/hấp thụ carbon) có nghĩa tương đương với \"absorb\" (hấp thụ). Chọn A."
        },
        {
          "id": "ulis_r01_q20",
          "type": "inference",
          "question_text": "Why does the writer mention \"**drawbacks**\" in the last paragraph?",
          "options": [
            {
              "key": "A",
              "text": "To introduce the disadvantages of solutions in the following paragraph"
            },
            {
              "key": "B",
              "text": "To emphasize the disadvantages of the solutions in the previous paragraph"
            },
            {
              "key": "C",
              "text": "To recommend readers not to use the solutions"
            },
            {
              "key": "D",
              "text": "To emphasize the advantages of the solutions in different contexts"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 8,
          "clue_sentence": "Some of these technologies have **drawbacks**, and different communities will make different decisions about how to power their lives, but the good news is that there are a variety of options to put us on a path toward a stable climate.",
          "explanation_vi": "Tác giả viết: \"Some of these technologies have drawbacks... but the good news is that there are a variety of options to put us on a path toward a stable climate.\" Việc đề cập đến \"drawbacks\" (nhược điểm) nhằm chỉ ra rằng dù mỗi giải pháp có hạn chế riêng trong từng bối cảnh, sự đa dạng của các lựa chọn vẫn mang lại lợi thế lớn để đạt được khí hậu ổn định. Theo đáp án chính thức, chọn D."
        }
      ],
      "id": "ulis_r01_p2"
    },
    {
      "title": "Passage 3: The Appreciation of Art",
      "topic": "Art & History",
      "word_count": 410,
      "difficulty": "B2",
      "content_paragraphs": [
        "We can take great pleasure in merely looking at art, just as we take pleasure in the view of a distant mountain range or watching the sun set over the ocean. But art, unlike nature, is a human creation. It is one of the many ways we express ourselves and attempt to communicate. A work of art is the product of human intelligence, and we can meet it with our own intelligence on equal footing. This is where study comes in.",
        "The understanding of process - the how - often contributes quite a lot to our appreciation of art. If you understand why painting in watercolor may be different from painting in oil, why clay responds differently to the artist's hands than does wood or glass - you will have a richer appreciation of the artist's expression.",
        "Knowing the place of a work of art in history - what went before and came after - can also deepen your understanding. Artists learn to make art by studying the achievements of the past and observing the efforts of their contemporaries. They adapt ideas to serve their own needs and then **bequeath** those ideas to future generations of artists. For example, Matisse assumed that his audience would know that Venus was the ancient Roman goddess of love. But he also hoped that they would be familiar with one Venus in particular, a famous Greek statue known as the Venus de Milo.",
        "An artist may create a specific work for any of a thousand reasons. An awareness of the why may give some insight as well. Looking at Van Gogh's *The Starry Night*, it might help you know that Van Gogh was **intrigued** by the belief that people journeyed to a star after their death, and that there they continued their lives. \"Just as we take the train to get to Tarascon or Rouen,\" he wrote in a letter, \"we take death to reach a star.\" This knowledge might help you understand why Van Gogh felt so strongly about the night sky, and what his painting might have meant to him.",
        "But no matter how much you study, Van Gogh's painting will never mean for you exactly what it meant for him, nor should it. Great works of art hold many meanings. The greatest of **them** seem to speak anew to each generation and to each attentive observer. The most important thing is that they mean something for you, that your own experiences, thoughts, and emotions find a place in them."
      ],
      "questions": [
        {
          "id": "ulis_r01_q21",
          "type": "factual_detail",
          "question_text": "According to paragraph 2, the process of visual perception ..........",
          "options": [
            {
              "key": "A",
              "text": "is not the same for all people"
            },
            {
              "key": "B",
              "text": "begins with patterns of light"
            },
            {
              "key": "C",
              "text": "is not very scientific"
            },
            {
              "key": "D",
              "text": "requires other senses to function"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "The understanding of process - the how - often contributes quite a lot to our appreciation of art.",
          "explanation_vi": "Mặc dù đoạn văn trong đề bài không đề cập trực tiếp đến cụm từ 'visual perception' (nhận thức thị giác) do sự không đồng nhất giữa câu hỏi và văn bản gốc của đề thi, đáp án chính thức là A. Câu hỏi này kiểm tra khả năng hiểu rằng quá trình cảm nhận nghệ thuật và cách thức tiếp nhận hình ảnh không giống nhau ở mỗi người."
        },
        {
          "id": "ulis_r01_q22",
          "type": "factual_detail",
          "question_text": "What did Matisse reinterpret?",
          "options": [
            {
              "key": "A",
              "text": "A goddess from mythology"
            },
            {
              "key": "B",
              "text": "A painting by another artist"
            },
            {
              "key": "C",
              "text": "An ancient sculpture"
            },
            {
              "key": "D",
              "text": "A man in history"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "But he also hoped that they would be familiar with one Venus in particular, a famous Greek statue known as the Venus de Milo.",
          "explanation_vi": "Trong đoạn 3, tác giả đề cập rằng Matisse hy vọng khán giả của mình sẽ quen thuộc với một bức tượng thần Vệ Nữ cụ thể, đó là bức tượng Hy Lạp nổi tiếng được biết đến với tên gọi Venus de Milo (Tượng thần Vệ Nữ thành Milo). Do đó, Matisse đã diễn giải lại một bức tượng điêu khắc cổ đại (An ancient sculpture)."
        },
        {
          "id": "ulis_r01_q23",
          "type": "vocab_in_context",
          "question_text": "The word \"**them**\" in the last paragraph refers to ..........",
          "options": [
            {
              "key": "A",
              "text": "each attentive observer"
            },
            {
              "key": "B",
              "text": "thoughts and emotions"
            },
            {
              "key": "C",
              "text": "a lifetime of experiences"
            },
            {
              "key": "D",
              "text": "great works of art"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 4,
          "clue_sentence": "Great works of art hold many meanings. The greatest of **them** seem to speak anew to each generation and to each attentive observer.",
          "explanation_vi": "Từ 'them' trong câu 'The greatest of them seem to speak anew...' thay thế cho danh từ số nhiều đứng trước đó là 'Great works of art' (Các tác phẩm nghệ thuật vĩ đại)."
        },
        {
          "id": "ulis_r01_q24",
          "type": "vocab_in_context",
          "question_text": "The word \"**bequeath**\" in the passage is closest in meaning to .............",
          "options": [
            {
              "key": "A",
              "text": "make out"
            },
            {
              "key": "B",
              "text": "pass on"
            },
            {
              "key": "C",
              "text": "look over"
            },
            {
              "key": "D",
              "text": "take in"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "They adapt ideas to serve their own needs and then **bequeath** those ideas to future generations of artists.",
          "explanation_vi": "Từ 'bequeath' có nghĩa là để lại, truyền lại cho thế hệ sau. Cụm từ đồng nghĩa gần nhất là 'pass on' (truyền lại, chuyển giao)."
        },
        {
          "id": "ulis_r01_q25",
          "type": "negative_fact",
          "question_text": "The author mentions all of the following ways to enhance the appreciation of art EXCEPT ......",
          "options": [
            {
              "key": "A",
              "text": "understanding the artistic process"
            },
            {
              "key": "B",
              "text": "becoming familiar with the history"
            },
            {
              "key": "C",
              "text": "experiencing the art by copying"
            },
            {
              "key": "D",
              "text": "knowing about the life of the artist"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "The understanding of process - the how - often contributes quite a lot to our appreciation of art.",
          "explanation_vi": "Tác giả đề cập đến việc hiểu quy trình nghệ thuật (đoạn 2), hiểu lịch sử nghệ thuật (đoạn 3), và biết về cuộc đời/suy nghĩ của nghệ sĩ (đoạn 4 - ví dụ về Van Gogh). Việc 'sao chép tác phẩm' (experiencing the art by copying) không hề được nhắc đến trong bài."
        },
        {
          "id": "ulis_r01_q26",
          "type": "main_idea",
          "question_text": "What is the main topic of this passage?",
          "options": [
            {
              "key": "A",
              "text": "Visual perception of sensory material"
            },
            {
              "key": "B",
              "text": "The historical context for artistic expression"
            },
            {
              "key": "C",
              "text": "Studying Van Gogh's The Starry Night"
            },
            {
              "key": "D",
              "text": "The appreciation of works of art"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "This is where study comes in.",
          "explanation_vi": "Toàn bộ bài viết tập trung vào việc làm thế nào để hiểu và trân trọng, thưởng thức các tác phẩm nghệ thuật (The appreciation of works of art) thông qua việc nghiên cứu quy trình, lịch sử, và ý nghĩa đằng sau tác phẩm."
        },
        {
          "id": "ulis_r01_q27",
          "type": "inference",
          "question_text": "Which of the sentences below best expresses the information in the highlighted statement in the passage?",
          "options": [
            {
              "key": "A",
              "text": "We see images differently because of the mode of perception."
            },
            {
              "key": "B",
              "text": "Although we see images differently, the mode of perception is similar."
            },
            {
              "key": "C",
              "text": "Since the mode of perception is similar, we see images in the same way."
            },
            {
              "key": "D",
              "text": "When the mode of perception is the same, we see the same images"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "We can take great pleasure in merely looking at art, just as we take pleasure in the view of a distant mountain range or watching the sun set over the ocean.",
          "explanation_vi": "Mặc dù câu hỏi này dựa trên một phần văn bản bị khuyết trong đề thi gốc (câu được bôi đậm), đáp án chính thức là B. Ý nghĩa của nó là mặc dù chúng ta nhìn nhận các hình ảnh khác nhau, phương thức nhận thức cơ bản là tương tự nhau."
        },
        {
          "id": "ulis_r01_q28",
          "type": "factual_detail",
          "question_text": "Why might Van Gogh have painted *The Starry Night*?",
          "options": [
            {
              "key": "A",
              "text": "To symbolize the journey of life after death"
            },
            {
              "key": "B",
              "text": "To create a dramatic contrast with the sky"
            },
            {
              "key": "C",
              "text": "To place a strong image in the foreground"
            },
            {
              "key": "D",
              "text": "To include nature from his early experience"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 3,
          "clue_sentence": "Looking at Van Gogh's *The Starry Night*, it might help you know that Van Gogh was **intrigued** by the belief that people journeyed to a star after their death, and that there they continued their lives.",
          "explanation_vi": "Đoạn 4 chỉ ra rằng Van Gogh bị thu hút bởi niềm tin rằng con người sẽ du hành đến một ngôi sao sau khi chết và tiếp tục cuộc sống ở đó. Do đó, bức tranh 'The Starry Night' có thể được vẽ để biểu trưng cho hành trình của sự sống sau cái chết (To symbolize the journey of life after death)."
        },
        {
          "id": "ulis_r01_q29",
          "type": "vocab_in_context",
          "question_text": "The word \"**intrigued**\" in the passage is closest in meaning to ...........",
          "options": [
            {
              "key": "A",
              "text": "very pleased"
            },
            {
              "key": "B",
              "text": "very confused"
            },
            {
              "key": "C",
              "text": "very interested"
            },
            {
              "key": "D",
              "text": "very surprised"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "Looking at Van Gogh's *The Starry Night*, it might help you know that Van Gogh was **intrigued** by the belief that people journeyed to a star after their death, and that there they continued their lives.",
          "explanation_vi": "Từ 'intrigued' có nghĩa là bị hấp dẫn, tò mò, vô cùng hứng thú với điều gì đó. Do đó, nó gần nghĩa nhất với 'very interested' (rất quan tâm, hứng thú)."
        },
        {
          "id": "ulis_r01_q30",
          "type": "inference",
          "question_text": "What can be inferred from the last paragraph?",
          "options": [
            {
              "key": "A",
              "text": "Greatest artworks are impossible to understand."
            },
            {
              "key": "B",
              "text": "The author shows negative feelings toward contemporary art."
            },
            {
              "key": "C",
              "text": "People need knowledge to understand art."
            },
            {
              "key": "D",
              "text": "What we see in art is determined by our emotions, experiences, and thoughts."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 4,
          "clue_sentence": "The most important thing is that they mean something for you, that your own experiences, thoughts, and emotions find a place in them.",
          "explanation_vi": "Đoạn cuối nhấn mạnh rằng điều quan trọng nhất là tác phẩm nghệ thuật có ý nghĩa đối với bạn, và những trải nghiệm, suy nghĩ, cảm xúc của chính bạn tìm thấy một vị trí trong đó. Điều này suy ra rằng những gì chúng ta thấy trong nghệ thuật được quyết định bởi cảm xúc, trải nghiệm và suy nghĩ của chính chúng ta."
        }
      ],
      "id": "ulis_r01_p3"
    },
    {
      "title": "Passage 4: Antibiotics and Drug-Resistant Bacteria",
      "topic": "Health & Medicine",
      "word_count": 563,
      "difficulty": "C1",
      "content_paragraphs": [
        "Antibiotics block the life cycle of bacteria that invade the human body. The first of these antibiotics, penicillin, works by blocking the molecules that construct the cell walls of particular bacteria. The bacteria, with incomplete cell walls, are not able to reproduce.",
        "When penicillin was introduced during World War II, it was truly a \"miracle drug.\" Until that time, anyone who was cut or wounded stood a great risk of infection. Once penicillin became available, the situation changed. Wounded soldiers, children with ear infections, and many others began to benefit from the ability to block the growth of bacteria.",
        "While humanity may have won that particular battle against bacteria, the war is far from over. The reason is that in any bacterial population, there are bound to be a few bacteria that, for one reason or another, are not affected by a particular antibiotic. For example, they may have a slightly differently shaped enzyme that builds cell walls, so that penicillin will not fit onto that particular shape of the enzyme. These bacteria will not be affected by that particular drug.",
        "For that small group, the antibiotic is a real godsend. It doesn't affect **them**, but it does wipe out all of their competition. They are thus free to multiply, and, over time, all of the bacteria will have whatever properties that made those individuals resistant.",
        "Traditionally, medical scientists have dealt with this phenomenon by developing a large number of antibiotics, each of which intervenes in the bacterial life cycle in a slightly different way.",
        "Consequently, if you happen to have a bacterium that is resistant to one antibiotic, probably it will succumb to the action of another. You may, in fact, have had the experience of going to a doctor with an infection, being given an antibiotic, and then finding that it didn't work. In all likelihood, all your doctor had to do then was prescribe a different antibiotic and everything was fine.",
        "The problem is that as time has passed, more and more bacteria have become resistant to antibiotics. In fact, currently, there is one strain of bacteria- Staphylococcus-that is resistant to every commercially available antibiotic except one, and in 1996, a bacterium with lowered resistance to that last antibiotic appeared in Japan.",
        "The appearance of drug-resistant bacteria is not particularly surprising; in fact, it probably should have been **anticipated**. Nevertheless, in the late 1980s, there was a general sense of **complacency** among scientists on the antibiotic question. Little profit was to be made by developing the one-hundred-and-first antibiotic. Drug companies concentrated their efforts on other areas. Therefore, a gap developed between the production of new antibiotics and the development of resistance among bacteria.",
        "By the early 1990s, this gap was recognized and highlighted in several national news magazines. More companies returned to develop new kinds of antibiotics, and currently, a number are undergoing clinical trials. By early in the twenty-first century, some of these new drugs will start to come on the market, and the problem will be \"solved,\" at least for the moment.",
        "Additional research will focus on the processes by which cells repair the constant damage to DNA, but the computer design of new drugs, the development of new antibiotics, and techniques to combat bacteria should remain a top priority."
      ],
      "questions": [
        {
          "id": "ulis_r01_q31",
          "type": "factual_detail",
          "question_text": "How do antibiotics treat infections?",
          "options": [
            {
              "key": "A",
              "text": "They interfere with the reproductive cycle of bacteria."
            },
            {
              "key": "B",
              "text": "They construct cell walls to resist bacteria."
            },
            {
              "key": "C",
              "text": "They inject enzymes that explode in affected cells."
            },
            {
              "key": "D",
              "text": "They increase the mitosis of healthy cells"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "Antibiotics block the life cycle of bacteria that invade the human body.",
          "explanation_vi": "Đoạn 1 cho biết thuốc kháng sinh ngăn chặn chu kỳ sống của vi khuẩn xâm nhập vào cơ thể người. Cụ thể, penicillin ngăn chặn các phân tử cấu tạo nên thành tế bào của vi khuẩn, khiến chúng không thể sinh sản (\"are not able to reproduce\"). Do đó, kháng sinh hoạt động bằng cách can thiệp vào chu kỳ sinh sản của vi khuẩn."
        },
        {
          "id": "ulis_r01_q32",
          "type": "factual_detail",
          "question_text": "The word \"**them**\" in paragraph 4 refers to ..........",
          "options": [
            {
              "key": "A",
              "text": "whatever properties"
            },
            {
              "key": "B",
              "text": "resistant bacteria"
            },
            {
              "key": "C",
              "text": "their competition"
            },
            {
              "key": "D",
              "text": "those individuals"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "It doesn't affect **them**, but it does wipe out all of their competition.",
          "explanation_vi": "Trong đoạn 4, từ \"them\" đề cập đến \"that small group\" (nhóm nhỏ vi khuẩn không bị ảnh hưởng bởi kháng sinh, tức là vi khuẩn kháng thuốc - \"resistant bacteria\"). Câu trước đó nói: \"Đối với nhóm nhỏ đó, thuốc kháng sinh là một món quà trời ban. Nó không ảnh hưởng đến chúng (them)...\""
        },
        {
          "id": "ulis_r01_q33",
          "type": "vocab_in_context",
          "question_text": "The word \"**anticipated**\" in the passage is closest in meaning to .......",
          "options": [
            {
              "key": "A",
              "text": "predicted"
            },
            {
              "key": "B",
              "text": "concealed"
            },
            {
              "key": "C",
              "text": "investigated"
            },
            {
              "key": "D",
              "text": "disregarded"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 7,
          "clue_sentence": "The appearance of drug-resistant bacteria is not particularly surprising; in fact, it probably should have been **anticipated**.",
          "explanation_vi": "Từ \"anticipated\" có nghĩa là được dự đoán trước, đồng nghĩa với \"predicted\". Các từ còn lại không phù hợp nghĩa: \"concealed\" (bị che giấu), \"investigated\" (được điều tra), \"disregarded\" (bị lờ đi)."
        },
        {
          "id": "ulis_r01_q34",
          "type": "main_idea",
          "question_text": "Which of the following best expresses the main idea of this passage?",
          "options": [
            {
              "key": "A",
              "text": "The \"miracle drug\" penicillin"
            },
            {
              "key": "B",
              "text": "Drug-resistant bacteria"
            },
            {
              "key": "C",
              "text": "Staphylococcus infections"
            },
            {
              "key": "D",
              "text": "Gene therapy treatments"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 6,
          "clue_sentence": "The problem is that as time has passed, more and more bacteria have become resistant to antibiotics.",
          "explanation_vi": "Ý chính của toàn bộ bài đọc là về hiện tượng vi khuẩn kháng thuốc (drug-resistant bacteria). Bài viết thảo luận về cách vi khuẩn phát triển khả năng kháng thuốc, những thách thức đối với giới khoa học và nhu cầu phát triển các loại kháng sinh mới."
        },
        {
          "id": "ulis_r01_q35",
          "type": "factual_detail",
          "question_text": "According to paragraph 4, why do some bacteria benefit from antibiotics?",
          "options": [
            {
              "key": "A",
              "text": "The antibiotic eliminates competing bacteria, allowing resistant bacteria to reproduce."
            },
            {
              "key": "B",
              "text": "The resistant bacteria compete with the antibiotic, and the bacteria become stronger."
            },
            {
              "key": "C",
              "text": "The competition helps the resistant bacteria to multiply by reproducing with the resistant type."
            },
            {
              "key": "D",
              "text": "The properties of the antibiotic are acquired by the bacteria, making it resistant to the competition."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 3,
          "clue_sentence": "It doesn't affect **them**, but it does wipe out all of their competition.",
          "explanation_vi": "Đoạn 4 giải thích rằng thuốc kháng sinh không ảnh hưởng đến nhóm vi khuẩn kháng thuốc, nhưng lại tiêu diệt tất cả các đối thủ cạnh tranh của chúng (\"wipe out all of their competition\"), giúp chúng tự do sinh sôi nảy nở mà không gặp trở ngại."
        },
        {
          "id": "ulis_r01_q36",
          "type": "vocab_in_context",
          "question_text": "The word \"**complacency**\" in the passage is closest in meaning to ......",
          "options": [
            {
              "key": "A",
              "text": "consensus of agreement"
            },
            {
              "key": "B",
              "text": "fear of consequences"
            },
            {
              "key": "C",
              "text": "lack of concern"
            },
            {
              "key": "D",
              "text": "awareness of potential"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 7,
          "clue_sentence": "Nevertheless, in the late 1980s, there was a general sense of **complacency** among scientists on the antibiotic question.",
          "explanation_vi": "Từ \"complacency\" có nghĩa là sự tự mãn, chủ quan, thiếu lo ngại hoặc thiếu sự quan tâm đúng mức trước một vấn đề, gần nghĩa nhất với \"lack of concern\" (thiếu sự quan tâm/lo ngại)."
        },
        {
          "id": "ulis_r01_q37",
          "type": "factual_detail",
          "question_text": "Which of the sentences below best expresses the information in the highlighted statement in the passage?",
          "options": [
            {
              "key": "A",
              "text": "Some antibiotics affect a population of bacteria more efficiently than others."
            },
            {
              "key": "B",
              "text": "There are several reasons why some bacteria do not respond to most antibiotics."
            },
            {
              "key": "C",
              "text": "The effect of antibiotics on bacteria is to bind them together into one population."
            },
            {
              "key": "D",
              "text": "A small number of bacteria in any sample will probably be resistant to a specific antibiotic."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "The reason is that in any bacterial population, there are bound to be a few bacteria that, for one reason or another, are not affected by a particular antibiotic.",
          "explanation_vi": "Câu gốc trong đoạn 3 nói rằng: \"Lý do là trong bất kỳ quần thể vi khuẩn nào, chắc chắn sẽ có một vài vi khuẩn, vì lý do này hay lý do khác, không bị ảnh hưởng bởi một loại kháng sinh cụ thể.\" Câu này tương đương với phương án D: \"Một số lượng nhỏ vi khuẩn trong bất kỳ mẫu nào có thể sẽ kháng lại một loại kháng sinh cụ thể.\""
        },
        {
          "id": "ulis_r01_q38",
          "type": "negative_fact",
          "question_text": "The author mentions all of the following reasons for drug resistant bacteria to appear EXCEPT.......",
          "options": [
            {
              "key": "A",
              "text": "there was not enough profit incentive for companies to continue developing new antibiotics"
            },
            {
              "key": "B",
              "text": "Statistically, some drug-resistant bacteria will occur naturally in any large population of bacteria"
            },
            {
              "key": "C",
              "text": "the newer antibiotics were not as strong and effective as the original penicillin-based drugs"
            },
            {
              "key": "D",
              "text": "competing bacteria are destroyed by antibiotics, allowing resistant bacteria to prosper."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 7,
          "clue_sentence": "Little profit was to be made by developing the one-hundred-and-first antibiotic.",
          "explanation_vi": "Tác giả không hề đề cập đến việc các loại kháng sinh mới hơn không mạnh và hiệu quả bằng penicillin ban đầu (phương án C). Các phương án khác đều được nhắc đến trong bài: A được nhắc đến ở đoạn 8 (\"Little profit was to be made...\"), B được nhắc đến ở đoạn 3 (\"in any bacterial population, there are bound to be a few bacteria...\"), và D được nhắc đến ở đoạn 4 (\"wipe out all of their competition\")."
        },
        {
          "id": "ulis_r01_q39",
          "type": "inference",
          "question_text": "It can be inferred from the passage that .......",
          "options": [
            {
              "key": "A",
              "text": "research to develop new antibiotics will not be necessary in the future"
            },
            {
              "key": "B",
              "text": "the scientific community was not surprised by the resistant strains of bacteria"
            },
            {
              "key": "C",
              "text": "antibiotics are not very expensive when they are made available commercially"
            },
            {
              "key": "D",
              "text": "it takes years for a new drug to be made available commercially for consumers"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 8,
          "clue_sentence": "More companies returned to develop new kinds of antibiotics, and currently, a number are undergoing clinical trials.",
          "explanation_vi": "Đoạn 9 cho biết vào đầu những năm 1990, khoảng cách thiếu hụt kháng sinh mới được nhận ra và các công ty bắt đầu quay lại phát triển kháng sinh mới. Tại thời điểm viết bài (cuối những năm 1990), các thuốc này đang được thử nghiệm lâm sàng (\"undergoing clinical trials\") và phải đến đầu thế kỷ 21 mới bắt đầu có mặt trên thị trường. Điều này cho thấy phải mất nhiều năm để một loại thuốc mới được thương mại hóa cho người tiêu dùng."
        },
        {
          "id": "ulis_r01_q40",
          "type": "negative_fact",
          "question_text": "Which of the following statements is NOT a main idea of the passage?",
          "options": [
            {
              "key": "A",
              "text": "Many strains of bacteria have become resistant to the antibiotics currently available."
            },
            {
              "key": "B",
              "text": "Funding for the production of new antibiotics has been allocated to drug companies."
            },
            {
              "key": "C",
              "text": "The first antibiotics were very effective in blocking the reproduction of bacteria."
            },
            {
              "key": "D",
              "text": "New antibiotics are being developed to combat bacteria that resist the older antibiotics."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 8,
          "clue_sentence": "More companies returned to develop new kinds of antibiotics, and currently, a number are undergoing clinical trials.",
          "explanation_vi": "Bài viết không hề đề cập đến việc phân bổ kinh phí (funding) cho các công ty dược phẩm để sản xuất kháng sinh mới. Các ý A, C, D đều là các ý chính hoặc thông tin quan trọng được thảo luận xuyên suốt bài viết."
        }
      ],
      "id": "ulis_r01_p4"
    }
  ]
};
