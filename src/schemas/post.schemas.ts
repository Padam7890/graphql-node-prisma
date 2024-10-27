import { gql } from "apollo-server-express";

const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  extend type Query {
    getPost(id: ID!): Post
    allPosts: [Post!]!
  }

  extend type Mutation {
    createPost(title: String!, content: String!, authorId: ID!): Post!
    updatePost(id: ID!, title: String, content: String): Post!
  }
`;

export default postTypeDefs;
