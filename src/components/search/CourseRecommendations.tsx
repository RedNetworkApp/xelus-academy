'use client';

import { useState, useEffect } from 'react';
import { CourseSearchItem, RecommendationParams } from '@/types/search';
import Link from 'next/link';

interface Props {
  type: RecommendationParams['type'];
  userId?: string;
  courseId?: string;
  category?: string;
  limit?: number;
}

export default function CourseRecommendations({
  type,
  userId,
  courseId,
  category,
  limit = 4,
}: Props) {
  const [courses, setCourses] = useState<CourseSearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // This would be an API call in a real app
        const mockCourses: CourseSearchItem[] = [
          {
            id: '2',
            title: 'Advanced JavaScript Concepts',
            slug: 'advanced-javascript-concepts',
            description: 'Master advanced JavaScript concepts and patterns',
            thumbnail: '/images/courses/js-advanced.jpg',
            instructor: {
              id: '2',
              name: 'Jane Smith',
              avatar: '/images/avatars/jane.jpg',
            },
            category: 'Development',
            level: 'advanced',
            duration: 'long',
            rating: 4.8,
            totalReviews: 250,
            totalStudents: 2800,
            price: 79.99,
            tags: ['javascript', 'web', 'programming'],
            language: 'English',
            lastUpdated: '2025-01-05',
          },
          // Add more mock courses...
        ];

        setCourses(mockCourses);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [type, userId, courseId, category, limit]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return null;
  }

  const getRecommendationTitle = () => {
    switch (type) {
      case 'similar':
        return 'Similar Courses';
      case 'popular':
        return 'Popular Courses';
      case 'personalized':
        return 'Recommended for You';
      case 'trending':
        return 'Trending Courses';
      default:
        return 'Recommended Courses';
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">{getRecommendationTitle()}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{course.instructor.name}</p>
              <div className="flex items-center text-sm">
                <div className="flex items-center text-yellow-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="ml-1 text-gray-900">{course.rating.toFixed(1)}</span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-gray-500">
                  {course.totalStudents.toLocaleString()} students
                </span>
              </div>
              <div className="mt-2 text-lg font-bold text-gray-900">
                ${course.price}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
