import React from 'react';

export const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseStyles = `
    inline-flex items-center justify-center
    rounded-xl text-sm font-semibold
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    h-12 px-8 py-3
    tracking-wide
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 text-white
      hover:from-blue-700 hover:to-blue-800
      focus:ring-blue-500
      shadow-[0_4px_12px_-2px_rgba(37,99,235,0.3)]
      hover:shadow-[0_8px_16px_-4px_rgba(37,99,235,0.4)]
      active:scale-[0.98]
    `,
    secondary: `
      bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900
      hover:from-gray-200 hover:to-gray-300
      focus:ring-gray-500
      shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05)]
      hover:shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)]
      active:scale-[0.98]
    `,
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 