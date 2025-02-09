'use client';

import { useState } from 'react';
import { Module } from '@/types/course';

interface Props {
  syllabus: Module[];
}

export default function CourseContent({ syllabus }: Props) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const totalLessons = syllabus.reduce(
    (total, module) => total + module.lessons.length,
    0
  );

  const totalDuration = syllabus.reduce((total, module) => {
    const moduleDuration = module.lessons.reduce((sum, lesson) => {
      const minutes = parseInt(lesson.duration.split(' ')[0]);
      return sum + minutes;
    }, 0);
    return total + moduleDuration;
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Course Content</h2>
        <div className="text-sm text-gray-500">
          {totalLessons} lessons • {totalDuration} minutes total
        </div>
      </div>

      <div className="space-y-4">
        {syllabus.map((module) => (
          <div key={module.id} className="border rounded-lg">
            <button
              onClick={() => setExpandedModule(
                expandedModule === module.id ? null : module.id
              )}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <svg
                  className={`h-5 w-5 text-gray-500 transform transition-transform ${
                    expandedModule === module.id ? 'rotate-90' : ''
                  }`}
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
                <span className="ml-2 font-medium">{module.title}</span>
              </div>
              <span className="text-sm text-gray-500">{module.duration}</span>
            </button>

            {expandedModule === module.id && (
              <div className="border-t">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      {lesson.type === 'video' ? (
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : lesson.type === 'quiz' ? (
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      )}
                      <span className="ml-3">{lesson.title}</span>
                      {lesson.isPreview && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                          Preview
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {lesson.duration}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
