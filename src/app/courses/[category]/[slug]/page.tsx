'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  FaStar, FaUsers, FaClock, FaBook, FaClipboardCheck, 
  FaPuzzlePiece, FaTrophy, FaHandsHelping 
} from 'react-icons/fa';
import CourseLearning from '@/components/courses/CourseLearning';
import { lessons as htmlLessons, courseInfo as htmlCourseInfo } from './html-basics';
import { lessons as cssLessons, courseInfo as cssCourseInfo } from './css-basics';
import { lessons as gitLessons, courseInfo as gitCourseInfo } from './git-basics';
import { lessons as jsLessons, courseInfo as jsCourseInfo } from './javascript-basics';
import { lessons as reactLessons, courseInfo as reactCourseInfo } from './react-fundamentals';
import { lessons as nodeLessons, courseInfo as nodeCourseInfo } from './nodejs-essentials';
import { lessons as pythonLessons, courseInfo as pythonCourseInfo } from './python-basics';
import { lessons as dbLessons, courseInfo as dbCourseInfo } from './database-fundamentals';

import type { LessonContent } from '@/types/course-content';

interface Course {
  id: string;
  title: string;
  description: string;
  studentsEnrolled: number;
  rating: number;
  duration: string;
  level: string;
  price: number;
  thumbnail?: string;
  instructor: {
    name: string;
    expertise: string[];
  };
  category: string;
  curriculum: {
    title: string;
    content: LessonContent[];
  }[];
  features: string[];
  syllabus: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  studentsEnrolled: number;
  rating: number;
  duration: string;
  level: string;
  price: number;
  thumbnail?: string;
  instructor: {
    name: string;
    expertise: string[];
  };
  category: string;
  curriculum: {
    title: string;
    content: LessonContent[];
  }[];
  features: string[];
}

const coursesData: { [key: string]: Course } = {
  'html-basics': {
    ...htmlCourseInfo,
    id: 'html-basics',
    category: 'development',
    features: [
      "Interactive coding exercises",
      "Real-world projects",
      "HTML5 semantic markup",
      "Form validation techniques",
      "Accessibility best practices"
    ],
    curriculum: htmlLessons.map((lesson: { title: string; content: LessonContent[] }) => ({
      title: lesson.title,
      content: lesson.content.map((content: LessonContent) => ({
        type: content.type,
        text: content.text || 'Coding Exercise',
        duration: '20-30 mins'
      }))
    }))
  },
  'css-basics': {
    ...cssCourseInfo,
    id: 'css-basics',
    category: 'development',
    features: [
      "Interactive style challenges",
      "Responsive design projects",
      "CSS Grid/Flexbox layouts",
      "Animation techniques",
      "Browser compatibility guide"
    ],
    curriculum: cssLessons.map((lesson: { title: string; content: LessonContent[] }) => ({
      title: lesson.title,
      content: lesson.content.map((content: LessonContent) => ({
        title: content.type === 'text' ? content.text! : 'Coding Exercise',
        duration: '20-30 mins'
      }))
    }))
  },
  'git-basics': {
    ...gitCourseInfo,
    id: 'git-basics',
    category: 'development',
    features: [
      "Interactive coding exercises",
      "Real-world projects",
      "Version control best practices",
      "GitHub integration guide",
      "Troubleshooting common issues"
    ],
    curriculum: gitLessons.map((lesson: { title: string; content: LessonContent[] }) => ({
      title: lesson.title,
      content: lesson.content.map((content: LessonContent) => ({
        title: content.type === 'text' ? content.text! : 'Coding Exercise',
        duration: '20-30 mins'
      }))
    }))
  },
  'javascript-basics': {
    ...jsCourseInfo,
    id: 'javascript-basics',
    category: 'development',
    features: [
      "Interactive coding challenges",
      "Real-world applications",
      "ES6+ features",
      "DOM manipulation",
      "Async programming"
    ],
    curriculum: jsLessons.map((lesson) => ({
      title: lesson.title,
      content: lesson.content.map((content) => ({
        type: content.type,
        text: content.text || 'Coding Exercise',
        duration: '20-30 mins'
      }))
    }))
  },
  'react-fundamentals': {
    ...reactCourseInfo,
    id: 'react-fundamentals',
    category: 'development',
    features: [
      "Component-based architecture",
      "State management",
      "Hooks system",
      "React Router",
      "Performance optimization"
    ],
    curriculum: reactLessons.map((lesson) => ({
      title: lesson.title,
      lessons: lesson.content.map((content) => ({
        title: content.type === 'text' ? content.text! : 'Coding Exercise',
        duration: '20-30 mins'
      }))
    }))
  },
  'nodejs-essentials': {
    ...nodeCourseInfo,
    id: 'nodejs-essentials',
    category: 'development',
    features: [
      "REST API development",
      "Express framework",
      "Database integration",
      "Authentication",
      "Deployment strategies"
    ],
    curriculum: nodeLessons.map((lesson) => ({
      title: lesson.title,
      lessons: lesson.content.map((content) => ({
        title: content.type === 'text' ? content.text! : 'Coding Exercise',
        duration: '20-30 mins'
      }))
    }))
  },
  'python-basics': {
    ...pythonCourseInfo,
    id: 'python-basics',
    category: 'development',
    features: [
      "Python syntax fundamentals",
      "Data structures",
      "File handling",
      "OOP concepts",
      "Error handling"
    ],
    curriculum: pythonLessons.map((lesson) => ({
      title: lesson.title,
      lessons: lesson.content.map((content) => ({
        title: content.type === 'text' ? content.text! : 'Coding Exercise',
        duration: '20-30 mins'
      }))
    }))
  },
  'database-fundamentals': {
    ...dbCourseInfo,
    id: 'database-fundamentals',
    category: 'development',
    features: [
      "SQL queries",
      "Database design",
      "Normalization",
      "NoSQL concepts",
      "MongoDB basics"
    ],
    curriculum: dbLessons.map((lesson) => ({
      title: lesson.title,
      lessons: lesson.content.map((content) => ({
        title: content.type === 'text' ? content.text! : 'Coding Exercise',
        duration: '20-30 mins'
      }))
    }))
  }
};

export default function CoursePage() {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isLearning, setIsLearning] = useState(false);

  useEffect(() => {
    const courseData = coursesData[params.slug as string];
    setCourse(courseData);
  }, [params.slug]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (isLearning) {
    return <CourseLearning course={course} onClose={() => setIsLearning(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Course Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{course.description}</p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            {course.rating && (
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{course.rating.toFixed(1)}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <FaUsers />
              <span>{course.studentsEnrolled?.toLocaleString()} students</span>
            </div>
            {course.duration && (
              <div className="flex items-center gap-1">
                <FaClock />
                <span>{course.duration}</span>
              </div>
            )}
            {course.level && (
              <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {course.level}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Course Features */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    {index === 0 && <FaBook className="text-green-600" />}
                    {index === 1 && <FaHandsHelping className="text-green-600" />}
                    {index === 2 && <FaPuzzlePiece className="text-green-600" />}
                    {index === 3 && <FaClipboardCheck className="text-green-600" />}
                    {index === 4 && <FaTrophy className="text-green-600" />}
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
            <div className="space-y-4">
              {course.curriculum?.map((section, index) => (
                <div key={index} className="border rounded-lg">
                  <button
                    onClick={() => setActiveSection(activeSection === index ? -1 : index)}
                    className="w-full p-4 bg-gray-50 border-b flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="font-medium">{section.title}</h3>
                    <span className="text-sm text-gray-500">
                      {section.lessons.length} lessons
                    </span>
                  </button>
                  <div className={`divide-y ${activeSection === index ? 'block' : 'hidden'}`}>
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <span>{lesson.title}</span>
                        <span className="text-sm text-gray-500">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <div className="text-center">
              <div className="text-3xl font-bold mb-4">
                {course.price === 0 ? 'Free' : `$${course.price}`}
              </div>
              <button 
                onClick={() => setIsLearning(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start Learning
              </button>
              <p className="mt-4 text-sm text-gray-500">
                30-day money back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
