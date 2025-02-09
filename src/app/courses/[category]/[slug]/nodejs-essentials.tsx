import type { LessonContent } from './page';

export const courseInfo = {
  title: 'Node.js Backend Development',
  description: 'Build scalable server-side applications',
  studentsEnrolled: 1500,
  rating: 4.7,
  duration: '3 weeks',
  level: 'Intermediate',
  price: 0,
  instructor: {
    name: 'Sarah Johnson',
    expertise: ['Node.js', 'REST APIs']
  }
};

export const lessons = [
  {
    title: 'Introduction to Node.js',
    content: [
      { type: 'text' as const, text: 'Node.js runtime environment' },
      { type: 'exercise' as const, text: 'Creating a basic server' }
    ] satisfies LessonContent[]
  }
];
