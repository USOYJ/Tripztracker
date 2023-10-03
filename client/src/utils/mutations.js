import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
mutation Mutation($location: String!, $departure: String!) {
  addThought(location: $location, departure: $departure) {
    _id
    location
    departure
  }
}
`;

export const UPDATE_THOUGHT = gql`
  mutation updateThought($thoughtId: ID!, $location: String!, $departure: String!) {
    updateThought(thoughtId: $thoughtId, location: $location, departure: $departure) {
      _id
      location
      departure
    }
  }
`;

export const REMOVE_THOUGHT = gql`
  mutation removeThought($thoughtId: ID!) {
    removeThought(thoughtId: $thoughtId) {
      _id
      location
      departure
    }
  }
`;
