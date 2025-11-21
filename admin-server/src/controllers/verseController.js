// Use local models
const Verse = require('../models/Verse');

// @desc    Create a new verse
// @route   POST /api/admin/verses
// @access  Private
exports.createVerse = async (req, res) => {
  try {
    const verse = new Verse(req.body);
    await verse.save();
    res.status(201).json(verse);
  } catch (error) {
    console.error('Create verse error:', error);
    res.status(500).json({ message: 'Error creating verse', error: error.message });
  }
};

// @desc    Update a verse
// @route   PUT /api/admin/verses/:id
// @access  Private
exports.updateVerse = async (req, res) => {
  try {
    const verse = await Verse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!verse) {
      return res.status(404).json({ message: 'Verse not found' });
    }

    res.json(verse);
  } catch (error) {
    console.error('Update verse error:', error);
    res.status(500).json({ message: 'Error updating verse', error: error.message });
  }
};

// @desc    Delete a verse
// @route   DELETE /api/admin/verses/:id
// @access  Private
exports.deleteVerse = async (req, res) => {
  try {
    const verse = await Verse.findByIdAndDelete(req.params.id);

    if (!verse) {
      return res.status(404).json({ message: 'Verse not found' });
    }

    res.json({ message: 'Verse deleted successfully' });
  } catch (error) {
    console.error('Delete verse error:', error);
    res.status(500).json({ message: 'Error deleting verse', error: error.message });
  }
};
