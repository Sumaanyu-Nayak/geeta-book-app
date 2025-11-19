const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

// GET all activities
router.get('/', async (req, res, next) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

// GET activities by chapter
router.get('/chapter/:chapterId', async (req, res, next) => {
  try {
    const activities = await Activity.find({ chapterId: req.params.chapterId });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

// GET single activity
router.get('/:activityId', async (req, res, next) => {
  try {
    const [chapterId, type] = req.params.activityId.split('-');
    const activity = await Activity.findOne({ chapterId, type });
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    next(error);
  }
});

// POST create new activity
router.post('/', async (req, res, next) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

// PUT update activity
router.put('/:activityId', async (req, res, next) => {
  try {
    const [chapterId, type] = req.params.activityId.split('-');
    const activity = await Activity.findOneAndUpdate(
      { chapterId, type },
      req.body,
      { new: true, runValidators: true }
    );
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    next(error);
  }
});

// DELETE activity
router.delete('/:activityId', async (req, res, next) => {
  try {
    const [chapterId, type] = req.params.activityId.split('-');
    const activity = await Activity.findOneAndDelete({ chapterId, type });
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
