const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel');

module.exports = {
  login: async (req, res) => {
    const { username, password, captchaInput } = req.body;

    if (!req.session.captcha || req.session.captcha !== captchaInput) {
      return res.status(400).json({ message: 'CAPTCHA tidak valid' });
    }

    try {
      const admin = await adminModel.getAdminByUsername(username);

      if (!admin) {
        return res.status(404).json({ message: 'Username atau password salah' });
      }

      const match = await bcrypt.compare(password, admin.password);

      if (!match) {
        return res.status(401).json({ message: 'Username atau password salah' });
      }
      req.session.isAdmin = true;
      req.session.username = admin.username;
      res.status(200).json({ message: 'Login berhasil' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  },

  hashPassword: async (req, res) => {
    const { username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await adminModel.createAdmin(username, hashedPassword);

      res.status(201).json({ message: 'Admin berhasil ditambahkan' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Gagal menambahkan admin' });
    }
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Gagal logout' });
      }
      res.status(200).json({ message: 'Logout berhasil' });
    });
  },
};

