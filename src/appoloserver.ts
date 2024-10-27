import { ApolloServer } from "apollo-server-express";
import postResolvers from "./resolvers/post.resolver";
import { userResolvers } from "./resolvers/user.resolvers";
import userTypeDefs from "./schemas/user.schemas";
import postTypeDefs from "./schemas/post.schemas";
import { prisma } from "../src/config/config";
const resolvers = [userResolvers, postResolvers];

const typeDefs = [userTypeDefs, postTypeDefs];

export const appoloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: () => ({
    prisma,
  }),
});
