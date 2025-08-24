'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-rose-600 dark:text-rose-400 font-serif">
                Luxe
              </span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link
                href="/"
                className="text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Collection
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className="text-gray-900 dark:text-gray-100 hover:text-rose-600 dark:hover:text-rose-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Right side - Theme toggle and auth */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Desktop auth buttons */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {status === 'loading' ? (
                <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              ) : session ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {session.user.image && (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                        sizes="32px"
                      />
                    )}
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {session.user.name || session.user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/"
                className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              
              {/* Mobile auth section */}
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                {status === 'loading' ? (
                  <div className="px-3 py-2">
                    <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : session ? (
                  <div className="space-y-2">
                    <div className="flex items-center px-3 py-2">
                      {session.user.image && (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full mr-3"
                          sizes="32px"
                        />
                      )}
                      <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {session.user.name || session.user.email}
                      </span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}