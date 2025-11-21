const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  chapterId: {
    type: Number,
    required: true,
    min: 1,
    max: 18,
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
    required: true,
    enum: ['read', 'watch', 'experiments', 'listen', 'quiz', 'reflection', 'discussion', 'dailyVerse'],
  },
  iconUrl: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = `${ret.chapterId}-${ret.type}`;
      return ret;
    }
  },
  toObject: { virtuals: true },
});

activitySchema.index({ chapterId: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Activity', activitySchema);
