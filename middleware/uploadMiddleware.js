const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    // Menyimpan file dengan nama asli
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filter file berdasarkan tipe
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'articleImage' || file.fieldname === 'galleryFile') {
    // Hanya menerima file gambar untuk artikel dan galeri
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for articles and gallery'), false);
    }
  } else if (file.fieldname === 'documentFile') {
    // Menerima semua jenis file untuk dokumen
    cb(null, true);
  } else {
    cb(new Error('Invalid field name'), false);
  }
};

// Konfigurasi multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Batas ukuran file 5MB
});

module.exports = upload;