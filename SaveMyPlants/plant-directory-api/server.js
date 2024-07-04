const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Plant = require('./models/plantModel');
const plantRouter = require('./routes/plants');

const app = express();
const PORT = process.env.PORT || 3005;

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
app.use('/api/routes/plants', plantRouter);

// GET all plants
app.get('/api/routes/plants', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

// GET single plant by ID
app.get('/api/routes/plants/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(plant);
  } catch (error) {
    console.error('Error fetching plant:', error);
    res.status(500).json({ error: 'Failed to fetch plant' });
  }
});

// POST create a new plant
app.post('/api/routes/plants', async (req, res) => {
  try {
    const newPlant = await Plant.create(req.body);
    res.status(201).json(newPlant);
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(500).json({ error: 'Failed to create plant' });
  }
});

// PUT update a plant by ID
app.put('/api/routes/plants/:id', async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlant) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(updatedPlant);
  } catch (error) {
    console.error('Error updating plant:', error);
    res.status(500).json({ error: 'Failed to update plant' });
  }
});

// DELETE delete a plant by ID
app.delete('/api/routes/plants/:id', async (req, res) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
    if (!deletedPlant) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json({ message: 'Plant deleted successfully' });
  } catch (error) {
    console.error('Error deleting plant:', error);
    res.status(500).json({ error: 'Failed to delete plant' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
