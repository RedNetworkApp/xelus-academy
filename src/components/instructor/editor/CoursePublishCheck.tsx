'use client';

import { CoursePublishRequirements } from '@/types/courseEditor';

interface Props {
  requirements: CoursePublishRequirements;
  onBack: () => void;
  onPublish: () => void;
  isPublishing: boolean;
}

export default function CoursePublishCheck({
  requirements,
  onBack,
  onPublish,
  isPublishing,
}: Props) {
  const allRequirementsMet = Object.values(requirements).every(Boolean);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Publishing Requirements</h2>
        <div className="space-y-4">
          <RequirementItem
            label="Course Title"
            met={requirements.hasTitle}
            description="Add a clear and descriptive title"
          />
          <RequirementItem
            label="Course Description"
            met={requirements.hasDescription}
            description="Provide a detailed description of your course"
          />
          <RequirementItem
            label="Learning Objectives"
            met={requirements.hasObjectives}
            description="List what students will learn"
          />
          <RequirementItem
            label="Course Thumbnail"
            met={requirements.hasThumbnail}
            description="Upload an engaging course thumbnail"
          />
          <RequirementItem
            label="Course Price"
            met={requirements.hasPrice}
            description="Set a price for your course"
          />
          <RequirementItem
            label="Course Content"
            met={requirements.hasModules}
            description="Create at least one module"
          />
          <RequirementItem
            label="Minimum Lessons"
            met={requirements.minimumLessons}
            description="Add at least 3 lessons"
          />
          <RequirementItem
            label="Lesson Content"
            met={requirements.allLessonsHaveContent}
            description="Ensure all lessons have content"
          />
        </div>
      </div>

      {!allRequirementsMet && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            Please complete all requirements before publishing your course.
          </p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Back
        </button>
        <button
          onClick={onPublish}
          disabled={!allRequirementsMet || isPublishing}
          className={`px-6 py-2 rounded-md ${
            allRequirementsMet && !isPublishing
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isPublishing ? 'Publishing...' : 'Publish Course'}
        </button>
      </div>
    </div>
  );
}

interface RequirementItemProps {
  label: string;
  met: boolean;
  description: string;
}

function RequirementItem({ label, met, description }: RequirementItemProps) {
  return (
    <div className="flex items-start space-x-3">
      <div
        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
          met ? 'bg-green-100' : 'bg-gray-100'
        }`}
      >
        {met ? (
          <svg
            className="w-3 h-3 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-3 h-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
