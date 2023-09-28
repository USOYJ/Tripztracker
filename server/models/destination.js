const { Schema, model } = require('mongoose');

const destinationSchema = new Schema({
 
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  time: {
    type: Date,
    default: Date.now,
  },  
});

const Destination = model('Destination', destinationSchema);

module.exports = Destination;
