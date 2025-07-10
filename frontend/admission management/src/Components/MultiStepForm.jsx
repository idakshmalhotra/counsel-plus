import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FiArrowLeft, FiArrowRight, FiCheck, FiLoader } from "react-icons/fi";

import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";
import EducationDetails from "./EducationDetails";
import PdfUpload from "./PdfUpload";
import StepIndicator from "./StepIndicator";
import PreviewStep from "./PreviewStep";

const steps = [
  { label: "Personal Details", component: PersonalDetails },
  { label: "Address Details", component: AddressDetails },
  { label: "Education Details", component: EducationDetails },
  { label: "Upload PDF", component: PdfUpload },
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
  emailId: "",
  jeeRollNo: "",
  jeeRank: "",

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

  pdfFile: null,
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  gender: Yup.string().required("Gender is required"),
  phone: Yup.string().required("Phone is required"),
  emailId: Yup.string().email("Invalid email").required("Email is required"),
  jeeRollNo: Yup.number()
    .typeError("Roll number must be a number")
    .required("JEE Roll No is required"),
  jeeRank: Yup.number().typeError("JEE Rank must be a number").required("JEE Rank is required"),
  class10Percentage: Yup.number()
    .typeError("Percentage must be a number")
    .min(0, "Percentage cannot be less than 0")
    .max(100, "Percentage cannot exceed 100"),
  class10TotalMarks: Yup.number()
    .typeError("Total marks must be a number")
    .max(500, "Total marks cannot exceed 500"),
  class12Percentage: Yup.number()
    .typeError("Percentage must be a number")
    .min(0, "Percentage cannot be less than 0")
    .max(100, "Percentage cannot exceed 100"),
  class12TotalMarks: Yup.number()
    .typeError("Total marks must be a number")
    .max(500, "Total marks cannot exceed 500"),
  class12PCMPercentage: Yup.number()
    .typeError("PCM Percentage must be a number")
    .min(0, "PCM Percentage cannot be less than 0")
    .max(100, "PCM Percentage cannot exceed 100"),
  class12PhysicsMarks: Yup.number()
    .typeError("Marks must be a number")
    .min(0, "Marks cannot be less than 0")
    .max(100, "Marks cannot exceed 100"),
  class12ChemistryMarks: Yup.number()
    .typeError("Marks must be a number")
    .min(0, "Marks cannot be less than 0")
    .max(100, "Marks cannot exceed 100"),
  class12MathMarks: Yup.number()
    .typeError("Marks must be a number")
    .min(0, "Marks cannot be less than 0")
    .max(100, "Marks cannot exceed 100"),
  class12Subject4Marks: Yup.number()
    .typeError("Marks must be a number")
    .min(0, "Marks cannot be less than 0")
    .max(100, "Marks cannot exceed 100"),
  class12Subject5Marks: Yup.number()
    .typeError("Marks must be a number")
    .min(0, "Marks cannot be less than 0")
    .max(100, "Marks cannot exceed 100"),
  pdfFile: Yup.mixed()
    .required("PDF is required")
    .test("fileType", "Only PDF allowed", (value) => value && value.type === "application/pdf"),
});

const MultiStepComponent = () => {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const StepComponent = steps[step].component;

  const handleFinalSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting form with values:", values);

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "pdfFile" && value instanceof File) {
          formData.append("pdf", value); // Backend expects key 'pdf'
        } else {
          formData.append(key, value);
        }
      });
      console.log("📦 Form data to submit:");
Object.entries(values).forEach(([key, val]) => {
  console.log(`${key}:`, val);
});


      const res = await axios.post("http://localhost:3000/api/form/submit-form", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Form submitted successfully");
      console.log("Form submitted response:", res.data);
      localStorage.removeItem("counselingAdmissionFormData");
    } catch (err) {
      console.error("Form submit error:", err.response?.data || err.message);
      console.log("Full error:", err);
      alert("Failed to submit form.");
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
