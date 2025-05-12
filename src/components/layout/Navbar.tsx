import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthModal from '../ui/AuthModal';
import { useTheme } from '../../utils/ThemeContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const { darkMode } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const openLoginModal = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthModalTab('signup');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const isLoggedIn = !!username;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className={`${
            darkMode 
              ? 'bg-dark-100 text-dark-text border-b border-dark-50' 
              : 'bg-white text-gray-900'
          } shadow-lg transition-all duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className={`text-xl font-bold transition-all duration-300 hover:scale-105 ${
                    darkMode 
                      ? 'text-dark-accent1 hover:text-dark-accent2' 
                      : 'text-blue-600 hover:text-blue-700'
                  }`}>
                    <span className="animate-pulse inline-block mr-2">✨</span>
                    RiseUp AI
                  </Link>
                </div>
                {isLoggedIn && (
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      to="/dashboard"
                      className={`${
                        isActive('/dashboard')
                          ? (darkMode 
                            ? 'border-dark-accent1 text-dark-text' 
                            : 'border-blue-500 text-gray-900')
                          : (darkMode 
                            ? 'border-transparent text-dark-textSecondary hover:border-dark-accent2 hover:text-dark-text' 
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700')
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 hover:scale-105`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/resources"
                      className={`${
                        isActive('/resources')
                          ? (darkMode 
                            ? 'border-dark-accent1 text-dark-text' 
                            : 'border-blue-500 text-gray-900')
                          : (darkMode 
                            ? 'border-transparent text-dark-textSecondary hover:border-dark-accent2 hover:text-dark-text' 
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700')
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 hover:scale-105`}
                    >
                      Care Finder
                    </Link>
                    <Link
                      to="/jobs"
                      className={`${
                        isActive('/jobs')
                          ? (darkMode 
                            ? 'border-dark-accent1 text-dark-text' 
                            : 'border-blue-500 text-gray-900')
                          : (darkMode 
                            ? 'border-transparent text-dark-textSecondary hover:border-dark-accent2 hover:text-dark-text' 
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700')
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 hover:scale-105`}
                    >
                      Jobs
                    </Link>
                    <Link
                      to="/skills"
                      className={`${
                        isActive('/skills')
                          ? (darkMode 
                            ? 'border-dark-accent1 text-dark-text' 
                            : 'border-blue-500 text-gray-900')
                          : (darkMode 
                            ? 'border-transparent text-dark-textSecondary hover:border-dark-accent2 hover:text-dark-text' 
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700')
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 hover:scale-105`}
                    >
                      Skills & jobs
                    </Link>
                    
                    <Link
                      to="/awareness"
                      className={`${
                        isActive('/awareness')
                          ? (darkMode 
                            ? 'border-dark-accent1 text-dark-text' 
                            : 'border-blue-500 text-gray-900')
                          : (darkMode 
                            ? 'border-transparent text-dark-textSecondary hover:border-dark-accent2 hover:text-dark-text' 
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700')
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 hover:scale-105`}
                    >
                      Bulletin
                    </Link>
                  </div>
                )}
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {isLoggedIn ? (
                  <div className="ml-3 relative flex items-center space-x-4">
                    <span className={darkMode ? 'text-dark-textSecondary' : 'text-gray-700'}>
                      Welcome, <span className={darkMode ? 'text-dark-accent3 font-medium' : 'text-blue-600 font-medium'}>
                        {username}
                      </span>
                    </span>
                    <button
                      onClick={handleLogout}
                      className={`${
                        darkMode 
                          ? 'text-dark-textSecondary hover:text-dark-accent3 hover:bg-dark-50' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      } px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105`}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="ml-3 relative flex items-center space-x-2">
                    <button
                      onClick={openLoginModal}
                      className={`${
                        darkMode 
                          ? 'text-dark-textSecondary hover:text-dark-text hover:bg-dark-50' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      } px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105`}
                    >
                      Login
                    </button>
                    <button
                      onClick={openSignupModal}
                      className={`${
                        darkMode 
                          ? 'bg-dark-accent1 hover:bg-dark-accent1/80 shadow-colored-glow' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 transform`}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
              
              {/* Mobile menu button with enhanced styling */}
              <div className="flex items-center sm:hidden">
                {/* Hamburger button */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`inline-flex items-center justify-center p-2 rounded-md ${
                    darkMode 
                      ? 'text-dark-textSecondary hover:text-dark-text hover:bg-dark-50' 
                      : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
                  } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <svg
                    className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu with enhanced styling */}
          <div 
            className={`${isMobileMenuOpen ? 'block animate-scale' : 'hidden'} sm:hidden absolute w-full ${
              darkMode ? 'bg-dark-200 border-t border-dark-50' : 'bg-white'
            } shadow-lg`}
            id="mobile-menu"
          >
            {isLoggedIn ? (
              <div className="pt-2 pb-3 space-y-1">
                <Link
                  to="/dashboard"
                  className={`${
                    isActive('/dashboard')
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/resources"
                  className={`${
                    isActive('/resources')
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Care Finder
                </Link>
                <Link
                  to="/jobs"
                  className={`${
                    isActive('/jobs')
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Jobs
                </Link>
                <Link
                  to="/skills"
                  className={`${
                    isActive('/skills')
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Skills & Jobs
                </Link>
                <Link
                  to="/awareness"
                  className={`${
                    isActive('/awareness')
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Bulletin
                </Link>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {username}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-2 pb-3 space-y-1">
                <button
                  onClick={() => {
                    openLoginModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    openSignupModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        initialTab={authModalTab} 
      />
    </>
  );
};

export default Navbar; 