import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const { darkMode } = useTheme();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn relative z-10">
        {/* Welcome Banner */}
        <div className={`mb-10 p-6 rounded-xl backdrop-blur-lg ${
          darkMode 
            ? 'bg-gradient-to-r from-dark-accent1/30 to-dark-accent2/30 border border-dark-50/50 shadow-lg' 
            : 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-100/70 shadow-lg'
        } animate-fadeIn transition-all duration-300`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-dark-text' : 'text-gray-900'}`}>
                Hello, <span className={darkMode ? 'text-dark-accent1' : 'text-blue-600'}>{username || 'User'}</span>!
              </h1>
              <p className={`mt-2 ${darkMode ? 'text-dark-textSecondary' : 'text-gray-700'}`}>
                Explore resources and services tailored to your needs
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${
                darkMode 
                  ? 'bg-dark-accent2/20 text-dark-accent2 animate-pulse border border-dark-accent2/20' 
                  : 'bg-blue-100/80 text-blue-800 border border-blue-200/50'
              }`}>
                <span className="mr-2">✨</span>
                Your dashboard is ready
              </span>
            </div>
          </div>
        </div>
        
        {/* Service Cards */}
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-dark-text' : 'text-gray-900'} mb-6 ml-1`}>
          Quick Access
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Find Shelters Card */}
          <div className={`${
            darkMode 
              ? 'bg-dark-200/60 backdrop-blur-lg border border-dark-50/50 hover:border-dark-accent1/70' 
              : 'bg-white/70 backdrop-blur-lg border border-gray-100/50 hover:border-blue-200/70'
          } p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 transform animate-fadeIn hover:shadow-xl`}
          style={{ animationDelay: '100ms' }}>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-dark-accent1/20 text-dark-accent1 border border-dark-accent1/20' 
                         : 'bg-blue-100/80 text-blue-600 border border-blue-200/50'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className={`${
                darkMode ? 'bg-dark-accent1/10 text-dark-accent1 border border-dark-accent1/10' 
                         : 'bg-blue-50/80 text-blue-500 border border-blue-100/50'
              } px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm`}>
                Available Now
              </div>
            </div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-dark-text' : 'text-gray-800'} mb-2`}>
              Care Finder
            </h3>
            <p className={`${darkMode ? 'text-dark-textSecondary' : 'text-gray-600'} mb-6`}>
              Locate shelters and housing resources near you using our interactive map.
            </p>
            <button
              onClick={() => navigate('/resources')}
              className={`w-full ${
                darkMode 
                  ? 'bg-dark-accent1/90 hover:bg-dark-accent1 shadow-colored-glow backdrop-blur-sm' 
                  : 'bg-blue-600/90 hover:bg-blue-700 shadow-lg backdrop-blur-sm'
              } text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2`}
            >
              <span>Find Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Skills Card */}
          <div className={`${
            darkMode 
              ? 'bg-dark-200/60 backdrop-blur-lg border border-dark-50/50 hover:border-dark-accent2/70' 
              : 'bg-white/70 backdrop-blur-lg border border-gray-100/50 hover:border-green-200/70'
          } p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 transform animate-fadeIn hover:shadow-xl`}
          style={{ animationDelay: '200ms' }}>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-dark-accent2/20 text-dark-accent2 border border-dark-accent2/20' 
                         : 'bg-green-100/80 text-green-600 border border-green-200/50'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className={`${
                darkMode ? 'bg-dark-accent2/10 text-dark-accent2 border border-dark-accent2/10' 
                         : 'bg-green-50/80 text-green-500 border border-green-100/50'
              } px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm`}>
                Personalized
              </div>
            </div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-dark-text' : 'text-gray-800'} mb-2`}>
              Skills Development & Job Help
            </h3>
            <p className={`${darkMode ? 'text-dark-textSecondary' : 'text-gray-600'} mb-6`}>
              Build your skills and find job opportunities aligned with your experience and goals.
            </p>
            <button
              onClick={() => navigate('/skills')}
              className={`w-full ${
                darkMode 
                  ? 'bg-dark-accent2/90 hover:bg-dark-accent2 shadow-teal-glow backdrop-blur-sm' 
                  : 'bg-green-600/90 hover:bg-green-700 shadow-lg backdrop-blur-sm'
              } text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2`}
            >
              <span>Find a Job Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Jobs Card */}
          <div className={`${
            darkMode 
              ? 'bg-dark-200/60 backdrop-blur-lg border border-dark-50/50 hover:border-dark-accent3/70' 
              : 'bg-white/70 backdrop-blur-lg border border-gray-100/50 hover:border-indigo-200/70'
          } p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 transform animate-fadeIn hover:shadow-xl`}
          style={{ animationDelay: '300ms' }}>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-dark-accent3/20 text-dark-accent3 border border-dark-accent3/20' 
                         : 'bg-indigo-100/80 text-indigo-600 border border-indigo-200/50'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className={`${
                darkMode ? 'bg-dark-accent3/10 text-dark-accent3 border border-dark-accent3/10' 
                         : 'bg-indigo-50/80 text-indigo-500 border border-indigo-100/50'
              } px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm`}>
                New Listings
              </div>
            </div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-dark-text' : 'text-gray-800'} mb-2`}>
              Job Opportunities
            </h3>
            <p className={`${darkMode ? 'text-dark-textSecondary' : 'text-gray-600'} mb-6`}>
              Find employment and training opportunities in your area.
            </p>
            <button
              onClick={() => navigate('/jobs')}
              className={`w-full ${
                darkMode 
                  ? 'bg-dark-accent3/90 hover:bg-dark-accent3 shadow-coral-glow backdrop-blur-sm' 
                  : 'bg-indigo-600/90 hover:bg-indigo-700 shadow-lg backdrop-blur-sm'
              } text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2`}
            >
              <span>Search Jobs</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-10 animate-fadeIn" style={{ animationDelay: '500ms' }}>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-dark-text' : 'text-gray-900'} mb-4 ml-1`}>
            Recent Activity
          </h2>
          <div className={`${
            darkMode 
              ? 'bg-dark-200/60 backdrop-blur-lg border border-dark-50/50 hover:border-dark-100/30' 
              : 'bg-white/70 backdrop-blur-lg border border-gray-200/50 hover:border-gray-300/50'
          } p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full ${
                darkMode ? 'bg-dark-accent2/20 border border-dark-accent2/20' 
                         : 'bg-blue-100/80 border border-blue-200/50'
              } flex items-center justify-center mr-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${
                  darkMode ? 'text-dark-accent2' : 'text-blue-600'
                }`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className={`${darkMode ? 'text-dark-textSecondary' : 'text-gray-600'}`}>
                Start exploring resources to see your activity here. Your recent interactions will be displayed in this section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;