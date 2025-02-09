'use client';

import { Achievement } from '@/types/progress';

interface Props {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: Props) {
  const getAchievementColor = (type: Achievement['type']) => {
    switch (type) {
      case 'course_completion':
        return 'bg-green-100 text-green-800 ring-green-600/20';
      case 'quiz_master':
        return 'bg-blue-100 text-blue-800 ring-blue-600/20';
      case 'streak':
        return 'bg-purple-100 text-purple-800 ring-purple-600/20';
      case 'engagement':
        return 'bg-yellow-100 text-yellow-800 ring-yellow-600/20';
      default:
        return 'bg-gray-100 text-gray-800 ring-gray-600/20';
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${getAchievementColor(
                  achievement.type
                )}`}
              >
                <img
                  src={achievement.icon}
                  alt=""
                  className="h-8 w-8"
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  {achievement.title}
                </p>
                <p className="text-sm text-gray-500">
                  {achievement.description}
                </p>
                {achievement.progress && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>
                        {achievement.progress.current} /{' '}
                        {achievement.progress.target}
                      </span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{
                          width: `${
                            (achievement.progress.current /
                              achievement.progress.target) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Unlocked{' '}
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Locked Achievement Example */}
        <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm opacity-50">
          <div className="flex-shrink-0">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
              <p className="text-sm font-medium text-gray-900">
                30-Day Learning Streak
              </p>
              <p className="text-sm text-gray-500">
                Learn for 30 consecutive days
              </p>
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Progress</span>
                  <span>7 / 30</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-gray-300"
                    style={{ width: '23%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {achievements.length === 0 && (
        <div className="text-center py-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 mb-4">
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <p className="text-gray-500">
            Start learning to unlock your first achievement!
          </p>
        </div>
      )}
    </div>
  );
}
