const Gallery = require('../models/gallery');

exports.create = (req, res) => {
    console.log('Request body:', req.body);
    console.log('File uploaded:', req.file);

    const { title, description } = req.body;
    const file_path = req.file ? req.file.path : null; // Mendapatkan file path dari middleware
    const file_type = req.file ? req.file.mimetype : null;

    if (!title || !file_path || !file_type) {
        console.log('Validation failed: Missing required fields');
        return res.status(400).json({ message: 'Title, file_path, and file_type are required' });
    }

    Gallery.create({ title, file_path, file_type, description }, (err, result) => {
        if (err) {
            console.error('Error creating media in gallery:', err);
            return res.status(500).json({ message: 'Error creating media in gallery' });
        }
        console.log('Media created successfully, ID:', result.insertId);
        res.status(201).json({ message: 'Media created successfully', mediaId: result.insertId });
    });
};

exports.getAll = (req, res) => {
    console.log('Fetching all media from gallery');
    Gallery.getAll((err, results) => {
        if (err) {
            console.error('Error fetching gallery media:', err);
            return res.status(500).json({ message: 'Error fetching gallery media' });
        }
        console.log('Media fetched successfully:', results);
        res.status(200).json(results || []);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;
    console.log(`Fetching media by ID: ${id}`);

    Gallery.getById(id, (err, results) => {
        if (err) {
            console.error('Error fetching media by ID:', err);
            return res.status(500).json({ message: 'Error fetching media by ID' });
        }

        if (!results || results.length === 0) {
            console.log(`Media not found for ID: ${id}`);
            return res.status(404).json({ message: 'Media not found' });
        }

        console.log('Media fetched successfully:', results[0]);
        res.status(200).json(results[0]);
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    console.log(`Updating media with ID: ${id}`);
    console.log('Request body:', req.body);
    console.log('File uploaded:', req.file);

    const { title, description } = req.body;
    const file_path = req.file ? req.file.path : null;
    const file_type = req.file ? req.file.mimetype : null;

    if (!title || (!file_path && !file_type)) {
        console.log('Validation failed: Missing required fields for update');
        return res.status(400).json({ message: 'Title is required, and file must be provided for update' });
    }

    Gallery.update(id, { title, file_path, file_type, description }, (err, result) => {
        if (err) {
            console.error('Error updating media in gallery:', err);
            return res.status(500).json({ message: 'Error updating media in gallery' });
        }

        if (result.affectedRows === 0) {
            console.log(`Media not found for ID: ${id}`);
            return res.status(404).json({ message: 'Media not found' });
        }

        console.log('Media updated successfully');
        res.status(200).json({ message: 'Media updated successfully' });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    console.log(`Deleting media with ID: ${id}`);

    Gallery.delete(id, (err, result) => {
        if (err) {
            console.error('Error deleting media from gallery:', err);
            return res.status(500).json({ message: 'Error deleting media from gallery' });
        }

        if (result.affectedRows === 0) {
            console.log(`Media not found for ID: ${id}`);
            return res.status(404).json({ message: 'Media not found' });
        }

        console.log('Media deleted successfully');
        res.status(200).json({ message: 'Media deleted successfully' });
    });
};
