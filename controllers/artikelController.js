const Article = require('../models/Artikel');

exports.create = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? req.file.path : '';
        const result = await Article.create({ title, content, image });
        res.status(201).json({ message: 'Article created successfully', articleId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: 'Error creating article' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const results = await Article.getAll();
        if (results.length === 0) {
            return res.status(200).json({ message: 'No articles found', data: [] });
        }
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching articles' });
    }
};


exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Article.getById(id);
        if (!result) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching article' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, image } = req.body;
        await Article.update(id, { title, content, image });
        res.status(200).json({ message: 'Article updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating article' });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await Article.delete(id);
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting article' });
    }
};
