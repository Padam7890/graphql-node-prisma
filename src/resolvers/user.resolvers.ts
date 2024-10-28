import { IResolvers } from "@graphql-tools/utils";
import { generateToken, hasPassword } from "../utils/user-utils";
import {
  createUserSchema,
  updateUserSchema,
} from "../validation/uservalidation";
import { createUser, updateUser } from "../services/userservices/userservice";

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
      createUserSchema.validateSync(args, { abortEarly: true });
      const createnewUser = await createUser(args, context.prisma);
      const createToken = generateToken(createnewUser);
      return {
        id: createnewUser.id,
        name: createnewUser.name,
        email: createnewUser.email,
        password: createnewUser.password,
        token: createToken,
      };
    },
    updateUser: async (parent, { id, ...args }, context) => {
      updateUserSchema.validateSync(args, { abortEarly: true });
      const updatedUser = await updateUser(id, args, context.prisma);
      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
      };
    },

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
