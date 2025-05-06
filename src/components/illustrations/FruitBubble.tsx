
import React from 'react';

interface FruitBubbleProps {
  className?: string;
}

export const FruitBubble = ({ className = '' }: FruitBubbleProps) => {
  return (
    <div className={`${className} relative animate-bounce-subtle`}>
      <div className="rounded-full bg-current w-full h-full opacity-70"></div>
    </div>
  );
};
