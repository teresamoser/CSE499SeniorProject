const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Plant = require('./models/plantModel');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = 'mongodb+srv://dbuser:dbuser@cluster0.0grlm01.mongodb.net/plants'; // Replace with your MongoDB URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
app.get('SaveMyPlants/plant-directory-api/routes/name-group.js', async (req, res) => {
  try {
    const plants = await Plant.find({}, 'name group');
    res.json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
