import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaStar, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

interface CourseCompletionProps {
  courseName: string;
  totalPoints: number;
  achievements: string[];
  nextCourseSlug?: string;
  nextCourseName?: string;
}

export default function CourseCompletion({
  courseName,
  totalPoints,
  achievements,
  nextCourseSlug,
  nextCourseName
}: CourseCompletionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-16"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Trophy Animation */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
            className="mb-8"
          >
            <FaTrophy className="text-8xl text-yellow-400 mx-auto" />
          </motion.div>

          {/* Congratulations Text */}
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            🎉 Congratulations! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            You've completed the {courseName} course!
          </p>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <FaStar className="text-yellow-400 text-3xl mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{totalPoints}</div>
                <div className="text-gray-600">Total Points</div>
              </div>
              <div className="text-center">
                <FaMedal className="text-blue-500 text-3xl mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{achievements.length}</div>
                <div className="text-gray-600">Achievements</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Your Achievements
            </h2>
            <div className="grid gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg"
                >
                  <FaMedal className="text-blue-500 text-xl" />
                  <span className="text-gray-800">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <Link 
              href="/courses" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Courses
            </Link>
            
            {nextCourseSlug && nextCourseName && (
              <Link
                href={`/courses/${nextCourseSlug}`}
                className="inline-block ml-4 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <span className="flex items-center gap-2">
                  Next Course: {nextCourseName}
                  <FaArrowRight />
                </span>
              </Link>
            )}
          </div>

          {/* Certificate */}
          <div className="mt-12 text-center">
            <FaGraduationCap className="text-4xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Your certificate of completion is available in your profile
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
