const mongoose = require('mongoose');

const verseSchema = new mongoose.Schema({
  chapterId: {
    type: String,
    required: true,
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
      ret.verse = ret.textSanskrit;
      ret.translation = ret.translationEnglish;
      return ret;
    }
  },
  toObject: { virtuals: true },
});

verseSchema.index({ chapterId: 1, verseNumber: 1 }, { unique: true });

module.exports = mongoose.model('Verse', verseSchema);
