'use client';

import { LearningAnalytics } from '@/types/progress';

interface Props {
  analytics: LearningAnalytics;
}

export default function LearningStats({ analytics }: Props) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    if (hours < 24) {
      return `${hours} hours`;
    }
    const days = Math.floor(hours / 24);
    return `${days} days`;
  };

  return (
    <div className="space-y-6">
      {/* Learning Streak */}
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div className="text-2xl font-bold text-blue-600">
          {analytics.learningStreak} Day Streak
        </div>
        <p className="text-sm text-blue-600 mt-1">Keep it going!</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Stat
          label="Courses Enrolled"
          value={analytics.totalCoursesEnrolled.toString()}
        />
        <Stat
          label="Courses Completed"
          value={analytics.totalCoursesCompleted.toString()}
        />
        <Stat
          label="Time Learning"
          value={formatDuration(analytics.totalTimeSpent)}
        />
        <Stat
          label="Avg. Quiz Score"
          value={`${Math.round(analytics.averageQuizScore)}%`}
        />
      </div>

      {/* Topics Analysis */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Strongest Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {analytics.strongestTopics.map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Areas for Improvement
          </h3>
          <div className="flex flex-wrap gap-2">
            {analytics.weakestTopics.map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Last Learning Activity */}
      <div className="border-t pt-4">
        <p className="text-sm text-gray-500">
          Last activity:{' '}
          {new Date(analytics.lastLearningDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}

interface StatProps {
  label: string;
  value: string;
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-gray-900">{value}</dd>
    </div>
  );
}
