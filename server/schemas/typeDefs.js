const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    destinations: [Destination]! # Updated to use "Destination" type
  }

  type Destination {
    _id: ID
    destination: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    destinations: [Destination]!
    destination(destinationId: ID!): Destination
  }

  type Mutation {
    addDestination(destination: String!): Destination
    addUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    removeDestination(destinationId: ID!): Destination
    updateDestination(destinationId: ID!, destination: String!): Destination
  }
`;

module.exports = typeDefs;
