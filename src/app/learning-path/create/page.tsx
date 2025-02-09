import { Metadata } from 'next';
import PathCreator from '@/components/learning-path/PathCreator';

export const metadata: Metadata = {
  title: 'Create Learning Path - Xelus Academy',
  description: 'Create your personalized learning path.',
};

export default function CreateLearningPathPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Your Learning Path
            </h1>
            <p className="mt-2 text-gray-600">
              Let's create a personalized learning path that matches your goals and
              preferences.
            </p>
          </div>

          <PathCreator />
        </div>
      </div>
    </div>
  );
}
