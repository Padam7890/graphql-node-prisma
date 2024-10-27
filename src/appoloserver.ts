import { ApolloServer } from "apollo-server-express";
import postResolvers from "./resolvers/post.resolver";
import { userResolvers } from "./resolvers/user.resolvers";
import userTypeDefs from "./graphSchemas/user.schemas";
import postTypeDefs from "./graphSchemas/post.schemas";
import { prisma } from "../src/config/config";
import { authResolver } from "./resolvers/auth.resolver";
import { authTypeDefs } from "./graphSchemas/auth.schemas";
const resolvers = [userResolvers, postResolvers, authResolver];

const typeDefs = [userTypeDefs, postTypeDefs, authTypeDefs];

export const appoloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: () => ({
    prisma,
  }),
});
