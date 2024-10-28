import { PrismaClient, User } from "@prisma/client";
import {
  CreateUserParameter,
  getUserByEmailParameter,
  GetUserByIdParameter,
  IUser,
} from "./types";
import { loginUserSchema } from "../../validation/uservalidation";
import { hasPassword } from "../../utils/user-utils";

export async function getUserById({
  id,
  prisma,
}: GetUserByIdParameter): Promise<User | null> {
  console.log(id, prisma);
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
export async function getUserByAuthorId(
  authorId: string,
  prisma: PrismaClient
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id: authorId },
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

export async function getAllUsers(prisma: PrismaClient): Promise<User[]> {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}

export async function createUser(usersData: IUser, prisma: PrismaClient) {
  console.log(usersData.email);
  const existingUser = await prisma.user.findUnique({
    where: { email: usersData.email },
  });
  if (existingUser) {
    throw new Error("Email already in use");
  }
  //has password
  const haspassword = hasPassword(usersData.password);
  const newUser = await prisma.user.create({
    data: {
      name: usersData.name,
      email: usersData.email,
      password: haspassword,
    },
  });
  return newUser;
}

export async function updateUser(
  id: string,
  updatedUser: Partial<IUser>,
  prisma: PrismaClient
): Promise<User | null> {
  const user = await getUserById({ id, prisma });
  if (!user) {
    throw new Error("User not found");
  }
  const existingUser = await prisma.user.findUnique({
    where: { email: updatedUser.email },
    select: { id: true },
  });
  if (existingUser && existingUser.id !== id) {
    throw new Error("Email already in use");
  }

  if (updatedUser.password) {
    updatedUser.password = hasPassword(updatedUser.password);
  }
  const updatedUserData = { ...user, ...updatedUser };
  const updated = await prisma.user.update({
    where: { id },
    data: updatedUserData,
  });

  return updated;
}

export async function deleteUser(
  id: string,
  prisma: PrismaClient
): Promise<User | null> {
  const user = await getUserById({ id, prisma });
  if (!user) {
    throw new Error("User not found");
  }
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return deletedUser;
}
