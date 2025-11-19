const express = require('express');
const router = express.Router();
const VerseActivity = require('../models/VerseActivity');

// GET all verse activities
router.get('/', async (req, res, next) => {
  try {
    const activities = await VerseActivity.find()
      .sort({ chapterId: 1, verseNumber: 1, order: 1 });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

// GET verse activities by chapter
router.get('/chapter/:chapterId', async (req, res, next) => {
  try {
    const activities = await VerseActivity.find({ 
      chapterId: req.params.chapterId 
    }).sort({ verseNumber: 1, order: 1 });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

// GET verse activities by chapter and verse
router.get('/chapter/:chapterId/verse/:verseNumber', async (req, res, next) => {
  try {
    const activities = await VerseActivity.find({
      chapterId: req.params.chapterId,
      verseNumber: parseInt(req.params.verseNumber)
    }).sort({ order: 1 });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

// GET single verse activity by ID
router.get('/:activityId', async (req, res, next) => {
  try {
    const [chapterId, verseNumber, order] = req.params.activityId.split('-');
    const activity = await VerseActivity.findOne({ 
      chapterId, 
      verseNumber: parseInt(verseNumber),
      order: parseInt(order)
    });
    if (!activity) {
      return res.status(404).json({ error: 'Verse activity not found' });
    }
    res.json(activity);
  } catch (error) {
    next(error);
  }
});

// POST create new verse activity
router.post('/', async (req, res, next) => {
  try {
    const activity = new VerseActivity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

// PUT update verse activity
router.put('/:activityId', async (req, res, next) => {
  try {
    const [chapterId, verseNumber, order] = req.params.activityId.split('-');
    const activity = await VerseActivity.findOneAndUpdate(
      { 
        chapterId, 
        verseNumber: parseInt(verseNumber),
        order: parseInt(order)
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!activity) {
      return res.status(404).json({ error: 'Verse activity not found' });
    }
    res.json(activity);
  } catch (error) {
    next(error);
  }
});

// DELETE verse activity
router.delete('/:activityId', async (req, res, next) => {
  try {
    const [chapterId, verseNumber, order] = req.params.activityId.split('-');
    const activity = await VerseActivity.findOneAndDelete({ 
      chapterId, 
      verseNumber: parseInt(verseNumber),
      order: parseInt(order)
    });
    if (!activity) {
      return res.status(404).json({ error: 'Verse activity not found' });
    }
    res.json({ message: 'Verse activity deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
