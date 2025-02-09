'use client';

import { useState } from 'react';
import { Course } from '@/types/course';
import Link from 'next/link';

interface Props {
  course: Course;
}

export default function CourseSidebar({ course }: Props) {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Course Title */}
      <div className="p-4 border-b">
        <Link
          href={`/courses/${course.slug}`}
          className="text-lg font-semibold hover:text-blue-600"
        >
          {course.title}
        </Link>
      </div>

      {/* Course Progress */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex justify-between text-sm mb-2">
          <span>Course Progress</span>
          <span className="font-medium">0%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full w-0" />
        </div>
      </div>

      {/* Course Content */}
      <div className="flex-1 overflow-y-auto">
        {course.syllabus.map((module) => (
          <div key={module.id} className="border-b">
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    expandedModules.includes(module.id) ? 'rotate-90' : ''
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

            {expandedModules.includes(module.id) && (
              <div className="bg-gray-50">
                {module.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/courses/${course.slug}/learn?lesson=${lesson.id}`}
                    className="flex items-center px-4 py-3 hover:bg-gray-100"
                  >
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                      {lesson.type === 'video' ? (
                        <svg
                          className="w-5 h-5 text-gray-400"
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
                          className="w-5 h-5 text-gray-400"
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
                          className="w-5 h-5 text-gray-400"
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
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{lesson.title}</p>
                      <p className="text-xs text-gray-500">{lesson.duration}</p>
                    </div>
                    {lesson.isPreview && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                        Preview
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
