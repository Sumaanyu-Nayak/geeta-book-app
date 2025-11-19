const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || '*',
  credentials: true,
}));
app.use(morgan('dev')); // Logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/geeta-book', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
const chapterRoutes = require('./routes/chapters');
const verseRoutes = require('./routes/verses');
const activityRoutes = require('./routes/activities');
const progressRoutes = require('./routes/progress');
const verseActivityRoutes = require('./routes/verseActivities');

app.use('/api/chapters', chapterRoutes);
app.use('/api/verses', verseRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/verse-activities', verseActivityRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Geeta Book API Server',
    version: '1.0.0',
    endpoints: {
      chapters: '/api/chapters',
      verses: '/api/verses',
      activities: '/api/activities',
      verseActivities: '/api/verse-activities',
      progress: '/api/progress',
      health: '/health',
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.url} not found`,
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}`);
});

module.exports = app;
