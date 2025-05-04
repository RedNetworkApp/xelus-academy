'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EngagementMetrics } from '@/types/instructor-analytics';

interface EngagementInsightsProps {
  data: EngagementMetrics;
}

export default function EngagementInsights({ data }: EngagementInsightsProps) {
  const chartData = data?.content?.mostWatchedVideos?.map(video => ({
    name: video.title,
    views: video.views,
    completionRate: video.completionRate ? video.completionRate * 100 : 0,
  })) || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Engagement Insights</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600">Average Watch Time</p>
          <p className="text-xl font-semibold">{data?.averageWatchTime || 0} min</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Average Completion Time</p>
          <p className="text-xl font-semibold">{data?.averageCompletionTime || 0} min</p>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="views" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="completionRate" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
