'use client';

import { UserEngagement } from '@/types/analytics';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  data: UserEngagement;
}

export default function EngagementMetrics({ data }: Props) {
  // This would typically come from an API with historical data
  const mockTrendData = [
    { date: '2025-01-01', users: data.activeUsers.daily },
    { date: '2025-01-02', users: data.activeUsers.daily * 1.1 },
    { date: '2025-01-03', users: data.activeUsers.daily * 0.9 },
    { date: '2025-01-04', users: data.activeUsers.daily * 1.2 },
    { date: '2025-01-05', users: data.activeUsers.daily * 1.15 },
    { date: '2025-01-06', users: data.activeUsers.daily * 0.95 },
    { date: '2025-01-07', users: data.activeUsers.daily * 1.05 },
  ];

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">User Engagement</h2>

      {/* Active Users */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-600">Daily Active</p>
          <p className="mt-2 text-2xl font-semibold text-blue-900">
            {data.activeUsers.daily.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-600">Weekly Active</p>
          <p className="mt-2 text-2xl font-semibold text-green-900">
            {data.activeUsers.weekly.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm font-medium text-purple-600">Monthly Active</p>
          <p className="mt-2 text-2xl font-semibold text-purple-900">
            {data.activeUsers.monthly.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Engagement Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value: number) => [
                value.toLocaleString(),
                'Active Users',
              ]}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Avg. Session</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">
            {formatDuration(data.averageSessionDuration)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">
            {data.bounceRate}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Retention</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">
            {data.retentionRate}%
          </p>
        </div>
      </div>
    </div>
  );
}
