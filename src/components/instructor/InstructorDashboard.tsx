'use client';

import { useState, useEffect } from 'react';
import { InstructorAnalytics } from '@/lib/analytics/InstructorAnalytics';
import { InstructorDashboardData } from '@/types/instructor-analytics';
import OverviewMetrics from './metrics/OverviewMetrics';
import CoursePerformance from './metrics/CoursePerformance';
import StudentAnalytics from './metrics/StudentAnalytics';
import EngagementInsights from './metrics/EngagementInsights';
import RevenueAnalytics from './metrics/RevenueAnalytics';
import FeedbackAnalytics from './metrics/FeedbackAnalytics';

const PERIOD_OPTIONS = [
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 90 Days', value: '90d' },
  { label: 'Last 12 Months', value: '12m' },
  { label: 'Year to Date', value: 'ytd' },
  { label: 'All Time', value: 'all' },
];

export default function InstructorDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [dashboardData, setDashboardData] = useState<InstructorDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const period = getPeriodDates(selectedPeriod);
        const analytics = InstructorAnalytics.getInstance();
        const data = await analytics.getDashboardData('instructor123', period);
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);

  const getPeriodDates = (period: string) => {
    const end = new Date();
    const start = new Date();

    switch (period) {
      case '7d':
        start.setDate(end.getDate() - 7);
        break;
      case '30d':
        start.setDate(end.getDate() - 30);
        break;
      case '90d':
        start.setDate(end.getDate() - 90);
        break;
      case '12m':
        start.setFullYear(end.getFullYear() - 1);
        break;
      case 'ytd':
        start.setMonth(0, 1);
        break;
      case 'all':
        start.setFullYear(2020, 0, 1); // Assuming platform started in 2020
        break;
    }

    return {
      start: start.toISOString(),
      end: end.toISOString(),
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Period Selector */}
      <div className="flex justify-end">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {PERIOD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Overview Metrics */}
      <OverviewMetrics data={dashboardData.overview} />

      {/* Course Performance */}
      <CoursePerformance data={dashboardData.courseMetrics} />

      {/* Student Analytics */}
      <StudentAnalytics data={dashboardData.studentMetrics} />

      {/* Engagement Insights */}
      <EngagementInsights data={dashboardData.engagementMetrics} />

      {/* Revenue Analytics */}
      <RevenueAnalytics data={dashboardData.revenueMetrics} />

      {/* Feedback Analytics */}
      <FeedbackAnalytics data={dashboardData.feedbackMetrics} />
    </div>
  );
}
