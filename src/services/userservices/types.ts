import { PrismaClient } from "@prisma/client";

export interface GetUserByIdParameter {
    id: string;
    prisma: PrismaClient;
  }
  
 export interface getUserByEmailParameter {
    email: string;
    prisma: PrismaClient;
  }
  