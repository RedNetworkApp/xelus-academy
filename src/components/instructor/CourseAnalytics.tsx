import { CourseAnalytics as Analytics } from '@/types/instructor';

interface Props {
  analytics: Analytics[];
}

export default function CourseAnalytics({ analytics }: Props) {
  return (
    <div className="space-y-6">
      {analytics.map((course) => (
        <div key={course.courseId} className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">{course.courseName}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Enrollments</p>
              <p className="text-lg font-semibold">
                {course.enrollments.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-lg font-semibold">
                ${course.revenue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rating</p>
              <div className="flex items-center">
                <span className="text-lg font-semibold mr-1">
                  {course.rating.toFixed(1)}
                </span>
                <span className="text-yellow-400">★</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-lg font-semibold">{course.completionRate}%</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Student Engagement</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${course.studentEngagement}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {course.studentEngagement}% average completion
            </p>
          </div>
        </div>
      ))}

      {analytics.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No analytics data available
        </p>
      )}
    </div>
  );
}
