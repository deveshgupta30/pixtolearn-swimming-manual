const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  languageCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    maxlength: 2
  },
  languageName: {
    type: String,
    required: true,
    trim: true
  },
  nativeName: {
    type: String,
    required: true,
    trim: true
  },
  isEUOfficial: {
    type: Boolean,
    default: false
  },
  content: {
    packs: {
      fullPack: {
        packType: String,
        packName: String,
        colorScheme: String,
        overview: String,
        whatIsIncluded: [String],
        sections: mongoose.Schema.Types.Mixed
      },
      basicPack: {
        packType: String,
        packName: String,
        colorScheme: String,
        overview: String,
        whatIsIncluded: [String],
        sections: mongoose.Schema.Types.Mixed
      },
      funPack: {
        packType: String,
        packName: String,
        colorScheme: String,
        overview: String,
        whatIsIncluded: [String],
        sections: mongoose.Schema.Types.Mixed
      },
      standsHolder: {
        packType: String,
        packName: String,
        colorScheme: String,
        overview: String,
        whatIsIncluded: [String],
        sections: mongoose.Schema.Types.Mixed
      }
    },
    company: {
      name: String,
      address: {
        street: String,
        city: String,
        postcode: String,
        country: String
      },
      website: String,
      email: String
    }
  }
}, {
  timestamps: true
});

// Index for faster queries (languageCode already has unique index from schema)
translationSchema.index({ isEUOfficial: 1 });

module.exports = mongoose.model('Translation', translationSchema);
