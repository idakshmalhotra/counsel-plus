import React from "react";
import { useFormikContext } from "formik";

const Confirmation = () => {
  const { values } = useFormikContext();

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Confirm Your Details</h2>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <p><strong>Name:</strong> {values.name}</p>
          <p><strong>Gender:</strong> {values.gender}</p>
          <p><strong>Date of Birth:</strong> {values.dateOfBirth}</p>
          <p><strong>Phone:</strong> {values.phone}</p>
          <p><strong>Email:</strong> {values.emailId}</p>
          <p><strong>JEE Roll No:</strong> {values.jeeRollNo}</p>
          <p><strong>JEE Rank:</strong> {values.jeeRank}</p>
        </div>

        <hr />

        <div className="grid md:grid-cols-2 gap-4">
          <p><strong>Permanent Address:</strong> {values.addressLine1}, {values.addressLine2}, {values.city}, {values.state} - {values.zipCode}</p>
          <p><strong>Father's Name:</strong> {values.fathersName}</p>
          <p><strong>Father's Phone:</strong> {values.fathersPhone}</p>
          <p><strong>Category:</strong> {values.category}</p>
        </div>

        <hr />

        <div>
          <p><strong>Uploaded Documents:</strong></p>
          <ul className="list-disc ml-5 text-sm">
            {values.documents?.map((doc, idx) => (
              <li key={idx}>{doc.name}</li>
            ))}
          </ul>
        </div>



        <div className="mt-6">
          <p className="text-sm text-gray-600">Please verify all details before submitting.</p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
