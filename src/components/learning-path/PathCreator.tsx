'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PathGeneratorOptions, LearningPreferences, TimeCommitment } from '@/types/learning-path';
import { PathGenerator } from '@/lib/learning-path/PathGenerator';

const LEARNING_STYLES = [
  {
    id: 'visual',
    title: 'Visual',
    description: 'Learn best through images, diagrams, and videos',
    icon: '👁️',
  },
  {
    id: 'auditory',
    title: 'Auditory',
    description: 'Learn best through listening and discussion',
    icon: '👂',
  },
  {
    id: 'reading',
    title: 'Reading/Writing',
    description: 'Learn best through reading and writing',
    icon: '📚',
  },
  {
    id: 'kinesthetic',
    title: 'Hands-on',
    description: 'Learn best through practical activities',
    icon: '🛠️',
  },
];

const DIFFICULTY_LEVELS = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'New to the field, starting from basics',
    icon: '🌱',
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'Have some experience, ready to advance',
    icon: '📈',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Experienced, seeking mastery',
    icon: '🎯',
  },
];

export default function PathCreator() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [options, setOptions] = useState<Partial<PathGeneratorOptions>>({
    careerGoal: '',
    currentSkills: [],
    skillLevels: {},
    preferences: {
      learningStyle: 'visual',
      difficulty: 'beginner',
      focusAreas: [],
      excludedTopics: [],
    },
    timeCommitment: {
      hoursPerWeek: 10,
      totalWeeks: 12,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Ensure career goal is provided
      if (!options.careerGoal) {
        throw new Error("Career goal is required");
      }
      
      // Create a complete PathGeneratorOptions object
      const completeOptions: PathGeneratorOptions = {
        careerGoal: options.careerGoal || '',
        currentSkills: options.currentSkills || [],
        skillLevels: options.skillLevels || {},
        timeCommitment: {
          hoursPerWeek: options.timeCommitment?.hoursPerWeek || 10,
          totalWeeks: options.timeCommitment?.totalWeeks || 12,
        },
        preferences: {
          learningStyle: options.preferences?.learningStyle || 'visual',
          difficulty: options.preferences?.difficulty || 'beginner',
          focusAreas: options.preferences?.focusAreas || [],
          excludedTopics: options.preferences?.excludedTopics || [],
        }
      };
      
      const generator = PathGenerator.getInstance();
      const path = await generator.generatePath('user123', completeOptions);
      router.push(`/learning-path/${path.id}`);
    } catch (error) {
      console.error('Failed to generate path:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Progress Steps */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className="flex items-center"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div
                  className={`w-full h-1 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Career Goal</h2>
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">What role do you want to achieve?</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Full Stack Developer"
                  value={options.careerGoal || ''}
                  onChange={(e) =>
                    setOptions({ ...options, careerGoal: e.target.value })
                  }
                />
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Learning Style</h2>
            <div className="grid grid-cols-2 gap-4">
              {LEARNING_STYLES.map((style) => (
                <button
                  key={style.id}
                  className={`p-4 rounded-lg border-2 text-left ${
                    options.preferences?.learningStyle === style.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    // Ensure we have a complete preferences object
                    const updatedPreferences: LearningPreferences = {
                      learningStyle: style.id as 'visual' | 'auditory' | 'reading' | 'kinesthetic',
                      difficulty: options.preferences?.difficulty || 'beginner',
                      focusAreas: options.preferences?.focusAreas || [],
                      excludedTopics: options.preferences?.excludedTopics || []
                    };
                    setOptions({
                      ...options,
                      preferences: updatedPreferences
                    });
                  }}
                >
                  <div className="text-2xl mb-2">{style.icon}</div>
                  <h3 className="font-medium text-gray-900">{style.title}</h3>
                  <p className="text-sm text-gray-500">{style.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Time Commitment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hours per week
                </label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={options.timeCommitment?.hoursPerWeek || 10}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      timeCommitment: {
                        ...options.timeCommitment,
                        hoursPerWeek: parseInt(e.target.value),
                        totalWeeks: options.timeCommitment?.totalWeeks || 12,
                      },
                    })
                  }
                  className="mt-2 w-full"
                />
                <div className="mt-1 text-sm text-gray-500">
                  {options.timeCommitment?.hoursPerWeek} hours per week
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Program duration
                </label>
                <select
                  value={options.timeCommitment?.totalWeeks || 12}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      timeCommitment: {
                        ...options.timeCommitment,
                        hoursPerWeek: options.timeCommitment?.hoursPerWeek || 10,
                        totalWeeks: parseInt(e.target.value),
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="4">1 month</option>
                  <option value="12">3 months</option>
                  <option value="24">6 months</option>
                  <option value="48">12 months</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Difficulty Level</h2>
            <div className="grid grid-cols-3 gap-4">
              {DIFFICULTY_LEVELS.map((level) => (
                <button
                  key={level.id}
                  className={`p-4 rounded-lg border-2 text-left ${
                    options.preferences?.difficulty === level.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    // Ensure we have a complete preferences object
                    const updatedPreferences: LearningPreferences = {
                      learningStyle: options.preferences?.learningStyle || 'visual',
                      difficulty: level.id as 'beginner' | 'intermediate' | 'advanced',
                      focusAreas: options.preferences?.focusAreas || [],
                      excludedTopics: options.preferences?.excludedTopics || []
                    };
                    setOptions({
                      ...options,
                      preferences: updatedPreferences
                    });
                  }}
                >
                  <div className="text-2xl mb-2">{level.icon}</div>
                  <h3 className="font-medium text-gray-900">{level.title}</h3>
                  <p className="text-sm text-gray-500">{level.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between">
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          className={`px-4 py-2 rounded-md ${
            step === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (step === 4) {
              handleSubmit();
            } else {
              setStep(step + 1);
            }
          }}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLoading
            ? 'Generating...'
            : step === 4
            ? 'Create Path'
            : 'Next'}
        </button>
      </div>
    </div>
  );
}
