import React from "react";
import { useFormikContext, Field, ErrorMessage } from "formik";

const Input = ({ label, name, placeholder, type = "text" }) => (
  <div className="w-full md:w-1/2 px-2 mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label} *</label>
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
  </div>
);

const Select = ({ label, name, options }) => (
  <div className="w-full md:w-1/2 px-2 mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label} *</label>
    <Field
      as="select"
      name={name}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
  </div>
);

const EducationDetails = ({ nextStep }) => {
  return (
    <div className="">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Class 10</h2>
      <div className="flex flex-wrap">
        <Input name="class10School" label="School" placeholder="Enter your school name" />
        <Input name="class10Board" label="Board" placeholder="Pick your school board" />
        <Input name="class10Percentage" label="Overall Percentage" placeholder="Enter your percentage" type="number" />
        <Input name="class10TotalMarks" label="Total Marks" placeholder="/500" type="number" />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Class 12</h2>
      <div className="flex flex-wrap">
        <Input name="class12School" label="School" placeholder="Enter your school name" />
        <Input name="class12Board" label="Board" placeholder="Pick your school board" />
        <Input name="class12Percentage" label="Overall Percentage" placeholder="Enter your percentage" type="number" />
        <Input name="class12TotalMarks" label="Total Marks" placeholder="/500" type="number" />
        <Input name="class12PCMPercentage" label="PCM Percentage" placeholder="Enter your PCM percentage" type="number" />
        <Input name="class12PhysicsMarks" label="Marks in Physics" placeholder="/100" type="number" />
        <Input name="class12ChemistryMarks" label="Marks in Chemistry" placeholder="/100" type="number" />
        <Input name="class12MathMarks" label="Marks in Mathematics" placeholder="/100" type="number" />
        <Input name="class12Subject4" label="Subject 4" placeholder="Enter subject name" />
        <Input name="class12Subject4Marks" label="Marks in Subject 4" placeholder="/100" type="number" />
        <Input name="class12Subject5" label="Subject 5" placeholder="Enter subject name" />
        <Input name="class12Subject5Marks" label="Marks in Subject 5" placeholder="/100" type="number" />
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EducationDetails;
