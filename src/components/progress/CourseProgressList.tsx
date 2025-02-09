'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CourseProgress } from '@/types/progress';

interface Props {
  courses: CourseProgress[];
}

export default function CourseProgressList({ courses }: Props) {
  const [filter, setFilter] = useState<CourseProgress['status'] | 'all'>('in_progress');

  const filteredCourses = courses.filter((course) => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div>
      {/* Filter Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <FilterTab
            label="In Progress"
            value="in_progress"
            count={courses.filter((c) => c.status === 'in_progress').length}
            selected={filter === 'in_progress'}
            onClick={() => setFilter('in_progress')}
          />
          <FilterTab
            label="Completed"
            value="completed"
            count={courses.filter((c) => c.status === 'completed').length}
            selected={filter === 'completed'}
            onClick={() => setFilter('completed')}
          />
          <FilterTab
            label="Not Started"
            value="not_started"
            count={courses.filter((c) => c.status === 'not_started').length}
            selected={filter === 'not_started'}
            onClick={() => setFilter('not_started')}
          />
          <FilterTab
            label="All"
            value="all"
            count={courses.length}
            selected={filter === 'all'}
            onClick={() => setFilter('all')}
          />
        </nav>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <Link
            key={course.courseId}
            href={`/courses/${course.courseId}/learn`}
            className="block bg-white border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    Course Title Here {/* This would come from course details */}
                  </h3>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <span>
                      Enrolled on{' '}
                      {new Date(course.enrollmentDate).toLocaleDateString()}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      Last accessed{' '}
                      {new Date(course.lastAccessDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                      course.status
                    )}`}
                  >
                    {course.status === 'in_progress'
                      ? 'In Progress'
                      : course.status === 'completed'
                      ? 'Completed'
                      : 'Not Started'}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                {/* Progress Bar */}
                <div className="relative pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {course.progress}% Complete
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-gray-600">
                        {formatDuration(course.timeSpent)} spent learning
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mt-1 text-xs flex rounded bg-blue-100">
                    <div
                      style={{ width: `${course.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Stat
                    label="Lessons Completed"
                    value={`${course.completedLessons.length}`}
                  />
                  <Stat
                    label="Modules Completed"
                    value={`${course.completedModules.length}`}
                  />
                  <Stat
                    label="Assignments Done"
                    value={`${course.completedAssignments.length}`}
                  />
                  <Stat
                    label="Quizzes Passed"
                    value={`${Object.values(course.completedQuizzes).filter(
                      (q) => q.passed
                    ).length}`}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}

        {filteredCourses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No courses found</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface FilterTabProps {
  label: string;
  value: string;
  count: number;
  selected: boolean;
  onClick: () => void;
}

function FilterTab({ label, count, selected, onClick }: FilterTabProps) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center pb-4 px-1 border-b-2 font-medium text-sm ${
        selected
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {label}
      <span
        className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
          selected
            ? 'bg-blue-100 text-blue-600'
            : 'bg-gray-100 text-gray-900 group-hover:bg-gray-200'
        }`}
      >
        {count}
      </span>
    </button>
  );
}

interface StatProps {
  label: string;
  value: string;
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="px-4 py-2 bg-gray-50 rounded-lg">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-gray-900">{value}</dd>
    </div>
  );
}

function getStatusBadgeColor(status: CourseProgress['status']) {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'not_started':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
