const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();
connectDB();
const articleRoutes = require('./routes/articleRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const documentRoutes = require('./routes/documentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(express.json());
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/articles', articleRoutes);
app.use('/gallery', galleryRoutes);
app.use('/documents', documentRoutes);
app.use('/admin', adminRoutes)
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', uploadRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
