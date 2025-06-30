import React from 'react';
import { FiCheck, FiUser, FiMapPin, FiBook, FiCamera, FiFileText, FiCheckCircle } from 'react-icons/fi';

const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: 'Personal Details', icon: FiUser },
    { number: 2, label: 'Address', icon: FiMapPin },
    { number: 3, label: 'Education', icon: FiBook },
    { number: 4, label: 'Photo & Sign', icon: FiCamera },
    { number: 5, label: 'Documents', icon: FiFileText },
    { number: 6, label: 'Confirmation', icon: FiCheckCircle }
  ];

  return (
    <div className="step-indicator w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`
                    relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2
                    ${isCompleted 
                      ? 'bg-green-500 border-green-500 text-white shadow-lg' 
                      : isActive 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg ring-4 ring-blue-100' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <FiCheck className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                
                {/* Step Label */}
                <div className="mt-2 text-center">
                  <div
                    className={`
                      text-xs font-medium transition-colors duration-300
                      ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'}
                    `}
                  >
                    {step.label}
                  </div>
                  <div
                    className={`
                      text-xs transition-colors duration-300
                      ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}
                    `}
                  >
                    Step {step.number}
                  </div>
                </div>
              </div>

              {/* Connection Line */}
              {!isLast && (
                <div className="flex-1 mx-2 mt-6">
                  <div
                    className={`
                      h-0.5 transition-all duration-300
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}
                    `}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
