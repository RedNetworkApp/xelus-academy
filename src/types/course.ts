import { LessonContent } from './course-content';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: LessonContent;
  isPreview?: boolean;
  order?: number;
  type?: string;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
  description?: string;
  order?: number;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  expertise: string[];
  rating: number;
  studentsTaught?: number;
  courses?: string[];
  totalStudents: number;
  totalCourses: number;
  analytics?: InstructorAnalytics;
  coursesTaught?: number;
}

export interface InstructorAnalytics {
  totalRevenue: number;
  monthlyRevenue: number;
  totalStudents: number;
  activeStudents: number;
  courseCompletionRate: number;
  averageRating: number;
  studentSatisfaction: number;
  coursesCreated: number;
  totalReviews: number;
  revenueByMonth: {
    month: string;
    revenue: number;
  }[];
  studentsByMonth: {
    month: string;
    students: number;
  }[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: Instructor;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites?: string[];
  price: number;
  studentsEnrolled: number;
  rating: number;
  syllabus?: string[] | Module[];
  curriculum?: Module[];
  category: string;
  features?: string[];
  thumbnail?: string;
  language?: string;
  lastUpdated?: string;
  certificate?: boolean;
  tags?: string[];
  slug?: string;
  objectives?: string[];
  topics?: string[];
}

export interface CourseReview {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  helpful: number;
  user: {
    name: string;
    avatar: string;
  };
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

export interface CourseLearningProps {
  course: Course;
  onClose: () => void;
}

export interface CourseSection {
  title: string;
  lessons: Lesson[];
}

export interface CourseFormData {
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  duration: string;
  prerequisites: string[];
  syllabus: Module[];
  features?: string[];
  category?: string;
  objectives?: string[];
}
