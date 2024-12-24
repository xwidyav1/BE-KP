const Gallery = require('../models/Gallery');

// Create a new gallery item
exports.create = async (req, res) => {
    try {
        const { title, description } = req.body;
        const file_path = req.file ? req.file.path : '';
        const file_type = req.file ? req.file.mimetype : '';
        await Gallery.create({ title, file_path, file_type, description });
        res.redirect('/gallery'); // Redirect to the list of gallery items after creation
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating gallery item');
    }
};

// Get all gallery items
exports.getAll = async (req, res) => {
    try {
        const results = await Gallery.getAll();
        res.render('gallery/index', { gallery: results });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving gallery items');
    }
};

// Get gallery item by ID for editing
exports.getByIdForEdit = async (req, res) => {
    try {
        const galleryItem = await Gallery.getById(req.params.id);
        res.render('gallery/edit', { galleryItem });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving gallery item');
    }
};

// Update a gallery item
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const file_path = req.file ? req.file.path : undefined;
        const file_type = req.file ? req.file.mimetype : undefined;
        await Gallery.update(id, { title, file_path, file_type, description });
        res.redirect('/gallery'); // Redirect to the list of gallery items after update
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating gallery item');
    }
};

// Delete a gallery item
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await Gallery.delete(id);
        res.redirect('/gallery'); // Redirect to the list of gallery items after deletion
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting gallery item');
    }
};