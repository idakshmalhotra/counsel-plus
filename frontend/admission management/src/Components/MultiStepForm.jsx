import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";
import EducationDetails from "./EducationDetails";
import PhotoSign from "./PhotoSign";
import DocumentUpload from "./Documents";
import Confirmation from "./Confirmation";
import StepIndicator from "./StepIndicator";
import { useToast } from "./ToastProvider";

const FORM_STORAGE_KEY = "multiStepFormData";

const steps = [
  { number: 1, label: "Personal Details", component: PersonalDetails },
  { number: 2, label: "Address", component: AddressDetails },
  { number: 3, label: "Education", component: EducationDetails },
  { number: 4, label: "Photo & Sign", component: PhotoSign },
  { number: 5, label: "Documents", component: DocumentUpload },
  { number: 6, label: "Confirmation", component: Confirmation },
];

const initialValues = {
  name: "",
  gender: "",
  dateOfBirth: "",
  fathersPhone: "",
  jeeRollNo: "",
  fathersName: "",
  category: "",
  phone: "",
  emailId: "",
  jeeRank: "",
  addressLine1: "",
  addressLine2: "",
  state: "",
  city: "",
  zipCode: "",
  schoolName: "",
  board: "",
  percentage: "",
  passingYear: "",
  photo: null,
  signature: null,
  documents: [],
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  dateOfBirth: Yup.string().required("Required"),
  fathersPhone: Yup.string().required("Required"),
  jeeRollNo: Yup.string().required("Required"),
  fathersName: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  emailId: Yup.string().email("Invalid email").required("Required"),
  jeeRank: Yup.number().required("Required"),
});

const MultistepComponent = () => {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const nextStep = async (validateForm, setTouched) => {
    const formErrors = await validateForm();
    if (Object.keys(formErrors).length > 0) {
      setTouched(
        Object.keys(formErrors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      toast.error("Please fill in all required fields correctly before proceeding.");
      return;
    }
    setStep((s) => s + 1);``
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      formData.append("personal", JSON.stringify({
        name: values.name,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth,
        fathersPhone: values.fathersPhone,
        jeeRollNo: values.jeeRollNo,
        fathersName: values.fathersName,
        category: values.category,
        phone: values.phone,
        emailId: values.emailId,
        jeeRank: values.jeeRank,
      }));

      formData.append("address", JSON.stringify({
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        state: values.state,
        city: values.city,
        zipCode: values.zipCode,
      }));

      formData.append("education", JSON.stringify({
        schoolName: values.schoolName,
        board: values.board,
        percentage: values.percentage,
        passingYear: values.passingYear,
      }));

      if (values.photo instanceof File) {
        formData.append("photo", values.photo);
      }

      if (values.signature instanceof File) {
        formData.append("signature", values.signature);
      }

      values.documents.forEach((doc, index) => {
        if (doc instanceof File) {
          formData.append(`documents.${index}`, doc);
        }
      });

      const response = await axios.post("http://localhost:3000/api/form/submit-form", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Form submitted successfully");
      navigate("/");
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Submission failed: " + (err.response?.data?.message || err.message));
    }
  };

  const renderStep = (stepIndex, formikProps) => {
    const StepComponent = steps[stepIndex].component;
    return (
      <div>
        <StepComponent
          {...formikProps}
          nextStep={() => nextStep(formikProps.validateForm, formikProps.setTouched)}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <StepIndicator currentStep={step + 1} totalSteps={steps.length} />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <div>
              <div className="bg-white shadow-md rounded-lg p-6">
                {renderStep(step, formikProps)}
              </div>

              <div className="flex justify-center mt-10 space-x-4">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition-all"
                  >
                    Back
                  </button>
                )}

                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => nextStep(formikProps.validateForm, formikProps.setTouched)}
                    className="px-8 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition-all"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={formikProps.handleSubmit}
                    className="px-8 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MultistepComponent;
