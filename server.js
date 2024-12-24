const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const methodOverride = require('method-override'); // Untuk mendukung PUT dan DELETE
const expressLayouts = require("express-ejs-layouts");
require('dotenv').config();
const session = require('express-session');
const svgCaptcha = require('svg-captcha');
const rateLimit = require('express-rate-limit');
const adminRoutes = require('./routes/adminRoutes');

// Mengatur dotenv untuk konfigurasi environment
dotenv.config();

// Inisialisasi express
const app = express();
app.use(expressLayouts);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Untuk URL-encoded body
app.use(methodOverride('_method')); // Middleware untuk mendukung PUT dan DELETE
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Menghubungkan ke MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Menghubungkan ke database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

// Menyediakan akses file statis di folder uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Import Routes
const articleRoutes = require('./routes/artikelRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const documentRoutes = require('./routes/documentsRoutes');

// Gunakan Routes
app.use('/artikel', articleRoutes); 
console.log("Artikel routes loaded");

app.use('/gallery', galleryRoutes);
console.log("Gallery routes loaded ") 

app.use('/documents', documentRoutes); 
console.log("Document routes loaded")

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

const captchaLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 menit
  max: 10, // Maks 10 permintaan per menit
  message: { message: 'Terlalu banyak permintaan CAPTCHA, coba lagi nanti.' },
});
app.get('/captcha',captchaLimiter, (req, res) => {
  const captcha = svgCaptcha.create({
    size: 9, // Panjang teks CAPTCHA
    ignoreChars: '0o1i', // Menghindari karakter sulit dibaca
    noise: 5, // Tingkat noise di CAPTCHA
    color: true,
  });

  req.session.captcha = captcha.text; // Simpan teks CAPTCHA di session
  res.set('Content-Type', 'image/svg+xml');
  res.send(captcha.data); // Kirim SVG CAPTCHA ke client
});

app.use('/admin', adminRoutes);
console.log("Admin routes loaded")
// Port dan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
