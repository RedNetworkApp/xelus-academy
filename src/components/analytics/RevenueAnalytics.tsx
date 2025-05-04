'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RevenueData {
  date: string;
  revenue: number;
  subscriptions: number;
  oneTime: number;
}

interface RevenueAnalyticsProps {
  data: RevenueData[];
  totalRevenue: number;
  monthlyGrowth: number;
  projectedRevenue: number;
}

export default function RevenueAnalytics({ data, totalRevenue, monthlyGrowth, projectedRevenue }: RevenueAnalyticsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-xl font-semibold">${totalRevenue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Monthly Growth</p>
          <p className="text-xl font-semibold">{monthlyGrowth > 0 ? '+' : ''}{monthlyGrowth}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Projected Revenue</p>
          <p className="text-xl font-semibold">${projectedRevenue.toLocaleString()}</p>
        </div>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="subscriptions" stackId="a" fill="#8884d8" name="Subscription Revenue" />
            <Bar dataKey="oneTime" stackId="a" fill="#82ca9d" name="One-time Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
