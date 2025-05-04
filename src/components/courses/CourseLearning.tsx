'use client';

import { useState } from 'react';
import { FaCheck, FaLock, FaTrophy, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import { Course, CourseLearningProps, Module, Lesson } from '@/types/course';

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
    if (lessonIndex === 0) {
      if (!course.curriculum?.[sectionIndex - 1]?.lessons) return false;
      return isCompleted(sectionIndex - 1, course.curriculum[sectionIndex - 1].lessons.length - 1);
    }
    return isCompleted(sectionIndex, lessonIndex - 1);
  };

  // Sample lesson content for demonstration
  const currentLessonContent: Record<string, {content: string, quiz?: {question: string, options: string[], correct: number}[]}> = {
    'Introduction to HTML': {
      content: `# Welcome to HTML Basics!

## What is HTML?

HTML (HyperText Markup Language) is the standard language for creating web pages:
- Provides the structure of web pages
- Uses elements to define content
- Works with CSS and JavaScript to create modern web experiences

## Key Concepts:
1. HTML Elements
2. Attributes
3. Document Structure
4. Semantic HTML

## Your First Activity:
Create a simple HTML page with:
1. A heading
2. A paragraph
3. An image
4. A link

## Knowledge Check:
- What does HTML stand for?
- What is the purpose of HTML?
- How do HTML elements work?

Make notes of your answers and observations. We'll use these in our next lesson!`,
      quiz: [
        {
          question: "What does HTML stand for?",
          options: [
            "Hyper Transfer Markup Language",
            "HyperText Markup Language",
            "High-level Text Management Language",
            "Hyperlink and Text Markup Language"
          ],
          correct: 1
        }
      ]
    },
    'HTML Elements': {
      content: `# Working with HTML Elements

## Core HTML Elements

### Essential Elements:
- h1-h6: Headings
- p: Paragraphs
- a: Links
- img: Images
- ul/ol: Lists
- div: Container

### Semantic Elements:
- header: Page header
- nav: Navigation
- main: Main content
- section: Content section
- article: Independent content
- footer: Page footer

### Example Code:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
</head>
<body>
  <h1>Welcome to HTML</h1>
  <p>This is a paragraph of text.</p>
  <a href="https://example.com">Click here</a>
</body>
</html>
\`\`\`

Practice creating your own HTML document with various elements!`
    }
  };

  const goToNextLesson = () => {
    markComplete(currentSection, currentLesson);
    const currentSectionLessons = course.curriculum?.[currentSection]?.lessons.length || 0;
    if (currentLesson + 1 < currentSectionLessons) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentSection + 1 < (course.curriculum?.length || 0)) {
      setCurrentSection(currentSection + 1);
      setCurrentLesson(0);
    }
  };

  const goToPreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentLesson((course.curriculum?.[currentSection - 1]?.lessons.length || 1) - 1);
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
          {course.curriculum?.map((module, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h3 className="font-medium mb-2">{module.title}</h3>
              <div className="space-y-2">
                {module.lessons.map((lesson, lessonIndex) => {
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
            {currentSection + 1}/{course.curriculum?.length || 0} Modules
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
              {course.curriculum?.[currentSection]?.lessons[currentLesson]?.title || "Lesson Title"}
            </h1>
            
            <div className="prose max-w-none">
              {currentLessonContent[course.curriculum?.[currentSection]?.lessons[currentLesson]?.title || ""]?.content ? (
                <div className="markdown-content">
                  {currentLessonContent[course.curriculum?.[currentSection]?.lessons[currentLesson]?.title || ""].content}
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
