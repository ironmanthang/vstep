import type { ReadingTest } from '../../../../types/schemas';

/**
 * Authentic VSTEP Reading Test 7 (ULIS - ĐHQGHN Standard)
 * Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Pages 85–91 (PDF Pages 89–95), Key page 155 (PDF Page 159)
 * Format: 4 Passages, 40 Questions, 60 Minutes.
 */
export const ULIS_READING_TEST_07: ReadingTest = {
  "id": "ulis_read_test_07",
  "title": "VSTEP Reading Mock Test 7 (Chuẩn ĐHNN - ĐHQGHN)",
  "duration_minutes": 60,
  "difficulty": "B2",
  "passages": [
    {
      "title": "Passage 1: Take me out to the Ballpark",
      "topic": "Sports & Culture",
      "word_count": 502,
      "difficulty": "B1",
      "content_paragraphs": [
        "Baseball is sometimes called a national pastime in America because it is a much loved national sport. Of course, baseball is not limited to the USA. It has played for many years in the countries of South America and is very popular in Japan. Europe is another matter, not many baseball teams exist in Europe today. That, however, is slowly changing. Since baseball is an Olympic sport, more and more countries are putting together teams and joining the game! [A]",
        "Going to baseball games is a way of life for many fans. They sit in the stands on hot and sunny spring and summer days, eat hot dogs or popcorn, sip cola or lemonade and enjoy the game. Adults and children alike attend games, and it's a sport that everyone seems to love. Baseball is such a part of American life that nearly everyone's favourite childhood memory includes a day at the ballpark.",
        "When and where did the game of baseball start? Well, people have been playing games with a stick and a ball for hundreds of years! Modern baseball, however, about 150 years ago in New York, USA and has been a popular sport ever since. It has changed a little bit over the years but the basic game remains the same.",
        "Baseball is played with a bat, which is a stick about 100 cm long is made of metal or wood, and a small hard ball. Each player also wears one heavy leather glove to catch the ball. Baseball gear usually consists of a lightweight shirt and trousers that come down just past the knees. [B]",
        "Baseball is played on a special outdoor field which has two parts, the infield and the outfield. In the infield is an area shaped like a diamond that indicates the boundaries of the playing area. On the diamond, there are also the three bases that the players must run over to score. The outfield is an open grassy area where players wait to catch balls that are hit by other players.",
        "The game of baseball is divided into nine parts, called innings. During an inning, each of the two teams takes its turn to bat, which means trying to hit the ball that is thrown to them by the pitcher of the other team. After the ball is hit, the player tries to run and touch three different bases before running to home base. The team not batting tries to catch the balls that are hit and stop the runners before they score. The team that scores the most runs by the end of the ninth inning wins. It's a game that can go very slowly for a while then suddenly have a series of fast and exciting moves! [C]",
        "Fans love baseball games! The stands are usually filled for the games. People enjoy a day at the ballpark cheering on their favourite team and relaxing in the summer sun. So what are you waiting for? Put on your baseball cap and give it a try! [D]"
      ],
      "questions": [
        {
          "id": "ulis_r07_q01",
          "type": "factual_detail",
          "question_text": "The writer says that baseball ...........",
          "options": [
            {
              "key": "A",
              "text": "is played only in America."
            },
            {
              "key": "B",
              "text": "is not popular in countries like Japan."
            },
            {
              "key": "C",
              "text": "started in South America."
            },
            {
              "key": "D",
              "text": "is becoming more popular all over the world."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "Since baseball is an Olympic sport, more and more countries are putting together teams and joining the game!",
          "explanation_vi": "Tác giả đề cập rằng bóng chày đang ngày càng có nhiều quốc gia thành lập đội tuyển và tham gia trò chơi này ('more and more countries are putting together teams and joining the game!'), tức là nó đang trở nên phổ biến hơn trên toàn thế giới. Do đó, đáp án D là chính xác."
        },
        {
          "id": "ulis_r07_q02",
          "type": "factual_detail",
          "question_text": "According to the text, baseball is played in more and more countries because .............",
          "options": [
            {
              "key": "A",
              "text": "it is an exciting game."
            },
            {
              "key": "B",
              "text": "it is included in the Olympic Games."
            },
            {
              "key": "C",
              "text": "Many American people live there."
            },
            {
              "key": "D",
              "text": "it is easy to play."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "Since baseball is an Olympic sport, more and more countries are putting together teams and joining the game!",
          "explanation_vi": "Đoạn văn nêu rõ lý do bóng chày được chơi ở nhiều quốc gia hơn là vì nó là một môn thể thao Olympic ('Since baseball is an Olympic sport...'). Do đó, đáp án B là chính xác."
        },
        {
          "id": "ulis_r07_q03",
          "type": "negative_fact",
          "question_text": "Which sentence isn't true about baseball?",
          "options": [
            {
              "key": "A",
              "text": "It was first played during the 1850s."
            },
            {
              "key": "B",
              "text": "It is an Olympic sport."
            },
            {
              "key": "C",
              "text": "The rules have changed quite a lot over the years."
            },
            {
              "key": "D",
              "text": "It started in New York."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 2,
          "clue_sentence": "It has changed a little bit over the years but the basic game remains the same.",
          "explanation_vi": "Câu C nói rằng luật chơi đã thay đổi khá nhiều là sai, vì văn bản ghi: 'It has changed a little bit over the years but the basic game remains the same' (Nó chỉ thay đổi một chút qua các năm nhưng trò chơi cơ bản vẫn giữ nguyên). Do đó, đáp án C là câu không đúng."
        },
        {
          "id": "ulis_r07_q04",
          "type": "negative_fact",
          "question_text": "Which piece of equipment is not mentioned in the text?",
          "options": [
            {
              "key": "A",
              "text": "bat"
            },
            {
              "key": "B",
              "text": "ball"
            },
            {
              "key": "C",
              "text": "glove"
            },
            {
              "key": "D",
              "text": "mask"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 3,
          "clue_sentence": "Baseball is played with a bat, which is a stick about 100 cm long is made of metal or wood, and a small hard ball. Each player also wears one heavy leather glove to catch the ball.",
          "explanation_vi": "Đoạn văn nhắc đến 'bat' (gậy), 'ball' (bóng), và 'glove' (găng tay), nhưng không hề nhắc đến 'mask' (mặt nạ bảo hộ). Do đó, đáp án D là chính xác."
        },
        {
          "id": "ulis_r07_q05",
          "type": "sentence_insertion",
          "question_text": "In which space (marked [A], [B], [C] and [D] in the passage) will the following sentence fit?\nPlayers wear shoes with spikes to help them run, just as football players do, and a baseball cap, which is something everyone is familiar with!",
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
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "Baseball gear usually consists of a lightweight shirt and trousers that come down just past the knees. [B]",
          "explanation_vi": "Câu cần chèn mô tả thêm về trang phục thi đấu của cầu thủ bóng chày ('wear shoes with spikes... and a baseball cap'). Vị trí [B] nằm ngay sau câu mô tả về trang phục bóng chày ('Baseball gear usually consists of...'). Do đó, đáp án B là vị trí phù hợp nhất."
        },
        {
          "id": "ulis_r07_q06",
          "type": "factual_detail",
          "question_text": "What is the baseball field like?",
          "options": [
            {
              "key": "A",
              "text": "It has an infield, an outfield and a middle field."
            },
            {
              "key": "B",
              "text": "There are three diamonds on the ground."
            },
            {
              "key": "C",
              "text": "There are three bases on the diamond."
            },
            {
              "key": "D",
              "text": "It is usually in an indoor stadium."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 4,
          "clue_sentence": "On the diamond, there are also the three bases that the players must run over to score.",
          "explanation_vi": "Đoạn văn mô tả: 'On the diamond, there are also the three bases...' (Trên hình kim cương, cũng có ba gôn...). Do đó, đáp án C là chính xác."
        },
        {
          "id": "ulis_r07_q07",
          "type": "factual_detail",
          "question_text": "The game is divided into ............",
          "options": [
            {
              "key": "A",
              "text": "two halves."
            },
            {
              "key": "B",
              "text": "nine innings."
            },
            {
              "key": "C",
              "text": "three bases."
            },
            {
              "key": "D",
              "text": "an infield and an outfield."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 5,
          "clue_sentence": "The game of baseball is divided into nine parts, called innings.",
          "explanation_vi": "Đoạn văn nêu rõ: 'The game of baseball is divided into nine parts, called innings.' (Trận đấu bóng chày được chia thành chín phần, gọi là các hiệp đấu). Do đó, đáp án B là chính xác."
        },
        {
          "id": "ulis_r07_q08",
          "type": "factual_detail",
          "question_text": "The object of the game is to .................",
          "options": [
            {
              "key": "A",
              "text": "catch as many balls as you can."
            },
            {
              "key": "B",
              "text": "hit the ball the farthest."
            },
            {
              "key": "C",
              "text": "score the most runs."
            },
            {
              "key": "D",
              "text": "bat as often as you can."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 5,
          "clue_sentence": "The team that scores the most runs by the end of the ninth inning wins.",
          "explanation_vi": "Mục tiêu của trò chơi là ghi được nhiều điểm chạy nhất để giành chiến thắng ('The team that scores the most runs... wins'). Do đó, đáp án C là chính xác."
        },
        {
          "id": "ulis_r07_q09",
          "type": "factual_detail",
          "question_text": "What is true about a baseball match?",
          "options": [
            {
              "key": "A",
              "text": "It's slow."
            },
            {
              "key": "B",
              "text": "It often takes place on hot summer days."
            },
            {
              "key": "C",
              "text": "Spectators are not allowed to bring foods to the ballpark."
            },
            {
              "key": "D",
              "text": "The speed of the match may change suddenly."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 5,
          "clue_sentence": "It's a game that can go very slowly for a while then suddenly have a series of fast and exciting moves!",
          "explanation_vi": "Đoạn văn viết: 'It's a game that can go very slowly for a while then suddenly have a series of fast and exciting moves!' (Đó là một trò chơi có thể diễn ra rất chậm trong một thời gian rồi đột ngột có một loạt các động tác nhanh và thú vị!). Điều này có nghĩa là tốc độ của trận đấu có thể thay đổi đột ngột. Do đó, đáp án D là chính xác."
        },
        {
          "id": "ulis_r07_q10",
          "type": "factual_detail",
          "question_text": "According to the text, most American people have .............",
          "options": [
            {
              "key": "A",
              "text": "childhood memory at a ballpark."
            },
            {
              "key": "B",
              "text": "a baseball gear."
            },
            {
              "key": "C",
              "text": "experience of participating in at least a baseball inning."
            },
            {
              "key": "D",
              "text": "all of them"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "Baseball is such a part of American life that nearly everyone's favourite childhood memory includes a day at the ballpark.",
          "explanation_vi": "Đoạn văn viết: 'Baseball is such a part of American life that nearly everyone's favourite childhood memory includes a day at the ballpark.' (Bóng chày là một phần của cuộc sống Mỹ đến nỗi hầu như ký ức tuổi thơ yêu thích của mọi người đều bao gồm một ngày ở sân bóng chày). Do đó, đáp án A là chính xác."
        }
      ],
      "id": "ulis_r07_p1"
    },
    {
      "title": "Passage 2: THE DECATHLON",
      "topic": "Athletics & Sports",
      "word_count": 586,
      "difficulty": "B2",
      "content_paragraphs": [
        "The Olympic Games have changed a lot since their origins in Ancient Greece. Today, athletes from countries all over the world take part and the Olympics are big business, watched by millions on television. Some things, though, have stayed the same. The athletes then could make a lot of money from winning, just like today's competitors. In the ancient Games, a great champion might have received as much as a year's pay for winning a race.",
        "Another thing that hasn't changed is the search for an all-round champion, somebody who can defeat their opponents at a number of different sporting events. In the ancient Olympics, athletes competed in the pentathlon. This consisted of the long jump, the discus, the javelin, a running race and wrestling. The first winner, in 708 BC, was Lampis of Sparta, who must have been a great athlete to beat so many others from all over the Hellenic world. The pentathlon was an important part of the Olympics until Emperor Theodosius of Rome banned the Games in 393 AD.",
        "The Stockholm Olympics of 1912 brought back this tradition of the search for all round greatness. The modern pentathlon was included (shooting, swimming, fencing, riding and running) and so was the modern decathlon (ten events), with the heptathlon (seven events) for women being introduced later. So what drives someone to take on this running, throwing, jumping challenge and push their body to its limits? I met American decathlete Bruce Thorpe in New York and told him he must have been crazy to take up the decathlon. He laughed.",
        "'Yes, I think I probably was. I could have done lots of different sports, but I chose the decathlon. It's very tough and it demands a lot of different skills. You have to train just as hard as other athletes, only you have to do it in ten different events! I think we're probably all a little crazy, but it's very satisfying in the end,' he said. I asked him to explain what happens in the decathlon.",
        "'The way it works is you complete each event and you get points, depending on how well you do in that event. At the end of two days, the person with the most points is the champion and takes the gold medal, the second person gets the silver and the third the bronze medal. We start with the 100 metres, the long jump, the shot put, the high jump and the 400 metres. The second day, it's the 110 metre hurdles, the discus, the javelin, the pole vault and the one that we all dread, the 1500 metres.' I asked him what made the 1500 metres such a struggle. 'All the other events demand speed or strength. With the long race, it's stamina. Really, decathletes aren't built for that event.'",
        "So what tips does Bruce have for those of you thinking of taking up the decathlon? 'Start as early as you can and join a good club,' he said. 'It takes a long time to master ten different events, or seven for the heptathlon, and you need expert help. And don't expect to have much free time!'",
        "Ten events, one champion. Think you might be the one? If you're interested in finding out more about the decathlon, contact your local athletics club."
      ],
      "questions": [
        {
          "id": "ulis_r07_q11",
          "type": "factual_detail",
          "question_text": "In the first paragraph, the writer says that athletes today ............",
          "options": [
            {
              "key": "A",
              "text": "are more popular than in ancient times."
            },
            {
              "key": "B",
              "text": "are much better than in ancient times."
            },
            {
              "key": "C",
              "text": "treat the Olympics like a business."
            },
            {
              "key": "D",
              "text": "can become wealthy through sport."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "The athletes then could make a lot of money from winning, just like today's competitors.",
          "explanation_vi": "Đoạn 1 cho biết các vận động viên thời xưa có thể kiếm được rất nhiều tiền từ việc chiến thắng, giống như các đối thủ ngày nay (\"just like today's competitors\"). Điều này có nghĩa là các vận động viên ngày nay có thể trở nên giàu có nhờ thể thao.",
          "paraphrase_analysis": {
            "question_phrase": "can become wealthy through sport",
            "passage_phrase": "could make a lot of money from winning, just like today's competitors",
            "explanation": "\"Make a lot of money\" (kiếm nhiều tiền) được diễn đạt lại thành \"become wealthy\" (trở nên giàu có)."
          }
        },
        {
          "id": "ulis_r07_q12",
          "type": "vocab_in_context",
          "question_text": "What does the word \" This \" in line 8 refer to?",
          "options": [
            {
              "key": "A",
              "text": "The champion"
            },
            {
              "key": "B",
              "text": "the running race"
            },
            {
              "key": "C",
              "text": "Greece"
            },
            {
              "key": "D",
              "text": "the pentathlon"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 1,
          "clue_sentence": "In the ancient Olympics, athletes competed in the pentathlon. This consisted of the long jump, the discus, the javelin, a running race and wrestling.",
          "explanation_vi": "Từ \"This\" ở đầu câu thứ ba thay thế cho danh từ \"the pentathlon\" (môn phối hợp 5 môn) được nhắc đến ở câu ngay trước đó."
        },
        {
          "id": "ulis_r07_q13",
          "type": "negative_fact",
          "question_text": "The ancient pentathlon didn't test athletes' abilities to ............",
          "options": [
            {
              "key": "A",
              "text": "throw things."
            },
            {
              "key": "B",
              "text": "jump high."
            },
            {
              "key": "C",
              "text": "run fast."
            },
            {
              "key": "D",
              "text": "jump far."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 1,
          "clue_sentence": "This consisted of the long jump, the discus, the javelin, a running race and wrestling.",
          "explanation_vi": "Môn pentathlon cổ đại bao gồm nhảy xa (long jump - tương ứng với jump far), ném đĩa và ném lao (discus, javelin - tương ứng với throw things), chạy (running race - tương ứng với run fast) và đấu vật. Không có môn nhảy cao (jump high)."
        },
        {
          "id": "ulis_r07_q14",
          "type": "factual_detail",
          "question_text": "Lampis of Sparta was ................",
          "options": [
            {
              "key": "A",
              "text": "the organizer of the first ancient Olympics"
            },
            {
              "key": "B",
              "text": "Emperor Theodosius of Rome"
            },
            {
              "key": "C",
              "text": "the first winner of the ancient Olympics"
            },
            {
              "key": "D",
              "text": "the greatest athlete in history"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "The first winner, in 708 BC, was Lampis of Sparta, who must have been a great athlete to beat so many others from all over the Hellenic world.",
          "explanation_vi": "Đoạn 2 ghi rõ Lampis của Sparta là người chiến thắng đầu tiên (vào năm 708 TCN) của môn pentathlon cổ đại."
        },
        {
          "id": "ulis_r07_q15",
          "type": "inference",
          "question_text": "According to the passage, the heptathlon for women .............",
          "options": [
            {
              "key": "A",
              "text": "became an Olympic event after 1912."
            },
            {
              "key": "B",
              "text": "similar to the ancient pentathlon."
            },
            {
              "key": "C",
              "text": "tests the ability to ride a horse."
            },
            {
              "key": "D",
              "text": "is much easier than the decathlon."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "The Stockholm Olympics of 1912 brought back this tradition of the search for all round greatness. The modern pentathlon was included (shooting, swimming, fencing, riding and running) and so was the modern decathlon (ten events), with the heptathlon (seven events) for women being introduced later.",
          "explanation_vi": "Đoạn 3 cho biết Thế vận hội Stockholm năm 1912 đã đưa môn pentathlon và decathlon hiện đại vào thi đấu, còn môn heptathlon (bảy môn phối hợp) dành cho phụ nữ được giới thiệu sau đó (\"being introduced later\"). Do đó, môn này trở thành sự kiện Olympic sau năm 1912."
        },
        {
          "id": "ulis_r07_q16",
          "type": "factual_detail",
          "question_text": "How many sporting events were included in the modern decathlon of Stockholm Olympics in 1912?",
          "options": [
            {
              "key": "A",
              "text": "only one"
            },
            {
              "key": "B",
              "text": "five"
            },
            {
              "key": "C",
              "text": "seven"
            },
            {
              "key": "D",
              "text": "ten"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "The modern pentathlon was included (shooting, swimming, fencing, riding and running) and so was the modern decathlon (ten events), with the heptathlon (seven events) for women being introduced later.",
          "explanation_vi": "Đoạn 3 ghi rõ môn decathlon hiện đại bao gồm mười môn phối hợp (\"decathlon (ten events)\")."
        },
        {
          "id": "ulis_r07_q17",
          "type": "factual_detail",
          "question_text": "What did Bruce Thorpe say about decathlon?",
          "options": [
            {
              "key": "A",
              "text": "It is challenging and requires athletes to have various skills."
            },
            {
              "key": "B",
              "text": "There's no need for participants to train hard."
            },
            {
              "key": "C",
              "text": "It has only seven events."
            },
            {
              "key": "D",
              "text": "It takes one day to decide the winner."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 3,
          "clue_sentence": "It's very tough and it demands a lot of different skills.",
          "explanation_vi": "Bruce Thorpe nhận xét về decathlon: \"It's very tough and it demands a lot of different skills\" (Nó rất khó khăn và đòi hỏi nhiều kỹ năng khác nhau), tương đương với phương án A."
        },
        {
          "id": "ulis_r07_q18",
          "type": "factual_detail",
          "question_text": "What do you have to do to win a gold medal in the decathlon?",
          "options": [
            {
              "key": "A",
              "text": "Score more points than all the other competitors."
            },
            {
              "key": "B",
              "text": "Beat the other competitors in at least three events."
            },
            {
              "key": "C",
              "text": "Finish each event in the top three."
            },
            {
              "key": "D",
              "text": "Complete the events in the right order."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 4,
          "clue_sentence": "At the end of two days, the person with the most points is the champion and takes the gold medal, the second person gets the silver and the third the bronze medal.",
          "explanation_vi": "Đoạn 5 giải thích rằng sau hai ngày thi đấu, người có nhiều điểm nhất (\"the person with the most points\") sẽ là nhà vô địch và giành huy chương vàng."
        },
        {
          "id": "ulis_r07_q19",
          "type": "factual_detail",
          "question_text": "What does Bruce say about the events?",
          "options": [
            {
              "key": "A",
              "text": "The 1500 metres should be on the first day."
            },
            {
              "key": "B",
              "text": "The first day is tougher than the second."
            },
            {
              "key": "C",
              "text": "The 1500 metres is different from the other events."
            },
            {
              "key": "D",
              "text": "It looks easier than it actually is."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 4,
          "clue_sentence": "All the other events demand speed or strength. With the long race, it's stamina.",
          "explanation_vi": "Bruce giải thích rằng tất cả các môn thi khác đều đòi hỏi tốc độ hoặc sức mạnh, trong khi môn chạy dài (1500m) lại đòi hỏi sức bền (stamina). Do đó, môn 1500m khác biệt so với các môn còn lại."
        },
        {
          "id": "ulis_r07_q20",
          "type": "factual_detail",
          "question_text": "What is Bruce's advice for people thinking of becoming decathletes?",
          "options": [
            {
              "key": "A",
              "text": "Get a trainer to guide you."
            },
            {
              "key": "B",
              "text": "Get up early to start training"
            },
            {
              "key": "C",
              "text": "Take up the heptathlon instead."
            },
            {
              "key": "D",
              "text": "Try to get a good time in all the events."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 5,
          "clue_sentence": "It takes a long time to master ten different events, or seven for the heptathlon, and you need expert help.",
          "explanation_vi": "Bruce khuyên rằng bạn cần có sự trợ giúp từ chuyên gia (\"expert help\"), điều này tương đương với việc tìm một huấn luyện viên để hướng dẫn (\"Get a trainer to guide you\")."
        }
      ],
      "id": "ulis_r07_p2"
    },
    {
      "title": "Passage 3: COAST TO COAST",
      "topic": "Personal Memoir & Adventure",
      "word_count": 560,
      "difficulty": "B2",
      "content_paragraphs": [
        "A 27-year-old graphic designer from Oxfordshire in England completed a record-breaking journey across Australia yesterday. It was a 5,800 kilometre odyssey - and he travelled the whole distance on a skateboard. David Cornthwaite, who started skateboarding less than two years ago, decided on his epic journey after waking up one morning and realising he hated his job. 'I thought, the only thing keeping me going is the skate to and from work. I was a bit disillusioned and I was looking for something new,' he said. 'I saw a Lonely Planet guide to Australia. There was a map on the back. Perth was on one side and Brisbane on the other and I thought, \"that'll do\".'",
        "He decided to prepare by skateboarding from John O'Groats to Lands End: the two points furthest apart on the British mainland. That 1.442 kilometre trek, which he finished in June, took just over a month, during which an infected blister swelled to the 'size of a tennis ball'.",
        "Crossing Australia on a skateboard brought unique challenges. The wind caused by huge road trains, the articulated lorries that thunder across the Outback, was so powerful that he was sometimes blown off his board. Multiple blisters and aching ankles, toes and feet, have kept him in almost constant pain for the last six weeks. 'I feel like an old man. I'm not sure that anyone has ever had this many blisters,' he said. Temperatures of 40°C and above mean that he has used more than a dozen tubes of factor 30 sunscreen. 'There have been moments where I thought \"this is ridiculous, I have to rest\", but I never contemplated giving up.' He has worn through 13 pair of shoes and has an over-developed right calf muscle which he compares to 'a giant chicken fillet'.",
        "Skating an average of 50 kilometres a day and hitting speeds of up to 50kph on downhill runs, he left Perth, Western Australia, and skated across the fearsome Nullarbor Plain into South Australia. After reaching Adelaide he made his way to Melbourne and from there to Sydney. A support team of seven people trailed him all the way in a four-wheel drive vehicle, which included camping equipment for night stops. The journey has smashed the previous record for a long-distance skateboard, set by an American, Jack Smith, who covered 4,800 kilometres across the US in 2003.",
        "David Cornthwaite was less than three kilometres from the end of his epic journey when he hit a hole and was so thrown off his skateboard, suffering cuts and bruises to his shoulders, knees, hips and elbows. 'I was only going at 40km at the time, so although it wasn't pretty, it could have been a lot worse,' he said.",
        "In the short term, he hopes to spend the next few days surfing on the Gold Coast, south of Brisbane, to build up some much-needed upper body strength. 'I've got huge legs but a skinny body - it's a bit ridiculous. I need to give my body a chance to warm down and surfing sounds ideal. For the time being I'm hanging up my skateboard.' In the longer term, he plans to give motivational speeches and write a book. Another long-distance journey is also on the cards. 'I'm certainly not going back to the day job,' he said."
      ],
      "questions": [
        {
          "id": "ulis_r07_q21",
          "type": "factual_detail",
          "question_text": "Why did David Cornthwaite decide to skateboard across Australia?",
          "options": [
            {
              "key": "A",
              "text": "He was an experienced skateboarder"
            },
            {
              "key": "B",
              "text": "He wanted to break a world record"
            },
            {
              "key": "C",
              "text": "He was bored with his life and wanted to try something different"
            },
            {
              "key": "D",
              "text": "Somebody gave him a guidebook about Australia"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 0,
          "clue_sentence": "David Cornthwaite, who started skateboarding less than two years ago, decided on his epic journey after waking up one morning and realising he hated his job.",
          "explanation_vi": "David quyết định thực hiện hành trình này sau khi nhận ra mình ghét công việc hiện tại và cảm thấy vỡ mộng, muốn tìm kiếm một điều gì đó mới mẻ ('realising he hated his job... looking for something new'). Điều này tương đương với việc anh chán nản với cuộc sống hiện tại và muốn thử điều gì đó khác biệt."
        },
        {
          "id": "ulis_r07_q22",
          "type": "vocab_in_context",
          "question_text": "The word \"disillusioned\" in line 5 can be best replaced by ...............",
          "options": [
            {
              "key": "A",
              "text": "disappointed"
            },
            {
              "key": "B",
              "text": "embarrassed"
            },
            {
              "key": "C",
              "text": "fascinated"
            },
            {
              "key": "D",
              "text": "delighted"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "I was a bit disillusioned and I was looking for something new,' he said.",
          "explanation_vi": "Từ 'disillusioned' có nghĩa là vỡ mộng, thất vọng về một thực tế nào đó (ở đây là công việc của anh ấy). Từ có nghĩa gần nhất là 'disappointed' (thất vọng)."
        },
        {
          "id": "ulis_r07_q23",
          "type": "factual_detail",
          "question_text": "His preparation in Britain was ...............",
          "options": [
            {
              "key": "A",
              "text": "successful, but painful"
            },
            {
              "key": "B",
              "text": "successful, but more time-consuming than planned"
            },
            {
              "key": "C",
              "text": "successful, but more difficult than he had realised"
            },
            {
              "key": "D",
              "text": "unsuccessful because he got injured"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 1,
          "clue_sentence": "That 1.442 kilometre trek, which he finished in June, took just over a month, during which an infected blister swelled to the 'size of a tennis ball'.",
          "explanation_vi": "Chuyến đi chuẩn bị ở Anh của anh ấy đã thành công (anh ấy đã hoàn thành nó trong hơn một tháng), nhưng nó rất đau đớn vì anh ấy bị một vết phồng rộp nhiễm trùng sưng to bằng quả bóng tennis."
        },
        {
          "id": "ulis_r07_q24",
          "type": "factual_detail",
          "question_text": "What made David fall off his skateboard several times in Australia?",
          "options": [
            {
              "key": "A",
              "text": "thunderstorms in the Outback"
            },
            {
              "key": "B",
              "text": "the trains that race across the Outback"
            },
            {
              "key": "C",
              "text": "the injuries on his feet"
            },
            {
              "key": "D",
              "text": "the wind created by huge lorries going past"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "The wind caused by huge road trains, the articulated lorries that thunder across the Outback, was so powerful that he was sometimes blown off his board.",
          "explanation_vi": "Gió tạo ra bởi những chiếc xe tải lớn (road trains / articulated lorries) chạy qua vùng Outback quá mạnh đến mức đôi khi thổi bay anh ấy khỏi ván trượt."
        },
        {
          "id": "ulis_r07_q25",
          "type": "factual_detail",
          "question_text": "At times, David felt as though he ...............",
          "options": [
            {
              "key": "A",
              "text": "needed to stop for a while."
            },
            {
              "key": "B",
              "text": "wanted to give up completely."
            },
            {
              "key": "C",
              "text": "wanted to get out of the sun."
            },
            {
              "key": "D",
              "text": "needed a new pair of shoes."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 2,
          "clue_sentence": "'There have been moments where I thought \"this is ridiculous, I have to rest\", but I never contemplated giving up.'",
          "explanation_vi": "Đôi khi David cảm thấy anh cần phải dừng lại nghỉ ngơi một lát ('I have to rest'), nhưng anh chưa bao giờ có ý định bỏ cuộc hoàn toàn."
        },
        {
          "id": "ulis_r07_q26",
          "type": "inference",
          "question_text": "During the journey, where did David sleep at night?",
          "options": [
            {
              "key": "A",
              "text": "in a four-wheel drive vehicle"
            },
            {
              "key": "B",
              "text": "in a tent"
            },
            {
              "key": "C",
              "text": "outdoors on the Nullarbor Plain"
            },
            {
              "key": "D",
              "text": "in the homes of his supporters"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 3,
          "clue_sentence": "A support team of seven people trailed him all the way in a four-wheel drive vehicle, which included camping equipment for night stops.",
          "explanation_vi": "Đoàn hỗ trợ đi theo anh mang theo thiết bị cắm trại ('camping equipment') để dừng nghỉ qua đêm, điều này ngụ ý rằng anh ngủ trong lều ('in a tent')."
        },
        {
          "id": "ulis_r07_q27",
          "type": "factual_detail",
          "question_text": "David fell off his skateboard because ...............",
          "options": [
            {
              "key": "A",
              "text": "he was going too fast his journey"
            },
            {
              "key": "B",
              "text": "he was exhausted and in pain"
            },
            {
              "key": "C",
              "text": "he didn't see a hole in the road"
            },
            {
              "key": "D",
              "text": "he was thinking about finishing his journey"
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 4,
          "clue_sentence": "David Cornthwaite was less than three kilometres from the end of his epic journey when he hit a hole and was so thrown off his skateboard, suffering cuts and bruises to his shoulders, knees, hips and elbows.",
          "explanation_vi": "David bị ngã khỏi ván trượt khi chỉ còn cách đích chưa đầy 3 km vì anh đâm phải một cái hố trên đường ('hit a hole')."
        },
        {
          "id": "ulis_r07_q28",
          "type": "factual_detail",
          "question_text": "Why does David think surfing is a good thing to do after his journey .............",
          "options": [
            {
              "key": "A",
              "text": "He can stay close to Brisbane."
            },
            {
              "key": "B",
              "text": "He's always wanted to surf on the Gold Coast."
            },
            {
              "key": "C",
              "text": "He wants to strengthen the top half of his body."
            },
            {
              "key": "D",
              "text": "He needs to keep his legs strong."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 5,
          "clue_sentence": "In the short term, he hopes to spend the next few days surfing on the Gold Coast, south of Brisbane, to build up some much-needed upper body strength.",
          "explanation_vi": "David muốn lướt sóng để tăng cường sức mạnh cho phần thân trên ('build up some much-needed upper body strength') vì chân anh đã quá to trong khi thân trên lại gầy gò."
        },
        {
          "id": "ulis_r07_q29",
          "type": "factual_detail",
          "question_text": "What does David hope to do eventually?",
          "options": [
            {
              "key": "A",
              "text": "encourage other people to feel more positive about themselves"
            },
            {
              "key": "B",
              "text": "put his skateboard away"
            },
            {
              "key": "C",
              "text": "return to work as a designer"
            },
            {
              "key": "D",
              "text": "persuade other people to make long-distance journeys"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 5,
          "clue_sentence": "In the longer term, he plans to give motivational speeches and write a book.",
          "explanation_vi": "Về lâu dài, anh dự định đi diễn thuyết truyền cảm hứng ('give motivational speeches'), mục đích của việc này là khuyến khích mọi người cảm thấy tích cực hơn về bản thân."
        },
        {
          "id": "ulis_r07_q30",
          "type": "factual_detail",
          "question_text": "According to the text, in some days, David plans to skate on .................",
          "options": [
            {
              "key": "A",
              "text": "Perth"
            },
            {
              "key": "B",
              "text": "Adelaide"
            },
            {
              "key": "C",
              "text": "Melbourne"
            },
            {
              "key": "D",
              "text": "Gold Coast"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 5,
          "clue_sentence": "In the short term, he hopes to spend the next few days surfing on the Gold Coast, south of Brisbane, to build up some much-needed upper body strength.",
          "explanation_vi": "Mặc dù câu hỏi ghi nhầm động từ thành 'skate on' (trượt ván trên), văn bản nêu rõ trong vài ngày tới anh dự định lướt sóng ở Gold Coast ('surfing on the Gold Coast'). Do đó, đáp án đúng theo khóa là D."
        }
      ],
      "id": "ulis_r07_p3"
    },
    {
      "title": "Passage 4: On Tour with the London Symphony Orchestra",
      "topic": "Music & Careers",
      "word_count": 389,
      "difficulty": "C1",
      "content_paragraphs": [
        "'Footballers and musicians are in the same business. They both do stressful jobs in front of critical audiences. The only difference is that football crowds are noisier.' So says Rod Franks. And he should know. Franks started his working life with Leeds United Football Club, neatly changed direction, started playing the trumpet instead of football, and is now principal trumpeter with the LSO (London Symphony Orchestra). Franks might have made a further observation about the similarities between orchestras and football clubs: it is playing away that presents the real challenges.",
        "London's oldest orchestra has been playing away since it was formed almost a century ago. Nowadays, the orchestra's trips abroad are kept to tours of a maximum of two and a half weeks. But since touring is clearly expensive and presents major organisational and technical problems, why bother to tour at all? Clive Gillinson, the managing director, says: 'A great international orchestra needs to work with the greatest conductors and soloists. No recording company will record a conductor or soloist if he or she is only known in one territory - they need an international reputation. So for the recording side to work, you have to visit the key markets; you need to tour.'",
        "By touring with projects or festivals, Gillinson is able to create an event, not just provide a series of concerts. It is more expensive to do, but when you leave town you are not so easily forgotten.",
        "For Sue Mallet, the orchestra's administrator, the difficulties of her job lie in getting a symphony orchestra and its instruments on stage, on time and in one piece. However well she plans each tour, and she does her planning with scientific accuracy, events sometimes take an upper hand. On one occasion a concert had been advertised for the wrong night, and on another the lorry carrying the instruments from the airport to the concert hall broke down and got stuck in snow.",
        "It is a tiring and stressful business flying around the world, and yet on balance it is one of the rewards of the job. Certain moments are unforgettable. At the end of a concert in Moscow an enthusiastic audience had brought the orchestra to its feet. As one of the musicians was about to sit down, an elderly lady in the front row pressed a piece of paper into his hand. It said, in words of simple English, what lovely music the orchestra had made."
      ],
      "questions": [
        {
          "id": "ulis_r07_q31",
          "type": "factual_detail",
          "question_text": "What do footballers and musicians have in common?",
          "options": [
            {
              "key": "A",
              "text": "Their work abroad earns a lot of praise."
            },
            {
              "key": "B",
              "text": "They receive too much unfair criticism."
            },
            {
              "key": "C",
              "text": "They enjoy extremely noisy audiences."
            },
            {
              "key": "D",
              "text": "They experience tension in their work."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 0,
          "clue_sentence": "They both do stressful jobs in front of critical audiences.",
          "explanation_vi": "Đoạn 1 nêu rõ: 'They both do stressful jobs in front of critical audiences' (Cả hai đều làm những công việc căng thẳng trước những khán giả hay phê bình). 'Stressful jobs' tương đương với 'experience tension in their work' (trải qua sự căng thẳng trong công việc).",
          "paraphrase_analysis": {
            "question_phrase": "experience tension in their work",
            "passage_phrase": "do stressful jobs",
            "explanation": "Cụm từ 'stressful jobs' (công việc căng thẳng) được diễn đạt lại thành 'experience tension in their work' (trải qua sự căng thẳng/áp lực trong công việc)."
          }
        },
        {
          "id": "ulis_r07_q32",
          "type": "factual_detail",
          "question_text": "What are we told about Rod Franks?",
          "options": [
            {
              "key": "A",
              "text": "He used to be the director of a football club."
            },
            {
              "key": "B",
              "text": "He switched from one career to another."
            },
            {
              "key": "C",
              "text": "He used to be a professional trumpeter."
            },
            {
              "key": "D",
              "text": "He disliked his original choice of career."
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "Franks started his working life with Leeds United Football Club, neatly changed direction, started playing the trumpet instead of football, and is now principal trumpeter with the LSO (London Symphony Orchestra).",
          "explanation_vi": "Đoạn 1 cho biết Rod Franks bắt đầu sự nghiệp với câu lạc bộ bóng đá Leeds United, sau đó đổi hướng ('neatly changed direction') sang chơi kèn trumpet thay vì bóng đá. Điều này có nghĩa là ông đã chuyển từ nghề này sang nghề khác ('switched from one career to another').",
          "paraphrase_analysis": {
            "question_phrase": "switched from one career to another",
            "passage_phrase": "neatly changed direction, started playing the trumpet instead of football",
            "explanation": "Việc thay đổi hướng đi từ bóng đá sang chơi kèn trumpet được tóm tắt bằng cụm từ chuyển đổi nghề nghiệp."
          }
        },
        {
          "id": "ulis_r07_q33",
          "type": "factual_detail",
          "question_text": "Before joining London Symphony Orchestra, Rod Franks worked for ....................",
          "options": [
            {
              "key": "A",
              "text": "a football club"
            },
            {
              "key": "B",
              "text": "a travel agency"
            },
            {
              "key": "C",
              "text": "a consulting firm"
            },
            {
              "key": "D",
              "text": "an event organizing firm"
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 0,
          "clue_sentence": "Franks started his working life with Leeds United Football Club, neatly changed direction, started playing the trumpet instead of football, and is now principal trumpeter with the LSO (London Symphony Orchestra).",
          "explanation_vi": "Theo đoạn 1, trước khi gia nhập LSO, Rod Franks bắt đầu cuộc đời làm việc của mình với Câu lạc bộ bóng đá Leeds United ('Leeds United Football Club')."
        },
        {
          "id": "ulis_r07_q34",
          "type": "vocab_in_context",
          "question_text": "The word \"principal\" in line 4 can be best replaced by ....................",
          "options": [
            {
              "key": "A",
              "text": "original"
            },
            {
              "key": "B",
              "text": "main"
            },
            {
              "key": "C",
              "text": "prime"
            },
            {
              "key": "D",
              "text": "initial"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 0,
          "clue_sentence": "Franks started his working life with Leeds United Football Club, neatly changed direction, started playing the trumpet instead of football, and is now principal trumpeter with the LSO (London Symphony Orchestra).",
          "explanation_vi": "Trong ngữ cảnh này, 'principal trumpeter' nghĩa là người chơi kèn trumpet chính/chủ chốt của dàn nhạc. Do đó, từ 'principal' đồng nghĩa với 'main' (chính)."
        },
        {
          "id": "ulis_r07_q35",
          "type": "factual_detail",
          "question_text": "The LSO began playing abroad ....................",
          "options": [
            {
              "key": "A",
              "text": "only fairly recently."
            },
            {
              "key": "B",
              "text": "over a hundred years ago."
            },
            {
              "key": "C",
              "text": "when it was first set up."
            },
            {
              "key": "D",
              "text": "when it needed money."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "London's oldest orchestra has been playing away since it was formed almost a century ago.",
          "explanation_vi": "Đoạn 2 cho biết dàn nhạc đã biểu diễn ở nước ngoài ('playing away') kể từ khi nó được thành lập ('since it was formed') gần một thế kỷ trước. 'Since it was formed' tương đương với 'when it was first set up'.",
          "paraphrase_analysis": {
            "question_phrase": "when it was first set up",
            "passage_phrase": "since it was formed",
            "explanation": "Cụm từ 'since it was formed' (kể từ khi được thành lập) đồng nghĩa với 'when it was first set up'."
          }
        },
        {
          "id": "ulis_r07_q36",
          "type": "factual_detail",
          "question_text": "Orchestras have to travel abroad ....................",
          "options": [
            {
              "key": "A",
              "text": "to play with foreign conductors."
            },
            {
              "key": "B",
              "text": "to record with foreign companies."
            },
            {
              "key": "C",
              "text": "to make themselves better known."
            },
            {
              "key": "D",
              "text": "to record with new solo players."
            }
          ],
          "correct_key": "C",
          "clue_paragraph_index": 1,
          "clue_sentence": "No recording company will record a conductor or soloist if he or she is only known in one territory - they need an international reputation.",
          "explanation_vi": "Đoạn 2 giải thích rằng các hãng thu âm sẽ không thu âm một nhạc trưởng hay nghệ sĩ độc tấu nếu họ chỉ được biết đến ở một vùng lãnh thổ - họ cần có danh tiếng quốc tế ('international reputation'). Do đó, dàn nhạc phải đi lưu diễn nước ngoài để giúp bản thân được biết đến nhiều hơn ('to make themselves better known').",
          "paraphrase_analysis": {
            "question_phrase": "to make themselves better known",
            "passage_phrase": "they need an international reputation",
            "explanation": "Việc có được danh tiếng quốc tế đồng nghĩa với việc làm cho bản thân được biết đến rộng rãi hơn ở nhiều nơi."
          }
        },
        {
          "id": "ulis_r07_q37",
          "type": "inference",
          "question_text": "What does 'It' in line 15 refer to?",
          "options": [
            {
              "key": "A",
              "text": "organising a number of recordings"
            },
            {
              "key": "B",
              "text": "visiting the most important markets"
            },
            {
              "key": "C",
              "text": "the expense of touring in a country"
            },
            {
              "key": "D",
              "text": "providing more than just concerts"
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 2,
          "clue_sentence": "By touring with projects or festivals, Gillinson is able to create an event, not just provide a series of concerts.",
          "explanation_vi": "Ở đoạn 3, câu trước nói về việc tạo ra một sự kiện chứ không chỉ cung cấp một chuỗi các buổi hòa nhạc ('create an event, not just provide a series of concerts'). Câu tiếp theo bắt đầu bằng 'It is more expensive to do...' (Làm điều đó tốn kém hơn). Từ 'It' ở đây thay thế cho hành động tạo ra một sự kiện lớn hơn là chỉ biểu diễn hòa nhạc thông thường, tương đương với 'providing more than just concerts'.",
          "paraphrase_analysis": {
            "question_phrase": "providing more than just concerts",
            "passage_phrase": "create an event, not just provide a series of concerts",
            "explanation": "Cụm từ 'create an event, not just provide...' được khái quát hóa thành 'providing more than just concerts'."
          }
        },
        {
          "id": "ulis_r07_q38",
          "type": "factual_detail",
          "question_text": "Sue Mallet's arrangements for the LSO can be ....................",
          "options": [
            {
              "key": "A",
              "text": "affected by external circumstances."
            },
            {
              "key": "B",
              "text": "made difficult by awkward players."
            },
            {
              "key": "C",
              "text": "spoilt by overlooking tiny details."
            },
            {
              "key": "D",
              "text": "spoilt by very careless planning."
            }
          ],
          "correct_key": "A",
          "clue_paragraph_index": 3,
          "clue_sentence": "However well she plans each tour, and she does her planning with scientific accuracy, events sometimes take an upper hand.",
          "explanation_vi": "Đoạn 4 cho biết dù cô ấy lên kế hoạch tốt đến đâu, các sự kiện khách quan đôi khi vẫn chiếm ưu thế ('events sometimes take an upper hand'), ví dụ như quảng cáo sai ngày hay xe chở nhạc cụ bị hỏng trong tuyết. Điều này có nghĩa là sự sắp xếp của cô ấy có thể bị ảnh hưởng bởi các hoàn cảnh bên ngoài ('affected by external circumstances').",
          "paraphrase_analysis": {
            "question_phrase": "affected by external circumstances",
            "passage_phrase": "events sometimes take an upper hand",
            "explanation": "Các sự kiện bất ngờ xảy ra ngoài tầm kiểm soát (như thời tiết, sự cố xe cộ) chính là các hoàn cảnh bên ngoài tác động lên kế hoạch."
          }
        },
        {
          "id": "ulis_r07_q39",
          "type": "vocab_in_context",
          "question_text": "What does the phrase 'with scientific accuracy' (line 18) suggest about Sue Mallet's planning?",
          "options": [
            {
              "key": "A",
              "text": "It's very neat and tidy."
            },
            {
              "key": "B",
              "text": "Her figures are correct."
            },
            {
              "key": "C",
              "text": "She used to be a scientist."
            },
            {
              "key": "D",
              "text": "The details are excellent."
            }
          ],
          "correct_key": "D",
          "clue_paragraph_index": 3,
          "clue_sentence": "However well she plans each tour, and she does her planning with scientific accuracy, events sometimes take an upper hand.",
          "explanation_vi": "Cụm từ 'with scientific accuracy' (với độ chính xác khoa học) ám chỉ việc lập kế hoạch cực kỳ chi tiết, tỉ mỉ và hoàn hảo đến từng chi tiết nhỏ nhất ('The details are excellent')."
        },
        {
          "id": "ulis_r07_q40",
          "type": "factual_detail",
          "question_text": "According to the writer, what made a certain moment 'unforgettable' (line 23)?",
          "options": [
            {
              "key": "A",
              "text": "the fact that the orchestra stood up"
            },
            {
              "key": "B",
              "text": "an individual's appreciation"
            },
            {
              "key": "C",
              "text": "the enthusiastic applause"
            },
            {
              "key": "D",
              "text": "the fact that a message was in English"
            }
          ],
          "correct_key": "B",
          "clue_paragraph_index": 4,
          "clue_sentence": "As one of the musicians was about to sit down, an elderly lady in the front row pressed a piece of paper into his hand.",
          "explanation_vi": "Đoạn cuối kể về một khoảnh khắc khó quên khi một cụ bà lớn tuổi ở hàng ghế đầu đưa cho một nhạc sĩ một mảnh giấy viết những lời tiếng Anh giản dị khen ngợi âm nhạc của họ. Đây chính là sự trân trọng, cảm kích từ một cá nhân cụ thể ('an individual's appreciation').",
          "paraphrase_analysis": {
            "question_phrase": "an individual's appreciation",
            "passage_phrase": "an elderly lady in the front row pressed a piece of paper into his hand. It said, in words of simple English, what lovely music the orchestra had made",
            "explanation": "Hành động của cụ bà viết lời khen ngợi gửi cho nhạc sĩ là biểu hiện của sự trân trọng từ một cá nhân."
          }
        }
      ],
      "id": "ulis_r07_p4"
    }
  ]
};
