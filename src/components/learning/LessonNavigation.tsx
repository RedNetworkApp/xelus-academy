'use client';

import type { Module } from '@/types/course';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  currentModule: Module;
  currentLessonId: string;
  courseSlug: string;
}

export default function LessonNavigation({
  currentModule,
  currentLessonId,
  courseSlug,
}: Props) {
  const [isCompleting, setIsCompleting] = useState(false);

  const currentLessonIndex = currentModule.lessons.findIndex(
    (lesson) => lesson.id === currentLessonId
  );

  const previousLesson = currentLessonIndex > 0
    ? currentModule.lessons[currentLessonIndex - 1]
    : null;

  const nextLesson = currentLessonIndex < currentModule.lessons.length - 1
    ? currentModule.lessons[currentLessonIndex + 1]
    : null;

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      // TODO: Implement mark as complete functionality
      console.log('Marking lesson as complete');
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex-1">
        {previousLesson ? (
          <Link
            href={`/courses/${courseSlug}/learn?lesson=${previousLesson.id}`}
            className="flex items-center text-gray-600 hover:text-blue-600"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Previous: {previousLesson.title}</span>
          </Link>
        ) : (
          <div className="w-32" />
        )}
      </div>

      <div className="flex-shrink-0 mx-4">
        <button 
          className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            isCompleting ? 'cursor-wait' : ''
          }`}
          onClick={handleComplete}
          disabled={isCompleting}
        >
          {isCompleting ? 'Completing...' : 'Mark as Complete'}
        </button>
      </div>

      <div className="flex-1 text-right">
        {nextLesson ? (
          <Link
            href={`/courses/${courseSlug}/learn?lesson=${nextLesson.id}`}
            className="flex items-center justify-end text-gray-600 hover:text-blue-600"
          >
            <span>Next: {nextLesson.title}</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div className="w-32" />
        )}
      </div>
    </nav>
  );
}
