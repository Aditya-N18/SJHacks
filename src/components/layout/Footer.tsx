import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-primary-400 text-white p-1.5 rounded-lg mr-2">
                <Heart size={18} />
              </div>
              <span className="font-bold text-xl text-white">RiseUp AI</span>
            </div>
            <p className="text-sm mb-6 text-neutral-400">
              Helping homeless individuals find resources and build pathways to employment through skill discovery and job matching.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-primary-400 text-sm">Home</Link>
              </li>
              <li>
                <Link to="/resources" className="text-neutral-400 hover:text-primary-400 text-sm">Find Resources</Link>
              </li>
              <li>
                <Link to="/skills" className="text-neutral-400 hover:text-primary-400 text-sm">Discover Skills</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-neutral-400 hover:text-primary-400 text-sm">Find Jobs</Link>
              </li>
              <li>
                <Link to="/chat" className="text-neutral-400 hover:text-primary-400 text-sm">Get Help</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-400 text-sm flex items-center">
                  <ExternalLink size={14} className="mr-1.5" /> 
                  Crisis Helpline
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-400 text-sm flex items-center">
                  <ExternalLink size={14} className="mr-1.5" /> 
                  Housing Assistance
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-400 text-sm flex items-center">
                  <ExternalLink size={14} className="mr-1.5" /> 
                  Mental Health Support
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-400 text-sm flex items-center">
                  <ExternalLink size={14} className="mr-1.5" /> 
                  Job Training Programs
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-400 text-sm flex items-center">
                  <ExternalLink size={14} className="mr-1.5" /> 
                  Government Benefits
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-primary-400 mt-0.5" />
                <span className="text-sm text-neutral-400">123 Hope Street, Suite 456<br />San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-primary-400" />
                <a href="tel:+18005551234" className="text-sm text-neutral-400 hover:text-primary-400">1-800-555-1234</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-primary-400" />
                <a href="mailto:help@riseupai.org" className="text-sm text-neutral-400 hover:text-primary-400">help@riseupai.org</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-neutral-700 text-sm text-neutral-500 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 RiseUp AI. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="hover:text-primary-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-400">Terms of Service</Link>
            <Link to="/accessibility" className="hover:text-primary-400">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;