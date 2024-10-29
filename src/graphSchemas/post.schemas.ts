import { gql } from "apollo-server-express";

const postTypeDefs = gql`
  type QPost {
    id: ID!
    title: String!
    content: String!
    authorId: String!
  }

  input PostInput {
    title: String!
    content: String!
    authorId: String!
  }

  type PostResponse {
    data: QPost!
    message: String!
  }

  extend type Query {
    getPost(id: ID!): QPost!
    allPosts(limit:Int, offset:Int): [QPost!]!
  }

  extend type Mutation {
    createPost(input: PostInput!): PostResponse!
    updatePost(id: ID!, title: String, content: String): QPost!
  }
`;

export default postTypeDefs;
