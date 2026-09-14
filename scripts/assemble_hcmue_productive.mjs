import fs from 'fs';
import path from 'path';

const writingDir = 'src/features/writing/data/drills/hcmue';
const speakingDir = 'src/features/speaking/data/drills/hcmue';

fs.mkdirSync(writingDir, { recursive: true });
fs.mkdirSync(speakingDir, { recursive: true });

// Data definitions for the 5 authentic HCMUE Writing and Speaking Tests
// Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, ISBN 978-604-947-764-5)

const HCMUE_WRITING_DATA = [
  {
    test_number: 1,
    task1: {
      id: 'hcmue_writing_test_01_t1',
      task_type: 'task1_letter',
      title: 'Letter to a friend about living and studying in Manchester',
      time_allowed_minutes: 20,
      min_words: 120,
      prompt_text: `You live in Ho Chi Minh City. You moved to Manchester to study English three months ago. You have just received an email from a friend, Sara from London. Read part of her email below.

...
What's Manchester like? I bet the weather's not too good!
Have you still got that part-time job in the fast-food restaurant? It must be a good way of speaking to new people and making friends.
What about the family you're staying with? Do you go out much in the evening? I hope the English classes are going well.
Sara

Write a reply to Sara. In your email, you have to describe Manchester and the weather there, tell her about your part-time job, the family you are staying with, your activities in the evening, and your English classes.
You should write at least 120 words.`,
      context_info: 'Informal Letter / Personal Email',
      sample_response: {
        band: 'B2',
        text: `Dear Sara,

Manchester is a really interesting city. There are a lot of shops here. The people are friendly and the night life is fantastic. It's a pity it's always raining!

As you know, I'm working in a fast-food restaurant. I go to work from 5 to 9 in the evening, so I don't go out with my friends very often. I go straight home after work to review the lessons and get ready for the class the next day. However, I love my job because I have lots of chances to practice speaking English with the customers. I believe that I can improve my spoken English so much. However, I don't like my boss because he's too strict.

I was living with an English family, but I didn't get on very well with them. Therefore, now I'm sharing a flat with 4 French students. We have a lot of fun together, but I'm not speaking much English at home because we always use French.

I'm going to English classes every morning in a language school next to my flat. I can learn a lot here and make great progress.

Well, it's time for work now. Looking forward to hearing from you.

Best wishes,`,
        analysis_vi: 'Bài viết đạt chuẩn B2 nhờ cách diễn đạt tự nhiên, bố cục thư thân mật chuẩn mực (Dear Sara / Best wishes), hoàn thành đầy đủ 4 ý theo yêu cầu (miêu tả thành phố & thời tiết, công việc bán thời gian, điều kiện ăn ở và tiến độ học tiếng Anh).',
      },
    },
    task2: {
      id: 'hcmue_writing_test_01_t2',
      task_type: 'task2_essay',
      title: 'Heavy taxes on private cars to improve public transportation',
      time_allowed_minutes: 40,
      min_words: 250,
      prompt_text: `In order to solve traffic problems, Vietnamese government should tax private car owners heavily and use the money to improve public transportation.
What are the advantages and disadvantages of such a solution?
Give reasons for your answer and include any relevant examples from your own experience or knowledge.
You should write at least 250 words.`,
      context_info: 'Advantages and Disadvantages Essay',
      sample_response: {
        band: 'C1',
        text: `Traffic congestion in many big cities of Viet Nam is getting more and more serious. Many people believe that one possible solution to this problem is to impose heavy taxes on car drivers and spend this money on making public transport better. However, there are both pros and cons to decide to do this. This essay will discuss the benefits and drawbacks of such a measure and draw a conclusion.

Let's begin by looking at the positive aspects of such a solution. One of the main advantages would be that the heavy taxes would discourage car owners from using their cars because it would become very expensive to drive. This would mean that they would begin to make use of public transport instead to travel here and there, thus reducing road accidents and pollution as well. Another good point would be that more people would use public transport if it were improved. In fact, public transport in major cities like Hanoi and Saigon is very poor. For example, we often see old and dirty buses and trains that no one wants to take a ride on. High taxes would create enough money to make the necessary changes.

On the other hand, there are some negative points of such a measure. First, this would be a heavy burden on car drivers. At present, taxes on private cars are already high for a lot of people, and so further taxes would only mean less money at the end of the month for most people who may have no choice but to drive every day. Another problem is that this type of tax would likely be set at a fixed amount for all who use car as a means of transport. This would mean that it would hit those with less money harder, while the rich could afford it. It is, therefore, not a fair tax.

In conclusion, there are two sides to everything and applying this solution is not an exception. However, personally I think it's time for us to do something to tackle the problem of traffic jams in big cities of Viet Nam. This measure is, therefore, obviously worth considering to improve the current situation.`,
        analysis_vi: 'Bài luận dạng Lợi ích & Bất lợi (Advantages & Disadvantages) đạt chuẩn C1 với cấu trúc 4 đoạn cân xứng, lập luận sắc sảo về giảm ùn tắc và phát triển hạ tầng đối chiếu với gánh nặng tài chính lên người thu nhập thấp.',
      },
    },
  },
  {
    test_number: 2,
    task1: {
      id: 'hcmue_writing_test_02_t1',
      task_type: 'task1_letter',
      title: 'Letter to a friend after a holiday trip to Ha Long Bay',
      time_allowed_minutes: 20,
      min_words: 120,
      prompt_text: `You live in Ho Chi Minh city. You just took a trip to Ha Long Bay with an English friend named Daisy. You received an email from her after she returned to London. Read part of her email below.

...
I hope you like the photos we took in Ha Long Bay. Did you get home all right?
I'm back at work now, but it's a bit difficult to start again. I wish we were still on holiday.
Why don't we plan another trip this spring if you've got time and money? Any suggestions where we could go?
...
Daisy

Write a reply to Daisy. In your email, you have to tell her that you really like the photos and the time you got together, describe a problem you had at the airport to her and suggest the time and place for the next trip.
You should write at least 120 words.`,
      context_info: 'Informal Letter / Holiday Follow-up',
      sample_response: {
        band: 'B2',
        text: `Dear Daisy,

It's great to hear from you again. I hope everything is going well in London.

Thanks for sending me the photos. I really like them because they remind me of the great time we spent with each other in Ha Long Bay. I believe that you enjoyed the breath-taking scenery here so much.

As you probably know, I had a bit of trouble at Tân Sơn Nhất airport because of the accidental power-cut, but I got home safely in the end.

I'm afraid I won't be able to get away this spring as I have to visit my grandparents in Central Vietnam then. What about a trip to Hà Nội, the capital City of Viet Nam next summer? I will have graduated from university by next June, and I've got a whole month to travel before starting my first job.

Well that's all for now, Daisy. Drop me a line when you have time and let me know what you think about my plan.

All the best,`,
        analysis_vi: 'Văn phong thư thân mật mạch lạc, xử lý trọn vẹn 3 yêu cầu đề bài: bày tỏ cảm xúc về bức ảnh, kể sự cố cúp điện tại sân bay Tân Sơn Nhất, và đề xuất chuyến du lịch Hà Nội vào mùa hè tới.',
      },
    },
    task2: {
      id: 'hcmue_writing_test_02_t2',
      task_type: 'task2_essay',
      title: 'Problems and solutions when workforce is replaced by machinery',
      time_allowed_minutes: 40,
      min_words: 250,
      prompt_text: `Recent advances in technology leads the fact that human workforce is gradually replaced with machinery.
What are some problems caused by this trend, and how could they be dealt with?
Give reasons for your answer and include any relevant examples from your own experience or knowledge.
You should write at least 250 words.`,
      context_info: 'Problems and Solutions Essay',
      sample_response: {
        band: 'C1',
        text: `Technological advances in the past few decades help to gradually replace human workforce with the-state-of-the-art machines in a wide range of industries. Although people can benefit a lot from the replacement, personally I think there are some drawbacks of this ongoing trend. This essay will examine the negative effects of the development of technology on human-beings and then propose some solutions.

One of the biggest problems is that there is less social interaction among factory workers because they always have to work with machines. They just focus on the machine they operate instead of communicating with their co-workers. The solution is for the board of directors to organize social activities such as team building, going for a picnic at an amusement park, having staff parties on national holidays and so on. Thanks to these activities, workers have a chance to spend time together talking and sharing their work experience as well as life experience with one another.

Another issue is that this trend has made workers lazier because they tend to heavily depend on machines. In some cases, they can, but they are unwilling, and even refuse to fulfill their task by hand when a technical problems like a breakdown or power cut occurs. To tackle this problem, the management, along with the trainer should raise the workers' sense of responsibility to make efforts to do their duty if possible without assistance of machinery.

Last but not least, this replacement may increase the unemployment rate. As machines can perform faster and more efficiently, the need for manpower will decrease dramatically. There might be only vacancies for highly-qualified technicians who can operate modern machines. As a result, unskilled manual workers may run the risk of being jobless. Dealing with this issue involves the government, local authority and vocational schools' launching some specific programs or training courses in which manual workers are trained to control fashionable machines. Moreover, they should be encouraged to update themselves with the development of today's science and technology so as not to be left behind.

All things considered, no one can deny that there are two sides of the same coin; we can, therefore, see both the pros and cons of substituting machinery for manpower. However, the government, the factory management, and the vocational school can take the above-mentioned measures to make a great contribution to minimizing its downsides.`,
        analysis_vi: 'Bài viết dạng Vấn đề & Giải pháp (Problems & Solutions) chuẩn C1, phân tích logic 3 vấn đề nổi cộm (suy giảm giao tiếp xã hội, sự phụ thuộc ỷ lại, và nguy cơ thất nghiệp lao động phổ thông) kèm giải pháp đào tạo thực tế.',
      },
    },
  },
  {
    test_number: 3,
    task1: {
      id: 'hcmue_writing_test_03_t1',
      task_type: 'task1_letter',
      title: 'Letter to Clare asking about her new home and settling down',
      time_allowed_minutes: 20,
      min_words: 120,
      prompt_text: `Your English-speaking friend, Clare, has recently gone to live in another city. Read part of her email below:

...
Well, I've now been here for two weeks and I'm beginning to get used to my new life here. I've certainly been very busy since I moved here - there have been all sorts of things happening!
I'm quite happy in my new home although lots of my belongings are still in bags and boxes! I'm hoping to find time to unpack everything soon.
I'm glad I decided to come and live here - it's a really good city. But there are some things and people that I miss of course!
It would be really good if you could come and stay with me here, perhaps in a couple of months when I really settle down. What do you think?
Keep in touch.
Clare.

Write a reply to Clare. In your email, you have to ask her what is happening to her, tell her to describe her new home, ask her to tell you what and who she misses after she moves there and suggest the time when you can visit her.
You should write at least 120 words.`,
      context_info: 'Informal Letter / Friendship Catch-up',
      sample_response: {
        band: 'B2',
        text: `Dear Clare,

I'm very happy to get your email yesterday and know that you are getting used to your new life. Why don't you tell me why have you been so busy and what is going on there?

How many bedrooms are there in your new house? Is there a garden in front? What do you like most about the house? Remember to send me some photos of it. I love to see them.

You know, missing some things and people here after you have moved to a new place is a matter-of-course. However, I wonder who and what you miss. Do you miss me and the time we got together?

I can't wait to visit you there. What about next September? I have a week off then, so I can arrange to go and stay with you for a few days.

Hope to hear from you soon.

All the best,`,
        analysis_vi: 'Bức thư trả lời bạn thân khéo léo, tự nhiên, đặt câu hỏi quan tâm về ngôi nhà mới, những kỷ niệm thân quen và đề xuất mốc thời gian cụ thể (tháng 9) cho chuyến thăm bạn.',
      },
    },
    task2: {
      id: 'hcmue_writing_test_03_t2',
      task_type: 'task2_essay',
      title: 'Fast food: convenience for busy lives versus serious health hazards',
      time_allowed_minutes: 40,
      min_words: 250,
      prompt_text: `Some people argue that we have to think twice before deciding to eat fast food because of some health problems it may cause, while others believe that this kind of food is a good choice for those with a very busy life.
Which opinion do you agree with?
Use specific reasons and examples to support your answer.
You should write at least 250 words.`,
      context_info: 'Opinion / Discussion Essay',
      sample_response: {
        band: 'B2',
        text: `In most parts of the world, including Vietnam, the popularity of fast food is growing at a considerable rate. Some people hold the view that fast food poses several health hazards to consumers. However, personally, I strongly believe that eating fast food is a great idea for busy people for two following reasons.

To begin with, most people, especially young adults consider fast food as a convenient source of food. In fact, fast food can be prepared and served within a very short time. One day, if you get stuck in a traffic jam on the way home from work and don't have enough time to cook dinner, just take the whole family straight to a KFC restaurant to eat some fried chicken with french fries. Obviously, fast food industry helps to save human time.

Another reason is that eaters can enjoy the pleasant atmosphere in an air-conditioned fast food restaurant which is beautifully decorated with colorful lights, nice paintings, and modern multi-shaped tables and chairs. It can't be denied that you will definitely feel relaxed and comfortable after hard work and enjoy the good taste of hamburgers, hot dogs, pizzas, and so on here.

Turning to the other side of the argument, consuming too much fast food is the cause of obesity, diabetes, high blood pressure, and heart disease. In fact, this kind of food is rich in fat, salt, artificial substances and oils, all of which increase the risk of those health problems. Some recent surveys show that the number of obese children is alarmingly on the increase.

All in all, I'm in favor of the idea that going to a fast food restaurant for meals is the best choice when you are as busy as a bee. However, you should limit the amount of oily and salty fast food consumed due to lots of warnings of health threat suggested by doctors and nutritionists.`,
        analysis_vi: 'Bài luận cân đối giữa tính tiện lợi tiết kiệm thời gian của thức ăn nhanh cho cuộc sống hiện đại và những cảnh báo y tế về béo phì, bệnh tim mạch.',
      },
    },
  },
  {
    test_number: 4,
    task1: {
      id: 'hcmue_writing_test_04_t1',
      task_type: 'task1_letter',
      title: 'Letter to Mary reuniting high school memories from Oxford',
      time_allowed_minutes: 20,
      min_words: 120,
      prompt_text: `Your English-speaking friend, Mary, whom you haven't met for a long time, sent you an email. Read part of her email below:

...
Do you remember me? We met when you visited my high school in Oxford during your summer trip to England 3 years ago. We haven't heard from each other for a long time, right?
Anyway, how are you? What have you been doing? You always wanted to be a teacher!
Here some of my news. I'm studying Laws at Oxford University. I think I have changed a lot over the years. I don't like thrillers any more. I prefer history books now. Do you remember Pete, the tall thin guy with glasses? He's on the same course as me. We are best friends now!
Well, I must finish now because I have an exam tomorrow. It would be really good if we could get together again.
Write back soon and tell me all your news.
Mary.

Write a reply to Mary. In your email, you have to tell her you still remember her and the time you visited her high school, tell her all your news, and ask her to send your regards to Pete.
You should write at least 120 words.`,
      context_info: 'Informal Letter / Reconnecting with Friends',
      sample_response: {
        band: 'B2',
        text: `Hi Mary,

I'm very happy to hear from you again. It's been such a long time. Of course, I still remember you and the time I visited your high school in Oxford. I had lots of nice memories with you and your classmates that summer.

I'm studying English at Ho Chi Minh City University of Education. I will be a teacher of English after graduation. I also work part-time as a tutor. I love to teach English to children because they look so adorable and seem eager to study another language.

You know, it's great to tell you that I will have a chance to return to Oxford this summer and definitely see you again there. As the best student of the course I'm taking at university, I have been awarded a two-week trip to Oxford this June. Just think and tell me what we are doing then.

Please send my best regards to Pete.

Keep in touch.`,
        analysis_vi: 'Bức thư kết nối ký ức đẹp ở trường cấp 3 Oxford, cập nhật việc học sư phạm tại ĐH Sư phạm TP.HCM, công việc gia sư và bất ngờ về chuyến đi học bổng trở lại Oxford vào tháng 6.',
      },
    },
    task2: {
      id: 'hcmue_writing_test_04_t2',
      task_type: 'task2_essay',
      title: 'Reasons and solutions for rising youth crime in major cities',
      time_allowed_minutes: 40,
      min_words: 250,
      prompt_text: `Levels of youth crime are increasing rapidly in major cities in Viet Nam.
What are the reasons for this? Suggest some solutions.
Give reasons for your answer and include any relevant examples from your own experience or knowledge.
You should write at least 250 words.`,
      context_info: 'Causes and Solutions Essay',
      sample_response: {
        band: 'C1',
        text: `Over the last few years, many cities throughout the country have seen an alarming increase in the levels of youth crime. This has become a question that not only the authorities but also parents are concerned about. In this essay, I would like to analyze some reasons for this and suggest some possible solutions.

The causes of this issue lies in the way the youth are brought up by their parents and the increasing level of poverty in cities. The first reason is connected with the family. In order for a child to grow up in a balanced way, it is very important that he or she must be nurtured by his or her parents with love, care, and support. However, these days, it is often the case that children are neglected due to the fact that many parents in cities now are too busy with their work to give their children good advice and support in time. Another factor to consider is the increasing levels of poverty around the world. We have seen with globalization the rich get far richer and the poor get much poorer, and this inevitably means that those who were unfortunately born into a poor family and are reluctant to work hard, but want to live in comfort turn to robbing and stealing. Reality shows that they even dare to kill others to grab what they desire.

To solve the problem, we should take several measures on the part of families as well as society. First, parents must spend more time with their children to control what they do and how they behave so as to offer them timely guidance and prevent them from making a mistake and then committing a crime. Second, those who commit a crime must be severely punished; for example, a teenage murderer can be sentenced to death. It is also essential that the authorities send young criminals to a rehabilitation center, where they have a chance to learn how to behave well and get some vocational training so that they can find a job to support themselves later.

In conclusion, several factors have led to a dramatic increase in youth crime at present, but feasible solutions are available to tackle this problem. I'm convinced that taking the above-mentioned measures can help to reduce the level of youth crime substantially in big cities of Viet Nam.`,
        analysis_vi: 'Bài luận dạng Nguyên nhân & Giải pháp (Causes & Solutions) trình độ C1, phân tích sâu hai gốc rễ (thiếu giáo dục gia đình và phân hóa giàu nghèo), kèm giải pháp răn đe và phục hồi nhân phẩm qua trường giáo dưỡng.',
      },
    },
  },
  {
    test_number: 5,
    task1: {
      id: 'hcmue_writing_test_05_t1',
      task_type: 'task1_letter',
      title: 'Letter to Natalie giving directions and weather advice for Viet Nam trip',
      time_allowed_minutes: 20,
      min_words: 120,
      prompt_text: `Your English-speaking friend, Natalie sent you an email. Read part of her email below.

...
Thanks for inviting me to stay with you when I visit your country next month.
I'm not sure how to get to your apartment from the airport. Could you write back giving me some simple directions? What's the cheapest means of transport?
What will the weather be like when I get there? I'll need to know which clothes to pack.
Hope to get your early reply.
Natalie

Write a reply to Natalie. In your email, you have to express your excitement of her trip to your country, tell her how to get to your apartment from the airport and what the cheapest means of transport is, and tell her about the weather next month.
You should write at least 120 words.`,
      context_info: 'Informal Letter / Visitor Directions & Travel Advice',
      sample_response: {
        band: 'B2',
        text: `Hi Natalie,

How's it going? I hope you're well and looking forward to your trip to Viet Nam. It'll be great to see you again. I'll be on holiday when you come, so I've got plenty of time to spend with you. We'll definitely be able to visit a few places together.

The cheapest and easiest way to get to my apartment from the airport is on the bus. The Number 30 Bus will drop you off at Bến Thành Market. I'll be waiting for you at the bus stop when you get there, so you won't get lost!

It will still be quite hot here next month, so bring some summer clothes. It might rain as well, but you can borrow my umbrella!

Well, that's all for now, Natalie. When you have a moment, drop me a line and confirm your flight and arrival times. I'm sure you'll have a great time here.

See you soon,`,
        analysis_vi: 'Bức thư đón tiếp bạn chu đáo, hướng dẫn chi tiết tuyến xe buýt số 30 giá rẻ về chợ Bến Thành, tư vấn thời tiết nhiệt đới và nhắc nhở trang phục mùa hè phù hợp.',
      },
    },
    task2: {
      id: 'hcmue_writing_test_05_t2',
      task_type: 'task2_essay',
      title: 'Positive and negative impacts of computer games on children',
      time_allowed_minutes: 40,
      min_words: 250,
      prompt_text: `Nowadays many people have access to computers on a wide basis and a large number of children play computer games. What are the positive and negative impacts of playing computer games and what can be done to minimize the bad effects?
Give reasons for your answer and include any relevant examples from your own experience or knowledge.
You should write at least 250 words.`,
      context_info: 'Two-part / Mixed Essay (Impacts & Solutions)',
      sample_response: {
        band: 'C1',
        text: `Access to computers has become more and more popular over recent decades, and the number of children playing games on computers has increased considerably too. While there is no doubt that children can get some benefits from this leisure activity, this trend is a big concern to all parents due to plenty of serious downsides it may cause. This essay will consider the positive and negative impacts of playing computer games and discuss ways to mitigate the potential bad effects.

With regards to the advantages, playing computer games can develop children's cognitive skills. Many popular games require abstract and high level thinking skills in order to win. For instance, children need to follow instructions, solve complex problems and use logic in many of the games that are currently popular. Such experience will be beneficial to a child's development into an adult.

Turning to the other side of the argument, most computer games played by children contain a great deal of violence. The problem is that in many of the games children are rewarded for being more violent, and this violence is repeated again and again. For instance, many games involve children helping their character to kill, kick, stab and shoot. This may lead to increasing aggressive feelings, thoughts, and behaviors. Also, if children are absorbed in computer games, they may distract themselves from their studies. As a result, they inevitably perform worse and worse at school.

In order to minimize these negative impacts, parents need to take certain steps. The way forward might be to choose a suitable computer games for children and ensure that they are not allowed to have access to too many violent games. Parents can also set limits on the length of time games are played. For example, their children only spend no more than thirty minutes a day playing computer games.

To sum up, there are both pros and cons to everything, and playing computer games is not an exception. From my perspective, the negatives of this activity obviously outweigh its positives. However, if parents take adequate precautions, the above-mentioned drawbacks can be avoided.`,
        analysis_vi: 'Bài luận đa chiều C1 về trò chơi điện tử: nêu bật lợi ích rèn luyện nhận thức tư duy logic, phản ánh nguy cơ bạo lực và sa sút học tập, đồng thời đưa ra giải pháp định hướng và giới hạn 30 phút mỗi ngày.',
      },
    },
  },
];

const HCMUE_SPEAKING_DATA = [
  {
    test_number: 1,
    part1: {
      title: 'Social Interaction',
      duration_minutes: 3,
      topics: [
        {
          topic_name: 'Walking',
          topic_name_vi: 'Đi bộ và vận động',
          questions: [
            'Do you like walking? When and where do you walk?',
            'Do you think walking is important?',
            'Do you think walking in the countryside is better than walking in the city?',
          ],
        },
        {
          topic_name: 'Eating Habits',
          topic_name_vi: 'Thói quen ăn uống',
          questions: [
            'Do you often eat healthy food?',
            'What do you usually eat at school/ at work?',
            'What is the unhealthiest food you can think of?',
          ],
        },
      ],
      sample_response: {
        band: 'B2',
        text: `Yes, I really enjoy walking, especially in the early morning around the local park near my house. It is a wonderful way to breathe fresh air and kick-start my day. I strongly believe walking is essential for our physical well-being because it enhances blood circulation and reduces stress after intense working hours. While walking in the countryside offers scenic greenery and peaceful tranquility without heavy traffic, city walking can also be convenient for daily commuting and socializing with neighborhood friends. Regarding eating habits, I always try to maintain a balanced diet with green vegetables, fresh fruits, and fish. At work, I usually pack homemade meals to avoid oily fast food, which I consider the unhealthiest due to excessive saturated fats and processed sodium.`,
        analysis_vi: 'Câu trả lời phát triển tự nhiên đầy đủ các ý của 2 chủ đề (Đi bộ & Thói quen ăn uống), kết hợp từ vựng diễn đạt phong phú (kick-start, blood circulation, tranquility, balanced diet, processed sodium).',
      },
    },
    part2: {
      title: 'Solution Discussion',
      duration_minutes: 4,
      situation: 'You are choosing a birthday gift for your friend. There are three suggestions: a book, a music show ticket, and a shopping coupon. Which do you think is the best choice?',
      options: [
        {
          key: 'Option 1',
          title: 'A book',
          description: 'An affordable gift, creating good memories and high availability with diverse genres.',
        },
        {
          key: 'Option 2',
          title: 'A music show ticket',
          description: 'A special memorable gift, providing enjoyment of watching live music and meeting idols.',
        },
        {
          key: 'Option 3',
          title: 'A shopping coupon',
          description: 'A flexible and convenient gift for friends to pick their own favorite items.',
        },
      ],
      sample_response: {
        band: 'B2',
        text: `If I had to choose a birthday gift for my close friend, I would definitely opt for a book. First of all, a book is not only affordable but also carries lasting sentimental value. Whenever my friend reads it, they will be reminded of our friendship, and there is a vast selection of inspirational or literary genres to match their specific interest. Although a music show ticket offers an exhilarating live experience and the chance to see beloved artists, it is quite expensive and dependent on whether my friend is free on that particular evening. A shopping coupon is undoubtedly practical and convenient, yet it somewhat lacks emotional warmth and personal thoughtfulness. Therefore, a meaningful book remains the best option for me.`,
        analysis_vi: 'Bài nói hoàn thành xuất sắc cấu trúc Part 2: nêu rõ lựa chọn (cuốn sách), giải thích 2 ưu điểm thuyết phục và phản biện so sánh loại trừ 2 phương án còn lại (vé ca nhạc & phiếu mua hàng).',
      },
    },
    part3: {
      title: 'Topic Development',
      duration_minutes: 5,
      topic: 'Cheap air travel should be promoted.',
      mindmap_ideas: [
        'Offers a flexible travelling mode',
        'Reduces travelling costs',
        'Creates business opportunities',
      ],
      follow_up_questions: [
        'Do you think that governments should encourage cheap flights?',
        'Are there any problems with low-cost air travel?',
        'Cheap air tickets should be offered on domestic flights or international flights?',
      ],
      sample_response: {
        band: 'B2',
        text: `In contemporary society, affordable air travel plays a vital role in modern transport. I firmly agree that cheap flights should be widely promoted for three principal reasons. First, low-cost carriers significantly reduce travelling expenses, allowing low-income citizens and students to visit relatives or explore distant regions without financial strain. Second, cheap air travel offers a flexible travelling mode with numerous daily flight schedules and promotional fares, making travel planning more accessible. Third, it creates tremendous business opportunities by connecting regional enterprises, facilitating swift trade of perishable goods, and boosting tourism revenue for local communities. Nevertheless, low-cost travel often involves drawbacks such as cramped legroom, extra fees for baggage, and frequent flight delays. In my view, governments should support affordable domestic routes first to bolster national economic integration before expanding low-cost international corridors.`,
        analysis_vi: 'Bài phát triển chủ đề bám sát 3 nhánh sơ đồ tư duy (tiết kiệm chi phí, linh hoạt lịch trình, tạo cơ hội kinh doanh) và giải quyết trọn vẹn các câu hỏi mở rộng về hạn chế và phạm vi đường bay.',
      },
    },
  },
  {
    test_number: 2,
    part1: {
      title: 'Social Interaction',
      duration_minutes: 3,
      topics: [
        {
          topic_name: 'Weather',
          topic_name_vi: 'Thời tiết và cảm xúc',
          questions: [
            'What kind of weather do you like?',
            'Does weather affect your mood/ feeling?',
            'What do you usually do in hot/ cold weather?',
          ],
        },
        {
          topic_name: 'Favorite Childhood Game',
          topic_name_vi: 'Trò chơi tuổi thơ',
          questions: [
            'What game(s) did you enjoy playing when you were a child?',
            'Who did you play with?',
            'Did you need any skills to play the game?',
          ],
        },
      ],
      sample_response: {
        band: 'B2',
        text: `My favorite weather is cool, breezy autumn weather because it makes outdoor activities comfortable and refreshing. Weather undeniably influences human feelings; sunny days always make me energetic and cheerful, whereas overcast, rainy days tend to make me slightly lethargic. On scorching hot summer days, I prefer swimming or staying indoors in air-conditioned spaces, while in chilly winter weather, I enjoy curling up with a hot cup of tea and reading books. Talking about my childhood, I used to love playing hide-and-seek with my neighborhood peers and school classmates. It was truly thrilling because it required agility, stealth, and quick observation skills to outsmart the seeker without getting caught.`,
        analysis_vi: 'Trả lời lưu loát 2 chủ đề với vốn từ phong phú miêu tả trạng thái thời tiết và kỷ niệm tuổi thơ (breezy, lethargic, agility, stealth).',
      },
    },
    part2: {
      title: 'Solution Discussion',
      duration_minutes: 4,
      situation: 'You are planning your holiday. There are three suggestions: a beach holiday, a climbing holiday, and a sight-seeing holiday. Which do you think is the best choice for you?',
      options: [
        {
          key: 'Option 1',
          title: 'A beach holiday',
          description: 'Relaxing and sunbathing on the beach, swimming in the sea, and enjoying water sports.',
        },
        {
          key: 'Option 2',
          title: 'A climbing holiday',
          description: 'Climbing mountains or rocks, camping on the summit, and discovering natural caves.',
        },
        {
          key: 'Option 3',
          title: 'A sight-seeing holiday',
          description: 'Visiting famous tourist attractions, appreciating nature and wildlife, and trying local foods.',
        },
      ],
      sample_response: {
        band: 'B2',
        text: `Given the three holiday alternatives, I believe a beach holiday is the most ideal choice for me. After months of grueling work and study, my primary goal is relaxation, and the tranquil sea breeze, sunbathing on golden sand, and swimming in crystal-clear waters provide the ultimate rejuvenation. On the other hand, while a climbing holiday offers adventurous thrills and cave exploration, it demands rigorous physical endurance and carries potential risks of injury. A sight-seeing holiday is undeniably educational for discovering heritage monuments and local cuisine, but it often involves rushed tour schedules and crowded tourist hubs. Therefore, taking a leisurely beach vacation remains the most rejuvenating option.`,
        analysis_vi: 'Lập luận thuyết phục theo tiêu chí xả stress, so sánh đối chiếu rõ nét với kỳ nghỉ leo núi (đòi hỏi thể lực cao) và tham quan ngắm cảnh (dễ mệt mỏi vì đông đúc).',
      },
    },
    part3: {
      title: 'Topic Development',
      duration_minutes: 5,
      topic: 'Music should be taught in schools.',
      mindmap_ideas: [
        'Can be relaxing',
        'Improves memory',
        'Helps develop language and reasoning',
      ],
      follow_up_questions: [
        'Should children be encouraged to learn music early?',
        'Do you agree that music can change people\'s moods/feelings?',
        'How would life be like without music?',
      ],
      sample_response: {
        band: 'B2',
        text: `Music education plays an indispensable role in holistic student development, and I strongly support incorporating music into the school curriculum. First, musical sessions serve as a natural stress reliever, offering students a soothing emotional outlet amidst heavy academic pressure. Second, learning musical melodies and notations significantly enhances memory retention, as learners train their brains to memorize rhythmic structures and chords. Third, neuroscience demonstrates that musical training stimulates neural pathways associated with language acquisition and logical reasoning. Children who learn musical instruments early often exhibit superior verbal fluency and spatial reasoning. Life without music would be remarkably dull and monochromatic, stripping humanity of a universal emotional language. Hence, schools should foster music appreciation from early childhood.`,
        analysis_vi: 'Phát triển luận điểm bài bản với liên kết câu chặt chẽ (holistic development, neural pathways, language acquisition, monochromatic).',
      },
    },
  },
  {
    test_number: 3,
    part1: {
      title: 'Social Interaction',
      duration_minutes: 3,
      topics: [
        {
          topic_name: 'Noise',
          topic_name_vi: 'Tiếng ồn và môi trường sống',
          questions: [
            'Do you like to live in a noisy place or a quiet place?',
            'What kind of noise disturbs you most?',
            'Does noise affect your health?',
          ],
        },
        {
          topic_name: 'Favorite Photograph',
          topic_name_vi: 'Bức ảnh kỷ niệm yêu thích',
          questions: [
            'What is your favorite photograph?',
            'When was it taken?',
            'What makes the photograph special to you?',
          ],
        },
      ],
      sample_response: {
        band: 'B2',
        text: `I definitely prefer residing in a quiet neighborhood because tranquility allows me to concentrate on my research and sleep soundly. The noise that disturbs me the most is honking from heavy traffic and continuous drilling from construction sites. Constant acoustic pollution severely harms health, inducing hypertension, chronic headaches, and sleep disturbances. Regarding photographs, my absolute favorite picture is a family portrait taken during my high school graduation three years ago. What makes it extraordinarily special is that it captured all three generations of my family smiling together, celebrating a milestone in my academic journey.`,
        analysis_vi: 'Câu trả lời cô đọng, giàu từ vựng học thuật (acoustic pollution, hypertension, family portrait, academic milestone).',
      },
    },
    part2: {
      title: 'Solution Discussion',
      duration_minutes: 4,
      situation: 'You are thinking about how to spend your evening. There are three options: hanging out with friends, reading books, and surfing the Internet. Explain your choice.',
      options: [
        {
          key: 'Option 1',
          title: 'Hanging out with friends',
          description: 'Meeting up at a coffee shop, having dinner, and catching up on personal stories.',
        },
        {
          key: 'Option 2',
          title: 'Reading books',
          description: 'Reading engaging fiction or non-fiction books before bedtime for quiet mindfulness.',
        },
        {
          key: 'Option 3',
          title: 'Surfing the Internet',
          description: 'Browsing social media, watching video streams, and researching online topics.',
        },
      ],
      sample_response: {
        band: 'B2',
        text: `Among the three activities for spending a relaxing evening, I would personally choose reading books. Immersing myself in a compelling novel or an insightful non-fiction book allows my mind to unwind peacefully without digital distractions. It broadens my vocabulary and fosters deep mindfulness before sleep. In contrast, while hanging out with friends is enjoyable and fosters camaraderie, it requires traveling outside through bustling traffic, which can be exhausting after a long day. Surfing the internet often leads to mindless scrolling on social feeds, and the blue light emitted from screens disrupts sleep cycles. Therefore, quiet reading is the most rewarding way to spend my evening.`,
        analysis_vi: 'Lựa chọn phương án đọc sách, phản biện hợp lý về sự mệt mỏi khi ra đường gặp bạn bè và tác hại ánh sáng xanh khi lướt web.',
      },
    },
    part3: {
      title: 'Topic Development',
      duration_minutes: 5,
      topic: 'There are several ways for people to make friends.',
      mindmap_ideas: [
        'Joining social events',
        'Forming interest-based groups',
        'Attending parties',
      ],
      follow_up_questions: [
        'Should people trust online friends? Why or why not?',
        'What factors can contribute to a true friendship?',
        'Which one is more important: family or friends?',
      ],
      sample_response: {
        band: 'B2',
        text: `Human beings are inherently social creatures, and forging meaningful friendships is essential for emotional well-being. There are several effective ways to connect with new people. First, participating in social and volunteer events provides opportunities to meet civic-minded individuals who share common philanthropic values. Second, joining interest-based clubs—such as sports, photography, or book clubs—allows people to bond effortlessly over shared passions. Third, attending communal celebrations and parties creates informal, joyful atmospheres for spontaneous interactions. Regarding online relationships, while the internet broadens social reach, one must exercise caution because virtual personas can be fabricated. A genuine friendship is founded on mutual loyalty, empathy, and active listening. Both family and friends are vital; however, familial ties offer unconditional lifelong support.`,
        analysis_vi: 'Khai triển 3 nhánh tạo dựng tình bạn, phân tích sâu tính chân thật của bạn bè qua mạng và các giá trị cốt lõi của tình bạn đích thực.',
      },
    },
  },
  {
    test_number: 4,
    part1: {
      title: 'Social Interaction',
      duration_minutes: 3,
      topics: [
        {
          topic_name: 'Favorite Color',
          topic_name_vi: 'Màu sắc yêu thích và phong cách',
          questions: [
            'What color(s) do you like most?',
            'Do you care for colors when choosing clothes to wear?',
            'Does color affect your mood/ feeling?',
          ],
        },
        {
          topic_name: 'Going to the Library',
          topic_name_vi: 'Thói quen đến thư viện',
          questions: [
            'How often do you go to the library?',
            'What do you usually do in the library?',
            'Do you think that fewer people go to the library nowadays?',
          ],
        },
      ],
      sample_response: {
        band: 'B2',
        text: `My favorite color is navy blue because it exudes professionalism, tranquility, and elegance. When selecting attire, I pay meticulous attention to color coordination; harmonizing subtle neutral shades with a touch of highlight helps me look sharp and confident. Color psychology certainly plays a role in human emotions—warm tones stimulate enthusiasm, whereas cool blues induce calmness. Regarding the library, I visit my university library about twice a week to browse academic journals, borrow reference materials, and study in a disciplined silence. Although digital e-books are on the rise, physical libraries remain indispensable sanctuaries for deep scholarly concentration.`,
        analysis_vi: 'Diễn đạt tự nhiên, liên kết khéo léo giữa sở thích cá nhân, tâm lý học màu sắc và giá trị của không gian thư viện truyền thống.',
      },
    },
    part2: {
      title: 'Solution Discussion',
      duration_minutes: 4,
      situation: 'You are going to celebrate your birthday. There are three suggestions for the place where you can hold the party: in a fast-food restaurant, in a sit-down restaurant, and in your house. What do you think is the best choice?',
      options: [
        {
          key: 'Option 1',
          title: 'In a fast-food restaurant',
          description: 'Fast and convenient service, affordable meals, informal and youthful atmosphere.',
        },
        {
          key: 'Option 2',
          title: 'In a sit-down restaurant',
          description: 'Diverse gourmet dishes, elegant ambiance, and professional table service.',
        },
        {
          key: 'Option 3',
          title: 'In your house',
          description: 'Cozy and familiar surroundings, personalized theme decorations, budget management, and intimate privacy.',
        },
      ],
      sample_response: {
        band: 'B2',
        text: `For my upcoming birthday celebration, I would opt to organize the party in my house. Hosting the gathering at home offers unmatched privacy, comfort, and a cozy atmosphere where my close friends and family can converse freely without time limits or intrusive noise. Furthermore, we can prepare homemade specialty dishes together and customize the decorations to reflect our personal tastes, which is far more budget-friendly. While a sit-down restaurant provides gourmet menus and relieves us of post-party cleanup, it tends to be quite pricey and overly formal. A fast-food restaurant is inexpensive and fast, but its noisy, chaotic environment lacks the intimacy suited for a meaningful birthday celebration. Thus, celebrating at home is the best solution.`,
        analysis_vi: 'Cấu trúc bài nói chặt chẽ, nêu bật tính ấm cúng và kinh tế của bữa tiệc tại nhà, đồng thời phản biện khách quan về nhà hàng sang trọng và quán ăn nhanh.',
      },
    },
    part3: {
      title: 'Topic Development',
      duration_minutes: 5,
      topic: 'More recycling centers should be built in communities.',
      mindmap_ideas: [
        'Help reduce the size of landfills',
        'Utilize waste products',
        'Offer more employment opportunities',
      ],
      follow_up_questions: [
        'Are you aware of what recycling means?',
        'Do you recycle as part of your everyday life?',
        'Do you agree that everyone should reuse and recycle products?',
      ],
      sample_response: {
        band: 'B2',
        text: `Environmental sustainability is one of the most pressing challenges of our era, and establishing more local recycling centers is an urgent imperative. Firstly, community recycling centers drastically curtail the volume of solid waste sent to landfills, mitigating groundwater contamination and methane emissions. Secondly, they facilitate the efficient reprocessing of scrap metals, plastics, and paper, converting discarded waste into valuable secondary raw materials and conserving virgin natural resources. Thirdly, developing a robust recycling infrastructure generates diverse employment opportunities, from collection logistics to technical sorting and manufacturing. In my daily routine, I diligently segregate recyclable plastics and organic compost. I believe environmental education must be universalized so that every citizen takes civic responsibility in reducing single-use packaging.`,
        analysis_vi: 'Phát triển chủ đề xuất sắc với các thuật ngữ môi trường chuyên sâu (groundwater contamination, secondary raw materials, segregate recyclables, civic responsibility).',
      },
    },
  },
  {
    test_number: 5,
    part1: {
      title: 'Social Interaction',
      duration_minutes: 3,
      topics: [
        {
          topic_name: 'Parties',
          topic_name_vi: 'Tiệc tùng và sự kiện họp mặt',
          questions: [
            'Do you enjoy going to a party?',
            'What do you usually do at a party?',
            'On what occasions do you hold a party?',
          ],
        },
        {
          topic_name: 'Your City',
          topic_name_vi: 'Khám phá thành phố nơi bạn sống',
          questions: [
            'Which part of the city do you like best?',
            'Why do you like it?',
            'Are there any changes you would like to make to the place?',
          ],
        },
      ],
      sample_response: {
        band: 'B2',
        text: `I definitely enjoy attending social parties because they provide refreshing opportunities to catch up with acquaintances, savor festive cuisine, and unwind with lively music. I usually host parties for significant milestones such as birthdays, Lunar New Year reunions, or celebrating exam completions with classmates. Speaking of Ho Chi Minh City, the area I adore the most is the historic downtown around District 1 and the Saigon River promenade. I love its vibrant juxtaposition of French colonial architecture and modern skyscrapers. If I could implement changes, I would expand pedestrian-only green boulevards and upgrade the public transit bus network to alleviate rush-hour congestion.`,
        analysis_vi: 'Phản xạ mượt mà, trả lời trọn vẹn cả 6 câu hỏi của 2 chủ đề Tiệc tùng & Thành phố với hình ảnh so sánh sống động (vibrant juxtaposition, promenade, colonial architecture).',
      },
    },
    part2: {
      title: 'Solution Discussion',
      duration_minutes: 4,
      situation: 'You are considering buying a brand watch. There are three suggestions for how to get it: placing an order through a website, shopping in a mall, and calling over the phone. Which one is the best option for you?',
      options: [
        {
          key: 'Option 1',
          title: 'Placing an order through a website',
          description: 'Convenient online browsing, price comparisons, customer reviews, and doorstep delivery.',
        },
        {
          key: 'Option 2',
          title: 'Shopping in a mall',
          description: 'Hands-on tactile try-on, verifying authenticity directly, and obtaining instant warranty service.',
        },
        {
          key: 'Option 3',
          title: 'Calling over the phone',
          description: 'Personalized telephone customer assistance, checking stock availability, and placing orders.',
        },
      ],
      sample_response: {
        band: 'B2',
        text: `When investing in a premium brand watch, shopping directly in an authorized shopping mall is undoubtedly the most prudent approach. A luxury watch is a significant financial investment, and visiting an official boutique allows me to inspect the craftsmanship firsthand, try it on my wrist to assess fit and weight, and verify authentic warranties and serial certificates. Conversely, although online ordering offers convenience and price comparisons, there is an inherent risk of receiving counterfeit merchandise or damaged packaging during shipment. Ordering via telephone lacks visual inspection entirely, making it difficult to evaluate aesthetics accurately. Therefore, buying at a shopping mall guarantees genuine quality and peace of mind.`,
        analysis_vi: 'Lập luận sắc bén, chú trọng yếu tố thẩm định giá trị món hàng cao cấp (craftsmanship, serial certificates, counterfeit merchandise), loại bỏ thuyết phục 2 kênh mua từ xa.',
      },
    },
    part3: {
      title: 'Topic Development',
      duration_minutes: 5,
      topic: 'There are several factors that lead to success in life.',
      mindmap_ideas: [
        'Education and skills',
        'Vision',
        'Passion',
      ],
      follow_up_questions: [
        'Why is money the most common way of judging success?',
        'Is your idea of success the same as your parents\' idea of success?',
        'Does luck play a part in success?',
      ],
      sample_response: {
        band: 'B2',
        text: `Achieving success in life is a multifaceted endeavor driven by several fundamental factors. Firstly, education and practical skills lay the indispensable bedrock, equipping individuals with technical competence and critical problem-solving faculties. Secondly, having a clear strategic vision allows people to set long-term milestones and navigate unpredictable obstacles with resilience. Thirdly, relentless passion fuels perseverance during difficult setbacks; without intrinsic enthusiasm, sustained excellence is impossible. Society often equates success with financial wealth because monetary assets are easily quantifiable, yet true fulfillment encompasses emotional contentment and societal contribution. While my parents often associate success with steady professional security, I view success as self-actualization and continuous growth. Fortunate timing and luck may offer sudden openings, but only consistent preparation transforms luck into enduring achievement.`,
        analysis_vi: 'Triển khai tư duy trừu tượng xuất sắc, phân tích sâu sắc mối quan hệ giữa học thức, tầm nhìn, đam mê với tiền tài và sự tự hoàn thiện bản thân (self-actualization, quantifiable, perseverance).',
      },
    },
  },
];

// Generate Writing Test Files
const writingExportStatements = [];
const writingMapEntries = [];

for (let i = 0; i < HCMUE_WRITING_DATA.length; i++) {
  const data = HCMUE_WRITING_DATA[i];
  const numStr = String(data.test_number).padStart(2, '0');
  const constName = `HCMUE_WRITING_TEST_${numStr}`;
  const fileName = `hcmueWritingTest${numStr}.ts`;
  const filePath = path.join(writingDir, fileName);

  const fileContent = `import type { WritingPrompt } from '../../../../../types/schemas';
import type { WritingTestInput } from '../../../types';

/**
 * Authentic HCMUE VSTEP Writing Test ${numStr}
 * Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017)
 */

export const ${constName}_TASK1: WritingPrompt = ${JSON.stringify(data.task1, null, 2)};

export const ${constName}_TASK2: WritingPrompt = ${JSON.stringify(data.task2, null, 2)};

export const ${constName}: WritingTestInput = {
  id: 'hcmue_writing_test_${numStr}',
  test_number: ${data.test_number},
  title: 'HCMUE Authentic VSTEP Writing Test ${numStr}',
  institution: 'HCMUE - ĐH Sư phạm TP.HCM',
  total_duration_minutes: 60,
  task1: ${constName}_TASK1,
  task2: ${constName}_TASK2,
};
`;

  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`Generated ${filePath}`);

  writingExportStatements.push(`export * from './hcmueWritingTest${numStr}';`);
  writingMapEntries.push(`  ${constName},`);
}

// Write Writing Index
const writingImports = HCMUE_WRITING_DATA.map((d) => {
  const numStr = String(d.test_number).padStart(2, '0');
  return `import { HCMUE_WRITING_TEST_${numStr} } from './hcmueWritingTest${numStr}';`;
}).join('\n');

const writingIndexContent = `${writingExportStatements.join('\n')}

${writingImports}
import type { WritingTestInput } from '../../../types';

export const HCMUE_WRITING_TESTS: WritingTestInput[] = [
${writingMapEntries.join('\n')}
];

export const HCMUE_WRITING_TESTS_MAP = Object.fromEntries(
  HCMUE_WRITING_TESTS.map((t) => [t.id, t])
);
`;

fs.writeFileSync(path.join(writingDir, 'index.ts'), writingIndexContent, 'utf-8');
console.log(`Generated ${path.join(writingDir, 'index.ts')}`);

// Generate Speaking Test Files
const speakingExportStatements = [];
const speakingMapEntries = [];

for (let i = 0; i < HCMUE_SPEAKING_DATA.length; i++) {
  const data = HCMUE_SPEAKING_DATA[i];
  const numStr = String(data.test_number).padStart(2, '0');
  const constName = `HCMUE_SPEAKING_TEST_${numStr}`;
  const fileName = `hcmueSpeakingTest${numStr}.ts`;
  const filePath = path.join(speakingDir, fileName);

  const testObj = {
    id: `hcmue_spk_test_${numStr}`,
    test_number: data.test_number,
    title: `HCMUE Authentic VSTEP Speaking Test ${numStr}`,
    part1: data.part1,
    part2: data.part2,
    part3: data.part3,
  };

  const fileContent = `import type { SpeakingTest } from '../../../../../types/schemas';

/**
 * Authentic HCMUE VSTEP Speaking Test ${numStr}
 * Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017)
 */

export const ${constName}: SpeakingTest = ${JSON.stringify(testObj, null, 2)};
`;

  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`Generated ${filePath}`);

  speakingExportStatements.push(`export * from './hcmueSpeakingTest${numStr}';`);
  speakingMapEntries.push(`  ${constName},`);
}

// Write Speaking Index
const speakingImports = HCMUE_SPEAKING_DATA.map((d) => {
  const numStr = String(d.test_number).padStart(2, '0');
  return `import { HCMUE_SPEAKING_TEST_${numStr} } from './hcmueSpeakingTest${numStr}';`;
}).join('\n');

const speakingIndexContent = `${speakingExportStatements.join('\n')}

${speakingImports}
import type { SpeakingTest } from '../../../../../types/schemas';

export const HCMUE_SPEAKING_TESTS: SpeakingTest[] = [
${speakingMapEntries.join('\n')}
];

export const HCMUE_SPEAKING_TESTS_MAP = Object.fromEntries(
  HCMUE_SPEAKING_TESTS.map((t) => [t.id, t])
);
`;

fs.writeFileSync(path.join(speakingDir, 'index.ts'), speakingIndexContent, 'utf-8');
console.log(`Generated ${path.join(speakingDir, 'index.ts')}`);

console.log('\nAll 10 HCMUE productive test modules generated successfully!');
