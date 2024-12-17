const multer = require('multer');
const path = require('path');

// Konfigurasi storage file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Simpan file di folder 'uploads'
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Ekstensi file
    cb(null, `${Date.now()}-${file.fieldname}${ext}`); // Nama file unik berdasarkan timestamp dan fieldname
  },
});

// Membuat instance multer dengan konfigurasi upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Batas ukuran file (10MB)
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true); // File valid
    } else {
      return cb(new Error('File format not supported. Allowed formats: jpeg, jpg, png, gif, mp4, pdf.'));
    }
  },
});

module.exports = upload;
