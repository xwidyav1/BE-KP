const Article = require('../models/Artikel');

// Create a new article
exports.create = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? req.file.path : '';
        await Article.create({ title, content, image });
        res.redirect('/articles'); // Redirect to the list of articles after creation
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating article');
    }
};

// Get all articles
exports.getAll = async (req, res) => {
    try {
        const results = await Article.getAll();
        res.render('artikel/index', {
            layout: 'layout', // Pastikan layout disertakan
            title: 'Daftar Artikel', // Judul halaman
            articles: results, // Data artikel
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching articles');
    }
};

// Get article by ID for editing
exports.getByIdForEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Article.getById(id);
        if (!result) {
            return res.status(404).send('Article not found');
        }
        res.render('artikel/update', {
            layout: 'layout',
            title: 'Edit Artikel',
            article: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching article');
    }
};

// Update an article
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const image = req.file ? req.file.path : undefined;
        await Article.update(id, { title, content, image });
        res.redirect('/articles'); // Redirect to the list of articles after update
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating article');
    }
};

// Delete an article
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await Article.delete(id);
        res.redirect('/articles'); // Redirect to the list of articles after deletion
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting article');
    }
};
