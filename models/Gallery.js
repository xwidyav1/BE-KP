const db = require('../config/db');

const Gallery = {
    // Fungsi untuk membuat galeri
    create: async (data) => {
        try {
            const query = 'INSERT INTO gallery (title, file_path, file_type, description, uploaded_at) VALUES (?, ?, ?, ?, NOW())';
            const [result] = await db.query(query, [data.title, data.file_path, data.file_type, data.description]);
            console.log('Gallery item created:', result);
            return result;
        } catch (error) {
            console.error('Error creating gallery item:', error.message);
            throw error;
        }
    },

    // Fungsi untuk mengambil semua galeri
    getAll: async () => {
        try {
            const query = 'SELECT * FROM gallery ORDER BY uploaded_at DESC';
            const [results] = await db.query(query);
            return results;
        } catch (error) {
            console.error('Error getting gallery items:', error.message);
            throw error;
        }
    },

    // Fungsi untuk mengambil galeri berdasarkan ID
    getById: async (id) => {
        try {
            const query = 'SELECT * FROM gallery WHERE id = ?';
            const [results] = await db.query(query, [id]);
            return results[0];
        } catch (error) {
            console.error('Error getting gallery item by ID:', error.message);
            throw error;
        }
    },

    // Fungsi untuk memperbarui galeri
    update: async (id, data) => {
        try {
            const query = 'UPDATE gallery SET title = ?, file_path = ?, file_type = ?, description = ? WHERE id = ?';
            const [result] = await db.query(query, [data.title, data.file_path, data.file_type, data.description, id]);
            console.log('Gallery item updated:', result);
            return result;
        } catch (error) {
            console.error('Error updating gallery item:', error.message);
            throw error;
        }
    },

    // Fungsi untuk menghapus galeri
    delete: async (id) => {
        try {
            const query = 'DELETE FROM gallery WHERE id = ?';
            const [result] = await db.query(query, [id]);
            console.log('Gallery item deleted:', result);
            return result;
        } catch (error) {
            console.error('Error deleting gallery item:', error.message);
            throw error;
        }
    }
};

module.exports = Gallery;