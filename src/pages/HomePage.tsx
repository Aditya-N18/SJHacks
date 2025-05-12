import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext';

const HomePage: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('user_id');
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleGetStarted = () => {
    // Set a user ID in localStorage if needed
    if (!localStorage.getItem('user_id')) {
      localStorage.setItem('user_id', 'temp-user-1234');
      localStorage.setItem('username', 'Guest');
    }
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center">
          <h1 className={`text-4xl font-extrabold ${darkMode ? 'text-dark-text' : 'text-gray-900'} sm:text-5xl sm:tracking-tight lg:text-6xl 
              relative inline-block animate-fadeIn
              ${darkMode ? 'after:content-[\'\'] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-dark-accent1 after:to-dark-accent2' : ''}
            `}>
            Welcome to <span className={`${darkMode ? 'text-dark-accent1' : 'text-blue-600'}`}>RiseUp AI</span>
          </h1>
          <p className={`mt-5 max-w-xl mx-auto text-xl ${darkMode ? 'text-dark-textSecondary' : 'text-gray-500'} animate-slideUp`}>
            Your partner in finding support services and resources
          </p>
          
          {isLoggedIn ? (
            <div className="mt-8 flex justify-center animate-fadeIn" style={{ animationDelay: '200ms' }}>
              <a
                href="/dashboard"
                className={`px-8 py-3 border border-transparent text-base font-medium rounded-md text-white transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                  darkMode 
                  ? 'bg-dark-accent1 hover:bg-dark-accent1/90 shadow-colored-glow' 
                  : 'bg-blue-600 hover:bg-blue-700'
                } md:py-4 md:text-lg md:px-10`}
              >
                Go to Dashboard
              </a>
            </div>
          ) : (
            <p className={`mt-8 text-lg ${darkMode ? 'text-dark-textSecondary' : 'text-gray-600'} animate-fadeIn`} style={{ animationDelay: '300ms' }}>
              Please log in or sign up to access our services
            </p>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-24 animate-fadeIn" style={{ animationDelay: '400ms' }}>
          <h2 className={`text-2xl font-extrabold ${darkMode ? 'text-dark-text' : 'text-gray-900'} text-center mb-4`}>
            How RiseUp AI Can Help
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Find Shelters Card */}
            <div 
              className={`${
                darkMode 
                  ? 'bg-dark-200/80 backdrop-blur-sm border border-dark-50 hover:border-dark-accent1' 
                  : 'bg-white/90 backdrop-blur-sm hover:shadow-lg'
              } overflow-hidden shadow rounded-lg transition-all duration-300 hover:scale-105 transform`}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${
                  darkMode ? 'bg-dark-accent1/20 text-dark-accent1' : 'bg-blue-100 text-blue-600'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className={`text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-900'} mb-2`}>Care Finder</h3>
                <p className={`text-sm ${darkMode ? 'text-dark-textSecondary' : 'text-gray-500'}`}>
                  Find safe shelter quickly with our Shelter Locator. Using your location, the app connects you to the nearest shelters and support services available in your area. Get real-time information on availability, services offered, and ratings — all designed to make finding help faster and easier.
                </p>
                <button
                  onClick={() => {
                    // Set a user ID in localStorage so protected route works
                    if (!localStorage.getItem('user_id')) {
                      localStorage.setItem('user_id', 'temp-user-1234');
                      localStorage.setItem('username', 'Guest');
                    }
                    // Navigate to resources
                    navigate('/resources');
                  }}
                  className={`mt-4 w-full ${
                    darkMode 
                      ? 'bg-dark-accent1 hover:bg-dark-accent1/80 shadow-colored-glow' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-md`}
                >
                  Find Now
                  <span className="ml-2">→</span>
                </button>  
              </div>
          </div>

            {/* Skills & Job Finder Card */}
            <div 
              className={`${
                darkMode 
                  ? 'bg-dark-200/80 backdrop-blur-sm border border-dark-50 hover:border-dark-accent2' 
                  : 'bg-white/90 backdrop-blur-sm hover:shadow-lg'
              } overflow-hidden shadow rounded-lg transition-all duration-300 hover:scale-105 transform`}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${
                  darkMode ? 'bg-dark-accent2/20 text-dark-accent2' : 'bg-green-100 text-green-600'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className={`text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-900'} mb-2`}>Skill Development & Job Finder</h3>
                <p className={`text-sm ${darkMode ? 'text-dark-textSecondary' : 'text-gray-500'}`}>
                  Our Skill Development and Job Help feature empowers you to build a brighter future. After a short personalized survey, our AI matches you with skill-building programs, job opportunities, and other income-generating resources suited to your experience and goals. It's a guided path to employment, right at your fingertips.
                </p>
                <button
                  onClick={() => {
                    // Set a user ID in localStorage so protected route works
                    if (!localStorage.getItem('user_id')) {
                      localStorage.setItem('user_id', 'temp-user-1234');
                      localStorage.setItem('username', 'Guest');
                    }
                    // Navigate to skills
                    navigate('/skills');
                  }}
                  className={`mt-4 w-full ${
                    darkMode 
                      ? 'bg-dark-accent2 hover:bg-dark-accent2/80 shadow-teal-glow' 
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-md`}
                >
                  Explore Skills
                  <span className="ml-2">→</span>
                </button>
              </div>
            </div>

            

            {/* Community Support Card */}
            <div 
              className={`${
                darkMode 
                  ? 'bg-dark-200/80 backdrop-blur-sm border border-dark-50 hover:border-dark-accent3' 
                  : 'bg-white/90 backdrop-blur-sm hover:shadow-lg'
              } overflow-hidden shadow rounded-lg transition-all duration-300 hover:scale-105 transform`}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${
                  darkMode ? 'bg-dark-accent3/20 text-dark-accent3' : 'bg-purple-100 text-purple-600'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className={`text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-900'} mb-2`}>Community Support</h3>
                <p className={`text-sm ${darkMode ? 'text-dark-textSecondary' : 'text-gray-500'}`}>
                  Connect with community organizations and support networks that can help you access resources, build relationships, and create a stronger support system. Find peer groups, mentoring programs, and community events designed to help you thrive.
                </p>
                <button
                  className={`mt-4 w-full ${
                    darkMode 
                      ? 'bg-dark-accent3 hover:bg-dark-accent3/80 shadow-coral-glow' 
                      : 'bg-purple-600 hover:bg-purple-700'
                  } text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-md`}
                  onClick={() => {
                    // Set a user ID in localStorage so protected route works
                    if (!localStorage.getItem('user_id')) {
                      localStorage.setItem('user_id', 'temp-user-1234');
                      localStorage.setItem('username', 'Guest');
                    }
                    // Navigate to resources
                    navigate('/resources');
                  }}
                >
                  Find Community
                  <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom highlight section */}
        <div className={`mt-24 p-8 rounded-xl backdrop-blur-sm ${
          darkMode 
            ? 'bg-gradient-to-r from-dark-accent1/20 to-dark-accent2/20 border border-dark-50' 
            : 'bg-blue-50/80'
        } animate-fadeIn`} style={{ animationDelay: '600ms' }}>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-dark-text' : 'text-gray-900'}`}>
              Your Journey Starts Here
            </h2>
            <p className={`mb-6 ${darkMode ? 'text-dark-textSecondary' : 'text-gray-700'}`}>
              RiseUp AI is dedicated to providing personalized support when you need it most. Our AI-powered platform connects you with resources, skills, and opportunities to help you build a better future.
            </p>
            <button
              onClick={handleGetStarted}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                darkMode 
                  ? 'bg-gradient-to-r from-dark-accent1 to-dark-accent2 hover:from-dark-accent1/90 hover:to-dark-accent2/90 shadow-colored-glow' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition-all duration-300 transform hover:scale-105`}
            >
              <span>Get Started Now</span>
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;