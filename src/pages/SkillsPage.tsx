import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '../utils/ThemeContext';

const API_BASE_URL = 'https://flasktest-m5jd.onrender.com';

// Define a type for the API response
interface JobPlanResponse {
  plan?: string;
  recommendations?: string[];
  suggested_careers?: string[];
  entry_level_jobs?: string[];
  skills_to_focus?: string[];
  certifications_needed?: string[];
  growth_path?: string;
  response?: string;
  [key: string]: unknown;
}

// Define types for form data
interface FormData {
  education_level: string;
  age: string;
  skills: string[];
  tech_comfort: string;
  career_interests: string[];
  career_motivation: string;
  training_time: string;
  physical_limitations: string;
  career_goal: string;
  dream_career: string;
}

const SkillsPage: React.FC = () => {
  const { darkMode } = useTheme();
  
  const initialFormData: FormData = {
    education_level: '',
    age: '',
    skills: [],
    tech_comfort: '',
    career_interests: [],
    career_motivation: '',
    training_time: '',
    physical_limitations: '',
    career_goal: '',
    dream_career: ''
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<JobPlanResponse | null>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, category: 'skills' | 'career_interests') => {
    const { value, checked } = e.target;
    
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          [category]: [...prev[category], value]
        };
      } else {
        return {
          ...prev,
          [category]: prev[category].filter(item => item !== value)
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    setError('');
    
    // Format data for API according to the specified format
    const apiData = {
      survey_data: {
        personal_info: {
          education_level: formData.education_level,
          age: formData.age
        },
        skills_assessment: {
          skills: formData.skills,
          tech_comfort: formData.tech_comfort
        },
        career_preferences: {
          career_interests: formData.career_interests,
          career_motivation: formData.career_motivation,
          training_time: formData.training_time,
          physical_limitations: formData.physical_limitations
        },
        goals: {
          career_goal: formData.career_goal,
          dream_career: formData.dream_career || 'No additional notes'
        }
      }
    };
    
    console.log('Submitting data to API:', apiData);
    
    try {
      // Wait for 5 seconds to simulate AI processing
      setTimeout(async () => {
        try {
          const response = await axios.post(`${API_BASE_URL}/career_help`, apiData);
          console.log('API response:', response.data);
          setResults(response.data as JobPlanResponse);
          setLoading(false);
        } catch (err) {
          console.error('Error from server:', err);
          setError('There was an error processing your request. Please try again later.');
          setLoading(false);
        }
      }, 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('There was an error submitting your assessment. Please try again.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`container mx-auto px-4 py-8 ${darkMode ? 'text-dark-text' : 'text-gray-800'}`}>
        <div className={`${darkMode ? 'bg-dark-200 border-dark-accent2' : 'bg-green-50 border-green-500'} border-l-4 p-6 rounded-lg mb-8`}>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-dark-accent2' : 'text-green-700'} mb-4`}>Thank You!</h2>
          <p className={`text-lg ${darkMode ? 'text-dark-textSecondary' : 'text-gray-700'} mb-4`}>
            Your career assessment has been submitted successfully.
          </p>
        </div>
        
        {loading && (
          <div className="mt-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className={`w-16 h-16 border-4 ${darkMode ? 'border-dark-accent1 border-t-dark-300' : 'border-blue-500 border-t-transparent'} rounded-full animate-spin mb-4`}></div>
              <p className={`text-lg font-medium ${darkMode ? 'text-dark-accent1' : 'text-blue-600'}`}>
                Building your personalized career roadmap...
              </p>
              <p className={`text-sm ${darkMode ? 'text-dark-textSecondary' : 'text-gray-500'} mt-2`}>This may take a few moments</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className={`mt-8 ${darkMode ? 'bg-dark-200 border-dark-accent3' : 'bg-red-50 border-red-500'} border-l-4 p-4 rounded`}>
            <p className={darkMode ? 'text-dark-accent3' : 'text-red-700'}>{error}</p>
            <button 
              onClick={() => {setSubmitted(false); setError('');}}
              className={`mt-4 ${darkMode ? 'text-dark-accent1' : 'text-blue-600'} underline`}
            >
              Try again
            </button>
          </div>
        )}
        
        {!loading && results && (
          <div className={`mt-8 ${darkMode ? 'bg-dark-200 border border-dark-50' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-dark-accent1' : 'text-blue-600'} mb-4`}>Your Career Roadmap</h3>
            
            {results.response && (
              <div className={`prose ${darkMode ? 'prose-invert' : 'prose-blue'} max-w-none mb-6`}>
                <div dangerouslySetInnerHTML={{ __html: results.response.toString().replace(/\n/g, '<br/>') }} />
              </div>
            )}
            
            {results.plan && !results.response && (
              <div className={`prose ${darkMode ? 'prose-invert' : 'prose-blue'} max-w-none mb-6`}>
                <div dangerouslySetInnerHTML={{ __html: results.plan.toString().replace(/\n/g, '<br/>') }} />
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {results.suggested_careers && (
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-dark-300' : 'bg-blue-50'}`}>
                  <h4 className={`font-bold ${darkMode ? 'text-dark-accent1' : 'text-blue-700'} mb-2`}>Suggested Careers</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {Array.isArray(results.suggested_careers) ? 
                      results.suggested_careers.map((career, index) => (
                        <li key={index}>{career}</li>
                      )) : 
                      <li>{results.suggested_careers}</li>
                    }
                  </ul>
                </div>
              )}
              
              {results.entry_level_jobs && (
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-dark-300' : 'bg-green-50'}`}>
                  <h4 className={`font-bold ${darkMode ? 'text-dark-accent2' : 'text-green-700'} mb-2`}>Entry-Level Job Ideas</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {Array.isArray(results.entry_level_jobs) ? 
                      results.entry_level_jobs.map((job, index) => (
                        <li key={index}>{job}</li>
                      )) : 
                      <li>{results.entry_level_jobs}</li>
                    }
                  </ul>
                </div>
              )}
              
              {results.skills_to_focus && (
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-dark-300' : 'bg-purple-50'}`}>
                  <h4 className={`font-bold ${darkMode ? 'text-dark-accent1' : 'text-purple-700'} mb-2`}>Skills to Focus On</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {Array.isArray(results.skills_to_focus) ? 
                      results.skills_to_focus.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      )) : 
                      <li>{results.skills_to_focus}</li>
                    }
                  </ul>
                </div>
              )}
              
              {results.certifications_needed && (
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-dark-300' : 'bg-yellow-50'}`}>
                  <h4 className={`font-bold ${darkMode ? 'text-dark-accent3' : 'text-yellow-700'} mb-2`}>Certifications/Training Needed</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {Array.isArray(results.certifications_needed) ? 
                      results.certifications_needed.map((cert, index) => (
                        <li key={index}>{cert}</li>
                      )) : 
                      <li>{results.certifications_needed}</li>
                    }
                  </ul>
                </div>
              )}
            </div>
            
            {results.growth_path && (
              <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-dark-300 border border-dark-accent1' : 'bg-indigo-50 border border-indigo-100'}`}>
                <h4 className={`font-bold ${darkMode ? 'text-dark-accent2' : 'text-indigo-700'} mb-2`}>Expected Growth Path</h4>
                <div className={darkMode ? 'text-dark-textSecondary' : 'text-gray-700'}>
                  {results.growth_path}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 max-w-3xl ${darkMode ? 'text-dark-text' : ''}`}>
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-dark-accent1' : 'text-blue-600'} mb-4`}>Help Us Build Your Career Roadmap</h1>
      <p className={`text-lg ${darkMode ? 'text-dark-textSecondary' : 'text-gray-600'} mb-8`}>
        Please answer the following questions to help us create a personalized career plan for you.
      </p>
      
      <div className={`${darkMode ? 'bg-dark-200 border border-dark-50' : 'bg-white'} p-6 rounded-lg shadow-md mb-8`}>
        <form onSubmit={handleSubmit}>
          {/* Section 1: Basic Information */}
          <div className={`mb-8 pb-6 border-b ${darkMode ? 'border-dark-50' : 'border-gray-200'}`}>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-dark-accent2' : 'text-blue-700'} mb-6`}>Section 1: Basic Information</h2>
            
            {/* Question 1: Education Level */}
            <div className="mb-6">
              <label htmlFor="education_level" className={`block text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-700'} mb-3`}>
                1. What is your highest completed level of education?
              </label>
              <select
                id="education_level"
                name="education_level"
                value={formData.education_level}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-md shadow-sm focus:ring-1 ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-50 text-dark-text focus:border-dark-accent1 focus:ring-dark-accent1' 
                    : 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
              >
                <option value="" disabled>Select your education level</option>
                <option value="No schooling">No schooling</option>
                <option value="High school diploma / GED">High school diploma / GED</option>
                <option value="Trade/Vocational certificate">Trade/Vocational certificate</option>
                <option value="Associate's degree">Associate's degree</option>
                <option value="Bachelor's degree">Bachelor's degree</option>
                <option value="Master's degree or higher">Master's degree or higher</option>
              </select>
            </div>

            {/* Question 2: Age Group */}
            <div className="mb-6">
              <label htmlFor="age" className={`block text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-700'} mb-3`}>
                2. How old are you?
              </label>
              <select
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-md shadow-sm focus:ring-1 ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-50 text-dark-text focus:border-dark-accent1 focus:ring-dark-accent1' 
                    : 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
              >
                <option value="" disabled>Select your age range</option>
                <option value="Under 18">Under 18</option>
                <option value="18–24">18–24</option>
                <option value="25–34">25–34</option>
                <option value="35–44">35–44</option>
                <option value="45–54">45–54</option>
                <option value="55+">55+</option>
              </select>
            </div>
          </div>

          {/* Section 2: Skills and Comfort */}
          <div className={`mb-8 pb-6 border-b ${darkMode ? 'border-dark-50' : 'border-gray-200'}`}>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-dark-accent2' : 'text-blue-700'} mb-6`}>Section 2: Skills and Comfort</h2>
            
            {/* Question 3: Skills */}
            <div className="mb-6">
              <span className={`block text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-700'} mb-3`}>
                3. Which skills describe you well?
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Communication', 
                  'Problem solving', 
                  'Technical/Computer use', 
                  'Leadership/Management',
                  'Teaching/Coaching', 
                  'Manual/Physical work', 
                  'Artistic/Creative work', 
                  'Organizing/Planning'
                ].map((skill) => (
                  <div key={skill} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`skill-${skill}`}
                      name={`skill-${skill}`}
                      value={skill}
                      checked={formData.skills.includes(skill)}
                      onChange={(e) => handleCheckboxChange(e, 'skills')}
                      className={`h-4 w-4 ${
                        darkMode 
                          ? 'text-dark-accent1 bg-dark-300 border-dark-50' 
                          : 'text-blue-600 border-gray-300'
                      } rounded focus:ring-offset-0 focus:ring-1 focus:ring-opacity-25 ${
                        darkMode ? 'focus:ring-dark-accent1' : 'focus:ring-blue-500'
                      }`}
                    />
                    <label htmlFor={`skill-${skill}`} className={`ml-2 block ${darkMode ? 'text-dark-textSecondary' : 'text-gray-700'}`}>
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Question 4: Tech Comfort */}
            <div className="mb-6">
              <label htmlFor="tech_comfort" className={`block text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-700'} mb-3`}>
                4. Are you comfortable with technology (computers, smartphones, tools)?
              </label>
              <select
                id="tech_comfort"
                name="tech_comfort"
                value={formData.tech_comfort}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-md shadow-sm focus:ring-1 ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-50 text-dark-text focus:border-dark-accent1 focus:ring-dark-accent1' 
                    : 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
              >
                <option value="" disabled>Select your comfort level</option>
                <option value="Yes">Yes</option>
                <option value="Somewhat">Somewhat</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Section 3: Career Interests */}
          <div className={`mb-8 pb-6 border-b ${darkMode ? 'border-dark-50' : 'border-gray-200'}`}>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-dark-accent2' : 'text-blue-700'} mb-6`}>Section 3: Career Interests</h2>
            
            {/* Question 5: Career Interests */}
            <div className="mb-6">
              <span className={`block text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-700'} mb-3`}>
                5. Which career areas sound interesting to you?
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Healthcare',
                  'Business/Finance',
                  'Technology/IT',
                  'Construction/Skilled trades',
                  'Arts/Media',
                  'Education/Teaching',
                  'Retail/Sales',
                  'Transportation/Logistics',
                  'Food service/Hospitality',
                  'Public service (law, security, government)'
                ].map((career) => (
                  <div key={career} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`career-${career}`}
                      name={`career-${career}`}
                      value={career}
                      checked={formData.career_interests.includes(career)}
                      onChange={(e) => handleCheckboxChange(e, 'career_interests')}
                      className={`h-4 w-4 ${
                        darkMode 
                          ? 'text-dark-accent1 bg-dark-300 border-dark-50' 
                          : 'text-blue-600 border-gray-300'
                      } rounded focus:ring-offset-0 focus:ring-1 focus:ring-opacity-25 ${
                        darkMode ? 'focus:ring-dark-accent1' : 'focus:ring-blue-500'
                      }`}
                    />
                    <label htmlFor={`career-${career}`} className={`ml-2 block ${darkMode ? 'text-dark-textSecondary' : 'text-gray-700'}`}>
                      {career}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Question 6: Career Motivation */}
            <div className="mb-6">
              <label htmlFor="career_motivation" className={`block text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-700'} mb-3`}>
                6. What motivates you the most in a career?
              </label>
              <select
                id="career_motivation"
                name="career_motivation"
                value={formData.career_motivation}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-md shadow-sm focus:ring-1 ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-50 text-dark-text focus:border-dark-accent1 focus:ring-dark-accent1' 
                    : 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
              >
                <option value="" disabled>Select your motivation</option>
                <option value="High salary">High salary</option>
                <option value="Job security">Job security</option>
                <option value="Helping people">Helping people</option>
                <option value="Creative freedom">Creative freedom</option>
                <option value="Growth and promotions">Growth and promotions</option>
                <option value="Flexibility (remote work, flexible hours)">Flexibility (remote work, flexible hours)</option>
              </select>
            </div>

            {/* Question 7: Training Time */}
            <div className="mb-6">
              <label htmlFor="training_time" className={`block text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-700'} mb-3`}>
                7. How much time are you willing to invest in training or certifications?
              </label>
              <select
                id="training_time"
                name="training_time"
                value={formData.training_time}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-md shadow-sm focus:ring-1 ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-50 text-dark-text focus:border-dark-accent1 focus:ring-dark-accent1' 
                    : 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
              >
                <option value="" disabled>Select time commitment</option>
                <option value="Less than 3 months">Less than 3 months</option>
                <option value="3–6 months">3–6 months</option>
                <option value="6 months to 1 year">6 months to 1 year</option>
                <option value="1+ years (degree or formal program)">1+ years (degree or formal program)</option>
                <option value="No training (want immediate job)">No training (want immediate job)</option>
              </select>
            </div>

            {/* Question 8: Physical Limitations */}
            <div className="mb-6">
              <label htmlFor="physical_limitations" className={`block text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-700'} mb-3`}>
                8. Do you have any physical or health restrictions that could limit certain jobs?
              </label>
              <select
                id="physical_limitations"
                name="physical_limitations"
                value={formData.physical_limitations}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-md shadow-sm focus:ring-1 ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-50 text-dark-text focus:border-dark-accent1 focus:ring-dark-accent1' 
                    : 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
              >
                <option value="" disabled>Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Section 4: Career Goal */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-dark-accent2' : 'text-blue-700'} mb-6`}>Section 4: Career Goal</h2>
            
            {/* Question 9: Career Goal */}
            <div className="mb-6">
              <label htmlFor="career_goal" className={`block text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-700'} mb-3`}>
                9. What is your primary career goal right now?
              </label>
              <select
                id="career_goal"
                name="career_goal"
                value={formData.career_goal}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-md shadow-sm focus:ring-1 ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-50 text-dark-text focus:border-dark-accent1 focus:ring-dark-accent1' 
                    : 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
              >
                <option value="" disabled>Select your primary goal</option>
                <option value="Find an entry-level job quickly">Find an entry-level job quickly</option>
                <option value="Build a long-term career (even if it takes time)">Build a long-term career (even if it takes time)</option>
                <option value="Change my current career path">Change my current career path</option>
                <option value="Start my own business someday">Start my own business someday</option>
              </select>
            </div>

            {/* Question 10: Dream Career */}
            <div className="mb-8">
              <label htmlFor="dream_career" className={`block text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-700'} mb-3`}>
                10. Optional: Write a few words about your dream career or ideal future.
              </label>
              <textarea
                id="dream_career"
                name="dream_career"
                value={formData.dream_career}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-2 rounded-md shadow-sm focus:ring-1 ${
                  darkMode 
                    ? 'bg-dark-300 border-dark-50 text-dark-text focus:border-dark-accent1 focus:ring-dark-accent1' 
                    : 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`px-6 py-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 transform hover:scale-105 ${
                darkMode 
                  ? 'bg-dark-accent1 hover:bg-dark-accent1/80 focus:ring-dark-accent1 shadow-colored-glow' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              Submit and Build My Career Roadmap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillsPage;