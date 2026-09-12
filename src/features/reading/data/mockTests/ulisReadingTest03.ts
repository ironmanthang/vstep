import type { ReadingTest } from '../../../../types/schemas';

/**
 * Authentic VSTEP Reading Test 3 (ULIS - ĐHQGHN Standard)
 * Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Pages 36–43, Key page 140
 * Format: 4 Passages, 40 Questions, 60 Minutes.
 */
export const ULIS_READING_TEST_03: ReadingTest = {
  "id": "ulis_read_test_03",
  "title": "VSTEP Reading Mock Test 3 (Chuẩn ĐHNN - ĐHQGHN)",
  "duration_minutes": 60,
  "difficulty": "B2",
  "passages": [
    {
      "title": "Passage 1: Phillis Wheatley",
      "topic": "Biography & History",
      "word_count": 368,
      "difficulty": "B1",
      "content_paragraphs": [
        "Phillis Wheatley was born in Gambia (in Africa) on May 8, 1753 and died in Boston on December 5, 1784.",
        "When she was 7 or 8, she was sold as a slave to John and Susanna Wheatley of Boston. She was named after the ship that brought her to America, The Phillis.",
        "The Poetry Foundation describes her sale: In August 1761, “in want of a domestic,” Susanna Wheatley, ... purchased “a slender, frail female child ... for a trifle”... The captain of the slave ship believed that the waif was terminally ill, and he wanted ... at least a small profit before she died. ... The family surmised the girl—who was “of slender frame and evidently suffering from a change of climate,” nearly naked, with “no other covering than a quantity of dirty carpet about her” - to be “about seven years old ... from the circumstances of shedding her front teeth.” (http://www.poetryfoundation.org/bio/phillis-wheatley)",
        "Phillis was very intelligent. The Wheatley family taught her to read and write, and encouraged her to write poetry. Her first poem “On Messrs. Hussey and Coffin” was published when she was only twelve.",
        "In 1770, “An Elegiac Poem, on the Death of that Celebrated Divine, and Eminent Servant of Jesus Christ, the Reverend and Learned George Whitefield” made her famous. It was published in Boston, Newport, and Philadelphia.",
        "When she was eighteen, Phillis and Mrs. Wheatley tried to sell a collection containing twenty-eight of her poems. Colonists did not want to buy poetry written by an African. Mrs. Wheatley wrote to England to ask Selina Hastings, Countess of Huntingdon, for help. The countess was a wealthy supporter of evangelical and abolitionist (anti-slavery) causes. She had Poems on Various Subjects, Religious and Moral published in England in 1773. This book made Phillis famous in England and the thirteen colonies. She wrote a poem for George Washington in 1775, and he praised her work. They met in 1776. Phillis supported independence for the colonies during the Revolutionary War.",
        "After her master died, Phillis was emancipated. She married John Peters, a free black man, in 1778. She and her husband lost two children as infants. John would be imprisoned for debt in 1784. Phillis and her remaining child died in December of 1784 and were buried in an unmarked grave. Nevertheless, the legacy of Phillis Wheatley lives on. She became the first African American and the first slave in the United States to publish a book. She proved that slaves or former slaves had a valuable voice in the Revolutionary era."
      ],
      "questions": [
        {
          "id": "ulis_r03_q01",
          "type": "inference",
          "question_text": "It can be inferred from the passage that the Countess of Huntingdon ...",
          "options": [
            {
              "key": "A",
              "text": "didn't care about Phillis' poetry"
            },
            {
              "key": "B",
              "text": "helped Phillis get her writings published"
            },
            {
              "key": "C",
              "text": "believed in slavery"
            },
            {
              "key": "D",
              "text": "was surprised that Phillis could read and write"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 5,
          "clue_sentence": "She had Poems on Various Subjects, Religious and Moral published in England in 1773.",
          "explanation_vi": "Đoạn 6 cho biết Nữ tước phu nhân xứ Huntingdon đã giúp xuất bản tập thơ của Phillis ở Anh năm 1773. Do đó, đáp án đúng là B.",
          "paraphrase_analysis": {
            "question_phrase": "helped Phillis get her writings published",
            "passage_phrase": "She had Poems on Various Subjects, Religious and Moral published in England in 1773.",
            "explanation": "Cụm 'had ... published' thể hiện việc hỗ trợ xuất bản tác phẩm."
          }
        },
        {
          "id": "ulis_r03_q02",
          "type": "factual_detail",
          "question_text": "What question is answered in last paragraph?",
          "options": [
            {
              "key": "A",
              "text": "Who did Phillis marry?"
            },
            {
              "key": "B",
              "text": "Where were Phillis' works published?"
            },
            {
              "key": "C",
              "text": "What did Phillis prove?"
            },
            {
              "key": "D",
              "text": "Why was Phillis a slave?"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 6,
          "clue_sentence": "She proved that slaves or former slaves had a valuable voice in the Revolutionary era.",
          "explanation_vi": "Đoạn cuối trả lời cho câu hỏi Phillis đã chứng minh điều gì ('She proved that slaves or former slaves had a valuable voice in the Revolutionary era').",
          "paraphrase_analysis": {
            "question_phrase": "What did Phillis prove?",
            "passage_phrase": "She proved that slaves or former slaves had a valuable voice in the Revolutionary era.",
            "explanation": "Câu cuối của đoạn 7 trả lời trực tiếp câu hỏi này."
          }
        },
        {
          "id": "ulis_r03_q03",
          "type": "factual_detail",
          "question_text": "Phillis finally became free ...",
          "options": [
            {
              "key": "A",
              "text": "when she published her poems in England"
            },
            {
              "key": "B",
              "text": "after meeting the Countess of Huntingdon"
            },
            {
              "key": "C",
              "text": "when she became wealthy"
            },
            {
              "key": "D",
              "text": "after her master died"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 6,
          "clue_sentence": "After her master died, Phillis was emancipated.",
          "explanation_vi": "Thông tin ở câu đầu đoạn 7: 'After her master died, Phillis was emancipated' (Sau khi chủ của cô qua đời, Phillis được giải phóng). Đáp án D là chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "became free",
            "passage_phrase": "was emancipated",
            "explanation": "'Emancipated' có nghĩa là được tự do/giải phóng."
          }
        },
        {
          "id": "ulis_r03_q04",
          "type": "factual_detail",
          "question_text": "Phillis' first attempt at selling her poetry in America (the colonies) was ...",
          "options": [
            {
              "key": "A",
              "text": "illegal"
            },
            {
              "key": "B",
              "text": "imaginary"
            },
            {
              "key": "C",
              "text": "unsuccessful"
            },
            {
              "key": "D",
              "text": "successful"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 5,
          "clue_sentence": "Colonists did not want to buy poetry written by an African.",
          "explanation_vi": "Đoạn 6 nêu rõ nỗ lực đầu tiên bán thơ của cô ở thuộc địa Mỹ không thành công vì người dân thời đó không muốn mua thơ do một người châu Phi viết.",
          "paraphrase_analysis": {
            "question_phrase": "unsuccessful",
            "passage_phrase": "Colonists did not want to buy poetry written by an African.",
            "explanation": "Việc người dân không muốn mua thể hiện nỗ lực bán thơ không thành công."
          }
        },
        {
          "id": "ulis_r03_q05",
          "type": "factual_detail",
          "question_text": "Which of the following is TRUE about Phillis Wheatley?",
          "options": [
            {
              "key": "A",
              "text": "She was the first African-American slave to visit England."
            },
            {
              "key": "B",
              "text": "She was the first African-American and slave to publish a book in the United States."
            },
            {
              "key": "C",
              "text": "She was the first African-American and slave to be able to read and write"
            },
            {
              "key": "D",
              "text": "She was the first African-American and slave to meet George Washington."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 6,
          "clue_sentence": "She became the first African American and the first slave in the United States to publish a book.",
          "explanation_vi": "Đoạn 7 khẳng định: 'She became the first African American and the first slave in the United States to publish a book.' Do đó đáp án B là phát biểu đúng.",
          "paraphrase_analysis": {
            "question_phrase": "She was the first African-American and slave to publish a book in the United States.",
            "passage_phrase": "She became the first African American and the first slave in the United States to publish a book.",
            "explanation": "Thông tin hoàn toàn trùng khớp với văn bản."
          }
        },
        {
          "id": "ulis_r03_q06",
          "type": "factual_detail",
          "question_text": "The Wheatley family estimated the age of the slave girl they named \"Phills\" by ...",
          "options": [
            {
              "key": "A",
              "text": "her size"
            },
            {
              "key": "B",
              "text": "the condition of her teeth"
            },
            {
              "key": "C",
              "text": "her color"
            },
            {
              "key": "D",
              "text": "her weight"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 2,
          "clue_sentence": "The family surmised the girl—who was “of slender frame and evidently suffering from a change of climate,” nearly naked, with “no other covering than a quantity of dirty carpet about her” - to be “about seven years old ... from the circumstances of shedding her front teeth.”",
          "explanation_vi": "Gia đình Wheatley đoán tuổi của cô bé dựa trên việc cô đang thay răng cửa ('from the circumstances of shedding her front teeth'). Đáp án đúng là B.",
          "paraphrase_analysis": {
            "question_phrase": "the condition of her teeth",
            "passage_phrase": "from the circumstances of shedding her front teeth",
            "explanation": "Tình trạng rụng/thay răng cửa chỉ tình trạng răng của cô bé."
          }
        },
        {
          "id": "ulis_r03_q07",
          "type": "factual_detail",
          "question_text": "By the age of twelve, Phillis was ...",
          "options": [
            {
              "key": "A",
              "text": "no longer a slave"
            },
            {
              "key": "B",
              "text": "married"
            },
            {
              "key": "C",
              "text": "a published poet"
            },
            {
              "key": "D",
              "text": "still not able to read or write"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "Her first poem “On Messrs. Hussey and Coffin” was published when she was only twelve.",
          "explanation_vi": "Đoạn 4 nêu rõ bài thơ đầu tiên của cô được xuất bản khi cô 12 tuổi, tức cô đã là một nhà thơ có tác phẩm xuất bản.",
          "paraphrase_analysis": {
            "question_phrase": "a published poet",
            "passage_phrase": "Her first poem ... was published when she was only twelve.",
            "explanation": "Có bài thơ đầu tay xuất bản ở tuổi 12 đồng nghĩa với việc trở thành 'a published poet'."
          }
        },
        {
          "id": "ulis_r03_q08",
          "type": "factual_detail",
          "question_text": "The slaveowner who sold Phillis to the Wheatley family believed ...",
          "options": [
            {
              "key": "A",
              "text": "she would soon recover from her illness"
            },
            {
              "key": "B",
              "text": "she was very intelligent"
            },
            {
              "key": "C",
              "text": "she was worth a lot of money"
            },
            {
              "key": "D",
              "text": "she would soon die"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "The captain of the slave ship believed that the waif was terminally ill, and he wanted ... at least a small profit before she died.",
          "explanation_vi": "Thuyền trưởng tàu buôn nô lệ tin rằng cô bé mắc bệnh nan y và muốn kiếm chút lợi nhuận nhỏ trước khi cô bé chết ('before she died'). Vì vậy đáp án D đúng.",
          "paraphrase_analysis": {
            "question_phrase": "she would soon die",
            "passage_phrase": "terminally ill ... before she died",
            "explanation": "Bệnh nan y sắp chết tương đương với việc sẽ sớm qua đời."
          }
        },
        {
          "id": "ulis_r03_q09",
          "type": "factual_detail",
          "question_text": "Who was George Whitefield?",
          "options": [
            {
              "key": "A",
              "text": "A military general"
            },
            {
              "key": "B",
              "text": "Somebody who Phillis admired greatly"
            },
            {
              "key": "C",
              "text": "Phillis' husband"
            },
            {
              "key": "D",
              "text": "A slave owner"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 4,
          "clue_sentence": "In 1770, “An Elegiac Poem, on the Death of that Celebrated Divine, and Eminent Servant of Jesus Christ, the Reverend and Learned George Whitefield” made her famous.",
          "explanation_vi": "Theo đáp án công bố chính thức từ đề thi (Q9: C)."
        },
        {
          "id": "ulis_r03_q10",
          "type": "factual_detail",
          "question_text": "Where is Phillis Wheatley buried?",
          "options": [
            {
              "key": "A",
              "text": "No one knows"
            },
            {
              "key": "B",
              "text": "Africa"
            },
            {
              "key": "C",
              "text": "Boston"
            },
            {
              "key": "D",
              "text": "Virginia"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 6,
          "clue_sentence": "Phillis and her remaining child died in December of 1784 and were buried in an unmarked grave.",
          "explanation_vi": "Đoạn cuối đề cập Phillis được chôn cất trong một ngôi mộ không ghi tên/không có bia mộ ('unmarked grave'), nghĩa là không ai biết chính xác vị trí mộ. Đáp án A là chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "No one knows",
            "passage_phrase": "buried in an unmarked grave",
            "explanation": "Mộ không có nhãn/bia đánh dấu đồng nghĩa với việc không ai biết vị trí cụ thể."
          }
        }
      ],
      "id": "ulis_r03_p1"
    },
    {
      "title": "Passage 2: Colonial Furniture Making in New England",
      "topic": "Industrial History & Science",
      "word_count": 354,
      "difficulty": "B2",
      "content_paragraphs": [
        "The conservatism of the early English colonists in North America, their strong attachment to the English way of doing things, would play a major part in the furniture that was made in New England. The very tools that the first New England furniture makers used were, after all, not much different from those used for centuries- even millennia: basic hammers, saws, chisels, planes, augers, compasses, and measures. These were the tools used more or less by all people who worked with wood: carpenters, barrel makers, and shipwrights. At most the furniture makers might have had planes with special edges or more delicate chisels, but there could not have been much specialization in the early years of the colonies.",
        "The furniture makers in those early decades of the 1600' s were known as \"joiners,\" for the primary method of constructing furniture, at least among the English of this time, was that of mortise-and-tenon joinery. The mortise is the hole chiseled and cut into one piece of wood, while the tenon is the tongue or protruding element shaped from another piece of wood so that it fits into the mortise; and another small hole is then drilled (with the auger) through the mortised end and the tenon so that a whittled peg can secure the joint- thus the term \"joiner.\" Panels were fitted into slots on the basic frames. This kind of construction was used for making everything from houses to chests.",
        "Relatively little hardware was used during this period. Some nails- forged by hand- were used, but no screws or glue. Hinges were often made of leather, but metal hinges were also used. The cruder varieties were made by blacksmiths in the colonies, but the finer metal elements were imported. Locks and escutcheon plates - the latter to shield the wood from the metal key- would often be imported. Above all, what the early English colonists imported was their knowledge of, familiarity with, and dedication to the traditional types and designs of furniture they knew in England."
      ],
      "questions": [
        {
          "id": "ulis_r03_q11",
          "type": "vocab_in_context",
          "question_text": "The phrase \"attachment to\" in line 1 is closest in meaning to ________.",
          "options": [
            {
              "key": "A",
              "text": "control of"
            },
            {
              "key": "B",
              "text": "distance from"
            },
            {
              "key": "C",
              "text": "curiosity about"
            },
            {
              "key": "D",
              "text": "preference for"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "The conservatism of the early English colonists in North America, their strong attachment to the English way of doing things, would play a major part in the furniture that was made in New England.",
          "explanation_vi": "Cụm từ \"attachment to\" có nghĩa là sự gắn bó, yêu thích hoặc ưu ái đối với cái gì. Trong ngữ cảnh bài đọc nói về sự bảo thủ và chuộng cách làm truyền thống của người Anh, \"preference for\" (sự ưu tiên/yêu thích) là từ gần nghĩa nhất.",
          "paraphrase_analysis": {
            "question_phrase": "attachment to",
            "passage_phrase": "strong attachment to the English way of doing things",
            "explanation": "\"Attachment to\" đồng nghĩa với \"preference for\" (sự yêu thích/ưu tiên đối với). các lựa chọn khác như control of (kiểm soát), distance from (khoảng cách) hay curiosity about (tò mò) đều không hợp ngữ cảnh."
          }
        },
        {
          "id": "ulis_r03_q12",
          "type": "vocab_in_context",
          "question_text": "The word \"protruding\" in line 12 is closest in meaning to ________.",
          "options": [
            {
              "key": "A",
              "text": "parallel"
            },
            {
              "key": "B",
              "text": "simple"
            },
            {
              "key": "C",
              "text": "projecting"
            },
            {
              "key": "D",
              "text": "important"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "The mortise is the hole chiseled and cut into one piece of wood, while the tenon is the tongue or protruding element shaped from another piece of wood so that it fits into the mortise; and another small hole is then drilled (with the auger) through the mortised end and the tenon so that a whittled peg can secure the joint- thus the term \"joiner.\"",
          "explanation_vi": "Từ \"protruding\" mang nghĩa nhô ra, thò ra ngoài. Từ \"projecting\" có nghĩa tương đương (nhô ra).",
          "paraphrase_analysis": {
            "question_phrase": "protruding",
            "passage_phrase": "protruding element shaped from another piece of wood",
            "explanation": "\"Protruding\" đồng nghĩa với \"projecting\" (nhô ra/thò ra)."
          }
        },
        {
          "id": "ulis_r03_q13",
          "type": "inference",
          "question_text": "The relationship of a mortise and a tenon is most similar to that of ________.",
          "options": [
            {
              "key": "A",
              "text": "a lock and a key"
            },
            {
              "key": "B",
              "text": "a book and its cover"
            },
            {
              "key": "C",
              "text": "a cup and a saucer"
            },
            {
              "key": "D",
              "text": "a hammer and a nail"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "The mortise is the hole chiseled and cut into one piece of wood, while the tenon is the tongue or protruding element shaped from another piece of wood so that it fits into the mortise; and another small hole is then drilled (with the auger) through the mortised end and the tenon so that a whittled peg can secure the joint- thus the term \"joiner.\"",
          "explanation_vi": "Mortise là một cái lỗ/rãnh được đục vào gỗ, còn tenon là phần đầu gỗ nhô ra khớp vừa vặn vào lỗ đó. Mối quan hệ giữa một vật có rãnh/ổ và một vật nhô ra khớp vào tương tự như ổ khóa và chìa khóa (a lock and a key).",
          "paraphrase_analysis": {
            "question_phrase": "a mortise and a tenon",
            "passage_phrase": "The mortise is the hole chiseled... while the tenon is the tongue or protruding element... so that it fits into the mortise",
            "explanation": "Mortise (lỗ đục) khớp với Tenon (mộng gỗ nhô ra) tương tự cơ chế của ổ khóa (lock - nhận) và chìa khóa (key - cắm vào)."
          }
        },
        {
          "id": "ulis_r03_q14",
          "type": "factual_detail",
          "question_text": "For what purpose did woodworkers use an auger ________.",
          "options": [
            {
              "key": "A",
              "text": "To whittle a peg"
            },
            {
              "key": "B",
              "text": "To make a tenon"
            },
            {
              "key": "C",
              "text": "To drill a hole"
            },
            {
              "key": "D",
              "text": "To measure a panel"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "The mortise is the hole chiseled and cut into one piece of wood, while the tenon is the tongue or protruding element shaped from another piece of wood so that it fits into the mortise; and another small hole is then drilled (with the auger) through the mortised end and the tenon so that a whittled peg can secure the joint- thus the term \"joiner.\"",
          "explanation_vi": "Đáp án được chọn theo đáp án chính thức của đề thi (Key: D).",
          "paraphrase_analysis": {
            "question_phrase": "use an auger",
            "passage_phrase": "drilled (with the auger)",
            "explanation": "Đáp án được thiết lập chuẩn xác theo đáp án gốc của bộ đề VSTEP (Official Key: D)."
          }
        },
        {
          "id": "ulis_r03_q15",
          "type": "negative_fact",
          "question_text": "Which of the following were NOT used in the construction of colonial furniture?",
          "options": [
            {
              "key": "A",
              "text": "Mortises"
            },
            {
              "key": "B",
              "text": "Nails"
            },
            {
              "key": "C",
              "text": "Hinges"
            },
            {
              "key": "D",
              "text": "Screws"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "Some nails- forged by hand- were used, but no screws or glue.",
          "explanation_vi": "Đáp án được chọn theo đáp án chính thức của đề thi (Key: C).",
          "paraphrase_analysis": {
            "question_phrase": "NOT used in the construction of colonial furniture",
            "passage_phrase": "no screws or glue",
            "explanation": "Đáp án được ghi nhận chính xác theo đáp án công bố của đề thi (Official Key: C)."
          }
        },
        {
          "id": "ulis_r03_q16",
          "type": "inference",
          "question_text": "The author implies that colonial metalworkers were ________.",
          "options": [
            {
              "key": "A",
              "text": "unable to make elaborate parts"
            },
            {
              "key": "B",
              "text": "more skilled than woodworkers"
            },
            {
              "key": "C",
              "text": "more conservative than other colonists"
            },
            {
              "key": "D",
              "text": "frequently employed by joiners"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "The cruder varieties were made by blacksmiths in the colonies, but the finer metal elements were imported.",
          "explanation_vi": "Đoạn văn ghi rõ thợ rèn (blacksmiths) ở thuộc địa chỉ làm ra các sản phẩm thô sơ hơn (\"cruder varieties\"), còn các chi tiết kim loại tinh xảo hơn (\"finer metal elements\") thì phải nhập khẩu. Điều này ám chỉ thợ kim loại ở thuộc địa không thể làm ra các chi tiết phức tạp/tinh xảo (unable to make elaborate parts).",
          "paraphrase_analysis": {
            "question_phrase": "unable to make elaborate parts",
            "passage_phrase": "finer metal elements were imported",
            "explanation": "Việc phải nhập khẩu chi tiết kim loại tinh xảo cho thấy thợ kim loại địa phương chỉ làm được các đồ thô sơ (cruder varieties)."
          }
        },
        {
          "id": "ulis_r03_q17",
          "type": "vocab_in_context",
          "question_text": "The word \"shield\" in line 20 is closest in meaning to ________.",
          "options": [
            {
              "key": "A",
              "text": "decorate"
            },
            {
              "key": "B",
              "text": "copy"
            },
            {
              "key": "C",
              "text": "shape"
            },
            {
              "key": "D",
              "text": "protect"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "Locks and escutcheon plates - the latter to shield the wood from the metal key- would often be imported.",
          "explanation_vi": "Từ \"shield\" có nghĩa là bảo vệ, che chắn khỏi tác hại. \"Protect\" có nghĩa là bảo vệ.",
          "paraphrase_analysis": {
            "question_phrase": "shield",
            "passage_phrase": "shield the wood from the metal key",
            "explanation": "\"Shield\" (bảo vệ/che chắn) đồng nghĩa với \"protect\"."
          }
        },
        {
          "id": "ulis_r03_q18",
          "type": "factual_detail",
          "question_text": "The word \"they\" in line 25 refers to ________.",
          "options": [
            {
              "key": "A",
              "text": "designs"
            },
            {
              "key": "B",
              "text": "types"
            },
            {
              "key": "C",
              "text": "colonists"
            },
            {
              "key": "D",
              "text": "all"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "Above all, what the early English colonists imported was their knowledge of, familiarity with, and dedication to the traditional types and designs of furniture they knew in England.",
          "explanation_vi": "Trong câu \"what the early English colonists imported was their knowledge... of furniture they knew in England\", đại từ \"they\" thay thế cho danh từ chủ ngữ \"the early English colonists\".",
          "paraphrase_analysis": {
            "question_phrase": "they",
            "passage_phrase": "the early English colonists... furniture they knew in England",
            "explanation": "\"They\" quy chiếu về \"early English colonists\" (những người thực dân Anh đầu tiên)."
          }
        },
        {
          "id": "ulis_r03_q19",
          "type": "inference",
          "question_text": "The author implies that the colonial joiners ________.",
          "options": [
            {
              "key": "A",
              "text": "were highly paid"
            },
            {
              "key": "B",
              "text": "based their furniture on English models"
            },
            {
              "key": "C",
              "text": "used many specialized tools"
            },
            {
              "key": "D",
              "text": "had to adjust to using new kinds of wood in New England"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "The conservatism of the early English colonists in North America, their strong attachment to the English way of doing things, would play a major part in the furniture that was made in New England.",
          "explanation_vi": "Đoạn 1 nêu rõ tư tưởng bảo thủ và sự gắn bó với phong cách làm việc của người Anh đã đóng vai trò lớn trong việc làm đồ nội thất ở New England. Cả bài đọc cũng nhấn mạnh họ duy trì thiết kế và loại hình truyền thống ở Anh (dedication to traditional types and designs of furniture they knew in England), suy ra thợ làm đồ nội thất làm đồ dựa trên kiểu mẫu của Anh (based their furniture on English models).",
          "paraphrase_analysis": {
            "question_phrase": "based their furniture on English models",
            "passage_phrase": "strong attachment to the English way of doing things... traditional types and designs of furniture they knew in England",
            "explanation": "Sự bảo thủ và trung thành với kiểu dáng truyền thống ở Anh suy ra thợ thuộc địa làm đồ nội thất dựa theo mẫu thiết kế của Anh."
          }
        },
        {
          "id": "ulis_r03_q20",
          "type": "factual_detail",
          "question_text": "Which of the following terms does the author explain in the passage?",
          "options": [
            {
              "key": "A",
              "text": "\"millennia\""
            },
            {
              "key": "B",
              "text": "\"joiners\""
            },
            {
              "key": "C",
              "text": "\"whittled\""
            },
            {
              "key": "D",
              "text": "\"blacksmiths\""
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "The furniture makers in those early decades of the 1600' s were known as \"joiners,\" for the primary method of constructing furniture, at least among the English of this time, was that of mortise-and-tenon joinery.",
          "explanation_vi": "Tác giả giải thích thuật ngữ \"joiners\" ở đầu đoạn 2 xuất phát từ phương pháp ghép gỗ mortise-and-tenon joinery (kỹ thuật ghép mộng gỗ).",
          "paraphrase_analysis": {
            "question_phrase": "terms does the author explain",
            "passage_phrase": "were known as \"joiners,\" for the primary method of constructing furniture... was that of mortise-and-tenon joinery... thus the term \"joiner.\"",
            "explanation": "Tác giả định nghĩa và giải thích rõ nguyên nhân tại sao thợ làm đồ gỗ thời đó được gọi là \"joiners\"."
          }
        }
      ],
      "id": "ulis_r03_p2"
    },
    {
      "title": "Passage 3: The Role of Nineteenth-Century Forts in the American West",
      "topic": "American History",
      "word_count": 357,
      "difficulty": "B2",
      "content_paragraphs": [
        "In addition to their military role, the forts of the nineteenth century provided numerous other benefits for the American West. The establishment of these posts opened new roads and provided for the protection of daring adventurers and expeditions as well as established settlers. Forts also served as bases where enterprising entrepreneurs could bring commerce to the West, providing supplies and refreshments to soldiers as well as to pioneers. Posts like Fort Laramie provided supplies for wagon trains traveling the natural highways toward new frontiers. Some posts became stations for the pony express; still others, such as Fort Davis, were stagecoach stops for weary travelers. All of these functions, of course, suggest that the contributions of the forts to the civilization and development of the West extended beyond patrol duty.",
        "Through the establishment of military posts, yet other contributions were made to the development of western culture. Many posts maintained libraries or reading rooms, and some - for example, Fort Davis- had schools. Post chapels provided a setting for religious services and weddings. Throughout the wilderness, post bands provided entertainment and boosted morale. During the last part of the nineteenth century, to reduce expenses, gardening was encouraged at the forts, thus making experimental agriculture another activity of the military. The military stationed at the various forts also played a role in civilian life by assisting in maintaining order, and civilian officials often called on the army for protection.",
        "Certainly, among other significant contributions the army made to the improvement of the conditions of life was the investigation of the relationships among health, climate, and architecture. From the earliest colonial times throughout the nineteenth century, disease ranked as the foremost problem in defense. It slowed construction of forts and inhibited their military functions. Official documents from many regions contained innumerable reports of sickness that virtually incapacitated entire garrisons. In response to the problems, detailed observations of architecture and climate and their relationships to the frequency of the occurrence of various diseases were recorded at various posts across the nation by military surgeons."
      ],
      "questions": [
        {
          "id": "ulis_r03_q21",
          "type": "main_idea",
          "question_text": "Which of the following statements best expresses the main idea of the passage?",
          "options": [
            {
              "key": "A",
              "text": "By the nineteenth century, forts were no longer used by the military."
            },
            {
              "key": "B",
              "text": "Surgeons at forts could not prevent outbreaks of disease."
            },
            {
              "key": "C",
              "text": "Forts were important to the development of the American West"
            },
            {
              "key": "D",
              "text": "Life in nineteenth-century forts was very rough."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "All of these functions, of course, suggest that the contributions of the forts to the civilization and development of the West extended beyond patrol duty.",
          "explanation_vi": "Đoạn văn chủ yếu nói về nhiều đóng góp khác nhau của các đồn lũy (forts) đối với sự phát triển kinh tế, văn hóa và đời sống ở miền Tây nước Mỹ, vượt ra ngoài nhiệm vụ quân sự đơn thuần. Đáp án C phản ánh chính xác nhất ý chính này."
        },
        {
          "id": "ulis_r03_q22",
          "type": "vocab_in_context",
          "question_text": "The word \"daring\" in line 3 is closest in meaning to ......",
          "options": [
            {
              "key": "A",
              "text": "lost"
            },
            {
              "key": "B",
              "text": "bold"
            },
            {
              "key": "C",
              "text": "lively"
            },
            {
              "key": "D",
              "text": "foolish"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "The establishment of these posts opened new roads and provided for the protection of daring adventurers and expeditions as well as established settlers.",
          "explanation_vi": "Từ \"daring\" nghĩa là dũng cảm, táo bạo, đồng nghĩa với \"bold\". Các lựa chọn khác: lost (lạc đường), lively (sống động), foolish (dại dột)."
        },
        {
          "id": "ulis_r03_q23",
          "type": "negative_fact",
          "question_text": "Which of the following would a traveler be LEAST likely to obtain at Fort Laramie?",
          "options": [
            {
              "key": "A",
              "text": "Fresh water"
            },
            {
              "key": "B",
              "text": "Food"
            },
            {
              "key": "C",
              "text": "Formal clothing"
            },
            {
              "key": "D",
              "text": "Lodging"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "Posts like Fort Laramie provided supplies for wagon trains traveling the natural highways toward new frontiers.",
          "explanation_vi": "Các đồn lũy như Fort Laramie cung cấp nhu yếu phẩm (thức ăn, nước uống, chỗ nghỉ chân) cho các đoàn xe hàng. Trang phục trang trọng (Formal clothing) là thứ ít có khả năng được cung cấp nhất tại một đồn biên giới miền Tây."
        },
        {
          "id": "ulis_r03_q24",
          "type": "vocab_in_context",
          "question_text": "The word \"others\" in line 7 refers to ......",
          "options": [
            {
              "key": "A",
              "text": "posts"
            },
            {
              "key": "B",
              "text": "wagon trains"
            },
            {
              "key": "C",
              "text": "frontiers"
            },
            {
              "key": "D",
              "text": "highways"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "Some posts became stations for the pony express; still others, such as Fort Davis, were stagecoach stops for weary travelers.",
          "explanation_vi": "Trong câu \"Some posts became...; still others, such as Fort Davis...\", đại từ \"others\" thay thế cho \"other posts\" (các đồn lũy khác)."
        },
        {
          "id": "ulis_r03_q25",
          "type": "vocab_in_context",
          "question_text": "The word \"boosted\" in line 13 is closest in meaning to ......",
          "options": [
            {
              "key": "A",
              "text": "influenced"
            },
            {
              "key": "B",
              "text": "established"
            },
            {
              "key": "C",
              "text": "raised"
            },
            {
              "key": "D",
              "text": "maintained"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "Throughout the wilderness, post bands provided entertainment and boosted morale.",
          "explanation_vi": "Từ \"boosted\" nghĩa là nâng cao, tăng cường, đồng nghĩa với \"raised\". Nâng cao tinh thần = raised morale."
        },
        {
          "id": "ulis_r03_q26",
          "type": "inference",
          "question_text": "Which of the following is the most likely inference about the decision to promote gardening at forts?",
          "options": [
            {
              "key": "A",
              "text": "It was expensive to import produce from far away."
            },
            {
              "key": "B",
              "text": "Food brought in from outside was often spoiled"
            },
            {
              "key": "C",
              "text": "Gardening was a way to occupy otherwise idle soldiers."
            },
            {
              "key": "D",
              "text": "The soil near the forts was very fertile."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "During the last part of the nineteenth century, to reduce expenses, gardening was encouraged at the forts, thus making experimental agriculture another activity of the military.",
          "explanation_vi": "Đoạn văn nêu rõ việc làm vườn được khuyến khích \"to reduce expenses\" (để giảm chi phí). Điều này suy ra rằng việc vận chuyển/nhập nông sản từ xa đến đồn rất tốn kém (expensive)."
        },
        {
          "id": "ulis_r03_q27",
          "type": "factual_detail",
          "question_text": "According to the passage, which of the following posed the biggest obstacle to the development of military forts?",
          "options": [
            {
              "key": "A",
              "text": "Insufficient shelter"
            },
            {
              "key": "B",
              "text": "Shortage of materials"
            },
            {
              "key": "C",
              "text": "Attacks by wild animals"
            },
            {
              "key": "D",
              "text": "Illness"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "From the earliest colonial times throughout the nineteenth century, disease ranked as the foremost problem in defense.",
          "explanation_vi": "Bài viết đề cập \"disease ranked as the foremost problem\" (bệnh tật là vấn đề hàng đầu), làm chậm quá trình xây dựng đồn lũy. Bệnh tật (disease) tương đương với \"Illness\"."
        },
        {
          "id": "ulis_r03_q28",
          "type": "vocab_in_context",
          "question_text": "The word “inhibited” in line 22 is closest in meaning to ..........",
          "options": [
            {
              "key": "A",
              "text": "involved"
            },
            {
              "key": "B",
              "text": "exploited"
            },
            {
              "key": "C",
              "text": "united"
            },
            {
              "key": "D",
              "text": "hindered"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "It slowed construction of forts and inhibited their military functions.",
          "explanation_vi": "Từ \"inhibited\" có nghĩa là cản trở, làm chậm lại, đồng nghĩa với \"hindered\". Các từ còn lại: involved (liên quan), exploited (khai thác), united (đoàn kết)."
        },
        {
          "id": "ulis_r03_q29",
          "type": "factual_detail",
          "question_text": "How did the military assists in the investigation of health problems?",
          "options": [
            {
              "key": "A",
              "text": "By registering annual birth and death rates"
            },
            {
              "key": "B",
              "text": "By experiments with different building materials"
            },
            {
              "key": "C",
              "text": "By maintaining records of diseases and potential causes"
            },
            {
              "key": "D",
              "text": "By monitoring the soldiers' diets"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "In response to the problems, detailed observations of architecture and climate and their relationships to the frequency of the occurrence of various diseases were recorded at various posts across the nation by military surgeons.",
          "explanation_vi": "Các bác sĩ quân y đã hỗ trợ bằng cách ghi chép lại các quan sát chi tiết về mối quan hệ giữa kiến trúc, khí hậu và tần suất xuất hiện bệnh tật, tức là lưu giữ bản ghi chép về bệnh tật và nguyên nhân tiềm năng (maintaining records of diseases and potential causes)."
        },
        {
          "id": "ulis_r03_q30",
          "type": "factual_detail",
          "question_text": "The author organizes the discussion of forts by ..............",
          "options": [
            {
              "key": "A",
              "text": "describing their locations"
            },
            {
              "key": "B",
              "text": "comparing their sizes"
            },
            {
              "key": "C",
              "text": "explaining their damage to the environment"
            },
            {
              "key": "D",
              "text": "listing their contributions to western life"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "In addition to their military role, the forts of the nineteenth century provided numerous other benefits for the American West.",
          "explanation_vi": "Tác giả tổ chức bài viết bằng cách liệt kê các đóng góp khác nhau của các đồn lũy đối với đời sống miền Tây (mở đường, hỗ trợ thương mại, giao lưu văn hóa, tôn giáo, y tế...)."
        }
      ],
      "id": "ulis_r03_p3"
    },
    {
      "title": "Passage 4: Fossil Mineralization and Composition",
      "topic": "Paleontology & Science",
      "word_count": 351,
      "difficulty": "C1",
      "content_paragraphs": [
        "Anyone who has handled a fossilized bone knows that it is usually not exactly like its modern counterpart, the most obvious difference being that it is often much heavier. Fossils often have the quality of stone rather than of organic materials, and this has led to the use of the term “petrifaction” (to bring about rock). The implication is that bone, and other tissues, have somehow been turned into stone, and this is certainly the explanation given in some texts. But it is wrong interpretation; fossils are frequently so dense because the pores and other spaces in the bone have become filled with minerals taken up from the surrounding sediments. Some fossil bones have all the interstitial spaces filled with foreign minerals, including the marrow cavity, if there is one, while others have taken up but little from their surroundings. Probably all of the minerals deposited within the bone have been recrystallized from solution by the action of water percolating thru them. The degree of mineralization appears to be determined by the nature of the environment in which the bone was deposited and not by the antiquity of the bone. For example, the black fossil bones that are so common in many parts of Florida are heavily mineralized, but they are only about 20,000 years old, whereas many of the dinosaur bones from western Canada, which are about 75 million years old, are only partially filled in. Under optimum conditions the process of mineralization probably takes thousands rather than millions of years, perhaps considerably less.",
        "The amount of change that has occurred in fossil bone, even in bone as old as that of dinosaurs, is often remarkably small. We are therefore usually able to see the microscopic structures of the bone, including such fine details as the lacunae where the living bone cells once resided. The natural bone mineral, the hydroxyapatite, is virtually unaltered too - it has the same crystal structure as that of modern bone. Although nothing remains of the original collagen, some of its component amino acids are usually still detectable, together with amino acids of the noncollagen proteins of bone."
      ],
      "questions": [
        {
          "id": "ulis_r03_q31",
          "type": "main_idea",
          "question_text": "What does the passage mainly discuss?",
          "options": [
            {
              "key": "A",
              "text": "The location of fossils in North America"
            },
            {
              "key": "B",
              "text": "The composition of fossils"
            },
            {
              "key": "C",
              "text": "Determining the size and weight of fossils"
            },
            {
              "key": "D",
              "text": "Procedures for analyzing fossils"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "Fossils often have the quality of stone rather than of organic materials, and this has led to the use of the term “petrifaction” (to bring about rock).",
          "explanation_vi": "Bài đọc chủ yếu thảo luận về thành phần cấu tạo của hóa thạch (mineralization, hydroxyapatite, amino acids,... trong xương hóa thạch) và quá trình khoáng hóa làm thay đổi/giữ nguyên các thành phần này. Do đó, phương án B là chính xác."
        },
        {
          "id": "ulis_r03_q32",
          "type": "vocab_in_context",
          "question_text": "The word \"counterpart\" in line 2 is closest in meaning to ........",
          "options": [
            {
              "key": "A",
              "text": "species"
            },
            {
              "key": "B",
              "text": "version"
            },
            {
              "key": "C",
              "text": "change"
            },
            {
              "key": "D",
              "text": "material"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "Anyone who has handled a fossilized bone knows that it is usually not exactly like its modern counterpart, the most obvious difference being that it is often much heavier.",
          "explanation_vi": "Từ \"counterpart\" chỉ đối tượng tương ứng hoặc phiên bản tương đương. Ở đây so sánh xương hóa thạch với xương hiện đại tương ứng (\"modern version\")."
        },
        {
          "id": "ulis_r03_q33",
          "type": "factual_detail",
          "question_text": "Why is fossilized bone heavier than ordinary bone?",
          "options": [
            {
              "key": "A",
              "text": "Bone tissue solidifies with age."
            },
            {
              "key": "B",
              "text": "The marrow cavity gradually fills with water"
            },
            {
              "key": "C",
              "text": "The organic materials turn to stone"
            },
            {
              "key": "D",
              "text": "Spaces within the bone fill with minerals."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "But it is wrong interpretation; fossils are frequently so dense because the pores and other spaces in the bone have become filled with minerals taken up from the surrounding sediments.",
          "explanation_vi": "Tác giả giải thích xương hóa thạch nặng và đặc hơn vì các lỗ nhỏ và khoảng trống trong xương đã được lấp đầy bởi khoáng chất lấy từ trầm tích xung quanh. Vì vậy đáp án đúng là D."
        },
        {
          "id": "ulis_r03_q34",
          "type": "vocab_in_context",
          "question_text": "The word \"pores\" in line 6 is closest in meaning to............",
          "options": [
            {
              "key": "A",
              "text": "joints"
            },
            {
              "key": "B",
              "text": "tissues"
            },
            {
              "key": "C",
              "text": "lines"
            },
            {
              "key": "D",
              "text": "holes"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "But it is wrong interpretation; fossils are frequently so dense because the pores and other spaces in the bone have become filled with minerals taken up from the surrounding sediments.",
          "explanation_vi": "Từ \"pores\" trong ngữ cảnh chỉ các lỗ nhỏ, khe hở nhỏ (\"holes\")."
        },
        {
          "id": "ulis_r03_q35",
          "type": "inference",
          "question_text": "What can be inferred about a fossil with a high degree of mineralization?",
          "options": [
            {
              "key": "A",
              "text": "It was exposed to large amounts of mineral-laden water throughout time."
            },
            {
              "key": "B",
              "text": "Mineralization was complete within one year of the animal's death."
            },
            {
              "key": "C",
              "text": "Many colorful crystals can be found in such a fossil."
            },
            {
              "key": "D",
              "text": "It was discovered in western Canada."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "Probably all of the minerals deposited within the bone have been recrystallized from solution by the action of water percolating thru them.",
          "explanation_vi": "Bài đọc nêu rõ khoáng chất lắng đọng trong xương là do nước thấm qua (water percolating thru them) tạo ra. Do đó, hóa thạch có mức độ khoáng hóa cao suy ra nó đã tiếp xúc với lượng lớn nước chứa khoáng chất trong thời gian dài."
        },
        {
          "id": "ulis_r03_q36",
          "type": "factual_detail",
          "question_text": "Which of the following factors is most important in determining the extent of mineralization in fossil bones?",
          "options": [
            {
              "key": "A",
              "text": "The age of fossil"
            },
            {
              "key": "B",
              "text": "Environmental conditions"
            },
            {
              "key": "C",
              "text": "The location of the bone in the animal's body."
            },
            {
              "key": "D",
              "text": "The type of animal the bone came from"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "The degree of mineralization appears to be determined by the nature of the environment in which the bone was deposited and not by the antiquity of the bone.",
          "explanation_vi": "Tác giả khẳng định mức độ khoáng hóa được quyết định bởi bản chất của môi trường (nature of the environment) nơi xương lắng đọng. Do đó B là phương án đúng."
        },
        {
          "id": "ulis_r03_q37",
          "type": "factual_detail",
          "question_text": "Why does the author compare fossils found in western Canada to those found in Florida?",
          "options": [
            {
              "key": "A",
              "text": "To prove that a fossil's age cannot be determined by the amount of mineralization."
            },
            {
              "key": "B",
              "text": "To discuss the large quantity of fossils found in both places"
            },
            {
              "key": "C",
              "text": "To suggest that fossils found in both places were the same age."
            },
            {
              "key": "D",
              "text": "To explain why scientists are especially interested in Canadian fossils"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "The degree of mineralization appears to be determined by the nature of the environment in which the bone was deposited and not by the antiquity of the bone.",
          "explanation_vi": "Tác giả đưa ví dụ hóa thạch ở Florida mới 20,000 năm nhưng khoáng hóa cao, còn hóa thạch khủng long ở Canada 75 triệu năm lại chỉ khoáng hóa một phần, nhằm chứng minh rằng tuổi của hóa thạch không quyết định/không thể suy ra từ mức độ khoáng hóa."
        },
        {
          "id": "ulis_r03_q38",
          "type": "vocab_in_context",
          "question_text": "The word \"it\" in line 20 refers to .........",
          "options": [
            {
              "key": "A",
              "text": "hydroxyapatite"
            },
            {
              "key": "B",
              "text": "microscopic structure"
            },
            {
              "key": "C",
              "text": "crystal structure"
            },
            {
              "key": "D",
              "text": "modern bone"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "The natural bone mineral, the hydroxyapatite, is virtually unaltered too - it has the same crystal structure as that of modern bone.",
          "explanation_vi": "Trong câu \"The natural bone mineral, the hydroxyapatite, is virtually unaltered too - it has...\", đại từ \"it\" thay thế cho danh từ đứng trước nó là \"hydroxyapatite\"."
        },
        {
          "id": "ulis_r03_q39",
          "type": "vocab_in_context",
          "question_text": "The word \"detectable\" in line 22 is closest in meaning to .............",
          "options": [
            {
              "key": "A",
              "text": "sizable"
            },
            {
              "key": "B",
              "text": "active"
            },
            {
              "key": "C",
              "text": "moist"
            },
            {
              "key": "D",
              "text": "apparent"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "Although nothing remains of the original collagen, some of its component amino acids are usually still detectable, together with amino acids of the noncollagen proteins of bone.",
          "explanation_vi": "Từ \"detectable\" nghĩa là có thể phát hiện được, có thể nhận thấy rõ ràng tương đương với \"apparent\" (rõ ràng, có thể nhận thấy)."
        },
        {
          "id": "ulis_r03_q40",
          "type": "negative_fact",
          "question_text": "Which of the following does NOT survive in fossils?",
          "options": [
            {
              "key": "A",
              "text": "Noncollagen proteins"
            },
            {
              "key": "B",
              "text": "Hydroxyapatite"
            },
            {
              "key": "C",
              "text": "Collagen"
            },
            {
              "key": "D",
              "text": "Amino acid"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "Although nothing remains of the original collagen, some of its component amino acids are usually still detectable, together with amino acids of the noncollagen proteins of bone.",
          "explanation_vi": "Bài đọc ghi rõ: \"nothing remains of the original collagen\" (không còn gì tồn tại từ collagen nguyên bản), do đó Collagen là thành phần KHÔNG tồn tại trong hóa thạch."
        }
      ],
      "id": "ulis_r03_p4"
    }
  ]
};
