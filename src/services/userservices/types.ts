import { PrismaClient } from "@prisma/client";

export interface GetUserByIdParameter {
    id: string;
    prisma: PrismaClient;
  }
  
 export interface getUserByEmailParameter {
    email: string;
    prisma: PrismaClient;
  }
  
  //create a new user
  export interface CreateUserParameter {
    usersData:IUser;
    prisma: PrismaClient;
  }

  export interface IUser{
    id?: string;
    name: string;
    email: string;
    password: string;
  }