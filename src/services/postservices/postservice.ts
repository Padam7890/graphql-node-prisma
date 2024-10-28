import { Post, PrismaClient } from "@prisma/client";
import { post } from "./types";

export function getAllPosts(prisma: PrismaClient): Promise<Post[]> {
  return prisma.post.findMany({
    include: {
      author: true,
    },
  });
}

export function createPost(
  data: post,
  prisma: PrismaClient,
  authorId: string
): Promise<Post> {
  return prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      author: { connect: { id: authorId } },
    },
  });
}
