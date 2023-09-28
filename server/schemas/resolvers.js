const { Destination } = require('../models');

const resolvers = {
  Query: {
    destinations: async () => {
      return Destination.find();
    },

    destination: async (parent, { destinationId }) => {
      return Destination.findOne({ _id: destinationId });
    },
  },
  // Important for useMutation: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Mutation: {
    addDestination: async (parent, { destination}) => {
      return Destination.create({destination });
    },
  },  
};

module.exports = resolvers;
