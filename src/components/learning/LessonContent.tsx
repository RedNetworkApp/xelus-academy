'use client';

import { Lesson } from '@/types/course';
import { useState } from 'react';

interface Props {
  lesson: Lesson;
  courseId: string;
}

export default function LessonContent({ lesson, courseId }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  // This would typically come from an API
  const videoUrl = `https://example.com/videos/${courseId}/${lesson.id}`;

  if (lesson.type === 'video') {
    return (
      <div className="relative w-full h-full bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
        
        <video
          className="w-full h-full"
          controls
          onLoadStart={() => setIsLoading(true)}
          onLoadedData={() => setIsLoading(false)}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  if (lesson.type === 'quiz') {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">{lesson.title}</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 mb-4">
            This quiz will test your knowledge of the concepts covered in this module.
          </p>
          {/* Quiz content would go here */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (lesson.type === 'assignment') {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">{lesson.title}</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 mb-4">
            Complete this assignment to practice what you've learned.
          </p>
          {/* Assignment content would go here */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Submit Assignment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600">
          Content type not supported.
        </p>
      </div>
    </div>
  );
}
