// models/plantModel.js

const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: String,
  type: String,
  water: String,
  light: String,
  group: String,
  imageUrl: String
});

module.exports = mongoose.model('Plant', plantSchema);
