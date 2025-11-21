require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const chapterRoutes = require('./routes/chapters');
const verseRoutes = require('./routes/verses');
const activityRoutes = require('./routes/activities');
const verseActivityRoutes = require('./routes/verseActivities');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Geeta Book Admin API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/admin/*',
      analytics: '/api/admin/analytics/*',
      chapters: '/api/admin/chapters/*',
      verses: '/api/admin/verses/*',
      activities: '/api/admin/activities/*',
      verseActivities: '/api/admin/verse-activities/*',
    },
  });
});

// Public API Routes (for reading data)
const Chapter = require('./models/Chapter');
const Verse = require('./models/Verse');
const Activity = require('./models/Activity');
const VerseActivity = require('./models/VerseActivity');

// Public chapter routes
app.get('/api/chapters', async (req, res) => {
  try {
    const chapters = await Chapter.find().sort({ number: 1 });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chapters', error: error.message });
  }
});

app.get('/api/chapters/:id', async (req, res) => {
  try {
    const chapter = await Chapter.findOne({ number: req.params.id });
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chapter', error: error.message });
  }
});

// Public verse routes
app.get('/api/verses', async (req, res) => {
  try {
    const query = req.query.chapterId ? { chapterId: req.query.chapterId } : {};
    const verses = await Verse.find(query).sort({ chapterId: 1, verseNumber: 1 });
    res.json(verses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verses', error: error.message });
  }
});

app.get('/api/verses/:id', async (req, res) => {
  try {
    const verse = await Verse.findById(req.params.id);
    if (!verse) {
      return res.status(404).json({ message: 'Verse not found' });
    }
    res.json(verse);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verse', error: error.message });
  }
});

// Public activity routes
app.get('/api/activities', async (req, res) => {
  try {
    const query = req.query.chapterId ? { chapterId: parseInt(req.query.chapterId) } : {};
    const activities = await Activity.find(query).sort({ chapterId: 1, type: 1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error: error.message });
  }
});

app.get('/api/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity', error: error.message });
  }
});

// Public verse activity routes
app.get('/api/verse-activities', async (req, res) => {
  try {
    const query = {};
    if (req.query.chapterId) query.chapterId = req.query.chapterId;
    if (req.query.verseNumber) query.verseNumber = parseInt(req.query.verseNumber);
    if (req.query.type) query.type = req.query.type;
    
    const activities = await VerseActivity.find(query).sort({ chapterId: 1, verseNumber: 1, order: 1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verse activities', error: error.message });
  }
});

app.get('/api/verse-activities/:id', async (req, res) => {
  try {
    const activity = await VerseActivity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Verse activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verse activity', error: error.message });
  }
});

// Admin API Routes (protected)
app.use('/api/admin', authRoutes);
app.use('/api/admin/analytics', analyticsRoutes);
app.use('/api/admin/chapters', chapterRoutes);
app.use('/api/admin/verses', verseRoutes);
app.use('/api/admin/activities', activityRoutes);
app.use('/api/admin/verse-activities', verseActivityRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`\n🚀 Admin Server running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`🔐 Login endpoint: http://localhost:${PORT}/api/admin/login`);
  console.log(`📊 Analytics endpoint: http://localhost:${PORT}/api/admin/analytics\n`);
});

module.exports = app;
