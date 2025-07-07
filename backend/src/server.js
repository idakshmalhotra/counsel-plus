import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config"; // Load environment variables from .env file
import { AuthUser } from "./models/auth-user.js";
import { User } from "./models/user.model.js";
import authMiddleware from "./middlewares/auth.middleware.js";

const app = express();
const PORT = 3000;
const JWT_SECRET = "1234567890";

app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// CORS config
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Removed multer import and usage

async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://kbharat84265:SjgpL1UbSskmfFBO@cluster0.tfyruuc.mongodb.net/test04"
    );
    console.log(" MongoDB connected");

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" MongoDB connection error:", error);
  }
}
startServer();

cloudinary.config({
  cloud_name: 'djhohxhtj',
  api_key: '932662126337887',
  api_secret: 'Im241iihWcHsyMz1id-fssEX_Sc'
});

// Test route
app.get("/", (req, res) => {
  res.json("Server is live");
});

// User Signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await AuthUser.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await AuthUser.findOne({ username });
    if (!user) return res.status(403).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (e) {
    console.error("Signin error:", e);
    res.status(500).json({ msg: "Error signing in" });
  }
});

// Token validation
app.get("/api/validate-token", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ valid: true, userId: decoded.id });
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
});

app.get("/dashboard", (req, res) => {
  res.json({ username: "Guest", email: "guest@example.com" });
});

app.post("/api/form/submit-form",authMiddleware, async (req, res) => {
  try {
    const { pdf } = req.files;

    if (!pdf) {
      return res.status(400).json({ message: "PDF is required" });
    }

    // Upload PDF to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(pdf.tempFilePath, {
      folder: "admission-pdfs",
      resource_type: "raw", // 🔑 Important for non-image files
    });

    const formData = {
      ...req.body,
      pdfUrl: uploadResult.secure_url, // You can name this field anything
    };

    // Convert dateOfBirth to Date object
    if (formData.dateOfBirth) {
      formData.dateOfBirth = new Date(formData.dateOfBirth);
    }

    // Convert number fields
    const numberFields = [
      "jeeRank",
      "class10Percentage",
      "class10TotalMarks",
      "class12Percentage",
      "class12TotalMarks",
      "class12PCMPercentage",
      "class12PhysicsMarks",
      "class12ChemistryMarks",
      "class12MathMarks",
      "class12Subject4Marks",
      "class12Subject5Marks",
    ];
    numberFields.forEach((key) => {
      if (formData[key]) {
        formData[key] = Number(formData[key]);
      }
    });

    // Trim string fields to prevent validation errors
    const trimFields = ["gender", "category", "phone", "fathersPhone"];
    trimFields.forEach((key) => {
      if (formData[key]) {
        formData[key] = formData[key].trim();
      }
    });

    // Save to DB
    const savedUser = await User.create(formData);

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      submissionId: savedUser._id,
    });
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({ message: "Failed to submit form" });
  }
});
