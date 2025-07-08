import React from "react";

const PreviewStep = ({ values, prevStep }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Preview Submission</h2>

      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Name:</strong> {values.name}</p>
        <p><strong>Father's Name:</strong> {values.fathersName}</p>
        <p><strong>Phone:</strong> {values.phone}</p>
        <p><strong>Email:</strong> {values.emailId}</p>
        <p><strong>JEE Rank:</strong> {values.jeeRank}</p>

        {/* ...Add other fields here as needed... */}

        {values.pdfFile && values.pdfFile instanceof File ? (
          <div className="mt-4">
            <p className="font-medium">Uploaded PDF Preview:</p>
            <iframe
              src={URL.createObjectURL(values.pdfFile)}
              title="Uploaded PDF"
              width="100%"
              height="400px"
              className="border border-gray-300 rounded"
            />
          </div>
        ) : (
          <p className="text-red-500 mt-4">No PDF file selected</p>
        )}
      </div>
    </div>
  );
};

export default PreviewStep;
