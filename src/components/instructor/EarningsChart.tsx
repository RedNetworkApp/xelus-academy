'use client';

import { InstructorDashboardData } from '@/types/instructor';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface Props {
  earnings: InstructorDashboardData['earnings'];
}

export default function EarningsChart({ earnings }: Props) {
  if (!earnings) {
    return <div className="h-80 flex items-center justify-center">No earnings data available</div>;
  }
  
  return (
    <div className="h-80">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Earnings</p>
          <p className="text-xl font-semibold">${earnings.total.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Projected Next Month</p>
          <p className="text-xl font-semibold">${earnings.projected.toLocaleString()}</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="70%">
        <LineChart
          data={earnings.monthly}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            activeDot={{ r: 8 }}
            name="amount"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
