import { Metadata } from 'next';
import { StudentDashboardData } from '@/types/dashboard';
import DashboardStats from '@/components/dashboard/DashboardStats';
import EnrolledCourses from '@/components/dashboard/EnrolledCourses';
import RecentActivity from '@/components/dashboard/RecentActivity';
import Achievements from '@/components/dashboard/Achievements';

export const metadata: Metadata = {
  title: 'Student Dashboard - Xelus Academy',
  description: 'Track your learning progress and manage your courses.',
};

// This would typically come from an API
const getDashboardData = async (): Promise<StudentDashboardData> => {
  return {
    enrolledCourses: [
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
        studentsEnrolled: 1200,
        progress: {
          courseId: '1',
          progress: 45,
          lastAccessed: '2025-01-13T10:30:00Z',
          completedLessons: ['l1', 'l2'],
          currentLesson: 'l3'
        }
      }
    ],
    recentActivity: [
      {
        id: 'a1',
        type: 'lesson_completed',
        courseId: '1',
        courseName: 'Web Development Fundamentals',
        timestamp: '2025-01-13T10:30:00Z',
        details: 'Completed lesson: HTML Basics'
      }
    ],
    achievements: [
      {
        id: 'ach1',
        title: 'Fast Learner',
        description: 'Complete your first lesson',
        icon: '🚀',
        earnedDate: '2025-01-12T15:00:00Z'
      }
    ],
    learningStats: {
      totalCoursesEnrolled: 3,
      coursesCompleted: 1,
      totalHoursLearned: 25,
      certificatesEarned: 1
    }
  };
};

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Learning Stats */}
          <DashboardStats stats={dashboardData.learningStats} />
          
          {/* Enrolled Courses */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">My Courses</h2>
            <EnrolledCourses courses={dashboardData.enrolledCourses} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <RecentActivity activities={dashboardData.recentActivity} />
            </div>
            
            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Achievements</h2>
              <Achievements achievements={dashboardData.achievements} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
