import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

import { AuthUser } from "./models/auth-user.js";
import { User } from "./models/user.model.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import adminMiddleware from "./middlewares/adminMiddleware.js";

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "1234567890";

// ✅ File Upload
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// ✅ CORS
const allowedOrigins = [
  "http://localhost:5173", // Development
  "http://counsel-app-plus.s3-website.eu-north-1.amazonaws.com", // Production
  "https://counsel-app-plus.s3-website.eu-north-1.amazonaws.com" // Production with HTTPS
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// ✅ Body Parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ Connect to MongoDB
async function startServer() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://kbharat84265:SjgpL1UbSskmfFBO@cluster0.tfyruuc.mongodb.net/test04"
    );
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server at http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}
startServer();

// ✅ Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "djhohxhtj",
  api_key: process.env.CLOUDINARY_API_KEY || "932662126337887",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Routes
app.get("/", (req, res) => {
  res.json("Server is live");
});

// ✅ Signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
``
  try {
    const existingUser = await AuthUser.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(409).json({ message: "Username or email exists" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    await AuthUser.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Signin — returns role ("admin" or "user")
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await AuthUser.findOne({ username });
    if (!user) return res.status(403).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    const role = username === "admin" ? "admin" : "user";

    res.json({ token, role });
  } catch (e) {
    console.error("Signin error:", e);
    res.status(500).json({ msg: "Error signing in" });
  }
});

// ✅ Token validation
app.get("/api/validate-token", authMiddleware, (req, res) => {
  res.status(200).json({ valid: true, userId: req.user.id });
});

// ✅ Form submission
app.post("/api/form/submit-form", authMiddleware, async (req, res) => {
  try {
    console.log("Received form data:", req.body);
    console.log("User ID from token:", req.user.id);

    // Handle JSON data
    const formData = {
      ...req.body,
      userId: req.user.id, // Add user ID from JWT token
    };

    // Convert dates and numbers
    if (formData.dateOfBirth) {
      formData.dateOfBirth = new Date(formData.dateOfBirth);
    }

    const numberFields = [
      "jeeRank", "class10Percentage", "class10TotalMarks",
      "class12Percentage", "class12TotalMarks", "class12PCMPercentage",
      "class12PhysicsMarks", "class12ChemistryMarks", "class12MathMarks",
      "class12Subject4Marks", "class12Subject5Marks",
    ];
    
    numberFields.forEach((key) => {
      if (formData[key] && formData[key] !== "") {
        formData[key] = Number(formData[key]);
      }
    });

    const trimFields = ["gender", "category", "phone", "fathersPhone", "branch"];
    trimFields.forEach((key) => {
      if (formData[key]) {
        formData[key] = formData[key].trim();
      }
    });

    // Check if user already has a form submission
    const existingForm = await User.findOne({ userId: req.user.id });
    if (existingForm) {
      return res.status(409).json({ 
        message: "Form already submitted", 
        id: existingForm._id 
      });
    }

    console.log("Processed form data:", formData);
    const savedUser = await User.create(formData);
    
    console.log("Form saved successfully:", savedUser._id);
    res.status(201).json({ 
      success: true, 
      message: "Form submitted successfully", 
      id: savedUser._id 
    });
  } catch (error) {
    console.error("Form submission error:", error);
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      }));
      
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ 
      message: "Failed to submit form", 
      error: error.message 
    });
  }
});

// ✅ Admin-only route with Basic Auth
app.get("/api/admin/all-submissions", adminMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: "Failed to fetch student data" });
  }
});

// ✅ Route for dashboard to view submitted applications (JWT auth)
app.get("/api/submissions", authMiddleware, async (req, res) => {
  try {
    // Only fetch students who have submitted their applications
    // We can identify submitted applications by checking if they have required fields
    const submittedApplications = await User.find({
      $and: [
        { name: { $exists: true, $ne: "" } },
        { emailId: { $exists: true, $ne: "" } },
        { jeeRank: { $exists: true, $ne: "" } },
        { phone: { $exists: true, $ne: "" } }
      ]
    }).sort({ createdAt: -1 });
    
    res.json(submittedApplications);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: "Failed to fetch student data" });
  }
});
app.get("/api/user/form", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await User.findOne({ userId }); // Assuming userId is saved in form
    if (!data) return res.status(404).json({ message: "No form found" });
    res.json(data);
  } catch (err) {
    console.error("Fetch user form error:", err);
    res.status(500).json({ message: "Failed to fetch form data" });
  }
});