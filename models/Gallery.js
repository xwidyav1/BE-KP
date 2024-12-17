const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: String,
  imageUrl: String,  // Link gambar di server
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', articleSchema);