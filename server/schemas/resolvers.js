const { AuthenticationError } = require('apollo-server-express');
const { User, Destination } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('destinations');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('destinations');
    },
    destinations: async () => {
      return Destination.find({});
    },
    destination: async (parent, { destinationId }) => {
      return Destination.findOne({ _id: destinationId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('destinations');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addDestination: async (parent, { destination }, context) => {
      if (context.user) {
        const newDestination = await Destination.create({ destination });
        await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { destinations: newDestination._id } });
        return newDestination;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    removeDestination: async (parent, { destinationId }, context) => {
      if (context.user) {
        const destination = await Destination.findOneAndDelete({
          _id: destinationId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { destinations: destinationId } }
        );

        return destination;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateDestination: async (parent, { destinationId, destination }, context) => {
      if (context.user) {
        const updatedDestination = await Destination.findOneAndUpdate(
          { _id: destinationId },
          { destination },
          { new: true }
        );
        return updatedDestination;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;

