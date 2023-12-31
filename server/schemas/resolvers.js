const { AuthenticationError } = require('apollo-server-express');
const { User , Thought } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async () => {
        return User.find().populate('thoughts');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username }).populate('thoughts');
      },
      thoughts: async (parents, { username }) => {
        return Thought.find({})
      },
      thought: async (parent, { thoughtId }) => {
        return User.findOne(Thought)
      },
      me: async (parent, recs, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('thoughts');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
    Mutation: {
      addThought: async (parent, { location , departure}, context) => {
        const thought = await Thought.create({ location, departure})
        console.log( thought)
        await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { thoughts: thought._id}})
        return thought; 
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
      removeThought: async (parent, { thoughtId }, context) => {
        if (context.user) {
          const thought = await Thought.findOneAndDelete({
            _id: thoughtId,
          });
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { thoughts: thought._id } }
          );

          return thought;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      updateThought: async (parent, { thoughtId, location,departure  }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $set: { location, departure } },
          { new: true }
        );
        await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { thoughts: thought._id}})
        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
}
};

module.exports = resolvers;
