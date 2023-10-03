const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }

  type Thought {
    _id: ID
    location: String
    departure: String
  }

  type AuthPayload {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    thoughts: [Thought]
    thought(thoughtId: ID!): Thought
  }
  type Mutation {
    addThought(location: String!, departure: String!): Thought
    addUser(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    removeThought(thoughtId: ID!): Thought
    updateThought(thoughtId: ID!, location: String, departure: String): Thought
  }
`;

module.exports = typeDefs;
