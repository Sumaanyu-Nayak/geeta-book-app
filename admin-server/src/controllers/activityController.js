// Use local models
const Activity = require('../models/Activity');

// @desc    Create a new activity
// @route   POST /api/admin/activities
// @access  Private
exports.createActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error('Create activity error:', error);
    res.status(500).json({ message: 'Error creating activity', error: error.message });
  }
};

// @desc    Update an activity
// @route   PUT /api/admin/activities/:id
// @access  Private
exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json(activity);
  } catch (error) {
    console.error('Update activity error:', error);
    res.status(500).json({ message: 'Error updating activity', error: error.message });
  }
};

// @desc    Delete an activity
// @route   DELETE /api/admin/activities/:id
// @access  Private
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Delete activity error:', error);
    res.status(500).json({ message: 'Error deleting activity', error: error.message });
  }
};
