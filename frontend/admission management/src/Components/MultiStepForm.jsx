import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FiArrowLeft, FiArrowRight, FiCheck, FiLoader } from "react-icons/fi";

import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";
import EducationDetails from "./EducationDetails";

import StepIndicator from "./StepIndicator";
import PreviewStep from "./PreviewStep";
import { API_ENDPOINTS } from "../config/api.js";

const steps = [
  { label: "Personal Details", component: PersonalDetails },
  { label: "Address Details", component: AddressDetails },
  { label: "Education Details", component: EducationDetails },
  { label: "Preview", component: PreviewStep },
];

const initialValues = {
  name: "",
  fathersName: "",
  gender: "",
  category: "",
  dateOfBirth: "",
  phone: "",
  fathersPhone: "",
  fathersEmail: "",
  emailId: "",
  jeeRollNo: "",
  jeeRank: "",
  branch: "",

  permanentAddress: "",
  permanentState: "",
  permanentDistrict: "",
  permanentPin: "",
  currentAddress: "",
  currentState: "",
  currentDistrict: "",
  currentPin: "",

  class10School: "",
  class10Board: "",
  class10Percentage: "",
  class10TotalMarks: "",
  class12School: "",
  class12Board: "",
  class12Percentage: "",
  class12TotalMarks: "",
  class12PCMPercentage: "",
  class12PhysicsMarks: "",
  class12ChemistryMarks: "",
  class12MathMarks: "",
  class12Subject4: "",
  class12Subject4Marks: "",
  class12Subject5: "",
  class12Subject5Marks: "",

  
  
};

const validationSchema = Yup.object({
  // Personal Details
  name: Yup.string().required("Name is required").max(50, "Name cannot exceed 50 characters"),
  fathersName: Yup.string().required("Father's name is required").max(50, "Father's name cannot exceed 50 characters"),
  gender: Yup.string().required("Gender is required").oneOf(['male', 'female', 'other'], "Please select a valid gender"),
  category: Yup.string().required("Category is required").oneOf(['general', 'sc', 'st', 'obc', 'other'], "Please select a valid category"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[6-9]\d{9}$/, "Phone number must be 10 digits starting with 6-9"),
  fathersPhone: Yup.string()
    .required("Father's phone number is required")
    .matches(/^[6-9]\d{9}$/, "Phone number must be 10 digits starting with 6-9"),
  fathersEmail: Yup.string().email("Invalid email format").required("Father's email is required"),
  emailId: Yup.string().email("Invalid email").required("Email is required"),
  jeeRollNo: Yup.string()
    .required("JEE Roll No is required")
    .matches(/^[0-9]+$/, "JEE Roll No must contain only numbers"),
  jeeRank: Yup.number()
    .typeError("JEE Rank must be a number")
    .required("JEE Rank is required")
    .min(1, "JEE Rank must be at least 1"),
  branch: Yup.string().required("Branch is required"),

  // Address Details
  permanentAddress: Yup.string().required("Permanent address is required").max(255, "Address cannot exceed 255 characters"),
  permanentState: Yup.string().required("Permanent state is required").max(100, "State name cannot exceed 100 characters"),
  permanentDistrict: Yup.string().required("Permanent district is required").max(100, "District name cannot exceed 100 characters"),
  permanentPin: Yup.string()
    .required("Permanent PIN is required")
    .matches(/^\d{6}$/, "PIN must be exactly 6 digits"),
  currentAddress: Yup.string().required("Current address is required").max(255, "Address cannot exceed 255 characters"),
  currentState: Yup.string().required("Current state is required").max(100, "State name cannot exceed 100 characters"),
  currentDistrict: Yup.string().required("Current district is required").max(100, "District name cannot exceed 100 characters"),
  currentPin: Yup.string()
    .required("Current PIN is required")
    .matches(/^\d{6}$/, "PIN must be exactly 6 digits"),

  // Education Details
  class10School: Yup.string().required("Class 10 school is required").max(255, "School name cannot exceed 255 characters"),
  class10Board: Yup.string().required("Class 10 board is required"),
  class10Percentage: Yup.number()
    .typeError("Class 10 percentage must be a number")
    .required("Class 10 percentage is required")
    .min(0, "Percentage cannot be less than 0")
    .max(100, "Percentage cannot exceed 100"),
  class10TotalMarks: Yup.number()
    .typeError("Class 10 total marks must be a number")
    .required("Class 10 total marks is required")
    .min(0, "Total marks cannot be less than 0"),
  class12School: Yup.string().required("Class 12 school is required").max(255, "School name cannot exceed 255 characters"),
  class12Board: Yup.string().required("Class 12 board is required"),
  class12Percentage: Yup.number()
    .typeError("Class 12 percentage must be a number")
    .required("Class 12 percentage is required")
    .min(0, "Percentage cannot be less than 0")
    .max(100, "Percentage cannot exceed 100"),
  class12TotalMarks: Yup.number()
    .typeError("Class 12 total marks must be a number")
    .required("Class 12 total marks is required")
    .min(0, "Total marks cannot be less than 0"),
  class12PCMPercentage: Yup.number()
    .typeError("PCM percentage must be a number")
    .required("PCM percentage is required")
    .min(0, "PCM percentage cannot be less than 0")
    .max(100, "PCM percentage cannot exceed 100"),
  class12PhysicsMarks: Yup.number()
    .typeError("Physics marks must be a number")
    .required("Physics marks is required")
    .min(0, "Physics marks cannot be less than 0")
    .max(100, "Physics marks cannot exceed 100"),
  class12ChemistryMarks: Yup.number()
    .typeError("Chemistry marks must be a number")
    .required("Chemistry marks is required")
    .min(0, "Chemistry marks cannot be less than 0")
    .max(100, "Chemistry marks cannot exceed 100"),
  class12MathMarks: Yup.number()
    .typeError("Mathematics marks must be a number")
    .required("Mathematics marks is required")
    .min(0, "Mathematics marks cannot be less than 0")
    .max(100, "Mathematics marks cannot exceed 100"),
  class12Subject4: Yup.string().required("Subject 4 is required").max(255, "Subject name cannot exceed 255 characters"),
  class12Subject4Marks: Yup.number()
    .typeError("Subject 4 marks must be a number")
    .required("Subject 4 marks is required")
    .min(0, "Subject 4 marks cannot be less than 0")
    .max(100, "Subject 4 marks cannot exceed 100"),
  class12Subject5: Yup.string().required("Subject 5 is required").max(255, "Subject name cannot exceed 255 characters"),
  class12Subject5Marks: Yup.number()
    .typeError("Subject 5 marks must be a number")
    .required("Subject 5 marks is required")
    .min(0, "Subject 5 marks cannot be less than 0")
    .max(100, "Subject 5 marks cannot exceed 100"),
});

const MultiStepComponent = () => {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const StepComponent = steps[step].component;

  const handleFinalSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting form with values:", values);

      console.log("📦 Form data to submit:");
      Object.entries(values).forEach(([key, val]) => {
        console.log(`${key}:`, val);
      });

      const token = localStorage.getItem("token");
      const res = await axios.post(API_ENDPOINTS.SUBMIT_FORM, values, {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      alert("Form submitted successfully");
      console.log("Form submitted response:", res.data);
      localStorage.removeItem("counselingAdmissionFormData");
    } catch (err) {
      console.error("Form submit error:", err.response?.data || err.message);
      console.log("Full error:", err);
      
      // Show more specific error messages
      if (err.response?.data?.message) {
        alert(`Form submission failed: ${err.response.data.message}`);
      } else if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors.map(e => `${e.field}: ${e.message}`).join('\n');
        alert(`Validation errors:\n${errorMessages}`);
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admission Application</h1>
          <p className="text-gray-600">Complete your application step by step</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Step Indicator */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
            <StepIndicator currentStep={step} steps={steps} />
          </div>

          {/* Form Content */}
          <div className="p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={step === steps.length - 1 ? null : validationSchema}
              onSubmit={(values) => {
                if (step < steps.length - 1) {
                  setStep((prev) => prev + 1);
                } else {
                  handleFinalSubmit(values);
                }
              }}
            >
              {(formik) => (
                <Form>
                  <StepComponent
                    {...formik}
                    nextStep={() => setStep((s) => s + 1)}
                    prevStep={() => setStep((s) => s - 1)}
                    values={formik.values}
                  />

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                        className="flex items-center space-x-2 px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:border-orange-300 hover:text-orange-600 transition-all duration-200 font-medium"
                      >
                        <FiArrowLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                    )}
                    
                    <div className="flex-1"></div>
                    
                    {step < steps.length - 1 ? (
                      <button
                        type="submit"
                        disabled={!formik.isValid || formik.isSubmitting}
                        className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <span>Next Step</span>
                        <FiArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting || !formik.isValid}
                        className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <>
                            <FiLoader className="w-4 h-4 animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <FiCheck className="w-4 h-4" />
                            <span>Submit Application</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Progress Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Step {step + 1} of {steps.length} • {Math.round(((step + 1) / steps.length) * 100)}% Complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiStepComponent;
