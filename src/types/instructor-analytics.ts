export interface InstructorOverview {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  averageRating: number;
  activeStudents: number;
  completionRate: number;
  studentSatisfaction: number;
  trends: {
    date: string;
    students: number;
    revenue: number;
    rating: number | string;
  }[];
}

export interface StudentAnalytics {
  enrollments?: {
    date: string;
    count: number;
  }[];
  completions?: {
    date: string;
    count: number;
  }[];
  demographics?: {
    ageGroups?: {
      label: string;
      value: number;
    }[];
    locations?: {
      country: string;
      count: number;
    }[];
  };
  totalStudents?: number;
  activeStudents?: number;
  completionRate?: number;
  satisfactionScore?: number;
}

export interface InstructorAnalytics {
  courseMetrics: CourseMetrics;
  studentMetrics: StudentMetrics;
  engagementMetrics: EngagementMetrics;
  revenueMetrics: RevenueMetrics;
  feedbackMetrics: FeedbackMetrics;
}

export interface CoursePerformanceData {
  date: string;
  enrollments: number;
  completions: number;
  revenue: number;
}

export interface InstructorDashboardData {
  overview: InstructorOverview;
  studentMetrics: StudentMetrics;
  engagementMetrics: EngagementMetrics;
  revenueMetrics: RevenueMetrics;
  feedbackMetrics: FeedbackMetrics;
  courseMetrics: CourseMetrics[];
  period: { start: string; end: string };
}

export interface CourseMetrics {
  courseId: string;
  title: string;
  metrics: {
    enrollments: number;
    activeStudents: number;
    completions: number;
    averageProgress: number;
    averageRating: number;
    revenue: number;
    refundRate: number;
    dropoffRate: number;
  };
  engagement: {
    videosWatched: number;
    assignmentsSubmitted: number;
    quizzesTaken: number;
    discussionPosts: number;
    averageTimeSpent: number;
  };
  performance: {
    averageQuizScore: number;
    averageAssignmentScore: number;
    studentProgress: {
      notStarted: number;
      inProgress: number;
      completed: number;
    }
  };
  trends: {
    date: string;
    students: number;
    revenue: number;
    rating: number | string;
  }[];
}

export interface StudentMetrics {
  demographics?: {
    countries: {
      country: string;
      count: number;
      percentage: number;
    }[];
    languages: {
      language: string;
      count: number;
      percentage: number;
    }[];
    levels: {
      level: string;
      count: number;
      percentage: number;
    }[];
  };
  behavior?: {
    timeOfDay: {
      hour: number;
      count: number;
      percentage: number;
    }[];
    daysOfWeek: {
      day: string;
      count: number;
      percentage: number;
    }[];
    deviceTypes: {
      device: string;
      count: number;
      percentage: number;
    }[];
  };
  retention?: {
    overall: number;
    byWeek: {
      week: number;
      rate: number;
    }[];
    byMonth: {
      month: string;
      rate: number;
    }[];
  };
  totalStudents?: number;
  activeStudents?: number;
  completionRate?: number;
  satisfactionScore?: number;
}

export interface EngagementMetrics {
  overall?: {
    averageTimePerSession: number;
    averageSessionsPerWeek: number;
    averageCompletionTime: number;
    interactionRate: number;
  };
  videoEngagement?: {
    totalHoursWatched: number;
    averageWatchTime: number;
    completionRate: number;
    mostWatchedVideos: {
      videoId: string;
      title: string;
      views: number;
      averageWatchTime?: number;
      completionRate: number;
      duration?: string;
    }[];
    mostAttemptedQuizzes: {
      quizId: string;
      title: string;
      attempts: number;
      averageScore: number;
      passRate: number;
    }[];
    mostSubmittedAssignments: {
      assignmentId: string;
      title: string;
      submissions: number;
      averageScore: number;
      onTimeSubmissionRate: number;
    }[];
  };
  discussions: {
    totalPosts: number;
    totalResponses: number;
    averageResponseTime: number;
    mostActiveThreads: {
      threadId: string;
      title: string;
      posts: number;
      participants: number;
      lastActivity: string;
    }[];
  };
  averageWatchTime?: number;
  averageCompletionTime?: number;
  content?: {
    mostWatchedVideos: {
      videoId: string;
      title: string;
      views: number;
      averageWatchTime: number;
      completionRate: number;
      duration?: string;
    }[];
    mostAttemptedQuizzes?: {
      quizId: string;
      title: string;
      attempts: number;
      averageScore: number;
      passRate: number;
    }[];
    mostSubmittedAssignments?: {
      assignmentId: string;
      title: string;
      submissions: number;
      averageScore: number;
      onTimeSubmissionRate: number;
    }[];
    popularSections?: {
      title: string;
      engagement: number;
    }[];
  };
}

export interface RevenueMetrics {
  total?: number;
  totalRevenue?: number;
  monthlyRevenue?: number;
  averageOrderValue?: number;
  projections: {
    nextMonth: number;
    nextQuarter: number;
    nextYear?: number;
  };
  byPeriod: {
    date: string;
    revenue: number;
  }[];
  byCourse?: {
    courseId: string;
    title: string;
    revenue: number;
    percentage: number;
    enrollments: number;
    averagePrice: number;
  }[];
  byCountry?: {
    country: string;
    revenue: number;
    percentage: number;
    enrollments: number;
  }[];
}

export interface FeedbackMetrics {
  overall: {
    recommendationRate: number;
    averageRating?: number;
    totalReviews?: number;
    sentimentScore?: number;
  };
  byRating: {
    rating: number;
    count: number;
    percentage: number;
  }[];
  sentimentAnalysis?: {
    positive: number;
    neutral: number;
    negative: number;
  };
  recentReviews?: {
    reviewId: string;
    courseId: string;
    courseName: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
  }[];
  commonFeedback?: {
    category: string;
    sentiment: string;
    count: number;
    percentage: number;
    keywords: string[];
  }[];
  improvement?: {
    category: string;
    score: number;
    trend: string;
    suggestions: string[];
  }[];
  averageRating?: number;
  totalReviews?: number;
}

export interface InstructorStats {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews?: number;
  activeStudents?: number;
  completionRate?: number;
  studentSatisfaction?: number;
}
