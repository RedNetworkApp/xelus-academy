import React from 'react';
import Link from 'next/link';
import { MotionDiv } from '@/components/animations/MotionDiv';
import { FaCalendar, FaTag, FaUser, FaClock, FaArrowRight, FaBookOpen, FaGraduationCap, FaSeedling } from 'react-icons/fa';

// Mock data - replace with actual data from your CMS or API
const featuredPosts = [
  {
    id: 1,
    title: "The Future of Education: Breaking Down Financial Barriers",
    excerpt: "Discover how Xelus Academy is revolutionizing education by making it accessible to everyone, everywhere.",
    category: "Education",
    icon: <FaGraduationCap className="w-8 h-8" />,
    gradient: "from-blue-500 to-purple-500",
    author: "Shahbaz Baloch",
    date: "Jan 13, 2025",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 2,
    title: "From Farm to Tech: A New Era of Learning",
    excerpt: "How our diverse course offerings are helping students master both traditional and modern skills.",
    category: "Innovation",
    icon: <FaSeedling className="w-8 h-8" />,
    gradient: "from-green-500 to-blue-500",
    author: "Sarah Johnson",
    date: "Jan 12, 2025",
    readTime: "4 min read",
    featured: true
  }
];

const recentPosts = [
  {
    id: 3,
    title: "10 Essential Skills for Modern Farmers",
    excerpt: "Learn how technology is transforming agriculture and what skills you need to stay ahead.",
    category: "Farming",
    icon: <FaSeedling className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-500",
    author: "John Smith",
    date: "Jan 11, 2025",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Mastering Mobile Repair: A Complete Guide",
    excerpt: "Everything you need to know about starting your journey in mobile device repair.",
    category: "Technology",
    icon: <FaBookOpen className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500",
    author: "Mike Chen",
    date: "Jan 10, 2025",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Web Development Trends in 2025",
    excerpt: "Stay up-to-date with the latest web development technologies and practices.",
    category: "Coding",
    icon: <FaGraduationCap className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-500",
    author: "Emma Davis",
    date: "Jan 9, 2025",
    readTime: "5 min read"
  }
];

const categories = [
  { name: "Education", count: 15, gradient: "from-blue-500 to-purple-500" },
  { name: "Technology", count: 23, gradient: "from-purple-500 to-pink-500" },
  { name: "Farming", count: 18, gradient: "from-green-500 to-emerald-500" },
  { name: "Innovation", count: 12, gradient: "from-blue-500 to-indigo-500" },
  { name: "Coding", count: 20, gradient: "from-indigo-500 to-purple-500" }
];

export default function BlogPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Xelus Academy Blog
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Insights, tutorials, and stories about education, technology, farming, and more.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <MotionDiv
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="relative h-64 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-8">
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                    <div className="absolute top-4 left-4">
                      <span className={`bg-gradient-to-r ${post.gradient} text-white px-3 py-1 rounded-full text-sm`}>
                        Featured
                      </span>
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${post.gradient} flex items-center justify-center text-white`}>
                        {post.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <FaCalendar className="w-4 h-4" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaClock className="w-4 h-4" /> {post.readTime}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400">{post.excerpt}</p>
                </Link>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Posts */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
              <div className="space-y-12">
                {recentPosts.map((post, index) => (
                  <MotionDiv
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link href={`/blog/${post.id}`} className="grid md:grid-cols-5 gap-6">
                      <div className="md:col-span-2">
                        <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-6">
                          <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                          <div className="relative z-10 h-full flex items-center justify-center">
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${post.gradient} flex items-center justify-center text-white`}>
                              {post.icon}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-3 space-y-3">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className={`px-2 py-1 rounded-full text-sm bg-gradient-to-r ${post.gradient} text-white`}>
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaClock className="w-4 h-4" /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400">{post.excerpt}</p>
                        <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300">
                          Read More <FaArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </MotionDiv>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="sticky top-8"
              >
                {/* Categories */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-xl p-6 mb-8 border border-gray-800">
                  <h3 className="text-xl font-bold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <Link
                        key={category.name}
                        href={`/blog/category/${category.name.toLowerCase()}`}
                        className={`flex items-center justify-between py-2 px-4 rounded-lg bg-gradient-to-r ${category.gradient} bg-opacity-10 hover:bg-opacity-20 transition-colors`}
                      >
                        <span>{category.name}</span>
                        <span className={`bg-gradient-to-r ${category.gradient} text-white px-2 py-1 rounded-full text-sm`}>
                          {category.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/20">
                  <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                  <p className="text-gray-300 mb-4">
                    Get the latest articles and updates delivered to your inbox.
                  </p>
                  <form className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 bg-black/30 rounded-lg border border-gray-700 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
