'use client';

import { InstructorOverview } from '@/types/instructor-analytics';
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
  data: InstructorOverview;
}

export default function OverviewMetrics({ data }: Props) {
  const metrics = [
    {
      title: 'Total Students',
      value: data.totalStudents,
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'Active Students',
      value: data.activeStudents,
      change: '+8%',
      trend: 'up',
    },
    {
      title: 'Total Revenue',
      value: `$${data.totalRevenue.toLocaleString()}`,
      change: '+15%',
      trend: 'up',
    },
    {
      title: 'Average Rating',
      value: data.averageRating.toFixed(1),
      change: '+0.2',
      trend: 'up',
    },
    {
      title: 'Completion Rate',
      value: `${(data.completionRate * 100).toFixed(1)}%`,
      change: '+5%',
      trend: 'up',
    },
    {
      title: 'Student Satisfaction',
      value: `${(data.studentSatisfaction * 100).toFixed(1)}%`,
      change: '+3%',
      trend: 'up',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Overview</h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  metric.trend === 'up'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {metric.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Trends Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data.trends}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="students"
              stroke="#3B82F6"
              name="Students"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
