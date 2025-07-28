import React from 'react';
import { cn } from '@/utils';

interface MinimalCardProps {
  children: React.ReactNode;
  className?: string;
}

export const MinimalCard: React.FC<MinimalCardProps> = ({ children, className }) => {
  return (
    <div 
      className={cn(
        "bg-[#1A1A1B] border border-gray-800 rounded-lg p-4",
        className
      )}
    >
      {children}
    </div>
  );
};