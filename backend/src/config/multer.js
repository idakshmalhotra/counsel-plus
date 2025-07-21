import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create uploads directory structure based on file type
    let uploadPath;
    
    if (file.fieldname === 'photo' || file.fieldname === 'signature') {
      uploadPath = path.join(__dirname, '../../uploads/images/');
    } else if (file.fieldname.startsWith('documents.')) {
      uploadPath = path.join(__dirname, '../../uploads/documents/');
    } else {
      uploadPath = path.join(__dirname, '../../uploads/');
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const sanitizedFieldname = file.fieldname.replace(/\./g, '_'); // Replace dots with underscores
    cb(null, sanitizedFieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Create multer instance for handling all uploads
export const uploadAll = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760, // 10MB default
    files: parseInt(process.env.MAX_FILES_COUNT) || 20 // Default max files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed'), false);
    }
  }
});