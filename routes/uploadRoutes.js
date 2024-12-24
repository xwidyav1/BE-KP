
const express = require('express');
const router = express.Router();

// Import middleware untuk upload
const { uploadArticleImage, uploadGalleryFile, uploadDocumentFile } = require('../middleware/uploadMiddleware');

// Import controller untuk artikel, galeri, dan dokumen
const articleController = require('../controllers/artikelController');
const galleryController = require('../controllers/galleryController');
const documentController = require('../controllers/documentController');


router.post('/upload/article', uploadArticleImage.single('articleImage'), articleController.uploadArticleImage);

router.post('/upload/gallery', uploadGalleryFile.single('galleryFile'), galleryController.uploadGalleryFile);

router.post('/upload/document', uploadDocumentFile.single('documentFile'), documentController.uploadDocumentFile);

module.exports = router;
