const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/user');
const { post } = require('../plant-directory-api/routes/plants');

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://dbuser:dbuser@cluster0.0grlm01.mongodb.net/LoginSignup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log('Failed to connect to MongoDB', err);
});

// Routes to serve HTML pages
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// API routes for signup and login
app.post('/api/users/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.status(400).json({ message: 'User registration failed', error });
  }
});

app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});