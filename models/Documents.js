const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: String,
  description: String,
  fileUrl: String,  // Link file dokumen yang disimpan di server
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', articleSchema);
