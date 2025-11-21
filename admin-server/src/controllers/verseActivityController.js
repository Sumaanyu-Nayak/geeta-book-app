// Use local models
const VerseActivity = require('../models/VerseActivity');

// @desc    Create a new verse activity
// @route   POST /api/admin/verse-activities
// @access  Private
exports.createVerseActivity = async (req, res) => {
  try {
    const activity = new VerseActivity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error('Create verse activity error:', error);
    res.status(500).json({ message: 'Error creating verse activity', error: error.message });
  }
};

// @desc    Update a verse activity
// @route   PUT /api/admin/verse-activities/:id
// @access  Private
exports.updateVerseActivity = async (req, res) => {
  try {
    const activity = await VerseActivity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!activity) {
      return res.status(404).json({ message: 'Verse activity not found' });
    }

    res.json(activity);
  } catch (error) {
    console.error('Update verse activity error:', error);
    res.status(500).json({ message: 'Error updating verse activity', error: error.message });
  }
};

// @desc    Delete a verse activity
// @route   DELETE /api/admin/verse-activities/:id
// @access  Private
exports.deleteVerseActivity = async (req, res) => {
  try {
    const activity = await VerseActivity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Verse activity not found' });
    }

    res.json({ message: 'Verse activity deleted successfully' });
  } catch (error) {
    console.error('Delete verse activity error:', error);
    res.status(500).json({ message: 'Error deleting verse activity', error: error.message });
  }
};
