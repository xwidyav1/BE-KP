const Article = require('../models/Article');

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createArticle = async (req, res) => {
  const { category, title, content } = req.body;
  const newArticle = new Article({ category, title, content });

  try {
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateArticle = async (req, res) => {
  const { category, title, content } = req.body;
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { category, title, content },
      { new: true }
    );
    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted', article: deletedArticle });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
