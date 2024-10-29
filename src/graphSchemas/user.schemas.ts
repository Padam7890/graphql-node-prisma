import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    token: String!
    posts: [QPost!]!
  }

  type UserUpdateResponse {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
  type UserResponse {
    data:[User]!
    message: String!
  }

  type Query {
    getUser(id: ID!): User!
    allUsers(limit:Int , offset:Int):UserResponse!
  }

  type Mutation {
    createUser(name: String!, email: String!, password:String!): User!
    updateUser(id: ID!, name: String, email: String): UserUpdateResponse!
    deleteUser(id: ID!): User!
  }
`;

export default userTypeDefs;
