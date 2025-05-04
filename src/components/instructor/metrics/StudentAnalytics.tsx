'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StudentAnalytics as StudentAnalyticsType } from '@/types/instructor-analytics';

interface StudentAnalyticsProps {
  data: StudentAnalyticsType;
}

export default function StudentAnalytics({ data }: StudentAnalyticsProps) {
  // Generate demo data if we don't have real data
  const chartData = data?.enrollments?.map(item => ({
    date: item.date,
    enrollments: item.count,
    completions: data.completions?.find(c => c.date === item.date)?.count || 0
  })) || Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (4 - i) * 7);
    return {
      date: date.toISOString().split('T')[0],
      enrollments: Math.round(Math.random() * 50) + 20,
      completions: Math.round(Math.random() * 30) + 10
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Student Analytics</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="enrollments" fill="#8884d8" name="Enrollments" />
            <Bar dataKey="completions" fill="#82ca9d" name="Completions" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
