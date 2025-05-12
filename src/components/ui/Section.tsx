import React from 'react';
import { cn } from '../../utils/cn';
import { componentStyles } from '../../utils/designSystem';
import { useTheme } from '../../utils/ThemeContext';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  divider?: boolean;
}

/**
 * Section component for creating consistent content sections
 * throughout the application. Uses the design system for styling.
 */
const Section: React.FC<SectionProps> = ({
  children,
  title,
  description,
  className = '',
  contentClassName = '',
  divider = false,
}) => {
  const { darkMode } = useTheme();
  
  return (
    <section 
      className={cn(
        darkMode ? componentStyles.section.dark : componentStyles.section.light,
        'my-6',
        className
      )}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h2 className={`text-xl font-semibold mb-1 ${
              darkMode ? 'text-dark-text' : 'text-gray-900'
            }`}>
              {title}
            </h2>
          )}
          
          {description && (
            <p className={`text-sm ${
              darkMode ? 'text-dark-textSecondary' : 'text-gray-600'
            }`}>
              {description}
            </p>
          )}
          
          {divider && (
            <div className={`mt-3 border-b ${
              darkMode ? 'border-dark-50' : 'border-gray-200'
            }`} />
          )}
        </div>
      )}
      
      <div className={cn('', contentClassName)}>
        {children}
      </div>
    </section>
  );
};

export default Section; 