import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../services/postservices/postservice";
import { UpdatePostArgs } from "../services/postservices/types";
import { getUserByAuthorId } from "../services/userservices/userservice";
import {
  createUserValidate,
  updateUserValidate,
} from "../validation/postvalidation";

export const postCreate = async (parent, { input }, { prisma }) => {
  await createUserValidate.validate(input, { abortEarly: false });
  const author = await getUserByAuthorId(input.authorId, prisma);
  if (!author) throw new Error("Author ID not found");
  // Create the post
  const newPost = await createPost(input, prisma);
  return {
    data: newPost,
    message: "Post created successfully",
  };
};

export const postUpdate = async (
  parent,
  { id, ...args }: UpdatePostArgs,
  { prisma }
) => {
  const updatePosts = await updatePost(id, args, prisma);
  return updatePosts;
};
export const postDelete = async (parent, { id }, { prisma }) => {
  const deletePosts = await deletePost(id, prisma);
  return {
    data: deletePosts,
    message: "Post deleted successfully",
  };
};

export const postGetAll = async (
  parent,
  filter: { limit: number; offset: number },
  { prisma }
) => {
  const getAllPost = await getAllPosts(filter, prisma);
  return getAllPost;
};
