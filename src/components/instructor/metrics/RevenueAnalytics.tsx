'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RevenueMetrics } from '@/types/instructor-analytics';

interface RevenueAnalyticsProps {
  data: RevenueMetrics;
}

export default function RevenueAnalytics({ data }: RevenueAnalyticsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-xl font-semibold">${(data?.total || data?.totalRevenue || 0).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Next Month Projection</p>
          <p className="text-xl font-semibold">${(data?.projections?.nextMonth || 0).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Next Quarter Projection</p>
          <p className="text-xl font-semibold">${(data?.projections?.nextQuarter || 0).toLocaleString()}</p>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data?.byPeriod || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
