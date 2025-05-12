import React from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { Skill } from '../../types';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const { name, description, strength } = skill;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-neutral-600 text-sm mb-3">{description}</p>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium text-neutral-600">Strength</span>
            <span className="text-sm font-medium text-neutral-500">{strength}/5</span>
          </div>
          <div className="w-full bg-neutral-100 rounded-full h-1.5">
            <motion.div
              className="bg-primary-400 h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(strength / 5) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;