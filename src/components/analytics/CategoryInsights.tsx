'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CategoryPerformance } from '@/types/analytics';

interface CategoryInsightsProps {
  data: CategoryPerformance[];
}

export default function CategoryInsights({ data }: CategoryInsightsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Category Insights</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="enrollments"
              fill="#8884d8"
              name="Enrollments"
            />
            <Bar
              yAxisId="right"
              dataKey="revenue"
              fill="#82ca9d"
              name="Revenue"
            />
            <Bar
              yAxisId="left"
              dataKey="avgRating"
              fill="#ffc658"
              name="Average Rating"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
