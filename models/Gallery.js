const db = require('../config/db');

const Gallery = {
    create: (data, callback) => {
        const query = 'INSERT INTO gallery (title, file_path, file_type, description) VALUES (?, ?, ?, ?)';
        db.query(query, [data.title, data.file_path, data.file_type, data.description], callback);
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM gallery ORDER BY uploaded_at DESC';
        db.query(query, callback);
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM gallery WHERE id = ?';
        db.query(query, [id], callback);
    },
    update: (id, data, callback) => {
        const query = 'UPDATE gallery SET title = ?, file_path = ?, file_type = ?, description = ? WHERE id = ?';
        db.query(query, [data.title, data.file_path, data.file_type, data.description, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM gallery WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Gallery;
