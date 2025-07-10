import React, { useEffect } from "react";
import { useFormikContext } from "formik";

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
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-2">
        Address Details
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {fields.map(({ label, name }) => (
          <div key={name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type="text"
              name={name}
              value={values[name] || ""}
              onChange={handleChange}
              onBlur={() => setFieldTouched(name)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={label}
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
          className="px-6 py-2 bg-gray-400 text-white rounded-full shadow hover:bg-gray-500"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AddressDetails;
