import React, { useEffect } from "react";
import { useFormikContext } from "formik";

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

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Details</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={() => setFieldTouched("name")}
            className="mt-1 block w-full p-2 border rounded-md"
            placeholder="Enter your full name"
          />
          {touched.name && errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
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
            placeholder="Enter your phone number"
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
            placeholder="Enter father's phone number"
          />
          {touched.fathersPhone && errors.fathersPhone && <div className="text-red-500 text-sm">{errors.fathersPhone}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="emailId"
            type="email"
            value={values.emailId}
            onChange={handleChange}
            onBlur={() => setFieldTouched("emailId")}
            className="mt-1 block w-full p-2 border rounded-md"
            placeholder="Enter your email"
          />
          {touched.emailId && errors.emailId && <div className="text-red-500 text-sm">{errors.emailId}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">JEE Roll No</label>
          <input
            name="jeeRollNo"
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
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
