import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://flasktest-m5jd.onrender.com';

interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  success: boolean;
  user_id: string;
  message?: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`[Debug] Input changed - Field: ${name}, Length: ${value.length}`);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    console.log('[Debug] Starting form validation');
    console.log('[Debug] Current form data:', {
      username: formData.username,
      passwordLength: formData.password.length,
      confirmPasswordLength: formData.confirmPassword.length
    });

    if (!formData.username.trim()) {
      console.log('[Debug] Validation failed: Username empty');
      setError('Username is required');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      console.log('[Debug] Validation failed: Passwords do not match');
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      console.log('[Debug] Validation failed: Password too short');
      setError('Password must be at least 6 characters long');
      return false;
    }
    console.log('[Debug] Form validation passed');
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Debug] Registration submission started');
    setError('');
    
    if (!validateForm()) {
      console.log('[Debug] Form validation failed, stopping submission');
      return;
    }

    setLoading(true);
    console.log('[Debug] Sending registration request to:', `${API_BASE_URL}/signup`);

    try {
      console.log('[Debug] Request payload:', {
        username: formData.username,
        password: '***' // Password length for debugging
      });

      const response = await axios.post<RegisterResponse>(`${API_BASE_URL}/signup`, {
        email: formData.username,
        name: formData.username,
        password: formData.password,
      });
      
      console.log('[Debug] Registration response:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });

      if (response.data.success) {
        console.log('[Debug] Registration successful');
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('username', formData.username);
        navigate('/dashboard');
      } else {
        console.log('[Debug] Registration failed:', response.data.message);
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.log('[Debug] Registration error details:', err);
      
      const errorResponse = (err as { response?: { data?: { message?: string } } }).response?.data;
      if (errorResponse?.message) {
        setError(errorResponse.message);
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    } finally {
      console.log('[Debug] Registration process completed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to RiseUp AI
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your partner in finding support services
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <Link
              to="/login"
              className="px-6 py-2 text-gray-500 hover:text-gray-700 font-medium"
            >
              Login
            </Link>
            <button
              className="px-6 py-2 border-b-2 border-blue-500 text-blue-600 font-medium"
            >
              Sign Up
            </button>
            </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;