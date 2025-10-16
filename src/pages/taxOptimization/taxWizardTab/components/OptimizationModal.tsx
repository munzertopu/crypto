import React, { useEffect, useState } from "react";
import TickCircleFilledIcon from "../../../../utils/icons/TickCircleFilledIcon";

interface OptimizationModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const OptimizationModal: React.FC<OptimizationModalProps> = ({ isOpen, onClose }) => {
  const [optimizationProgress, setOptimizationProgress] = useState(30);
  const [completedSteps, setCompletedSteps] = useState(1); // 1 = Gathering lots completed

  // Optimization steps
  const optimizationSteps = [
    { id: 1, name: "Gathering lots", completed: completedSteps >= 1 },
    { id: 2, name: "Scoring combinations", completed: completedSteps >= 2 },
    { id: 3, name: "Simulating taxes", completed: completedSteps >= 3 },
    { id: 4, name: "Ranking plans", completed: completedSteps >= 4 },
  ];

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setOptimizationProgress(30);
      setCompletedSteps(1);

      // Simulate progress updates
      const timer1 = setTimeout(() => {
        setOptimizationProgress(60);
        setCompletedSteps(2);
      }, 2000);

      const timer2 = setTimeout(() => {
        setOptimizationProgress(80);
        setCompletedSteps(3);
      }, 4000);

      const timer3 = setTimeout(() => {
        setOptimizationProgress(100);
        setCompletedSteps(4);
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
        }, 1000);
      }, 6000);

      // Cleanup timers when component unmounts or modal closes
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <img
              src={"/logo-mobile-white.png"}
              alt="Portal"
              className="h-11 w-11"
            />
        </div>

        {/* Title */}
        <h2 className="text-h5 font-bold text-gray-900 dark:text-white text-center mb-3">
          Optimizing your Plan
        </h2>

        {/* Steps */}
        <div className="space-y-2 mb-6">
          {optimizationSteps.map((step) => {
            const stepProgress = step.completed ? 100 : (step.id === completedSteps + 1 ? optimizationProgress : 0);
            return (
              <div key={step.id} className="flex items-center justify-center gap-3">
                <div className="relative w-8 h-8">
                  {step.completed ? (
                    /* TickCircleFilledIcon for completed steps */
                    <div className="flex items-center justify-center">
                      <TickCircleFilledIcon width={24} height={24} />
                    </div>
                  ) : (
                    /* Progress circle for incomplete steps */
                    <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200 dark:text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      {/* Progress circle */}
                      {stepProgress > 0 && (
                        <path
                          className="text-green-500"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          fill="transparent"
                          strokeDasharray={`${stepProgress}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          style={{ transition: 'stroke-dasharray 0.3s ease-in-out' }}
                        />
                      )}
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${
                  step.completed 
                    ? "text-gray-900 dark:text-white font-medium" 
                    : "text-gray-500 dark:text-gray-400"
                }`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-700 h-2 rounded-full transition-all duration-500"
                style={{ width: `${optimizationProgress}%` }}
              ></div>
            </div>
            <span className="ml-3 text-lg font-bold text-gray-900 dark:text-white">
              {optimizationProgress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationModal;
