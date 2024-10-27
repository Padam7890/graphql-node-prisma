import { PrismaClient, User } from "@prisma/client";
import { getUserByEmailParameter, GetUserByIdParameter } from "./types";
import { loginUserSchema } from "./validation";

export async function getUserById({
  id,
  prisma,
}: GetUserByIdParameter): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function getUserByEmail({
  email,
  prisma,
}: getUserByEmailParameter): Promise<User | null> {

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
