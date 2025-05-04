import { Course, Instructor, Module } from '@/types/course';
import { LessonContent } from '@/types/course-content';

const instructor: Instructor = {
  id: 'instructor-1',
  name: 'John Doe',
  avatar: '/instructors/john-doe.jpg',
  bio: 'Senior Node.js Developer with 10+ years of experience',
  expertise: ['Node.js', 'JavaScript', 'TypeScript', 'Express.js'],
  rating: 4.8,
  studentsTaught: 5000,
  courses: ['nodejs-essentials', 'advanced-nodejs'],
  totalStudents: 5000,
  totalCourses: 2
};

const moduleContent: LessonContent[] = [
  {
    type: 'text',
    title: 'Introduction to Node.js',
    text: 'Learn the basics of Node.js and its architecture',
    duration: '10 minutes'
  },
  {
    type: 'video',
    title: 'Setting Up Your Development Environment',
    videoUrl: 'https://example.com/videos/nodejs-setup',
    duration: '15 minutes'
  },
  {
    type: 'exercise',
    title: 'Your First Node.js Program',
    instructions: 'Create a simple HTTP server',
    duration: '20 minutes'
  }
];

const asyncContent: LessonContent[] = [
  {
    type: 'text',
    title: 'Understanding Asynchronous Programming',
    text: 'Learn about callbacks, promises, and async/await',
    duration: '15 minutes'
  },
  {
    type: 'video',
    title: 'Working with Promises',
    videoUrl: 'https://example.com/videos/promises',
    duration: '20 minutes'
  },
  {
    type: 'exercise',
    title: 'Async/Await Practice',
    instructions: 'Convert callback-based code to async/await',
    duration: '25 minutes'
  }
];

const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Getting Started with Node.js',
    description: 'Learn the fundamentals of Node.js',
    duration: '45 minutes',
    order: 1,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to Node.js',
        duration: '10 minutes',
        content: moduleContent[0],
        order: 1
      },
      {
        id: 'lesson-2',
        title: 'Setting Up Your Environment',
        duration: '15 minutes',
        content: moduleContent[1],
        order: 2
      },
      {
        id: 'lesson-3',
        title: 'Your First Node.js Program',
        duration: '20 minutes',
        content: moduleContent[2],
        order: 3
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Asynchronous Programming',
    description: 'Master async programming in Node.js',
    duration: '60 minutes',
    order: 2,
    lessons: [
      {
        id: 'lesson-4',
        title: 'Understanding Async Programming',
        duration: '15 minutes',
        content: asyncContent[0],
        order: 1
      },
      {
        id: 'lesson-5',
        title: 'Working with Promises',
        duration: '20 minutes',
        content: asyncContent[1],
        order: 2
      },
      {
        id: 'lesson-6',
        title: 'Async/Await in Practice',
        duration: '25 minutes',
        content: asyncContent[2],
        order: 3
      }
    ]
  }
];

export const courseInfo: Course = {
  id: 'nodejs-essentials',
  title: 'Node.js Essentials',
  description: 'Learn the fundamentals of Node.js development',
  instructor,
  duration: '8 hours',
  level: 'Beginner',
  prerequisites: ['Basic JavaScript knowledge'],
  price: 49.99,
  studentsEnrolled: 1000,
  rating: 4.8,
  syllabus: [
    'Introduction to Node.js',
    'Asynchronous Programming',
    'Working with Files',
    'HTTP Servers',
    'Express.js Basics'
  ],
  curriculum: modules,
  category: 'development',
  features: [
    'Hands-on exercises',
    'Real-world projects',
    'Certificate of completion',
    'Lifetime access'
  ],
  thumbnail: '/courses/nodejs-essentials.jpg',
  language: 'English',
  lastUpdated: '2024-01-15',
  certificate: true,
  tags: ['nodejs', 'javascript', 'backend', 'web development'],
  slug: 'nodejs-essentials'
};
