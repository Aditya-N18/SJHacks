import { Resource, Job, Skill, User, ChatMessage } from '../types';

export const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Hope Community Kitchen',
    type: 'food',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94103',
    phone: '(415) 555-1234',
    hours: 'Mon-Fri: 11am-1pm, 5pm-7pm',
    description: 'Free hot meals served twice daily. No ID required.',
    latitude: 37.7749,
    longitude: -122.4194,
    isOpen: true,
  },
  {
    id: '2',
    name: 'Golden Gate Shelter',
    type: 'shelter',
    address: '456 Oak Avenue',
    city: 'San Francisco',
    state: 'CA',
    zip: '94117',
    phone: '(415) 555-5678',
    hours: 'Daily: 7pm-7am',
    description: 'Emergency overnight shelter with 50 beds. First come, first served.',
    latitude: 37.7759,
    longitude: -122.4245,
    isOpen: true,
  },
  {
    id: '3',
    name: 'Mission Health Clinic',
    type: 'healthcare',
    address: '789 Valencia Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94110',
    phone: '(415) 555-9101',
    hours: 'Mon-Fri: 9am-5pm',
    description: 'Free basic healthcare services. Walk-ins welcome.',
    latitude: 37.7599,
    longitude: -122.4148,
    isOpen: false,
  },
  {
    id: '4',
    name: 'Sunset Food Pantry',
    type: 'food',
    address: '2121 Judah Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94122',
    phone: '(415) 555-1212',
    hours: 'Tue & Thu: 10am-2pm',
    description: 'Free groceries twice weekly. Please bring ID if available.',
    latitude: 37.7616,
    longitude: -122.4851,
    isOpen: false,
  },
  {
    id: '5',
    name: 'Richmond District Shelter',
    type: 'shelter',
    address: '3200 Geary Blvd',
    city: 'San Francisco',
    state: 'CA',
    zip: '94118',
    phone: '(415) 555-3434',
    hours: 'Daily: 6pm-8am',
    description: 'Warm shelter with 30 beds, showers, and breakfast.',
    latitude: 37.7813,
    longitude: -122.4623,
    isOpen: true,
  },
  {
    id: '6',
    name: 'Bayview Community Health',
    type: 'healthcare',
    address: '5050 3rd Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94124',
    phone: '(415) 555-5656',
    hours: 'Mon, Wed, Fri: 10am-4pm',
    description: 'Free medical checkups, mental health services, and medication support.',
    latitude: 37.7314,
    longitude: -122.3915,
    isOpen: true,
  },
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Cafe Assistant',
    company: 'Community Coffee House',
    location: 'San Francisco, CA',
    description: 'Help in our community cafe serving customers and preparing simple food items. Friendly environment with flexible hours.',
    requirements: [
      'No experience required',
      'Friendly attitude',
      'Reliable transportation',
    ],
    skills: ['Customer Service', 'Food Prep'],
    payRange: '$18-20/hr',
    contactInfo: 'Apply in person or call (415) 555-7890',
    postedDate: '2 days ago',
    matchScore: 92,
  },
  {
    id: '2',
    title: 'Warehouse Helper',
    company: 'Bay Area Distribution',
    location: 'Oakland, CA',
    description: 'Entry-level position helping to sort and move packages in our warehouse. Full-time and part-time positions available.',
    requirements: [
      'Ability to lift up to 30lbs',
      'Basic reading skills for package labels',
      'Punctual and reliable',
    ],
    skills: ['Physical Labor', 'Organization'],
    payRange: '$20-22/hr',
    contactInfo: 'Email jobs@baydistribution.example.com',
    postedDate: '3 days ago',
    matchScore: 85,
  },
  {
    id: '3',
    title: 'Office Cleaner',
    company: 'Bright Spaces Cleaning',
    location: 'San Francisco, CA',
    description: 'Evening cleaning position at downtown office buildings. Steady hours and reliable pay.',
    requirements: [
      'Detail oriented',
      'Reliable transportation',
      'Background check required',
    ],
    skills: ['Cleaning', 'Time Management'],
    payRange: '$19-21/hr',
    contactInfo: 'Call (415) 555-2323',
    postedDate: '1 week ago',
    matchScore: 78,
  },
  {
    id: '4',
    title: 'Landscaping Assistant',
    company: 'Green Thumb Gardens',
    location: 'San Jose, CA',
    description: 'Help with basic gardening and landscaping work. Learn while you earn in this entry-level position.',
    requirements: [
      'Outdoor work in various weather',
      'Ability to use basic garden tools',
    ],
    skills: ['Physical Labor', 'Gardening'],
    payRange: '$19-23/hr',
    contactInfo: 'Text your name to (408) 555-4545',
    postedDate: '5 days ago',
    matchScore: 65,
  },
];

export const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'Customer Service',
    description: 'Ability to communicate effectively and help customers with their needs.',
    strength: 4,
  },
  {
    id: '2',
    name: 'Organization',
    description: 'Skills in keeping things in order and maintaining systems.',
    strength: 3,
  },
  {
    id: '3',
    name: 'Physical Labor',
    description: 'Capability to perform tasks requiring physical strength and endurance.',
    strength: 5,
  },
  {
    id: '4',
    name: 'Team Collaboration',
    description: 'Working well with others to achieve common goals.',
    strength: 4,
  },
];

export const mockUser: User = {
  id: '1',
  name: 'Jamie Smith',
  email: 'jamie.s@example.com',
  phone: '(555) 123-4567',
  skills: mockSkills,
  savedJobs: ['1', '3'],
  progress: {
    resourcesFound: 3,
    skillsDiscovered: 4,
    jobsApplied: 1,
  },
};

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'bot',
    content: 'Hello! I\'m here to help you find resources and support. How can I assist you today?',
    timestamp: new Date('2025-04-15T10:00:00'),
  },
  {
    id: '2',
    sender: 'user',
    content: 'I need to find a place to stay tonight.',
    timestamp: new Date('2025-04-15T10:02:00'),
  },
  {
    id: '3',
    sender: 'bot',
    content: 'I\'m sorry to hear you need shelter. There are two emergency shelters currently open in San Francisco: Golden Gate Shelter (50 beds) and Richmond District Shelter (30 beds). Would you like directions to either of these?',
    timestamp: new Date('2025-04-15T10:02:10'),
  },
];