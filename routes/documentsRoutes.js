const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// Routes untuk Dokumen
//router.post('/create', documentController.create);  // Menambahkan dokumen baru
//router.get('/', documentController.getAll);         // Mendapatkan semua dokumen
//router.get('/:id', documentController.getById);     // Mendapatkan dokumen berdasarkan ID
//router.put('/:id', documentController.update);      // Memperbarui dokumen berdasarkan ID
//router.delete('/:id', documentController.delete);   // Menghapus dokumen berdasarkan ID

module.exports = router;
