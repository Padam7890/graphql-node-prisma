import { Post, PrismaClient } from "@prisma/client";
import { post } from "./types";

export function getAllPosts(
  { limit, offset },
  prisma: PrismaClient
): Promise<Post[]> {
  return prisma.post.findMany({
    take: limit,
    skip: offset,
    include: {
      author: true,
    },
  });
}

export async function createPost(
  data: post,
  prisma: PrismaClient
): Promise<Post> {
  console.log(data);
  return await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      authorId: data.authorId,
    },
  });
}

export async function updatePost(
  id: string,
  data: post,
  prisma: PrismaClient
): Promise<Post> {
  const checkPostExist = await findOnePost(id, prisma);
  if (!checkPostExist) {
    throw new Error("Post not found");
  }
  return await prisma.post.update({
    where: { id },
    data: {
      title: data.title || undefined,
      content: data.content || undefined,
    },
  });
}

export async function findOnePost(id: string, prisma: PrismaClient) {
  return await prisma.post.findFirst({
    where: { id },
  });
}

export async function deletePost(id: string, prisma: PrismaClient) {
  const checkPostExist = await findOnePost(id, prisma);
  if (!checkPostExist) {
    throw new Error("Post not found");
  }
  return await prisma.post.delete({
    where: { id },
  });
}
