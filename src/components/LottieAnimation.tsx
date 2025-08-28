import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  type: 'animation' | 'medarf8a';
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  type,
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
  className = ''
}) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        let animationPath;
        switch (type) {
          case 'animation':
            animationPath = '/lottie/animation.json';
            break;
          case 'medarf8a':
            animationPath = '/lottie/medarf8a.lottie';
            break;
          default:
            animationPath = '/lottie/animation.json';
        }
        
        const response = await fetch(animationPath);
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Error loading Lottie animation:', error);
      }
    };

    loadAnimation();
  }, [type]);

  if (!animationData) {
    return (
      <div className={className} style={{ width, height }}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        style={{ width, height }}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  );
};

export default LottieAnimation;
