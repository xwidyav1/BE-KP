const db = require('../config/db'); // Import koneksi database

const Document = {
    // Fungsi untuk membuat dokumen
    create: async (data) => {
        const query = 'INSERT INTO document (name, file_path, description) VALUES (?, ?, ?)';
        try {
            const [result] = await db.query(query, [data.name, data.file_path, data.description]);
            console.log('Document created:', result);
            return result;
        } catch (error) {
            console.error('Error creating document:', error.message);
            throw error;
        }
    },

    // Fungsi untuk mendapatkan semua dokumen
    getAll: async () => {
        const query = 'SELECT * FROM document ORDER BY uploaded_at DESC';
        try {
            const [results] = await db.query(query);
            console.log('All documents fetched:', results);
            return results;
        } catch (error) {
            console.error('Error fetching documents:', error.message);
            throw error;
        }
    },

    // Fungsi untuk mendapatkan dokumen berdasarkan ID
    getById: async (id) => {
        const query = 'SELECT * FROM document WHERE id = ?';
        try {
            const [results] = await db.query(query, [id]);
            console.log(`Document with ID ${id} fetched:`, results);
            return results[0]; // Ambil data pertama
        } catch (error) {
            console.error(`Error fetching document with ID ${id}:`, error.message);
            throw error;
        }
    },

    // Fungsi untuk memperbarui dokumen
    update: async (id, data) => {
        const query = 'UPDATE document SET name = ?, file_path = ?, description = ?, updated_at = ? WHERE id = ?';
        try {
            const [result] = await db.query(query, [data.name, data.file_path, data.description, new Date(), id]);
            console.log(`Document with ID ${id} updated:`, result);
            return result;
        } catch (error) {
            console.error(`Error updating document with ID ${id}:`, error.message);
            throw error;
        }
    },

    // Fungsi untuk menghapus dokumen
    delete: async (id) => {
        const query = 'DELETE FROM document WHERE id = ?';
        try {
            const [result] = await db.query(query, [id]);
            console.log(`Document with ID ${id} deleted:`, result);
            return result;
        } catch (error) {
            console.error(`Error deleting document with ID ${id}:`, error.message);
            throw error;
        }
    }
};

module.exports = Document;
