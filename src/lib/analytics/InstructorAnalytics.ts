import {
  InstructorDashboardData,
  CourseMetrics,
  StudentMetrics,
  EngagementMetrics,
  RevenueMetrics,
  FeedbackMetrics,
} from '@/types/instructor-analytics';

export class InstructorAnalytics {
  private static instance: InstructorAnalytics;

  private constructor() {}

  public static getInstance(): InstructorAnalytics {
    if (!InstructorAnalytics.instance) {
      InstructorAnalytics.instance = new InstructorAnalytics();
    }
    return InstructorAnalytics.instance;
  }

  public async getDashboardData(
    instructorId: string,
    period: { start: string; end: string }
  ): Promise<InstructorDashboardData> {
    const [
      overview,
      courseMetrics,
      studentMetrics,
      engagementMetrics,
      revenueMetrics,
      feedbackMetrics,
    ] = await Promise.all([
      this.getInstructorOverview(instructorId, period),
      this.getCourseMetrics(instructorId, period),
      this.getStudentMetrics(instructorId, period),
      this.getEngagementMetrics(instructorId, period),
      this.getRevenueMetrics(instructorId, period),
      this.getFeedbackMetrics(instructorId, period),
    ]);

    return {
      overview,
      courseMetrics,
      studentMetrics,
      engagementMetrics,
      revenueMetrics,
      feedbackMetrics,
      period,
    };
  }

  private async getInstructorOverview(
    instructorId: string,
    period: { start: string; end: string }
  ) {
    // This would fetch from an API in production
    return {
      totalStudents: 1500,
      totalCourses: 5,
      totalRevenue: 75000,
      averageRating: 4.7,
      activeStudents: 850,
      completionRate: 0.75,
      studentSatisfaction: 0.92,
      trends: this.generateTrendData(period),
    };
  }

  private async getCourseMetrics(
    instructorId: string,
    period: { start: string; end: string }
  ): Promise<CourseMetrics[]> {
    // This would fetch from an API in production
    return [
      {
        courseId: '1',
        title: 'Web Development Fundamentals',
        metrics: {
          enrollments: 500,
          activeStudents: 300,
          completions: 200,
          averageProgress: 0.65,
          averageRating: 4.8,
          revenue: 25000,
          refundRate: 0.02,
          dropoffRate: 0.15,
        },
        engagement: {
          videosWatched: 1500,
          assignmentsSubmitted: 800,
          quizzesTaken: 600,
          discussionPosts: 300,
          averageTimeSpent: 45,
        },
        performance: {
          averageQuizScore: 85,
          averageAssignmentScore: 88,
          studentProgress: {
            notStarted: 50,
            inProgress: 250,
            completed: 200,
          },
        },
        trends: this.generateTrendData(period),
      },
    ];
  }

  private async getStudentMetrics(
    instructorId: string,
    period: { start: string; end: string }
  ): Promise<StudentMetrics> {
    return {
      demographics: {
        countries: [
          { country: 'United States', count: 500, percentage: 0.33 },
          { country: 'India', count: 300, percentage: 0.2 },
          { country: 'United Kingdom', count: 200, percentage: 0.13 },
        ],
        languages: [
          { language: 'English', count: 900, percentage: 0.6 },
          { language: 'Spanish', count: 300, percentage: 0.2 },
          { language: 'Hindi', count: 150, percentage: 0.1 },
        ],
        levels: [
          { level: 'Beginner', count: 600, percentage: 0.4 },
          { level: 'Intermediate', count: 600, percentage: 0.4 },
          { level: 'Advanced', count: 300, percentage: 0.2 },
        ],
      },
      behavior: {
        timeOfDay: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          count: Math.floor(Math.random() * 100),
          percentage: Math.random(),
        })),
        daysOfWeek: [
          { day: 'Monday', count: 200, percentage: 0.15 },
          { day: 'Tuesday', count: 250, percentage: 0.18 },
          { day: 'Wednesday', count: 300, percentage: 0.22 },
          { day: 'Thursday', count: 250, percentage: 0.18 },
          { day: 'Friday', count: 200, percentage: 0.15 },
          { day: 'Saturday', count: 100, percentage: 0.07 },
          { day: 'Sunday', count: 70, percentage: 0.05 },
        ],
        deviceTypes: [
          { device: 'Desktop', count: 800, percentage: 0.53 },
          { device: 'Mobile', count: 500, percentage: 0.33 },
          { device: 'Tablet', count: 200, percentage: 0.14 },
        ],
      },
      retention: {
        overall: 0.75,
        byWeek: Array.from({ length: 12 }, (_, i) => ({
          week: i + 1,
          rate: Math.random() * 0.3 + 0.7,
        })),
        byMonth: Array.from({ length: 6 }, (_, i) => ({
          month: new Date(2024, i, 1).toISOString().slice(0, 7),
          rate: Math.random() * 0.3 + 0.7,
        })),
      },
    };
  }

  private async getEngagementMetrics(
    instructorId: string,
    period: { start: string; end: string }
  ): Promise<EngagementMetrics> {
    return {
      overall: {
        averageTimePerSession: 45,
        averageSessionsPerWeek: 3.5,
        averageCompletionTime: 60,
        interactionRate: 0.75,
      },
      content: {
        mostWatchedVideos: [
          {
            videoId: '1',
            title: 'Introduction to Web Development',
            views: 1200,
            averageWatchTime: 15,
            completionRate: 0.85,
          },
        ],
        mostAttemptedQuizzes: [
          {
            quizId: '1',
            title: 'HTML Basics Quiz',
            attempts: 800,
            averageScore: 85,
            passRate: 0.9,
          },
        ],
        mostSubmittedAssignments: [
          {
            assignmentId: '1',
            title: 'Build a Simple Website',
            submissions: 500,
            averageScore: 88,
            onTimeSubmissionRate: 0.95,
          },
        ],
      },
      discussions: {
        totalPosts: 1500,
        totalResponses: 3000,
        averageResponseTime: 120,
        mostActiveThreads: [
          {
            threadId: '1',
            title: 'Best Practices for Responsive Design',
            posts: 50,
            participants: 25,
            lastActivity: new Date().toISOString(),
          },
        ],
      },
    };
  }

  private async getRevenueMetrics(
    instructorId: string,
    period: { start: string; end: string }
  ): Promise<RevenueMetrics> {
    return {
      total: 75000,
      byPeriod: this.generateRevenueData(period),
      byCourse: [
        {
          courseId: '1',
          title: 'Web Development Fundamentals',
          revenue: 25000,
          percentage: 0.33,
          enrollments: 500,
          averagePrice: 50,
        },
      ],
      byCountry: [
        {
          country: 'United States',
          revenue: 30000,
          percentage: 0.4,
          enrollments: 600,
        },
      ],
      projections: {
        nextMonth: 15000,
        nextQuarter: 45000,
        nextYear: 180000,
      },
    };
  }

  private async getFeedbackMetrics(
    instructorId: string,
    period: { start: string; end: string }
  ): Promise<FeedbackMetrics> {
    return {
      overall: {
        averageRating: 4.7,
        totalReviews: 1000,
        sentimentScore: 0.85,
        recommendationRate: 0.92,
      },
      byRating: [
        { rating: 5, count: 700, percentage: 0.7 },
        { rating: 4, count: 200, percentage: 0.2 },
        { rating: 3, count: 50, percentage: 0.05 },
        { rating: 2, count: 30, percentage: 0.03 },
        { rating: 1, count: 20, percentage: 0.02 },
      ],
      recentReviews: [
        {
          reviewId: '1',
          courseId: '1',
          courseName: 'Web Development Fundamentals',
          rating: 5,
          comment: 'Excellent course! Very comprehensive and well-structured.',
          date: new Date().toISOString(),
          helpful: 25,
        },
      ],
      commonFeedback: [
        {
          category: 'Content Quality',
          sentiment: 'positive',
          count: 800,
          percentage: 0.8,
          keywords: ['clear', 'comprehensive', 'well-structured'],
        },
      ],
      improvement: [
        {
          category: 'Exercise Difficulty',
          score: 4.2,
          trend: 'up',
          suggestions: ['Add more advanced exercises', 'Include more real-world examples'],
        },
      ],
    };
  }

  private generateTrendData(period: { start: string; end: string }) {
    const days = Math.ceil(
      (new Date(period.end).getTime() - new Date(period.start).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return Array.from({ length: days }, (_, i) => {
      const date = new Date(period.start);
      date.setDate(date.getDate() + i);
      return {
        date: date.toISOString().slice(0, 10),
        students: Math.floor(Math.random() * 50) + 100,
        revenue: Math.floor(Math.random() * 1000) + 2000,
        rating: (Math.random() * 0.5 + 4.5).toFixed(1),
      };
    });
  }

  private generateRevenueData(period: { start: string; end: string }) {
    const days = Math.ceil(
      (new Date(period.end).getTime() - new Date(period.start).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return Array.from({ length: days }, (_, i) => {
      const date = new Date(period.start);
      date.setDate(date.getDate() + i);
      return {
        date: date.toISOString().slice(0, 10),
        revenue: Math.floor(Math.random() * 1000) + 2000,
        enrollments: Math.floor(Math.random() * 20) + 10,
        refunds: Math.floor(Math.random() * 2),
      };
    });
  }
}
