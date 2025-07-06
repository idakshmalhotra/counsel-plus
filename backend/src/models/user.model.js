import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Personal Details
  name: { type: String, required: false, maxlength: 50 },
  fathersName: { type: String, required: false, maxlength: 50 },
  gender: { type: String, required: false, enum: ['male', 'female', 'other'] },
  category: { type: String, required: false, enum: ['general', 'sc', 'st', 'obc', 'other'] },
  dateOfBirth: { type: Date, required: false },
  phone: { type: String, required: false, match: /^[6-9]\d{9}$/ },
  fathersPhone: { type: String, required: false, match: /^[6-9]\d{9}$/ },
  emailId: { type: String, required: false, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  jeeRollNo: { type: String, required: false, match: /^[0-9]+$/ },
  jeeRank: { type: Number, required: false, min: 1 },

  // Address Details
  permanentAddress: { type: String, required: false, maxlength: 255 },
  permanentState: { type: String, required: false, maxlength: 100 },
  permanentDistrict: { type: String, required: false, maxlength: 100 },
  permanentPin: { type: String, required: false, match: /^\d{6}$/ },
  currentAddress: { type: String, required: false, maxlength: 255 },
  currentState: { type: String, required: false, maxlength: 100 },
  currentDistrict: { type: String, required: false, maxlength: 100 },
  currentPin: { type: String, required: false, match: /^\d{6}$/ },

  // Education Details
  class10School: { type: String, required: false, maxlength: 255 },
  class10Board: { type: String, required: false },
  class10Percentage: { type: Number, required: false, min: 0, max: 100 },
  class10TotalMarks: { type: Number, required: false, min: 0 },
  class12School: { type: String, required: false, maxlength: 255 },
  class12Board: { type: String, required: false },
  class12Percentage: { type: Number, required: false, min: 0, max: 100 },
  class12TotalMarks: { type: Number, required: false, min: 0 },
  class12PCMPercentage: { type: Number, required: false, min: 0, max: 100 },
  class12PhysicsMarks: { type: Number, required: false, min: 0, max: 100 },
  class12ChemistryMarks: { type: Number, required: false, min: 0, max: 100 },
  class12MathMarks: { type: Number, required: false, min: 0, max: 100 },
  class12Subject4: { type: String, required: false, maxlength: 255 },
  class12Subject4Marks: { type: Number, required: false, min: 0, max: 100 },
  class12Subject5: { type: String, required: false, maxlength: 255 },
  class12Subject5Marks: { type: Number, required: false, min: 0, max: 100 },

  // Photo & Signature URLs (Cloudinary)
  photo: { type: String, required: false },
  signature: { type: String, required: false },

  // Document URLs (Cloudinary)
  documents: {
    jeeAdmitCard: { type: String, required: false },
    jeeResult: { type: String, required: false },
    registrationSlip: { type: String, required: false },
    allotmentLetter: { type: String, required: false },
    academicFeeReceipt: { type: String, required: false },
    balanceFeeReceipt: { type: String, required: false },
    tenthCertificate: { type: String, required: false },
    twelfthCertificate: { type: String, required: false },
    casteCertificate: { type: String },
    medicalFitness: { type: String, required: false },
    characterCertificate: { type: String, required: false },
    photographs: { type: String, required: false },
    gapYearUndertaking: { type: String },
    antiRaggingStudent: { type: String, required: false },
    antiRaggingParent: { type: String, required: false },
    attendanceStudent: { type: String, required: false },
    attendanceParent: { type: String, required: false }
  },

  // Payment Details
  
  


  submittedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const User = mongoose.model("User", userSchema)