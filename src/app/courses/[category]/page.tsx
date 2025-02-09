'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { IconType } from 'react-icons/lib';
import {
  FaStar, 
  FaUsers, 
  FaClock, 
  FaGraduationCap, 
  FaLaptopCode, 
  FaTractor, 
  FaMobile, 
  FaChartLine, 
  FaVideo, 
  FaPaintBrush,
  FaSearch 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import CourseCard from '@/components/courses/CourseCard';
import type { Course } from '@/types/course';

const categoryIcons = {
  development: FaLaptopCode,
  agriculture: FaTractor,
  'mobile-repair': FaMobile,
  business: FaChartLine,
  'digital-media': FaVideo,
  design: FaPaintBrush
};

const categories: Array<{id: string; name: string; icon: IconType; courses: Course[]}> = [
  {
    id: 'development',
    name: 'Development',
    icon: FaLaptopCode,
    courses: [
      {
        id: 'development-html-basics',
        title: 'HTML Basics: Building Blocks of the Web',
        description: 'Learn the fundamentals of HTML5 and web structure',
        level: 'Beginner',
        duration: '2 weeks',
        instructor: {
          id: 'sarah-chen',
          name: 'Sarah Chen',
          avatar: '/images/instructors/sarah-chen.jpg',
          bio: 'Frontend specialist with 10+ years experience',
          expertise: ['HTML5', 'CSS3', 'Accessibility'],
          rating: 4.8,
          coursesTaught: 15,
          totalStudents: 1500,
          totalCourses: 15
        },
        rating: 4.8,
        studentsEnrolled: 1500,
        price: 0,
        objectives: ['HTML5 Fundamentals', 'Semantic Elements', 'Forms & Validation', 'Best Practices'],
        slug: 'html-basics',
        category: 'development',
        thumbnail: '/images/courses/html-fun.jpg'
      },
      {
        id: 'development-css-basics',
        title: 'CSS Basics: Style with Magic',
        description: 'Master the art of styling web pages with CSS3',
        level: 'Beginner',
        duration: '3 weeks',
        instructor: {
          id: 'instr-002',
          name: 'Alex Rivera',
          avatar: '/images/instructors/alex-rivera.jpg',
          bio: 'CSS specialist and design systems expert',
          expertise: ['CSS Architecture'],
          rating: 4.8,
          coursesTaught: 8,
          totalStudents: 1200,
          totalCourses: 3,
          studentsTaught: 1200,
          courses: ['css-fundamentals']
        },
        rating: 4.7,
        studentsEnrolled: 1200,
        price: 0,
        objectives: ['CSS3 Fundamentals', 'Flexbox', 'Grid Layout', 'Responsive Design'],
        slug: 'css-basics',
        category: 'development',
        thumbnail: '/images/courses/css-magic.jpg',
        objectives: ['Master CSS fundamentals', 'Learn responsive design'],
        syllabus: [
          {
            id: 'week-1',
            title: 'CSS Fundamentals',
            duration: '2 hours',
            lessons: [
              {
                id: 'lesson-1',
                title: 'Introduction to CSS',
                duration: '45m',
                type: 'text' as const
              }
            ]
          }
        ]
      },
      {
        id: 'development-javascript-fundamentals',
        title: 'JavaScript Fundamentals',
        description: 'Learn the core concepts of JavaScript programming',
        level: 'Beginner',
        duration: '4 weeks',
        instructor: {
          id: 'instr-003',
          name: 'Michael Johnson',
          avatar: '/images/instructors/michael-johnson.jpg',
          bio: 'Full-stack JavaScript developer',
          expertise: ['JavaScript', 'TypeScript'],
          rating: 4.9,
          coursesTaught: 15,
          totalStudents: 2500,
          totalCourses: 6,
          studentsTaught: 2500,
          courses: ['javascript-fundamentals', 'typescript-essentials']
        },
        rating: 4.9,
        studentsEnrolled: 2000,
        price: 49.99,
        topics: ['Variables & Data Types', 'Functions', 'DOM Manipulation', 'ES6+ Features'],
        slug: 'javascript-fundamentals',
        category: 'development',
        thumbnail: '/images/courses/js-basics.jpg',
        objectives: ['Understand core JS concepts', 'Learn modern ES6+ features'],
        syllabus: [
          { week: 1, topic: 'Basic Syntax' },
          { week: 2, topic: 'Functions and Scope' }
        ]
      }
    ]
  },
  // ... other categories with their courses
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];

export default function CategoryPage() {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState(params.category || 'all');
  const [currentLevel, setCurrentLevel] = useState('all');

  const filteredCourses = categories.reduce<Course[]>((acc, cat) => {
    if (cat.id === currentCategory || currentCategory === 'all') {
      const categoryCourses = cat.courses.filter(course =>
        course.level.toLowerCase() === currentLevel || currentLevel === 'all'
      );
      return [...acc, ...categoryCourses];
    }
    return acc;
  }, []).filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-16 bg-gray-50">
      {/* Search and Filters Section */}
      <div className="sticky top-16 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-2.5">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Filter Sections */}
          <div className="space-y-4">
            {/* Categories */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Categories</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCurrentCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                      ${currentCategory === cat.id
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-500'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      {cat.icon && <cat.icon className="h-4 w-4" />}
                      {cat.name}
                      <span className="text-xs text-gray-500">
                        ({cat.courses.length})
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Levels */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Level</div>
              <div className="flex flex-wrap gap-2">
                {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setCurrentLevel(level)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                      ${currentLevel === level
                        ? 'bg-green-100 text-green-800 border-2 border-green-500'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <motion.div
              key={`${course.category}-${course.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full"
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
