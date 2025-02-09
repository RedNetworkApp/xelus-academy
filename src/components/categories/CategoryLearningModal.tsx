'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaRocket, FaChartLine, FaClock, FaBook, FaUsers, FaTrophy, FaTools, 
         FaSeedling, FaLeaf, FaPaintBrush, FaCamera, FaCalendar, FaStar, FaGraduationCap, 
         FaChevronRight, FaPlay, FaDownload } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';

interface LearningIdea {
  icon: any;
  title: string;
  description: string;
}

interface SuccessStory {
  name: string;
  role: string;
  story: string;
  achievement: string;
}

interface Resource {
  title: string;
  type: 'video' | 'pdf' | 'article';
  link: string;
}

interface CategoryData {
  ideas: LearningIdea[];
  timeToMastery: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  successStories: SuccessStory[];
  resources: Resource[];
  careerPaths: string[];
  certifications: string[];
}

const categoryData: Record<string, CategoryData> = {
  'development': {
    ideas: [
      {
        icon: FaLightbulb,
        title: 'Build Real Projects',
        description: 'Start with small projects and gradually build more complex applications. Create a portfolio to showcase your skills.'
      },
      {
        icon: FaUsers,
        title: 'Join Coding Communities',
        description: 'Participate in GitHub, Stack Overflow, and local coding meetups to learn from others and share knowledge.'
      },
      {
        icon: FaRocket,
        title: 'Follow the Tech Stack Path',
        description: 'Master fundamentals first (HTML, CSS, JS), then move to frameworks (React, Node.js) and advanced concepts.'
      },
      {
        icon: FaTools,
        title: 'Practice Daily Coding',
        description: 'Solve coding challenges on platforms like LeetCode or HackerRank to sharpen your problem-solving skills.'
      }
    ],
    timeToMastery: '6-12 months',
    difficulty: 4,
    successStories: [
      {
        name: 'Sarah Chen',
        role: 'Full-Stack Developer',
        story: 'Started from zero coding knowledge, now working at a top tech company',
        achievement: 'Doubled salary in 8 months'
      }
    ],
    resources: [
      { title: 'Getting Started with Web Dev', type: 'video', link: '#' },
      { title: 'Programming Fundamentals Guide', type: 'pdf', link: '#' },
      { title: 'Building Your First App', type: 'article', link: '#' }
    ],
    careerPaths: ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'Mobile App Developer'],
    certifications: ['Web Development Certified', 'JavaScript Expert', 'React Professional']
  },
  'agriculture': {
    ideas: [
      {
        icon: FaSeedling,
        title: 'Start Small',
        description: 'Begin with a small garden or plot to practice techniques before scaling up to larger operations.'
      },
      {
        icon: FaLeaf,
        title: 'Seasonal Learning',
        description: 'Learn about different crops and techniques for each season. Document your growing cycles.'
      },
      {
        icon: FaChartLine,
        title: 'Track Your Progress',
        description: 'Keep detailed records of yields, weather conditions, and techniques to optimize your farming methods.'
      },
      {
        icon: FaUsers,
        title: 'Connect with Farmers',
        description: 'Join local farming communities to share experiences and learn traditional wisdom.'
      }
    ],
    timeToMastery: '12-18 months',
    difficulty: 3,
    successStories: [
      {
        name: 'John Smith',
        role: 'Organic Farmer',
        story: 'Transformed traditional farm into a profitable organic operation',
        achievement: '300% yield increase'
      }
    ],
    resources: [
      { title: 'Sustainable Farming Basics', type: 'video', link: '#' },
      { title: 'Crop Planning Guide', type: 'pdf', link: '#' },
      { title: 'Modern Farming Techniques', type: 'article', link: '#' }
    ],
    careerPaths: ['Farm Manager', 'Agricultural Consultant', 'Organic Specialist', 'Hydroponics Expert'],
    certifications: ['Organic Farming Certified', 'Agricultural Management', 'Sustainable Practices']
  },
  'mobile-repair': {
    ideas: [
      {
        icon: FaTools,
        title: 'Practice on Old Devices',
        description: 'Start by repairing old or broken phones to gain hands-on experience without risk.'
      },
      {
        icon: FaBook,
        title: 'Study Device Schematics',
        description: 'Learn to read and understand technical diagrams and circuit layouts of different phone models.'
      },
      {
        icon: FaRocket,
        title: 'Master One Brand First',
        description: 'Focus on becoming an expert in one phone brand before expanding to others.'
      },
      {
        icon: FaUsers,
        title: 'Shadow Experienced Technicians',
        description: 'Learn from professionals by observing their repair techniques and asking questions.'
      }
    ],
    timeToMastery: '3-6 months',
    difficulty: 2,
    successStories: [
      {
        name: 'Emily Lee',
        role: 'Mobile Repair Specialist',
        story: 'Started with basic repairs, now fixes complex issues with ease',
        achievement: 'Increased customer satisfaction by 25%'
      }
    ],
    resources: [
      { title: 'Mobile Repair Basics', type: 'video', link: '#' },
      { title: 'Device Repair Guide', type: 'pdf', link: '#' },
      { title: 'Advanced Repair Techniques', type: 'article', link: '#' }
    ],
    careerPaths: ['Mobile Repair Technician', 'Device Specialist', 'Technical Support', 'Quality Control'],
    certifications: ['Mobile Repair Certified', 'Device Repair Expert', 'Technical Support Specialist']
  },
  'business': {
    ideas: [
      {
        icon: FaChartLine,
        title: 'Start with Market Research',
        description: 'Research your target market, competitors, and industry trends before launching.'
      },
      {
        icon: FaRocket,
        title: 'Build an MVP',
        description: 'Create a Minimum Viable Product to test your business idea with minimal investment.'
      },
      {
        icon: FaUsers,
        title: 'Network Actively',
        description: 'Attend business events, join entrepreneur groups, and build relationships in your industry.'
      },
      {
        icon: FaTrophy,
        title: 'Set Clear Goals',
        description: 'Define short-term and long-term business objectives with measurable milestones.'
      }
    ],
    timeToMastery: '6-12 months',
    difficulty: 4,
    successStories: [
      {
        name: 'David Kim',
        role: 'Entrepreneur',
        story: 'Turned a small business idea into a successful startup',
        achievement: 'Reached $1 million in revenue within the first year'
      }
    ],
    resources: [
      { title: 'Business Fundamentals', type: 'video', link: '#' },
      { title: 'Market Research Guide', type: 'pdf', link: '#' },
      { title: 'Building a Successful Business', type: 'article', link: '#' }
    ],
    careerPaths: ['Entrepreneur', 'Business Owner', 'Manager', 'Consultant'],
    certifications: ['Business Management Certified', 'Entrepreneurship Expert', 'Marketing Specialist']
  },
  'digital-media': {
    ideas: [
      {
        icon: FaCamera,
        title: 'Daily Practice',
        description: 'Take photos or create videos every day to develop your eye for composition and timing.'
      },
      {
        icon: FaLightbulb,
        title: 'Study the Masters',
        description: 'Analyze work from successful creators in your field to understand their techniques.'
      },
      {
        icon: FaRocket,
        title: 'Build Your Portfolio',
        description: 'Create diverse content to showcase your skills and attract potential clients.'
      },
      {
        icon: FaUsers,
        title: 'Get Feedback',
        description: 'Share your work with other creators and actively seek constructive criticism.'
      }
    ],
    timeToMastery: '3-6 months',
    difficulty: 2,
    successStories: [
      {
        name: 'Olivia Brown',
        role: 'Photographer',
        story: 'Improved photography skills through consistent practice and feedback',
        achievement: 'Increased client base by 50%'
      }
    ],
    resources: [
      { title: 'Photography Basics', type: 'video', link: '#' },
      { title: 'Visual Storytelling Guide', type: 'pdf', link: '#' },
      { title: 'Advanced Photography Techniques', type: 'article', link: '#' }
    ],
    careerPaths: ['Photographer', 'Videographer', 'Graphic Designer', 'Creative Director'],
    certifications: ['Photography Certified', 'Visual Storytelling Expert', 'Graphic Design Specialist']
  },
  'design': {
    ideas: [
      {
        icon: FaPaintBrush,
        title: 'Daily Design Challenge',
        description: 'Participate in daily UI/UX challenges to improve your design skills consistently.'
      },
      {
        icon: FaLightbulb,
        title: 'Create Design Systems',
        description: 'Learn to build and maintain comprehensive design systems for consistency.'
      },
      {
        icon: FaUsers,
        title: 'Join Design Communities',
        description: 'Share your work on Dribbble or Behance and engage with other designers.'
      },
      {
        icon: FaRocket,
        title: 'Master Design Tools',
        description: 'Become proficient in industry-standard tools like Figma, Sketch, and Adobe Suite.'
      }
    ],
    timeToMastery: '6-12 months',
    difficulty: 4,
    successStories: [
      {
        name: 'Ava Lee',
        role: 'UI/UX Designer',
        story: 'Improved design skills through consistent practice and feedback',
        achievement: 'Increased client satisfaction by 25%'
      }
    ],
    resources: [
      { title: 'Design Fundamentals', type: 'video', link: '#' },
      { title: 'Design Systems Guide', type: 'pdf', link: '#' },
      { title: 'Advanced Design Techniques', type: 'article', link: '#' }
    ],
    careerPaths: ['UI/UX Designer', 'Graphic Designer', 'Visual Designer', 'Design Director'],
    certifications: ['Design Certified', 'UI/UX Expert', 'Graphic Design Specialist']
  },
  'tools-equipment': {
    ideas: [
      {
        icon: FaTools,
        title: 'Safety First',
        description: 'Master safety protocols and proper tool handling before advanced techniques.'
      },
      {
        icon: FaBook,
        title: 'Learn Maintenance',
        description: 'Understand how to maintain and care for different types of tools and equipment.'
      },
      {
        icon: FaRocket,
        title: 'Practice Projects',
        description: 'Start with simple projects to build confidence with different tools.'
      },
      {
        icon: FaUsers,
        title: 'Join Workshops',
        description: 'Participate in hands-on workshops to learn from experienced professionals.'
      }
    ],
    timeToMastery: '3-6 months',
    difficulty: 2,
    successStories: [
      {
        name: 'Ethan Hall',
        role: 'Tool Specialist',
        story: 'Improved tool handling skills through consistent practice and feedback',
        achievement: 'Increased efficiency by 30%'
      }
    ],
    resources: [
      { title: 'Tool Safety Basics', type: 'video', link: '#' },
      { title: 'Tool Maintenance Guide', type: 'pdf', link: '#' },
      { title: 'Advanced Tool Techniques', type: 'article', link: '#' }
    ],
    careerPaths: ['Tool Specialist', 'Equipment Operator', 'Maintenance Technician', 'Quality Control'],
    certifications: ['Tool Safety Certified', 'Tool Maintenance Expert', 'Equipment Operation Specialist']
  },
  'languages': {
    ideas: [
      {
        icon: FaBook,
        title: 'Daily Practice',
        description: 'Spend at least 30 minutes every day practicing your target language.'
      },
      {
        icon: FaUsers,
        title: 'Find Language Partners',
        description: 'Practice speaking with native speakers through language exchange apps.'
      },
      {
        icon: FaRocket,
        title: 'Immerse Yourself',
        description: 'Watch movies, listen to music, and read books in your target language.'
      },
      {
        icon: FaTrophy,
        title: 'Set Milestones',
        description: 'Work towards language proficiency certifications to track your progress.'
      }
    ],
    timeToMastery: '6-12 months',
    difficulty: 4,
    successStories: [
      {
        name: 'Liam Kim',
        role: 'Language Learner',
        story: 'Improved language skills through consistent practice and immersion',
        achievement: 'Passed language proficiency test with high scores'
      }
    ],
    resources: [
      { title: 'Language Learning Basics', type: 'video', link: '#' },
      { title: 'Language Immersion Guide', type: 'pdf', link: '#' },
      { title: 'Advanced Language Techniques', type: 'article', link: '#' }
    ],
    careerPaths: ['Translator', 'Interpreter', 'Language Teacher', 'Diplomat'],
    certifications: ['Language Proficiency Certified', 'Translation Expert', 'Interpretation Specialist']
  }
};

interface Props {
  category: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryLearningModal({ category, isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'path' | 'resources' | 'stories'>('path');
  const data = categoryData[category];
  
  if (!data) return null;

  const renderDifficulty = (level: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar key={star} className={`w-4 h-4 ${star <= level ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
      </div>
    );
  };

  const renderResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <FaPlay className="w-4 h-4" />;
      case 'pdf':
        return <FaDownload className="w-4 h-4" />;
      default:
        return <FaChevronRight className="w-4 h-4" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Learning Path: {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-600 mb-2">
                    <FaClock className="w-5 h-5" />
                    <span className="font-semibold">Time to Master</span>
                  </div>
                  <p className="text-gray-700">{data.timeToMastery}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-yellow-600 mb-2">
                    <FaStar className="w-5 h-5" />
                    <span className="font-semibold">Difficulty Level</span>
                  </div>
                  {renderDifficulty(data.difficulty)}
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-600 mb-2">
                    <FaGraduationCap className="w-5 h-5" />
                    <span className="font-semibold">Certifications</span>
                  </div>
                  <p className="text-gray-700">{data.certifications.length} Available</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex space-x-4 mb-6 border-b">
                {['path', 'resources', 'stories'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-2 px-4 ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'path' && (
                  <>
                    {/* Learning Ideas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.ideas.map((idea, index) => (
                        <motion.div
                          key={idea.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <idea.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{idea.title}</h3>
                            <p className="text-gray-600">{idea.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Career Paths */}
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Career Paths</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.careerPaths.map((path, index) => (
                          <motion.div
                            key={path}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:border-blue-500 transition-colors"
                          >
                            {path}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'resources' && (
                  <div className="space-y-4">
                    {data.resources.map((resource, index) => (
                      <motion.div
                        key={resource.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link href={resource.link}
                              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-full ${
                              resource.type === 'video' ? 'bg-red-100 text-red-600' :
                              resource.type === 'pdf' ? 'bg-blue-100 text-blue-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              {renderResourceIcon(resource.type)}
                            </div>
                            <div>
                              <h4 className="font-medium">{resource.title}</h4>
                              <p className="text-sm text-gray-500 capitalize">{resource.type}</p>
                            </div>
                          </div>
                          <FaChevronRight className="w-4 h-4 text-gray-400" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'stories' && (
                  <div className="space-y-6">
                    {data.successStories.map((story, index) => (
                      <motion.div
                        key={story.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            {story.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{story.name}</h4>
                            <p className="text-gray-600">{story.role}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{story.story}</p>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2 text-green-600">
                            <FaTrophy className="w-5 h-5" />
                            <span className="font-medium">{story.achievement}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-8 text-center">
                <Link
                  href={`/courses/${category}`}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>Start Learning Now</span>
                  <FaChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
