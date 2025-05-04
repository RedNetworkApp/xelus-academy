'use client';

import {
  RadialBarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import CustomRadialBar from '../charts/CustomRadialBar';
import { StudentAnalytics as StudentAnalyticsType } from '@/types/analytics';

interface StudentAnalyticsProps {
  data: StudentAnalyticsType;
}

export default function StudentAnalytics({ data }: StudentAnalyticsProps) {
  const chartData = [
    {
      name: 'Completion Rate',
      value: data.completionRate,
      fill: '#8884d8',
    },
    {
      name: 'Active Students',
      value: (data.activeStudents / data.totalStudents) * 100,
      fill: '#82ca9d',
    },
    {
      name: 'Satisfaction Score',
      value: data.satisfactionScore * 20, // Convert 5-point scale to percentage
      fill: '#ffc658',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Student Analytics</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">
            {data.totalStudents}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Active Students</h3>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">
            {data.activeStudents}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">
            {data.completionRate}%
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">
            Satisfaction Score
          </h3>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">
            {data.satisfactionScore}/5
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
