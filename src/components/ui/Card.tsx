import React from 'react';
import { cn } from '../../utils/cn';
import { componentStyles } from '../../utils/designSystem';
import { useTheme } from '../../utils/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  interactive?: boolean;
  accent?: 'primary' | 'success' | 'warning' | 'error' | 'accent1' | 'accent2' | 'accent3' | 'none';
  heading?: string;
  description?: string;
  badge?: React.ReactNode;
  footer?: React.ReactNode;
  headerAction?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = false,
  interactive = false,
  accent = 'none',
  heading,
  description,
  badge,
  footer,
  headerAction,
}) => {
  const { darkMode } = useTheme();
  
  const getAccentStyles = () => {
    if (accent === 'none') return '';
    
    const accentMap = {
      primary: darkMode ? 'border-l-4 border-primary-400' : 'border-l-4 border-primary-500',
      success: darkMode ? 'border-l-4 border-success-400' : 'border-l-4 border-success-500',
      warning: darkMode ? 'border-l-4 border-warning-400' : 'border-l-4 border-warning-500',
      error: darkMode ? 'border-l-4 border-error-400' : 'border-l-4 border-error-500',
      accent1: 'border-l-4 border-dark-accent1',
      accent2: 'border-l-4 border-dark-accent2',
      accent3: 'border-l-4 border-dark-accent3',
    };
    
    return accentMap[accent] || '';
  };
  
  const cardStyles = cn(
    darkMode ? componentStyles.card.dark : componentStyles.card.light,
    hoverEffect && 'transition-transform duration-300 hover:scale-[1.02]',
    interactive && 'cursor-pointer',
    getAccentStyles(),
    className
  );
  
  const cardContent = (
    <>
      {(heading || description || badge || headerAction) && (
        <div className="p-4 flex justify-between items-start border-b border-gray-100 dark:border-dark-50">
          <div>
            {heading && (
              <div className="flex items-center gap-2">
                <h3 className={`font-medium ${darkMode ? 'text-dark-text' : 'text-gray-900'}`}>
                  {heading}
                </h3>
                {badge && <div>{badge}</div>}
              </div>
            )}
            {description && (
              <p className={`text-sm mt-1 ${darkMode ? 'text-dark-textSecondary' : 'text-gray-500'}`}>
                {description}
              </p>
            )}
          </div>
          {headerAction && (
            <div>
              {headerAction}
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
      
      {footer && (
        <div className={`p-4 border-t ${darkMode ? 'border-dark-50' : 'border-gray-100'}`}>
          {footer}
        </div>
      )}
    </>
  );
  
  if (interactive) {
    return (
      <button
        className={cn(cardStyles, 'text-left w-full')}
        onClick={onClick}
      >
        {cardContent}
      </button>
    );
  }
  
  return (
    <div className={cardStyles} onClick={onClick}>
      {cardContent}
    </div>
  );
};

export default Card;