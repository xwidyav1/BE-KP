const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const galleryController = require('../controllers/galleryController');

const router = express.Router();

// Routes for gallery
router.get('/', galleryController.getAll); // View all gallery items
router.get('/create', (req, res) => {
    console.log("Route /gallery/create hit");
    res.render('gallery/create');
});

router.post('/', upload.single('galleryFile'), galleryController.create); // Create gallery item
router.get('/edit/:id', galleryController.getByIdForEdit); // Form to edit a gallery item
router.post('/:id?_method=PUT', upload.single('galleryFile'), galleryController.update); // Update gallery item
router.post('/:id?_method=DELETE', galleryController.delete); // Delete gallery item

module.exports = router;