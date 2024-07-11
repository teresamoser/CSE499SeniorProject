const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  water: { type: String, required: true },
  light: { type: String, required: true },
  group: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
