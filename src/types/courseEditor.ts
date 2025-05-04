import { Course, Module, Lesson } from './course';
import { MilestoneTemplate } from './learning-path';

export interface CourseFormData {
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  duration: string;
  prerequisites: string[];
  syllabus: (MilestoneTemplate | ModuleFormData)[];
  category: string;
  features: string[];
  thumbnail: string;
  language?: string;
  lastUpdated?: string;
  certificate?: boolean;
  tags?: string[];
  slug?: string;
  objectives: string[];
  curriculum?: Module[];
}

export interface LessonContent {
  type: 'video' | 'text' | 'quiz' | 'assignment';
  videoUrl?: string;
  textContent?: string;
  quizQuestions?: QuizQuestion[];
  assignmentDetails?: AssignmentDetails;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface AssignmentDetails {
  instructions: string;
  requirements: string[];
  rubric: {
    criteria: string;
    points: number;
  }[];
  dueDate?: string;
}

export interface LessonFormData {
  title: string;
  duration: string;
  content: LessonContent;
  isPreview?: boolean;
  order?: number;
  type?: string;
  id?: string;
  videoUrl?: string;
  quizQuestions?: any[];
}

export interface ModuleFormData extends Omit<Module, 'id' | 'lessons'> {
  lessons: LessonFormData[];
}

export interface CourseValidationError {
  field: string;
  message: string;
}

export interface CoursePublishRequirements {
  hasTitle: boolean;
  hasDescription: boolean;
  hasObjectives: boolean;
  hasThumbnail: boolean;
  hasPrice: boolean;
  hasModules: boolean;
  minimumLessons: boolean;
  allLessonsHaveContent: boolean;
}
