import { IResolvers } from "@graphql-tools/utils";
import { getAllUser, userById, userCreate, userDelete, userUpdate } from "../controller/usecontroller";

export const userResolvers: IResolvers = {
  Query: {
    getUser:userById ,
    allUsers: getAllUser
  },
  Mutation: {
    createUser: userCreate,
    updateUser: userUpdate,
    deleteUser: userDelete
  },
  User: {
    posts: (user, args, context) => {
      return context.prisma.post.findMany({
        where: { authorId: user.id },
      });
    },
  },
};
