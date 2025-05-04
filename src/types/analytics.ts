export interface CoursePerformanceData {
  date: string;
  enrollments: number;
  completions: number;
  revenue: number;
}

export interface AnalyticsPeriod {
  start: string;
  end: string;
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

export interface CategoryPerformance {
  category: string;
  enrollments: number;
  revenue: number;
  avgRating: number;
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

export interface StudentAnalytics {
  totalStudents: number;
  activeStudents: number;
  completionRate: number;
  satisfactionScore: number;
}

export interface InstructorAnalytics {
  totalInstructors: number;
  activeInstructors: number;
  avgCourseRating: number;
  totalEarnings: number;
}

export interface PlatformHealth {
  uptime: number;
  responseTime: number;
  errorRate: number;
  activeUsers: number;
}

export interface AnalyticsDashboardData {
  period: {
    start: string;
    end: string;
  };
  overview: {
    totalRevenue: number;
    totalStudents: number;
    activeStudents: number;
    coursesCompleted: number;
  };
  coursePerformance: CoursePerformanceData[];
  categoryPerformance: CategoryPerformance[];
  studentAnalytics: StudentAnalytics;
  instructorAnalytics: InstructorAnalytics;
  platformHealth: PlatformHealth;
}
