import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { componentStyles } from '../../utils/designSystem';
import { useTheme } from '../../utils/ThemeContext';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      fullWidth = false,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const { darkMode } = useTheme();
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'mb-1.5 text-sm font-medium',
              darkMode ? 'text-dark-textSecondary' : 'text-gray-700',
              disabled && 'opacity-60'
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-textSecondary">
              {startIcon}
            </div>
          )}
          
          <input
            id={inputId}
            ref={ref}
            type={type}
            disabled={disabled}
            className={cn(
              componentStyles.input.base,
              darkMode ? componentStyles.input.dark : componentStyles.input.light,
              startIcon && 'pl-10',
              endIcon && 'pr-10',
              error && 'border-error-400 focus:border-error-400 focus:ring-error-400/50',
              disabled && 'opacity-60 cursor-not-allowed',
              className
            )}
            {...props}
          />
          
          {endIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-textSecondary">
              {endIcon}
            </div>
          )}
        </div>
        
        {(helperText || error) && (
          <p
            className={cn(
              'mt-1.5 text-xs',
              error
                ? 'text-error-500'
                : darkMode
                ? 'text-dark-textSecondary'
                : 'text-gray-500'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 