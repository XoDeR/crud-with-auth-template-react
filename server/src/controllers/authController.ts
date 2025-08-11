import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import prisma from "../services/db";
import jwt from "jsonwebtoken";

const secret = "MY_SUPER_JWT_SECRET_MNBVCXZ";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({});
  } catch (error) {}
};

export const login = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
