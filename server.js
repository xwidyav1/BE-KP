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
const captcha = require('node-captcha');
const adminRoutes = require('./routes/adminRoutes');
// Mengatur dotenv untuk konfigurasi environment
dotenv.config();

// Inisialisasi express
const app = express();
app.use(expressLayouts);
// Set EJS sebagai templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Pastikan folder views ada
app.set('layout', 'layout');
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
// Menyediakan file statis AdminLTE
app.use('/static', express.static(path.join(__dirname, 'AdminLTE')));

// Import Routes
const articleRoutes = require('./routes/artikelRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const documentRoutes = require('./routes/documentsRoutes');

// Gunakan Routes
app.use('/artikel', articleRoutes); // Artikel route akan di-handle oleh artikelRoutes
console.log("Artikel routes loaded");

app.use('/gallery', galleryRoutes); // Gallery route
app.use('/documents', documentRoutes); // Document route

// Halaman AdminLTE Default
app.get('/artikel', (req, res) => {
  const query = 'SELECT * FROM artikel';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching articles');
    }
    // Pastikan variabel articles dikirim ke view
    res.render('artikel/index', { articles: results });
  });
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.get('/captcha', (req, res) => {
  const captchaText = captcha({ length: 5, size: 60 });
  req.session.captcha = captchaText.text;
  res.set('Content-Type', 'image/svg+xml');
  res.send(captchaText.data);
});

app.use('/admin', adminRoutes);
// Port dan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
