const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  location: {
    type: String,
    required: 'Pick a vacation Location!',
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

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
