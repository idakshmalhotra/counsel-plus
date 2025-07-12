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


      </div>
    </div>
  );
};

export default PreviewStep;
