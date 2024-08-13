const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const sendEmail = require('../../utils/sendEmail');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Register a new user with email confirmation
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ email, password });
    const token = user.generateConfirmationToken();
    await user.save();

    const confirmationUrl = `http://${req.headers.host}/api/auth/confirm/${token}`;
    const message = `Please confirm your email by clicking the following link: ${confirmationUrl}`;

    await sendEmail(user.email, 'Email Confirmation', message);

    res.status(201).json({ message: 'Registration successful, please check your email to confirm your account.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Confirm email
router.get('/confirm/:token', async (req, res) => {
  try {
    const user = await User.findOne({ confirmationToken: req.params.token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    user.isConfirmed = true;
    user.confirmationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email confirmed, you can now log in.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.isConfirmed) {
      return res.status(400).json({ message: 'Invalid credentials or email not confirmed' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Handle Google sign-in
router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  const { email, googleId } = verifyGoogleToken(token);

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, googleId, isConfirmed: true }); 
    await user.save();
  }

  const authToken = user.generateAuthToken();
  res.status(200).json({ token: authToken });
});

module.exports = router;