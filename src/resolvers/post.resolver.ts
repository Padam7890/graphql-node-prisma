import { IResolvers } from "@graphql-tools/utils";
import { getAllPosts } from "../services/postservices/postservice";

const postResolvers: IResolvers = {
  Query: {
    getPost: (parent, { id }, context) => {
      // Logic to fetch a post by ID from the database
    },
     allPosts: async (parent, args, {prisma}) => {
      const getAllPost = await getAllPosts(prisma);
      return getAllPost;
    },
  },
  Mutation: {
    createPost: async (parent, args:{ title:string, content:string, authorId:string }, context) => {
      //validation data

      
    },
    updatePost: (parent, { id, title, content }, context) => {
      // Logic to update a post in the database
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
