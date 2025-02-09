import { Instructor } from './instructor';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  instructor: Instructor;
  price: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  rating: number;
  studentsEnrolled: number;
  objectives: string[];
  syllabus: {
    id: string;
    title: string;
    duration: string;
    lessons: {
      id: string;
      title: string;
      duration: string;
      type: 'video' | 'text' | 'exercise';
      isPreview?: boolean;
    }[];
  }[];
  features?: string[];
}
