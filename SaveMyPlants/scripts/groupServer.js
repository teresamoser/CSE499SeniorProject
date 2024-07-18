const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = 'mongodb+srv://dbuser:dbuser@cluster0.0grlm01.mongodb.net/plants'; // Replace with your MongoDB URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define Plant schema and model
const plantSchema = new mongoose.Schema({
  name: String,
  group: String,
  type: String,
  water: String,
  light: String,
  imageUrl: String,
});

const Plant = mongoose.model('Plant', plantSchema);

// Define the API endpoint
app.get('/api/plants/name-group', async (req, res) => {
  try {
    const plants = await Plant.find({}, 'name group');
    res.json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
