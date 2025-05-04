'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CourseFormData, CoursePublishRequirements } from '@/types/courseEditor';
import CourseBasicInfo from './editor/CourseBasicInfo';
import CourseSyllabus from './editor/CourseSyllabus';
import CoursePreview from './editor/CoursePreview';
import CoursePublishCheck from './editor/CoursePublishCheck';

interface Props {
  initialData: CourseFormData;
  mode: 'create' | 'edit';
}

type EditorStep = 'basic' | 'syllabus' | 'preview' | 'publish';

export default function CourseEditor({ initialData, mode }: Props) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<EditorStep>('basic');
  const [courseData, setCourseData] = useState<CourseFormData>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const steps: { id: EditorStep; title: string }[] = [
    { id: 'basic', title: 'Basic Information' },
    { id: 'syllabus', title: 'Course Content' },
    { id: 'preview', title: 'Preview' },
    { id: 'publish', title: 'Publish' },
  ];

  const updateCourseData = (data: Partial<CourseFormData>) => {
    setCourseData((prev) => ({ ...prev, ...data }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // API call to save course data would go here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      
      if (mode === 'create') {
        router.push('/instructor/dashboard');
      }
    } catch (error) {
      console.error('Failed to save course:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const validatePublishRequirements = (): CoursePublishRequirements => {
    return {
      hasTitle: courseData.title.length > 0,
      hasDescription: courseData.description.length > 0,
      hasObjectives: courseData.objectives.length > 0,
      hasThumbnail: courseData.thumbnail.length > 0,
      hasPrice: courseData.price > 0,
      hasModules: courseData.syllabus.length > 0,
      minimumLessons: courseData.syllabus.reduce(
        (total, module) => total + (module.lessons?.length || 0),
        0
      ) >= 3,
      allLessonsHaveContent: courseData.syllabus.every((module) =>
        module.lessons?.every((lesson) => {
          if (lesson.type === 'video') return lesson.videoUrl && lesson.videoUrl.length > 0;
          if (lesson.type === 'quiz') return lesson.quizQuestions && lesson.quizQuestions.length > 0;
          return true;
        }) ?? true
      ),
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Progress Steps */}
      <div className="border-b">
        <div className="container mx-auto px-6">
          <nav className="flex justify-between" aria-label="Progress">
            <ol className="space-y-6 md:flex md:space-y-0 md:space-x-8">
              {steps.map((step) => (
                <li key={step.id} className="md:flex-1">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-2 ${
                      currentStep === step.id
                        ? 'border-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-500">
                      {step.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Editor Content */}
      <div className="p-6">
        {currentStep === 'basic' && (
          <CourseBasicInfo
            data={courseData}
            onChange={updateCourseData}
            onNext={() => setCurrentStep('syllabus')}
          />
        )}

        {currentStep === 'syllabus' && (
          <CourseSyllabus
            data={courseData}
            onChange={updateCourseData}
            onBack={() => setCurrentStep('basic')}
            onNext={() => setCurrentStep('preview')}
          />
        )}

        {currentStep === 'preview' && (
          <CoursePreview
            data={courseData}
            onBack={() => setCurrentStep('syllabus')}
            onNext={() => setCurrentStep('publish')}
          />
        )}

        {currentStep === 'publish' && (
          <CoursePublishCheck
            requirements={validatePublishRequirements()}
            onBack={() => setCurrentStep('preview')}
            onPublish={handleSave}
            isPublishing={isSaving}
          />
        )}
      </div>
    </div>
  );
}
