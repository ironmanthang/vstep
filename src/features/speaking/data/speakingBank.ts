import type { SpeakingTest } from '../../../types/schemas';

/**
 * Authentic VSTEP Speaking Exam Banks (May Official Exam Sessions)
 * Sourced from Center for Language Testing & Assessment - vstep.edu.vn
 */

export const SPEAKING_EXAM_MAY_05: SpeakingTest = {
  id: 'vstep_spk_2026_05_05',
  exam_date: '05/05',
  title: 'Đề Thi VSTEP Speaking Ngày 05/05',
  part1: {
    title: 'Social Interaction',
    duration_minutes: 3,
    topics: [
      {
        topic_name: 'Morning Routines',
        topic_name_vi: 'Thói quen buổi sáng',
        questions: [
          'What is your typical morning routine?',
          'Do you think breakfast is the most important meal of the day? Why?',
          'Is your morning routine today different from when you were a child?',
        ],
      },
      {
        topic_name: 'Transport',
        topic_name_vi: 'Phương tiện di chuyển',
        questions: [
          'How do you go to work or school every day?',
          'What is your favorite form of transport? Why?',
          'Do you prefer public transport or private transport?',
        ],
      },
    ],
  },
  part2: {
    title: 'Solution Discussion',
    duration_minutes: 4,
    situation: 'You want to watch a famous movie with your best friend. There are three places you are considering: your living room, a local cinema, or a garden. Which is the best choice for you?',
    options: [
      { key: 'Option 1', title: 'My living room', description: 'Watching at home with cozy comfort, no ticket fees, and private talk.' },
      { key: 'Option 2', title: 'A local cinema', description: 'Immersive large screen, premium surround sound, and authentic cinema vibe.' },
      { key: 'Option 3', title: 'A garden', description: 'Open outdoor atmosphere, fresh air, but weather-dependent.' },
    ],
  },
  part3: {
    title: 'Topic Development',
    duration_minutes: 5,
    topic: 'Causes of Stress in the Modern Workplace',
    mindmap_ideas: [
      'High Workload',
      'Bad teamwork & communication friction',
      'Worrying about losing jobs / job security',
    ],
    follow_up_questions: [
      'How does stress affect a person’s performance at work?',
      'What should companies do to reduce stress for their employees?',
      'Do you think technology makes our work easier or more stressful?',
    ],
  },
};

export const SPEAKING_EXAM_MAY_16: SpeakingTest = {
  id: 'vstep_spk_2026_05_16',
  exam_date: '16/05',
  title: 'Đề Thi VSTEP Speaking Ngày 16/05',
  part1: {
    title: 'Social Interaction',
    duration_minutes: 3,
    topics: [
      {
        topic_name: 'Reading Books',
        topic_name_vi: 'Thói quen đọc sách',
        questions: [
          'Do you like reading books? Why or why not?',
          'What kind of books do you usually read?',
          'Do you think reading books is better than watching movies?',
        ],
      },
      {
        topic_name: 'Mobile Phones',
        topic_name_vi: 'Điện thoại di động',
        questions: [
          'How often do you use your mobile phone?',
          'What do you usually use your phone for?',
          'Is there anything you dislike about mobile phones?',
        ],
      },
    ],
  },
  part2: {
    title: 'Solution Discussion',
    duration_minutes: 4,
    situation: 'You want to find the best part-time job to improve your English skills. There are three options for you: working as a waiter/waitress in a restaurant, working as a tour guide, and working at an English center. Which is the best choice?',
    options: [
      { key: 'Option 1', title: 'Waiter/waitress in an international restaurant', description: 'Frequent short verbal interactions with foreign guests.' },
      { key: 'Option 2', title: 'Tour guide for international visitors', description: 'Extensive descriptive speaking, cultural sharing, and deep conversational English.' },
      { key: 'Option 3', title: 'Teaching assistant at an English center', description: 'Academic environment, pedagogical grammar exposure, and teacher mentorship.' },
    ],
  },
  part3: {
    title: 'Topic Development',
    duration_minutes: 5,
    topic: 'Studying abroad brings various benefits to students.',
    mindmap_ideas: [
      'Academic and language development',
      'Personal growth and independence',
      'Future global career opportunities',
    ],
    follow_up_questions: [
      'Do you think studying abroad is suitable for everyone? Why or why not?',
      'What are some challenges that students may face when studying in a foreign country?',
    ],
  },
};

export const SPEAKING_EXAM_MAY_20: SpeakingTest = {
  id: 'vstep_spk_2026_05_20',
  exam_date: '20/05',
  title: 'Đề Thi VSTEP Speaking Ngày 20/05',
  part1: {
    title: 'Social Interaction',
    duration_minutes: 3,
    topics: [
      {
        topic_name: 'Sadness & Emotions',
        topic_name_vi: 'Cảm xúc và giải tỏa nỗi buồn',
        questions: [
          'What do you usually do when you feel sad?',
          'Do you prefer to be alone or talk to someone when you are sad?',
          'Do you think it’s important for people to experience sadness?',
        ],
      },
      {
        topic_name: 'AI Tools & Technology',
        topic_name_vi: 'Công cụ trí tuệ nhân tạo',
        questions: [
          'Do you often use AI tools in your daily life or studies?',
          'How have AI tools changed the way people work and learn?',
          'Do you think AI tools will completely replace human jobs in the future?',
        ],
      },
    ],
  },
  part2: {
    title: 'Solution Discussion',
    duration_minutes: 4,
    situation: 'Your gym is organizing a health and wellness workshop for its members. There are three options for the guest speaker: a nutritionist, a fitness expert, or a yoga instructor. Which one do you think is the best choice?',
    options: [
      { key: 'Option 1', title: 'A nutritionist', description: 'Focuses on dietary science, meal planning, and metabolic health.' },
      { key: 'Option 2', title: 'A fitness expert', description: 'Focuses on strength training, workout routines, and injury prevention.' },
      { key: 'Option 3', title: 'A yoga instructor', description: 'Focuses on mental relaxation, flexibility, and breathing techniques.' },
    ],
  },
  part3: {
    title: 'Topic Development',
    duration_minutes: 5,
    topic: 'Internships provide various benefits for students.',
    mindmap_ideas: [
      'Gain practical workplace experience',
      'Build a professional network',
      'Enhance soft skills and teamwork',
    ],
    follow_up_questions: [
      'Should all internships be paid, or is unpaid experience acceptable for students?',
      'What advice would you give to a student who is having a negative experience at their internship?',
      'Do you think universities should make internships a compulsory requirement for graduation?',
    ],
  },
};

export const SPEAKING_EXAM_MAY_24: SpeakingTest = {
  id: 'vstep_spk_2026_05_24',
  exam_date: '24/05',
  title: 'Đề Thi VSTEP Speaking Ngày 24/05',
  part1: {
    title: 'Social Interaction',
    duration_minutes: 3,
    topics: [
      {
        topic_name: 'Milk Tea & Youth Trends',
        topic_name_vi: 'Trà sữa và xu hướng giới trẻ',
        questions: [
          'Do you like drinking milk tea? Why or why not?',
          'Why do you think milk tea is highly popular among young people nowadays?',
          'What is the most famous milk tea brand in your country?',
        ],
      },
      {
        topic_name: 'Eating Out',
        topic_name_vi: 'Ăn uống bên ngoài',
        questions: [
          'What are the benefits of eating out?',
          'Do you often eat out with your friends or family?',
          'If you have a choice, do you prefer eating out or eating at home?',
        ],
      },
    ],
  },
  part2: {
    title: 'Solution Discussion',
    duration_minutes: 4,
    situation: 'You have a free weekend and you want to relax. There are three options for you to choose: going shopping, visiting a coffee shop, or just enjoying yourself at home. Which one do you think is the best choice?',
    options: [
      { key: 'Option 1', title: 'Going shopping', description: 'Retail therapy and window shopping at a modern mall.' },
      { key: 'Option 2', title: 'Visiting a coffee shop', description: 'Relaxing ambiance, reading, or chatting with close friends.' },
      { key: 'Option 3', title: 'Enjoying yourself at home', description: 'Resting, watching series, and saving budget without outdoor commute.' },
    ],
  },
  part3: {
    title: 'Topic Development',
    duration_minutes: 5,
    topic: 'Reading books brings various benefits to people.',
    mindmap_ideas: [
      'Gain in-depth knowledge & perspective',
      'Improve vocabulary and cognitive focus',
      'Reduce mental stress and promote mindfulness',
    ],
    follow_up_questions: [
      'Why should people form a habit of reading as many books as possible?',
      'In your opinion, which one is better: traditional paper books or e-books?',
      'Which reading method do people in your country usually prefer (reading online, audiobooks, or physical books)?',
    ],
  },
};

export const SPEAKING_EXAM_MAY_30: SpeakingTest = {
  id: 'vstep_spk_2026_05_30',
  exam_date: '30/05',
  title: 'Đề Thi VSTEP Speaking Ngày 30/05',
  part1: {
    title: 'Social Interaction',
    duration_minutes: 3,
    topics: [
      {
        topic_name: 'Eating Breakfast',
        topic_name_vi: 'Thói quen ăn sáng',
        questions: [
          'Do you usually eat breakfast? Why or why not?',
          'What is your favorite food for breakfast?',
          'Do you prefer having breakfast at home or eating out?',
        ],
      },
      {
        topic_name: 'Water Drinking Habits',
        topic_name_vi: 'Thói quen uống nước',
        questions: [
          'How much water do you drink every day?',
          'Do you prefer drinking plain water or flavored drinks (like juice or soft drinks)?',
          'Why is it important to drink enough water throughout the day?',
        ],
      },
    ],
  },
  part2: {
    title: 'Solution Discussion',
    duration_minutes: 4,
    situation: 'You are preparing a presentation for an international youth exchange program. There are three topics suggested: Vietnamese food, Vietnamese traditional festivals, and Vietnamese tourist attractions. Which one do you think is the best choice?',
    options: [
      { key: 'Option 1', title: 'Vietnamese traditional food (Phở, Bánh mì, Nem)', description: 'Universal culinary appeal, easily engaging, and rich in cultural storytelling.' },
      { key: 'Option 2', title: 'Vietnamese traditional festivals (Tết, Mid-Autumn)', description: 'Vibrant cultural heritage, folk games, and spiritual significance.' },
      { key: 'Option 3', title: 'Vietnamese tourist attractions (Ha Long Bay, Hoi An, Da Nang)', description: 'Stunning landscapes, travel exploration, and heritage geography.' },
    ],
  },
  part3: {
    title: 'Topic Development',
    duration_minutes: 5,
    topic: 'Benefits of doing scientific research for university students.',
    mindmap_ideas: [
      'Improve specialized academic knowledge',
      'Develop critical soft skills (analysis, presentation, writing)',
      'Enhance future master scholarships and career opportunities',
    ],
    follow_up_questions: [
      'What are some difficulties that students may face when doing research?',
      'Do you think schools should make research projects compulsory for all students?',
      'How can teachers help students improve their research skills?',
    ],
  },
};

import { ALL_ULIS_SPEAKING_TESTS } from './mockTests';

export const ALL_SPEAKING_PRACTICE_TESTS: SpeakingTest[] = [
  ...ALL_ULIS_SPEAKING_TESTS,
  SPEAKING_EXAM_MAY_30,
  SPEAKING_EXAM_MAY_24,
  SPEAKING_EXAM_MAY_20,
  SPEAKING_EXAM_MAY_16,
  SPEAKING_EXAM_MAY_05,
];
