import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from '../../utils/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';
import BackgroundAnimation from '../features/BackgroundAnimation';
import axios from 'axios';

const API_BASE_URL = 'https://flasktest-m5jd.onrender.com';

const Layout: React.FC = () => {
  const { darkMode } = useTheme();
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [showStatus, setShowStatus] = useState(true);
  
  // Add smooth transitions when switching between themes
  useEffect(() => {
    // Apply transition class to body
    document.body.classList.add('transition-colors', 'duration-300');
    
    return () => {
      document.body.classList.remove('transition-colors', 'duration-300');
    };
  }, []);
  
  // Check API connection on mount
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        console.log('API connection successful:', response.data);
        setApiStatus('connected');
        
        // Hide the status indicator after 5 seconds if connected
        setTimeout(() => {
          setShowStatus(false);
        }, 5000);
      } catch (error) {
        console.error('API connection failed:', error);
        setApiStatus('error');
      }
    };
    
    checkApiConnection();
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col transition-all duration-300 animate-fadeIn ${
      darkMode 
        ? 'bg-dark-400 text-dark-text' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Interactive Background applied to the entire website */}
      <div className="fixed inset-0 w-full h-full z-0">
        <BackgroundAnimation objectCount={20} interactive={true} />
      </div>
      
      <Navbar />
      <main className="flex-1 mt-16 px-4 sm:px-6 lg:px-8 transition-all duration-300 relative z-10">
        <div className="max-w-7xl mx-auto py-6 animate-slideUp">
          <Outlet />
        </div>
      </main>
      
      {/* API Status Indicator */}
      {showStatus && (
        <div className={`fixed bottom-16 right-4 z-50 px-3 py-2 rounded-lg backdrop-blur-sm shadow-md transition-all duration-300 ${
          apiStatus === 'checking' ? 'bg-yellow-500/80 text-white' :
          apiStatus === 'error' ? 'bg-red-500/80 text-white' :
          'bg-green-500/80 text-white'
        }`}>
          {apiStatus === 'checking' ? 'Connecting to API...' :
           apiStatus === 'error' ? 'API Connection Failed' :
           'API Connected'}
        </div>
      )}
      
      {/* Fixed Theme Toggle in bottom right */}
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Subtle gradient overlay for dark mode */}
      {darkMode && (
        <div className="fixed inset-0 bg-gradient-radial from-dark-300/0 to-dark-500/30 pointer-events-none z-0" />
      )}
      
      {/* Moving gradient background for dark mode */}
      {darkMode && (
        <div 
          className="fixed inset-0 pointer-events-none opacity-10 z-0"
          style={{
            backgroundImage: 'linear-gradient(45deg, #6E56CF 0%, #1AD1A5 50%, #F77F6E 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradientFlow 15s ease infinite'
          }}
        />
      )}
    </div>
  );
};

export default Layout;