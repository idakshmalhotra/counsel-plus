import React from "react";
import {
  FiUser,
  FiMapPin,
  FiBookOpen,
  FiFileText,
  FiCheck,
} from "react-icons/fi";

const steps = [
  { label: "Personal Details", icon: <FiUser className="w-5 h-5" /> },
  { label: "Address Details", icon: <FiMapPin className="w-5 h-5" /> },
  { label: "Education Details", icon: <FiBookOpen className="w-5 h-5" /> },
  { label: "Upload PDF", icon: <FiFileText className="w-5 h-5" /> },
  { label: "Preview", icon: <FiCheck className="w-5 h-5" /> },
];

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === index;
        const isCompleted = currentStep > index;

        return (
          <div key={index} className="flex-1 flex flex-col items-center relative">
            {/* Step Circle */}
            <div className="relative">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 transform ${
                  isCompleted
                    ? "bg-white text-green-600 shadow-lg scale-110"
                    : isActive
                    ? "bg-white text-orange-600 shadow-lg scale-110"
                    : "bg-white/20 text-white/60"
                }`}
              >
                {isCompleted ? (
                  <FiCheck className="w-6 h-6" />
                ) : (
                  step.icon
                )}
              </div>
              
              {/* Step Number */}
              {!isCompleted && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-orange-600">{stepNumber}</span>
                </div>
              )}
            </div>

            {/* Step Label */}
            <div className="mt-3 text-center">
              <span
                className={`text-sm font-medium transition-all duration-300 ${
                  isCompleted || isActive 
                    ? "text-white font-semibold" 
                    : "text-white/60"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-6 left-1/2 w-full h-0.5 bg-white/20">
                <div 
                  className={`h-full bg-white transition-all duration-500 ease-out ${
                    isCompleted ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
