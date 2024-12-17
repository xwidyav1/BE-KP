
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

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Untuk menerima JSON di body
app.use(bodyParser.urlencoded({ extended: true })); // Untuk URL-encoded body

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

// Import Routes
const uploadRoutes = require('./routes/uploadRoutes');
const articleRoutes = require('./routes/artikelRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const documentRoutes = require('./routes/documentsRoutes');

// Gunakan Routes
app.use('/api', uploadRoutes); // Endpoint untuk upload file
app.use('/api/articles', articleRoutes); // Artikel CRUD
app.use('/api/gallery', galleryRoutes); // Galeri CRUD
app.use('/api/documents', documentRoutes); // Dokumen CRUD

// Port dan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
