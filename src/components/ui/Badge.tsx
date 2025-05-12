import React from 'react';
import { cn } from '../../utils/cn';
import { patterns } from '../../utils/designSystem';
import { useTheme } from '../../utils/ThemeContext';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  removable?: boolean;
  onRemove?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  onClick,
  removable = false,
  onRemove,
}) => {
  const { darkMode } = useTheme();
  const interactive = !!onClick;
  
  // Get variant styles from the design system
  const getVariantStyles = () => {
    const variantStyles: Record<BadgeVariant, string> = {
      primary: patterns.badge.primary,
      success: patterns.badge.success,
      warning: patterns.badge.warning,
      error: patterns.badge.error,
      neutral: darkMode 
        ? 'bg-dark-50/50 text-dark-textSecondary' 
        : 'bg-neutral-100 text-neutral-700'
    };
    
    return variantStyles[variant];
  };

  const getSizeStyles = () => {
    const sizes = {
      sm: 'text-xs py-0.5 px-2',
      md: 'text-xs py-1 px-2.5',
      lg: 'text-sm py-1 px-3',
    };
    return sizes[size];
  };

  return (
    <span
      className={cn(
        patterns.badge.base,
        getVariantStyles(),
        getSizeStyles(),
        interactive && 'cursor-pointer hover:opacity-80',
        'inline-flex items-center',
        className
      )}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
      {removable && (
        <button
          type="button"
          className={`ml-1 -mr-1 h-4 w-4 rounded-full inline-flex items-center justify-center focus:outline-none ${
            darkMode ? 'hover:bg-dark-50' : 'hover:bg-gray-200'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          aria-label="Remove"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="w-3 h-3"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge;