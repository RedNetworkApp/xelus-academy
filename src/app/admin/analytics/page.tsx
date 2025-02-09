import { Metadata } from 'next';
import { AnalyticsDashboardData } from '@/types/analytics';
import EngagementMetrics from '@/components/analytics/EngagementMetrics';
import LearningOverview from '@/components/analytics/LearningOverview';
import CoursePerformance from '@/components/analytics/CoursePerformance';
import CategoryInsights from '@/components/analytics/CategoryInsights';
import RevenueAnalytics from '@/components/analytics/RevenueAnalytics';
import StudentAnalytics from '@/components/analytics/StudentAnalytics';
import InstructorAnalytics from '@/components/analytics/InstructorAnalytics';
import PlatformHealth from '@/components/analytics/PlatformHealth';
import DateRangePicker from '@/components/analytics/DateRangePicker';

export const metadata: Metadata = {
  title: 'Analytics Dashboard - Xelus Academy',
  description: 'Comprehensive analytics and insights for Xelus Academy.',
};

// This would typically come from an API
const getAnalyticsData = async (
  startDate: string,
  endDate: string
): Promise<AnalyticsDashboardData> => {
  return {
    period: {
      start: startDate,
      end: endDate,
      duration: 'month',
    },
    userEngagement: {
      activeUsers: {
        daily: 1200,
        weekly: 5000,
        monthly: 15000,
      },
      averageSessionDuration: 3600,
      bounceRate: 25,
      retentionRate: 75,
    },
    learningMetrics: {
      totalLearningTime: 360000,
      averageCompletionRate: 68,
      averageQuizScore: 82,
      certificatesEarned: 450,
      coursesStarted: 850,
      coursesCompleted: 580,
    },
    coursePerformance: [
      {
        courseId: '1',
        title: 'Web Development Fundamentals',
        metrics: {
          enrollments: 500,
          completions: 350,
          averageRating: 4.8,
          totalRevenue: 24999.99,
          averageCompletionTime: 86400,
          dropoffRate: 15,
        },
        trends: [
          {
            date: '2025-01-01',
            enrollments: 50,
            completions: 35,
            revenue: 2499.99,
          },
          // More trend data...
        ],
      },
      // More courses...
    ],
    categoryPerformance: [
      {
        categoryId: '1',
        name: 'Development',
        metrics: {
          totalCourses: 150,
          totalEnrollments: 7500,
          totalRevenue: 374999.99,
          averageRating: 4.6,
          popularTopics: ['Web Development', 'JavaScript', 'React'],
        },
      },
      // More categories...
    ],
    revenueMetrics: {
      totalRevenue: 999999.99,
      recurringRevenue: 749999.99,
      averageOrderValue: 79.99,
      refundRate: 3,
      revenueByCategory: [
        {
          categoryId: '1',
          name: 'Development',
          revenue: 374999.99,
          percentage: 37.5,
        },
        // More categories...
      ],
      trends: [
        {
          date: '2025-01-01',
          revenue: 32258.06,
          orders: 403,
          refunds: 12,
        },
        // More trend data...
      ],
    },
    studentMetrics: {
      totalStudents: 25000,
      activeStudents: 18750,
      studentsByLevel: [
        {
          level: 'Beginner',
          count: 10000,
          percentage: 40,
        },
        // More levels...
      ],
      studentsByCountry: [
        {
          country: 'United States',
          count: 7500,
          percentage: 30,
        },
        // More countries...
      ],
      acquisitionChannels: [
        {
          channel: 'Organic Search',
          count: 8750,
          percentage: 35,
        },
        // More channels...
      ],
    },
    instructorMetrics: {
      totalInstructors: 250,
      activeInstructors: 200,
      topInstructors: [
        {
          instructorId: '1',
          name: 'John Doe',
          totalStudents: 5000,
          totalCourses: 12,
          averageRating: 4.9,
          totalRevenue: 249999.99,
        },
        // More instructors...
      ],
    },
    platformMetrics: {
      totalCourses: 500,
      totalCategories: 20,
      totalLessons: 5000,
      totalQuizzes: 2500,
      totalAssignments: 1500,
      systemHealth: {
        uptime: 99.99,
        responseTime: 250,
        errorRate: 0.01,
      },
    },
  };
};

export default async function AnalyticsDashboardPage() {
  const startDate = '2025-01-01';
  const endDate = '2025-01-31';
  const data = await getAnalyticsData(startDate, endDate);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Comprehensive insights and performance metrics
            </p>
          </div>
          <DateRangePicker
            startDate={data.period.start}
            endDate={data.period.end}
          />
        </div>

        {/* Dashboard Grid */}
        <div className="space-y-8">
          {/* Engagement & Learning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EngagementMetrics data={data.userEngagement} />
            <LearningOverview data={data.learningMetrics} />
          </div>

          {/* Course & Category Performance */}
          <div className="grid grid-cols-1 gap-8">
            <CoursePerformance data={data.coursePerformance} />
            <CategoryInsights data={data.categoryPerformance} />
          </div>

          {/* Revenue & Students */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RevenueAnalytics data={data.revenueMetrics} />
            <StudentAnalytics data={data.studentMetrics} />
          </div>

          {/* Instructors & Platform Health */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InstructorAnalytics data={data.instructorMetrics} />
            <PlatformHealth data={data.platformMetrics} />
          </div>
        </div>
      </div>
    </div>
  );
}
