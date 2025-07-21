import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

function adminMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res.status(401).json({ message: "Missing or invalid auth header" });
    }
  
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(":");
  
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  }
  
  export default adminMiddleware;
  