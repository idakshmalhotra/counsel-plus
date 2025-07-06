import React from "react";

const Confirmation = ({ values }) => {
  const renderField = (label, value) => (
    <p>
      <span className="font-medium">{label}:</span>{" "}
      {value !== "" && value !== undefined ? value.toString() : "Not Provided"}
    </p>
  );

  const renderFilePreview = (file, label) => {
    if (!file) return <p>{label}: Not uploaded</p>;

    if (file instanceof File) {
      const previewUrl = URL.createObjectURL(file);
      return (
        <div className="my-2">
          <p className="font-semibold">{label}</p>
          {file.type.startsWith("image/") ? (
            <img
              src={previewUrl}
              alt={label}
              className="w-48 border rounded shadow"
            />
          ) : (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View {label}
            </a>
          )}
        </div>
      );
    }

    // Handle metadata-only (after page reload)
    return (
      <p className="text-yellow-600 text-sm">
        {label} uploaded, but preview not available (reload resets File object)
      </p>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-2">Review Your Application</h2>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold underline">Personal Details</h3>
        {renderField("Full Name", values.name)}
        {renderField("Father's Name", values.fathersName)}
        {renderField("Gender", values.gender)}
        {renderField("Category", values.category)}
        {renderField("Date of Birth", values.dateOfBirth)}
        {renderField("Phone", values.phone)}
        {renderField("Father's Phone", values.fathersPhone)}
        {renderField("Email", values.emailId)}
        {renderField("JEE Roll No", values.jeeRollNo)}
        {renderField("JEE Rank", values.jeeRank)}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold underline">Address</h3>
        {renderField("Permanent Address", values.permanentAddress)}
        {renderField("Permanent State", values.permanentState)}
        {renderField("Permanent District", values.permanentDistrict)}
        {renderField("Permanent Pin", values.permanentPin)}
        {renderField("Current Address", values.currentAddress)}
        {renderField("Current State", values.currentState)}
        {renderField("Current District", values.currentDistrict)}
        {renderField("Current Pin", values.currentPin)}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold underline">Education</h3>
        {renderField("Class 10 School", values.class10School)}
        {renderField("Class 10 Board", values.class10Board)}
        {renderField("Class 10 %", values.class10Percentage)}
        {renderField("Class 10 Total Marks", values.class10TotalMarks)}
        {renderField("Class 12 School", values.class12School)}
        {renderField("Class 12 Board", values.class12Board)}
        {renderField("Class 12 %", values.class12Percentage)}
        {renderField("PCM %", values.class12PCMPercentage)}
        {renderField("Physics", values.class12PhysicsMarks)}
        {renderField("Chemistry", values.class12ChemistryMarks)}
        {renderField("Maths", values.class12MathMarks)}
        {renderField("Subject 4", values.class12Subject4)}
        {renderField("Subject 4 Marks", values.class12Subject4Marks)}
        {renderField("Subject 5", values.class12Subject5)}
        {renderField("Subject 5 Marks", values.class12Subject5Marks)}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold underline">Uploaded Files</h3>
        {renderFilePreview(values.photo, "Photo")}
        {renderFilePreview(values.signature, "Signature")}
        {renderFilePreview(values.jeeAdmitCard, "JEE Admit Card")}
        {renderFilePreview(values.jeeResult, "JEE Result")}
        {renderFilePreview(values.registrationSlip, "Registration Slip")}
        {renderFilePreview(values.allotmentLetter, "Allotment Letter")}
        {renderFilePreview(values.academicFeeReceipt, "Academic Fee Receipt")}
        {renderFilePreview(values.balanceFeeReceipt, "Balance Fee Receipt")}
        {renderFilePreview(values.tenthCertificate, "10th Certificate")}
        {renderFilePreview(values.twelfthCertificate, "12th Certificate")}
        {renderFilePreview(values.medicalFitness, "Medical Fitness")}
        {renderFilePreview(values.characterCertificate, "Character Certificate")}
        {renderFilePreview(values.photographs, "Photographs")}
        {renderFilePreview(values.gapYearUndertaking, "Gap Year Undertaking")}
        {renderFilePreview(values.antiRaggingStudent, "Anti-Ragging (Student)")}
        {renderFilePreview(values.antiRaggingParent, "Anti-Ragging (Parent)")}
        {renderFilePreview(values.attendanceStudent, "Attendance (Student)")}
        {renderFilePreview(values.attendanceParent, "Attendance (Parent)")}
      </div>
    </div>
  );
};

export default Confirmation;
