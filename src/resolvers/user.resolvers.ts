import { IResolvers } from "@graphql-tools/utils";
import { hasPassword } from "../utils/user-utils";
import { createUserSchema } from "../services/userservices/validation";

export const userResolvers: IResolvers = {
  Query: {
    getUser: async (parent, { id }, context) => {
      await context.prisma.user.findMany({
        where: { id },
      });
    },
    allUsers: (parent, args, context) => {},
  },
  Mutation: {
    createUser: async (
      parent,
      args: { name: string; email: string; password: string },
      context
    ) => {
      await createUserSchema.validate(args, { abortEarly: true });
      const existingUser = await context.prisma.user.findUnique({
        where: { email: args.email },
      });
      if (existingUser) {
        throw new Error("Email already in use");
      }
      return context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hasPassword(args.password),
        },
      });
    },
    updateUser: (parent, { id, name, email }, context) => {},
    deleteUser: (parent, { id }, context) => {},
  },
  User: {
    posts: (user, args, context) => {
      return context.prisma.post.findMany({
        where: { authorId: user.id },
      });
    },
  },
};
