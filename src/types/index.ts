export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  skills: Skill[];
  savedJobs: string[];
  progress: {
    resourcesFound: number;
    skillsDiscovered: number;
    jobsApplied: number;
  };
}

export interface Resource {
  id: string;
  name: string;
  type: 'food' | 'shelter' | 'healthcare';
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  description: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  strength: number; // 1-5
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  skills: string[];
  payRange: string;
  contactInfo: string;
  postedDate: string;
  matchScore?: number; // 0-100
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
}