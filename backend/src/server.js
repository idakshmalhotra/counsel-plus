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
app.use(
  cors({
    origin: "http://localhost:5173",
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

// ✅ Form submission with Cloudinary PDF upload
app.post("/api/form/submit-form", async (req, res) => {
  try {
    const { pdf } = req.files;
    if (!pdf) return res.status(400).json({ message: "PDF is required" });

    const uploadResult = await cloudinary.uploader.upload(pdf.tempFilePath, {
      folder: "admission-pdfs",
      resource_type: "raw",
    });

    const formData = {
      ...req.body,
      pdfUrl: uploadResult.secure_url,
    };

    // Convert dates and numbers
    if (formData.dateOfBirth) formData.dateOfBirth = new Date(formData.dateOfBirth);

    const numberFields = [
      "jeeRank", "class10Percentage", "class10TotalMarks",
      "class12Percentage", "class12TotalMarks", "class12PCMPercentage",
      "class12PhysicsMarks", "class12ChemistryMarks", "class12MathMarks",
      "class12Subject4Marks", "class12Subject5Marks",
    ];
    numberFields.forEach((key) => {
      if (formData[key]) formData[key] = Number(formData[key]);
    });

    const trimFields = ["gender", "category", "phone", "fathersPhone"];
    trimFields.forEach((key) => {
      if (formData[key]) formData[key] = formData[key].trim();
    });

    const savedUser = await User.create(formData);
    res.status(201).json({ success: true, message: "Form submitted", id: savedUser._id });
  } catch (error) {
    console.error("Form error:", error);
    res.status(500).json({ message: "Failed to submit form", error: error.message });
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
