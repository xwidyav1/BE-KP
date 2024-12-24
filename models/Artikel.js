const db = require('../config/db'); // Koneksi ke database MySQL

const Article = {
    // Fungsi untuk membuat artikel
    create: async (data) => {
        try {
            const query = 'INSERT INTO artikel (title, content, image, category) VALUES (?, ?, ?, ?)';
            const [result] = await db.query(query, [data.title, data.content, data.image, data.category]);
            console.log('Article created:', result);
            return result;
        } catch (error) {
            console.error('Error creating article:', error.message);
            throw error;
        }
    },

    // Fungsi untuk mengambil semua artikel
    getAll: async () => {
        try {
            const query = 'SELECT * FROM artikel';
            const [results] = await db.query(query);
            return results;
        } catch (error) {
            console.error('Error getting articles:', error.message);
            throw error;
        }
    },

    // Fungsi untuk mengambil artikel berdasarkan ID
    getById: async (id) => {
        try {
            const query = 'SELECT * FROM artikel WHERE id = ?';
            const [results] = await db.query(query, [id]);
            return results[0];
        } catch (error) {
            console.error('Error getting article by ID:', error.message);
            throw error;
        }
    },

    // Fungsi untuk memperbarui artikel
    update: async (id, data) => {
        try {
            const query = 'UPDATE artikel SET title = ?, content = ?, image = ?, category = ? WHERE id = ?';
            const [result] = await db.query(query, [data.title, data.content, data.image, data.category, id]);
            console.log('Article updated:', result);
            return result;
        } catch (error) {
            console.error('Error updating article:', error.message);
            throw error;
        }
    },

    // Fungsi untuk menghapus artikel
    delete: async (id) => {
        try {
            const query = 'DELETE FROM artikel WHERE id = ?';
            const [result] = await db.query(query, [id]);
            console.log('Article deleted:', result);
            return result;
        } catch (error) {
            console.error('Error deleting article:', error.message);
            throw error;
        }
    }
};

module.exports = Article;