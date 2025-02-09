'use client';

import { useState, useEffect } from 'react';
import { RecommendationResult } from '@/types/recommendations';
import { RecommendationEngine } from '@/lib/recommendations/engine';
import Link from 'next/link';

interface Props {
  category?: string;
  limit?: number;
}

export default function TrendingCourses({ category, limit = 4 }: Props) {
  const [courses, setCourses] = useState<RecommendationResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingCourses = async () => {
      try {
        const engine = RecommendationEngine.getInstance();
        const results = await engine.getTrendingCourses(category, limit);
        setCourses(results);
      } catch (error) {
        console.error('Failed to fetch trending courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingCourses();
  }, [category, limit]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="h-48 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <Link
          key={course.courseId}
          href={`/courses/${course.courseId}`}
          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Course Image */}
          <div className="relative h-48">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <div className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
                Trending
              </div>
            </div>
          </div>

          {/* Course Info */}
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {course.instructor.name}
            </p>

            {/* Course Stats */}
            <div className="flex items-center text-sm">
              <div className="flex items-center text-yellow-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="ml-1 text-gray-900">
                  {course.rating.toFixed(1)}
                </span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-gray-500">
                {course.totalStudents.toLocaleString()} students
              </span>
            </div>

            {/* Price */}
            <div className="mt-2 text-lg font-bold text-gray-900">
              ${course.price}
            </div>

            {/* Course Level and Duration */}
            <div className="mt-3 flex items-center space-x-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {course.level}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {course.duration}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
