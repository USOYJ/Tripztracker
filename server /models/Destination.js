const { Schema, model } = require('mongoose');

const destinationSchema = new Schema({
 
  destination: {
    type: String,
    required: true,
    trim: true,
  },
});

const Destination = model('Destination', destinationSchema);

module.exports = Destination;
