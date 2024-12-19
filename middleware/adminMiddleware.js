module.exports = (req, res, next) => {
    if (!req.session || !req.session.isAdmin) {
      return res.status(401).json({ message: 'Unauthorized: Silakan login sebagai admin' });
    }
    next();
  };
