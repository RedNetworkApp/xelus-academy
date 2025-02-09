import { Metadata } from 'next';
import InstructorDashboard from '@/components/instructor/InstructorDashboard';

export const metadata: Metadata = {
  title: 'Instructor Analytics - Xelus Academy',
  description: 'Track your course performance and student engagement.',
};

export default function InstructorAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Instructor Analytics
          </h1>
          <p className="mt-2 text-gray-600">
            Track your course performance, student engagement, and revenue metrics.
          </p>
        </div>

        <InstructorDashboard />
      </div>
    </div>
  );
}
