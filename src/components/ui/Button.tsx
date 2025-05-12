import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { componentStyles } from '../../utils/designSystem';
import { useTheme } from '../../utils/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'error';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      fullWidth = false,
      isLoading = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const { darkMode } = useTheme();

    // Get the appropriate variant styles using the design system
    const getVariantStyles = (variant: ButtonVariant) => {
      const variantStyles = {
        primary: componentStyles.button.primary,
        secondary: componentStyles.button.secondary,
        outline: componentStyles.button.outline,
        ghost: componentStyles.button.ghost,
        success: componentStyles.button.success,
        error: componentStyles.button.error,
      };
      
      return variantStyles[variant];
    };

    const sizes = {
      sm: 'py-1.5 px-3 text-sm',
      md: 'py-2.5 px-5 text-base',
      lg: 'py-3 px-7 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          componentStyles.button.base,
          getVariantStyles(variant),
          sizes[size],
          fullWidth ? 'w-full' : '',
          darkMode && variant === 'primary' ? 'shadow-colored-glow' : '',
          darkMode && variant === 'success' ? 'shadow-teal-glow' : '',
          darkMode && variant === 'error' ? 'shadow-coral-glow' : '',
          className
        )}
        disabled={disabled || isLoading}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {isLoading && (
          <svg
            className={cn('animate-spin h-4 w-4 text-current', {
              'mr-2': iconPosition === 'left',
              'ml-2 mr-0 order-2': iconPosition === 'right',
            })}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {!isLoading && icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;