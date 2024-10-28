import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    token: String!
    posts: [Post!]!
  }

  type UserUpdateResponse {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    getUser(id: ID!): User
    allUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password:String!): User!
    updateUser(id: ID!, name: String, email: String): UserUpdateResponse!
    deleteUser(id: ID!): User!
  }
`;

export default userTypeDefs;
