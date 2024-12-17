const Gallery = require('../models/gallery');


exports.create = (req, res) => {
  const { title, file_path, file_type, description } = req.body;
  const image = req.file ? req.file.path : '';
  if (!title || !file_path || !file_type) {
    return res.status(400).json({ message: 'Title, file_path, and file_type are required' });
  }

  Gallery.create({ title, file_path, file_type, description }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error creating media in gallery' });
    }
    res.status(201).json({ message: 'Media created successfully', mediaId: result.insertId });
  });
};


exports.getAll = (req, res) => {
  Gallery.getAll((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching gallery media' });
    }
    res.status(200).json(results);
  });
};


exports.getById = (req, res) => {
  const { id } = req.params;

  Gallery.getById(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching media by ID' });
    }

    if (!result) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.status(200).json(result);
  });
};


exports.update = (req, res) => {
  const { id } = req.params;
  const { title, file_path, file_type, description } = req.body;

  if (!title || !file_path || !file_type) {
    return res.status(400).json({ message: 'Title, file_path, and file_type are required' });
  }

  Gallery.update(id, { title, file_path, file_type, description }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating media in gallery' });
    }

    res.status(200).json({ message: 'Media updated successfully' });
  });
};


exports.delete = (req, res) => {
  const { id } = req.params;

  Gallery.delete(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting media from gallery' });
    }

    res.status(200).json({ message: 'Media deleted successfully' });
  });
};
