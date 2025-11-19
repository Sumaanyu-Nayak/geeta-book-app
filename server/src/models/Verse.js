const mongoose = require('mongoose');

const verseSchema = new mongoose.Schema({
  chapterId: {
    type: String,
    required: true,
    index: true,
  },
  verseNumber: {
    type: Number,
    required: true,
  },
  textSanskrit: {
    type: String,
    required: true,
  },
  textTransliteration: {
    type: String,
    required: true,
  },
  translationEnglish: {
    type: String,
    required: true,
  },
  translationHindi: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    default: '',
  },
  audioUrl: {
    type: String,
    default: '',
  },
  images: [{
    type: String,
  }],
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = `${ret.chapterId}-${ret.verseNumber}`;
      return ret;
    }
  },
  toObject: { virtuals: true },
});

// Compound index for efficient queries
verseSchema.index({ chapterId: 1, verseNumber: 1 }, { unique: true });

module.exports = mongoose.model('Verse', verseSchema);
