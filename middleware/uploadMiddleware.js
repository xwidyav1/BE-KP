// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Konfigurasi storage untuk upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads/'; // Folder umum untuk semua file

    // Menentukan folder berdasarkan fieldname (artikel, galeri, dokumen)
    if (file.fieldname === 'articleImage') {
      folder += 'articles/'; // Menyimpan gambar artikel di folder 'uploads/articles'
    } else if (file.fieldname === 'galleryFile') {
      folder += 'gallery/'; // Menyimpan media galeri di folder 'uploads/gallery'
    } else if (file.fieldname === 'documentFile') {
      folder += 'documents/'; // Menyimpan dokumen di folder 'uploads/documents'
    }

    // Pastikan folder sudah ada atau buat jika belum
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Ekstensi file
    cb(null, `${Date.now()}-${file.fieldname}${ext}`); // Nama file unik berdasarkan timestamp
  },
});

// Filter untuk membatasi tipe file yang diizinkan
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|pdf/;  // Jenis file yang diizinkan (gambar, video, PDF)
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);  // File diterima
  } else {
    cb(new Error('File format not supported'));  // Error jika format tidak didukung
  }
};

// Middleware untuk upload artikel (gambar)
const uploadArticleImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },  // Batas ukuran file (5MB) untuk artikel
});

// Middleware untuk upload galeri (gambar/video)
const uploadGalleryFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },  // Batas ukuran file (10MB) untuk galeri
});

// Middleware untuk upload dokumen (PDF atau lainnya)
const uploadDocumentFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },  // Batas ukuran file (20MB) untuk dokumen
});

module.exports = { uploadArticleImage, uploadGalleryFile, uploadDocumentFile };
