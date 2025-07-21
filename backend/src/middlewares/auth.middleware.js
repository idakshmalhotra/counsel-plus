import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Proceed to route handler
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default authMiddleware;
