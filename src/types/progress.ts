export interface CourseProgress {
  courseId: string;
  userId: string;
  enrollmentDate: string;
  lastAccessDate: string;
  completedLessons: string[];
  completedModules: string[];
  completedAssignments: string[];
  completedQuizzes: Record<string, QuizAttempt>;
  progress: number; // Percentage of course completed
  certificateId?: string;
  certificateUrl?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  timeSpent: number; // Total time spent in seconds
}

export interface ModuleProgress {
  moduleId: string;
  title: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
  status: 'locked' | 'unlocked' | 'in_progress' | 'completed';
}

export interface LessonProgress {
  lessonId: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  completed: boolean;
  lastAccessDate?: string;
  timeSpent: number; // Time spent in seconds
  status: 'not_started' | 'in_progress' | 'completed';
  videoProgress?: {
    currentTime: number;
    duration: number;
    watched: boolean;
  };
}

export interface QuizAttempt {
  quizId: string;
  attemptNumber: number;
  startTime: string;
  endTime: string;
  score: number;
  maxScore: number;
  passed: boolean;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  selectedOption: string;
  correct: boolean;
  timeSpent: number; // Time spent on this question in seconds
}

export interface AssignmentSubmission {
  assignmentId: string;
  submissionDate: string;
  status: 'draft' | 'submitted' | 'graded';
  files: {
    name: string;
    url: string;
    size: number;
  }[];
  grade?: {
    score: number;
    maxScore: number;
    feedback: string;
    gradedBy: string;
    gradedAt: string;
  };
}

export interface LearningAnalytics {
  userId: string;
  totalCoursesEnrolled: number;
  totalCoursesCompleted: number;
  totalTimeSpent: number; // Total time spent learning in seconds
  averageQuizScore: number;
  completionRate: number; // Percentage of enrolled courses completed
  learningStreak: number; // Consecutive days of learning
  lastLearningDate: string;
  strongestTopics: string[];
  weakestTopics: string[];
  certificates: Certificate[];
  achievements: Achievement[];
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  issueDate: string;
  expiryDate?: string;
  url: string;
  verified: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  type: 'course_completion' | 'quiz_master' | 'streak' | 'engagement';
  progress?: {
    current: number;
    target: number;
  };
}
