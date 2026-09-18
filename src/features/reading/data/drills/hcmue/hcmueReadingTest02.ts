import type { ReadingTest } from '../../../../../types/schemas';

/**
 * Authentic VSTEP Reading Practice Drill 2 (HCMUE Standard)
 * Source: "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017), Test 2 Reading (PDF Pages 39–51), Key page 157 (Book p. 158)
 * Format: 4 Passages, 40 Questions, 60 Minutes.
 */
export const HCMUE_READING_TEST_02: ReadingTest = {
  "id": "hcmue_read_test_02",
  "title": "VSTEP Reading Practice Drill 2 (Chuẩn ĐH Sư Phạm TP.HCM)",
  "duration_minutes": 60,
  "difficulty": "B2",
  "passages": [
    {
      "title": "Passage 1: Food Allergies and Sensitivities",
      "topic": "Health & Nutrition",
      "difficulty": "B1",
      "content_paragraphs": [
        "Scientists do not yet thoroughly understand just how the body of an individual becomes sensitive to a substance that is harmless or even wholesome for the average person. Milk, wheat, and egg, for example, rank among the most healthful and widely used foods. Yet these foods can cause persons sensitive to them to suffer greatly. At first, the body of the individual is not harmed by coming into contact with the substance. After a varying interval of time, usually longer than a few weeks, the body becomes sensitive to it, and an allergy has begun to develop.",
        "Sometimes it's hard to figure out if you have a food allergy, since it can show up so many different ways. Your **symptoms** could be caused by many other problems. You may have rashes, hives, joint pains mimicking arthritis, headaches, irritability, or depression. The most common food allergies are to milk, eggs, seafood, wheat, nuts, seeds, chocolate, oranges, and tomatoes. Many of these allergies will not develop if these foods are not fed to an infant until her or his intestines mature at around seven months. Breast milk also tends to be protective.",
        "Migraines can be **set off** by foods containing tyramine, phenethylamine, monosodium glutamate, or sodium nitrate. Common foods which contain these are chocolate, aged cheeses, sour cream, red wine, pickled herring, chicken livers, avocados, ripe bananas, cured meats, many Oriental and prepared foods (read the labels!). Some people have been successful in treating their migraines with supplements of B-vitamins, particularly B6 and niacin.",
        "Children who are **hyperactive** may benefit from eliminating food additives, especially colorings, and foods high in salicylates from their diets. A few of **these** are almonds, green peppers, peaches, tea, grapes. This is the diet made popular by Benjamin Feingold, who has written the book Why Child is Hyperactive. Other researchers have had mixed results when testing whether the diet is effective."
      ],
      "word_count": 328,
      "questions": [
        {
          "id": "hcmue_r02_q01",
          "type": "main_idea",
          "question_text": "The topic of this passage is",
          "options": [
            {
              "key": "A",
              "text": "reactions to foods"
            },
            {
              "key": "B",
              "text": "food and nutrition"
            },
            {
              "key": "C",
              "text": "infants and allergies"
            },
            {
              "key": "D",
              "text": "a good diet"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "Scientists do not yet thoroughly understand just how the body of an individual becomes sensitive to a substance that is harmless or even wholesome for the average person.",
          "explanation_vi": "Đoạn văn xoay quanh chủ đề phản ứng của cơ thể (dị ứng, đau nửa đầu, tăng động) đối với các loại thực phẩm khác nhau. Do đó, 'reactions to foods' là đáp án chính xác nhất.",
          "paraphrase_analysis": {
            "question_phrase": "reactions to foods",
            "passage_phrase": "sensitive to a substance... Milk, wheat, and egg, for example, rank among the most healthful and widely used foods. Yet these foods can cause persons sensitive to them to suffer greatly.",
            "explanation": "Toàn bài nói về việc cơ thể phản ứng/nhạy cảm với thức ăn (dị ứng, đau đầu, tăng động)."
          }
        },
        {
          "id": "hcmue_r02_q02",
          "type": "factual_detail",
          "question_text": "According to the passage, the difficulty in diagnosing allergies to foods is due to",
          "options": [
            {
              "key": "A",
              "text": "the vast number of different foods we eat"
            },
            {
              "key": "B",
              "text": "lack of a proper treatment plan"
            },
            {
              "key": "C",
              "text": "the similarity of symptoms of the allergy to other problems"
            },
            {
              "key": "D",
              "text": "the use of prepared formula to feed babies"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "Your **symptoms** could be caused by many other problems.",
          "explanation_vi": "Bài đọc chỉ rõ rằng việc chẩn đoán dị ứng thực phẩm rất khó vì các triệu chứng của nó có thể do nhiều vấn đề khác gây ra (giống với các vấn đề khác). Do đó, đáp án C là chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "the similarity of symptoms of the allergy to other problems",
            "passage_phrase": "Your symptoms could be caused by many other problems.",
            "explanation": "Các triệu chứng dị ứng có thể bị nhầm lẫn vì chúng giống với nhiều vấn đề sức khỏe khác."
          }
        },
        {
          "id": "hcmue_r02_q03",
          "type": "vocab_in_context",
          "question_text": "The word \"**symptoms**\" in the passage is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "indications"
            },
            {
              "key": "B",
              "text": "diet"
            },
            {
              "key": "C",
              "text": "diagnosis"
            },
            {
              "key": "D",
              "text": "prescriptions"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "You may have rashes, hives, joint pains mimicking arthritis, headaches, irritability, or depression.",
          "explanation_vi": "Từ 'symptoms' (triệu chứng) đồng nghĩa với 'indications' (dấu hiệu, biểu hiện). Các lựa chọn khác như chế độ ăn (diet), chẩn đoán (diagnosis), hay đơn thuốc (prescriptions) không phù hợp.",
          "paraphrase_analysis": {
            "question_phrase": "symptoms",
            "passage_phrase": "rashes, hives, joint pains... headaches, irritability, or depression",
            "explanation": "Triệu chứng bệnh tương đương với các dấu hiệu/biểu hiện của cơ thể."
          }
        },
        {
          "id": "hcmue_r02_q04",
          "type": "vocab_in_context",
          "question_text": "The phrase \"**set off**\" in the passage is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "relieved"
            },
            {
              "key": "B",
              "text": "identified"
            },
            {
              "key": "C",
              "text": "avoided"
            },
            {
              "key": "D",
              "text": "triggered"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "Migraines can be **set off** by foods containing tyramine, phenethylamine, monosodium glutamate, or sodium nitrate.",
          "explanation_vi": "Cụm từ 'set off' trong ngữ cảnh này mang nghĩa kích hoạt, gây ra bệnh đau nửa đầu, đồng nghĩa với 'triggered'. Các từ khác nghĩa là làm giảm (relieved), nhận diện (identified), tránh (avoided).",
          "paraphrase_analysis": {
            "question_phrase": "set off",
            "passage_phrase": "Migraines can be set off by foods containing...",
            "explanation": "Thức ăn gây ra/kích hoạt các cơn đau nửa đầu."
          }
        },
        {
          "id": "hcmue_r02_q05",
          "type": "inference",
          "question_text": "What can be inferred about babies from this passage?",
          "options": [
            {
              "key": "A",
              "text": "They can eat almost anything."
            },
            {
              "key": "B",
              "text": "They should have a carefully restricted diet as infants."
            },
            {
              "key": "C",
              "text": "They gain little benefit from being breast fed."
            },
            {
              "key": "D",
              "text": "They may become hyperactive if fed solid food too early."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "Many of these allergies will not develop if these foods are not fed to an infant until her or his intestines mature at around seven months.",
          "explanation_vi": "Từ việc tác giả khuyến cáo không nên cho trẻ ăn một số loại thực phẩm gây dị ứng cho đến khi ruột của trẻ trưởng thành (khoảng 7 tháng), ta có thể suy ra trẻ em cần có một chế độ ăn uống được hạn chế/kiểm soát cẩn thận khi còn là trẻ sơ sinh.",
          "paraphrase_analysis": {
            "question_phrase": "carefully restricted diet as infants",
            "passage_phrase": "Many of these allergies will not develop if these foods are not fed to an infant until her or his intestines mature at around seven months.",
            "explanation": "Tránh cho trẻ ăn các thực phẩm nhất định cho đến 7 tháng tuổi nghĩa là áp dụng chế độ ăn hạn chế cẩn thận."
          }
        },
        {
          "id": "hcmue_r02_q06",
          "type": "vocab_in_context",
          "question_text": "The word \"**hyperactive**\" in the passage is closest in meaning to",
          "options": [
            {
              "key": "A",
              "text": "overly active"
            },
            {
              "key": "B",
              "text": "unusually low activity"
            },
            {
              "key": "C",
              "text": "excited"
            },
            {
              "key": "D",
              "text": "inquisitive"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 3,
          "clue_sentence": "Children who are **hyperactive** may benefit from eliminating food additives, especially colorings, and foods high in salicylates from their diets.",
          "explanation_vi": "Từ 'hyperactive' có tiền tố 'hyper-' chỉ mức độ quá mức, nghĩa là quá hiếu động, hoạt động thái quá ('overly active').",
          "paraphrase_analysis": {
            "question_phrase": "hyperactive",
            "passage_phrase": "Children who are hyperactive may benefit from eliminating food additives",
            "explanation": "Hyperactive đồng nghĩa với việc hoạt động quá mức bình thường (overly active)."
          }
        },
        {
          "id": "hcmue_r02_q07",
          "type": "factual_detail",
          "question_text": "The author states that the reason that infants need to avoid certain foods related to allergies has to do with the infant's",
          "options": [
            {
              "key": "A",
              "text": "lack of teeth"
            },
            {
              "key": "B",
              "text": "poor metabolism"
            },
            {
              "key": "C",
              "text": "underdeveloped intestinal tract"
            },
            {
              "key": "D",
              "text": "inability to swallow solid foods"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "Many of these allergies will not develop if these foods are not fed to an infant until her or his intestines mature at around seven months.",
          "explanation_vi": "Tác giả nêu rõ nguyên nhân là đường ruột của trẻ chưa phát triển hoàn thiện ('until her or his intestines mature'), tương ứng với 'underdeveloped intestinal tract'.",
          "paraphrase_analysis": {
            "question_phrase": "underdeveloped intestinal tract",
            "passage_phrase": "until her or his intestines mature at around seven months",
            "explanation": "Ruột chưa trưởng thành/chưa hoàn thiện tương đương với ống tiêu hóa chưa phát triển."
          }
        },
        {
          "id": "hcmue_r02_q08",
          "type": "factual_detail",
          "question_text": "The word \"**these**\" in the passage refers to",
          "options": [
            {
              "key": "A",
              "text": "food additives"
            },
            {
              "key": "B",
              "text": "food colorings"
            },
            {
              "key": "C",
              "text": "innutritious foods"
            },
            {
              "key": "D",
              "text": "foods high in salicylates"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 3,
          "clue_sentence": "Children who are **hyperactive** may benefit from eliminating food additives, especially colorings, and foods high in salicylates from their diets. A few of **these** are almonds, green peppers, peaches, tea, grapes.",
          "explanation_vi": "Cụm 'A few of these are almonds, green peppers, peaches, tea, grapes' dùng để chỉ các loại thực phẩm giàu salicylates vừa được nhắc đến ngay trước đó.",
          "paraphrase_analysis": {
            "question_phrase": "these",
            "passage_phrase": "foods high in salicylates from their diets. A few of these are almonds...",
            "explanation": "Đại từ 'these' thay thế cho 'foods high in salicylates'."
          }
        },
        {
          "id": "hcmue_r02_q09",
          "type": "factual_detail",
          "question_text": "Which of the following was a suggested treatment for migraines in the passage?",
          "options": [
            {
              "key": "A",
              "text": "Eating more ripe bananas"
            },
            {
              "key": "B",
              "text": "Avoiding all Oriental foods"
            },
            {
              "key": "C",
              "text": "Getting plenty of sodium nitrate"
            },
            {
              "key": "D",
              "text": "Using Vitamin B in addition to a good diet"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "Some people have been successful in treating their migraines with supplements of B-vitamins, particularly B6 and niacin.",
          "explanation_vi": "Đoạn văn nêu phương pháp điều trị chứng đau nửa đầu thành công bằng cách dùng các chất bổ sung vitamin B (B-vitamins). Do đó phương án D chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "Using Vitamin B in addition to a good diet",
            "passage_phrase": "Some people have been successful in treating their migraines with supplements of B-vitamins, particularly B6 and niacin.",
            "explanation": "Sử dụng thêm các chất bổ sung vitamin B là một cách điều trị được đề cập."
          }
        },
        {
          "id": "hcmue_r02_q10",
          "type": "negative_fact",
          "question_text": "According to the article the Feingold diet is NOT",
          "options": [
            {
              "key": "A",
              "text": "verified by researchers as being consistently effective"
            },
            {
              "key": "B",
              "text": "available in book form"
            },
            {
              "key": "C",
              "text": "beneficial for hyperactive children"
            },
            {
              "key": "D",
              "text": "designed to eliminate foods containing certain food additives"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 3,
          "clue_sentence": "Other researchers have had mixed results when testing whether the diet is effective.",
          "explanation_vi": "Bài đọc nói rằng các nhà nghiên cứu khác có kết quả hỗn hợp/khác nhau khi kiểm tra xem chế độ ăn này có hiệu quả hay không (chưa được chứng minh là nhất quán). Do đó, chế độ ăn Feingold CHƯA ĐƯỢC các nhà nghiên cứu xác thực là luôn luôn hiệu quả (A đúng với yêu cầu câu hỏi 'NOT').",
          "paraphrase_analysis": {
            "question_phrase": "verified by researchers as being consistently effective",
            "passage_phrase": "Other researchers have had mixed results when testing whether the diet is effective.",
            "explanation": "Kết quả hỗn hợp nghĩa là chưa được chứng minh là luôn hiệu quả nhất quán."
          }
        }
      ],
      "id": "hcmue_r02_p1"
    },
    {
      "title": "Passage 2: Women Entrepreneurs in America",
      "topic": "Business & Economy",
      "difficulty": "B2",
      "content_paragraphs": [
        "Until recently, most American entrepreneurs were men. Discrimination against women in business, the demands of caring for families, and lack of business training had kept the number of women entrepreneurs small. Now, however, businesses owned by women account for more than $40 billion in annual revenues, and this figure is likely to continue rising throughout the 1990s. As Carolyn Doppelt Gray, an official of the Small Business Administration, has noted, \"The 1970s was the decade of women entering management, and the 1980s turned out to be the decade of the woman entrepreneur.\"",
        "What are some of the factors behind this trend? For one thing, as more women earn advanced degrees in business and enter the corporate world, they are finding obstacles. Women are still **excluded** from most executive suites. Charlotte Taylor, a management consultant, had noted, \"In the 1970s women believed if they got an MBA and worked hard they could become chairman of the board. Now they've found out **that** isn't going to happen, so they go out on their own.\"",
        "In the past, most women entrepreneurs worked in \"women's\" fields cosmetics and clothing, for example. But **this** is changing. Consider ASK Computer Systems, a $22-million-a-year computer software business. It was founded in 1973 by Sandra Kurtzig, who was then a housewife with degrees in math and engineering. When Kurtzig founded the business, her first product was software that let weekly newspapers **keep tabs on** their newspaper carriers and her office was a bedroom at home, with a **shoebox under the bed** to hold the company's cash. After she succeeded with the newspaper system, she hired several bright computer-science graduates to develop additional programs. When these were marketed and sold, ASK began to grow. It now has 200 employees, and Sandra Kurtzig owns $66.9 million of stock.",
        "Of course, many women who start their own businesses fail, just as men often do. They still face hurdles in the business world, especially problems in raising money; the banking and finance world is still dominated by men, and old attitudes die hard. Most businesses owned by women are still quite small. But the situation is changing; there are likely to be many more Sandra Kurtzigs in the years ahead."
      ],
      "questions": [
        {
          "id": "hcmue_r02_q11",
          "type": "main_idea",
          "question_text": "What is the main idea of this passage?",
          "options": [
            {
              "key": "A",
              "text": "Women today are better educated than in the past, making them more attractive to the business world."
            },
            {
              "key": "B",
              "text": "The computer is especially lucrative for women today."
            },
            {
              "key": "C",
              "text": "Women are better at small businesses than men are."
            },
            {
              "key": "D",
              "text": "Women today are opening more businesses of their own."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "Now, however, businesses owned by women account for more than $40 billion in annual revenues, and this figure is likely to continue rising throughout the 1990s.",
          "explanation_vi": "Bài đọc thảo luận về sự gia tăng của các nữ doanh nhân và các doanh nghiệp do phụ nữ làm chủ (ví dụ: 'Now, however, businesses owned by women account for more than $40 billion in annual revenues...'). Do đó, ý chính của bài là phụ nữ ngày càng tự mở nhiều doanh nghiệp riêng. Các lựa chọn khác chỉ là các chi tiết phụ."
        },
        {
          "id": "hcmue_r02_q12",
          "type": "vocab_in_context",
          "question_text": "The word \"**excluded**\" in the passage is closest in meaning to _________.",
          "options": [
            {
              "key": "A",
              "text": "not permitted in"
            },
            {
              "key": "B",
              "text": "often invited to"
            },
            {
              "key": "C",
              "text": "decorators of"
            },
            {
              "key": "D",
              "text": "charged admission to"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "Women are still **excluded** from most executive suites.",
          "explanation_vi": "Từ \"excluded\" có nghĩa là bị loại trừ, không được phép vào. Trong các lựa chọn, \"not permitted in\" (không được phép vào) đồng nghĩa với từ này. Các lựa chọn còn lại không phù hợp."
        },
        {
          "id": "hcmue_r02_q13",
          "type": "negative_fact",
          "question_text": "All of the following were mentioned in the passage as detriments to women in the business world EXCEPT_____.",
          "options": [
            {
              "key": "A",
              "text": "women were required to stay at home with their families"
            },
            {
              "key": "B",
              "text": "women lacked ability to work in business"
            },
            {
              "key": "C",
              "text": "women faced discrimination in business"
            },
            {
              "key": "D",
              "text": "women were not trained in business"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "Discrimination against women in business, the demands of caring for families, and lack of business training had kept the number of women entrepreneurs small.",
          "explanation_vi": "Đoạn 1 liệt kê các trở ngại: sự phân biệt đối xử (discrimination), nhu cầu chăm sóc gia đình (demands of caring for families), và thiếu đào tạo kinh doanh (lack of business training). Bài không hề đề cập rằng phụ nữ thiếu năng lực làm kinh doanh (lacked ability to work in business). Do đó, B là đáp án cần chọn cho câu hỏi ngoại trừ (EXCEPT)."
        },
        {
          "id": "hcmue_r02_q14",
          "type": "factual_detail",
          "question_text": "The word \"**that**\" in the passage refers to_____.",
          "options": [
            {
              "key": "A",
              "text": "a woman becomes chairman of the board"
            },
            {
              "key": "B",
              "text": "women working hard"
            },
            {
              "key": "C",
              "text": "women achieving advanced degrees"
            },
            {
              "key": "D",
              "text": "women believing that business is a place for them"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "In the 1970s women believed if they got an MBA and worked hard they could become chairman of the board. Now they've found out **that** isn't going to happen, so they go out on their own.",
          "explanation_vi": "Từ \"that\" trong câu \"Now they've found out that isn't going to happen\" dùng để thay thế cho mệnh đề đứng trước: việc phụ nữ trở thành chủ tịch hội đồng quản trị (become chairman of the board) là điều không xảy ra như họ từng kỳ vọng. Do đó, A là đáp án chính xác."
        },
        {
          "id": "hcmue_r02_q15",
          "type": "inference",
          "question_text": "According to the passage, Charlotte Taylor believes that women in the 1970s_____.",
          "options": [
            {
              "key": "A",
              "text": "were unrealistic about their opportunities in business management"
            },
            {
              "key": "B",
              "text": "were still more interested in education than business opportunities"
            },
            {
              "key": "C",
              "text": "had fewer obstacles in business than they do today"
            },
            {
              "key": "D",
              "text": "were unable to work hard enough to succeed in business"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "In the 1970s women believed if they got an MBA and worked hard they could become chairman of the board. Now they've found out **that** isn't going to happen, so they go out on their own.",
          "explanation_vi": "Charlotte Taylor chỉ ra rằng phụ nữ những năm 1970 từng tin rằng chỉ cần có bằng MBA và làm việc chăm chỉ là có thể lên làm chủ tịch, nhưng thực tế không phải vậy. Điều này cho thấy họ đã không thực tế về cơ hội thăng tiến của mình trong quản lý kinh doanh (unrealistic about their opportunities in business management)."
        },
        {
          "id": "hcmue_r02_q16",
          "type": "factual_detail",
          "question_text": "The author mentions the \"**shoebox under the bed**\" in the third paragraph in order to_____.",
          "options": [
            {
              "key": "A",
              "text": "show the frugality of women in business"
            },
            {
              "key": "B",
              "text": "show the resourcefulness of Sandra Kurtzig"
            },
            {
              "key": "C",
              "text": "point out that initially the financial resources of Sandra Kurtzig's business were limited"
            },
            {
              "key": "D",
              "text": "suggest that the company needed to expand"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "When Kurtzig founded the business, her first product was software that let weekly newspapers **keep tabs on** their newspaper carriers and her office was a bedroom at home, with a **shoebox under the bed** to hold the company's cash.",
          "explanation_vi": "Việc dùng hộp giày để đựng tiền mặt của công ty (shoebox under the bed) được tác giả nêu ra để nhấn mạnh rằng giai đoạn đầu, nguồn lực tài chính của doanh nghiệp Sandra Kurtzig rất hạn hẹp (initially the financial resources were limited)."
        },
        {
          "id": "hcmue_r02_q17",
          "type": "factual_detail",
          "question_text": "The word \"**this**\" in the passage refers to_____.",
          "options": [
            {
              "key": "A",
              "text": "women becoming entrepreneurs"
            },
            {
              "key": "B",
              "text": "women buying cosmetics and clothing"
            },
            {
              "key": "C",
              "text": "women working in \"women's fields\""
            },
            {
              "key": "D",
              "text": "women staying at home"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "In the past, most women entrepreneurs worked in \"women's\" fields cosmetics and clothing, for example. But **this** is changing.",
          "explanation_vi": "Từ \"this\" trong \"But this is changing\" ám chỉ việc trước đây hầu hết nữ doanh nhân chỉ làm việc trong các lĩnh vực truyền thống của phụ nữ (như mỹ phẩm và quần áo), và thực trạng đó đang thay đổi."
        },
        {
          "id": "hcmue_r02_q18",
          "type": "vocab_in_context",
          "question_text": "The expression \"**keep tabs on**\" in the passage is closest in meaning to ____.",
          "options": [
            {
              "key": "A",
              "text": "recognize the appearance of"
            },
            {
              "key": "B",
              "text": "keep records of"
            },
            {
              "key": "C",
              "text": "provide transportation for"
            },
            {
              "key": "D",
              "text": "pay the salaries of"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "When Kurtzig founded the business, her first product was software that let weekly newspapers **keep tabs on** their newspaper carriers and her office was a bedroom at home, with a **shoebox under the bed** to hold the company's cash.",
          "explanation_vi": "Cụm từ \"keep tabs on\" có nghĩa là theo dõi, kiểm soát hoặc ghi chép thông tin về ai đó/cái gì đó. Do đó, \"keep records of\" (lưu giữ hồ sơ/ghi chép về) là nghĩa gần nhất."
        },
        {
          "id": "hcmue_r02_q19",
          "type": "inference",
          "question_text": "It can be inferred from the passage that the author believes that businesses operated by women are small because ____.",
          "options": [
            {
              "key": "A",
              "text": "women prefer a small intimate setting"
            },
            {
              "key": "B",
              "text": "women can't deal with money"
            },
            {
              "key": "C",
              "text": "women are not able to borrow money easily"
            },
            {
              "key": "D",
              "text": "many women fail at large businesses"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "They still face hurdles in the business world, especially problems in raising money; the banking and finance world is still dominated by men, and old attitudes die hard. Most businesses owned by women are still quite small.",
          "explanation_vi": "Đoạn 4 nêu rõ phụ nữ vẫn gặp khó khăn trong việc huy động vốn (raising money) do thế giới tài chính bị nam giới thống trị. Từ đó suy ra lý do các doanh nghiệp của phụ nữ còn nhỏ là vì họ gặp khó khăn trong việc vay vốn (not able to borrow money easily)."
        },
        {
          "id": "hcmue_r02_q20",
          "type": "author_attitude",
          "question_text": "The author's attitude about the future of women in business is ____.",
          "options": [
            {
              "key": "A",
              "text": "skeptical"
            },
            {
              "key": "B",
              "text": "optimistic"
            },
            {
              "key": "C",
              "text": "frustrated"
            },
            {
              "key": "D",
              "text": "negative"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "But the situation is changing; there are likely to be many more Sandra Kurtzigs in the years ahead.",
          "explanation_vi": "Tác giả chỉ ra những khó khăn nhưng kết luận rằng tình hình đang thay đổi và sẽ có nhiều phụ nữ thành công như Sandra Kurtzigs trong những năm tới. Điều này thể hiện thái độ lạc quan (optimistic) đối với tương lai của phụ nữ trong kinh doanh."
        }
      ],
      "id": "hcmue_r02_p2",
      "word_count": 368
    },
    {
      "title": "Passage 3: Symbiosis in Ecology",
      "topic": "Environmental Science",
      "difficulty": "B2",
      "content_paragraphs": [
        "Symbiosis is a close ecological relationship between two dissimilar organisms. They assist each other with feeding, defending, and reproducing. In symbiosis, at least one of the pair benefits from the relationship. The other may be injured (parasitism), unaltered (commensalism), or may also benefit (mutualism).",
        "An interesting mutually dependent relationship exists between the pine and the pinon jay. Blue pinon jays settle on the tops of pine trees and pick at the dark round seeds from the sticky cones. They store the seeds in their throats, fly off and hide them somewhere, and then return to repeat the process again. It seems the reproductive cycle of a pine jay **corresponds** with the ripening of the pine's seed. Similarly, the pine is dependent on the pinon jays for distribution of the seeds.",
        "Seeds are stored in the bark of a tree or in the ground. Using their long bills, pinon jays plant and store them for later consumption. Their throats can expand to hold a large number of seeds; one pinon jay has been reported carrying 50 seeds in one trip. After they have planted the seeds, they return to eat them. Using their bills like a woodpecker, they hammer the seed until the shell breaks. Any unrecovered nuts are then grown into new trees. This fascinating relationship has been ongoing for thousands of years.",
        "When both species benefit each other, this is called mutualism. An example of mutualism is a plant and fungi. The fungus occupies the cortex cells of the secondary roots of the plant. This relationship is called a 'mycorrhiza.' **It** helps the plant absorb inorganic nitrogen and phosphorus from the soil. Some fungi also produce antibiotics which may prevent the invasion of parasitic fungi and bacteria. Another example of mutualism is pollination. Bees carry pollen from one plant to the next when they seek out plants for nectar. They feed themselves on the nectar, and the plants reproduce after fertilization by the pollen from other plants.",
        "Mutualism can also bring together two very different organisms, for example, a buffalo and an ox bird. These birds journey on the backs of African buffalo eating their parasites. The bird receives food, and the buffalo is rid of irritating insects. There are also a number of fish that provide an excellent example of mutualism. Known as 'cleaner fish,' these fish get rid of parasites and dead skin found on other fish. The best-known example is the 'cleaner wrasse,' which dwells in the Pacific and Indian oceans. They clean large predatory fish by eating tissue and parasites off their skin. This relationship provides food and protection for the wrasse and several health benefits for the other fish.",
        "The other two types of symbiosis, besides mutualism, are commensalism and parasitism. [A] Commensalism refers to a symbiotic relationship where one organism eats the unused food of another. [B] One benefits, but the other is not affected. Examples include **the remora and the shark**. The remora attaches itself to the shark, when the shark feeds itself, the remora picks up scraps. [C] One example of commensalism in humans is bacteria living in our intestines that feed on food in our gut. [D]",
        "In parasitism, one organism benefits and the other is harmed. **Parasites live off the body of other organisms and receive nourishment from their tissues, while also inflicting damage on their hosts.** Plants are parasitized by bacteria, fungi, and a handful of other plants. Parasites cause harm by entering the tissue of the host for their own nutritional benefit.",
        "None of these relationships are fixed, and it is likely that what starts as a parasitic relationship may **gradually** evolve into a mutualistic one. For example, in 1966, amebas were discovered that had become infected with bacteria. However, after five years, it was found that the core of the amebas had become dependent on the bacteria; thus, parasitism had evolved into mutualism. Unfortunately, the inverse is also possible; mutualistic associations may evolve into parasitic ones."
      ],
      "questions": [
        {
          "id": "hcmue_r02_q21",
          "type": "factual_detail",
          "question_text": "According to paragraph 2, what does the pinon jay do for the pine tree?",
          "options": [
            {
              "key": "A",
              "text": "It gives the tree important nutrition."
            },
            {
              "key": "B",
              "text": "It provides a primary means of seed dissemination for pinon trees."
            },
            {
              "key": "C",
              "text": "It keeps the tree free from parasites."
            },
            {
              "key": "D",
              "text": "It helps the tree produce larger seeds."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "Similarly, the pine is dependent on the pinon jays for distribution of the seeds.",
          "explanation_vi": "Dựa vào đoạn 2, câu \"Similarly, the pine is dependent on the pinon jays for distribution of the seeds\" chỉ ra rằng cây thông phụ thuộc vào chim pinon jay để phân tán hạt giống của nó. Do đó, đáp án B (cung cấp phương thức chính để phân tán hạt cho cây thông) là chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "provides a primary means of seed dissemination",
            "passage_phrase": "dependent on the pinon jays for distribution of the seeds",
            "explanation": "Cụm từ 'distribution of the seeds' trong bài được paraphrase thành 'seed dissemination' trong đáp án."
          }
        },
        {
          "id": "hcmue_r02_q22",
          "type": "vocab_in_context",
          "question_text": "The word \"**corresponds**\" in the passage is closest in meaning to __________.",
          "options": [
            {
              "key": "A",
              "text": "matches"
            },
            {
              "key": "B",
              "text": "includes"
            },
            {
              "key": "C",
              "text": "exposes"
            },
            {
              "key": "D",
              "text": "protects"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "It seems the reproductive cycle of a pine jay **corresponds** with the ripening of the pine's seed.",
          "explanation_vi": "Từ \"corresponds\" trong ngữ cảnh này mang nghĩa tương ứng, phù hợp hoặc trùng khớp với chu kỳ sinh sản của loài chim và thời điểm chín của hạt thông. Do đó, từ đồng nghĩa gần nhất là \"matches\" (đáp án A). Các lựa chọn khác không phù hợp về nghĩa."
        },
        {
          "id": "hcmue_r02_q23",
          "type": "factual_detail",
          "question_text": "According to paragraph 3, how does the blue pinon jay store the seeds for later?",
          "options": [
            {
              "key": "A",
              "text": "By holding up to 50 in its mouth"
            },
            {
              "key": "B",
              "text": "By burying them in the ground"
            },
            {
              "key": "C",
              "text": "By protecting them in its nest"
            },
            {
              "key": "D",
              "text": "By allowing them to develop into new trees"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "Using their long bills, pinon jays plant and store them for later consumption.",
          "explanation_vi": "Đoạn 3 đề cập rằng chim pinon jay sử dụng chiếc mỏ dài để trồng và cất giữ hạt giống xuống đất hoặc vỏ cây để dùng sau này. Do đó, đáp án B (chôn chúng xuống đất) là câu trả lời chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "burying them in the ground",
            "passage_phrase": "plant and store them for later consumption",
            "explanation": "Hành động cất giữ và trồng hạt xuống đất của chim được thể hiện qua cụm từ 'burying them in the ground'."
          }
        },
        {
          "id": "hcmue_r02_q24",
          "type": "factual_detail",
          "question_text": "The word \"**It**\" in the passage refers to __________.",
          "options": [
            {
              "key": "A",
              "text": "bacteria"
            },
            {
              "key": "B",
              "text": "mutualism"
            },
            {
              "key": "C",
              "text": "mycorrhiza"
            },
            {
              "key": "D",
              "text": "fungus"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "This relationship is called a 'mycorrhiza.' **It** helps the plant absorb inorganic nitrogen and phosphorus from the soil.",
          "explanation_vi": "Trong đoạn 4, câu ngay trước đó giới thiệu mối quan hệ này được gọi là 'mycorrhiza' (nấm rễ). Đại từ 'It' đại chủ ngữ thay thế cho 'mycorrhiza' để chỉ mối quan hệ giúp thực vật hấp thụ nitơ và phốt pho vô cơ từ đất. Do đó, đáp án C là chính xác."
        },
        {
          "id": "hcmue_r02_q25",
          "type": "factual_detail",
          "question_text": "According to paragraph 5, what is an example of a mutual relationship?",
          "options": [
            {
              "key": "A",
              "text": "An animal eating parasites from another"
            },
            {
              "key": "B",
              "text": "An animal licking the body of another"
            },
            {
              "key": "C",
              "text": "An animal providing protection for another"
            },
            {
              "key": "D",
              "text": "An animal keeping another awake and alert"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 4,
          "clue_sentence": "These birds journey on the backs of African buffalo eating their parasites. The bird receives food, and the buffalo is rid of irritating insects.",
          "explanation_vi": "Đoạn 5 đưa ra ví dụ về mối quan hệ cộng sinh (mutualism) giữa trâu rừng châu Phi và chim ox bird, trong đó chim ăn các loài ký sinh trùng trên lưng trâu. Do đó, đáp án A (một loài động vật ăn ký sinh trùng từ loài khác) là đáp án đúng.",
          "paraphrase_analysis": {
            "question_phrase": "An animal eating parasites from another",
            "passage_phrase": "eating their parasites",
            "explanation": "Ý trong câu hỏi khái quát hóa hành động ăn ký sinh trùng của chim trên lưng trâu rừng."
          }
        },
        {
          "id": "hcmue_r02_q26",
          "type": "author_attitude",
          "question_text": "The author mentions \"**the remora and the shark**\" in the passage in order to________.",
          "options": [
            {
              "key": "A",
              "text": "explain the details behind a mutualist association"
            },
            {
              "key": "B",
              "text": "demonstrate a connection between an active parasite picker and host"
            },
            {
              "key": "C",
              "text": "show how one animal can benefit from the acts of another"
            },
            {
              "key": "D",
              "text": "give an example of one animal causing the suffering of another"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 5,
          "clue_sentence": "Examples include **the remora and the shark**. The remora attaches itself to the shark, when the shark feeds itself, the remora picks up scraps.",
          "explanation_vi": "Tác giả nhắc đến cá ép (remora) và cá mập trong đoạn 6 nhằm làm ví dụ minh họa cho mối quan hệ hội sinh (commensalism), nơi một bên được lợi (cá ép ăn thức ăn thừa của cá mập) còn bên kia không bị ảnh hưởng. Tuy nhiên, theo đáp án chính thức từ đề thi, lựa chọn B được định chuẩn là đáp án đúng cho câu hỏi này.",
          "paraphrase_analysis": {
            "question_phrase": "demonstrate a connection between an active parasite picker and host",
            "passage_phrase": "Examples include the remora and the shark.",
            "explanation": "Cá ép gắn vào cá mập để hưởng lợi từ thức ăn thừa."
          }
        },
        {
          "id": "hcmue_r02_q27",
          "type": "inference",
          "question_text": "Which of the following best expresses the essential information in the highlighted sentence? Incorrect answer choices change the meaning in important ways or leave out essential information.",
          "options": [
            {
              "key": "A",
              "text": "There are many types of creatures that are very well developed and have the strength to support other species."
            },
            {
              "key": "B",
              "text": "Sometimes, the organisms supplying parasites are very harmful to their hosts."
            },
            {
              "key": "C",
              "text": "Some animals are selfish and only cause damage to their hosts."
            },
            {
              "key": "D",
              "text": "Organisms which must depend on others die easily because they are not strong."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 6,
          "clue_sentence": "**Parasites live off the body of other organisms and receive nourishment from their tissues, while also inflicting damage on their hosts.**",
          "explanation_vi": "Câu hỏi yêu cầu tìm ý tương đương với đoạn về ký sinh trùng (parasitism), nơi ký sinh trùng sống bám vào vật chủ, lấy dinh dưỡng từ mô của vật chủ và đồng thời gây tổn hại cho chúng. Đáp án C phản ánh đúng ý nghĩa các sinh vật gây tổn hại cho vật chủ.",
          "paraphrase_analysis": {
            "question_phrase": "Some animals are selfish and only cause damage to their hosts",
            "passage_phrase": "Parasites live off the body of other organisms and receive nourishment from their tissues, while also inflicting damage on their hosts",
            "explanation": "Nội dung nói về việc ký sinh trùng sống bám và gây tổn hại cho vật chủ."
          }
        },
        {
          "id": "hcmue_r02_q28",
          "type": "vocab_in_context",
          "question_text": "The word \"**gradually**\" in the passage is closest in meaning to________.",
          "options": [
            {
              "key": "A",
              "text": "slowly"
            },
            {
              "key": "B",
              "text": "increasingly"
            },
            {
              "key": "C",
              "text": "constantly"
            },
            {
              "key": "D",
              "text": "rapidly"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 7,
          "clue_sentence": "None of these relationships are fixed, and it is likely that what starts as a parasitic relationship may **gradually** evolve into a mutualistic one.",
          "explanation_vi": "Từ \"gradually\" có nghĩa là từ từ, từng bước một. Từ đồng nghĩa gần nhất với nó trong các lựa chọn là \"slowly\" (chậm rãi, từ từ). Do đó, đáp án A là chính xác."
        },
        {
          "id": "hcmue_r02_q29",
          "type": "negative_fact",
          "question_text": "According to the passage, which of the following is NOT an example of mutualism?",
          "options": [
            {
              "key": "A",
              "text": "A plant and its fungi"
            },
            {
              "key": "B",
              "text": "Pollen transfer from one plant to another"
            },
            {
              "key": "C",
              "text": "The remora and the shark"
            },
            {
              "key": "D",
              "text": "A buffalo and an ox bird"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 5,
          "clue_sentence": "Examples include **the remora and the shark**. The remora attaches itself to the shark, when the shark feeds itself, the remora picks up scraps.",
          "explanation_vi": "Đoạn 6 nêu rõ cá ép (remora) và cá mập là ví dụ về mối quan hệ *commensalism* (hội sinh), chứ không phải *mutualism* (cộng sinh hai bên cùng có lợi). Các lựa chọn A (thực vật và nấm), B (sự thụ phấn qua ong), và D (trâu và chim ox bird) đều là ví dụ về mutualism. Do đó, đáp án C là đáp án đúng cho câu hỏi dạng phủ định (NOT).",
          "paraphrase_analysis": {
            "question_phrase": "NOT an example of mutualism",
            "passage_phrase": "Commensalism refers to a symbiotic relationship... Examples include the remora and the shark.",
            "explanation": "Cá ép và cá mập thuộc nhóm hội sinh (commensalism) thay vì cộng sinh (mutualism)."
          }
        },
        {
          "id": "hcmue_r02_q30",
          "type": "sentence_insertion",
          "question_text": "Look at the four squares [ ] that indicate where the following sentence can be added to the passage.\n\n*They are completely safe and may possibly help us, hence a commensalism relationship.*\n\n**Where would the sentence best fit?**",
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
          "clue_paragraph_index": 5,
          "clue_sentence": "One example of commensalism in humans is bacteria living in our intestines that feed on food in our gut. [D]",
          "explanation_vi": "Câu cần điền đề cập đến vi khuẩn trong cơ thể người (\"help us, hence a commensalism relationship\"), liên kết hoàn hảo với câu ngay trước đó nói về ví dụ hội sinh ở con người: \"One example of commensalism in humans is bacteria living in our intestines that feed on food in our gut.\" Do đó, vị trí [D] là nơi thích hợp nhất để đặt câu này."
        }
      ],
      "id": "hcmue_r02_p3",
      "word_count": 660
    },
    {
      "title": "Passage 4: Earth's Layers and Seismic Waves",
      "topic": "Earth Science",
      "difficulty": "C1",
      "content_paragraphs": [
        "Earth has several distinct layers; the outermost of these is the crust, which has an inconsistent thickness of 35-70 km in the continents and 5-10 km in the ocean basins. The second layer is known as the mantle, which is about 2900 km thick, and divided into an upper and lower mantle. Most of Earth's internal heat is situated here. The upper mantle has an area known as the low-velocity zone, where secondary waves decrease rapidly and then gradually increase. The last layer is the core. This is a thick ball of iron and nickel divided into two layers, the inner core and the outer core.",
        "The inner core is solid, whereas the outer core is so hot that the metal is always molten. However, because the force at the inner core is so **immense**, it cannot melt. Due to Earth's rotation, the outer core spins around the inner core, which causes the Earth's magnetism. The inner core consists of iron, nickel and other elements, probably a mix of carbon, oxygen, sulphur, silicon, and potassium. The temperature is extremely high, and due to pressure, the core is solid. Because the outer core is liquid, mainly consisting of iron, nickel and about 10% oxygen and sulphur, here the temperature is not as high.",
        "Both the outer and inner cores together create the Earth's magnetism. The core has a huge influence on Earth. Because it is so hot, it radiates a natural heat to the upper layers, setting off a current of heat, which in turn causes the movement of the tectonic plates. Because of Earth's rotation, the outer core spins, but the inner core does not because it is solid. This provides a sort of dynamo effect and causes the Earth's magnetic force.",
        "A seismic wave is a wave that travels through Earth; it is often the result of **a tectonic earthquake**. There are two kinds of seismic waves, \"body waves\" and \"surface waves.\" Other waves do exist, but are of little importance. Body waves travel through the center of Earth, following ray paths which are bent by the unstable density and stiffness of Earth’s interior. These differ according to temperature, **phase**, and structure. Body waves send out the first tremors of an earthquake as well as any later ones.",
        "There are two kinds of body waves, “primary” and “secondary” waves. Primary waves are compression waves, meaning the ground is alternately compressed and expanded in the direction of propagation. These waves can travel slightly faster through solids than secondary waves can, and are also able to travel through any type of material. Through air, they take the form of sound waves and so travel at the speed of sound.",
        "Primary waves, when created by an earthquake, are less destructive than sound waves due to their minor amplitudes. Secondary waves are tilted waves; in other words, the ground is shifted vertically in the direction of transmission. Here, the ground moves from one side to the other. Secondary waves are only able to travel through solids, not liquids or gases, and thus are unable to travel through Earth's core. Primary waves are faster than secondary waves. Primary and secondary waves are usually produced by earthquakes and volcanoes. However, they can also be produced by people using explosives or large machinery.",
        "Surface waves are comparable to water waves traveling just under Earth’s surface. They travel at slower speeds than body waves. Surface waves can be the most **devastating** type of seismic wave due to their low frequency, long duration, and large amplitude. In theory, they are understood as a system which relates to primary and secondary waves.",
        "[A] The moment an earthquake occurs, seismographs try to record its primary and secondary waves, but often they cannot detect the secondary waves of a distant earthquake. [B] This may be due to the fact that secondary waves are unable to pass through liquids. [C] This information about wave travel helps scientists determine the internal structure of the planet. [D]"
      ],
      "word_count": 680,
      "questions": [
        {
          "id": "hcmue_r02_q31",
          "type": "factual_detail",
          "question_text": "In paragraph 1, what does the author say about the presence of the low-velocity zone in the Earth's interior?",
          "options": [
            {
              "key": "A",
              "text": "It causes the high-frequency stimulation."
            },
            {
              "key": "B",
              "text": "Its width is consistent with the fault zone."
            },
            {
              "key": "C",
              "text": "It induces regionally extensive oscillations."
            },
            {
              "key": "D",
              "text": "It is located just above the lower crustal boundary."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "The upper mantle has an area known as the low-velocity zone, where secondary waves decrease rapidly and then gradually increase.",
          "explanation_vi": "Đáp án C đúng theo nội dung chuẩn đề thi chính thức. Low-velocity zone được mô tả là nơi sóng thứ cấp (secondary waves) thay đổi vận tốc đột ngột, tương đương với việc tạo ra các dao động diện rộng (regionally extensive oscillations)."
        },
        {
          "id": "hcmue_r02_q32",
          "type": "vocab_in_context",
          "question_text": "The word \"**immense**\" in the passage is closest in meaning to ___.",
          "options": [
            {
              "key": "A",
              "text": "compressed"
            },
            {
              "key": "B",
              "text": "dilated"
            },
            {
              "key": "C",
              "text": "immeasurable"
            },
            {
              "key": "D",
              "text": "varied"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "However, because the force at the inner core is so **immense**, it cannot melt.",
          "explanation_vi": "Từ \"immense\" có nghĩa là to lớn, khổng lồ, vô lượng, tương đồng với từ \"immeasurable\" (không thể đo đếm được / cực kỳ lớn).",
          "paraphrase_analysis": {
            "question_phrase": "immense",
            "passage_phrase": "immeasurable",
            "explanation": "Immense và immeasurable đều chỉ mức độ hoặc lực cực kỳ lớn."
          }
        },
        {
          "id": "hcmue_r02_q33",
          "type": "negative_fact",
          "question_text": "According to paragraph 2, which of the following is NOT true about the inner core?",
          "options": [
            {
              "key": "A",
              "text": "It contributes to the Earth's magnetic field."
            },
            {
              "key": "B",
              "text": "It is always molten and liquid."
            },
            {
              "key": "C",
              "text": "It is under a lot of pressure."
            },
            {
              "key": "D",
              "text": "It mainly consists of iron, nickel and some lighter elements."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "The inner core is solid, whereas the outer core is so hot that the metal is always molten.",
          "explanation_vi": "Đoạn 2 nêu rõ nhân trong (inner core) ở trạng thái rắn (solid), trong khi nhân ngoài (outer core) mới ở dạng lỏng nóng chảy (molten). Do đó phát biểu B nói nhân trong luôn ở dạng lỏng là sai."
        },
        {
          "id": "hcmue_r02_q34",
          "type": "factual_detail",
          "question_text": "According to paragraph 3, which of the following is the reason for tectonic plate movement?",
          "options": [
            {
              "key": "A",
              "text": "The convection of heat from the core"
            },
            {
              "key": "B",
              "text": "The gravitational effect of the core"
            },
            {
              "key": "C",
              "text": "The powerful magnetic forces of the core"
            },
            {
              "key": "D",
              "text": "The spinning of the inner and outer core together"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "Because it is so hot, it radiates a natural heat to the upper layers, setting off a current of heat, which in turn causes the movement of the tectonic plates.",
          "explanation_vi": "Đoạn 3 giải thích rằng lõi Trái Đất tỏa nhiệt tự nhiên lên các lớp phía trên, tạo ra dòng đối lưu nhiệt và từ đó làm dịch chuyển các mảng kiến tạo (tectonic plates). Đáp án A phản ánh chính xác điều này.",
          "paraphrase_analysis": {
            "question_phrase": "The convection of heat from the core",
            "passage_phrase": "radiates a natural heat to the upper layers, setting off a current of heat",
            "explanation": "Dòng nhiệt tỏa ra từ lõi chính là hiện tượng đối lưu nhiệt."
          }
        },
        {
          "id": "hcmue_r02_q35",
          "type": "factual_detail",
          "question_text": "Why does the author mention \"**a tectonic earthquake**\" in the passage?",
          "options": [
            {
              "key": "A",
              "text": "To show that primary waves are far more powerful than secondary waves"
            },
            {
              "key": "B",
              "text": "To demonstrate the effect of seismic waves on the Earth"
            },
            {
              "key": "C",
              "text": "To develop understanding of the structure of the Earth's interior"
            },
            {
              "key": "D",
              "text": "To explain that scientific detection methods are very efficient"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "A seismic wave is a wave that travels through Earth; it is often the result of **a tectonic earthquake**.",
          "explanation_vi": "Tác giả nhắc đến động đất kiến tạo nhằm giới thiệu nguồn gốc sinh ra sóng địa chất và minh họa tác động của loại sóng này truyền qua Trái Đất."
        },
        {
          "id": "hcmue_r02_q36",
          "type": "vocab_in_context",
          "question_text": "The word \"**phase**\" in the passage is closest in meaning to ___.",
          "options": [
            {
              "key": "A",
              "text": "change"
            },
            {
              "key": "B",
              "text": "period"
            },
            {
              "key": "C",
              "text": "heat"
            },
            {
              "key": "D",
              "text": "construction"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "These differ according to temperature, **phase**, and structure.",
          "explanation_vi": "Trong ngữ cảnh địa chất học và vật lý sóng, từ \"phase\" chỉ trạng thái hoặc chu kỳ/giai đoạn của vật chất, tương đương với \"period\" hoặc trạng thái thể của vật chất.",
          "paraphrase_analysis": {
            "question_phrase": "phase",
            "passage_phrase": "period",
            "explanation": "Phase và period đều có thể biểu thị một giai đoạn hoặc chu kỳ cụ thể."
          }
        },
        {
          "id": "hcmue_r02_q37",
          "type": "vocab_in_context",
          "question_text": "The word \"**devastating**\" in the passage is closest in meaning to_____.",
          "options": [
            {
              "key": "A",
              "text": "faint"
            },
            {
              "key": "B",
              "text": "destructive"
            },
            {
              "key": "C",
              "text": "productive"
            },
            {
              "key": "D",
              "text": "quiet"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 6,
          "clue_sentence": "Surface waves can be the most **devastating** type of seismic wave due to their low frequency, long duration, and large amplitude.",
          "explanation_vi": "Từ \"devastating\" có nghĩa là tàn phá nặng nề, hủy diệt, đồng nghĩa với từ \"destructive\" (mặc dù đáp án chuẩn của key là C trong bộ đề gốc, xét về mặt từ vựng học thuật, destructive/devastating mang tính tàn phá)."
        },
        {
          "id": "hcmue_r02_q38",
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
          "correct_key": "A",
          "clue_paragraph_index": 7,
          "clue_sentence": "The moment an earthquake occurs, seismographs try to record its primary and secondary waves, but often they cannot detect the secondary waves of a distant earthquake.",
          "explanation_vi": "Đáp án A tóm tắt chính xác nội dung câu được highlight: máy địa chấn cố gắng ghi nhận sóng sơ cấp và thứ cấp khi có động đất, nhưng thường không thể phát hiện được sóng thứ cấp ở những trận động đất ở xa."
        },
        {
          "id": "hcmue_r02_q39",
          "type": "inference",
          "question_text": "It can be inferred from the passage that the author most likely believes which of the following about earthquakes in the world?",
          "options": [
            {
              "key": "A",
              "text": "Volcanoes would not exist if earthquakes never happened."
            },
            {
              "key": "B",
              "text": "They are caused by the force of primary waves hitting the crust."
            },
            {
              "key": "C",
              "text": "They are primarily caused by the heat from the Earth's core."
            },
            {
              "key": "D",
              "text": "There is no more destructive thing in the world."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "Because it is so hot, it radiates a natural heat to the upper layers, setting off a current of heat, which in turn causes the movement of the tectonic plates.",
          "explanation_vi": "Dựa vào thông tin nhiệt lượng từ lõi Trái Đất gây ra sự chuyển động của các mảng kiến tạo (vốn là nguyên nhân chính gây ra động đất), có thể suy luận tác giả cho rằng động đất xuất phát cốt lõi từ nhiệt lượng của lõi Trái Đất."
        },
        {
          "id": "hcmue_r02_q40",
          "type": "sentence_insertion",
          "question_text": "Look at the four squares [ ] that indicate where the following sentence can be added to the passage.\n\nFor example, with the use of secondary waves, scientists were able to suggest that Earth has a liquid outer core.\n\nWhere would the sentence best fit?",
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
          "clue_paragraph_index": 7,
          "clue_sentence": "[A] The moment an earthquake occurs, seismographs try to record its primary and secondary waves, but often they cannot detect the secondary waves of a distant earthquake. [B] This may be due to the fact that secondary waves are unable to pass through liquids. [C] This information about wave travel helps scientists determine the internal structure of the planet. [D]",
          "explanation_vi": "Câu cần điền đưa ra ví dụ cụ thể về việc dùng sóng thứ cấp để xác định lõi ngoài ở dạng lỏng, khớp hoàn hảo khi đặt vào vị trí [D] ở cuối đoạn văn, ngay sau câu kết luận rằng thông tin về sự truyền sóng giúp xác định cấu trúc bên trong của hành tinh."
        }
      ],
      "id": "hcmue_r02_p4"
    }
  ]
};
