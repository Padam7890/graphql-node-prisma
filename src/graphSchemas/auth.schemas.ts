import { gql } from "apollo-server-express";

export const authTypeDefs = gql`
  input LoginInput {
    email: String!
    password: String!
  }
  input registerInput{
    name: String!
    email: String!
    password: String!
  }

  type AuthResponse {
    name: String!
    email: String!
    token: String!
    message: String!
  }


  extend type Mutation {
    login(input: LoginInput!): AuthResponse!
    signup(input: registerInput!): AuthResponse!
  }
`;
