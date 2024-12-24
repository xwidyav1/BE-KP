const express = require('express');
const multer = require('multer');
const articleController = require('../controllers/artikelController');

const router = express.Router();

// Multer setup for image uploads
const upload = require('../middleware/uploadMiddleware');

// Routes for articles
router.get('/', articleController.getAll); // View all articles
router.get('/create', (req, res) => {
    console.log("Route /artikel/create hit");
    res.render('artikel/create');
});

router.post('/', upload.single('image'), articleController.create); // Create article
router.get('/edit/:id', articleController.getByIdForEdit); // Form to edit an article
router.post('/:id?_method=PUT', upload.single('image'), articleController.update); // Update article
router.post('/:id?_method=DELETE', articleController.delete); // Delete article

module.exports = router;
