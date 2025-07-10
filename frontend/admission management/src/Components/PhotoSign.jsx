import React from "react";
import { useFormikContext } from "formik";

const PhotoSign = ({ nextStep }) => {
  const { setFieldValue, values } = useFormikContext();

  const handleFileChange = (e, field) => {
    const file = e.currentTarget.files[0];
    setFieldValue(field, file);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Photo & Signature</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Upload Passport Size Photo *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "photo")}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {values.photo && (
            <img
              src={URL.createObjectURL(values.photo)}
              alt="Preview"
              className="mt-2 h-24 object-contain rounded"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload Signature *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "signature")}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {values.signature && (
            <img
              src={URL.createObjectURL(values.signature)}
              alt="Signature Preview"
              className="mt-2 h-24 object-contain rounded"
            />
          )}
        </div>
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

export default PhotoSign;
