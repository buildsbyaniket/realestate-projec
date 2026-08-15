// middleware/upload.js
// Handles multipart/form-data file uploads for property images using multer
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage to place files in a top‑level "uploads" directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${timestamp}-${random}${ext}`);
  },
});

// Accept only common image types, limit size to 5 MB per file
const fileFilter = (req, file, cb) => {
  console.log('Multer fileFilter - inspecting file:', {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
  });
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExt = ['.jpeg', '.jpg', '.png', '.gif'];
  const isExtValid = allowedExt.includes(ext);
  const isMimeValid = file.mimetype && file.mimetype.startsWith('image/');
  if (isExtValid && isMimeValid) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, png, gif) are allowed'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
