const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 18,
  },
  titleSanskrit: {
    type: String,
    required: true,
  },
  titleEnglish: {
    type: String,
    required: true,
  },
  titleHindi: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  verseCount: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    default: '',
  },
  keyThemes: [{
    type: String,
  }],
  totalActivities: {
    type: Number,
    default: 7,
  },
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret.number.toString();
      return ret;
    }
  },
  toObject: { virtuals: true },
});

module.exports = mongoose.model('Chapter', chapterSchema);
