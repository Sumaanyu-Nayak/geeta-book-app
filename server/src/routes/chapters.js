const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');

// GET all chapters
router.get('/', async (req, res, next) => {
  try {
    const chapters = await Chapter.find().sort({ number: 1 });
    res.json(chapters);
  } catch (error) {
    next(error);
  }
});

// GET single chapter by ID
router.get('/:id', async (req, res, next) => {
  try {
    const chapter = await Chapter.findOne({ number: parseInt(req.params.id) });
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }
    res.json(chapter);
  } catch (error) {
    next(error);
  }
});

// POST create new chapter (admin only - implement auth later)
router.post('/', async (req, res, next) => {
  try {
    const chapter = new Chapter(req.body);
    await chapter.save();
    res.status(201).json(chapter);
  } catch (error) {
    next(error);
  }
});

// PUT update chapter
router.put('/:id', async (req, res, next) => {
  try {
    const chapter = await Chapter.findOneAndUpdate(
      { number: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }
    res.json(chapter);
  } catch (error) {
    next(error);
  }
});

// DELETE chapter
router.delete('/:id', async (req, res, next) => {
  try {
    const chapter = await Chapter.findOneAndDelete({ number: parseInt(req.params.id) });
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }
    res.json({ message: 'Chapter deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
