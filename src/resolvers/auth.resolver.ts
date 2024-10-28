import { IResolvers } from "@graphql-tools/utils";
import {
  createUser,
  getUserByEmail,
} from "../services/userservices/userservice";
import { comparePassword, generateToken } from "../utils/user-utils";
import { createResponse } from "../utils/response";
import {
  loginUserSchema,
  signupUserSchema,
} from "../validation/uservalidation";

export const authResolver: IResolvers = {
  Mutation: {
    login: async (_, { input: { email, password } }, { prisma }) => {
      await loginUserSchema.validate({ email, password }, { abortEarly: true });
      const getUser = await getUserByEmail({ email, prisma });
      const passwordCheck = comparePassword(password, getUser.password);
      if (!passwordCheck) {
        throw new Error("Invalid credentials");
      }
      const genToken = generateToken(getUser);
      return {
        name: getUser.name,
        email: getUser.email,
        token: genToken,
        message: "Logged in successfully",
      };
    },
    signup: async (_, { input }, { prisma }) => {
      await signupUserSchema.validate(input, { abortEarly: true });
      const createUsers = await createUser(input, prisma);
      const genToken = generateToken(createUsers);
      return {
        name: createUsers.name,
        email: createUsers.email,
        token: genToken,
        message: "Logged in successfully",
      };
    },
  },
};
