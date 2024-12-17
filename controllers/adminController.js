const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/admin');
require('dotenv').config();

// Pastikan RECAPTCHA_SECRET_KEY diambil dari process.env
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

exports.login = async (req, res) => {
  const { username, password, 'g-recaptcha-response': captchaResponse } = req.body;

  // Verifikasi CAPTCHA dengan Google
  try {
    const captchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captchaResponse}`;
    const captchaVerifyResponse = await axios.post(captchaVerifyUrl);

    if (!captchaVerifyResponse.data.success) {
      return res.status(400).json({ message: 'Captcha verification failed. Please try again.' });
    }

    // Jika CAPTCHA berhasil, lanjutkan verifikasi login
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
