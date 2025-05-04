'use client';

import {
  RadialBarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import CustomRadialBar from '../charts/CustomRadialBar';
import { InstructorAnalytics as InstructorAnalyticsType } from '@/types/analytics';

interface InstructorAnalyticsProps {
  data: InstructorAnalyticsType;
}

export default function InstructorAnalytics({ data }: InstructorAnalyticsProps) {
  const chartData = [
    {
      name: 'Active Rate',
      value: (data.activeInstructors / data.totalInstructors) * 100,
      fill: '#8884d8',
    },
    {
      name: 'Course Rating',
      value: data.avgCourseRating * 20, // Convert 5-point scale to percentage
      fill: '#82ca9d',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Instructor Analytics</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Total Instructors</h3>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">
            {data.totalInstructors}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Active Instructors</h3>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">
            {data.activeInstructors}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">
            {data.avgCourseRating}/5
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">
            ${data.totalEarnings.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            barSize={10}
            data={chartData}
          >
            <CustomRadialBar
              minAngleValue={15}
              useBackground={true}
              isClockWise={true}
              dataKey="value"
              cornerRadius={30}
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
