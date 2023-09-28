const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  destinations: [
    {
    presentLocation: {
      type: String,
      required: 'Pick a trip Location!',
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
  },
  ],
});

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;