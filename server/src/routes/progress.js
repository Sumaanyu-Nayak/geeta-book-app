const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');

// GET user progress (default user for now)
router.get('/', async (req, res, next) => {
  try {
    const userId = req.query.userId || 'default';
    let progress = await UserProgress.findOne({ userId });
    
    if (!progress) {
      progress = await UserProgress.create({ userId });
    }
    
    res.json(progress);
  } catch (error) {
    next(error);
  }
});

// POST mark verse as complete
router.post('/verse/:verseId/complete', async (req, res, next) => {
  try {
    const userId = req.body.userId || 'default';
    const verseId = req.params.verseId;
    const [chapterId] = verseId.split('-');
    
    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      progress = await UserProgress.create({ userId });
    }
    
    // Check if verse already completed
    const alreadyCompleted = progress.completedVerses.some(v => v.verseId === verseId);
    if (!alreadyCompleted) {
      progress.completedVerses.push({
        verseId,
        completedAt: new Date(),
      });
      progress.totalVersesCompleted += 1;
      
      // Update chapter progress
      const chapterProg = progress.chapterProgress.get(chapterId) || {
        versesCompleted: 0,
        totalVerses: 47, // Default, should be dynamic
        activitiesCompleted: 0,
        totalActivities: 6,
        isCompleted: false,
      };
      chapterProg.versesCompleted += 1;
      progress.chapterProgress.set(chapterId, chapterProg);
      
      await progress.save();
    }
    
    res.json(progress);
  } catch (error) {
    next(error);
  }
});

// POST mark activity as complete
router.post('/activity/:activityId/complete', async (req, res, next) => {
  try {
    const userId = req.body.userId || 'default';
    const activityId = req.params.activityId;
    const [chapterId] = activityId.split('-');
    
    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      progress = await UserProgress.create({ userId });
    }
    
    // Check if activity already completed
    const alreadyCompleted = progress.completedActivities.some(a => a.activityId === activityId);
    if (!alreadyCompleted) {
      progress.completedActivities.push({
        activityId,
        completedAt: new Date(),
      });
      progress.totalActivitiesCompleted += 1;
      
      // Update chapter progress
      const chapterProg = progress.chapterProgress.get(chapterId) || {
        versesCompleted: 0,
        totalVerses: 47,
        activitiesCompleted: 0,
        totalActivities: 6,
        isCompleted: false,
      };
      chapterProg.activitiesCompleted += 1;
      progress.chapterProgress.set(chapterId, chapterProg);
      
      await progress.save();
    }
    
    res.json(progress);
  } catch (error) {
    next(error);
  }
});

// POST mark chapter as complete
router.post('/chapter/:chapterId/complete', async (req, res, next) => {
  try {
    const userId = req.body.userId || 'default';
    const chapterId = req.params.chapterId;
    
    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      progress = await UserProgress.create({ userId });
    }
    
    // Update chapter progress
    const chapterProg = progress.chapterProgress.get(chapterId) || {
      versesCompleted: 0,
      totalVerses: 47,
      activitiesCompleted: 0,
      totalActivities: 6,
      isCompleted: false,
    };
    
    if (!chapterProg.isCompleted) {
      chapterProg.isCompleted = true;
      chapterProg.completedAt = new Date();
      progress.chapterProgress.set(chapterId, chapterProg);
      progress.totalChaptersCompleted += 1;
      
      await progress.save();
    }
    
    res.json(progress);
  } catch (error) {
    next(error);
  }
});

// DELETE reset progress
router.delete('/reset', async (req, res, next) => {
  try {
    const userId = req.body.userId || 'default';
    await UserProgress.findOneAndDelete({ userId });
    res.json({ message: 'Progress reset successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
