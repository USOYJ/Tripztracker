const { Schema, model } = require('mongoose');

const destinationSchema = new Schema({
 
  location: {
    type: String,
    required: 'Pick a trip Location!',
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

const Destination = model('Destination', destinationSchema);

module.exports = Destination;
