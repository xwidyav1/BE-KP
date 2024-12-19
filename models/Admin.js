const mysql = require('mysql2/promise');
const db = require('../config/db');

module.exports = {
  getAdminByUsername: async (username) => {
    const [rows] = await db.query('SELECT * FROM admin WHERE username = ?', [username]);
    return rows[0];
  },

  createAdmin: async (username, hashedPassword) => {
    await db.query('INSERT INTO admin (username, password) VALUES (?, ?)', [username, hashedPassword]);
  },
};