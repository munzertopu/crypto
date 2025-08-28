import React from 'react';
import LottieAnimation from './LottieAnimation';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  className = '' 
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 100;
      case 'large':
        return 300;
      default:
        return 200;
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <LottieAnimation
        type="animation"
        width={getSize()}
        height={getSize()}
        loop={true}
        autoplay={true}
      />
    </div>
  );
};

export default LoadingSpinner;
