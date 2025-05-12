import React from 'react';
import { useTheme } from '../../utils/ThemeContext';
import { patterns } from '../../utils/designSystem';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  hasBackButton?: boolean;
  onBack?: () => void;
  headerAction?: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  description,
  className = '',
  headerClassName = '',
  contentClassName = '',
  hasBackButton = false,
  onBack,
  headerAction,
}) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`w-full animate-fadeIn ${className}`}>
      {(title || description || headerAction) && (
        <header className={`${
          darkMode ? patterns.pageHeader.dark : patterns.pageHeader.light
        } ${headerClassName}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {hasBackButton && (
                <button 
                  onClick={onBack}
                  className={`p-2 rounded-full ${
                    darkMode 
                      ? 'hover:bg-dark-50 text-dark-textSecondary hover:text-dark-text' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  } transition-colors`}
                  aria-label="Go back"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              
              {title && (
                <h1 className={`text-2xl font-semibold ${
                  darkMode ? 'text-dark-text' : 'text-gray-900'
                }`}>
                  {title}
                </h1>
              )}
            </div>
            
            {headerAction && (
              <div className="flex items-center">
                {headerAction}
              </div>
            )}
          </div>
          
          {description && (
            <p className={`mt-2 ${
              darkMode ? 'text-dark-textSecondary' : 'text-gray-600'
            }`}>
              {description}
            </p>
          )}
        </header>
      )}
      
      <main className={`${contentClassName}`}>
        {children}
      </main>
    </div>
  );
};

export default PageContainer; 