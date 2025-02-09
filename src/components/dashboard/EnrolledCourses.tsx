import { Course, CourseProgress } from '@/types/course';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  courses: (Course & { progress: CourseProgress })[];
}

export default function EnrolledCourses({ courses }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Link
          key={course.id}
          href={`/courses/${course.slug}/learn`}
          className="block bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="relative h-40">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-2">
              {course.title}
            </h3>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>{course.instructor.name}</span>
              <span className="mx-2">•</span>
              <span>{course.level}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{course.progress.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${course.progress.progress}%` }}
                />
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              Last accessed: {new Date(course.progress.lastAccessed).toLocaleDateString()}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
