import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`
        rounded-2xl border border-gray-200/80 bg-white/95 backdrop-blur-sm
        shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]
        transition-all duration-300 ease-in-out
        hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)]
        hover:border-gray-300/80
        ${className}
      `} 
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`
        p-8 space-y-6
        ${className}
      `} 
      {...props}
    >
      {children}
    </div>
  );
}; 