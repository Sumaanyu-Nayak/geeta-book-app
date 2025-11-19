const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  chapterId: {
    type: String,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['read', 'watch', 'experiments', 'listen', 'quiz', 'reflection', 'discussion', 'dailyVerse'],
    required: true,
  },
  iconUrl: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual for activity ID
activitySchema.virtual('id').get(function() {
  return `${this.chapterId}-${this.type}`;
});

module.exports = mongoose.model('Activity', activitySchema);
