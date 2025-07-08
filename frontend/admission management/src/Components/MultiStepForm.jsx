import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

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
  jeeRank: Yup.number().required("JEE Rank is required"),
  pdfFile: Yup.mixed()
    .required("PDF is required")
    .test("fileType", "Only PDF allowed", (value) => value && value.type === "application/pdf"),
});

const MultiStepComponent = () => {
  const [step, setStep] = useState(0);
  const StepComponent = steps[step].component;

  const handleFinalSubmit = async (values) => {
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
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <StepIndicator currentStep={step} steps={steps} />

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

            <div className="flex justify-between mt-8">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Back
                </button>
              )}
              {step < steps.length - 1 ? (
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Submit
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultiStepComponent;
