export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  expertise: string[];
  rating: number;
  studentsTaught: number;
  courses: string[];
  totalStudents: number;
  totalCourses: number;
}

export interface InstructorDashboardData {
  courseMetrics?: CourseMetrics;
  studentMetrics?: StudentMetrics;
  engagementMetrics?: EngagementMetrics;
  revenueMetrics?: RevenueMetrics;
  feedbackMetrics?: FeedbackMetrics;
  recentReviews?: Review[];
  
  // Additional fields used in dashboard
  stats?: {
    totalStudents: number;
    totalCourses: number;
    totalRevenue: number;
    averageRating: number;
    totalReviews: number;
  };
  courseAnalytics?: Array<{
    courseId: string;
    courseName: string;
    enrollments: number;
    revenue: number;
    rating: number;
    completionRate: number;
    studentEngagement?: number;
    slug?: string;
  }>;
  earnings?: {
    monthly: {
      month: string;
      amount: number;
    }[];
    total: number;
    projected: number;
  };
  publishedCourses?: Array<{
    id: string;
    title: string;
    students: number;
    rating: number;
    revenue: number;
    lastUpdated: string;
    slug?: string;
    description?: string;
    category?: string;
    instructor?: any;
    price?: number;
    duration?: string;
    level?: string;
    thumbnail?: string;
    objectives?: string[];
    syllabus?: any[];
    studentsEnrolled?: number;
  }>;
  draftCourses?: Array<{
    id: string;
    title: string;
    completionPercentage: number;
    lastEdited: string;
  }>;
}

export interface Review {
  id: string;
  courseId: string;
  courseName: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CourseMetrics {
  totalEnrollments: number;
  averageRating: number;
  completionRate: number;
  trends: {
    date: string;
    enrollments: number;
    completions: number;
    revenue: number;
    rating: number;
  }[];
}

export interface StudentMetrics {
  totalStudents: number;
  activeStudents: number;
  completionRate: number;
  demographics: {
    ageGroup: {
      label: string;
      value: number;
    }[];
    location: {
      country: string;
      count: number;
    }[];
  };
}

export interface EngagementMetrics {
  averageWatchTime: number;
  averageCompletionTime: number;
  content: {
    mostWatchedVideos: {
      title: string;
      views: number;
      duration: string;
    }[];
    popularSections: {
      title: string;
      engagement: number;
    }[];
  };
}

export interface RevenueMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  averageOrderValue: number;
  trends: {
    date: string;
    revenue: number;
  }[];
}

export interface FeedbackMetrics {
  averageRating: number;
  totalReviews: number;
  byRating: {
    rating: number;
    count: number;
  }[];
  sentimentAnalysis: {
    positive: number;
    neutral: number;
    negative: number;
  };
}
