const db = require('../config/db'); // koneksi ke database MySQL

const Article = {
    create: (data, callback) => {
        const query = 'INSERT INTO articles (title, content, image) VALUES (?, ?, ?)';
        db.query(query, [data.title, data.content, data.image], callback);
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM articles ORDER BY created_at DESC';
        db.query(query, callback);
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM articles WHERE id = ?';
        db.query(query, [id], callback);
    },
    update: (id, data, callback) => {
        const query = 'UPDATE articles SET title = ?, content = ?, image = ?, updated_at = ? WHERE id = ?';
        db.query(query, [data.title, data.content, data.image, new Date(), id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM articles WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Article;
