import React from "react";
import { useFormikContext } from "formik";

const Documents = ({ nextStep }) => {
  const { values, setFieldValue } = useFormikContext();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFieldValue("documents", files);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Documents</h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="w-full border border-gray-300 p-2 rounded-md"
      />

      <div className="mt-4">
        {values.documents && values.documents.length > 0 && (
          <ul className="list-disc ml-6 text-sm text-gray-600">
            {values.documents.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        )}
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

export default Documents;
