import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaUsers, FaClock } from 'react-icons/fa';

interface Instructor {
  name?: string;
  expertise?: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  studentsEnrolled?: number;
  rating?: number;
  duration?: string;
  level?: string;
  price?: number;
  thumbnail?: string;
  instructor?: Instructor;
  slug?: string;
  category?: string;
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.category?.toLowerCase() || 'development'}/${course.slug || course.id}`}>
      <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="relative h-48 bg-gray-100">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            {course.rating && (
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{course.rating.toFixed(1)}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <FaUsers />
              <span>{(course.studentsEnrolled || 0).toLocaleString()} students</span>
            </div>
            {course.duration && (
              <div className="flex items-center gap-1">
                <FaClock />
                <span>{course.duration}</span>
              </div>
            )}
          </div>

          {course.instructor?.name && (
            <p className="text-sm font-medium text-gray-900 mt-4">
              Instructor: {course.instructor.name}
            </p>
          )}

          <div className="mt-4 flex justify-between items-center">
            <div className="text-lg font-bold text-gray-900">
              {course.price === 0 ? 'Free' : course.price ? `$${course.price}` : 'Free'}
            </div>
            {course.level && (
              <span className="text-sm text-blue-600 font-medium">
                {course.level}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
