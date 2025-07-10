import React from "react";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Forgot Password?</h2>
        <p className="text-gray-700 mb-4">
          If you have forgotten your password, please contact the administrator for assistance.
        </p>
        <p className="text-gray-600">Email: <strong>admin@example.com</strong></p>
        <p className="text-gray-600">Phone: <strong>+91 9876543210</strong></p>
      </div>
    </div>
  );
};

export default ForgotPassword;
