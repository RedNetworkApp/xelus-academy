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
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={earnings}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value} students`}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'amount') return [`$${value}`, 'Revenue'];
              return [`${value} students`, 'New Students'];
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            activeDot={{ r: 8 }}
            name="amount"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="students"
            stroke="#10b981"
            name="students"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
