import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hasPassword = (password: string): String => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const comparePassword = (password: string, passwordHash:string):Boolean => {
    const compPassword = bcrypt.compareSync(password, passwordHash);
    return compPassword;
}

export const generateToken = (getUser:User):string=>{
    const token = jwt.sign({ userId: getUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;

}