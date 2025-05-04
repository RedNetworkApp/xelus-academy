import { Metadata } from 'next';
import { AnalyticsDashboardData } from '@/types/analytics';
import DateRangePicker from '@/components/analytics/DateRangePicker';
import CoursePerformance from '@/components/instructor/metrics/CoursePerformance';
import CategoryInsights from '@/components/analytics/CategoryInsights';
import StudentAnalytics from '@/components/analytics/StudentAnalytics';
import InstructorAnalytics from '@/components/analytics/InstructorAnalytics';
import PlatformHealth from '@/components/analytics/PlatformHealth';

export const metadata: Metadata = {
  title: 'Admin Analytics - Xelus Academy',
  description: 'Comprehensive analytics dashboard for platform administrators.',
};

// Mock data for demonstration
const mockData: AnalyticsDashboardData = {
  period: {
    start: '2024-01-01',
    end: '2024-01-31',
  },
  overview: {
    totalRevenue: 55000,
    totalStudents: 2500,
    activeStudents: 1800,
    coursesCompleted: 580,
  },
  coursePerformance: [
    {
      date: '2024-01-01',
      enrollments: 150,
      completions: 75,
      revenue: 7500,
    },
    {
      date: '2024-01-08',
      enrollments: 180,
      completions: 90,
      revenue: 9000,
    },
    {
      date: '2024-01-15',
      enrollments: 220,
      completions: 110,
      revenue: 11000,
    },
    {
      date: '2024-01-22',
      enrollments: 250,
      completions: 125,
      revenue: 12500,
    },
    {
      date: '2024-01-29',
      enrollments: 300,
      completions: 150,
      revenue: 15000,
    },
  ],
  categoryPerformance: [
    {
      category: 'Development',
      enrollments: 500,
      revenue: 25000,
      avgRating: 4.5,
    },
    {
      category: 'Farming',
      enrollments: 300,
      revenue: 15000,
      avgRating: 4.7,
    },
    {
      category: 'Mobile Repair',
      enrollments: 200,
      revenue: 10000,
      avgRating: 4.3,
    },
  ],
  studentAnalytics: {
    totalStudents: 2500,
    activeStudents: 1800,
    completionRate: 72,
    satisfactionScore: 4.6,
  },
  instructorAnalytics: {
    totalInstructors: 50,
    activeInstructors: 45,
    avgCourseRating: 4.5,
    totalEarnings: 150000,
  },
  platformHealth: {
    uptime: 99.9,
    responseTime: 250,
    errorRate: 0.1,
    activeUsers: 500,
  },
};

export default function AdminAnalyticsPage() {
  const data = mockData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Platform Analytics</h1>
          <DateRangePicker
            startDate={data.period.start}
            endDate={data.period.end}
          />
        </div>
        
        {/* Platform Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <PlatformHealth data={data.platformHealth} />
        </div>

        {/* Course & Category Performance */}
        <div className="grid grid-cols-1 gap-8">
          <CoursePerformance data={data.coursePerformance} />
          <CategoryInsights data={data.categoryPerformance} />
        </div>

        {/* User Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <StudentAnalytics data={data.studentAnalytics} />
          <InstructorAnalytics data={data.instructorAnalytics} />
        </div>
      </div>
    </div>
  );
}
