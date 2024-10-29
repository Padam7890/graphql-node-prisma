import { IResolvers } from "@graphql-tools/utils";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../services/postservices/postservice";
import {
  createUserValidate,
  updateUserValidate,
} from "../validation/postvalidation";
import {
  getUserByAuthorId,
  getUserById,
} from "../services/userservices/userservice";
import { postCreate, postDelete, postGetAll, postUpdate } from "../controller/postcontroller";

const postResolvers: IResolvers = {
  Query: {
    getPost: (parent, { id }, context) => {},
    allPosts:postGetAll ,
  },
  Mutation: {
    createPost:postCreate ,
    updatePost: postUpdate,
    deletePost: postDelete,
  },
  QPost: {
    authorId: (post, args, context) => {
      return context.prisma.user.findUnique({
        where: { id: post.authorId },
      });
    },
  },
};

export default postResolvers;
