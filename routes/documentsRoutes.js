const express = require('express');
const multer = require('multer');
const documentController = require('../controllers/documentController');

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Routes for documents
router.get('/', documentController.getAll); // View all documents
router.get('/create', (req, res) => {
    console.log("Route /documents/create hit");
    res.render('documents/create');
});

router.post('/', upload.single('file'), documentController.create); // Create document
router.get('/edit/:id', documentController.getByIdForEdit); // Form to edit a document
router.post('/:id?_method=PUT', upload.single('file'), documentController.update); // Update document
router.post('/:id?_method=DELETE', documentController.delete); // Delete document

module.exports = router;