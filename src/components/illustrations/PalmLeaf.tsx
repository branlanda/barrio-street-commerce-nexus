
import React from 'react';

interface PalmLeafProps {
  className?: string;
}

export const PalmLeaf = ({ className = '' }: PalmLeafProps) => {
  return (
    <div className={`${className} relative`}>
      <div className="w-6 h-32 bg-current rounded-full transform rotate-12 opacity-70"></div>
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-sway origin-bottom">
        <div className="w-32 h-16 bg-current rounded-full -rotate-45 -translate-x-8 opacity-70"></div>
        <div className="w-32 h-16 bg-current rounded-full rotate-45 -translate-x-8 -translate-y-6 opacity-70"></div>
        <div className="w-32 h-16 bg-current rounded-full -rotate-15 translate-x-8 -translate-y-12 opacity-70"></div>
        <div className="w-32 h-16 bg-current rounded-full rotate-15 translate-x-8 -translate-y-18 opacity-70"></div>
      </div>
    </div>
  );
};
