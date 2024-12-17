const db = require('../config/db');

const Document = {
    create: (data, callback) => {
        const query = 'INSERT INTO documents (name, file_path, description) VALUES (?, ?, ?)';
        db.query(query, [data.name, data.file_path, data.description], callback);
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM documents ORDER BY uploaded_at DESC';
        db.query(query, callback);
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM documents WHERE id = ?';
        db.query(query, [id], callback);
    },
    update: (id, data, callback) => {
        const query = 'UPDATE documents SET name = ?, file_path = ?, description = ? WHERE id = ?';
        db.query(query, [data.name, data.file_path, data.description, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM documents WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Document;
