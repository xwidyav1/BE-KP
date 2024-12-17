const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// Routes untuk Galeri
//router.post('/create', galleryController.create);  // Menambahkan media baru
//router.get('/', galleryController.getAll);         // Mendapatkan semua media
//router.get('/:id', galleryController.getById);     // Mendapatkan media berdasarkan ID
//router.put('/:id', galleryController.update);      // Memperbarui media berdasarkan ID
//router.delete('/:id', galleryController.delete);   // Menghapus media berdasarkan ID

module.exports = router;
