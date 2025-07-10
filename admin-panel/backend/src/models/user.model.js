import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Personal Details
  name: { type: String, required: true, maxlength: 50 },
  fathersName: { type: String, required: true, maxlength: 50 },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  category: { type: String, required: true, enum: ['general', 'sc', 'st', 'obc', 'other'] },
  dateOfBirth: { type: Date, required: true },
  phone: { type: String, required: true, match: /^[6-9]\d{9}$/ },
  fathersPhone: { type: String, required: true, match: /^[6-9]\d{9}$/ },
  emailId: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  jeeRollNo: { type: String, required: true, match: /^[0-9]+$/ },
  jeeRank: { type: Number, required: true, min: 1 },

  // Address Details
  permanentAddress: { type: String, required: true, maxlength: 255 },
  permanentState: { type: String, required: true, maxlength: 100 },
  permanentDistrict: { type: String, required: true, maxlength: 100 },
  permanentPin: { type: String, required: true, match: /^\d{6}$/ },
  currentAddress: { type: String, required: true, maxlength: 255 },
  currentState: { type: String, required: true, maxlength: 100 },
  currentDistrict: { type: String, required: true, maxlength: 100 },
  currentPin: { type: String, required: true, match: /^\d{6}$/ },

  // Education Details
  class10School: { type: String, required: true, maxlength: 255 },
  class10Board: { type: String, required: true },
  class10Percentage: { type: Number, required: true, min: 0, max: 100 },
  class10TotalMarks: { type: Number, required: true, min: 0 },
  class12School: { type: String, required: true, maxlength: 255 },
  class12Board: { type: String, required: true },
  class12Percentage: { type: Number, required: true, min: 0, max: 100 },
  class12TotalMarks: { type: Number, required: true, min: 0 },
  class12PCMPercentage: { type: Number, required: true, min: 0, max: 100 },
  class12PhysicsMarks: { type: Number, required: true, min: 0, max: 100 },
  class12ChemistryMarks: { type: Number, required: true, min: 0, max: 100 },
  class12MathMarks: { type: Number, required: true, min: 0, max: 100 },
  class12Subject4: { type: String, required: true, maxlength: 255 },
  class12Subject4Marks: { type: Number, required: true, min: 0, max: 100 },
  class12Subject5: { type: String, required: true, maxlength: 255 },
  class12Subject5Marks: { type: Number, required: true, min: 0, max: 100 },

  // Photo & Signature URLs (Cloudinary)
  pdfUrl: { type: String, required: false },
  

  // Document URLs (Cloudinary)
 

  // Payment Details
  
  


  submittedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const User = mongoose.model("User", userSchema)