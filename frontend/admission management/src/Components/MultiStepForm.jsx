// Updated MultiStepForm.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";
import EducationDetails from "./EducationDetails";
import PhotoSign from "./PhotoSign";
import Documents from "./Documents";
import Confirmation from "./Confirmation";
import StepIndicator from "./StepIndicator";

const FORM_STORAGE_KEY = "multiStepFormData";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("currentFormStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const formikRef = useRef();

  const steps = [
    { number: 1, label: "Personal Details", component: PersonalDetails },
    { number: 2, label: "Address", component: AddressDetails },
    { number: 3, label: "Education", component: EducationDetails },
    { number: 4, label: "Photo & Sign", component: PhotoSign },
    { number: 5, label: "Documents", component: Documents },
    { number: 6, label: "Confirmation", component: Confirmation },
  ];

  const getInitialValues = () => {
    const saved = localStorage.getItem(FORM_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          personal: {
            name: '', fathersName: '', gender: '', category: '', dateOfBirth: '',
            jeeRollNo: '', jeeRank: '', phone: '', fathersPhone: '', emailId: '',
            ...parsed.personal
          },
          address: {
            permanent: { address: '', state: '', district: '', pin: '', ...parsed.address?.permanent },
            current: { address: '', state: '', district: '', pin: '', ...parsed.address?.current },
          },
          education: {
            class10: { school: '', board: '', percentage: '', totalMarks: '', ...parsed.education?.class10 },
            class12: {
              school: '', board: '', percentage: '', totalMarks: '', pcmPercentage: '',
              physicsMarks: '', chemistryMarks: '', mathMarks: '', subject4: '', subject4Marks: '',
              subject5: '', subject5Marks: '', ...parsed.education?.class12
            }
          },
          photoSign: { photo: null, signature: null, ...parsed.photoSign },
          documents: { ...parsed.documents },
        };
      } catch (err) {
        console.error("Error parsing form data:", err);
      }
    }
    return {
      personal: {
        name: '', fathersName: '', gender: '', category: '', dateOfBirth: '',
        jeeRollNo: '', jeeRank: '', phone: '', fathersPhone: '', emailId: ''
      },
      address: {
        permanent: { address: '', state: '', district: '', pin: '' },
        current: { address: '', state: '', district: '', pin: '' },
      },
      education: {
        class10: { school: '', board: '', percentage: '', totalMarks: '' },
        class12: {
          school: '', board: '', percentage: '', totalMarks: '', pcmPercentage: '',
          physicsMarks: '', chemistryMarks: '', mathMarks: '', subject4: '', subject4Marks: '',
          subject5: '', subject5Marks: ''
        }
      },
      photoSign: { photo: null, signature: null },
      documents: {}
    }
  };

  useEffect(() => {
    localStorage.setItem("currentFormStep", currentStep);
  }, [currentStep]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const formik = formikRef.current;
      if (formik) {
        const valuesToSave = { ...formik.values };
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(valuesToSave));
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [formikRef.current?.values]);

  const validationSchema = [
    Yup.object({
      personal: Yup.object({
        name: Yup.string().required(),
        fathersName: Yup.string().required(),
        gender: Yup.string().required(),
        category: Yup.string().required(),
        dateOfBirth: Yup.date().required(),
        phone: Yup.string().required(),
        fathersPhone: Yup.string().required(),
        emailId: Yup.string().email().required(),
        jeeRollNo: Yup.string().required(),
        jeeRank: Yup.number().required(),
      })
    }),
    Yup.object({
      address: Yup.object({
        permanent: Yup.object({
          address: Yup.string().required(),
          state: Yup.string().required(),
          district: Yup.string().required(),
          pin: Yup.string().required(),
        }),
        current: Yup.object({
          address: Yup.string().required(),
          state: Yup.string().required(),
          district: Yup.string().required(),
          pin: Yup.string().required(),
        })
      })
    }),
    Yup.object({
      education: Yup.object({
        class10: Yup.object({
          school: Yup.string().required(),
          board: Yup.string().required(),
          percentage: Yup.number().required(),
          totalMarks: Yup.number().required(),
        }),
        class12: Yup.object({
          school: Yup.string().required(),
          board: Yup.string().required(),
          percentage: Yup.number().required(),
          totalMarks: Yup.number().required(),
          pcmPercentage: Yup.number().required(),
          physicsMarks: Yup.number().required(),
          chemistryMarks: Yup.number().required(),
          mathMarks: Yup.number().required(),
          subject4: Yup.string().required(),
          subject4Marks: Yup.number().required(),
          subject5: Yup.string().required(),
          subject5Marks: Yup.number().required(),
        })
      })
    }),
    Yup.object({ photoSign: Yup.object({ photo: Yup.mixed().required(), signature: Yup.mixed().required() }) }),
    Yup.object({ documents: Yup.object().required() }),
    Yup.object({})
  ];

  const handleSubmit = async (values, { setSubmitting }) => {
    if (currentStep !== 6) {
      setSubmitting(false);
      return;
    }
    try {
      setSubmitError(null);
      const formDataToSend = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (value !== null && typeof value === 'object') {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/form/submit-form`, {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include'
      });
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message);

      localStorage.removeItem(FORM_STORAGE_KEY);
      localStorage.removeItem("currentFormStep");
      setSubmitting(false);

      navigate('/success', {
        state: {
          message: 'Form submitted successfully!',
          submissionId: data.submissionId
        },
        replace: true
      });
    } catch (error) {
      setSubmitError(error.message);
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepChange = useCallback(async (step, validateForm, setTouched) => {
    if (step > currentStep) {
      const currentFields = Object.keys(validationSchema[currentStep - 1]?.fields || {});
      const errors = await validateForm();
      const currentErrors = Object.keys(errors).filter((key) => currentFields.includes(key));
      if (currentErrors.length === 0) {
        setCurrentStep(step);
      } else {
        setTouched(currentErrors.reduce((acc, key) => { acc[key] = true; return acc; }, {}));
      }
    } else {
      setCurrentStep(step);
    }
  }, [currentStep]);

  const nextStep = useCallback((validateForm, setTouched) => {
    if (currentStep < steps.length) {
      handleStepChange(currentStep + 1, validateForm, setTouched);
    }
  }, [currentStep, steps.length, handleStepChange]);

  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const StepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Formik
          innerRef={formikRef}
          initialValues={getInitialValues()}
          validationSchema={validationSchema[currentStep - 1]}
          onSubmit={handleSubmit}
          validateOnMount={false}
          validateOnChange={false}
          validateOnBlur={true}
        >
          {(formikProps) => (
            <Form>
              {submitError && <div className="text-red-600 mb-4">{submitError}</div>}
              <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
              <StepComponent {...formikProps} />
              <div className="flex justify-between mt-8">
                {currentStep > 1 && <button type="button" onClick={prevStep}>Back</button>}
                {currentStep < 6 ? (
                  <button type="button" onClick={() => nextStep(formikProps.validateForm, formikProps.setTouched)}>Next</button>
                ) : (
                  <button type="submit" disabled={formikProps.isSubmitting}>
                    {formikProps.isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MultiStepForm;
