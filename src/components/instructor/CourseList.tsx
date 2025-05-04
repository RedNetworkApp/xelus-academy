import { Course } from '@/types/course';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  publishedCourses: Course[];
  draftCourses: Course[];
}

export default function CourseList({ publishedCourses, draftCourses }: Props) {
  return (
    <div className="space-y-6">
      {/* Published Courses */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Published Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              status="published"
            />
          ))}
        </div>
        {publishedCourses.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No published courses yet
          </p>
        )}
      </div>

      {/* Draft Courses */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Draft Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {draftCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              status="draft"
            />
          ))}
        </div>
        {draftCourses.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No draft courses
          </p>
        )}
      </div>
    </div>
  );
}

interface CourseCardProps {
  course: Course;
  status: 'published' | 'draft';
}

function CourseCard({ course, status }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-40">
        <Image
          src={course.thumbnail || '/images/courses/default-course.jpg'}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              status === 'published'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-medium mb-2">{course.title}</h4>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>{course.level}</span>
          <span className="mx-2">•</span>
          <span>{course.duration}</span>
        </div>

        {status === 'published' && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span>{course.rating}</span>
              <span className="mx-1">•</span>
              <span>{course.studentsEnrolled.toLocaleString()} students</span>
            </div>
            <span className="font-medium">${course.price}</span>
          </div>
        )}

        <div className="mt-4 flex space-x-2">
          <Link
            href={`/instructor/courses/${course.id}/edit`}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700"
          >
            Edit
          </Link>
          {status === 'draft' && (
            <Link
              href={`/instructor/courses/${course.id}/publish`}
              className="flex-1 px-3 py-2 border border-blue-600 text-blue-600 text-center rounded hover:bg-blue-50"
            >
              Publish
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
