const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const multer = require('multer');
require('dotenv').config();

// Mengatur dotenv untuk konfigurasi environment
dotenv.config();

// Inisialisasi express
const app = express();
// Set EJS sebagai templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Pastikan folder views ada

app.use(express.json());

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Untuk menerima JSON di body
app.use(bodyParser.urlencoded({ extended: true })); // Untuk URL-encoded body
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
})

// Menghubungkan ke MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
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
app.use('/api', articleRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/documents', documentRoutes);

// Rute untuk halaman AdminLTE
app.get('/', (req, res) => {
  res.render('artikel/index');  // Render halaman EJS dengan AdminLTE
});

// Rute untuk artikel
app.get('/artikel', (req, res) => {
  const query = 'SELECT * FROM artikel';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('artikel/index', { data: results });  // Render halaman artikel
  });
});

// Rute untuk halaman gallery
app.get('/gallery', (req, res) => {
  res.render('gallery/index');  // Render halaman gallery
});

// Rute untuk halaman dokumen
app.get('/documents', (req, res) => {
  res.render('documents/index');  // Render halaman dokumen
});

// Port dan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
