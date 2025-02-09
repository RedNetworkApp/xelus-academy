import React from 'react';
import Link from 'next/link';
import { MotionDiv } from '@/components/animations/MotionDiv';
import { FaCalendar, FaClock, FaTwitter, FaLinkedin, FaFacebook, FaLink, FaQuoteRight } from 'react-icons/fa';

// This would normally come from your CMS or API
const blogPost = {
  id: 1,
  title: "The Future of Education: Breaking Down Financial Barriers",
  excerpt: "Discover how Xelus Academy is revolutionizing education by making it accessible to everyone, everywhere.",
  content: `
    <h2>Revolutionizing Education Access</h2>
    <p>In today's rapidly evolving world, access to quality education shouldn't be a privilege reserved for the few. At Xelus Academy, we believe that knowledge should be freely available to anyone with the desire to learn. This belief drives our mission to break down the financial barriers that often stand between eager learners and quality education.</p>

    <h2>The Global Education Challenge</h2>
    <p>Traditional education systems often come with hefty price tags, making quality learning inaccessible to many. According to recent studies, over 260 million children worldwide lack access to education, largely due to financial constraints. This gap in educational access not only affects individuals but has far-reaching implications for global development and innovation.</p>

    <h2>Our Innovative Approach</h2>
    <p>At Xelus Academy, we're tackling this challenge head-on through several innovative approaches:</p>
    <ul>
      <li><strong>Free Access to Quality Content:</strong> All our courses are available free of charge, ensuring that financial constraints never hinder learning.</li>
      <li><strong>Diverse Course Offerings:</strong> From coding to farming, we cover a wide range of practical skills that can lead to real-world opportunities.</li>
      <li><strong>Community-Driven Learning:</strong> Our platform encourages knowledge sharing and peer-to-peer support, creating a collaborative learning environment.</li>
      <li><strong>Mobile-First Approach:</strong> Our content is optimized for mobile devices, making education accessible even in areas with limited computer access.</li>
    </ul>

    <h2>Impact and Success Stories</h2>
    <p>The impact of our approach is already visible in the success stories of our students. From rural farmers implementing modern agricultural techniques to aspiring developers landing their first tech jobs, our platform is helping transform lives through education.</p>

    <blockquote>Education is not just about learning; it's about creating opportunities for a better future. When we remove financial barriers, we unlock human potential on a global scale.</blockquote>

    <h2>Looking Ahead</h2>
    <p>Our vision extends beyond just providing free courses. We're building a global ecosystem of learners and educators who believe in the power of accessible education. Through continuous innovation and community engagement, we're working to create a future where quality education is truly available to everyone.</p>

    <h2>Join the Movement</h2>
    <p>The future of education is not just about technology or content; it's about accessibility and inclusion. By making education free and accessible, we're not just teaching skills – we're empowering dreams, fostering innovation, and building a more equitable world.</p>
  `,
  category: "Education",
  author: "Shahbaz Baloch",
  authorRole: "Founder, Xelus Academy",
  date: "Jan 13, 2025",
  readTime: "5 min read",
  tags: ["Education", "Innovation", "Accessibility", "Technology", "Future"]
};

export default function BlogPost() {
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
            className="max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <FaCalendar className="w-4 h-4" /> {blogPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock className="w-4 h-4" /> {blogPost.readTime}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                {blogPost.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {blogPost.excerpt}
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="relative h-40 mt-16">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent rounded-3xl backdrop-blur-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <FaQuoteRight className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Author Info */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl backdrop-blur-lg border border-blue-500/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold">
                  {blogPost.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{blogPost.author}</h3>
                  <p className="text-gray-400">{blogPost.authorRole}</p>
                </div>
              </div>
            </MotionDiv>

            {/* Content */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase()}`}
                    className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 px-4 py-2 rounded-full text-sm hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <h3 className="text-xl font-semibold mb-4">Share this article</h3>
              <div className="flex gap-4">
                {[
                  { icon: <FaTwitter />, color: 'from-blue-400 to-blue-600' },
                  { icon: <FaLinkedin />, color: 'from-blue-500 to-blue-700' },
                  { icon: <FaFacebook />, color: 'from-blue-600 to-blue-800' },
                  { icon: <FaLink />, color: 'from-purple-400 to-purple-600' }
                ].map((item, index) => (
                  <button
                    key={index}
                    className={`p-3 bg-gradient-to-br ${item.color} rounded-full hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <div className="w-5 h-5 text-white">
                      {item.icon}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16 p-8 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl backdrop-blur-lg border border-blue-500/20"
            >
              <h3 className="text-2xl font-bold mb-4">Ready to Start Learning?</h3>
              <p className="text-gray-300 mb-6">Join our community of learners and start your journey towards knowledge and success.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                  Explore Courses
                </button>
                <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                  Join Community
                </button>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>
    </main>
  );
}
