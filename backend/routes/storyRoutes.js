// routes/storyRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  generateStory,
  getStories,
  deleteStory,
} = require('../controllers/storyController');

router.post('/generate', authMiddleware, generateStory);
router.get('/', authMiddleware, getStories);
router.delete('/:id', authMiddleware, deleteStory);

module.exports = router;
