const express = require('express');
const router = express.Router();
const Verse = require('../models/Verse');

// GET all verses
router.get('/', async (req, res, next) => {
  try {
    const verses = await Verse.find().sort({ chapterId: 1, verseNumber: 1 });
    res.json(verses);
  } catch (error) {
    next(error);
  }
});

// GET verses by chapter
router.get('/chapter/:chapterId', async (req, res, next) => {
  try {
    const verses = await Verse.find({ chapterId: req.params.chapterId })
      .sort({ verseNumber: 1 });
    res.json(verses);
  } catch (error) {
    next(error);
  }
});

// GET single verse by ID
router.get('/:verseId', async (req, res, next) => {
  try {
    const [chapterId, verseNumber] = req.params.verseId.split('-');
    const verse = await Verse.findOne({ 
      chapterId, 
      verseNumber: parseInt(verseNumber) 
    });
    if (!verse) {
      return res.status(404).json({ error: 'Verse not found' });
    }
    res.json(verse);
  } catch (error) {
    next(error);
  }
});

// POST create new verse
router.post('/', async (req, res, next) => {
  try {
    const verse = new Verse(req.body);
    await verse.save();
    res.status(201).json(verse);
  } catch (error) {
    next(error);
  }
});

// PUT update verse
router.put('/:verseId', async (req, res, next) => {
  try {
    const [chapterId, verseNumber] = req.params.verseId.split('-');
    const verse = await Verse.findOneAndUpdate(
      { chapterId, verseNumber: parseInt(verseNumber) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!verse) {
      return res.status(404).json({ error: 'Verse not found' });
    }
    res.json(verse);
  } catch (error) {
    next(error);
  }
});

// DELETE verse
router.delete('/:verseId', async (req, res, next) => {
  try {
    const [chapterId, verseNumber] = req.params.verseId.split('-');
    const verse = await Verse.findOneAndDelete({ 
      chapterId, 
      verseNumber: parseInt(verseNumber) 
    });
    if (!verse) {
      return res.status(404).json({ error: 'Verse not found' });
    }
    res.json({ message: 'Verse deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
