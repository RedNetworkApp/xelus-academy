'use client';

import React from 'react';
import { FaHandSparkles, FaPalette, FaCode, FaLightbulb, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CodeEditor from '@/components/courses/CodeEditor';
import CourseCompletion from '@/components/courses/CourseCompletion';

interface Exercise {
  title: string;
  description: string;
  initialCode: string;
  expectedOutput: string;
  hint?: string;
  explanation?: string;
}

export default function CSSBasics() {
  const [currentExercise, setCurrentExercise] = React.useState(0);
  const [completedExercises, setCompletedExercises] = React.useState<number[]>([]);
  const [showExplanation, setShowExplanation] = React.useState(false);

  const exercises: Exercise[] = [
    {
      title: "Basic Styling",
      description: "Let's start with basic CSS properties to style a box. Try to create a blue square box with specific dimensions.",
      initialCode: `/* Style the box to make it blue and square */
.box {
  
}`,
      expectedOutput: `.box {
  background-color: blue;
  width: 100px;
  height: 100px;
}`,
      hint: "Use background-color for the color, and width/height for dimensions",
      explanation: "The background-color property sets the background color of an element. Width and height properties define the dimensions of the element."
    },
    {
      title: "Flexbox Layout",
      description: "Create a centered flex container with three items arranged horizontally.",
      initialCode: `/* Create a flex container with centered items */
.container {
  
}

.item {
  
}`,
      expectedOutput: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.item {
  padding: 20px;
  background-color: #e5e7eb;
  border-radius: 8px;
}`,
      hint: "Use display: flex and various flex properties to control alignment",
      explanation: "Flexbox is a powerful layout model that helps distribute space and align content. The justify-content property aligns items horizontally, while align-items aligns them vertically."
    },
    {
      title: "Responsive Design",
      description: "Create a responsive grid that changes columns based on screen size.",
      initialCode: `/* Make the grid responsive */
.grid {
  
}

.grid-item {
  
}`,
      expectedOutput: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.grid-item {
  background-color: #f3f4f6;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}`,
      hint: "Use CSS Grid with repeat() and minmax() for responsiveness",
      explanation: "CSS Grid's auto-fit and minmax() create a responsive layout that automatically adjusts columns based on available space. This is perfect for responsive designs without media queries."
    },
    {
      title: "Animations",
      description: "Create a smooth hover animation for a button.",
      initialCode: `/* Add hover animations to the button */
.button {
  
}

.button:hover {
  
}`,
      expectedOutput: `.button {
  padding: 12px 24px;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #2563eb;
}`,
      hint: "Use transition for smooth effects and transform for movement",
      explanation: "CSS transitions create smooth animations between property changes. The transform property can move, rotate, or scale elements, while box-shadow adds depth."
    }
  ];

  const handleExerciseComplete = () => {
    if (!completedExercises.includes(currentExercise)) {
      setCompletedExercises([...completedExercises, currentExercise]);
      setShowExplanation(true);
    }
  };

  if (completedExercises.length === exercises.length) {
    return (
      <CourseCompletion
        courseName="CSS Basics"
        totalPoints={100}
        achievements={[
          "CSS Master",
          "Style Guru",
          "Layout Expert",
          "Animation Wizard"
        ]}
        nextCourseSlug="javascript-basics"
        nextCourseName="JavaScript Basics"
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">CSS Basics</h1>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaPalette className="text-blue-500" />
          <span>Learn to style your web pages with CSS</span>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round((completedExercises.length / exercises.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(completedExercises.length / exercises.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Exercise Section */}
      <motion.div
        key={currentExercise}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Exercise {currentExercise + 1}: {exercises[currentExercise].title}
          </h2>
          <p className="text-gray-600 mb-4">{exercises[currentExercise].description}</p>
          
          <CodeEditor
            initialCode={exercises[currentExercise].initialCode}
            expectedOutput={exercises[currentExercise].expectedOutput}
            onComplete={handleExerciseComplete}
            hint={exercises[currentExercise].hint}
          />
        </div>

        {/* Explanation Panel */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 rounded-lg p-6 mb-6"
          >
            <div className="flex items-start space-x-3">
              <FaLightbulb className="text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Explanation</h3>
                <p className="text-blue-800">{exercises[currentExercise].explanation}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              setCurrentExercise(Math.max(0, currentExercise - 1));
              setShowExplanation(false);
            }}
            disabled={currentExercise === 0}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            Previous
          </button>
          
          <div className="flex space-x-4">
            {completedExercises.includes(currentExercise) && (
              <span className="flex items-center text-green-500">
                <FaCheck className="mr-2" />
                Completed
              </span>
            )}
            <button
              onClick={() => {
                setCurrentExercise(Math.min(exercises.length - 1, currentExercise + 1));
                setShowExplanation(false);
              }}
              disabled={currentExercise === exercises.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              Next Exercise
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
