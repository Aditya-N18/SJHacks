import React from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Resource } from '../../types';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const { name, type, address, city, state, zip, phone, hours, description, isOpen } = resource;

  return (
    <Card interactive className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{name}</CardTitle>
            <div className="flex items-center mt-1.5">
              <Badge 
                variant={
                  type === 'food' ? 'success' : 
                  type === 'shelter' ? 'primary' : 
                  'warning'
                }
                size="sm"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Badge>
              
              {isOpen ? (
                <Badge variant="success" size="sm" className="ml-2">Open Now</Badge>
              ) : (
                <Badge variant="outline" size="sm" className="ml-2">Closed</Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-3 text-sm">
          <div className="flex items-start">
            <MapPin size={16} className="mr-2 text-neutral-400 mt-0.5 flex-shrink-0" />
            <span className="text-neutral-600">{address}, {city}, {state} {zip}</span>
          </div>
          
          <div className="flex items-center">
            <Phone size={16} className="mr-2 text-neutral-400 flex-shrink-0" />
            <a href={`tel:${phone}`} className="text-primary-400 hover:underline">{phone}</a>
          </div>
          
          <div className="flex items-start">
            <Clock size={16} className="mr-2 text-neutral-400 mt-0.5 flex-shrink-0" />
            <span className="text-neutral-600">{hours}</span>
          </div>
          
          <p className="text-neutral-600 mt-2">{description}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <Button size="sm" variant="outline">
          <MapPin size={16} className="mr-1.5" />
          Directions
        </Button>
        <Button size="sm">
          <Phone size={16} className="mr-1.5" />
          Call
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;