import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET
  || "1234567890"; // Default secret, should be replaced with a secure one in production


 function authMiddleware(req, res, next) {
  const token = req.headers.token;
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}
export default authMiddleware;