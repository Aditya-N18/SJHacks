import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../utils/ThemeContext';
import axios from 'axios';

const API_BASE_URL = 'https://flasktest-m5jd.onrender.com';

interface BulletinData {
  message?: string;
  alerts?: string[];
  resources?: string[];
  events?: string[];
  [key: string]: unknown;
}

const AwarenessBulletin: React.FC = () => {
  const { darkMode } = useTheme();
  const [city, setCity] = useState('San Jose');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bulletinData, setBulletinData] = useState<BulletinData | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter your city');
      return;
    }

    setLoading(true);
    setError('');
    setBulletinData(null);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/awareness_bulletin`, {
        city: city.trim()
      });
      
      console.log('Response data:', response.data);
      
      let formattedData: BulletinData = {};
      
      if (typeof response.data === 'string') {
        formattedData = { message: response.data };
      } else if (
        response.data && 
        typeof response.data === 'object' && 
        'response' in response.data && 
        typeof response.data.response === 'string'
      ) {
        formattedData = { message: response.data.response };
      } else {
        formattedData = response.data as BulletinData;
      }
      
      setBulletinData(formattedData);
      setSubmitted(true);
    } catch (err) {
      console.error('Error fetching bulletin:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch awareness information';
      setError(`Error: ${errorMessage}. Please try again.`);
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    // Auto-submit San Jose as an example when component loads
    if (city === 'San Jose' && !submitted && !bulletinData) {
      handleSubmit(new Event('submit') as unknown as React.FormEvent);
    }
  }, [city, submitted, bulletinData, handleSubmit]);

  const resetForm = () => {
    setSubmitted(false);
    setBulletinData(null);
    setCity('');
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-dark-accent1' : 'text-blue-600'} mb-6`}>Awareness Bulletin</h1>
      
      {!submitted ? (
        <div className={`max-w-md mx-auto ${
          darkMode 
            ? 'bg-dark-200/60 backdrop-blur-lg border border-dark-50/50 shadow-xl' 
            : 'bg-white/70 backdrop-blur-lg border border-gray-200/50 shadow-lg'
        } rounded-xl p-6 transition-all duration-300`}>
          <p className={`text-lg mb-6 ${darkMode ? 'text-dark-textSecondary' : 'text-gray-600'}`}>
            Get important awareness updates, alerts, and community events specific to your location.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="city" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-dark-text' : 'text-gray-700'}`}>
                What city do you live in?
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                className={`w-full px-4 py-2 rounded-md shadow-sm focus:ring-2 ${
                  darkMode 
                    ? 'bg-dark-300/70 backdrop-blur-sm border-dark-50/50 text-dark-text focus:border-dark-accent1 focus:ring-dark-accent1/50' 
                    : 'bg-white/80 backdrop-blur-sm border border-gray-300/50 focus:border-blue-500 focus:ring-blue-500/50'
                }`}
                required
              />
            </div>
            
            {error && (
              <div className={`p-3 mb-4 rounded-md ${darkMode ? 'bg-red-900/30 backdrop-blur-sm text-red-200' : 'bg-red-50/80 backdrop-blur-sm text-red-700'}`}>
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white font-medium rounded-md ${
                loading 
                  ? 'bg-gray-400/80 backdrop-blur-sm cursor-not-allowed' 
                  : darkMode
                    ? 'bg-dark-accent1/90 backdrop-blur-sm hover:bg-dark-accent1 shadow-colored-glow' 
                    : 'bg-blue-600/90 backdrop-blur-sm hover:bg-blue-700 shadow-md hover:shadow-lg'
              } transition-all duration-300`}
            >
              {loading ? 'Loading...' : 'Get Awareness Updates'}
            </button>
          </form>
        </div>
      ) : (
        <div className={`max-w-3xl mx-auto ${
          darkMode 
            ? 'bg-dark-200/60 backdrop-blur-lg border border-dark-50/50 shadow-xl' 
            : 'bg-white/70 backdrop-blur-lg border border-gray-200/50 shadow-lg'
        } rounded-xl p-6 transition-all duration-300`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-semibold ${darkMode ? 'text-dark-accent2' : 'text-blue-700'}`}>
              Community Bulletin for {city}
            </h2>
            <button
              onClick={resetForm}
              className={`px-4 py-2 rounded-md ${
                darkMode 
                  ? 'bg-dark-50/70 backdrop-blur-sm text-dark-text hover:bg-dark-300/70 transition-all duration-300' 
                  : 'bg-gray-100/80 backdrop-blur-sm text-gray-700 hover:bg-gray-200/80 transition-all duration-300 shadow-sm'
              }`}
            >
              Check Another City
            </button>
          </div>
          
          {bulletinData?.message && (
            <div className={`mb-6 p-5 rounded-lg ${
              darkMode 
                ? 'bg-dark-300/70 backdrop-blur-sm border border-dark-50/50 shadow-md' 
                : 'bg-blue-50/70 backdrop-blur-sm border border-blue-100/50 shadow-md'
            }`}>
              <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                <div dangerouslySetInnerHTML={{ 
                  __html: bulletinData.message
                    .toString()
                    .replace(/\n/g, '<br/>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                }} />
              </div>
            </div>
          )}
          
          {bulletinData?.alerts && bulletinData.alerts.length > 0 && (
            <div className={`mb-6 p-4 rounded-lg ${
              darkMode 
                ? 'bg-dark-300/70 backdrop-blur-sm border border-red-700/30 shadow-md' 
                : 'bg-red-50/70 backdrop-blur-sm border border-red-100/50 shadow-md'
            }`}>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-red-400' : 'text-red-700'}`}>Important Alerts</h3>
              <ul className="space-y-2">
                {bulletinData.alerts.map((alert, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">🚨</span>
                    <span className={darkMode ? 'text-dark-textSecondary' : 'text-gray-700'}>{alert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {bulletinData?.resources && bulletinData.resources.length > 0 && (
            <div className={`mb-6 p-4 rounded-lg ${
              darkMode 
                ? 'bg-dark-300/70 backdrop-blur-sm border border-blue-700/30 shadow-md' 
                : 'bg-blue-50/70 backdrop-blur-sm border border-blue-100/50 shadow-md'
            }`}>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>Local Resources</h3>
              <ul className="space-y-2">
                {bulletinData.resources.map((resource, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">📍</span>
                    <span className={darkMode ? 'text-dark-textSecondary' : 'text-gray-700'}>{resource}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {bulletinData?.events && bulletinData.events.length > 0 && (
            <div className={`mb-6 p-4 rounded-lg ${
              darkMode 
                ? 'bg-dark-300/70 backdrop-blur-sm border border-green-700/30 shadow-md' 
                : 'bg-green-50/70 backdrop-blur-sm border border-green-100/50 shadow-md'
            }`}>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>Upcoming Events</h3>
              <ul className="space-y-2">
                {bulletinData.events.map((event, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">📅</span>
                    <span className={darkMode ? 'text-dark-textSecondary' : 'text-gray-700'}>{event}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AwarenessBulletin; 