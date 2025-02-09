'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  FaCode, 
  FaLeaf, 
  FaTools, 
  FaMobileAlt, 
  FaChartLine, 
  FaCamera, 
  FaPaintBrush, 
  FaLanguage, 
  FaGraduationCap, 
  FaUsers, 
  FaStar, 
  FaLaptop, 
  FaSeedling, 
  FaMobile, 
  FaChalkboardTeacher,
  FaRocket,
  FaBook,
  FaTrophy,
  FaChartLine as FaChartLineIcon,
  FaClock,
  FaCertificate,
  FaTerminal,
  FaArrowCircleRight,
  FaBookReader,
  FaGlobe as FaGlobeIcon
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import TerminalLine from '@/components/terminal/TerminalEffect';
import CategoryLearningModal from '@/components/categories/CategoryLearningModal';
import { TypeWriterGroup } from '@/components/animations/TypeWriter';

// Mock data
const stats = [
  { label: 'Active Students', value: '10,000+', icon: FaUsers },
  { label: 'Expert Instructors', value: '100+', icon: FaChalkboardTeacher },
  { label: 'Course Success Rate', value: '95%', icon: FaStar },
  { label: 'Total Courses', value: '500+', icon: FaGraduationCap },
];

const featuredCourses = [
  {
    id: 1,
    title: 'Full Stack Development',
    category: 'Development',
    instructor: 'Sarah Johnson',
    rating: 4.9,
    students: 1200,
    image: '/images/courses/web-dev.jpg',
    icon: FaLaptop,
  },
  {
    id: 2,
    title: 'Modern Agriculture Techniques',
    category: 'Farming',
    instructor: 'Michael Chen',
    rating: 4.8,
    students: 800,
    image: '/images/courses/farming.jpg',
    icon: FaSeedling,
  },
  {
    id: 3,
    title: 'Mobile Phone Repair Mastery',
    category: 'Mobile Repair',
    instructor: 'David Smith',
    rating: 4.7,
    students: 950,
    image: '/images/courses/mobile-repair.jpg',
    icon: FaMobile,
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Emily Rodriguez',
    role: 'Web Developer',
    image: '/images/testimonials/emily.jpg',
    content: 'Thanks to Xelus Academy, I transitioned from a beginner to a professional web developer in just 6 months. The practical approach and support from instructors made all the difference.',
  },
  {
    id: 2,
    name: 'James Wilson',
    role: 'Farm Owner',
    image: '/images/testimonials/james.jpg',
    content: 'The agriculture courses helped me modernize my farming techniques. My crop yield has increased by 40% since implementing what I learned here.',
  },
  {
    id: 3,
    name: 'Lisa Chen',
    role: 'Mobile Repair Shop Owner',
    image: '/images/testimonials/lisa.jpg',
    content: 'Starting my own mobile repair business seemed impossible until I found Xelus Academy. The hands-on training gave me the confidence to open my shop.',
  },
];

const categories = [
  {
    id: 1,
    name: 'Development',
    slug: 'development',
    description: 'Learn coding, web development, and software engineering',
    icon: FaCode,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    name: 'Agriculture',
    slug: 'agriculture',
    description: 'Master modern farming techniques and sustainable practices',
    icon: FaLeaf,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 3,
    name: 'Mobile Repair',
    slug: 'mobile-repair',
    description: 'Expert training in smartphone and tablet repair',
    icon: FaMobileAlt,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 4,
    name: 'Business',
    slug: 'business',
    description: 'Start and grow your business with proven strategies',
    icon: FaChartLine,
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 5,
    name: 'Digital Media',
    slug: 'digital-media',
    description: 'Create stunning photos, videos, and digital content',
    icon: FaCamera,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 6,
    name: 'Design',
    slug: 'design',
    description: 'Master graphic design, UI/UX, and visual arts',
    icon: FaPaintBrush,
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 7,
    name: 'Tools & Equipment',
    slug: 'tools-equipment',
    description: 'Learn to use and maintain professional tools',
    icon: FaTools,
    color: 'from-gray-600 to-gray-700'
  },
  {
    id: 8,
    name: 'Languages',
    slug: 'languages',
    description: 'Learn new languages and communication skills',
    icon: FaLanguage,
    color: 'from-indigo-500 to-indigo-600'
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const terminalSteps = [
    {
      command: 'whoami',
      output: 'student@xelus-academy - Ready to learn and grow'
    },
    {
      command: 'ls courses/',
      output: '📚 Available Learning Paths:\n> web-development/\n> mobile-apps/\n> smart-farming/\n> device-repair/\n> business/'
    },
    {
      command: 'cat courses/web-development/intro.txt',
      output: 'Master modern web development from HTML to React. Build real-world projects and learn industry best practices.'
    },
    {
      command: 'cat courses/smart-farming/about.md',
      output: 'Learn innovative farming techniques using IoT and data analytics. Transform traditional farming into smart agriculture.'
    },
    {
      command: 'git status',
      output: 'Your Learning Progress:\n✓ HTML Basics completed\n✓ CSS Fundamentals mastered\n➤ Currently learning: JavaScript\n⚪ Next up: React Framework'
    },
    {
      command: './check-skills.sh',
      output: 'Analyzing your potential...\nSkill tree unlocked!\nMultiple learning paths available\nReady to begin your journey!'
    },
    {
      command: 'cat why-xelus.txt',
      output: 'Learn Anything, Master Everything - From coding to farming, mobile repair to business - unlock your potential with expert-led courses designed for real-world success.'
    },
    {
      command: './start-learning.sh --interactive',
      output: 'Initializing your personalized learning environment...\nConnecting to knowledge base...\nReady to explore courses!'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(129,140,248,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="mb-8 inline-block">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center transform -rotate-12">
                  <FaGraduationCap className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Learn Anything,<br />Master Everything
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                From coding to farming, mobile repair to web development.<br />
                Your journey to success starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/courses" 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Learning
                </Link>
                <Link 
                  href="/learning-path" 
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Explore Courses
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800/50">
                <div className="font-mono text-sm text-gray-300">
                  <div className="flex items-center gap-2 text-blue-400 mb-4">
                    <FaTerminal className="w-4 h-4" />
                    <span>xelus-academy ~ discover your path</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <TypeWriterGroup
                        items={[
                          { text: "$", className: "text-green-400" },
                          { text: " start-journey", className: "text-blue-400" },
                          { text: " --path", className: "text-yellow-400" },
                          { text: " education", className: "text-purple-400" }
                        ]}
                        delay={50}
                        onComplete={() => {
                          setTimeout(() => {
                            document.getElementById('response1')?.classList.remove('hidden');
                          }, 500);
                        }}
                      />
                      <div id="response1" className="text-gray-400 ml-4 mt-2 hidden">
                        <TypeWriterGroup
                          items={[
                            { text: "→ Initializing learning platform...\n", className: "text-gray-400" },
                            { text: "→ Preparing course materials...\n", className: "text-gray-400" },
                            { text: "✓ Welcome to Xelus Academy!", className: "text-green-400" }
                          ]}
                          delay={30}
                        />
                      </div>
                    </div>
                    <div>
                      <TypeWriterGroup
                        items={[
                          { text: "$", className: "text-green-400" },
                          { text: " explore", className: "text-blue-400" },
                          { text: " --category", className: "text-yellow-400" },
                          { text: " farming", className: "text-purple-400" }
                        ]}
                        delay={50}
                        onComplete={() => {
                          setTimeout(() => {
                            document.getElementById('response2')?.classList.remove('hidden');
                          }, 500);
                        }}
                      />
                      <div id="response2" className="text-gray-400 ml-4 mt-2 hidden">
                        <TypeWriterGroup
                          items={[
                            { text: "→ Loading sustainable farming practices...\n", className: "text-gray-400" },
                            { text: "→ Preparing soil analysis tools...\n", className: "text-gray-400" },
                            { text: "✓ Farm knowledge activated!", className: "text-green-400" }
                          ]}
                          delay={30}
                        />
                      </div>
                    </div>
                    <div>
                      <TypeWriterGroup
                        items={[
                          { text: "$", className: "text-green-400" },
                          { text: " learn", className: "text-blue-400" },
                          { text: " mobile-repair", className: "text-purple-400" }
                        ]}
                        delay={50}
                        onComplete={() => {
                          setTimeout(() => {
                            document.getElementById('response3')?.classList.remove('hidden');
                          }, 500);
                        }}
                      />
                      <div id="response3" className="text-gray-400 ml-4 mt-2 hidden">
                        <TypeWriterGroup
                          items={[
                            { text: "→ Initializing repair toolkit...\n", className: "text-gray-400" },
                            { text: "✓ Ready to fix devices!", className: "text-green-400" }
                          ]}
                          delay={30}
                        />
                      </div>
                    </div>
                    <div className="animate-pulse">
                      <span className="text-green-400">$</span>
                      <span className="ml-2 w-4 h-5 bg-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900/10 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(129,140,248,0.1)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: "10,000+",
                label: "Active Students",
                icon: <FaUsers />,
                gradient: "from-blue-500 to-cyan-600"
              },
              {
                number: "100+",
                label: "Expert Instructors",
                icon: <FaChalkboardTeacher />,
                gradient: "from-purple-500 to-pink-600"
              },
              {
                number: "95%",
                label: "Course Success Rate",
                icon: <FaChartLineIcon />,
                gradient: "from-green-500 to-emerald-600"
              },
              {
                number: "500+",
                label: "Total Courses",
                icon: <FaBookReader />,
                gradient: "from-orange-500 to-red-600"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full p-8 rounded-xl bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-lg border border-gray-800/50 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                      <div className="w-8 h-8 text-white">
                        {stat.icon}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {stat.number}
                    </h3>
                    <p className="text-gray-400 text-lg font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900/10 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(129,140,248,0.1)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Choose Xelus Academy?
            </h2>
            <p className="text-xl text-gray-300">
              Discover a new way of learning that's accessible, practical, and community-driven
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaChalkboardTeacher />,
                title: "Expert-Led Courses",
                description: "Learn from industry professionals who bring real-world experience to every lesson.",
                gradient: "from-indigo-500 to-blue-600"
              },
              {
                icon: <FaGlobeIcon />,
                title: "Learn Anywhere",
                description: "Access courses anytime, anywhere. Learn at your own pace and on your schedule.",
                gradient: "from-fuchsia-500 to-purple-600"
              },
              {
                icon: <FaUsers />,
                title: "Community Support",
                description: "Join a vibrant community of learners and get help when you need it.",
                gradient: "from-emerald-500 to-teal-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full p-8 rounded-xl bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-lg border border-gray-800/50 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                      <div className="w-8 h-8 text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:via-gray-200 group-hover:to-gray-400 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900/10 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(129,140,248,0.1)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Explore Our Categories
            </h2>
            <p className="text-xl text-gray-300">
              Discover a wide range of courses across different fields and start your learning journey today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaLaptop />,
                title: "Development",
                description: "Learn coding, web development, and software engineering",
                gradient: "from-indigo-500 to-blue-600",
                courses: 42,
                students: "2.5K+"
              },
              {
                icon: <FaSeedling />,
                title: "Agriculture",
                description: "Master modern farming techniques and sustainable practices",
                gradient: "from-emerald-500 to-teal-600",
                courses: 38,
                students: "1.8K+"
              },
              {
                icon: <FaTools />,
                title: "Mobile Repair",
                description: "Professional mobile device repair and maintenance skills",
                gradient: "from-fuchsia-500 to-purple-600",
                courses: 35,
                students: "1.2K+"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/courses/${category.title.toLowerCase()}`}>
                  <div className="relative h-full p-8 rounded-xl bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-lg border border-gray-800/50 overflow-hidden">
                    {/* Animated gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
                    
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                        <div className="w-8 h-8 text-white">
                          {category.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:via-gray-200 group-hover:to-gray-400 transition-all duration-300">
                        {category.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-6 line-clamp-2">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{category.courses} Courses</span>
                        <span>{category.students} Students</span>
                      </div>
                      
                      <div className="mt-6 flex items-center text-sm font-semibold">
                        <span className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent group-hover:mr-2 transition-all duration-300`}>
                          Explore Courses
                        </span>
                        <FaArrowCircleRight className={`w-4 h-4 transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-300 ${category.gradient === 'from-indigo-500 to-blue-600' ? 'text-indigo-500' : category.gradient === 'from-emerald-500 to-teal-600' ? 'text-emerald-500' : 'text-fuchsia-500'}`} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900/10 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(129,140,248,0.1)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-300">
              Start your learning journey with our most popular courses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaLaptop />,
                title: "React & Next.js Mastery",
                description: "Build modern web applications with React 18 and Next.js 13",
                gradient: "from-blue-500 to-cyan-600",
                duration: "10 weeks",
                rating: 4.9,
                students: "5.2K+",
                price: "$99",
                instructor: "Sarah Chen"
              },
              {
                icon: <FaSeedling />,
                title: "Sustainable Agriculture",
                description: "Learn organic farming techniques and sustainable practices",
                gradient: "from-green-500 to-emerald-600",
                duration: "8 weeks",
                rating: 4.8,
                students: "3.1K+",
                price: "$79",
                instructor: "John Miller"
              },
              {
                icon: <FaTools />,
                title: "iPhone Repair Expert",
                description: "Master iPhone repair from basic to advanced techniques",
                gradient: "from-purple-500 to-pink-600",
                duration: "6 weeks",
                rating: 4.7,
                students: "2.8K+",
                price: "$89",
                instructor: "Mike Zhang"
              }
            ].map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="relative h-full p-8 rounded-xl bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-lg border border-gray-800/50 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${course.gradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                        <div className="w-8 h-8 text-white">
                          {course.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:via-gray-200 group-hover:to-gray-400 transition-all duration-300">
                        {course.title}
                      </h3>
                      <p className="text-gray-400 mb-6">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <FaClock className="w-4 h-4 mr-2" />
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <FaStar className="w-4 h-4 mr-2 text-yellow-500" />
                          {course.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <span className="text-gray-500">{course.students} Students</span>
                        <span className="text-white bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-1 rounded-full">
                          {course.price}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">By {course.instructor}</span>
                        <span className={`bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent group-hover:mr-2 transition-all duration-300 flex items-center`}>
                          Enroll Now
                          <FaArrowCircleRight className="w-4 h-4 ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900/10 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(129,140,248,0.1)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-800/50 overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-gray-400 text-sm font-medium">xelus-academy ~ discover your path</span>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <TypeWriterGroup
                    items={[
                      { text: "$", className: "text-green-400" },
                      { text: " start-learning", className: "text-blue-400" },
                      { text: " --course", className: "text-yellow-400" },
                      { text: " web-development", className: "text-purple-400" }
                    ]}
                    delay={50}
                    onComplete={() => {
                      setTimeout(() => {
                        document.getElementById('response2')?.classList.remove('hidden');
                      }, 500);
                    }}
                  />
                  <div id="response2" className="text-gray-400 ml-4 mt-2 hidden">
                    <TypeWriterGroup
                      items={[
                        { text: "→ Installing development environment...\n", className: "text-gray-400" },
                        { text: "→ Setting up React and Next.js...\n", className: "text-gray-400" },
                        { text: "✓ Ready to code!", className: "text-green-400" }
                      ]}
                      delay={30}
                      onComplete={() => {
                        setTimeout(() => {
                          document.getElementById('command2')?.classList.remove('hidden');
                        }, 500);
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  id="command2"
                  className="mb-4 hidden"
                >
                  <TypeWriterGroup
                    items={[
                      { text: "$", className: "text-green-400" },
                      { text: " explore", className: "text-blue-400" },
                      { text: " --category", className: "text-yellow-400" },
                      { text: " farming", className: "text-purple-400" }
                    ]}
                    delay={50}
                    onComplete={() => {
                      setTimeout(() => {
                        document.getElementById('response3')?.classList.remove('hidden');
                      }, 500);
                    }}
                  />
                  <div id="response3" className="text-gray-400 ml-4 mt-2 hidden">
                    <TypeWriterGroup
                      items={[
                        { text: "→ Loading sustainable farming practices...\n", className: "text-gray-400" },
                        { text: "→ Preparing soil analysis tools...\n", className: "text-gray-400" },
                        { text: "✓ Farm knowledge activated!", className: "text-green-400" }
                      ]}
                      delay={30}
                      onComplete={() => {
                        setTimeout(() => {
                          document.getElementById('command3')?.classList.remove('hidden');
                        }, 500);
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  id="command3"
                  className="mb-4 hidden"
                >
                  <TypeWriterGroup
                    items={[
                      { text: "$", className: "text-green-400" },
                      { text: " learn", className: "text-blue-400" },
                      { text: " mobile-repair", className: "text-purple-400" }
                    ]}
                    delay={50}
                    onComplete={() => {
                      setTimeout(() => {
                        document.getElementById('response4')?.classList.remove('hidden');
                      }, 500);
                    }}
                  />
                  <div id="response4" className="text-gray-400 ml-4 mt-2 hidden">
                    <TypeWriterGroup
                      items={[
                        { text: "→ Initializing repair toolkit...\n", className: "text-gray-400" },
                        { text: "✓ Ready to fix devices!", className: "text-green-400" }
                      ]}
                      delay={30}
                      onComplete={() => {
                        setTimeout(() => {
                          document.getElementById('cursor2')?.classList.remove('hidden');
                        }, 500);
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  id="cursor2"
                  className="flex items-center hidden"
                >
                  <span className="text-green-400">$</span>
                  <span className="ml-2 w-4 h-5 bg-gray-400 animate-pulse" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-blue-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(129,140,248,0.2)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="mb-8 inline-block">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center transform -rotate-6">
                <FaGraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of successful students who have transformed their careers through our courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/courses"
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Courses
              </Link>
              <Link 
                href="/signup"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
