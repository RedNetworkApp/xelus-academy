import { Course } from './course';

export interface CourseProgress {
  courseId: string;
  progress: number; // Percentage completed
  lastAccessDate: string; // ISO date string
  completedLessons: string[]; // Array of lesson IDs
  currentLesson: string; // Current lesson ID
  userId: string;
  startDate: string;
  certificate?: {
    id: string;
    issueDate: string;
    url: string;
  };
}

export interface StudentDashboardData {
  enrolledCourses: (Course & { progress: CourseProgress })[];
  recentActivity: {
    id: string;
    type: 'lesson_completed' | 'course_started' | 'certificate_earned';
    courseId: string;
    courseName: string;
    timestamp: string;
    details?: string;
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    earnedDate: string;
  }[];
  learningStats: {
    totalCoursesEnrolled: number;
    coursesCompleted: number;
    totalHoursLearned: number;
    certificatesEarned: number;
  };
}
