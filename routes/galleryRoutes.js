const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const uploadRoutes = require('./uploadRoutes');

// Menambahkan media baru ke gallery
router.post('/gallery', galleryController.create);

// Mendapatkan semua media dari gallery
router.get('/gallery', galleryController.getAll);

// Mendapatkan media berdasarkan ID
router.get('/gallery/:id', galleryController.getById);

// Memperbarui media di gallery berdasarkan ID
router.put('/gallery/:id', galleryController.update);

// Menghapus media dari gallery berdasarkan ID
router.delete('/gallery/:id', galleryController.delete);

// Rute unggahan file
router.use(uploadRoutes);

module.exports = router;
