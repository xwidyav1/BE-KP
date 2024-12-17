const express = require('express');
const router = express.Router();
const articleController = require('../controllers/artikelController');

// Route untuk mendapatkan semua artikel
//router.get('/', articleController.getArticles);

// Route untuk menambahkan artikel
//router.post('/', articleController.createArticle);

// Route untuk menghapus artikel
//router.delete('/:id', articleController.deleteArticle);

module.exports = router;
