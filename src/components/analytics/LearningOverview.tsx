'use client';

import { LearningMetrics } from '@/types/analytics';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  data: LearningMetrics;
}

export default function LearningOverview({ data }: Props) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    if (hours < 24) {
      return `${hours} hours`;
    }
    const days = Math.floor(hours / 24);
    return `${days} days`;
  };

  // Transform data for visualization
  const chartData = [
    {
      name: 'Started',
      value: data.coursesStarted,
      color: '#3B82F6',
    },
    {
      name: 'Completed',
      value: data.coursesCompleted,
      color: '#10B981',
    },
    {
      name: 'Certificates',
      value: data.certificatesEarned,
      color: '#8B5CF6',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Overview</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-600">Total Learning Time</p>
          <p className="mt-2 text-2xl font-semibold text-blue-900">
            {formatDuration(data.totalLearningTime)}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-600">
            Avg. Completion Rate
          </p>
          <p className="mt-2 text-2xl font-semibold text-green-900">
            {data.averageCompletionRate}%
          </p>
        </div>
      </div>

      {/* Course Progress Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [value.toLocaleString(), 'Count']}
            />
            <Bar
              dataKey="value"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm font-medium text-purple-600">
            Average Quiz Score
          </p>
          <div className="mt-2 flex items-end space-x-2">
            <p className="text-2xl font-semibold text-purple-900">
              {data.averageQuizScore}
            </p>
            <p className="text-sm text-purple-600 mb-1">/ 100</p>
          </div>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm font-medium text-yellow-600">
            Completion Success
          </p>
          <div className="mt-2 flex items-end space-x-2">
            <p className="text-2xl font-semibold text-yellow-900">
              {Math.round(
                (data.coursesCompleted / data.coursesStarted) * 100
              )}%
            </p>
            <p className="text-sm text-yellow-600 mb-1">rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
