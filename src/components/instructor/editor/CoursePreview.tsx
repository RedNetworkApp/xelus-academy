'use client';

import { CourseFormData } from '@/types/courseEditor';
import Image from 'next/image';

interface Props {
  data: CourseFormData;
  onBack: () => void;
  onNext: () => void;
}

export default function CoursePreview({ data, onBack, onNext }: Props) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Course Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Thumbnail */}
        <div className="relative aspect-video md:col-span-1">
          {data.thumbnail && (
            <Image
              src={data.thumbnail}
              alt={data.title}
              fill
              className="object-cover rounded-lg"
            />
          )}
        </div>

        {/* Course Info */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{data.category}</span>
            <span>•</span>
            <span>{data.level}</span>
            <span>•</span>
            <span>{data.duration}</span>
          </div>

          <div className="text-2xl font-bold text-blue-600">
            ${data.price.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Course Description */}
      <div>
        <h2 className="text-xl font-bold mb-4">About This Course</h2>
        <p className="text-gray-600 whitespace-pre-wrap">{data.description}</p>
      </div>

      {/* Course Objectives */}
      <div>
        <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.objectives.map((objective, index) => (
            <li key={index} className="flex items-start space-x-2">
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Course Content */}
      <div>
        <h2 className="text-xl font-bold mb-4">Course Content</h2>
        <div className="space-y-4">
          {data.syllabus.map((module, moduleIndex) => (
            <div
              key={moduleIndex}
              className="border rounded-lg overflow-hidden"
            >
              <div className="bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    Module {moduleIndex + 1}: {module.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {module.duration}
                  </span>
                </div>
              </div>
              
              <div className="divide-y">
                {module.lessons?.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="p-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      {/* Lesson Type Icon */}
                      {lesson.type === 'video' ? (
                        <svg
                          className="w-5 h-5 text-blue-500"
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
                          className="w-5 h-5 text-purple-500"
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
                          className="w-5 h-5 text-green-500"
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
                      
                      <span>{lesson.title}</span>
                      
                      {'isPreview' in lesson && lesson.isPreview && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Preview
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {lesson.duration}
                    </span>
                  </div>
                )) || []}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next: Publish Course
        </button>
      </div>
    </div>
  );
}
