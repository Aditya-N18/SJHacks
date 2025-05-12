import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ResourcesPage from './pages/ResourcesPage';
import SkillsPage from './pages/SkillsPage';
import JobsPage from './pages/JobsPage';
import { default as DashboardPage } from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import AwarenessBulletin from './pages/AwarenessBulletin';
import { ThemeProvider } from './utils/ThemeContext';
import './index.css';

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userId = localStorage.getItem('user_id');
  
  if (!userId) {
    // Redirect to home if not authenticated
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Home Route with Navbar */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="awareness" element={<AwarenessBulletin />} />
          </Route>

          {/* Redirect all other routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;