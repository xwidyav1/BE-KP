const Gallery = require('../models/Gallery');

exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createGalleryItem = async (req, res) => {
  const { title, imageUrl, description } = req.body;
  const newGalleryItem = new Gallery({ title, imageUrl, description });

  try {
    const savedGalleryItem = await newGalleryItem.save();
    res.status(201).json(savedGalleryItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateGalleryItem = async (req, res) => {
  const { title, imageUrl, description } = req.body;
  try {
    const updatedGalleryItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      { title, imageUrl, description },
      { new: true }
    );
    res.json(updatedGalleryItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    const deletedGalleryItem = await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item deleted', galleryItem: deletedGalleryItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
