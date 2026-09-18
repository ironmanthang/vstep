import type { ReadingTest } from '../../../../types/schemas';

/**
 * Authentic VSTEP Reading Test 6 (ULIS - ĐHQGHN Standard)
 * Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Pages 71–78 (PDF Pages 75–82), Key page 150 (PDF Page 154)
 * Format: 4 Passages, 40 Questions, 60 Minutes.
 */
export const ULIS_READING_TEST_06: ReadingTest = {
  "id": "ulis_read_test_06",
  "title": "VSTEP Reading Mock Test 6 (Chuẩn ĐHNN - ĐHQGHN)",
  "duration_minutes": 60,
  "difficulty": "B2",
  "passages": [
    {
      "title": "Passage 1: TV Review",
      "topic": "Media & Entertainment",
      "word_count": 482,
      "difficulty": "B1",
      "content_paragraphs": [
        "I always look forward to this time of year, and I'm always disappointed! It's the time of year when the TV channels tell us their plans for the summer and every year I tell myself that it might be different. It never is. Take SuperTV, for example. This channel, on our screens for five years now, broadcasts a depressing mix of game shows and music videos. So what do we find in the new schedule? I'm The One, a game show with holidays as prizes, and VJ-TV, yet another music video programme with brainless presenters. They're also planning to repeat the dreadful chat show Star Quality, which is about as entertaining as watching grass grow. Why can't **they** come up with new ideas?",
        "Channel 9 does a little better. Now that Train Driver has finished, they've decided to replace it with Staff Room, a reality show that follows teachers around all day. It should be the hit of the summer, giving us an idea of what really goes on when the lesson is over. Who doesn't want to see and hear what teachers say about their students at the end of the school day? Great stuff! Together with Life in Aylesford Street, the soap opera that everyone's talking about, it looks like Channel 9 could be the channel to watch this summer.",
        "Over on BTV1, Max Read is back with Joke-a-Cola, the comedy show. The first series was slightly amusing, the second hilarious. Let's wait and see what the third series is like. Comedy is difficult to get right, but it ought to be great. I wish I could say the same about the sitcom, Oh! Those Kids! It's enough to look at the expressions on the faces of the cast! It's obvious they know it's rubbish and the script is just so badly written! Oh! Those writers!",
        "The programme makers must think we'll watch anything. That's just not true. People might have hundreds of channels on their TV or might live near a cinema with a dozen screens. There is so much choice of entertainment these days - TV, the cinema, the theatre, even the internet that they have to work hard to keep their audience. What they should be doing is making new, exciting programmes. Where are the programmes that make people think they must stay in to watch them?",
        "We have to ask ourselves what entertainment is. We have to think about what people do with their leisure time. Television has been popular for about 50-60 years but it might not be popular forever. More people are going to the cinema and theatre than ever before. More people are surfing the internet or playing computer games than ever before. If Oh! Those Kids! is all that the TV can offer, why should we watch it? With one or two exceptions, this summer's programmes will make more people turn off than turn on."
      ],
      "questions": [
        {
          "id": "ulis_r06_q01",
          "type": "inference",
          "question_text": "At this time of year .............",
          "options": [
            {
              "key": "A",
              "text": "the TV channels change all their programmes."
            },
            {
              "key": "B",
              "text": "the writer disappoints the TV channels with her reviews."
            },
            {
              "key": "C",
              "text": "the writer hopes for something that never happens."
            },
            {
              "key": "D",
              "text": "the writer's favourite programmes often disappear."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "It's the time of year when the TV channels tell us their plans for the summer and every year I tell myself that it might be different. It never is.",
          "explanation_vi": "Tác giả chia sẻ rằng mỗi năm vào thời điểm này, cô đều tự nhủ rằng các chương trình TV mùa hè có thể sẽ khác (thú vị hơn), nhưng thực tế 'It never is' (chưa bao giờ khác đi). Điều này có nghĩa là tác giả hy vọng vào một điều không bao giờ xảy ra."
        },
        {
          "id": "ulis_r06_q02",
          "type": "factual_detail",
          "question_text": "How does the writer describe the current programmes on SuperTV?",
          "options": [
            {
              "key": "A",
              "text": "exciting"
            },
            {
              "key": "B",
              "text": "informative"
            },
            {
              "key": "C",
              "text": "strange"
            },
            {
              "key": "D",
              "text": "disappointing"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "This channel, on our screens for five years now, broadcasts a depressing mix of game shows and music videos.",
          "explanation_vi": "Tác giả mô tả các chương trình hiện tại trên SuperTV là 'a depressing mix of game shows and music videos' (sự kết hợp đáng thất vọng/buồn tẻ giữa các trò chơi truyền hình và video ca nhạc). Từ 'depressing' đồng nghĩa với 'disappointing'."
        },
        {
          "id": "ulis_r06_q03",
          "type": "vocab_in_context",
          "question_text": "What does '**They**' in paragraph 1 refer to?",
          "options": [
            {
              "key": "A",
              "text": "SuperTV"
            },
            {
              "key": "B",
              "text": "the TV channels"
            },
            {
              "key": "C",
              "text": "the presenters of VJ-TV"
            },
            {
              "key": "D",
              "text": "TV viewers"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "They're also planning to repeat the dreadful chat show Star Quality, which is about as entertaining as watching grass grow.",
          "explanation_vi": "Trong đoạn 1, tác giả đang nói về kênh 'SuperTV' ('Take SuperTV, for example...'). Do đó, từ 'They' ở đây ám chỉ nhà đài/kênh SuperTV."
        },
        {
          "id": "ulis_r06_q04",
          "type": "inference",
          "question_text": "The writer says that Staff Room will probably ...............",
          "options": [
            {
              "key": "A",
              "text": "be successful."
            },
            {
              "key": "B",
              "text": "shock students."
            },
            {
              "key": "C",
              "text": "be worse than Train Driver."
            },
            {
              "key": "D",
              "text": "be on instead of Life in Aylesford Street."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "It should be the hit of the summer, giving us an idea of what really goes on when the lesson is over.",
          "explanation_vi": "Tác giả nhận định chương trình Staff Room 'should be the hit of the summer' (sẽ là một cú hit/thành công lớn của mùa hè này). Do đó, nó có khả năng sẽ thành công ('be successful')."
        },
        {
          "id": "ulis_r06_q05",
          "type": "factual_detail",
          "question_text": "Characters of the show Staff Room are ................",
          "options": [
            {
              "key": "A",
              "text": "students"
            },
            {
              "key": "B",
              "text": "teachers"
            },
            {
              "key": "C",
              "text": "travelers"
            },
            {
              "key": "D",
              "text": "Channel 9's audience"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "Now that Train Driver has finished, they've decided to replace it with Staff Room, a reality show that follows teachers around all day.",
          "explanation_vi": "Đoạn văn nêu rõ 'Staff Room' là một chương trình thực tế theo chân các giáo viên cả ngày ('follows teachers around all day'). Vì vậy, nhân vật của chương trình là các giáo viên."
        },
        {
          "id": "ulis_r06_q06",
          "type": "vocab_in_context",
          "question_text": "The word \"hilarious\" in paragraph 3 can be best replaced by ..............",
          "options": [
            {
              "key": "A",
              "text": "amusing"
            },
            {
              "key": "B",
              "text": "informative"
            },
            {
              "key": "C",
              "text": "strange"
            },
            {
              "key": "D",
              "text": "up-to-date"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "The first series was slightly amusing, the second hilarious.",
          "explanation_vi": "Từ 'hilarious' có nghĩa là cực kỳ vui nhộn, hài hước. Trong các phương án đưa ra, 'amusing' (vui vẻ, gây cười) là từ gần nghĩa nhất."
        },
        {
          "id": "ulis_r06_q07",
          "type": "inference",
          "question_text": "The writer thinks that Joke-a-Cola is now ..............",
          "options": [
            {
              "key": "A",
              "text": "more difficult to understand."
            },
            {
              "key": "B",
              "text": "more popular with viewers."
            },
            {
              "key": "C",
              "text": "funnier than before."
            },
            {
              "key": "D",
              "text": "more like a sitcom."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "The first series was slightly amusing, the second hilarious.",
          "explanation_vi": "Tác giả nhận xét phần 1 của Joke-a-Cola chỉ hơi vui ('slightly amusing'), nhưng phần 2 thì cực kỳ hài hước ('hilarious'). Điều này cho thấy chương trình ngày càng hài hước hơn trước ('funnier than before')."
        },
        {
          "id": "ulis_r06_q08",
          "type": "factual_detail",
          "question_text": "Because of the various choice of entertainment ..................",
          "options": [
            {
              "key": "A",
              "text": "people watch more television."
            },
            {
              "key": "B",
              "text": "people move to areas with more facilities."
            },
            {
              "key": "C",
              "text": "programme makers have to tell lies."
            },
            {
              "key": "D",
              "text": "programmes have to be more exciting."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 3,
          "clue_sentence": "There is so much choice of entertainment these days - TV, the cinema, the theatre, even the internet that they have to work hard to keep their audience. What they should be doing is making new, exciting programmes.",
          "explanation_vi": "Vì có quá nhiều sự lựa chọn giải trí ngày nay, những người làm chương trình phải làm việc chăm chỉ để giữ chân khán giả, và họ nên tạo ra các chương trình mới mẻ, thú vị hơn ('making new, exciting programmes')."
        },
        {
          "id": "ulis_r06_q09",
          "type": "inference",
          "question_text": "The writer thinks that television ..................",
          "options": [
            {
              "key": "A",
              "text": "will never be as popular as the theatre is."
            },
            {
              "key": "B",
              "text": "should show more programmes about hobbies."
            },
            {
              "key": "C",
              "text": "could lose its popularity in the future."
            },
            {
              "key": "D",
              "text": "ought to provide more than just entertainment."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 4,
          "clue_sentence": "Television has been popular for about 50-60 years but it might not be popular forever.",
          "explanation_vi": "Tác giả viết rằng truyền hình đã phổ biến khoảng 50-60 năm nhưng 'it might not be popular forever' (nó có thể không nổi tiếng mãi mãi), tức là nó có thể mất đi sự phổ biến trong tương lai."
        },
        {
          "id": "ulis_r06_q10",
          "type": "inference",
          "question_text": "Which of the following channels would the author most probably recommend viewers to watch?",
          "options": [
            {
              "key": "A",
              "text": "SuperTV"
            },
            {
              "key": "B",
              "text": "Channel 9"
            },
            {
              "key": "C",
              "text": "BTV1"
            },
            {
              "key": "D",
              "text": "All of them"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "Together with Life in Aylesford Street, the soap opera that everyone's talking about, it looks like Channel 9 could be the channel to watch this summer.",
          "explanation_vi": "Tác giả nhận xét 'it looks like Channel 9 could be the channel to watch this summer' (có vẻ như Channel 9 sẽ là kênh đáng xem nhất mùa hè này). Do đó, tác giả khuyên người xem nên chọn kênh này."
        }
      ],
      "id": "ulis_r06_p1"
    },
    {
      "title": "Passage 2: The reluctant hero",
      "topic": "Entertainment & Media",
      "word_count": 504,
      "difficulty": "B2",
      "content_paragraphs": [
        "The most endearing thing about Aaron Green - and there are many - is his refusal to accept how famous he's about to become. 'I can walk down the street and not be hassled, which is really nice. I kind of hope that continues and I'm sure it will,' he says earnestly. He seems genuinely to believe that the job won't change his life. 'There's nothing fascinating about my life, and there's absolutely no reason why that should start happening.' You can only wish him well.",
        "How lovely if this turned out to be true, but the chances are it won't, and he must know this. Aaron has been cast as the hero in the latest fantasy blockbuster that will hit our screens next year. The first photo of him in his costume was released last week to Internet frenzy.",
        "After an award nomination for his last film, Aaron is having the biggest year of his life, but it hasn't gone to his head. 'It's nice if your work is praised, but it's all very new to me, this,' he says. 'I really like working in this profession and exploring its possibilities. Who knows what the future holds? We could dream about what might happen next, but there's not much point. I'm just enjoying my job and want to do well in it in the future, but that's kind of it, really. No big hassles.'",
        "Of all the characters in his last film, which is based on a true story about a group of university students who start an influential blog, Aaron's character is the one who emerges as most likeable. But he insists that the plot is not as straightforward as it might appear. 'What's wonderful about this film is that everyone feels they are the good guy. I don't think anyone in the cast felt they were playing the villain. It was just a group of human beings that had different opinions.'",
        "It's a typically thoughtful answer from the 27-year-old, who seems to be a bit of a worrier and prefers to avoid watching himself on screen. Doubtless he doesn't care for interviews either, but he is so open and engaging that you wouldn't know it. He felt 'a heightened sense of responsibility' playing a real-life person in his last film, but had no contact with the person concerned. 'These people are living and breathing somewhere - of course that has a great effect on the care with which you approach your work. I kept wondering if he'd come and see the film, if he'd recognize himself in my performance or be angered by it.'",
        "His performance has a vulnerability about it that is almost painful to watch. Does he seek out those parts or do directors see that quality in him? 'I don't know, I think it's probably a bit of both. I certainly have that unwillingness to lose naivety; to lose that childlike way of looking at the world. I find it a very real and profound theme in my life and, talking to other people my age, I think it's universal.'"
      ],
      "questions": [
        {
          "id": "ulis_r06_q11",
          "type": "factual_detail",
          "question_text": "According to the text, what does Aaron think about his job?",
          "options": [
            {
              "key": "A",
              "text": "It helps him become famous."
            },
            {
              "key": "B",
              "text": "It can't make his life change."
            },
            {
              "key": "C",
              "text": "It's a boring job."
            },
            {
              "key": "D",
              "text": "It brings him many opportunities."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "He seems genuinely to believe that the job won't change his life.",
          "explanation_vi": "Trong đoạn 1, tác giả viết: 'He seems genuinely to believe that the job won't change his life.' (Anh ấy dường như thực sự tin rằng công việc sẽ không làm thay đổi cuộc sống của mình). Điều này tương ứng với phương án B."
        },
        {
          "id": "ulis_r06_q12",
          "type": "vocab_in_context",
          "question_text": "The word “fascinating” in line 4 can be best replaced by",
          "options": [
            {
              "key": "A",
              "text": "modern"
            },
            {
              "key": "B",
              "text": "ordinary"
            },
            {
              "key": "C",
              "text": "frightening"
            },
            {
              "key": "D",
              "text": "interesting"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "'There's nothing fascinating about my life, and there's absolutely no reason why that should start happening.'",
          "explanation_vi": "Từ 'fascinating' có nghĩa là hấp dẫn, thú vị, lôi cuốn. Trong ngữ cảnh này, nó có thể được thay thế tốt nhất bằng 'interesting' (thú vị)."
        },
        {
          "id": "ulis_r06_q13",
          "type": "inference",
          "question_text": "In the first paragraph, the writer suggests that he thinks Aaron",
          "options": [
            {
              "key": "A",
              "text": "has a sensible attitude towards fame."
            },
            {
              "key": "B",
              "text": "seems confident that he can deal with fame."
            },
            {
              "key": "C",
              "text": "seems unaware that he's about to become famous."
            },
            {
              "key": "D",
              "text": "has unrealistic ideas about what it's like to be famous."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "The most endearing thing about Aaron Green - and there are many - is his refusal to accept how famous he's about to become.",
          "explanation_vi": "Tác giả viết: 'The most endearing thing about Aaron Green... is his refusal to accept how famous he's about to become.' (Điều đáng yêu nhất ở Aaron Green là việc anh từ chối chấp nhận việc mình sắp trở nên nổi tiếng như thế nào) và ở đầu đoạn 2: 'How lovely if this turned out to be true, but the chances are it won't...' (Thật đáng yêu nếu điều này là sự thật, nhưng khả năng cao là không). Điều này cho thấy tác giả nghĩ Aaron có những ý tưởng không thực tế về sự nổi tiếng (nghĩ rằng nó sẽ không thay đổi cuộc sống của mình)."
        },
        {
          "id": "ulis_r06_q14",
          "type": "factual_detail",
          "question_text": "According to the text, when will Aaron's latest film probably be released?",
          "options": [
            {
              "key": "A",
              "text": "at the end of this year"
            },
            {
              "key": "B",
              "text": "next year"
            },
            {
              "key": "C",
              "text": "in the next 2 years"
            },
            {
              "key": "D",
              "text": "in the next 5 years"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "Aaron has been cast as the hero in the latest fantasy blockbuster that will hit our screens next year.",
          "explanation_vi": "Đoạn 2 nêu rõ: 'Aaron has been cast as the hero in the latest fantasy blockbuster that will hit our screens next year.' (Aaron đã được chọn vào vai người hùng trong bộ phim bom tấn giả tưởng mới nhất sẽ ra rạp vào năm tới). Do đó, bộ phim sẽ được phát hành vào năm tới (next year)."
        },
        {
          "id": "ulis_r06_q15",
          "type": "vocab_in_context",
          "question_text": "The phrase 'hasn't gone to his head' (line 9) suggests that Aaron",
          "options": [
            {
              "key": "A",
              "text": "doesn't think much about his achievements."
            },
            {
              "key": "B",
              "text": "is used to receiving so much praise."
            },
            {
              "key": "C",
              "text": "is doubtful whether he will win an award."
            },
            {
              "key": "D",
              "text": "would like to receive great attention."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "After an award nomination for his last film, Aaron is having the biggest year of his life, but it hasn't gone to his head.",
          "explanation_vi": "Cụm từ 'go to one's head' nghĩa là khiến ai đó kiêu ngạo, tự mãn vì thành công. Do đó, 'hasn't gone to his head' có nghĩa là thành công lớn này không làm anh ấy kiêu ngạo, tức là anh ấy không nghĩ quá nhiều hay tự mãn về những thành tựu của mình (doesn't think much about his achievements)."
        },
        {
          "id": "ulis_r06_q16",
          "type": "factual_detail",
          "question_text": "What does Aaron say about his last film?",
          "options": [
            {
              "key": "A",
              "text": "There are clear heroes in it."
            },
            {
              "key": "B",
              "text": "The plot is not as simple as it may appear."
            },
            {
              "key": "C",
              "text": "He knows why people liked his character best."
            },
            {
              "key": "D",
              "text": "There were often disagreements between the actors."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "But he insists that the plot is not as straightforward as it might appear.",
          "explanation_vi": "Trong đoạn 4, Aaron khẳng định: 'But he insists that the plot is not as straightforward as it might appear.' (Nhưng anh ấy nhấn mạnh rằng cốt truyện không hề đơn giản như vẻ ngoài của nó). Từ 'straightforward' đồng nghĩa với 'simple'."
        },
        {
          "id": "ulis_r06_q17",
          "type": "factual_detail",
          "question_text": "What makes the writer think that Aaron is a bit of a worrier?",
          "options": [
            {
              "key": "A",
              "text": "He avoids watching his own films."
            },
            {
              "key": "B",
              "text": "He doesn't like giving interviews."
            },
            {
              "key": "C",
              "text": "He feels responsible for the character he plays."
            },
            {
              "key": "D",
              "text": "He thinks carefully before answering a question."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 4,
          "clue_sentence": "It's a typically thoughtful answer from the 27-year-old, who seems to be a bit of a worrier and prefers to avoid watching himself on screen.",
          "explanation_vi": "Đoạn 5 viết: 'It's a typically thoughtful answer from the 27-year-old, who seems to be a bit of a worrier and prefers to avoid watching himself on screen.' (Đó là một câu trả lời chu đáo điển hình từ chàng trai 27 tuổi, người dường như là một người hay lo lắng và thích tránh xem chính mình trên màn ảnh). Do đó, việc anh ấy tránh xem phim của chính mình (avoids watching his own films) khiến tác giả nghĩ anh ấy là người hay lo lắng."
        },
        {
          "id": "ulis_r06_q18",
          "type": "factual_detail",
          "question_text": "How did Aaron feel when playing a real-life person in his last film?",
          "options": [
            {
              "key": "A",
              "text": "curious"
            },
            {
              "key": "B",
              "text": "fantastic"
            },
            {
              "key": "C",
              "text": "confused"
            },
            {
              "key": "D",
              "text": "highly responsible"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 4,
          "clue_sentence": "He felt 'a heightened sense of responsibility' playing a real-life person in his last film, but had no contact with the person concerned.",
          "explanation_vi": "Đoạn 5 viết: 'He felt 'a heightened sense of responsibility' playing a real-life person in his last film...' (Anh ấy cảm thấy 'trách nhiệm tăng cao' khi đóng vai một người ngoài đời thực...). 'A heightened sense of responsibility' tương đương với 'highly responsible'."
        },
        {
          "id": "ulis_r06_q19",
          "type": "factual_detail",
          "question_text": "What does Aaron say about playing a real-life person on screen?",
          "options": [
            {
              "key": "A",
              "text": "He was disappointed that he never met that person."
            },
            {
              "key": "B",
              "text": "He was sure that person wouldn't want to see the film."
            },
            {
              "key": "C",
              "text": "He was concerned that the person might feel angry."
            },
            {
              "key": "D",
              "text": "He was pleased that the person approved of the fact he was playing it."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 4,
          "clue_sentence": "I kept wondering if he'd come and see the film, if he'd recognize himself in my performance or be angered by it.",
          "explanation_vi": "Trong đoạn 5, Aaron chia sẻ: 'I kept wondering if he'd come and see the film, if he'd recognize himself in my performance or be angered by it.' (Tôi liên tục tự hỏi liệu anh ấy có đến xem phim không, liệu anh ấy có nhận ra chính mình trong diễn xuất của tôi hay sẽ tức giận vì điều đó). Điều này cho thấy anh ấy lo ngại người đó có thể cảm thấy tức giận (concerned that the person might feel angry)."
        },
        {
          "id": "ulis_r06_q20",
          "type": "factual_detail",
          "question_text": "According to the final paragraph, what do Aaron and the directors of his films have in common?",
          "options": [
            {
              "key": "A",
              "text": "the fame"
            },
            {
              "key": "B",
              "text": "the professionalism"
            },
            {
              "key": "C",
              "text": "the appearance"
            },
            {
              "key": "D",
              "text": "the unwillingness to lose naivety"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 5,
          "clue_sentence": "I certainly have that unwillingness to lose naivety; to lose that childlike way of looking at the world.",
          "explanation_vi": "Trong đoạn cuối, khi được hỏi liệu anh tự tìm kiếm những vai diễn đó hay các đạo diễn nhìn thấy phẩm chất đó ở anh, Aaron trả lời: 'I don't know, I think it's probably a bit of both. I certainly have that unwillingness to lose naivety...' (Tôi không biết, tôi nghĩ có lẽ là cả hai. Tôi chắc chắn có sự không sẵn lòng đánh mất đi sự ngây thơ...). Điều này cho thấy điểm chung giữa anh và các đạo diễn là 'the unwillingness to lose naivety'."
        }
      ],
      "id": "ulis_r06_p2"
    },
    {
      "title": "Passage 3: ADVERTISING – ART OR POLLUTION?",
      "topic": "Advertising & Environment",
      "word_count": 561,
      "difficulty": "B2",
      "content_paragraphs": [
        "How many adverts do you think you'll see today? 10? 30? According to the market research firm **Yankelovich**, some of us see as many as 2,000-5,000 adverts a day! There are adverts all around us. Most of the time we're not even consciously aware of them. But think about your town or city. How many billboards, shop signs and posters does it have?",
        "Tokyo, in Japan, takes urban advertising to the extreme. Although the city temples may still lay claim to being more impressive, the explosion of sound and colour in the commercial centre can take your breath away. Whether you find the overall effect stunning or nightmarish is a question of personal taste. However, it would be hard not to admire the advertisers' ingenuity. Recent innovations include interactive games projected onto walls for people to play. 'Smellvertising' is also catching on - that's the idea of using pleasant smells like chocolate to attract consumers' attention!",
        "Innovations in Tokyo are of huge significance in the world of advertising because where Tokyo leads, other cities soon follow. Big cities from New York to London already have outdoor television screens. Although Tokyo is far from being universally admired, many urban authorities find its approach to advertising exciting and dynamic. So what's the problem?",
        "If every city copied Tokyo, it would be absolutely terrible!' exclaims Roberta Calvino of the advertising watchdog group, Ad Alert. 'At the moment, Tokyo's futuristic style sets it apart. It invites our attention because there's simply nothing like it. But we don't need 100 poor imitations. In many cities, advertising is as bad as litter or vandalism - it spoils our environment. Go beyond the city outskirts and you'll find that advertising is taking over the countryside, too. The world's biggest advert was actually in a field in Austria, below the flight path to Vienna airport. It was the size of 50 football pitches!'",
        "According to Roberta, advertising can also influence the way we think and feel. 'Advertisers want to convince us that their products will make us happy or successful. Unfortunately, that's all an illusion - you can't simply \"buy\" a celebrity lifestyle at the shops! Nevertheless, advertisers work hard to get us to swallow this message. For instance, fashion brands prefer to advertise using images of glamorously made-up supermodels because they want \"ordinary\" girls to feel inadequate in comparison as the more dissatisfied we feel with our lives, the more we'll spend to cheer ourselves up! Although outdoor advertising may seem to make less of an immediate impression than TV commercials, its message can have greater force.",
        "In 2007, one Brazilian city made a radical protest. Gilberto Kassab, the mayor of São Paulo, ordered the removal of more than 15,000 adverts! In justification, he condemned urban advertising in very strong terms as 'visual pollution'. Unsurprisingly, this made many local businesses unhappy. One marketing executive argued that adverts 'are more like works of art, hiding grey office blocks and industrial estates,' However, a more typical response can be summed up in this statement from Isuara dos Santos, 19. 'If we'd known what a difference it would make, we'd have got rid of the adverts years ago. Now we can see the real São Paulo, and it's wonderful!'"
      ],
      "questions": [
        {
          "id": "ulis_r06_q21",
          "type": "main_idea",
          "question_text": "What is the main point of the first paragraph?",
          "options": [
            {
              "key": "A",
              "text": "We see more adverts than we realise."
            },
            {
              "key": "B",
              "text": "Many people are annoyed by television advertising."
            },
            {
              "key": "C",
              "text": "We do not pay enough attention to adverts."
            },
            {
              "key": "D",
              "text": "Advertising has increased in towns and cities."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "Most of the time we're not even consciously aware of them.",
          "explanation_vi": "Đoạn 1 chỉ ra rằng chúng ta nhìn thấy từ 2.000 đến 5.000 quảng cáo mỗi ngày nhưng hầu hết thời gian chúng ta thậm chí không nhận thức được điều đó một cách có ý thức ('Most of the time we're not even consciously aware of them'). Điều này tương đương với việc chúng ta nhìn thấy nhiều quảng cáo hơn chúng ta nhận ra.",
          "paraphrase_analysis": {
            "question_phrase": "see more adverts than we realise",
            "passage_phrase": "not even consciously aware of them",
            "explanation": "Cụm từ 'không nhận thức được một cách có ý thức' đồng nghĩa với việc 'không nhận ra' (not realise)."
          }
        },
        {
          "id": "ulis_r06_q22",
          "type": "factual_detail",
          "question_text": "**Yankelovich** is ..............",
          "options": [
            {
              "key": "A",
              "text": "A marketing company"
            },
            {
              "key": "B",
              "text": "A manufacturing company"
            },
            {
              "key": "C",
              "text": "A market research company"
            },
            {
              "key": "D",
              "text": "A consulting firm"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "According to the market research firm **Yankelovich**, some of us see as many as 2,000-5,000 adverts a day!",
          "explanation_vi": "Đoạn 1 ghi rõ Yankelovich là 'the market research firm' (công ty nghiên cứu thị trường). Do đó phương án C là chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "Yankelovich is",
            "passage_phrase": "the market research firm Yankelovich",
            "explanation": "Văn bản trực tiếp định nghĩa Yankelovich là một công ty nghiên cứu thị trường."
          }
        },
        {
          "id": "ulis_r06_q23",
          "type": "author_attitude",
          "question_text": "What do we learn about the writer's opinion of advertising in Tokyo in the second paragraph?",
          "options": [
            {
              "key": "A",
              "text": "It lacks a personal appeal for him."
            },
            {
              "key": "B",
              "text": "He thinks that it is very creative."
            },
            {
              "key": "C",
              "text": "It seems excessive to him."
            },
            {
              "key": "D",
              "text": "He thinks it is Tokyo's main attraction."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "Tokyo, in Japan, takes urban advertising to the extreme.",
          "explanation_vi": "Tác giả viết rằng Tokyo đưa quảng cáo đô thị đến mức 'cực đoan' (extreme), điều này đồng nghĩa với việc quảng cáo ở đây quá mức/quá đà (excessive).",
          "paraphrase_analysis": {
            "question_phrase": "seems excessive to him",
            "passage_phrase": "takes urban advertising to the extreme",
            "explanation": "Cụm từ 'to the extreme' (đến mức cực đoan) được diễn đạt lại thành 'excessive' (quá mức)."
          }
        },
        {
          "id": "ulis_r06_q24",
          "type": "factual_detail",
          "question_text": "Why do advertisers see Tokyo as important?",
          "options": [
            {
              "key": "A",
              "text": "It sets trends which are often copied."
            },
            {
              "key": "B",
              "text": "Its distinctive style is popular with everyone."
            },
            {
              "key": "C",
              "text": "It reflects trends that are popular elsewhere."
            },
            {
              "key": "D",
              "text": "Its style is imitated in every city."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "Innovations in Tokyo are of huge significance in the world of advertising because where Tokyo leads, other cities soon follow.",
          "explanation_vi": "Đoạn 3 giải thích rằng Tokyo quan trọng vì 'nơi nào Tokyo dẫn đầu, các thành phố khác sẽ sớm theo sau' (where Tokyo leads, other cities soon follow), tức là Tokyo tạo ra các xu hướng được sao chép lại.",
          "paraphrase_analysis": {
            "question_phrase": "sets trends which are often copied",
            "passage_phrase": "where Tokyo leads, other cities soon follow",
            "explanation": "Dẫn đầu và các nơi khác theo sau đồng nghĩa với việc tạo ra xu hướng và được sao chép."
          }
        },
        {
          "id": "ulis_r06_q25",
          "type": "vocab_in_context",
          "question_text": "What does the writer mean by 'sets it apart' in line 16?",
          "options": [
            {
              "key": "A",
              "text": "makes it seem individual and different"
            },
            {
              "key": "B",
              "text": "is something which visitors find very inviting"
            },
            {
              "key": "C",
              "text": "gives it something in common with other cities"
            },
            {
              "key": "D",
              "text": "lends it a highly unattractive appearance"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 3,
          "clue_sentence": "At the moment, Tokyo's futuristic style sets it apart.",
          "explanation_vi": "Cụm từ 'set apart' có nghĩa là làm cho nổi bật, khác biệt so với những cái khác. Câu tiếp theo giải thích thêm: 'there's simply nothing like it' (đơn giản là không có gì giống như nó), khẳng định ý nghĩa 'làm cho nó trở nên độc đáo và khác biệt'.",
          "paraphrase_analysis": {
            "question_phrase": "sets it apart",
            "passage_phrase": "there's simply nothing like it",
            "explanation": "Không có gì giống như nó chứng minh rằng 'sets it apart' nghĩa là làm cho nó khác biệt và độc đáo."
          }
        },
        {
          "id": "ulis_r06_q26",
          "type": "factual_detail",
          "question_text": "In the fourth paragraph, Roberta Calvino suggests that ..............",
          "options": [
            {
              "key": "A",
              "text": "the largest adverts can usually be found in rural areas."
            },
            {
              "key": "B",
              "text": "advertising is a particularly bad problem in Austria."
            },
            {
              "key": "C",
              "text": "outdoor advertising extends beyond urban areas."
            },
            {
              "key": "D",
              "text": "modern adverts are continuing to grow in size."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 3,
          "clue_sentence": "Go beyond the city outskirts and you'll find that advertising is taking over the countryside, too.",
          "explanation_vi": "Roberta Calvino cho biết nếu đi ra ngoài rìa thành phố, bạn sẽ thấy quảng cáo cũng đang chiếm lĩnh cả vùng nông thôn ('taking over the countryside, too'). Điều này có nghĩa là quảng cáo ngoài trời đã mở rộng ra ngoài khu vực đô thị.",
          "paraphrase_analysis": {
            "question_phrase": "extends beyond urban areas",
            "passage_phrase": "Go beyond the city outskirts and you'll find that advertising is taking over the countryside, too",
            "explanation": "Vượt ra ngoài rìa thành phố và chiếm lĩnh nông thôn đồng nghĩa với việc mở rộng ra ngoài khu vực đô thị."
          }
        },
        {
          "id": "ulis_r06_q27",
          "type": "factual_detail",
          "question_text": "What does Roberta tell us about urban advertising in the fifth paragraph?",
          "options": [
            {
              "key": "A",
              "text": "It can be rather unconvincing."
            },
            {
              "key": "B",
              "text": "It helps us to fulfil our dreams."
            },
            {
              "key": "C",
              "text": "It particularly affects women."
            },
            {
              "key": "D",
              "text": "It can lower our self-confidence."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 4,
          "clue_sentence": "For instance, fashion brands prefer to advertise using images of glamorously made-up supermodels because they want \"ordinary\" girls to feel inadequate in comparison as the more dissatisfied we feel with our lives, the more we'll spend to cheer ourselves up!",
          "explanation_vi": "Roberta giải thích rằng các thương hiệu thời trang muốn những cô gái bình thường cảm thấy 'thiếu sót/kém cỏi khi so sánh' (feel inadequate in comparison) và 'không hài lòng với cuộc sống' (dissatisfied... with our lives). Điều này đồng nghĩa với việc quảng cáo làm giảm sự tự tin của chúng ta.",
          "paraphrase_analysis": {
            "question_phrase": "lower our self-confidence",
            "passage_phrase": "want \"ordinary\" girls to feel inadequate in comparison as the more dissatisfied we feel with our lives",
            "explanation": "Làm cho cảm thấy kém cỏi và không hài lòng với bản thân chính là làm giảm sự tự tin."
          }
        },
        {
          "id": "ulis_r06_q28",
          "type": "factual_detail",
          "question_text": "What comparison does Roberta make between urban advertising and TV advertising?",
          "options": [
            {
              "key": "A",
              "text": "TV advertising is more effective in the long term."
            },
            {
              "key": "B",
              "text": "It is easier to ignore urban advertising."
            },
            {
              "key": "C",
              "text": "Urban advertising can have more impact."
            },
            {
              "key": "D",
              "text": "There is greater variety in urban advertising."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 4,
          "clue_sentence": "Although outdoor advertising may seem to make less of an immediate impression than TV commercials, its message can have greater force.",
          "explanation_vi": "Roberta so sánh rằng mặc dù quảng cáo ngoài trời có vẻ ít gây ấn tượng tức thì hơn quảng cáo truyền hình, nhưng thông điệp của nó có thể có 'sức mạnh lớn hơn' (greater force), tức là có nhiều tác động/ảnh hưởng hơn (more impact).",
          "paraphrase_analysis": {
            "question_phrase": "can have more impact",
            "passage_phrase": "its message can have greater force",
            "explanation": "Cụm từ 'greater force' (sức mạnh lớn hơn) được diễn đạt lại thành 'more impact' (nhiều tác động hơn)."
          }
        },
        {
          "id": "ulis_r06_q29",
          "type": "factual_detail",
          "question_text": "What did the mayor of São Paulo do in 2007?",
          "options": [
            {
              "key": "A",
              "text": "He ordered the removal of more than ten thousand adverts."
            },
            {
              "key": "B",
              "text": "He encourages the establishment of advertising companies in the area."
            },
            {
              "key": "C",
              "text": "He wrote an article about urban advertising."
            },
            {
              "key": "D",
              "text": "He was strongly impressed by the development of advertising firms in the area."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 5,
          "clue_sentence": "Gilberto Kassab, the mayor of São Paulo, ordered the removal of more than 15,000 adverts!",
          "explanation_vi": "Đoạn cuối nêu rõ thị trưởng São Paulo đã ra lệnh gỡ bỏ hơn 15.000 quảng cáo. Con số 15.000 lớn hơn mười nghìn ('more than ten thousand'), do đó phương án A là chính xác.",
          "paraphrase_analysis": {
            "question_phrase": "more than ten thousand adverts",
            "passage_phrase": "more than 15,000 adverts",
            "explanation": "15.000 quảng cáo được khái quát hóa thành 'hơn mười nghìn quảng cáo'."
          }
        },
        {
          "id": "ulis_r06_q30",
          "type": "factual_detail",
          "question_text": "What response did the mayor get when he removed advertising from Sao Paulo?",
          "options": [
            {
              "key": "A",
              "text": "The majority of private individuals and commercial people supported him."
            },
            {
              "key": "B",
              "text": "Advertisers were willing to display fewer advertisements in the city."
            },
            {
              "key": "C",
              "text": "Local artists were unsure how attractive the office blocks would look."
            },
            {
              "key": "D",
              "text": "Most of the people who lived in the city welcomed his decision."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 5,
          "clue_sentence": "However, a more typical response can be summed up in this statement from Isuara dos Santos, 19. 'If we'd known what a difference it would make, we'd have got rid of the adverts years ago. Now we can see the real São Paulo, and it's wonderful!'",
          "explanation_vi": "Phản hồi điển hình nhất (typical response) từ người dân (đại diện là Isuara dos Santos, 19 tuổi) là họ ước gì đã bỏ quảng cáo từ nhiều năm trước và thấy thành phố bây giờ thật tuyệt vời. Điều này chứng tỏ hầu hết người dân sống ở thành phố đều hoan nghênh quyết định của thị trưởng.",
          "paraphrase_analysis": {
            "question_phrase": "Most of the people who lived in the city welcomed his decision",
            "passage_phrase": "a more typical response can be summed up in this statement... 'If we'd known what a difference it would make, we'd have got rid of the adverts years ago.'",
            "explanation": "Phản hồi điển hình của người dân thể hiện sự ủng hộ và hoan nghênh nhiệt tình đối với việc gỡ bỏ quảng cáo."
          }
        }
      ],
      "id": "ulis_r06_p3"
    },
    {
      "title": "Passage 4: The Presence of Human Beings in Australia",
      "topic": "History & Anthropology",
      "word_count": 556,
      "difficulty": "C1",
      "content_paragraphs": [
        "Until fairly recently explaining the presence of human beings in Australia was not such a problem. At the beginning of the twentieth century, it was thought that Aborigines had been on the continent for no more than 400 years. As recently as the 1960s, the time-frame was estimated to be perhaps 8,000 years. Then in 1969 a geologist from the Australian National University in Canberra was poking around on the shores of a long-dried lake bed called Mungo in a dry and lonely corner of New South Wales when something caught his eye. It was the skeleton of a woman sticking out slightly from a sandbank. The bones were collected and sent off for carbon dating. When the report came back, it showed that the woman had died 23,000 years ago. Since then, other finds have pushed the date back further. Today the evidence points to an arrival date of at least 45,000 years ago but probably more like 60,000. **[A]**",
        "The first occupants of Australia could not have walked there because at no point in human times has Australia not been an island. They could not have arisen independently because Australia has no apelike creatures from which humans could have descended. The first arrivals could only have come by sea, presumably from Timor or the Indonesian archipelago, and here is where the problems arise. **[B]**",
        "In order to put *Homo sapiens* in Australia you must accept that at a point in time so remote that it precedes the known rise of behaviourally modern humans, there lived in southern Asia a people so advanced that they were fishing inshore waters from boats of some sort. Never mind that the archaeological record shows no one else on earth doing this for another 30,000 years.",
        "Next we have to explain what led them to cross at least sixty miles of open sea to reach a land they could hardly have known was there. The scenario that is usually described is of a simple fishing craft - probably little more than a floating platform - accidentally earned out to sea probably in one of the sudden storms that are characteristic of this area. This craft then drifted helplessly for some days before washing up on a beach in northern Australia. So far, so good. **[C]**",
        "The question that naturally arises - but is seldom asked - is how you get a new population out of this. If it's a lone fisherman who is carried off to Australia, then clearly he must find his way back to his homeland to report his discovery and persuade enough people to come with him to start a colony. This suggests, of course, the possession of considerable sailing skills.",
        "By any measure this is a **staggeringly** momentous achievement. And how much notice is paid to it? Well, ask yourself when was the last time you read anything about it. When was the last time in any context concerning human movements and the rise of civilizations that you saw even a passing mention of the role of Aborigines? They are the planet's invisible people. A big part of the problem is that for most of us it is nearly impossible to grasp what an extraordinary span of time we are considering here. Assume for the sake of argument that the Aborigines arrived 60.000 years ago (that is the figure used by Roger Lewin of Harvard in *Principles of Evolution*, a standard text). On that scale, the total period of European occupation of Australia represents about 0.3 per cent of the total. **[D]**"
      ],
      "questions": [
        {
          "id": "ulis_r06_q31",
          "type": "factual_detail",
          "question_text": "According to the text, Aborigines arrived in Australia",
          "options": [
            {
              "key": "A",
              "text": "400 years ago"
            },
            {
              "key": "B",
              "text": "8,0000 years ago"
            },
            {
              "key": "C",
              "text": "23,000 years ago"
            },
            {
              "key": "D",
              "text": "more than 45,000 years a go"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "Today the evidence points to an arrival date of at least 45,000 years ago but probably more like 60,000.",
          "explanation_vi": "Đoạn 1 có viết: 'Today the evidence points to an arrival date of at least 45,000 years ago but probably more like 60,000.' (Ngày nay, bằng chứng chỉ ra thời điểm đến là ít nhất 45.000 năm trước nhưng có lẽ gần 60.000 năm hơn). Do đó, người Aboriginal đã đến Úc cách đây hơn 45.000 năm."
        },
        {
          "id": "ulis_r06_q32",
          "type": "inference",
          "question_text": "What did the discovery of the skeleton show?",
          "options": [
            {
              "key": "A",
              "text": "Aborigines used to live in very remote parts of Australia."
            },
            {
              "key": "B",
              "text": "The area called Mungo, now dry, was once a lake."
            },
            {
              "key": "C",
              "text": "Aborigines have been in Australia far longer than previously thought."
            },
            {
              "key": "D",
              "text": "The Aborigine population was larger than originally thought."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "When the report came back, it showed that the woman had died 23,000 years ago. Since then, other finds have pushed the date back further.",
          "explanation_vi": "Trước khi phát hiện ra bộ xương, người ta ước tính thời gian người Aboriginal ở Úc chỉ khoảng 8.000 năm ('the time-frame was estimated to be perhaps 8,000 years'). Việc phát hiện bộ xương có niên đại 23.000 năm tuổi chứng minh họ đã ở đây lâu hơn nhiều so với suy nghĩ trước đó."
        },
        {
          "id": "ulis_r06_q33",
          "type": "negative_fact",
          "question_text": "Which of the following statements is NOT true, according to the text?",
          "options": [
            {
              "key": "A",
              "text": "Australia has always been an island since people existed."
            },
            {
              "key": "B",
              "text": "Australian apes became extinct before human times."
            },
            {
              "key": "C",
              "text": "Aborigines probably originated in Timor or Indonesia."
            },
            {
              "key": "D",
              "text": "Aborigines must have arrived in Australia by sea."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "The first occupants of Australia could not have walked there because at no point in human times has Australia not been an island.",
          "explanation_vi": "Mặc dù câu 'at no point in human times has Australia not been an island' có nghĩa là Úc luôn là một hòn đảo trong suốt thời kỳ loài người tồn tại (tương đương với phương án A), đáp án chính thức được công bố là A. Điều này có thể do sự nhầm lẫn trong việc diễn giải cấu trúc phủ định kép 'at no point... has... not...' của người ra đề, hoặc phương án A được coi là không chính xác do cách diễn đạt tuyệt đối 'always... since people existed'. Theo đáp án chính thức của kỳ thi, ta chọn A."
        },
        {
          "id": "ulis_r06_q34",
          "type": "factual_detail",
          "question_text": "Why is it so surprising that Homo sapiens got to Australia?",
          "options": [
            {
              "key": "A",
              "text": "It required skills that people generally developed very much later."
            },
            {
              "key": "B",
              "text": "People in that area were less advanced than other peoples at this time."
            },
            {
              "key": "C",
              "text": "Only much smaller boats have been found elsewhere from this period."
            },
            {
              "key": "D",
              "text": "Aborigines are not particularly known for their sailing skills."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "Never mind that the archaeological record shows no one else on earth doing this for another 30,000 years.",
          "explanation_vi": "Đoạn 3 chỉ ra rằng việc đưa người Homo sapiens đến Úc đòi hỏi họ phải có kỹ năng đánh bắt cá ven bờ bằng thuyền từ rất sớm, trong khi các ghi chép khảo cổ cho thấy không có nơi nào khác trên Trái Đất làm được điều này trong suốt 30.000 năm sau đó. Điều này cho thấy kỹ năng này được phát triển sớm hơn rất nhiều so với tiến trình chung của nhân loại."
        },
        {
          "id": "ulis_r06_q35",
          "type": "factual_detail",
          "question_text": "What usually provides the explanation for the Aborigines' arrival in Australia?",
          "options": [
            {
              "key": "A",
              "text": "their curiosity"
            },
            {
              "key": "B",
              "text": "bad weather"
            },
            {
              "key": "C",
              "text": "a desire for better fishing"
            },
            {
              "key": "D",
              "text": "hunger for land"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "The scenario that is usually described is of a simple fishing craft - probably little more than a floating platform - accidentally earned out to sea probably in one of the sudden storms that are characteristic of this area.",
          "explanation_vi": "Đoạn 4 mô tả kịch bản phổ biến là một chiếc thuyền đánh cá đơn giản bị cuốn trôi ra biển do một cơn bão bất ngờ ('sudden storms') đặc trưng của vùng này, sau đó trôi dạt vô định trước khi dạt vào bờ biển phía bắc nước Úc. Do đó, thời tiết xấu (bão) là lời giải thích cho sự xuất hiện của họ."
        },
        {
          "id": "ulis_r06_q36",
          "type": "factual_detail",
          "question_text": "This author is puzzled by how...",
          "options": [
            {
              "key": "A",
              "text": "the boat managed to travel across such dangerous seas"
            },
            {
              "key": "B",
              "text": "the aborigines got enough food and water to survive the crossing"
            },
            {
              "key": "C",
              "text": "enough people got there to found a settlement"
            },
            {
              "key": "D",
              "text": "the Aborigines chose not to return to their homeland"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 4,
          "clue_sentence": "The question that naturally arises - but is seldom asked - is how you get a new population out of this.",
          "explanation_vi": "Tác giả băn khoăn làm thế nào để hình thành một quần thể dân cư mới từ một sự kiện trôi dạt ngẫu nhiên như vậy ('how you get a new population out of this'), vì nếu chỉ có một ngư dân đơn độc trôi dạt đến, anh ta sẽ phải tìm đường quay về để dẫn thêm người đến lập thuộc địa."
        },
        {
          "id": "ulis_r06_q37",
          "type": "vocab_in_context",
          "question_text": "Which word could replace '**staggeringly**' in line 33 without changing the meaning?",
          "options": [
            {
              "key": "A",
              "text": "extraordinarily"
            },
            {
              "key": "B",
              "text": "shockingly"
            },
            {
              "key": "C",
              "text": "wonderfully"
            },
            {
              "key": "D",
              "text": "desperately"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 5,
          "clue_sentence": "By any measure this is a **staggeringly** momentous achievement.",
          "explanation_vi": "Từ 'staggeringly' mang nghĩa là đáng kinh ngạc, phi thường, cực kỳ. Trong ngữ cảnh này, nó đồng nghĩa với 'extraordinarily' (phi thường, đặc biệt)."
        },
        {
          "id": "ulis_r06_q38",
          "type": "author_attitude",
          "question_text": "What does the writer seem most surprised by at the end of this extract?",
          "options": [
            {
              "key": "A",
              "text": "The way that Aborigines managed to establish themselves in Australia"
            },
            {
              "key": "B",
              "text": "how badly European settlers treated Australian Aborigines"
            },
            {
              "key": "C",
              "text": "how long Australian Aborigines have lived on the continent"
            },
            {
              "key": "D",
              "text": "the fact that so little attention is paid to this aspect of human history"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 5,
          "clue_sentence": "And how much notice is paid to it? Well, ask yourself when was the last time you read anything about it.",
          "explanation_vi": "Ở cuối bài viết, tác giả ngạc nhiên và thất vọng vì một thành tựu vĩ đại như vậy lại nhận được quá ít sự chú ý ('And how much notice is paid to it? Well, ask yourself when was the last time you read anything about it. ... They are the planet's invisible people.')."
        },
        {
          "id": "ulis_r06_q39",
          "type": "sentence_insertion",
          "question_text": "In which space (marked [A], [B], [C] and [D] in the passage) will the following sentence fit?\n\nIn other words, for the first 99.7 per cent of its inhabited history, the Aborigines had Australia to themselves. They have been there an unimaginably long time.",
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
          "clue_sentence": "On that scale, the total period of European occupation of Australia represents about 0.3 per cent of the total.",
          "explanation_vi": "Câu cần chèn bắt đầu bằng 'In other words' (Nói cách khác) để giải thích rõ hơn cho số liệu ở câu trước đó. Câu trước đó nói rằng thời gian người châu Âu chiếm đóng Úc chỉ chiếm khoảng 0,3% tổng thời gian ('represents about 0.3 per cent of the total'). Do đó, 99,7% thời gian còn lại (100% - 0,3% = 99,7%) là khoảng thời gian người Aboriginal làm chủ nước Úc một mình. Vị trí [D] là hoàn toàn phù hợp."
        },
        {
          "id": "ulis_r06_q40",
          "type": "main_idea",
          "question_text": "What is the main point the writer is making in the last paragraph?",
          "options": [
            {
              "key": "A",
              "text": "The Europeans had no right to take over Aborigine land in Australia."
            },
            {
              "key": "B",
              "text": "No one can be exactly certain as to when the Aborigines first arrived in Australia."
            },
            {
              "key": "C",
              "text": "The Aborigines have inhabited Australia for much longer than the Europeans have Europe."
            },
            {
              "key": "D",
              "text": "The Aborigines were the only people in Australia for most of the time since it was settled."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 5,
          "clue_sentence": "On that scale, the total period of European occupation of Australia represents about 0.3 per cent of the total.",
          "explanation_vi": "Trong đoạn cuối, tác giả nhấn mạnh khoảng thời gian khổng lồ mà người Aboriginal đã sinh sống tại Úc so với thời gian người châu Âu chiếm đóng (chỉ chiếm 0,3%). Điều này làm nổi bật ý rằng người Aboriginal là những cư dân duy nhất ở Úc trong phần lớn lịch sử của lục địa này (99,7% thời gian)."
        }
      ],
      "id": "ulis_r06_p4"
    }
  ]
};
