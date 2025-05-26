import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/resumes/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/pdf|msword|officedocument/)) {
      return cb(new Error('Only PDF/DOC/DOCX allowed'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});
