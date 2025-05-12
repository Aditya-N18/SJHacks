import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Home, Search, MessageSquare, Briefcase, Star, Menu as MenuIcon } from 'lucide-react';
import Button from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/', icon: <Home size={18} /> },
  { name: 'Resources', path: '/resources', icon: <Search size={18} /> },
  { name: 'Chat Help', path: '/chat', icon: <MessageSquare size={18} /> },
  { name: 'Discover Skills', path: '/skills', icon: <Star size={18} /> },
  { name: 'Find Jobs', path: '/jobs', icon: <Briefcase size={18} /> },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="bg-primary-400 text-white p-2 rounded-lg mr-2">
            <MessageSquare size={20} />
          </div>
          <span className="font-bold text-xl text-primary-400">RiseUp AI</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors',
                  isActive
                    ? 'text-primary-400 bg-primary-50'
                    : 'text-neutral-600 hover:text-primary-400 hover:bg-neutral-50'
                )
              }
            >
              <span className="mr-1.5">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Register</Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-neutral-700 rounded-lg hover:bg-neutral-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-neutral-100"
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        'px-4 py-3 rounded-lg text-base font-medium flex items-center',
                        isActive
                          ? 'text-primary-400 bg-primary-50'
                          : 'text-neutral-600 hover:text-primary-400 hover:bg-neutral-50'
                      )
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-neutral-100 flex space-x-4">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" size="sm" fullWidth>
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button size="sm" fullWidth>
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;