import React from "react";
import { useFormikContext } from "formik";

const PdfUpload = ({ nextStep, prevStep }) => {
  const { setFieldValue, values } = useFormikContext();

  const handlePdfChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file && file.type === "application/pdf") {
      setFieldValue("pdfFile", file);
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload PDF Document</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handlePdfChange}
        className="w-full border border-gray-300 p-2 rounded"
      />

      {values.pdfFile && (
        <p className="mt-2 text-sm text-green-600">Selected: {values.pdfFile.name}</p>
      )}

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfUpload;
