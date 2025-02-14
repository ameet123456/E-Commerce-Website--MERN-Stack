const mongoose = require('mongoose');
const bannerSchema = new mongoose.Schema({
    image: { type: String, required: true }, // URL of the banner image
    title: { type: String },                   // Optional overlay text
    description: { type: String },             // Optional overlay text
    startTime: { type: Date, required: false }, // When the banner becomes active
    endTime: { type: Date, required: false },   // When the banner expires
    ctaUrl: { type: String },                  // Call-to-action URL
    clickCount: { type: Number, default: 0 },  // Click tracking
    createdAt: { type: Date, default: Date.now }, // Banner creation time
    alwaysDisplay: { type: Boolean, default: true }, // Whether the banner is always visible
  });
module.exports = mongoose.model('Banner', bannerSchema);