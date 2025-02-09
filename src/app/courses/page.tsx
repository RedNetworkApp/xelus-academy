'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
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
import CourseFilters from '@/components/courses/CourseFilters';
import CourseCard from '@/components/courses/CourseCard';

const categories = [
  {
    id: 'development',
    name: 'Development',
    icon: FaLaptopCode,
    courses: [
      {
        id: 'html-basics',
        title: 'HTML Basics: Building Blocks of the Web',
        description: 'Learn the fundamentals of HTML5 and web structure',
        level: 'Beginner',
        duration: '2 weeks',
        instructor: {
          name: 'Sarah Chen',
          expertise: ['HTML', 'CSS', 'JavaScript'],
          rating: 4.8,
          totalStudents: 5000
        },
        rating: 4.8,
        studentsEnrolled: 1500,
        price: 0
      },
      {
        id: 'css-basics',
        title: 'CSS Basics: Style with Magic',
        description: 'Master the art of styling web pages with CSS3',
        level: 'Beginner',
        duration: '3 weeks',
        instructor: {
          name: 'Alex Rivera',
          expertise: ['CSS', 'Responsive Design'],
          rating: 4.7,
          totalStudents: 4200
        },
        rating: 4.7,
        studentsEnrolled: 1200,
        price: 0
      },
      {
        id: 'javascript-basics',
        title: 'JavaScript Essentials',
        description: 'Core concepts of JavaScript programming',
        level: 'Beginner',
        duration: '4 weeks',
        instructor: {
          name: 'Michael Johnson',
          expertise: ['JavaScript', 'Web Development'],
          rating: 4.8,
          totalStudents: 4500
        },
        rating: 4.8,
        studentsEnrolled: 1800,
        price: 0
      },
      {
        id: 'react-fundamentals',
        title: 'React Development Fundamentals',
        description: 'Build modern web applications with React',
        level: 'Intermediate',
        duration: '3 weeks',
        instructor: {
          name: 'Emma Wilson',
          expertise: ['React', 'Frontend Architecture'],
          rating: 4.9,
          totalStudents: 3200
        },
        rating: 4.9,
        studentsEnrolled: 2200,
        price: 0
      },
      {
        id: 'nodejs-essentials',
        title: 'Node.js Backend Development',
        description: 'Build scalable server-side applications',
        level: 'Intermediate',
        duration: '3 weeks',
        instructor: {
          name: 'Sarah Johnson',
          expertise: ['Node.js', 'REST APIs'],
          rating: 4.7,
          totalStudents: 2800
        },
        rating: 4.7,
        studentsEnrolled: 1500,
        price: 0
      },
      {
        id: 'python-basics',
        title: 'Python Programming Basics',
        description: 'Master core Python programming concepts',
        level: 'Beginner',
        duration: '3 weeks',
        instructor: {
          name: 'David Chen',
          expertise: ['Python', 'Data Science'],
          rating: 4.8,
          totalStudents: 3500
        },
        rating: 4.8,
        studentsEnrolled: 2000,
        price: 0
      },
      {
        id: 'database-fundamentals',
        title: 'Database Systems Essentials',
        description: 'Master database design and management',
        level: 'Intermediate',
        duration: '2 weeks',
        instructor: {
          name: 'James Wilson',
          expertise: ['SQL', 'NoSQL'],
          rating: 4.6,
          totalStudents: 2500
        },
        rating: 4.6,
        studentsEnrolled: 1200,
        price: 0
      },
      {
        id: 'git-basics',
        title: 'Git Essentials',
        description: 'Master version control with Git and GitHub',
        level: 'Beginner',
        duration: '2 weeks',
        instructor: {
          name: 'Sarah Chen',
          expertise: ['Git', 'Version Control'],
          rating: 4.8,
          totalStudents: 5000
        },
        rating: 4.8,
        studentsEnrolled: 1800,
        price: 0
      },
      {
        id: 'python-intro',
        title: 'Python Fundamentals',
        description: 'Learn Python programming basics',
        level: 'Beginner',
        duration: '3 weeks',
        instructor: {
          name: 'Priya Patel',
          expertise: ['Python', 'Data Analysis'],
          rating: 4.9,
          totalStudents: 3200
        },
        rating: 4.9,
        studentsEnrolled: 2200,
        price: 0
      },
      {
        id: 'javascript-basics',
        title: 'JavaScript Essentials',
        description: 'Core concepts of JavaScript programming',
        level: 'Beginner',
        duration: '4 weeks',
        instructor: {
          name: 'Michael Johnson',
          expertise: ['JavaScript', 'Web Development'],
          rating: 4.8,
          totalStudents: 4500
        },
        rating: 4.8,
        studentsEnrolled: 1800,
        price: 0
      },
      {
        id: 'responsive-design',
        title: 'Responsive Web Design',
        description: 'Create websites for all devices',
        level: 'Intermediate',
        duration: '3 weeks',
        instructor: {
          name: 'Alex Rivera',
          expertise: ['CSS', 'Responsive Design'],
          rating: 4.7,
          totalStudents: 4200
        },
        rating: 4.7,
        studentsEnrolled: 1500,
        price: 0
      }
    ]
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    icon: FaTractor,
    courses: [
      {
        id: 'sustainable-farming',
        title: 'Sustainable Farming Basics',
        description: 'Learn the fundamentals of sustainable agriculture',
        level: 'Beginner',
        duration: '4 weeks',
        instructor: {
          name: 'John Smith',
          avatar: '/images/instructors/john-smith.jpg',
          bio: 'Sustainable agriculture expert with 15 years of field experience',
          expertise: ['Organic Farming', 'Crop Rotation', 'Soil Health'],
          rating: 4.7,
          totalStudents: 2200,
          totalCourses: 4
        },
        rating: 4.8,
        students: 800,
        price: 29.99
      },
      {
        id: 'organic-gardening',
        title: 'Organic Gardening Essentials',
        description: 'Master organic gardening techniques and principles',
        level: 'Beginner',
        duration: '3 weeks',
        instructor: {
          name: 'Maria Garcia',
          avatar: '/images/instructors/maria-garcia.jpg',
          bio: 'Master gardener and permaculture designer',
          expertise: ['Organic Gardening', 'Permaculture', 'Composting'],
          rating: 4.6,
          totalStudents: 1800,
          totalCourses: 3
        },
        rating: 4.6,
        students: 600,
        price: 24.99
      }
    ]
  },
  {
    id: 'mobile-repair',
    name: 'Mobile Repair',
    icon: FaMobile,
    courses: [
      {
        id: 'smartphone-basics',
        title: 'Smartphone Repair Fundamentals',
        description: 'Learn basic smartphone repair and diagnostics',
        level: 'Beginner',
        duration: '3 weeks',
        instructor: {
          name: 'David Lee',
          avatar: '/images/instructors/david-lee.jpg',
          bio: 'Certified mobile repair technician and instructor',
          expertise: ['Smartphone Repair', 'Electronics', 'Diagnostics'],
          rating: 4.7,
          totalStudents: 1500,
          totalCourses: 2
        },
        rating: 4.7,
        students: 500,
        price: 39.99
      },
      {
        id: 'iphone-repair',
        title: 'iPhone Repair Mastery',
        description: 'Specialized course for iPhone repair techniques',
        level: 'Intermediate',
        duration: '4 weeks',
        instructor: {
          name: 'Emma Wilson',
          avatar: '/images/instructors/emma-wilson.jpg',
          bio: 'Apple-certified repair specialist',
          expertise: ['iPhone Repair', 'Logic Board Repair', 'Data Recovery'],
          rating: 4.9,
          totalStudents: 2500,
          totalCourses: 5
        },
        rating: 4.9,
        students: 700,
        price: 49.99
      }
    ]
  },
  {
    id: 'business',
    name: 'Business',
    icon: FaChartLine,
    courses: [
      {
        id: 'entrepreneurship-101',
        title: 'Entrepreneurship Fundamentals',
        description: 'Start your journey as an entrepreneur',
        level: 'Beginner',
        duration: '4 weeks',
        instructor: {
          name: 'Robert Brown',
          avatar: '/images/instructors/robert-brown.jpg',
          bio: 'Serial entrepreneur and business coach',
          expertise: ['Startups', 'Business Planning', 'Funding'],
          rating: 4.8,
          totalStudents: 3500,
          totalCourses: 6
        },
        rating: 4.8,
        students: 1200,
        price: 59.99
      },
      {
        id: 'digital-marketing',
        title: 'Digital Marketing Essentials',
        description: 'Master the basics of digital marketing',
        level: 'Beginner',
        duration: '3 weeks',
        instructor: {
          name: 'Lisa Anderson',
          avatar: '/images/instructors/lisa-anderson.jpg',
          bio: 'Digital marketing strategist and consultant',
          expertise: ['SEO', 'Social Media', 'Content Marketing'],
          rating: 4.7,
          totalStudents: 2800,
          totalCourses: 4
        },
        rating: 4.7,
        students: 900,
        price: 44.99
      }
    ]
  },
  {
    id: 'digital-media',
    name: 'Digital Media',
    icon: FaVideo,
    courses: [
      {
        id: 'video-editing',
        title: 'Video Editing Fundamentals',
        description: 'Learn the basics of video editing',
        level: 'Beginner',
        duration: '3 weeks',
        instructor: {
          name: 'Chris Taylor',
          avatar: '/images/instructors/chris-taylor.jpg',
          bio: 'Professional video editor and filmmaker',
          expertise: ['Video Editing', 'Color Grading', 'Motion Graphics'],
          rating: 4.6,
          totalStudents: 1900,
          totalCourses: 3
        },
        rating: 4.6,
        students: 600,
        price: 34.99
      },
      {
        id: 'social-media-content',
        title: 'Social Media Content Creation',
        description: 'Create engaging content for social media',
        level: 'Beginner',
        duration: '2 weeks',
        instructor: {
          name: 'Sophie Martinez',
          avatar: '/images/instructors/sophie-martinez.jpg',
          bio: 'Social media manager and content creator',
          expertise: ['Content Creation', 'Platform Strategy', 'Analytics'],
          rating: 4.8,
          totalStudents: 3200,
          totalCourses: 5
        },
        rating: 4.8,
        students: 800,
        price: 29.99
      }
    ]
  },
  {
    id: 'design',
    name: 'Design',
    icon: FaPaintBrush,
    courses: [
      {
        id: 'ui-design-basics',
        title: 'UI Design Fundamentals',
        description: 'Learn the basics of user interface design',
        level: 'Beginner',
        duration: '3 weeks',
        instructor: {
          name: 'Alice Wong',
          avatar: '/images/instructors/alice-wong.jpg',
          bio: 'UI/UX designer with 8 years of agency experience',
          expertise: ['User Interface Design', 'Prototyping', 'Figma'],
          rating: 4.9,
          totalStudents: 4100,
          totalCourses: 7
        },
        rating: 4.9,
        students: 1000,
        price: 49.99
      },
      {
        id: 'graphic-design',
        title: 'Graphic Design Essentials',
        description: 'Master the fundamentals of graphic design',
        level: 'Beginner',
        duration: '4 weeks',
        instructor: {
          name: 'Tom Harris',
          avatar: '/images/instructors/tom-harris.jpg',
          bio: 'Graphic design instructor and Adobe Certified Expert',
          expertise: ['Illustrator', 'Photoshop', 'Brand Identity'],
          rating: 4.7,
          totalStudents: 2900,
          totalCourses: 4
        },
        rating: 4.7,
        students: 850,
        price: 39.99
      }
    ]
  }
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('all');

  const allCourses = categories.flatMap(category => 
    category.courses.map(course => ({
      ...course,
      category: category.name,
      categoryId: category.id
    }))
  );

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.categoryId);
    const matchesLevel = selectedLevel === 'all' || selectedLevel === course.level.toLowerCase();
    return matchesSearch && matchesCategory && matchesLevel;
  });

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
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategories(prev =>
                        prev.includes(category.id)
                          ? prev.filter(id => id !== category.id)
                          : [...prev, category.id]
                      );
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                      ${selectedCategories.includes(category.id)
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-500'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      {category.icon && <category.icon className="h-4 w-4" />}
                      {category.name}
                      <span className="text-xs text-gray-500">
                        ({category.courses.length})
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
                    onClick={() => setSelectedLevel(level)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                      ${selectedLevel === level
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

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
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
