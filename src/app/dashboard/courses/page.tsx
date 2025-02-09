import { Metadata } from 'next';
import { CourseProgress, LearningAnalytics } from '@/types/progress';
import CourseProgressList from '@/components/progress/CourseProgressList';
import LearningStats from '@/components/progress/LearningStats';
import Achievements from '@/components/progress/Achievements';

export const metadata: Metadata = {
  title: 'My Courses - Xelus Academy',
  description: 'Track your course progress and achievements.',
};

// This would typically come from an API
const getMyCourses = async (): Promise<{
  courses: CourseProgress[];
  analytics: LearningAnalytics;
}> => {
  return {
    courses: [
      {
        courseId: '1',
        userId: '1',
        enrollmentDate: '2025-01-01T00:00:00Z',
        lastAccessDate: '2025-01-12T10:30:00Z',
        completedLessons: ['1', '2', '3'],
        completedModules: ['1'],
        completedAssignments: ['1'],
        completedQuizzes: {
          '1': {
            quizId: '1',
            attemptNumber: 1,
            startTime: '2025-01-10T14:00:00Z',
            endTime: '2025-01-10T14:30:00Z',
            score: 85,
            maxScore: 100,
            passed: true,
            answers: [
              {
                questionId: '1',
                selectedOption: 'a',
                correct: true,
                timeSpent: 120
              }
            ]
          }
        },
        progress: 45,
        status: 'in_progress',
        timeSpent: 7200
      }
    ],
    analytics: {
      userId: '1',
      totalCoursesEnrolled: 5,
      totalCoursesCompleted: 2,
      totalTimeSpent: 86400,
      averageQuizScore: 88,
      completionRate: 40,
      learningStreak: 7,
      lastLearningDate: '2025-01-12T10:30:00Z',
      strongestTopics: ['Web Development', 'JavaScript'],
      weakestTopics: ['Database Design'],
      certificates: [
        {
          id: '1',
          courseId: '1',
          courseName: 'Web Development Fundamentals',
          issueDate: '2025-01-01T00:00:00Z',
          url: '/certificates/1',
          verified: true
        }
      ],
      achievements: [
        {
          id: '1',
          title: '7-Day Streak',
          description: 'Learned for 7 consecutive days',
          icon: '/icons/streak.svg',
          unlockedAt: '2025-01-12T00:00:00Z',
          type: 'streak'
        }
      ]
    }
  };
};

export default async function CoursesPage() {
  const { courses, analytics } = await getMyCourses();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
          <p className="mt-2 text-gray-600">
            Track your progress and continue learning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Course Progress List */}
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">My Courses</h2>
                <CourseProgressList courses={courses} />
              </section>

              {/* Achievements */}
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Achievements</h2>
                <Achievements achievements={analytics.achievements} />
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Learning Stats */}
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Learning Stats</h2>
                <LearningStats analytics={analytics} />
              </section>

              {/* Certificates */}
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Certificates</h2>
                <div className="space-y-4">
                  {analytics.certificates.map((certificate) => (
                    <div
                      key={certificate.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <h3 className="font-medium">{certificate.courseName}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Issued on{' '}
                        {new Date(certificate.issueDate).toLocaleDateString()}
                      </p>
                      <a
                        href={certificate.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                      >
                        View Certificate
                      </a>
                    </div>
                  ))}

                  {analytics.certificates.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      Complete a course to earn your first certificate!
                    </p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
