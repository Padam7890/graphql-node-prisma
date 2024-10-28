import { IResolvers } from "@graphql-tools/utils";
import { createPost, getAllPosts, updatePost } from "../services/postservices/postservice";
import { createUserValidate, updateUserValidate } from "../validation/postvalidation";
import {
  getUserByAuthorId,
  getUserById,
} from "../services/userservices/userservice";

const postResolvers: IResolvers = {
  Query: {
    getPost: (parent, { id }, context) => {
      // Logic to fetch a post by ID from the database
    },
    allPosts: async (parent, args, { prisma }) => {
      const getAllPost = await getAllPosts(prisma);
      return getAllPost;
    },
  },
  Mutation: {
    createPost: async (parent, args, { prisma }) => {
      createUserValidate.validateSync(args);
      const checkAuthotId = await getUserByAuthorId(args.authorId, prisma);
      if (!checkAuthotId) throw new Error("Author id not found");

      const newPost = await createPost(args, prisma, args.authorId);
      return newPost;
    },

    updatePost: async (parent, {id, ...args}, {prisma}) => {
      updateUserValidate.validateSync(args);
      const updatePosts = await updatePost(args.id, args, prisma);
      return updatePosts;

    },
  },
  Post: {
    authorId: (post, args, context) => {
      // Logic to fetch the author of the post
      return context.prisma.user.findUnique({
        where: { id: post.authorId },
      });
    },
  },
};

export default postResolvers;
