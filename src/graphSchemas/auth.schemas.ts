import { gql } from "apollo-server-express";

export const authTypeDefs = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    name: String!
    email: String!
    token: String!
    message: String!
  }

  extend type Mutation {
    login(input: LoginInput!): LoginResponse!
  }
`;
