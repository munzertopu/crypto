import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import SuccessAnimation from './SuccessAnimation';
import LottieAnimation from './LottieAnimation';

const LottieDemo: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="px-8 mb-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-250 mb-4">Lottie Animations Demo</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Loading Animation */}
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Loading Animation</h4>
            <LoadingSpinner size="medium" />
            <p className="text-xs text-gray-500 mt-2">Uses animation.json</p>
          </div>

          {/* Success Animation */}
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Success Animation</h4>
            {showSuccess ? (
              <SuccessAnimation size="medium" />
            ) : (
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Click button to trigger</span>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">Uses medarf8a.lottie</p>
          </div>

          {/* Direct Animation Usage */}
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Direct Usage</h4>
            <LottieAnimation
              type="animation"
              width={120}
              height={120}
              loop={true}
              autoplay={true}
            />
            <p className="text-xs text-gray-500 mt-2">Direct component usage</p>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSimulateLoading}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Simulate Loading → Success'}
          </button>
          
          {isLoading && (
            <div className="mt-4">
              <LoadingSpinner size="small" />
              <p className="text-sm text-gray-600 mt-2">Processing...</p>
            </div>
          )}
        </div>

        {/* Usage Instructions */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-250 mb-2">How to Use:</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>LoadingSpinner:</strong> &lt;LoadingSpinner size="medium" /&gt;</p>
            <p><strong>SuccessAnimation:</strong> &lt;SuccessAnimation size="large" /&gt;</p>
            <p><strong>Direct:</strong> &lt;LottieAnimation type="animation" width={200} height={200} /&gt;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LottieDemo;
