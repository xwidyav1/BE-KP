const Document = require('../models/Documents');

// Menambahkan dokumen baru
exports.create = async (req, res) => {
    try {
        const { name, file_path, description } = req.body;

        if (!name || !file_path) {
            return res.status(400).json({ message: 'Name and file_path are required' });
        }

        const result = await Document.create({ name, file_path, description });
        res.status(201).json({ message: 'Document created successfully', documentId: result.insertId });
    } catch (error) {
        console.error('Error creating document:', error.message);
        res.status(500).json({ message: 'Error creating document', error: error.message });
    }
};

// Mendapatkan semua dokumen
exports.getAll = async (req, res) => {
    try {
        const results = await Document.getAll();
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching documents:', error.message);
        res.status(500).json({ message: 'Error fetching documents', error: error.message });
    }
};

// Mendapatkan dokumen berdasarkan ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Document.getById(id);

        if (!result) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(`Error fetching document with ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error fetching document by ID', error: error.message });
    }
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
      console.error(`Error updating document with ID ${id}:`, err.message);  // Menambahkan id pada log
      return res.status(500).json({ message: 'Error updating document' });
    }

    res.status(200).json({ message: 'Document updated successfully' });
  });
};


// Menghapus dokumen
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        await Document.delete(id);
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error(`Error deleting document with ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error deleting document', error: error.message });
    }
};
