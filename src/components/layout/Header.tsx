'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaUser, FaCog, FaBook, FaSignOutAlt, FaBell } from 'react-icons/fa';
import Image from 'next/image';

// Mock user data (replace with real auth)
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/images/avatars/default.jpg',
};

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Xelus Academy
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/courses" className="hover:text-blue-600">Courses</Link>
            <Link href="/about" className="hover:text-blue-600">About Us</Link>
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100">
                  <FaBell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={mockUser.avatar}
                        alt={mockUser.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-semibold">{mockUser.name}</p>
                        <p className="text-xs text-gray-500">{mockUser.email}</p>
                      </div>
                      
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaBook className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      
                      <Link
                        href="/profile/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaCog className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <FaSignOutAlt className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="px-4 py-2 rounded hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
