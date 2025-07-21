import React from "react";
import { FiArrowLeft } from "react-icons/fi";

const PreviewStep = ({ values, prevStep }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-8 text-center">Preview Submission</h2>

      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h3 className="font-medium text-gray-900 mb-4">Personal Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <p><span className="font-medium">Name:</span> {values.name}</p>
            <p><span className="font-medium">Father's Name:</span> {values.fathersName}</p>
            <p><span className="font-medium">Gender:</span> {values.gender}</p>
            <p><span className="font-medium">Category:</span> {values.category}</p>
            <p><span className="font-medium">Date of Birth:</span> {values.dateOfBirth}</p>
            <p><span className="font-medium">Phone:</span> {values.phone}</p>
            <p><span className="font-medium">Father's Phone:</span> {values.fathersPhone}</p>
            <p><span className="font-medium">Email:</span> {values.emailId}</p>
            <p><span className="font-medium">Father's Email:</span> {values.fathersEmail}</p>
            <p><span className="font-medium">JEE Roll No:</span> {values.jeeRollNo}</p>
            <p><span className="font-medium">JEE Rank:</span> {values.jeeRank}</p>
            <p><span className="font-medium">Branch:</span> {values.branch}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mt-6 space-y-4">
          <h3 className="font-medium text-gray-900 mb-4">Address Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Permanent Address</h4>
              <p>{values.permanentAddress}</p>
              <p>{values.permanentDistrict}, {values.permanentState}</p>
              <p>PIN: {values.permanentPin}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Current Address</h4>
              <p>{values.currentAddress}</p>
              <p>{values.currentDistrict}, {values.currentState}</p>
              <p>PIN: {values.currentPin}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mt-6 space-y-4">
          <h3 className="font-medium text-gray-900 mb-4">Education Details</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Class 10</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <p><span className="font-medium">School:</span> {values.class10School}</p>
                <p><span className="font-medium">Board:</span> {values.class10Board}</p>
                <p><span className="font-medium">Percentage:</span> {values.class10Percentage}%</p>
                <p><span className="font-medium">Total Marks:</span> {values.class10TotalMarks}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Class 12</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <p><span className="font-medium">School:</span> {values.class12School}</p>
                <p><span className="font-medium">Board:</span> {values.class12Board}</p>
                <p><span className="font-medium">Percentage:</span> {values.class12Percentage}%</p>
                <p><span className="font-medium">PCM Percentage:</span> {values.class12PCMPercentage}%</p>
                <p><span className="font-medium">Physics:</span> {values.class12PhysicsMarks}</p>
                <p><span className="font-medium">Chemistry:</span> {values.class12ChemistryMarks}</p>
                <p><span className="font-medium">Mathematics:</span> {values.class12MathMarks}</p>
                <p><span className="font-medium">{values.class12Subject4}:</span> {values.class12Subject4Marks}</p>
                <p><span className="font-medium">{values.class12Subject5}:</span> {values.class12Subject5Marks}</p>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;
