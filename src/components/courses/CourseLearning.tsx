'use client';

import { useState } from 'react';
import { FaCheck, FaLock, FaTrophy, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

interface Lesson {
  title: string;
  duration: string;
  content?: string;
}

interface Section {
  title: string;
  lessons: Lesson[];
}

interface CourseLearningProps {
  course: {
    title: string;
    curriculum: Section[];
  };
  onClose: () => void;
}

export default function CourseLearning({ course, onClose }: CourseLearningProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const markComplete = (sectionIndex: number, lessonIndex: number) => {
    const key = `${sectionIndex}-${lessonIndex}`;
    setCompletedLessons(prev => new Set([...prev, key]));
  };

  const isCompleted = (sectionIndex: number, lessonIndex: number) => {
    return completedLessons.has(`${sectionIndex}-${lessonIndex}`);
  };

  const canAccess = (sectionIndex: number, lessonIndex: number) => {
    if (sectionIndex === 0 && lessonIndex === 0) return true;
    if (lessonIndex === 0) return isCompleted(sectionIndex - 1, course.curriculum[sectionIndex - 1].lessons.length - 1);
    return isCompleted(sectionIndex, lessonIndex - 1);
  };

  const currentLessonContent = {
    'Getting Started with Sustainable Farming': {
      content: `# Welcome to Sustainable Farming!

## What is Sustainable Farming?

Sustainable farming is an approach to food production that:
- Maintains soil health
- Conserves water
- Supports biodiversity
- Reduces environmental impact

## Key Principles:
1. Soil Conservation
2. Water Management
3. Natural Pest Control
4. Biodiversity

## Your First Activity:
Take a look at your available space and answer these questions:
1. How much sunlight does it get?
2. What's the soil like?
3. What's your water source?

## Knowledge Check:
- What are the three pillars of sustainability?
- Why is soil health important?
- How does biodiversity help farming?

Make notes of your answers and observations. We'll use these in our next lesson!`,
      quiz: [
        {
          question: "What is the main goal of sustainable farming?",
          options: [
            "Maximum profit only",
            "Balance between environment, profit, and community",
            "Using only organic materials",
            "Growing only vegetables"
          ],
          correct: 1
        }
      ]
    },
    'Test Your Soil Quality': {
      content: `# Hands-on Soil Testing

## Today's Activity: Basic Soil Assessment

### Materials Needed:
- A jar with lid
- Soil sample
- Water
- Trowel or spade
- Timer

### Steps:
1. Collect soil sample (avoid wet soil)
2. Fill jar 1/3 with soil
3. Add water until nearly full
4. Shake well
5. Let it settle for 24 hours

### What to Observe:
- Sand settles first (bottom)
- Silt settles second (middle)
- Clay settles last (top)

### Record Your Results:
- Take a photo or draw your jar
- Measure each layer
- Calculate percentages

### Next Steps:
Based on your results, we'll determine:
- Soil type
- Suitable crops
- Required amendments

Remember: Good soil is the foundation of sustainable farming!`
    }
  };

  const goToNextLesson = () => {
    markComplete(currentSection, currentLesson);
    const currentSectionLessons = course.curriculum[currentSection].lessons.length;
    if (currentLesson + 1 < currentSectionLessons) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentSection + 1 < course.curriculum.length) {
      setCurrentSection(currentSection + 1);
      setCurrentLesson(0);
    }
  };

  const goToPreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentLesson(course.curriculum[currentSection - 1].lessons.length - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 border-r overflow-y-auto">
        <div className="p-4 border-b bg-white sticky top-0">
          <h2 className="font-bold text-lg">{course.title}</h2>
          <p className="text-sm text-gray-500">Your Learning Progress</p>
        </div>
        <div className="p-4">
          {course.curriculum.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h3 className="font-medium mb-2">{section.title}</h3>
              <div className="space-y-2">
                {section.lessons.map((lesson, lessonIndex) => {
                  const isActive = currentSection === sectionIndex && currentLesson === lessonIndex;
                  const completed = isCompleted(sectionIndex, lessonIndex);
                  const accessible = canAccess(sectionIndex, lessonIndex);

                  return (
                    <button
                      key={lessonIndex}
                      onClick={() => {
                        if (accessible) {
                          setCurrentSection(sectionIndex);
                          setCurrentLesson(lessonIndex);
                        }
                      }}
                      className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${
                        isActive
                          ? 'bg-green-50 text-green-700'
                          : accessible
                          ? 'hover:bg-gray-100'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        completed
                          ? 'bg-green-500 text-white'
                          : accessible
                          ? 'border-2 border-gray-300'
                          : 'bg-gray-200'
                      }`}>
                        {completed ? <FaCheck size={12} /> : accessible ? null : <FaLock size={12} />}
                      </div>
                      <span className="text-sm">{lesson.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back to Course
          </button>
          <div className="text-sm text-gray-500">
            {currentSection + 1}/{course.curriculum.length} Sections
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
              {course.curriculum[currentSection].lessons[currentLesson].title}
            </h1>
            
            <div className="prose max-w-none">
              {currentLessonContent[course.curriculum[currentSection].lessons[currentLesson].title]?.content ? (
                <div className="markdown-content">
                  {currentLessonContent[course.curriculum[currentSection].lessons[currentLesson].title].content}
                </div>
              ) : (
                <div className="text-gray-500 italic">
                  This lesson is under development. Check back soon!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="p-4 border-t bg-white sticky bottom-0">
          <div className="max-w-3xl mx-auto flex justify-between">
            <button
              onClick={goToPreviousLesson}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                currentSection === 0 && currentLesson === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              disabled={currentSection === 0 && currentLesson === 0}
            >
              <FaArrowLeft />
              Previous
            </button>
            <button
              onClick={goToNextLesson}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {isCompleted(currentSection, currentLesson) ? (
                <>
                  Next
                  <FaArrowRight />
                </>
              ) : (
                <>
                  Complete & Continue
                  <FaTrophy />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
