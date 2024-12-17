const Document = require('../models/Documents');

exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDocument = async (req, res) => {
  const { title, description, fileUrl } = req.body;
  const newDocument = new Document({ title, description, fileUrl });

  try {
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateDocument = async (req, res) => {
  const { title, description, fileUrl } = req.body;
  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      { title, description, fileUrl },
      { new: true }
    );
    res.json(updatedDocument);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(req.params.id);
    res.json({ message: 'Document deleted', document: deletedDocument });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
