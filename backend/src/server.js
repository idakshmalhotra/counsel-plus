import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { AuthUser } from "./models/auth-user.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

const app = express();
const PORT = 3000;
app.use(cors({
  origin: "http://localhost:5173", // Adjust this to your frontend URL
  credentials: true // Allow credentials to be sent
}));

const JWT_SECRET = "1234567890";

app.use(express.json());


async function startServer() {
  try {
    await mongoose.connect(
      ""
    );
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer(); 


app.get("/", (req, res) => {
  res.json("hi there");
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    await AuthUser.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and password are required" });
    }

    const existingUser = await AuthUser.findOne({ username });
    if (!existingUser) {
      return res.status(403).json({ msg: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password || '');
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (e) {
    console.error("Error signing in:", e);
    res.status(500).json({ msg: "Error signing in" });
  }
});
app.get("/dashboard", async (req, res) => {
  try {
    // Just return some dummy data for testing or public dashboard
    res.json({
      username: "Guest",
      email: "guest@example.com",
    });
  } catch (e) {
    console.error("Error in dashboard route:", e);
    res.status(500).json({ msg: "Internal server error" });
  }
});

