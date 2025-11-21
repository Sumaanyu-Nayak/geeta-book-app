const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  totalChaptersCompleted: {
    type: Number,
    default: 0,
  },
  totalVersesCompleted: {
    type: Number,
    default: 0,
  },
  totalActivitiesCompleted: {
    type: Number,
    default: 0,
  },
  chapterProgress: {
    type: Map,
    of: {
      versesCompleted: { type: Number, default: 0 },
      totalVerses: { type: Number, required: true },
      activitiesCompleted: { type: Number, default: 0 },
      totalActivities: { type: Number, default: 6 },
      isCompleted: { type: Boolean, default: false },
      completedAt: { type: Date },
    },
    default: {},
  },
  completedVerses: [{
    verseId: String,
    completedAt: Date,
  }],
  completedActivities: [{
    activityId: String,
    completedAt: Date,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserProgress', userProgressSchema);
