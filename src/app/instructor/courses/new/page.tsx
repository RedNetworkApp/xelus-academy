import { Metadata } from 'next';
import CourseEditor from '@/components/instructor/CourseEditor';
import { CourseFormData } from '@/types/courseEditor';

export const metadata: Metadata = {
  title: 'Create New Course - Xelus Academy',
  description: 'Create and publish a new course on Xelus Academy.',
};

const initialCourseData: CourseFormData = {
  title: '',
  slug: '',
  description: '',
  category: '',
  price: 0,
  duration: '',
  level: 'Beginner',
  thumbnail: '',
  objectives: [],
  syllabus: [],
  prerequisites: [],
  features: []
};

export default function NewCoursePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Create New Course</h1>
        <CourseEditor
          initialData={initialCourseData}
          mode="create"
        />
      </div>
    </div>
  );
}
