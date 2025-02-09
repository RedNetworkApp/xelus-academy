'use client';

import Link from 'next/link';
import { SearchResult } from '@/types/search';

interface Props {
  results: SearchResult;
  currentPage: number;
}

export default function SearchResults({ results, currentPage }: Props) {
  const { totalCourses, totalPages, courses } = results;

  return (
    <div>
      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          {totalCourses} courses found
        </h2>
        <select
          className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          defaultValue="relevance"
        >
          <option value="relevance">Most Relevant</option>
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <Link href={`/courses/${course.slug}`}>
              <div className="relative h-48">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {course.originalPrice && course.originalPrice > course.price && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                    {Math.round(
                      ((course.originalPrice - course.price) /
                        course.originalPrice) *
                        100
                    )}
                    % OFF
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${getLevelBadgeColor(
                      course.level
                    )}`}
                  >
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {getDurationLabel(course.duration)}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center mb-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {course.instructor.name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm font-medium text-gray-900">
                        {course.rating.toFixed(1)}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({course.totalReviews})
                      </span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {course.totalStudents.toLocaleString()} students
                    </span>
                  </div>
                  <div className="text-right">
                    {course.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${course.originalPrice}
                      </span>
                    )}
                    <span className="ml-2 text-lg font-bold text-gray-900">
                      ${course.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const isCurrent = page === currentPage;
              return (
                <Link
                  key={page}
                  href={{
                    pathname: '/courses/search',
                    query: {
                      ...Object.fromEntries(new URLSearchParams(location.search)),
                      page: page.toString(),
                    },
                  }}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    isCurrent
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  } ${page === 1 ? 'rounded-l-md' : ''} ${
                    page === totalPages ? 'rounded-r-md' : ''
                  }`}
                >
                  {page}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}

function getLevelBadgeColor(level: string) {
  switch (level) {
    case 'beginner':
      return 'bg-green-100 text-green-800';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'advanced':
      return 'bg-red-100 text-red-800';
    case 'expert':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getDurationLabel(duration: string) {
  switch (duration) {
    case 'short':
      return '0-3 hours';
    case 'medium':
      return '3-10 hours';
    case 'long':
      return '10+ hours';
    default:
      return 'Variable';
  }
}
