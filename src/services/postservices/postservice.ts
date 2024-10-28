import { Post, PrismaClient } from "@prisma/client";
import { post } from "./types";

export function getAllPosts(prisma: PrismaClient): Promise<Post[]> {
  return prisma.post.findMany({
    include: {
      author: true,
    },
  });
}

export async function createPost(
  data: post,
  prisma: PrismaClient,
  authorId: string
): Promise<Post> {
  return await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      author: { connect: { id: authorId } },
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
  return await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
    },
  });
}
