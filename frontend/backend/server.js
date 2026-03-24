require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://www.rkmissionnwd.com', 'http://www.rkmissionnwd.com'],
  credentials: true
}));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/admin-assets', express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/admin');

// Routes
const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const adminViewRoutes = require('./routes/adminViews');

app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/admin', adminViewRoutes);

// Serve static frontend (Next.js export)
const frontendPath = path.join(__dirname, '../out');
app.use(express.static(frontendPath));

// Frontend routes - serve index.html for all non-API/admin routes
app.get('*', (req, res, next) => {
  // Skip API and admin routes
  if (req.path.startsWith('/api') || req.path.startsWith('/admin') || req.path.startsWith('/uploads')) {
    return next();
  }

  // Try to serve the exact path (e.g., /about → /about.html)
  const htmlFile = path.join(frontendPath, req.path + '.html');
  const indexFile = path.join(frontendPath, req.path, 'index.html');
  const fs = require('fs');

  if (fs.existsSync(htmlFile)) {
    return res.sendFile(htmlFile);
  } else if (fs.existsSync(indexFile)) {
    return res.sendFile(indexFile);
  } else {
    // Fallback to main index
    const mainIndex = path.join(frontendPath, 'index.html');
    if (fs.existsSync(mainIndex)) {
      return res.sendFile(mainIndex);
    }
    next();
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced successfully');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
    console.log(`API: http://localhost:${PORT}/api`);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
});
