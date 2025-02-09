import React from 'react';
import { MotionDiv } from '@/components/animations/MotionDiv';
import { FaGraduationCap, FaHeart, FaGlobe, FaUsers, FaChalkboardTeacher, FaLightbulb, FaSeedling, FaLaptopCode, FaTools, FaArrowRight } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.2)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <FaGraduationCap className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Empowering Dreams Through Education
            </h1>
            <p className="text-xl text-gray-300">
              At Xelus Academy, we believe in making quality education accessible to everyone, everywhere.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaGraduationCap />,
                title: "Free Education for All",
                description: "Breaking down financial barriers to make quality education accessible to everyone.",
                gradient: "from-blue-500 to-purple-500"
              },
              {
                icon: <FaHeart />,
                title: "Passion for Teaching",
                description: "Our instructors are driven by the passion to share knowledge and empower others.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <FaGlobe />,
                title: "Global Impact",
                description: "Reaching learners across the world with diverse, practical education.",
                gradient: "from-green-500 to-blue-500"
              },
              {
                icon: <FaUsers />,
                title: "Community Support",
                description: "Building a supportive community of learners and educators.",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-800/50 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-8 h-8 text-white">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className="text-xl text-gray-300">
                From a simple idea to a global education platform
              </p>
            </MotionDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaChalkboardTeacher />,
                  title: "Expert Instructors",
                  description: "Learn from industry professionals and experienced educators.",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: <FaLightbulb />,
                  title: "Practical Learning",
                  description: "Focus on real-world skills and hands-on experience.",
                  gradient: "from-yellow-500 to-orange-500"
                },
                {
                  icon: <FaSeedling />,
                  title: "Continuous Growth",
                  description: "Regular updates and new courses to keep you growing.",
                  gradient: "from-green-500 to-emerald-500"
                }
              ].map((item, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative p-6 rounded-xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-lg border border-gray-800/30">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className="relative z-10">
                      <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center mb-4`}>
                        <div className="w-6 h-6 text-white">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              What We Teach
            </h2>
            <p className="text-xl text-gray-300">
              Diverse courses designed to meet your learning goals
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaLaptopCode />,
                title: "Programming",
                description: "Web development, mobile apps, and software engineering",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                icon: <FaSeedling />,
                title: "Agriculture",
                description: "Modern farming techniques and sustainable practices",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: <FaTools />,
                title: "Technical Skills",
                description: "Mobile repair, electronics, and practical trades",
                gradient: "from-purple-500 to-pink-500"
              }
            ].map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative p-8 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-800/50 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-6`}>
                      <div className="w-8 h-8 text-white">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-400 mb-6">{item.description}</p>
                    <div className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent group-hover:gap-2 transition-all duration-300`}>
                      Learn More <FaArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 relative">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be part of our journey to make quality education accessible to everyone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Learning
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Become an Instructor
              </button>
            </div>
          </MotionDiv>
        </div>
      </section>
    </main>
  );
}
