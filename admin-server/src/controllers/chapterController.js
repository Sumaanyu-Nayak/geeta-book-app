// Use local models
const Chapter = require('../models/Chapter');
const Verse = require('../models/Verse');

// @desc    Create a new chapter
// @route   POST /api/admin/chapters
// @access  Private
exports.createChapter = async (req, res) => {
  try {
    const chapter = new Chapter(req.body);
    await chapter.save();
    res.status(201).json(chapter);
  } catch (error) {
    console.error('Create chapter error:', error);
    res.status(500).json({ message: 'Error creating chapter', error: error.message });
  }
};

// @desc    Update a chapter
// @route   PUT /api/admin/chapters/:id
// @access  Private
exports.updateChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findOneAndUpdate(
      { chapterNumber: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.json(chapter);
  } catch (error) {
    console.error('Update chapter error:', error);
    res.status(500).json({ message: 'Error updating chapter', error: error.message });
  }
};

// @desc    Delete a chapter
// @route   DELETE /api/admin/chapters/:id
// @access  Private
exports.deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findOneAndDelete({ chapterNumber: req.params.id });

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Also delete all verses in this chapter
    await Verse.deleteMany({ chapterId: req.params.id });

    res.json({ message: 'Chapter and associated verses deleted successfully' });
  } catch (error) {
    console.error('Delete chapter error:', error);
    res.status(500).json({ message: 'Error deleting chapter', error: error.message });
  }
};
