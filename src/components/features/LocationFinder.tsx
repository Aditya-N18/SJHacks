import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Heart, MapPin, Phone, Clock, Search, Coffee } from 'lucide-react';
import Card from '../ui/Card';
import { motion } from 'framer-motion';
import { Loader } from '@googlemaps/js-api-loader';

interface Place {
  name: string;
  address: string;
  type: 'shelter' | 'food';
  distance: string;
  rating?: number;
  phone?: string;
  openNow?: boolean;
}

// Add type declaration for window.gm_authFailure
declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

const LocationFinder: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [mapLoadError, setMapLoadError] = useState<string | null>(null);
  const [isGoogleAPIChecked, setIsGoogleAPIChecked] = useState(false);
  const [skipGoogleMaps, setSkipGoogleMaps] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  
  // Load Google Maps API and initialize services
  const initGoogle = async () => {
    try {
      console.log('Loading Google Maps API...');

      // First, define the auth failure handler
      window.gm_authFailure = () => {
        console.error('Google Maps authentication failed - invalid API key');
        const hostname = window.location.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
          setMapLoadError('Google Maps authentication failed. Your API key might have domain restrictions. Make sure to allow localhost and 127.0.0.1 in your key restrictions.');
        } else {
          setMapLoadError('Google Maps failed to load due to authentication issues. Please check your API key or billing account.');
        }
        setGoogleLoaded(false);
        setIsGoogleAPIChecked(true);
      };
      
      // Get API key from environment or use a default
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey) {
        console.error('No valid Google Maps API key provided');
        setMapLoadError('Missing Google Maps API key. Please add a valid key to your environment variables.');
        setGoogleLoaded(false);
        setIsGoogleAPIChecked(true);
        return;
      }
      
      console.log('Using Google Maps API key:', apiKey.substring(0, 8) + '...');
      console.log('Current hostname:', window.location.hostname);
      
      try {
        // Try direct script loading as a backup approach
        if (window.google && window.google.maps) {
          console.log('Google Maps already loaded');
        } else {
          console.log('Attempting to load Google Maps via Loader...');
          
          // Add an additional error listener for script loading
          const originalCreateElement = document.createElement;
          document.createElement = function(tagName: string) {
            const element = originalCreateElement.call(document, tagName);
            if (tagName.toLowerCase() === 'script') {
              element.addEventListener('error', (event) => {
                console.error('Script loading error:', event);
                if ((event.target as HTMLScriptElement).src.includes('maps.googleapis.com')) {
                  console.error('Google Maps script failed to load');
                  setMapLoadError('Google Maps script failed to load. This could be due to network issues or restrictions.');
                  setGoogleLoaded(false);
                  setIsGoogleAPIChecked(true);
                }
              });
            }
            return element;
          };
          
          const loader = new Loader({
            apiKey,
            version: 'weekly',
            libraries: ['places'],
            region: 'US',
            language: 'en',
            // Explicitly set channel to try to bypass some restrictions
            channel: 'developer',
            authReferrerPolicy: 'origin',
          });
          
          await loader.load();
          console.log('Google Maps API loaded successfully!');
          
          // Restore original createElement
          document.createElement = originalCreateElement;
        }
        
        setGoogleLoaded(true);
        setIsGoogleAPIChecked(true);
      } catch (loaderError) {
        console.error('Error loading Google Maps via Loader:', loaderError);
        
        // Try direct script approach as a fallback
        try {
          console.log('Attempting direct script load as fallback...');
          
          if (!window.google || !window.google.maps) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly&language=en&region=US`;
            script.async = true;
            script.defer = true;
            
            await new Promise((resolve, reject) => {
              script.onload = resolve;
              script.onerror = reject;
              document.head.appendChild(script);
            });
            
            console.log('Google Maps loaded successfully via direct script!');
          }
          
          setGoogleLoaded(true);
          setIsGoogleAPIChecked(true);
        } catch (scriptError) {
          console.error('Error loading Google Maps via direct script:', scriptError);
          setMapLoadError(`Failed to load Google Maps via all methods. Check console for details.`);
          setGoogleLoaded(false);
          setIsGoogleAPIChecked(true);
          return;
        }
      }
      
      // Initialize map
      try {
        if (!mapDivRef.current) return;
        
        const map = new google.maps.Map(mapDivRef.current, {
          center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
          zoom: 13,
        });
        mapRef.current = map;
        
        // Initialize Places Service
        const placesService = new google.maps.places.PlacesService(map);
        placesServiceRef.current = placesService;
        console.log('Places service initialized:', !!placesServiceRef.current);
      } catch (mapErr) {
        console.error('Error initializing map:', mapErr);
        setMapLoadError('Failed to initialize Google Maps. Please check your API key or billing account.');
        setGoogleLoaded(false);
        setIsGoogleAPIChecked(true);
        return;
      }
      
      // Initialize autocomplete on the input
      if (searchInputRef.current) {
        try {
          const autocomplete = new google.maps.places.Autocomplete(searchInputRef.current, {
            types: ['address', 'establishment', 'geocode'],
            componentRestrictions: { country: 'us' },
            fields: ['address_components', 'geometry', 'name', 'formatted_address'],
          });
          
          autocompleteRef.current = autocomplete;
          console.log('Autocomplete initialized:', !!autocompleteRef.current);
          
          // Add listener for place selection
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log('Place selected:', place);
            
            if (place.geometry && place.geometry.location) {
              // Use the selected place for search
              const location = place.geometry.location;
              const address = place.formatted_address || '';
              console.log(`Selected location: ${address} (${location.lat()}, ${location.lng()})`);
              
              setSearchQuery(address);
              findNearbyPlaces(location.lat(), location.lng());
            } else {
              console.warn('No geometry found for the selected place');
            }
          });
        } catch (autocompleteErr) {
          console.error('Error initializing autocomplete:', autocompleteErr);
          // We can still continue even if autocomplete fails
        }
      } else {
        console.error('Search input ref not available');
      }
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
      setMapLoadError(`Failed to load Google Maps: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setGoogleLoaded(false);
      setIsGoogleAPIChecked(true);
    }
  };
  
  // Try to reinitialize Google Maps if it failed
  const retryGoogleMapsLoad = () => {
    setMapLoadError(null);
    setGoogleLoaded(false);
    setIsGoogleAPIChecked(false);
    
    // Re-run the initialization
    if (mapDivRef.current && mapDivRef.current.parentNode) {
      mapDivRef.current.parentNode.removeChild(mapDivRef.current);
      mapDivRef.current = null;
    }
    
    // Force-reset the effect
    const mapDiv = document.createElement('div');
    mapDiv.style.display = 'none';
    mapDiv.style.width = '200px';
    mapDiv.style.height = '200px';
    document.body.appendChild(mapDiv);
    mapDivRef.current = mapDiv;
    
    initGoogle();
  };
  
  // Load Google Maps API and initialize services
  useEffect(() => {
    // Create a div for the map if needed
    const mapDiv = document.createElement('div');
    mapDiv.style.display = 'none';
    mapDiv.style.width = '200px'; // Make it slightly larger
    mapDiv.style.height = '200px';
    document.body.appendChild(mapDiv);
    mapDivRef.current = mapDiv;
    
    initGoogle();
    
    // Cleanup
    return () => {
      if (mapDivRef.current && mapDivRef.current.parentNode) {
        mapDivRef.current.parentNode.removeChild(mapDivRef.current);
      }
      // Clean up the auth failure handler
      window.gm_authFailure = undefined;
    };
  }, []);
  
  // Handle manual search submission
  const handleSearch = () => {
    if (!searchQuery || !googleLoaded) {
      console.log('Cannot search: query empty or Google not loaded');
      return;
    }
    
    setIsSearching(true);
    setLoading(true);
    setError(null);
    setPlaces([]);
    
    console.log(`Searching for address: ${searchQuery}`);
    
    // Geocode the address
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        console.log(`Geocoded to: lat ${location.lat()}, lng ${location.lng()}`);
        findNearbyPlaces(location.lat(), location.lng());
      } else {
        console.error('Geocoding failed:', status);
        setError('Could not find this location. Please try a different address.');
        setLoading(false);
        setIsSearching(false);
      }
    });
  };
  
  // Use current location
  const useCurrentLocation = () => {
    if (!googleLoaded) {
      setError('Location services not yet initialized. Please try again in a moment.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setPlaces([]);
    console.log("Requesting user's current location...");
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(`Got user location: lat ${lat}, lng ${lng}`);
          
          // Get address from coordinates for display
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode(
            { location: { lat, lng } },
            (results, status) => {
              if (status === 'OK' && results && results[0]) {
                const address = results[0].formatted_address;
                console.log(`Reverse geocoded to address: ${address}`);
                setSearchQuery(address);
              } else {
                console.warn(`Reverse geocoding failed: ${status}`);
                setSearchQuery(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
              }
              
              // Search for places regardless of reverse geocoding result
              findNearbyPlaces(lat, lng);
            }
          );
        },
        (error) => {
          console.error('Geolocation error:', error.message);
          let errorMsg = 'Unable to access your location. ';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMsg += 'Please allow location access in your browser settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMsg += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMsg += 'The request to get your location timed out.';
              break;
            default:
              errorMsg += 'Please enter an address manually.';
          }
          
          setError(errorMsg);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setError('Location services not supported in your browser.');
      setLoading(false);
    }
  };
  
  // Find nearby shelters and food resources
  const findNearbyPlaces = async (lat: number, lng: number) => {
    if (!placesServiceRef.current || !googleLoaded) {
      setError('Location services not available. Please try again later.');
      setLoading(false);
      setIsSearching(false);
      return;
    }
    
    console.log(`Searching for places near lat: ${lat}, lng: ${lng}`);
    
    const location = new google.maps.LatLng(lat, lng);
    const searchTypes = [
      { query: 'homeless shelter', type: 'shelter' as const, googleType: '' },
      { query: 'food bank soup kitchen', type: 'food' as const, googleType: '' }
    ];
    
    try {
      const allPlaces: Place[] = [];
      
      for (const searchType of searchTypes) {
        console.log(`Searching for ${searchType.type} with query: ${searchType.query}`);
        
        try {
          // Use textSearch for better keyword matching with explicit queries
          const request = {
            location,
            radius: 10000, // 10km radius
            query: searchType.query
          };
          
          const results = await new Promise<google.maps.places.PlaceResult[]>((resolve) => {
            console.log(`Making ${searchType.type} search request with:`, request);
            placesServiceRef.current!.textSearch(
              request,
              (results, status) => {
                console.log(`Search status for ${searchType.type}:`, status);
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                  console.log(`Found ${results.length} ${searchType.type} results:`, results);
                  resolve(results);
                } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                  console.log(`No ${searchType.type} results found`);
                  resolve([]);
                } else {
                  console.error(`Search failed with status: ${status}`);
                  resolve([]);
                }
              }
            );
          });
          
          // Process each place
          for (const place of results) {
            if (place.geometry && place.geometry.location) {
              // Calculate distance
              const distance = calculateDistance(
                lat,
                lng,
                place.geometry.location.lat(),
                place.geometry.location.lng()
              );
              
              // Only include places within 10km
              if (distance <= 10) {
                console.log(`Adding place: ${place.name || 'Unknown'} (${distance.toFixed(1)}km)`, place);
                
                // Create place object directly from search result
                allPlaces.push({
                  name: place.name || 'Unknown place',
                  address: place.formatted_address || 'No address available',
                  type: searchType.type,
                  distance: `${distance.toFixed(1)} km`,
                  rating: place.rating,
                  openNow: place.opening_hours?.open_now,
                  phone: place.formatted_phone_number
                });
              }
            }
          }
        } catch (error) {
          console.error(`Error searching for ${searchType.type}:`, error);
          // Continue with the next search type
        }
      }
      
      console.log(`Total places found after filtering: ${allPlaces.length}`, allPlaces);
      
      if (allPlaces.length === 0) {
        // If no places found, try a broader search with a different type
        try {
          console.log("Trying backup search with generic 'point_of_interest' type");
          
          const backupTypes = [
            { query: 'shelter homeless', type: 'shelter' as const },
            { query: 'food assistance', type: 'food' as const }
          ];
          
          for (const backupType of backupTypes) {
            const request = {
              location,
              radius: 10000,
              query: backupType.query
            };
            
            const results = await new Promise<google.maps.places.PlaceResult[]>((resolve) => {
              placesServiceRef.current!.textSearch(
                request,
                (results, status) => {
                  if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    console.log(`Backup search found ${results.length} ${backupType.type} results`);
                    resolve(results);
                  } else {
                    console.log(`Backup search found no results for ${backupType.type}`);
                    resolve([]);
                  }
                }
              );
            });
            
            // Process backup results
            for (const place of results) {
              if (place.geometry && place.geometry.location) {
                const distance = calculateDistance(
                  lat,
                  lng,
                  place.geometry.location.lat(),
                  place.geometry.location.lng()
                );
                
                if (distance <= 10) {
                  console.log(`Adding backup place: ${place.name} (${distance.toFixed(1)}km)`);
                  
                  allPlaces.push({
                    name: place.name || 'Unknown place',
                    address: place.formatted_address || 'No address available',
                    type: backupType.type,
                    distance: `${distance.toFixed(1)} km`,
                    rating: place.rating,
                    openNow: place.opening_hours?.open_now,
                    phone: place.formatted_phone_number
                  });
                }
              }
            }
          }
        } catch (error) {
          console.error("Error in backup search:", error);
        }
      }
      
      // Sort by distance
      const sortedPlaces = allPlaces.sort((a, b) => {
        const distA = parseFloat(a.distance.split(' ')[0]);
        const distB = parseFloat(b.distance.split(' ')[0]);
        return distA - distB;
      });
      
      console.log(`Final places list:`, sortedPlaces);
      setPlaces(sortedPlaces);
      
      if (sortedPlaces.length === 0) {
        setError('No resources found within 10km of this location. Try a different address or search terms.');
      }
    } catch (error) {
      console.error('Error searching for places:', error);
      setError('Failed to find nearby resources. Please try again.');
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };
  
  // Helper function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return distance;
  };
  
  // Show all results
  const handleShowAll = () => {
    if (!searchQuery || !googleLoaded) return;
    
    // Re-trigger the search with the current query
    handleSearch();
  };

  // Completely skip Google Maps and continue with limited functionality
  const handleSkipGoogleMaps = () => {
    setSkipGoogleMaps(true);
    setMapLoadError(null);
    setError(null);
  };

  return (
    <div className="w-full py-4">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="flex">
            <div className="relative flex-1">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter an address to find nearby resources..."
                className="w-full px-4 py-3 pr-10 rounded-l-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Search address"
                disabled={!googleLoaded && !skipGoogleMaps}
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery || (!googleLoaded && !skipGoogleMaps)}
              className={`flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 font-medium rounded-r-lg hover:bg-blue-700 transition-colors ${
                isSearching || !searchQuery || (!googleLoaded && !skipGoogleMaps) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              aria-label="Search for resources"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
          
          <button
            onClick={useCurrentLocation}
            disabled={loading || (!googleLoaded && !skipGoogleMaps)}
            className={`mt-2 text-blue-600 text-sm flex items-center hover:text-blue-800 ${
              loading || (!googleLoaded && !skipGoogleMaps) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Use my current location"
          >
            <MapPin className="w-4 h-4 mr-1" />
            Use my current location
          </button>
        </div>
      </div>
      
      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-2 bg-gray-100 text-xs font-mono rounded">
          <div>Google Loaded: {googleLoaded ? 'Yes' : skipGoogleMaps ? 'Skipped' : 'No'}</div>
          <div>API Checked: {isGoogleAPIChecked ? 'Yes' : 'No'}</div>
          <div>Places Service: {placesServiceRef.current ? 'Ready' : 'Not Initialized'}</div>
          <div>Autocomplete: {autocompleteRef.current ? 'Ready' : 'Not Initialized'}</div>
          <div>Search Query: {searchQuery || 'None'}</div>
          <div>Results Count: {places.length}</div>
        </div>
      )}
      
      {/* Load Status */}
      {!googleLoaded && !error && !mapLoadError && !skipGoogleMaps && (
        <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg flex items-center">
          <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin mr-3"></div>
          <p>Loading Google Maps services...</p>
        </div>
      )}
      
      {/* Error Message */}
      {(error || mapLoadError) && !skipGoogleMaps && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 mr-2" />
            <p className="font-medium">{mapLoadError || error}</p>
          </div>
          
          {mapLoadError && mapLoadError.includes('API key') && (
            <div className="pl-7 text-sm mt-1">
              <p>This could be due to:</p>
              <ul className="list-disc ml-5 mt-1 space-y-1">
                <li>Invalid Google Maps API key</li>
                <li>Missing billing account on Google Cloud Platform</li>
                <li>API key restrictions (domain, IP, etc.)</li>
                <li>Required APIs not enabled (Maps JavaScript API, Places API)</li>
              </ul>
              <p className="mt-2 font-medium">Steps to fix:</p>
              <ol className="list-decimal ml-5 mt-1 space-y-1">
                <li>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Google Cloud Console</a></li>
                <li>Create or select a project</li>
                <li>Enable the Google Maps JavaScript API and Places API</li>
                <li>Create an API key with appropriate restrictions</li>
                <li>Add your API key to the app's configuration</li>
                <li>Make sure billing is set up (Google requires a billing account, but offers $200 free credit per month)</li>
              </ol>
              
              {mapLoadError && mapLoadError.includes('domain restrictions') && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="font-medium text-yellow-800">Domain Restriction Issue:</p>
                  <p className="text-yellow-800 mt-1">Your API key appears to have domain restrictions that don't include your development environment.</p>
                  <ol className="list-decimal ml-5 mt-1 space-y-1 text-yellow-800">
                    <li>Go to your <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">API key settings</a></li>
                    <li>Under "Application restrictions", select "HTTP referrers"</li>
                    <li>Add the following to "Website restrictions":
                      <ul className="list-disc ml-5 mt-1">
                        <li><code>localhost/*</code></li>
                        <li><code>127.0.0.1/*</code></li>
                        <li>Your production domain if applicable</li>
                      </ul>
                    </li>
                    <li>Click "Save" and wait a few minutes for changes to propagate</li>
                  </ol>
                </div>
              )}
              
              <div className="flex space-x-2 mt-3">
                <button 
                  onClick={retryGoogleMapsLoad}
                  className="bg-red-200 hover:bg-red-300 text-red-800 px-4 py-1 rounded text-sm font-medium transition-colors"
                >
                  Retry Loading
                </button>
                
                <button 
                  onClick={handleSkipGoogleMaps}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded text-sm font-medium transition-colors"
                >
                  Skip Google Maps
                </button>
              </div>
              
              {!skipGoogleMaps && (
                <p className="mt-2 text-xs italic">
                  Note: Skipping Google Maps will disable location search functionality, but you can still manually enter addresses.
                </p>
              )}
            </div>
          )}
        </div>
      )}
      
      {skipGoogleMaps && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
          <p className="font-medium">⚠️ Google Maps is disabled</p>
          <p className="text-sm mt-1">
            You've chosen to skip Google Maps integration. Location search functionality will be limited.
            <button 
              onClick={() => {
                setSkipGoogleMaps(false);
                retryGoogleMapsLoad();
              }}
              className="ml-2 underline hover:no-underline"
            >
              Try again with Google Maps
            </button>
          </p>
        </div>
      )}
      
      {/* Results */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-gray-600">Searching for resources...</p>
        </div>
      ) : places.length > 0 ? (
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <MapPin className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Showing {places.length} resources within 10km of{' '}
                  <span className="font-medium">{searchQuery}</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Filter by type */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setPlaces(prevPlaces => [...prevPlaces].sort((a, b) => {
                const distA = parseFloat(a.distance.split(' ')[0]);
                const distB = parseFloat(b.distance.split(' ')[0]);
                return distA - distB;
              }))}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
            >
              Sort by distance
            </button>
            <button
              onClick={() => setPlaces(prevPlaces => 
                prevPlaces.filter(place => place.type === 'shelter')
              )}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm hover:bg-indigo-200 flex items-center"
            >
              <Heart className="w-3 h-3 mr-1" /> Shelters only
            </button>
            <button
              onClick={() => setPlaces(prevPlaces => 
                prevPlaces.filter(place => place.type === 'food')
              )}
              className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm hover:bg-orange-200 flex items-center"
            >
              <Coffee className="w-3 h-3 mr-1" /> Food only
            </button>
            <button
              onClick={handleShowAll}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200"
            >
              Show all
            </button>
          </div>
          
          {places.map((place, index) => (
            <motion.div
              key={`${place.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className={`rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4 ${
                      place.type === 'shelter' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {place.type === 'shelter' ? (
                        <Heart className="w-5 h-5" />
                      ) : (
                        <Coffee className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg text-gray-800">{place.name}</h3>
                        {place.openNow !== undefined && (
                          <span className={`text-xs px-2 py-1 rounded-full flex items-center ${
                            place.openNow ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            <Clock className="w-3 h-3 mr-1" />
                            {place.openNow ? 'Open now' : 'Closed'}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-600 flex items-start">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                          <span>{place.address}</span>
                        </p>
                        
                        {place.phone && (
                          <p className="text-sm text-gray-600 flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            <a href={`tel:${place.phone}`} className="text-blue-600 hover:underline">
                              {place.phone}
                            </a>
                          </p>
                        )}
                        
                        <div className="flex items-center text-sm">
                          <div className="text-blue-700 font-medium">{place.distance}</div>
                          {place.rating && (
                            <div className="ml-3 flex items-center text-amber-500">
                              <span className="text-gray-600 mr-1">Rating:</span>
                              {place.rating} ★
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Get directions →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : searchQuery && !loading && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-blue-100 text-blue-500 mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn't find any shelters or food resources within 10km of this location. 
            Please try a different address or expand your search area.
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationFinder;