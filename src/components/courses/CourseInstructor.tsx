import { Instructor } from '@/types/course';
import Image from 'next/image';

interface Props {
  instructor: Instructor;
}

export default function CourseInstructor({ instructor }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Your Instructor</h2>
      
      <div className="flex items-center mb-4">
        <Image
          src={instructor.avatar}
          alt={instructor.name}
          width={64}
          height={64}
          className="rounded-full"
        />
        <div className="ml-4">
          <h3 className="font-medium text-lg">{instructor.name}</h3>
          <p className="text-gray-500">{instructor.expertise.join(', ')}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div>
          <div className="text-xl font-bold text-blue-600">
            {instructor.rating}
          </div>
          <div className="text-sm text-gray-500">Rating</div>
        </div>
        <div>
          <div className="text-xl font-bold text-blue-600">
            {instructor.totalStudents.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Students</div>
        </div>
        <div>
          <div className="text-xl font-bold text-blue-600">
            {instructor.totalCourses}
          </div>
          <div className="text-sm text-gray-500">Courses</div>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{instructor.bio}</p>

      <button className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
        View Profile
      </button>
    </div>
  );
}
