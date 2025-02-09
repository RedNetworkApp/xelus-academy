import { Course, Module, Lesson } from './course';

export type CourseFormData = Omit<Course, 'id' | 'instructor' | 'rating' | 'studentsEnrolled'>;

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

export interface ModuleFormData extends Omit<Module, 'id'> {
  lessons: (Omit<Lesson, 'id'> & { content: LessonContent })[];
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
