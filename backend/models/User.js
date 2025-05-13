// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String , required: true }, // <-- this must exist
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Use bcrypt in production
});

module.exports = mongoose.model('User', userSchema);
