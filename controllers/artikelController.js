const Article = require('../models/Artikel');

exports.create = (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.path : '';
    Article.create({ title, content, image }, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating article' });
        }
        res.status(201).json({ message: 'Article created successfully', articleId: result.insertId });
    });
};

exports.getAll = (req, res) => {
    Article.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching articles' });
        }
        res.status(200).json(results);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;
    Article.getById(id, (err, result) => {
        if (err || !result) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(result);
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { title, content, image } = req.body;
    Article.update(id, { title, content, image }, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating article' });
        }
        res.status(200).json({ message: 'Article updated successfully' });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    Article.delete(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting article' });
        }
        res.status(200).json({ message: 'Article deleted successfully' });
    });
};
