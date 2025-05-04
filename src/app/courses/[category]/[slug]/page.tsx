'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  FaStar, FaUsers, FaClock, FaBook, FaClipboardCheck, 
  FaPuzzlePiece, FaTrophy, FaHandsHelping 
} from 'react-icons/fa';
import CourseLearning from '@/components/courses/CourseLearning';
import { Course, Module, Lesson } from '@/types/course';
import { LessonContent } from '@/types/course-content';
import { courseInfo as nodeCourseInfo } from './nodejs-essentials';

const htmlLessons: Module[] = [
  {
    id: 'module-1',
    title: 'HTML Fundamentals',
    description: 'Learn the basics of HTML',
    duration: '1 hour',
    order: 1,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to HTML',
        duration: '15 minutes',
        content: {
          type: 'text',
          title: 'HTML Basics',
          text: 'Learn about HTML tags and structure',
          duration: '15 minutes'
        },
        order: 1
      },
      {
        id: 'lesson-2',
        title: 'HTML Elements',
        duration: '15 minutes',
        content: {
          type: 'video',
          title: 'Working with HTML Elements',
          videoUrl: 'https://example.com/html-elements',
          duration: '15 minutes'
        },
        order: 2
      }
    ]
  }
];

const cssLessons: Module[] = [
  {
    id: 'module-1',
    title: 'CSS Fundamentals',
    description: 'Learn the basics of CSS',
    duration: '1 hour',
    order: 1,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to CSS',
        duration: '15 minutes',
        content: {
          type: 'text',
          title: 'CSS Basics',
          text: 'Learn about CSS selectors and properties',
          duration: '15 minutes'
        },
        order: 1
      },
      {
        id: 'lesson-2',
        title: 'CSS Box Model',
        duration: '15 minutes',
        content: {
          type: 'video',
          title: 'Understanding the Box Model',
          videoUrl: 'https://example.com/css-box-model',
          duration: '15 minutes'
        },
        order: 2
      }
    ]
  }
];

const gitLessons: Module[] = [
  {
    id: 'module-1',
    title: 'Git Basics',
    description: 'Learn version control with Git',
    duration: '1 hour',
    order: 1,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to Git',
        duration: '15 minutes',
        content: {
          type: 'text',
          title: 'Git Fundamentals',
          text: 'Learn about version control with Git',
          duration: '15 minutes'
        },
        order: 1
      },
      {
        id: 'lesson-2',
        title: 'Git Commands',
        duration: '15 minutes',
        content: {
          type: 'video',
          title: 'Basic Git Commands',
          videoUrl: 'https://example.com/git-commands',
          duration: '15 minutes'
        },
        order: 2
      }
    ]
  }
];

const jsLessons: Module[] = [
  {
    id: 'module-1',
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript',
    duration: '1 hour',
    order: 1,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to JavaScript',
        duration: '15 minutes',
        content: {
          type: 'text',
          title: 'JavaScript Basics',
          text: 'Learn about JavaScript variables and data types',
          duration: '15 minutes'
        },
        order: 1
      },
      {
        id: 'lesson-2',
        title: 'JavaScript Functions',
        duration: '15 minutes',
        content: {
          type: 'video',
          title: 'Working with JavaScript Functions',
          videoUrl: 'https://example.com/javascript-functions',
          duration: '15 minutes'
        },
        order: 2
      }
    ]
  }
];

const reactLessons: Module[] = [
  {
    id: 'module-1',
    title: 'React Fundamentals',
    description: 'Learn the basics of React',
    duration: '1 hour',
    order: 1,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to React',
        duration: '15 minutes',
        content: {
          type: 'text',
          title: 'React Basics',
          text: 'Learn about React components and JSX',
          duration: '15 minutes'
        },
        order: 1
      },
      {
        id: 'lesson-2',
        title: 'React State and Props',
        duration: '15 minutes',
        content: {
          type: 'video',
          title: 'Working with React State and Props',
          videoUrl: 'https://example.com/react-state-props',
          duration: '15 minutes'
        },
        order: 2
      }
    ]
  }
];

const nodeLessons: Module[] = [
  {
    id: 'module-1',
    title: 'Node.js Fundamentals',
    description: 'Learn the basics of Node.js',
    duration: '1 hour',
    order: 1,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to Node.js',
        duration: '15 minutes',
        content: {
          type: 'text',
          title: 'Node.js Basics',
          text: 'Learn about Node.js and its ecosystem',
          duration: '15 minutes'
        },
        order: 1
      },
      {
        id: 'lesson-2',
        title: 'Node.js Modules and Packages',
        duration: '15 minutes',
        content: {
          type: 'video',
          title: 'Working with Node.js Modules and Packages',
          videoUrl: 'https://example.com/nodejs-modules-packages',
          duration: '15 minutes'
        },
        order: 2
      }
    ]
  }
];

const pythonLessons: Module[] = [
  {
    id: 'module-1',
    title: 'Python Fundamentals',
    description: 'Learn the basics of Python',
    duration: '1 hour',
    order: 1,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to Python',
        duration: '15 minutes',
        content: {
          type: 'text',
          title: 'Python Basics',
          text: 'Learn about Python variables and data types',
          duration: '15 minutes'
        },
        order: 1
      },
      {
        id: 'lesson-2',
        title: 'Python Functions',
        duration: '15 minutes',
        content: {
          type: 'video',
          title: 'Working with Python Functions',
          videoUrl: 'https://example.com/python-functions',
          duration: '15 minutes'
        },
        order: 2
      }
    ]
  }
];

const dbLessons: Module[] = [
  {
    id: 'module-1',
    title: 'Database Fundamentals',
    description: 'Learn the basics of databases',
    duration: '1 hour',
    order: 1,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to Databases',
        duration: '15 minutes',
        content: {
          type: 'text',
          title: 'Database Basics',
          text: 'Learn about database concepts and terminology',
          duration: '15 minutes'
        },
        order: 1
      },
      {
        id: 'lesson-2',
        title: 'Database Design',
        duration: '15 minutes',
        content: {
          type: 'video',
          title: 'Working with Database Design',
          videoUrl: 'https://example.com/database-design',
          duration: '15 minutes'
        },
        order: 2
      }
    ]
  }
];

const coursesData: { [key: string]: Course } = {
  'html-basics': {
    id: 'html-basics',
    title: 'HTML Basics',
    description: 'Learn the fundamentals of HTML',
    duration: '2 hours',
    instructor: {
      id: 'instructor-1',
      name: 'John Doe',
      avatar: '/instructors/john-doe.jpg',
      bio: 'Web Development Instructor',
      expertise: ['HTML', 'CSS', 'JavaScript'],
      rating: 4.8,
      studentsTaught: 5000,
      courses: ['html-basics', 'css-basics'],
      totalStudents: 5000,
      totalCourses: 2
    },
    syllabus: ['HTML Basics', 'HTML Elements', 'HTML Forms'],
    curriculum: htmlLessons,
    studentsEnrolled: 1000,
    rating: 4.5,
    level: 'Beginner',
    price: 29.99,
    prerequisites: ['Basic computer skills'],
    category: 'development',
    features: ['Lifetime access', 'Certificate'],
    thumbnail: '/courses/html-basics.jpg',
    language: 'English',
    lastUpdated: '2024-01-15',
    certificate: true,
    tags: ['html', 'web development'],
    slug: 'html-basics'
  },
  'css-basics': {
    id: 'css-basics',
    title: 'CSS Basics',
    description: 'Learn the fundamentals of CSS',
    duration: '2 hours',
    instructor: {
      id: 'instructor-2',
      name: 'Jane Smith',
      avatar: '/instructors/jane-smith.jpg',
      bio: 'CSS Expert',
      expertise: ['CSS', 'Sass', 'Less'],
      rating: 4.9,
      studentsTaught: 4000,
      courses: ['css-basics', 'advanced-css'],
      totalStudents: 4000,
      totalCourses: 2
    },
    syllabus: ['CSS Basics', 'CSS Box Model', 'CSS Flexbox'],
    curriculum: cssLessons,
    studentsEnrolled: 800,
    rating: 4.6,
    level: 'Beginner',
    price: 29.99,
    prerequisites: ['Basic HTML knowledge'],
    category: 'development',
    features: ['Lifetime access', 'Certificate'],
    thumbnail: '/courses/css-basics.jpg',
    language: 'English',
    lastUpdated: '2024-01-15',
    certificate: true,
    tags: ['css', 'web development'],
    slug: 'css-basics'
  },
  'git-basics': {
    id: 'git-basics',
    title: 'Git Basics',
    description: 'Learn version control with Git',
    duration: '2 hours',
    instructor: {
      id: 'instructor-3',
      name: 'Mike Johnson',
      avatar: '/instructors/mike-johnson.jpg',
      bio: 'Git Expert',
      expertise: ['Git', 'GitHub', 'GitLab'],
      rating: 4.7,
      studentsTaught: 3000,
      courses: ['git-basics', 'advanced-git'],
      totalStudents: 3000,
      totalCourses: 2
    },
    syllabus: ['Git Basics', 'Git Commands', 'Git Workflow'],
    curriculum: gitLessons,
    studentsEnrolled: 600,
    rating: 4.4,
    level: 'Beginner',
    price: 29.99,
    prerequisites: ['Basic command line knowledge'],
    category: 'development',
    features: ['Lifetime access', 'Certificate'],
    thumbnail: '/courses/git-basics.jpg',
    language: 'English',
    lastUpdated: '2024-01-15',
    certificate: true,
    tags: ['git', 'version control'],
    slug: 'git-basics'
  },
  'javascript-basics': {
    id: 'javascript-basics',
    title: 'JavaScript Basics',
    description: 'Learn the fundamentals of JavaScript',
    duration: '2 hours',
    instructor: {
      id: 'instructor-4',
      name: 'Emily Chen',
      avatar: '/instructors/emily-chen.jpg',
      bio: 'JavaScript Expert',
      expertise: ['JavaScript', 'React', 'Angular'],
      rating: 4.8,
      studentsTaught: 5000,
      courses: ['javascript-basics', 'advanced-javascript'],
      totalStudents: 5000,
      totalCourses: 2
    },
    syllabus: ['JavaScript Basics', 'JavaScript Functions', 'JavaScript Objects'],
    curriculum: jsLessons,
    studentsEnrolled: 1000,
    rating: 4.5,
    level: 'Beginner',
    price: 29.99,
    prerequisites: ['Basic HTML and CSS knowledge'],
    category: 'development',
    features: ['Lifetime access', 'Certificate'],
    thumbnail: '/courses/javascript-basics.jpg',
    language: 'English',
    lastUpdated: '2024-01-15',
    certificate: true,
    tags: ['javascript', 'web development'],
    slug: 'javascript-basics'
  },
  'react-fundamentals': {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Learn the fundamentals of React',
    duration: '2 hours',
    instructor: {
      id: 'instructor-5',
      name: 'David Lee',
      avatar: '/instructors/david-lee.jpg',
      bio: 'React Expert',
      expertise: ['React', 'Redux', 'React Router'],
      rating: 4.9,
      studentsTaught: 4000,
      courses: ['react-fundamentals', 'advanced-react'],
      totalStudents: 4000,
      totalCourses: 2
    },
    syllabus: ['React Basics', 'React Components', 'React State and Props'],
    curriculum: reactLessons,
    studentsEnrolled: 800,
    rating: 4.6,
    level: 'Beginner',
    price: 29.99,
    prerequisites: ['JavaScript fundamentals', 'ES6+ features'],
    category: 'development',
    features: ['Lifetime access', 'Certificate'],
    thumbnail: '/courses/react-fundamentals.jpg',
    language: 'English',
    lastUpdated: '2024-01-15',
    certificate: true,
    tags: ['react', 'web development'],
    slug: 'react-fundamentals'
  },
  'nodejs-essentials': nodeCourseInfo,
  'python-basics': {
    id: 'python-basics',
    title: 'Python Basics',
    description: 'Learn the fundamentals of Python',
    duration: '2 hours',
    instructor: {
      id: 'instructor-6',
      name: 'Sophia Patel',
      avatar: '/instructors/sophia-patel.jpg',
      bio: 'Python Expert',
      expertise: ['Python', 'Data Science', 'Machine Learning'],
      rating: 4.8,
      studentsTaught: 5000,
      courses: ['python-basics', 'advanced-python'],
      totalStudents: 5000,
      totalCourses: 2
    },
    syllabus: ['Python Basics', 'Python Functions', 'Python Objects'],
    curriculum: pythonLessons,
    studentsEnrolled: 1000,
    rating: 4.5,
    level: 'Beginner',
    price: 29.99,
    prerequisites: ['Basic programming concepts'],
    category: 'development',
    features: ['Lifetime access', 'Certificate'],
    thumbnail: '/courses/python-basics.jpg',
    language: 'English',
    lastUpdated: '2024-01-15',
    certificate: true,
    tags: ['python', 'programming'],
    slug: 'python-basics'
  },
  'database-fundamentals': {
    id: 'database-fundamentals',
    title: 'Database Fundamentals',
    description: 'Learn the basics of databases',
    duration: '2 hours',
    instructor: {
      id: 'instructor-7',
      name: 'Kevin White',
      avatar: '/instructors/kevin-white.jpg',
      bio: 'Database Expert',
      expertise: ['Databases', 'SQL', 'NoSQL'],
      rating: 4.9,
      studentsTaught: 4000,
      courses: ['database-fundamentals', 'advanced-databases'],
      totalStudents: 4000,
      totalCourses: 2
    },
    syllabus: ['Database Basics', 'Database Design', 'Database Querying'],
    curriculum: dbLessons,
    studentsEnrolled: 800,
    rating: 4.6,
    level: 'Beginner',
    price: 29.99,
    prerequisites: ['Basic computer skills', 'Logic fundamentals'],
    category: 'development',
    features: ['Lifetime access', 'Certificate'],
    thumbnail: '/courses/database-fundamentals.jpg',
    language: 'English',
    lastUpdated: '2024-01-15',
    certificate: true,
    tags: ['databases', 'data storage'],
    slug: 'database-fundamentals'
  }
};

export default function CoursePage({
  params
}: {
  params: { category: string; slug: string };
}) {
  const [isLearning, setIsLearning] = useState(false);
  const course = coursesData[params.slug];

  if (!course) {
    return <div>Course not found</div>;
  }

  if (isLearning) {
    return <CourseLearning course={course} onClose={() => setIsLearning(false)} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Course Info */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.syllabus?.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
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
                  {typeof item === 'string' ? item : item.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
            <div className="space-y-4">
              {course.curriculum?.map((section, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">{section.title}</h3>
                    <span className="text-sm text-gray-500">
                      {section.lessons.length} lessons
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <li
                        key={lessonIndex}
                        className="flex justify-between items-center text-sm text-gray-600"
                      >
                        <span>{lesson.title}</span>
                        <span>{lesson.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="text-center mb-6">
              <span className="text-3xl font-bold">${course.price}</span>
            </div>
            <button
              onClick={() => setIsLearning(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Learning
            </button>
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{course.duration} of content</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                <span>Full lifetime access</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Certificate of completion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
