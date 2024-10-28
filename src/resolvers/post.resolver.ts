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

    },
    allPosts: async (parent, args, { prisma }) => {
      const getAllPost = await getAllPosts(prisma);
      return getAllPost;
    },
  },
  Mutation: {
    createPost: async (parent, { input }, { prisma }) => {
      await createUserValidate.validate(input, { abortEarly: false });
      const author = await getUserByAuthorId(input.authorId, prisma);
      if (!author) throw new Error("Author ID not found");
    
      // Create the post
      const newPost = await createPost(input, prisma);
      return {
        data: newPost,
        message: "Post created successfully",
      };
    },
    

    updatePost: async (parent, {id, ...args}, {prisma}) => {
      updateUserValidate.validateSync(args);
      const updatePosts = await updatePost(args.id, args, prisma);
      return updatePosts;

    },
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
