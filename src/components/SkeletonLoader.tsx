import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;