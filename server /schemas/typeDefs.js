const typeDefs = `
  type Destination {
    _id: ID
    destination: String
  }

  type Query {
    destinations: [Destination]!
    destination(destinationId: ID!): Destination
  }
  
  # Important for useMutation: We define our Mutation type to inform our entrypoints
  type Mutation {
    addDestination(destination: String!): Destination
  }
`;

module.exports = typeDefs;
