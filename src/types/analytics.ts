export interface AnalyticsPeriod {
  start: string;
  end: string;
  duration: 'day' | 'week' | 'month' | 'year';
}

export interface UserEngagement {
  activeUsers: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  averageSessionDuration: number;
  bounceRate: number;
  retentionRate: number;
}

export interface LearningMetrics {
  totalLearningTime: number;
  averageCompletionRate: number;
  averageQuizScore: number;
  certificatesEarned: number;
  coursesStarted: number;
  coursesCompleted: number;
}

export interface CoursePerformance {
  courseId: string;
  title: string;
  metrics: {
    enrollments: number;
    completions: number;
    averageRating: number;
    totalRevenue: number;
    averageCompletionTime: number;
    dropoffRate: number;
  };
  trends: {
    date: string;
    enrollments: number;
    completions: number;
    revenue: number;
  }[];
}

export interface CategoryPerformance {
  categoryId: string;
  name: string;
  metrics: {
    totalCourses: number;
    totalEnrollments: number;
    totalRevenue: number;
    averageRating: number;
    popularTopics: string[];
  };
}

export interface RevenueMetrics {
  totalRevenue: number;
  recurringRevenue: number;
  averageOrderValue: number;
  refundRate: number;
  revenueByCategory: {
    categoryId: string;
    name: string;
    revenue: number;
    percentage: number;
  }[];
  trends: {
    date: string;
    revenue: number;
    orders: number;
    refunds: number;
  }[];
}

export interface StudentMetrics {
  totalStudents: number;
  activeStudents: number;
  studentsByLevel: {
    level: string;
    count: number;
    percentage: number;
  }[];
  studentsByCountry: {
    country: string;
    count: number;
    percentage: number;
  }[];
  acquisitionChannels: {
    channel: string;
    count: number;
    percentage: number;
  }[];
}

export interface InstructorMetrics {
  totalInstructors: number;
  activeInstructors: number;
  topInstructors: {
    instructorId: string;
    name: string;
    totalStudents: number;
    totalCourses: number;
    averageRating: number;
    totalRevenue: number;
  }[];
}

export interface PlatformMetrics {
  totalCourses: number;
  totalCategories: number;
  totalLessons: number;
  totalQuizzes: number;
  totalAssignments: number;
  systemHealth: {
    uptime: number;
    responseTime: number;
    errorRate: number;
  };
}

export interface AnalyticsDashboardData {
  period: AnalyticsPeriod;
  userEngagement: UserEngagement;
  learningMetrics: LearningMetrics;
  coursePerformance: CoursePerformance[];
  categoryPerformance: CategoryPerformance[];
  revenueMetrics: RevenueMetrics;
  studentMetrics: StudentMetrics;
  instructorMetrics: InstructorMetrics;
  platformMetrics: PlatformMetrics;
}
