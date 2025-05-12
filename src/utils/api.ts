import axios from 'axios';

// Use the public Flask server URL
const API_BASE_URL = 'https://flasktest-m5jd.onrender.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler
const handleApiError = (error: unknown) => {
  // Check if it's an axios error (avoiding the isAxiosError method which causes linter issues)
  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosError = error as {
      response?: { 
        data: Record<string, unknown>;
        status: number;
        headers: Record<string, string>;
      };
      request?: object;
      message?: string;
    };
    
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', axiosError.response.data);
      return Promise.reject(axiosError.response.data);
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error('API Error Request:', axiosError.request);
      return Promise.reject({
        message: 'No response received from server. Is the Flask server running?',
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error Setup:', axiosError.message);
      return Promise.reject({
        message: 'An error occurred while setting up the request',
      });
    }
  } else {
    // Handle non-Axios errors
    console.error('Unexpected error:', error);
    return Promise.reject({
      message: 'An unexpected error occurred',
    });
  }
};

// API endpoints
export const authApi = {
  // User login/signup
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  signup: async (email: string, password: string, name: string) => {
    try {
      const response = await api.post('/signup', { email, password, name });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

// Shelter interface
export interface Shelter {
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
}

// Updated response interface to match Google Places-like API response
export interface PlaceResult {
  name: string;
  formatted_address?: string;
  rating?: number;
  vicinity?: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    }
  };
}

export interface ShelterResponse {
  html_attributions: string[];
  results: PlaceResult[];
  status: string;
}

// Find shelters payload interface
export interface FindSheltersPayload {
  latitude: number;
  longitude: number;
  user_id?: string;
}

export const resourceApi = {
  // Find nearby shelters
  findShelters: async (location: string, userId: string, latitude?: number, longitude?: number) => {
    try {
      const payload = {
        location,
        user_id: userId,
        ...(latitude !== undefined && longitude !== undefined && { latitude, longitude })
      };
      
      const response = await api.post('/find_shelters', payload);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Find nearby shelters by coordinates (using fetch API)
  findNearbyShelters: async (payload: FindSheltersPayload): Promise<Shelter[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/find_shelters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: ShelterResponse = await response.json();
      
      if (data.status !== 'OK') {
        throw new Error('Failed to find shelters');
      }
      
      // Convert Google Places format to our Shelter format
      return data.results.map((result): Shelter => ({
        id: result.name.toLowerCase().replace(/\s+/g, '-'),
        name: result.name,
        address: result.formatted_address || result.vicinity || '',
        phone: '',  // Phone not available in this response
        distance: '',  // Distance not available in this response
        rating: result.rating,
        location: result.geometry?.location
      }));
    } catch (error) {
      console.error('Failed to fetch shelters:', error);
      throw error;
    }
  },
  
  // Search for any place
  searchPlace: async (query: string, userId: string) => {
    try {
      const response = await api.post('/search_place', { query, user_id: userId });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export const assistanceApi = {
  // Medical assistance
  getMedicalAssistance: async (question: string, userId: string) => {
    try {
      const response = await api.post('/medical_assistance', { question, user_id: userId });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Career help
  getCareerHelp: async (question: string, skills: string[], interests: string[], userId: string) => {
    try {
      const response = await api.post('/career_help', { 
        question, 
        skills, 
        interests,
        user_id: userId 
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export const userApi = {
  // Get user history
  getUserHistory: async (userId: string) => {
    try {
      const response = await api.get(`/user_history?user_id=${userId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export default api; 