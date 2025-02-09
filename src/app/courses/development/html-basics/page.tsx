'use client';

import React from 'react';
import { FaCode, FaHtml5, FaLaptopCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CodeEditor from '@/components/courses/CodeEditor';
import CourseCompletion from '@/components/courses/CourseCompletion';

interface Exercise {
  initialCode: string;
  expectedOutput: string;
  hint?: string;
}

export default function HTMLBasics() {
  const [currentExercise, setCurrentExercise] = React.useState(0);
  const [completedExercises, setCompletedExercises] = React.useState<number[]>([]);

  const exercises: Exercise[] = [
    {
      initialCode: `<!-- Add your HTML here -->
<div>
  
</div>`,
      expectedOutput: `<div>
  <h1>Hello World</h1>
  <p>Welcome to HTML Basics!</p>
</div>`,
      hint: "Try adding h1 and p tags inside the div"
    },
    // Add more exercises here
  ];

  const handleExerciseComplete = () => {
    if (!completedExercises.includes(currentExercise)) {
      setCompletedExercises([...completedExercises, currentExercise]);
    }
  };

  if (completedExercises.length === exercises.length) {
    return (
      <CourseCompletion
        courseName="HTML Basics"
        totalPoints={100}
        achievements={[
          "HTML Master",
          "Structure Expert",
          "Tag Wizard"
        ]}
        nextCourseSlug="css-basics"
        nextCourseName="CSS Basics"
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">HTML Basics</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Exercise {currentExercise + 1}</h2>
        <CodeEditor
          initialCode={exercises[currentExercise].initialCode}
          expectedOutput={exercises[currentExercise].expectedOutput}
          onComplete={handleExerciseComplete}
          hint={exercises[currentExercise].hint}
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
          disabled={currentExercise === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentExercise(Math.min(exercises.length - 1, currentExercise + 1))}
          disabled={currentExercise === exercises.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
