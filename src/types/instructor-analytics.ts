export interface InstructorDashboardData {
  overview: InstructorOverview;
  courseMetrics: CourseMetrics[];
  studentMetrics: StudentMetrics;
  engagementMetrics: EngagementMetrics;
  revenueMetrics: RevenueMetrics;
  feedbackMetrics: FeedbackMetrics;
  period: {
    start: string;
    end: string;
  };
}

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
    rating: number;
  }[];
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
    };
  };
  trends: {
    date: string;
    enrollments: number;
    completions: number;
    revenue: number;
    rating: number;
  }[];
}

export interface StudentMetrics {
  demographics: {
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
  behavior: {
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
  retention: {
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
}

export interface EngagementMetrics {
  overall: {
    averageTimePerSession: number;
    averageSessionsPerWeek: number;
    averageCompletionTime: number;
    interactionRate: number;
  };
  content: {
    mostWatchedVideos: {
      videoId: string;
      title: string;
      views: number;
      averageWatchTime: number;
      completionRate: number;
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
}

export interface RevenueMetrics {
  total: number;
  byPeriod: {
    date: string;
    revenue: number;
    enrollments: number;
    refunds: number;
  }[];
  byCourse: {
    courseId: string;
    title: string;
    revenue: number;
    percentage: number;
    enrollments: number;
    averagePrice: number;
  }[];
  byCountry: {
    country: string;
    revenue: number;
    percentage: number;
    enrollments: number;
  }[];
  projections: {
    nextMonth: number;
    nextQuarter: number;
    nextYear: number;
  };
}

export interface FeedbackMetrics {
  overall: {
    averageRating: number;
    totalReviews: number;
    sentimentScore: number;
    recommendationRate: number;
  };
  byRating: {
    rating: number;
    count: number;
    percentage: number;
  }[];
  recentReviews: {
    reviewId: string;
    courseId: string;
    courseName: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
    response?: {
      comment: string;
      date: string;
    };
  }[];
  commonFeedback: {
    category: string;
    sentiment: 'positive' | 'negative';
    count: number;
    percentage: number;
    keywords: string[];
  }[];
  improvement: {
    category: string;
    score: number;
    trend: 'up' | 'down' | 'stable';
    suggestions: string[];
  }[];
}
