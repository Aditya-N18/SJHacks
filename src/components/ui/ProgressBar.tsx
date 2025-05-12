import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'primary' | 'success' | 'accent' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'primary',
  size = 'md',
  showLabel = false,
  label,
  className,
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const colors = {
    primary: 'bg-primary-400',
    success: 'bg-success-400',
    accent: 'bg-accent-400',
    error: 'bg-error-400',
  };
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium text-neutral-600">{label}</span>}
          {showLabel && <span className="text-sm font-medium text-neutral-500">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-neutral-100 rounded-full overflow-hidden', sizes[size])}>
        <motion.div
          className={cn('rounded-full', colors[color])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;