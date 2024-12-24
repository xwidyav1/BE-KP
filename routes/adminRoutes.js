const express = require('express');
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/login', adminController.login);
router.post('/logout',adminMiddleware, adminController.logout);
router.post('/hash-password',adminMiddleware, adminController.hashPassword);
router.post('/protected-route', adminMiddleware, (req, res) => {
    res.status(200).json({ message: 'Anda mengakses rute yang terproteksi' });
  });
module.exports = router;