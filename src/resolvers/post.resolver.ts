import { IResolvers } from "@graphql-tools/utils";

const postResolvers: IResolvers = {
  Query: {
    getPost: (parent, { id }, context) => {
      // Logic to fetch a post by ID from the database
    },
    allPosts: (parent, args, context) => {
      // Logic to fetch all posts from the database
    },
  },
  Mutation: {
    createPost: (parent, { title, content, authorId }, context) => {
      // Logic to create a post in the database
      return context.prisma.post.create({
        data: {
          title,
          content,
          author: { connect: { id: authorId } }, // Connect post to the author
        },
      });
    },
    updatePost: (parent, { id, title, content }, context) => {
      // Logic to update a post in the database
    },
  },
  Post: {
    author: (post, args, context) => {
      // Logic to fetch the author of the post
      return context.prisma.user.findUnique({
        where: { id: post.authorId }, 
      });
    },
  },
};

export default postResolvers;
