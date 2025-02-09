'use client';

import { useState } from 'react';
import { Course } from '@/types/course';
import { useRouter } from 'next/navigation';

interface Props {
  course: Course;
}

export default function EnrollButton({ course }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnroll = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement enrollment logic
      console.log('Enrolling in course:', course.id);
      router.push(`/courses/${course.slug}/learn`);
    } catch (error) {
      console.error('Failed to enroll:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleEnroll}
        disabled={isLoading}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Enrolling...' : `Enroll for $${course.price}`}
      </button>
      
      <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
        Preview
      </button>
    </div>
  );
}
