const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    if (req.originalUrl.startsWith('/admin') && !req.originalUrl.startsWith('/api')) {
      return res.redirect('/admin/login');
    }
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    if (req.originalUrl.startsWith('/admin') && !req.originalUrl.startsWith('/api')) {
      return res.redirect('/admin/login');
    }
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
