'use client';

import { PlatformHealth as PlatformHealthType } from '@/types/analytics';

interface PlatformHealthProps {
  data: PlatformHealthType;
}

export default function PlatformHealth({ data }: PlatformHealthProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Platform Health</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Uptime</h3>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">
            {data.uptime}%
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Response Time</h3>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">
            {data.responseTime}ms
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Error Rate</h3>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">
            {data.errorRate}%
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">
            {data.activeUsers}
          </p>
        </div>
      </div>
    </div>
  );
}
