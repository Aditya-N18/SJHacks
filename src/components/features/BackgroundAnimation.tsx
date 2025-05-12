import React, { useEffect, useState } from 'react';
import { useTheme } from '../../utils/ThemeContext';

interface FloatingObjectProps {
  size: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  shape: 'circle' | 'square' | 'triangle' | 'blob';
  color: string;
}

const FloatingObject: React.FC<FloatingObjectProps> = ({ 
  size, top, left, delay, duration, shape, color 
}) => {
  const getShapeStyles = () => {
    const baseStyles = {
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}%`,
      left: `${left}%`,
      backgroundColor: color,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    };

    if (shape === 'circle') {
      return {
        ...baseStyles,
        borderRadius: '50%',
      };
    } else if (shape === 'square') {
      return {
        ...baseStyles,
        borderRadius: '15%',
      };
    } else if (shape === 'triangle') {
      return {
        ...baseStyles,
        backgroundColor: 'transparent',
        width: 0,
        height: 0,
        borderLeft: `${size/2}px solid transparent`,
        borderRight: `${size/2}px solid transparent`,
        borderBottom: `${size}px solid ${color}`,
      };
    } else if (shape === 'blob') {
      return {
        ...baseStyles,
        borderRadius: '60% 40% 70% 30% / 30% 60% 40% 70%',
      };
    }
    
    return baseStyles;
  };

  return (
    <div
      className="absolute opacity-20 animate-float pointer-events-none"
      style={getShapeStyles()}
    />
  );
};

interface BackgroundAnimationProps {
  objectCount?: number;
  interactive?: boolean;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({
  objectCount = 15,
  interactive = true,
}) => {
  const { darkMode } = useTheme();
  const [objects, setObjects] = useState<Array<FloatingObjectProps>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Generate random floating objects
    const shapes: Array<'circle' | 'square' | 'triangle' | 'blob'> = ['circle', 'square', 'triangle', 'blob'];
    const colors = darkMode 
      ? ['#6E56CF', '#1AD1A5', '#F77F6E', '#4361EE', '#9870FC'] 
      : ['#4361EE', '#38B000', '#FF9F1C', '#6366F1', '#3B82F6'];
    
    const newObjects = Array.from({ length: objectCount }).map(() => ({
      size: Math.floor(Math.random() * 50) + 20,
      top: Math.floor(Math.random() * 90) + 5,
      left: Math.floor(Math.random() * 90) + 5,
      delay: Math.random() * 5,
      duration: Math.floor(Math.random() * 10) + 15,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setObjects(newObjects);
    
    return () => {
      setMounted(false);
    };
  }, [objectCount, darkMode]);
  
  useEffect(() => {
    if (!interactive || !mounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive, mounted]);
  
  const handleInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    
    // Create a ripple effect where clicked
    const ripple = document.createElement('div');
    const rect = e.currentTarget.getBoundingClientRect();
    
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    ripple.style.backgroundColor = darkMode ? 'rgba(110, 86, 207, 0.15)' : 'rgba(99, 102, 241, 0.15)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'ripple 1s ease-out forwards';
    
    e.currentTarget.appendChild(ripple);
    
    setTimeout(() => {
      if (e.currentTarget.contains(ripple)) {
        e.currentTarget.removeChild(ripple);
      }
    }, 1000);
  };
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div 
      className="absolute inset-0 overflow-hidden h-full w-full"
      onClick={handleInteraction}
      style={{ zIndex: 0 }}
    >
      {/* Fixed floating objects */}
      {objects.map((obj, index) => (
        <FloatingObject key={index} {...obj} />
      ))}
      
      {/* Interactive mouse follower */}
      {interactive && mousePosition.x > 0 && mousePosition.y > 0 && (
        <div 
          className="absolute rounded-full pointer-events-none blur-xl opacity-15 transition-all duration-1000 ease-out"
          style={{
            width: '300px',
            height: '300px',
            left: mousePosition.x,
            top: mousePosition.y,
            backgroundColor: darkMode ? '#6E56CF' : '#4361EE',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      
      {/* Add a subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none" 
        style={{
          background: darkMode 
            ? 'radial-gradient(circle at 50% 50%, rgba(26, 209, 165, 0.1), transparent)'
            : 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1), transparent)'
        }}
      />
      
      {/* Add CSS animation for the ripple effect */}
      <style>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 0.5;
          }
          100% {
            width: 500px;
            height: 500px;
            opacity: 0;
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0);
          }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BackgroundAnimation; 