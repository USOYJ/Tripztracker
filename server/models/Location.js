const { Schema, model } = require('mongoose');

const locationSchema = new Schema({
  location: {
    type: String,
    required: 'Pick a location!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  departure: {
    type: String,
    required: true,
    trim: true,
  },
});

const Location = model('Location', locationSchema);

module.exports = Location;