import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../services/userservices/userservice";
import { generateToken } from "../utils/user-utils";
import {
  createUserSchema,
  updateUserSchema,
} from "../validation/uservalidation";

export const getAllUser = async (parent, args, { prisma }) => {
  const allUser = await getAllUsers(prisma);
  return {
    data: allUser,
    message: "All users fetched successfully",
  };
};

export const userById = async (parent, { id }, { prisma }) => {
  const userGetById = await getUserById(id, prisma);
  return userGetById;
};

export const userCreate = async (
  parent,
  args: { name: string; email: string; password: string },
  { prisma }
) => {
  createUserSchema.validateSync(args, { abortEarly: true });
  const createnewUser = await createUser(args, prisma);
  const createToken = generateToken(createnewUser);
  return {
    id: createnewUser.id,
    name: createnewUser.name,
    email: createnewUser.email,
    password: createnewUser.password,
    token: createToken,
  };
};

export const userUpdate = async (parent, { id, ...args }, { prisma }) => {
  updateUserSchema.validateSync(args, { abortEarly: true });
  const updatedUser = await updateUser(id, args, prisma);
  return {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    password: updatedUser.password,
  };
};

export const userDelete = async (parent, { id }, { prisma }) => {
  const userDelete = await deleteUser(id, prisma);
  return userDelete;
};
