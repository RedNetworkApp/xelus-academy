'use client';

import { useState, useEffect } from 'react';
import { FaLightbulb, FaClock, FaBook, FaBrain, FaPencilAlt, FaHeadphones, FaUsers, FaCalendar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const tips = [
  {
    id: 1,
    icon: FaClock,
    tip: "Study in 25-minute focused sessions with 5-minute breaks (Pomodoro Technique)",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-500"
  },
  {
    id: 2,
    icon: FaBook,
    tip: "Review your notes within 24 hours to improve retention by up to 60%",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-500"
  },
  {
    id: 3,
    icon: FaBrain,
    tip: "Practice active recall by explaining concepts to others",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-500"
  },
  {
    id: 4,
    icon: FaPencilAlt,
    tip: "Take handwritten notes - it improves memory and understanding",
    color: "bg-yellow-50 border-yellow-200",
    iconColor: "text-yellow-600"
  },
  {
    id: 5,
    icon: FaHeadphones,
    tip: "Use background music without lyrics to maintain focus",
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-500"
  },
  {
    id: 6,
    icon: FaUsers,
    tip: "Join study groups to stay motivated and learn from peers",
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-500"
  },
  {
    id: 7,
    icon: FaCalendar,
    tip: "Create a study schedule and stick to it consistently",
    color: "bg-pink-50 border-pink-200",
    iconColor: "text-pink-500"
  },
  {
    id: 8,
    icon: FaLightbulb,
    tip: "Teach what you learn to someone else to master the content",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-500"
  }
];

export default function LearningTips() {
  const [currentTip, setCurrentTip] = useState(tips[0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show tip on mount
    setIsVisible(true);

    // Hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Rotate tips every page load
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setCurrentTip(randomTip);

    return () => clearTimeout(hideTimer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className={`flex items-start space-x-3 p-4 rounded-lg border ${currentTip.color} max-w-md shadow-lg`}>
            <div className={`${currentTip.iconColor} p-2 rounded-full bg-white`}>
              <currentTip.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Learning Tip</h3>
              <p className="text-gray-700">{currentTip.tip}</p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
