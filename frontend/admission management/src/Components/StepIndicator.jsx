import React from "react";
import {
  FaUser,
  FaMapMarkedAlt,
  FaSchool,
  FaFileImage,
  FaFileUpload,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  { label: "Personal Details", icon: <FaUser /> },
  { label: "Address", icon: <FaMapMarkedAlt /> },
  { label: "Education", icon: <FaSchool /> },
  { label: "Photo & Sign", icon: <FaFileImage /> },
  { label: "Documents", icon: <FaFileUpload /> },
  { label: "Confirmation", icon: <FaCheckCircle /> },
];

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="flex justify-between items-center mb-10 px-2 md:px-10">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${
                isCompleted
                  ? "bg-green-500"
                  : isActive
                  ? "bg-orange-500"
                  : "bg-gray-300"
              }`}
            >
              {step.icon}
            </div>
            <span
              className={`text-sm text-center mt-2 ${
                isCompleted || isActive ? "text-black font-semibold" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
            <span className="text-xs text-gray-500">Step {stepNumber}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
