import React, { useState, useEffect } from 'react';
import { PlaceResult } from '../utils/api';
import axios from 'axios';

const API_BASE_URL = 'https://flasktest-m5jd.onrender.com';

interface Resource {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: string;
  rating?: number;
  location?: {
    lat: number;
    lng: number;
  };
  type?: string;
}

const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [userCoordinates, setUserCoordinates] = useState<{latitude: number, longitude: number} | null>(null);
  const [geoLocationStatus, setGeoLocationStatus] = useState<'idle' | 'requested' | 'received' | 'error'>('idle');
  const [resourceType, setResourceType] = useState<'shelter' | 'food' | 'medical'>('shelter');

  // Check backend connectivity on component mount
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        await axios.get(API_BASE_URL);
        setBackendStatus('connected');
        console.log('✅ Successfully connected to backend!');
      } catch (err) {
        console.error('❌ Error connecting to backend:', err);
        setBackendStatus('error');
      }
    };

    checkBackendConnection();
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setGeoLocationStatus('requested');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserCoordinates(coords);
          setGeoLocationStatus('received');
          console.log('User coordinates retrieved:', coords);
        },
        (error) => {
          console.error('Error getting location:', error);
          setGeoLocationStatus('error');
          setError(`Geolocation error: ${error.message}`);
        }
      );
    } else {
      setGeoLocationStatus('error');
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleFindResources = async (type: 'shelter' | 'food' | 'medical') => {
    if (!userCoordinates) {
      setError('Location coordinates are not available. Please enable location services.');
      return;
    }

    setLoading(true);
    setError('');
    setResources([]);
    setResourceType(type);

    try {
      const payload = {
        latitude: userCoordinates.latitude,
        longitude: userCoordinates.longitude
      };
      
      console.log(`Searching for ${type} resources at coordinates:`, payload);
      
      // Choose the right endpoint based on resource type
      let endpoint = '';
      switch(type) {
        case 'shelter':
          endpoint = '/find_shelters';
          break;
        case 'food':
          endpoint = '/find_food_donation';
          break;
        case 'medical':
          endpoint = '/find_medicare';
          break;
      }
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Log the full response for debugging
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed response:', data);
      } catch (e) {
        console.error('Error parsing response:', e);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${data?.message || 'Unknown error'}`);
      }

      // Convert the response to our Resource format
      const resourceResults = (data.results || []).map((result: PlaceResult): Resource => ({
        id: result.name.toLowerCase().replace(/\s+/g, '-'),
        name: result.name,
        address: result.formatted_address || result.vicinity || '',
        phone: '',
        distance: '',
        rating: result.rating,
        location: result.geometry?.location,
        type: type
      }));

      console.log(`Found ${type} resources:`, resourceResults);
      setResources(resourceResults);
      
      if (resourceResults.length === 0) {
        setError(`No ${type} resources found near your location. Try a different location.`);
      }
    } catch (err) {
      console.error(`Error finding ${type} resources:`, err);
      const errorMessage = err instanceof Error ? err.message : `Failed to find ${type} resources`;
      setError(`Error: ${errorMessage}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const getResourceTitle = () => {
    switch (resourceType) {
      case 'food':
        return 'Food Donation Centers';
      case 'medical':
        return 'Medical Facilities';
      default:
        return 'Shelters';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Find Nearby Resources</h1>

      {backendStatus === 'checking' && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
          Checking connection to backend server...
        </div>
      )}

      {backendStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-800">
          <h3 className="font-semibold">Backend Connection Error</h3>
          <p>Could not connect to the backend server at <code className="bg-red-100 px-1 py-0.5 rounded">{API_BASE_URL}</code></p>
          <p className="mt-2 text-sm">Please ensure the server is running and accessible.</p>
        </div>
      )}

      {backendStatus === 'connected' && (
        <div className="space-y-6">
          {/* Location Status */}
          <div className="flex items-center space-x-4">
            {geoLocationStatus === 'idle' && (
              <div className="text-blue-600">
                We need your location to find resources nearby.
              </div>
            )}

            {geoLocationStatus === 'requested' && (
              <div className="flex items-center text-blue-600">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Getting your location...
              </div>
            )}

            {geoLocationStatus === 'received' && userCoordinates && (
              <span className="text-green-600">
                📍 Location found and ready to search
              </span>
            )}

            {geoLocationStatus === 'error' && (
              <div className="text-red-600">
                ❌ Location error - Please enable location services in your browser and refresh the page.
              </div>
            )}
          </div>

          {/* Resource Type Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleFindResources('shelter')}
              disabled={loading || geoLocationStatus !== 'received'}
              className={`px-6 py-3 rounded-lg font-semibold text-white ${
                loading || geoLocationStatus !== 'received'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading && resourceType === 'shelter' ? 'Searching...' : 'Find Nearby Shelters'}
            </button>

            <button
              onClick={() => handleFindResources('food')}
              disabled={loading || geoLocationStatus !== 'received'}
              className={`px-6 py-3 rounded-lg font-semibold text-white ${
                loading || geoLocationStatus !== 'received'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading && resourceType === 'food' ? 'Searching...' : 'Find Food Donation Centers'}
            </button>

            <button
              onClick={() => handleFindResources('medical')}
              disabled={loading || geoLocationStatus !== 'received'}
              className={`px-6 py-3 rounded-lg font-semibold text-white ${
                loading || geoLocationStatus !== 'received'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {loading && resourceType === 'medical' ? 'Searching...' : 'Find Medical Facilities'}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-800">
              {error}
            </div>
          )}

          {resources.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-8 mb-4">Nearby {getResourceTitle()}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource, index) => (
                  <div
                    key={resource.id || index}
                    className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                      resourceType === 'shelter' ? 'border-blue-200' : 
                      resourceType === 'food' ? 'border-green-200' : 'border-red-200'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{resource.name}</h3>
                    <p className="text-gray-600">{resource.address}</p>
                    {resource.phone && (
                      <p className="text-gray-600">
                        <span className="font-medium">Phone:</span> {resource.phone}
                      </p>
                    )}
                    {resource.distance && (
                      <p className="text-gray-600">
                        <span className="font-medium">Distance:</span> {resource.distance}
                      </p>
                    )}
                    {resource.rating && (
                      <div className="mt-2">
                        <span className="font-medium">Rating:</span>{' '}
                        <span className="text-yellow-500">{'★'.repeat(Math.round(resource.rating))}</span>
                        <span className="text-gray-300">{'★'.repeat(5 - Math.round(resource.rating))}</span>
                        <span className="text-gray-500 text-sm ml-1">({resource.rating})</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;