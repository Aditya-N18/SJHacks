import React from 'react';
import { MapPin, DollarSign, Calendar, Star, BookmarkPlus, ExternalLink } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Job } from '../../types';
import { motion } from 'framer-motion';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { title, company, location, description, requirements, skills, payRange, postedDate, matchScore } = job;

  return (
    <Card interactive className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{company}</CardDescription>
          </div>
          {matchScore && (
            <div className="flex items-center bg-primary-50 text-primary-600 px-2 py-1 rounded-lg">
              <Star size={16} className="mr-1 fill-primary-400 text-primary-400" />
              <span className="font-medium text-sm">{matchScore}% Match</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-3 text-sm">
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-neutral-400" />
            <span className="text-neutral-600">{location}</span>
          </div>
          
          <div className="flex items-center">
            <DollarSign size={16} className="mr-2 text-neutral-400" />
            <span className="text-neutral-600">{payRange}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-neutral-400" />
            <span className="text-neutral-600">Posted {postedDate}</span>
          </div>
          
          <p className="text-neutral-600 mt-2">{description}</p>
          
          {requirements.length > 0 && (
            <div className="mt-3">
              <h4 className="font-medium text-neutral-700 mb-1">Requirements:</h4>
              <ul className="list-disc list-inside space-y-1">
                {requirements.map((req, index) => (
                  <li key={index} className="text-neutral-600">{req}</li>
                ))}
              </ul>
            </div>
          )}
          
          {skills.length > 0 && (
            <div className="mt-3">
              <h4 className="font-medium text-neutral-700 mb-1">Skills:</h4>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <Button size="sm" variant="outline" icon={<BookmarkPlus size={16} />}>
          Save
        </Button>
        <Button size="sm" icon={<ExternalLink size={16} />}>
          Apply
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;