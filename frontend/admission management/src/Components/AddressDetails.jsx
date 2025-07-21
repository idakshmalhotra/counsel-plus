import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const AddressDetails = ({ nextStep, prevStep }) => {
  const {
    values,
    handleChange,
    errors,
    touched,
    setFieldTouched,
    setValues,
  } = useFormikContext();

  useEffect(() => {
    const saved = localStorage.getItem("counselingAdmissionFormData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setValues((prev) => ({ ...prev, ...parsed }));
    }
  }, [setValues]);

  useEffect(() => {
    localStorage.setItem("counselingAdmissionFormData", JSON.stringify(values));
  }, [values]);

  const fields = [
    { label: "Permanent Address", name: "permanentAddress" },
    { label: "Permanent State", name: "permanentState" },
    { label: "Permanent District", name: "permanentDistrict" },
    { label: "Permanent Pin", name: "permanentPin" },
    { label: "Current Address", name: "currentAddress" },
    { label: "Current State", name: "currentState" },
    { label: "Current District", name: "currentDistrict" },
    { label: "Current Pin", name: "currentPin" },
  ];

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-8 text-center">
        Address Details
      </h2>

      <div className="w-full max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {fields.map(({ label, name }) => (
            <div key={name} className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <input
                type="text"
                name={name}
                value={values[name] || ""}
                onChange={handleChange}
                onBlur={() => setFieldTouched(name)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
              {touched[name] && errors[name] && (
                <span className="text-red-500 text-sm mt-1">
                  {errors[name]}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center space-x-2 px-8 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:border-orange-300 hover:text-orange-600 transition-all duration-200 font-medium"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>Continue</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
