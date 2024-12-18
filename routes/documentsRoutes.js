const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// Rute untuk menambahkan dokumen baru
router.post('/', documentController.create);

// Rute untuk mendapatkan semua dokumen
router.get('/', documentController.getAll);

// Rute untuk mendapatkan dokumen berdasarkan ID
router.get('/:id', documentController.getById);

// Rute untuk memperbarui dokumen
router.put('/:id', documentController.update);

// Rute untuk menghapus dokumen
router.delete('/:id', documentController.delete);

module.exports = router;
