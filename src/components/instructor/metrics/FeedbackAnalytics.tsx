'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FeedbackMetrics } from '@/types/instructor-analytics';

interface FeedbackAnalyticsProps {
  data: FeedbackMetrics;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function FeedbackAnalytics({ data }: FeedbackAnalyticsProps) {
  const pieData = data?.byRating?.map(rating => ({
    name: `${rating.rating} Stars`,
    value: rating.count
  })) || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Feedback Analytics</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600">Average Rating</p>
          <p className="text-xl font-semibold">{data?.averageRating?.toFixed(1) || "0.0"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Reviews</p>
          <p className="text-xl font-semibold">{data?.totalReviews || 0}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Recommendation Rate</p>
          <p className="text-xl font-semibold">{(data?.overall?.recommendationRate * 100 || 0).toFixed(1)}%</p>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
