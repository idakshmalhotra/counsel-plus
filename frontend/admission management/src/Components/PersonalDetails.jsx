import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import { FiArrowRight } from "react-icons/fi";

const PersonalDetails = ({ nextStep }) => {
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

  const branchOptions = [
    { value: "computer-science", label: "Computer Science Engineering" },
    { value: "mechanical", label: "Mechanical Engineering" },
    { value: "electrical", label: "Electrical Engineering" },
    { value: "electronics", label: "Electronics & Communication Engineering" },
    { value: "civil", label: "Civil Engineering" },
    { value: "chemical", label: "Chemical Engineering" },
    { value: "biotechnology", label: "Biotechnology Engineering" },
    { value: "information-technology", label: "Information Technology" },
    { value: "aerospace", label: "Aerospace Engineering" },
    { value: "automobile", label: "Automobile Engineering" },
    { value: "agricultural", label: "Agricultural Engineering" },
    { value: "textile", label: "Textile Engineering" },
    { value: "metallurgical", label: "Metallurgical Engineering" },
    { value: "mining", label: "Mining Engineering" },
    { value: "petroleum", label: "Petroleum Engineering" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-8 text-center">Personal Details</h2>

      <div className="w-full max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={() => setFieldTouched("name")}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              placeholder="Enter your full name"
            />
            {touched.name && errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Father's Name</label>
            <input
              name="fathersName"
              value={values.fathersName}
              onChange={handleChange}
              onBlur={() => setFieldTouched("fathersName")}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Enter father's full name"
            />
            {touched.fathersName && errors.fathersName && <div className="text-red-500 text-sm">{errors.fathersName}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={() => setFieldTouched("gender")}
              className="mt-1 block w-full p-2 border rounded-md"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {touched.gender && errors.gender && <div className="text-red-500 text-sm">{errors.gender}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={() => setFieldTouched("category")}
              className="mt-1 block w-full p-2 border rounded-md"
            >
              <option value="">Select</option>
              <option value="general">General</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
              <option value="obc">OBC</option>
              <option value="other">Other</option>
            </select>
            {touched.category && errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={values.dateOfBirth}
              onChange={handleChange}
              onBlur={() => setFieldTouched("dateOfBirth")}
              className="mt-1 block w-full p-2 border rounded-md"
            />
            {touched.dateOfBirth && errors.dateOfBirth && <div className="text-red-500 text-sm">{errors.dateOfBirth}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={() => setFieldTouched("phone")}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Enter your phone number (10 digits starting with 6-9)"
            />
            {touched.phone && errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Father's Phone</label>
            <input
              name="fathersPhone"
              value={values.fathersPhone}
              onChange={handleChange}
              onBlur={() => setFieldTouched("fathersPhone")}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Enter father's phone number (10 digits starting with 6-9)"
            />
            {touched.fathersPhone && errors.fathersPhone && <div className="text-red-500 text-sm">{errors.fathersPhone}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Father's Email</label>
            <input
              name="fathersEmail"
              type="email"
              value={values.fathersEmail}
              onChange={handleChange}
              onBlur={() => setFieldTouched("fathersEmail")}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Enter father's email address"
            />
            {touched.fathersEmail && errors.fathersEmail && <div className="text-red-500 text-sm">{errors.fathersEmail}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              name="emailId"
              type="email"
              value={values.emailId}
              onChange={handleChange}
              onBlur={() => setFieldTouched("emailId")}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Enter your email address"
            />
            {touched.emailId && errors.emailId && <div className="text-red-500 text-sm">{errors.emailId}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">JEE Roll No</label>
            <input
              name="jeeRollNo"
              type="text"
              value={values.jeeRollNo}
              onChange={handleChange}
              onBlur={() => setFieldTouched("jeeRollNo")}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Enter your JEE roll number"
            />
            {touched.jeeRollNo && errors.jeeRollNo && <div className="text-red-500 text-sm">{errors.jeeRollNo}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">JEE Rank</label>
            <input
              name="jeeRank"
              type="number"
              value={values.jeeRank}
              onChange={handleChange}
              onBlur={() => setFieldTouched("jeeRank")}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Enter your JEE rank"
            />
            {touched.jeeRank && errors.jeeRank && <div className="text-red-500 text-sm">{errors.jeeRank}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Preference</label>
            <select
              name="branch"
              value={values.branch}
              onChange={handleChange}
              onBlur={() => setFieldTouched("branch")}
              className="mt-1 block w-full p-2 border rounded-md"
            >
              <option value="">Select Branch</option>
              {branchOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {touched.branch && errors.branch && <div className="text-red-500 text-sm">{errors.branch}</div>}
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>Continue</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
