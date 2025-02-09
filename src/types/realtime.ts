export interface ProgressEvent {
  type: 'lesson_start' | 'lesson_complete' | 'quiz_attempt' | 'assignment_submit';
  userId: string;
  courseId: string;
  moduleId?: string;
  lessonId?: string;
  quizId?: string;
  assignmentId?: string;
  timestamp: string;
  data: {
    progress?: number;
    timeSpent?: number;
    score?: number;
    status?: string;
  };
}

export interface ProgressUpdate {
  userId: string;
  courseId: string;
  timestamp: string;
  updates: {
    overallProgress: number;
    moduleProgress?: {
      moduleId: string;
      progress: number;
      status: 'locked' | 'unlocked' | 'in_progress' | 'completed';
    };
    lessonProgress?: {
      lessonId: string;
      progress: number;
      status: 'not_started' | 'in_progress' | 'completed';
    };
    quizProgress?: {
      quizId: string;
      score: number;
      passed: boolean;
    };
    assignmentProgress?: {
      assignmentId: string;
      status: 'draft' | 'submitted' | 'graded';
      grade?: number;
    };
  };
}

export interface ProgressSubscription {
  userId: string;
  courseId: string;
  callback: (update: ProgressUpdate) => void;
}

export interface VideoProgress {
  currentTime: number;
  duration: number;
  buffered: number;
  playbackRate: number;
  volume: number;
  quality: string;
  status: 'playing' | 'paused' | 'ended' | 'buffering' | 'error';
}

export interface LearningSession {
  sessionId: string;
  userId: string;
  courseId: string;
  startTime: string;
  lastActive: string;
  deviceInfo: {
    type: string;
    browser: string;
    os: string;
  };
  progress: {
    lessonsCompleted: string[];
    currentLesson?: string;
    timeSpent: number;
  };
}
