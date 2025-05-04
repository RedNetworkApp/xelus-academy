export interface LessonContent {
  type: 'text' | 'video' | 'exercise' | 'quiz' | 'assignment';
  title?: string;
  text?: string;
  videoUrl?: string;
  duration?: string;
  code?: string;
  language?: string;
  questions?: QuizQuestion[];
  instructions?: string;
  resources?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  duration: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: LessonContent;
  order: number;
  status?: 'not-started' | 'in-progress' | 'completed';
  progress?: number;
}

export interface Section {
  title: string;
  lessons: Lesson[];
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  completedLessons: string[];
  currentLesson: string;
  progress: number;
  startDate: string;
  lastAccessDate: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    expertise: string[];
  };
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  price: number;
  studentsEnrolled: number;
  rating: number;
  syllabus: string[];
  curriculum: Section[];
}
