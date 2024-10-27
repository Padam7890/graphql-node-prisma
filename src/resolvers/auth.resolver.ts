import { IResolvers } from "@graphql-tools/utils";
import { getUserByEmail } from "../services/userservices/userservice";
import { comparePassword, generateToken } from "../utils/user-utils";
import { createResponse } from "../utils/response";
import { loginUserSchema } from "../services/userservices/validation";

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
      }
    },
  },
};
