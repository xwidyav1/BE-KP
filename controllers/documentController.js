const Document = require('../models/Documents');

// Menambahkan dokumen baru
exports.create = (req, res) => {
  const { name, file_path, description } = req.body;
  const image = req.file ? req.file.path : '';
  if (!name || !file_path) {
    return res.status(400).json({ message: 'Name and file_path are required' });
  }

  Document.create({ name, file_path, description }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error creating document' });
    }
    res.status(201).json({ message: 'Document created successfully', documentId: result.insertId });
  });
};

// Mendapatkan semua dokumen
exports.getAll = (req, res) => {
  Document.getAll((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching documents' });
    }
    res.status(200).json(results);
  });
};

// Mendapatkan dokumen berdasarkan ID
exports.getById = (req, res) => {
  const { id } = req.params;

  Document.getById(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching document by ID' });
    }

    if (!result) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json(result);
  });
};

// Memperbarui dokumen
exports.update = (req, res) => {
  const { id } = req.params;
  const { name, file_path, description } = req.body;

  if (!name || !file_path) {
    return res.status(400).json({ message: 'Name and file_path are required' });
  }

  Document.update(id, { name, file_path, description }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating document' });
    }

    res.status(200).json({ message: 'Document updated successfully' });
  });
};

// Menghapus dokumen
exports.delete = (req, res) => {
  const { id } = req.params;

  Document.delete(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting document' });
    }

    res.status(200).json({ message: 'Document deleted successfully' });
  });
};
