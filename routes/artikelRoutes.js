const express = require('express');
const multer = require('multer');
const articleController = require('../controllers/artikelController');

const router = express.Router();

// Multer setup for image uploads
const upload = multer({ dest: 'uploads/' });

// Routes for articles
router.get('/articles', articleController.getAll); // View all articles
router.get('/articles/create', (req, res) => res.render('artikel/create')); // Form to create an article
router.post('/articles', upload.single('image'), articleController.create); // Create article
router.get('/articles/edit/:id', articleController.getByIdForEdit); // Form to edit an article
router.post('/articles/:id?_method=PUT', upload.single('image'), articleController.update); // Update article
router.post('/articles/:id?_method=DELETE', articleController.delete); // Delete article

module.exports = router;
