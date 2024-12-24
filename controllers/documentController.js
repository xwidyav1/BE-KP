const Document = require('../models/Documents');

// Create a new document
exports.create = async (req, res) => {
    try {
        const { title, content } = req.body;
        const file = req.file ? req.file.path : '';
        await Document.create({ title, content, file });
        res.redirect('/documents'); // Redirect to the list of documents after creation
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating document');
    }
};

// Get all documents
exports.getAll = async (req, res) => {
    try {
        const results = await Document.getAll();
        res.render('documents/index', { documents: results });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving documents');
    }
};

// Get document by ID for editing
exports.getByIdForEdit = async (req, res) => {
    try {
        const document = await Document.getById(req.params.id);
        res.render('documents/edit', { document });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving document');
    }
};

// Update a document
exports.update = async (req, res) => {
    try {
        const { title, content } = req.body;
        const file = req.file ? req.file.path : '';
        await Document.update(req.params.id, { title, content, file });
        res.redirect('/documents'); // Redirect to the list of documents after update
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating document');
    }
};

exports.delete = async (req, res) => {
    try {
        await Document.delete(req.params.id);
        res.redirect('/documents'); // Redirect to the list of documents after deletion
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting document');
    }
};