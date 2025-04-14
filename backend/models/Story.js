// models/Story.js
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  prompt: String,
  content: String,
  genre: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Story', storySchema);
