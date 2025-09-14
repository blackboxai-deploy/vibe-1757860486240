"use client";

import React from 'react';

interface ArrayBarProps {
  value: number;
  index: number;
  maxValue: number;
  isPivot: boolean;
  isComparing: boolean;
  isSwapping: boolean;
  isInRange: boolean;
  isPartitioned: boolean;
  className?: string;
}

export default function ArrayBar({
  value,
  index,
  maxValue,
  isPivot,
  isComparing,
  isSwapping,
  isInRange,
  isPartitioned,
  className = ''
}: ArrayBarProps) {
  // Calculate height as percentage of container
  const heightPercentage = (value / maxValue) * 100;
  
  // Determine bar color and styling based on state
  const getBarClasses = () => {
    const baseClasses = "relative transition-all duration-500 ease-in-out flex flex-col items-center justify-end rounded-t-md border-2 min-h-[60px]";
    
    if (isPivot) {
      return `${baseClasses} bg-red-500 border-red-600 shadow-lg transform scale-105`;
    }
    
    if (isSwapping) {
      return `${baseClasses} bg-orange-500 border-orange-600 shadow-lg transform scale-110 animate-pulse`;
    }
    
    if (isComparing) {
      return `${baseClasses} bg-yellow-500 border-yellow-600 shadow-md transform scale-105`;
    }
    
    if (isPartitioned) {
      return `${baseClasses} bg-green-500 border-green-600 shadow-md`;
    }
    
    if (isInRange) {
      return `${baseClasses} bg-blue-400 border-blue-500`;
    }
    
    return `${baseClasses} bg-gray-300 border-gray-400`;
  };

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <div
        className={getBarClasses()}
        style={{ 
          height: `${Math.max(heightPercentage, 15)}%`,
          width: '100%',
          maxWidth: '60px',
          minWidth: '30px'
        }}
      >
        {/* Value display inside bar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-sm drop-shadow-md">
            {value}
          </span>
        </div>
        
        {/* Special indicators */}
        {isPivot && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              PIVOT
            </div>
          </div>
        )}
        
        {isSwapping && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-orange-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-bounce">
              SWAP
            </div>
          </div>
        )}
        
        {isComparing && !isPivot && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-yellow-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              COMPARE
            </div>
          </div>
        )}
      </div>
      
      {/* Index label */}
      <div className="text-xs text-gray-600 font-mono bg-white px-2 py-1 rounded border">
        {index}
      </div>
    </div>
  );
}