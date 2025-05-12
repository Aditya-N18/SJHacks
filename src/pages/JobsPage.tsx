import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '../utils/ThemeContext';

const API_BASE_URL = 'https://flasktest-m5jd.onrender.com';

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  url?: string;
  posted_date?: string;
  job_type?: string;
  skills?: string[];
  requirements?: string[];
  benefits?: string[];
  [key: string]: unknown;
}

const JobsPage: React.FC = () => {
  const { darkMode } = useTheme();
  const [jobRole, setJobRole] = useState('');
  const [location, setLocation] = useState('San Jose');
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  
  // Get current jobs for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Function to handle form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobRole.trim()) {
      setError('Please enter a job role or title');
      return;
    }

    setLoading(true);
    setError('');
    setJobs([]);
    setCurrentPage(1);
    
    try {
      console.log(`Searching for '${jobRole}'`);
      
      // Send POST request to Flask backend with only the job title
      const response = await axios.post(`${API_BASE_URL}/search_jobs`, {
        keyword: jobRole.trim()
      });
      
      console.log('Job search response:', response.data);
      
      // Handle different response formats
      let jobListings: JobListing[] = [];
      
      if (Array.isArray(response.data)) {
        // Response is already an array of job listings
        jobListings = response.data.map((item: Record<string, unknown>) => {
          return {
            id: (item.id as string) || '',
            title: (item.name as string) || (item.job_title as string) || (item.position as string) || jobRole,
            company: (item.position_description as string) || 'Position not specified',
            location: (item.address as string) || (item.location as string) || '',
            description: (item.description as string) || (item.job_description as string) || '',
            requirements: (item.requirements as string[]) || []
          };
        });
        console.log(`Received ${jobListings.length} jobs as array:`, jobListings);
      } else if (
        response.data && 
        typeof response.data === 'object' && 
        'jobs' in response.data && 
        Array.isArray((response.data as { jobs: JobListing[] }).jobs)
      ) {
        // Response has a 'jobs' property that is an array
        jobListings = (response.data as { jobs: JobListing[] }).jobs;
        console.log(`Received ${jobListings.length} jobs from 'jobs' property:`, jobListings);
      } else if (
        response.data && 
        typeof response.data === 'object' && 
        'response' in response.data && 
        typeof (response.data as { response: string }).response === 'string'
      ) {
        // Response has a 'response' property that is a string
        try {
          const textResponse = (response.data as { response: string }).response;
          console.log('Received text response:', textResponse);
          
          // Try to parse the text as JSON if it's in JSON format
          try {
            const parsedData = JSON.parse(textResponse);
            console.log('Successfully parsed response text as JSON:', parsedData);
            
            if (Array.isArray(parsedData)) {
              jobListings = parsedData;
            } else if (parsedData && typeof parsedData === 'object') {
              // Create a job listing from the parsed object
              jobListings = [{
                id: '1',
                title: parsedData.title || parsedData.job_title || parsedData.position || jobRole,
                company: parsedData.company || parsedData.employer || parsedData.organization || 'Company',
                location: parsedData.location || parsedData.address || parsedData.city || location,
                description: parsedData.description || parsedData.job_description || parsedData.details || textResponse,
                requirements: Array.isArray(parsedData.requirements) ? parsedData.requirements : 
                              parsedData.requirements ? [parsedData.requirements] : []
              }];
            }
          } catch {
            console.log('Response is not JSON, using as plain text');
            // Create a single job listing from the text response
            jobListings = [{
              id: '1',
              title: jobRole,
              company: 'Various Companies',
              location: location,
              description: textResponse,
              requirements: []
            }];
          }
        } catch (err) {
          console.error('Error handling text response:', err);
        }
      } else if (
        response.data && 
        typeof response.data === 'object' && 
        'response' in response.data && 
        typeof (response.data as { response: unknown }).response === 'object'
      ) {
        // Response has a 'response' property that is an object
        try {
          const responseObj = (response.data as { response: unknown }).response;
          console.log('Received response object:', responseObj);
          
          if (Array.isArray(responseObj)) {
            jobListings = responseObj.map((item: Record<string, unknown>) => {
              // Create proper job listing objects from each item
              return {
                id: (item.id as string) || '',
                title: (item.name as string) || (item.job_title as string) || (item.position as string) || jobRole,
                company: (item.position_description as string) || 'Position not specified',
                location: (item.address as string) || (item.location as string) || '',
                description: (item.description as string) || (item.job_description as string) || '',
                requirements: (item.requirements as string[]) || []
              };
            });
          } else {
            // If it's a single object, convert to array
            const singleJob = responseObj as Record<string, unknown>;
            jobListings = [{
              id: '1',
              title: singleJob.title as string || singleJob.job_title as string || singleJob.position as string || jobRole,
              company: singleJob.company as string || singleJob.employer as string || singleJob.organization as string || 'Company',
              location: singleJob.location as string || singleJob.address as string || singleJob.city as string || location,
              description: singleJob.description as string || singleJob.job_description as string || singleJob.details as string || JSON.stringify(singleJob),
              requirements: Array.isArray(singleJob.requirements) ? singleJob.requirements as string[] : 
                          singleJob.requirements ? [singleJob.requirements as string] : []
            }];
          }
        } catch (err) {
          console.error('Error parsing response object:', err);
        }
      } else {
        // Fallback for unrecognized format
        console.log('Unrecognized response format, using raw response data:', response.data);
        try {
          if (typeof response.data === 'string') {
            // Try to parse the string as JSON
            try {
              const parsedData = JSON.parse(response.data);
              console.log('Successfully parsed response data as JSON:', parsedData);
              
              if (Array.isArray(parsedData)) {
                jobListings = parsedData;
              } else {
                // Create a single job listing from the parsed object
                const singleJob = parsedData as Record<string, unknown>;
                jobListings = [{
                  id: '1',
                  title: singleJob.title as string || singleJob.job_title as string || singleJob.position as string || jobRole,
                  company: singleJob.company as string || singleJob.employer as string || singleJob.organization as string || 'Job Results',
                  location: singleJob.location as string || singleJob.address as string || singleJob.city as string || location,
                  description: singleJob.description as string || singleJob.job_description as string || singleJob.details as string || JSON.stringify(singleJob),
                  requirements: Array.isArray(singleJob.requirements) ? singleJob.requirements as string[] : 
                              singleJob.requirements ? [singleJob.requirements as string] : []
                }];
              }
            } catch {
              console.log('Response string is not JSON, using as plain text');
              // Plain text response
              jobListings = [{
                id: '1',
                title: jobRole,
                company: 'Job Search Results',
                location: location,
                description: response.data,
                requirements: []
              }];
            }
          } else if (response.data && typeof response.data === 'object') {
            // Direct object response
            const directData = response.data as Record<string, unknown>;
            
            // Check if the object itself is a job
            if (directData.title || directData.company || directData.description) {
              jobListings = [{
                id: '1',
                title: directData.title as string || directData.job_title as string || directData.position as string || jobRole,
                company: directData.company as string || directData.employer as string || directData.organization as string || 'Company',
                location: directData.location as string || directData.address as string || directData.city as string || location,
                description: directData.description as string || directData.job_description as string || directData.details as string || JSON.stringify(directData),
                requirements: Array.isArray(directData.requirements) ? directData.requirements as string[] : 
                            directData.requirements ? [directData.requirements as string] : []
              }];
            } else {
              // Unknown object format, create a basic representation
              jobListings = [{
                id: '1',
                title: `Results for "${jobRole}"`,
                company: 'Job Search Results',
                location: location,
                description: JSON.stringify(directData, null, 2),
                requirements: []
              }];
            }
          }
        } catch (err) {
          console.error('Error handling unknown response format:', err);
          setError('Received data in an unexpected format');
        }
      }
      
      if (jobListings.length === 0) {
        console.log('No jobs found in response');
      } else {
        console.log('Final job listings to display:', jobListings);
      }
      
      // Ensure all jobs have the required fields
      jobListings = jobListings.map(job => {
        // Check for address field in various formats
        let address = job.location || '';
        if (!address && job.address) {
          address = typeof job.address === 'string' ? job.address : JSON.stringify(job.address);
        }

        console.log('Processing job:', job);
        
        return {
          ...job,
          id: job.id || Math.random().toString(36).substring(2, 9),
          title: job.title || 'Untitled Position',
          company: job.company || 'Position not specified',
          location: address || 'Location not specified',
          description: job.description || 'No description provided',
          requirements: Array.isArray(job.requirements) ? job.requirements : 
                       job.requirements ? [String(job.requirements)] : []
        };
      });
      
      setJobs(jobListings);
      setSearched(true);
    } catch (err) {
      console.error('Error searching jobs:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to search for jobs';
      setError(`Error: ${errorMessage}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Generate pagination numbers
  const renderPaginationNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(
      <button
        key={1}
        onClick={() => paginate(1)}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1 
            ? (darkMode ? 'bg-dark-accent1 text-white' : 'bg-blue-600 text-white') 
            : (darkMode ? 'bg-dark-300 text-dark-text hover:bg-dark-200' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
        }`}
      >
        1
      </button>
    );
    
    // If many pages, add ellipsis after first page
    if (currentPage > 3) {
      pageNumbers.push(
        <span key="ellipsis1" className="px-2">...</span>
      );
    }
    
    // Pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`px-3 py-1 rounded-md ${
              currentPage === i 
                ? (darkMode ? 'bg-dark-accent1 text-white' : 'bg-blue-600 text-white') 
                : (darkMode ? 'bg-dark-300 text-dark-text hover:bg-dark-200' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
            }`}
          >
            {i}
          </button>
        );
      }
    }
    
    // If many pages, add ellipsis before last page
    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span key="ellipsis2" className="px-2">...</span>
      );
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => paginate(totalPages)}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages 
              ? (darkMode ? 'bg-dark-accent1 text-white' : 'bg-blue-600 text-white') 
              : (darkMode ? 'bg-dark-300 text-dark-text hover:bg-dark-200' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
          }`}
        >
          {totalPages}
        </button>
      );
    }
    
    return pageNumbers;
  };

  return (
    <div className={`container mx-auto px-4 py-8 mt-16 ${darkMode ? 'text-dark-text' : 'text-gray-800'}`}>
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-dark-accent1' : 'text-blue-600'} mb-4`}>Find Jobs</h1>
      <p className={`text-lg ${darkMode ? 'text-dark-textSecondary' : 'text-gray-600'} mb-8`}>
        Search for job opportunities that match your skills and interests
      </p>
      
      {/* Search Form */}
      <div className={`${
        darkMode 
          ? 'bg-dark-200/60 backdrop-blur-md border border-dark-50/50 shadow-xl' 
          : 'bg-white/70 backdrop-blur-md border border-gray-200/50 shadow-lg'
      } p-6 rounded-xl mb-8 transition-all duration-300`}>
        <form onSubmit={handleSearch} className="space-y-4 md:space-y-0 md:flex md:gap-4 items-end">
          {/* Job Role Input */}
          <div className="flex-1">
            <label htmlFor="jobRole" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-dark-text' : 'text-gray-700'}`}>
              Job Role / Title
            </label>
            <input
              type="text"
              id="jobRole"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="Enter job title, role, or keyword"
              className={`w-full px-4 py-2 rounded-md shadow-sm focus:ring-2 ${
                darkMode 
                  ? 'bg-dark-300/70 backdrop-blur-sm border-dark-50/50 text-dark-text focus:border-dark-accent1 focus:ring-dark-accent1/50' 
                  : 'bg-white/80 backdrop-blur-sm border border-gray-300/50 focus:border-blue-500 focus:ring-blue-500/50'
              }`}
              required
            />
          </div>
          
          {/* Location Input */}
          <div className="md:w-1/3">
            <label htmlFor="location" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-dark-text' : 'text-gray-700'}`}>
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, state, or remote"
              className={`w-full px-4 py-2 rounded-md shadow-sm focus:ring-2 ${
                darkMode 
                  ? 'bg-dark-300/70 backdrop-blur-sm border-dark-50/50 text-dark-text focus:border-dark-accent1 focus:ring-dark-accent1/50' 
                  : 'bg-white/80 backdrop-blur-sm border border-gray-300/50 focus:border-blue-500 focus:ring-blue-500/50'
              }`}
            />
          </div>
          
          {/* Search Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto px-6 py-2 rounded-md font-medium text-white ${
                loading 
                  ? 'bg-gray-400/80 backdrop-blur-sm cursor-not-allowed' 
                  : darkMode
                    ? 'bg-dark-accent1/90 backdrop-blur-sm hover:bg-dark-accent1 shadow-colored-glow' 
                    : 'bg-blue-600/90 backdrop-blur-sm hover:bg-blue-700 shadow-md hover:shadow-lg'
              } transition-all duration-300`}
            >
              {loading ? 'Searching...' : 'Search Jobs'}
            </button>
          </div>
        </form>
        
        {error && (
          <div className={`mt-4 p-3 rounded-md ${darkMode ? 'bg-red-900/30 backdrop-blur-sm text-red-200' : 'bg-red-50/80 backdrop-blur-sm text-red-700'}`}>
            {error}
          </div>
        )}
      </div>
      
      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Search Results */}
      {searched && !loading && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-dark-accent2' : 'text-blue-700'}`}>
              {jobs.length > 0 
                ? `Found ${jobs.length} job${jobs.length === 1 ? '' : 's'} for "${jobRole}" in ${location}` 
                : `No jobs found for "${jobRole}" in ${location}`
              }
            </h2>
            
            {jobs.length > 0 && (
              <div className={`text-sm ${darkMode ? 'text-dark-textSecondary' : 'text-gray-500'}`}>
                Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, jobs.length)} of {jobs.length}
              </div>
            )}
          </div>
          
          {jobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className={`${
                      darkMode 
                        ? 'bg-dark-300/60 backdrop-blur-md border border-dark-50/50 hover:border-dark-accent1/70' 
                        : 'bg-white/70 backdrop-blur-md border border-gray-200/50 hover:border-blue-300/70'
                    } rounded-xl shadow-lg hover:shadow-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:scale-[1.01]`}
                  >
                    {/* Job Title - Now using the name field from server */}
                    <div className={`p-4 ${
                      darkMode 
                        ? 'border-b border-dark-50/50 bg-dark-200/50 backdrop-blur-sm' 
                        : 'border-b border-gray-100/50 bg-blue-50/70 backdrop-blur-sm'
                    }`}>
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-dark-accent1' : 'text-blue-700'}`}>
                        {job.title}
                      </h3>
                    </div>
                    
                    {/* Job Card Body */}
                    <div className="p-4 flex-grow">
                      {/* Position Description - Now showing instead of company */}
                      <p className={`${darkMode ? 'text-dark-textSecondary' : 'text-gray-700'} font-medium mb-3`}>
                        <span className={`${darkMode ? 'text-dark-text' : 'text-gray-800'} font-medium`}>Position:</span> {job.company}
                      </p>
                      
                      {/* Location/Address */}
                      <p className={`text-sm ${darkMode ? 'text-dark-textSecondary' : 'text-gray-600'} mb-4`}>
                        <span className={`${darkMode ? 'text-dark-text' : 'text-gray-800'} font-medium`}>Address:</span> {job.location}
                      </p>
                      
                      {/* Requirements */}
                      {job.requirements && job.requirements.length > 0 && (
                        <div>
                          <p className={`font-medium mb-1 ${darkMode ? 'text-dark-text' : 'text-gray-800'}`}>Requirements:</p>
                          <ul className={`list-disc pl-5 text-sm space-y-1 ${darkMode ? 'text-dark-textSecondary' : 'text-gray-600'}`}>
                            {job.requirements.map((req, idx) => (
                              <li key={idx}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === 1 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : darkMode 
                          ? 'bg-dark-300 text-dark-text hover:bg-dark-200' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    &laquo;
                  </button>
                  
                  {renderPaginationNumbers()}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : darkMode 
                          ? 'bg-dark-300 text-dark-text hover:bg-dark-200' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    &raquo;
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={`p-8 text-center ${darkMode ? 'bg-dark-200' : 'bg-gray-50'} rounded-lg border ${darkMode ? 'border-dark-50' : 'border-gray-200'}`}>
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className={`text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-gray-900'} mb-2`}>No jobs found</h3>
              <p className={`${darkMode ? 'text-dark-textSecondary' : 'text-gray-500'} mb-4`}>
                Try broadening your search criteria or exploring different job titles.
              </p>
              <div className={`text-sm ${darkMode ? 'text-dark-accent1' : 'text-blue-600'}`}>
                Suggestions:
                <ul className="mt-2 space-y-1">
                  <li>Use more general keywords</li>
                  <li>Check spelling of keywords</li>
                  <li>Try searching in a different location</li>
                  <li>Explore similar job titles</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
      
      {!searched && !loading && (
        <div className={`text-center py-12 ${darkMode ? 'text-dark-textSecondary' : 'text-gray-500'}`}>
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-lg">Enter a job role to start searching</p>
        </div>
      )}
    </div>
  );
};

export default JobsPage;