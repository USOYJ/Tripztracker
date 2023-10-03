import { gql } from '@apollo/client';

export const Get_Thought = gql`
query Query($thoughtId: ID!) {
  thought(thoughtId: $thoughtId) {
    _id
    location
    departure
  }
}`

export const ME = gql ` 
query Query {
  me {
    _id
    username
    email
    password
    thoughts {
      _id
      location
      departure
    }
  }
}`