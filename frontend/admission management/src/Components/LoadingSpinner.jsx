import React from 'react';
import { FiLoader } from 'react-icons/fi';

const LoadingSpinner = ({ size = 'md', color = 'orange', text, className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16'
  };

  const colorClasses = {
    orange: 'text-orange-500',
    blue: 'text-blue-500',
    gray: 'text-gray-500',
    white: 'text-white',
    green: 'text-green-500',
    red: 'text-red-500'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        {/* Main Spinner */}
        <FiLoader className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`} />
        
        {/* Pulse Effect */}
        <div className={`absolute inset-0 rounded-full animate-ping ${colorClasses[color]} opacity-20`}></div>
      </div>
      
      {text && (
        <p className="mt-3 text-sm font-medium text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
};

const LoadingPage = ({ message = "Loading...", subtitle = "Please wait while we process your request" }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-white font-bold text-2xl">C</span>
        </div>
        
        {/* Spinner */}
        <LoadingSpinner size="2xl" color="orange" />
        
        {/* Messages */}
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">{message}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

const LoadingOverlay = ({ isVisible, message = "Loading..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
        <LoadingSpinner size="xl" color="orange" text={message} />
      </div>
    </div>
  );
};

const LoadingButton = ({ loading, children, ...props }) => {
  return (
    <button 
      {...props} 
      disabled={loading || props.disabled}
      className={`flex items-center justify-center space-x-2 ${props.className || ''}`}
    >
      {loading && <LoadingSpinner size="sm" color="white" />}
      <span>{children}</span>
    </button>
  );
};

export { LoadingSpinner, LoadingPage, LoadingOverlay, LoadingButton };
export default LoadingSpinner;
