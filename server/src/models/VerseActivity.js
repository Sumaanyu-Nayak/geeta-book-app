const mongoose = require('mongoose');

const verseActivitySchema = new mongoose.Schema({
  chapterId: {
    type: String,
    required: true,
    index: true,
  },
  verseNumber: {
    type: Number,
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
    enum: ['experiment', 'meditation', 'reflection', 'practice', 'journaling', 'daily_challenge'],
    required: true,
  },
  instructions: [{
    step: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  }],
  duration: {
    type: String, // e.g., "5 minutes", "1 day", "1 week"
    default: '',
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  benefits: [{
    type: String,
  }],
  iconUrl: {
    type: String,
    default: '',
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = `${ret.chapterId}-${ret.verseNumber}-${ret.order}`;
      return ret;
    }
  },
  toObject: { virtuals: true },
});

// Compound index for efficient queries
verseActivitySchema.index({ chapterId: 1, verseNumber: 1, order: 1 });

module.exports = mongoose.model('VerseActivity', verseActivitySchema);
