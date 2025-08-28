import React from 'react';
import LottieAnimation from './LottieAnimation';

interface SuccessAnimationProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onComplete?: () => void;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ 
  size = 'medium', 
  className = '',
  onComplete
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
        type="medarf8a"
        width={getSize()}
        height={getSize()}
        loop={false}
        autoplay={true}
      />
    </div>
  );
};

export default SuccessAnimation;
