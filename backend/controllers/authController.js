// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body; // <-- add name here
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User exists' });

    const user = await User.create({ name, email, password }); // <-- include name
    const token = createToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};
