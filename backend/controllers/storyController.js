const openai = require('../config/openai');
const Story = require('../models/Story');

exports.generateStory = async (req, res) => {
  const { prompt, genre } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are a creative storyteller. Write a short ${genre} story.` },
        { role: 'user', content: prompt },
      ],
      max_tokens: 700,
    });

    const storyText = completion.choices[0].message.content;

    const newStory = await Story.create({
      user: req.userId,
      prompt,
      content: storyText,
      genre,
    });

    res.status(200).json(newStory);
  } catch (error) {
    console.error('Error generating story:', error.message);
    res.status(500).json({
      message: 'Failed to generate story',
      error: error.message,
    });
  }
};

exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find({ user: req.userId });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stories', error: error.message });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Story deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete story', error: error.message });
  }
};
