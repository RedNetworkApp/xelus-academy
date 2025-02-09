import { Metadata } from 'next';
import { InstructorDashboardData } from '@/types/instructor';
import InstructorStats from '@/components/instructor/InstructorStats';
import CourseAnalytics from '@/components/instructor/CourseAnalytics';
import CourseList from '@/components/instructor/CourseList';
import RecentReviews from '@/components/instructor/RecentReviews';
import EarningsChart from '@/components/instructor/EarningsChart';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Instructor Dashboard - Xelus Academy',
  description: 'Manage your courses and track your performance as an instructor.',
};

// This would typically come from an API
const getInstructorDashboard = async (): Promise<InstructorDashboardData> => {
  return {
    stats: {
      totalStudents: 1500,
      totalCourses: 5,
      totalRevenue: 12500,
      averageRating: 4.8,
      totalReviews: 350
    },
    courseAnalytics: [
      {
        courseId: '1',
        courseName: 'Web Development Fundamentals',
        enrollments: 500,
        revenue: 5000,
        rating: 4.7,
        completionRate: 75,
        studentEngagement: 82
      }
    ],
    publishedCourses: [
      {
        id: '1',
        title: 'Web Development Fundamentals',
        slug: 'web-development-fundamentals',
        description: 'Learn the basics of web development',
        category: 'development',
        instructor: {
          id: '1',
          name: 'John Doe',
          avatar: '/images/instructors/john-doe.jpg',
          bio: 'Senior Web Developer',
          expertise: ['Web Development'],
          rating: 4.8,
          totalStudents: 5000,
          totalCourses: 10
        },
        price: 49.99,
        duration: '6 weeks',
        level: 'Beginner',
        thumbnail: '/images/courses/web-dev.jpg',
        objectives: ['Learn HTML', 'Master CSS'],
        syllabus: [],
        rating: 4.7,
        studentsEnrolled: 1200
      }
    ],
    draftCourses: [],
    recentReviews: [
      {
        id: 'r1',
        courseId: '1',
        courseName: 'Web Development Fundamentals',
        studentName: 'Alice Johnson',
        rating: 5,
        comment: 'Excellent course! Very well explained and practical.',
        date: '2025-01-12T15:30:00Z'
      }
    ],
    earnings: [
      {
        period: 'Jan 2025',
        amount: 2500,
        students: 250
      }
    ]
  };
};

export default async function InstructorDashboardPage() {
  const dashboardData = await getInstructorDashboard();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <Link
            href="/instructor/courses/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create New Course
          </Link>
        </div>

        {/* Stats Overview */}
        <InstructorStats stats={dashboardData.stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Course Analytics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Course Analytics</h2>
            <CourseAnalytics analytics={dashboardData.courseAnalytics} />
          </div>

          {/* Earnings Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Earnings Overview</h2>
            <EarningsChart earnings={dashboardData.earnings} />
          </div>
        </div>

        {/* Course Management */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Your Courses</h2>
          <CourseList
            publishedCourses={dashboardData.publishedCourses}
            draftCourses={dashboardData.draftCourses}
          />
        </div>

        {/* Recent Reviews */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
          <RecentReviews reviews={dashboardData.recentReviews} />
        </div>
      </div>
    </div>
  );
}
