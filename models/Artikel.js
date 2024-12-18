const db = require('../config/db'); // Koneksi ke database MySQL

const Article = {
    // Fungsi untuk membuat artikel
    create: async (data) => {
        try {
            const query = 'INSERT INTO artikel (title, content, image) VALUES (?, ?, ?)';
            const [result] = await db.query(query, [data.title, data.content, data.image]);
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
            const query = 'SELECT * FROM artikel ORDER BY created_at DESC';
            const [results] = await db.query(query);
            console.log('All articles fetched:', results);
            return results;
        } catch (error) {
            console.error('Error fetching articles:', error.message);
            throw error;
        }
    },

    // Fungsi untuk mengambil artikel berdasarkan ID
    getById: async (id) => {
        try {
            const query = 'SELECT * FROM artikel WHERE id = ?';
            const [results] = await db.query(query, [id]);
            console.log(`Article with ID ${id} fetched:`, results);
            return results[0]; // Mengambil satu artikel
        } catch (error) {
            console.error(`Error fetching article with ID ${id}:`, error.message);
            throw error;
        }
    },

    // Fungsi untuk memperbarui artikel
    update: async (id, data) => {
        try {
            const query = 'UPDATE artikel SET title = ?, content = ?, image = ?, updated_at = ? WHERE id = ?';
            const [result] = await db.query(query, [data.title, data.content, data.image, new Date(), id]);
            console.log(`Article with ID ${id} updated:`, result);
            return result;
        } catch (error) {
            console.error(`Error updating article with ID ${id}:`, error.message);
            throw error;
        }
    },

    // Fungsi untuk menghapus artikel
    delete: async (id) => {
        try {
            const query = 'DELETE FROM artikel WHERE id = ?';
            const [result] = await db.query(query, [id]);
            console.log(`Article with ID ${id} deleted:`, result);
            return result;
        } catch (error) {
            console.error(`Error deleting article with ID ${id}:`, error.message);
            throw error;
        }
    }
};

module.exports = Article;
