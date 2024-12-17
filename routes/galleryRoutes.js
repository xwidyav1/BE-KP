const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', galleryController.getGallery);
router.post('/', authMiddleware, galleryController.createGalleryItem);
router.put('/:id', authMiddleware, galleryController.updateGalleryItem);
router.delete('/:id', authMiddleware, galleryController.deleteGalleryItem);

module.exports = router;
