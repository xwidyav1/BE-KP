const express = require('express');
const multer = require('multer');
const articleController = require('../controllers/artikelController');

const router = express.Router();

// Setup multer for image upload
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/articles', upload.single('image'), articleController.create);
router.get('/articles', articleController.getAll);
router.get('/articles/:id', articleController.getById);
router.put('/articles/:id', upload.single('image'), articleController.update);
router.delete('/articles/:id', articleController.delete);

module.exports = router;
