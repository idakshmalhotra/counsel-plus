import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

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

// File filter for different file types
const fileFilter = (req, file, cb) => {
  // Define allowed file types based on field
  let allowedTypes;
  
  if (file.fieldname === 'photo' || file.fieldname === 'signature' || file.fieldname === 'documents.photographs') {
    // Images only
    allowedTypes = /jpeg|jpg|png|gif/;
  } else {
    // Documents (including images)
    allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  }
  
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    if (file.fieldname === 'photo' || file.fieldname === 'signature' || file.fieldname === 'documents.photographs') {
      cb(new Error('Only image files (JPEG, JPG, PNG, GIF) are allowed for photos and signatures'));
    } else {
      cb(new Error('Only images and documents (JPEG, JPG, PNG, GIF, PDF, DOC, DOCX) are allowed'));
    }
  }
};

// Create multer instance for handling all uploads
export const uploadAll = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (matching your error handler)
    files: 20 // Maximum number of files (you have about 19 fields)
  },
  fileFilter: fileFilter
});

// Export default for backward compatibility
export default uploadAll;