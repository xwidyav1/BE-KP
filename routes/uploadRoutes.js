const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');

// Route untuk menangani pengunggahan file
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (req.file) {
      // Jika file berhasil diunggah, kirim response dengan informasi file
      res.json({
        message: 'File berhasil diunggah',
        file: req.file
      });
    } else {
      res.status(400).json({ message: 'Tidak ada file yang diunggah' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengunggah file', error: error.message });
  }
});

module.exports = router;
