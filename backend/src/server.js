import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

import { AuthUser } from "./models/auth-user.js";
import { User } from "./models/user.model.js";

const app = express();
const PORT = 3000;
const JWT_SECRET = "1234567890";

// CORS config
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));



const storage = multer.memoryStorage(); 
const upload = multer({ storage });

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
 
app.post("/api/form/submit-form", upload.any(), async (req, res) => {
  try {
    const data = {};

  
    req.body && Object.assign(data, req.body);

    if (req.files) {
      req.files.forEach((file) => {
        data[file.fieldname] = {
          originalname: file.originalname,
          mimetype: file.mimetype,
          buffer: file.buffer.toString("base64"), 
        };
      });
    }

    const saved = await User.create(data);
    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      submissionId: saved._id,
    });
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({ message: "Failed to submit form" });
  }
});
