import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { generateTokens } from "../../utilities/jwt";

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  interface Data {
    username: string;
    email: string;
    password: string;
    gender: string;
    height: number;
    weight: number;
    date_of_birth: string;
  }

  const data: Data = req.body; // Extracting data from request object
  data.password = await bcrypt.hash(data.password, 10); // Hashing the password before storing in the db
  try {
    const result = await prisma.user.create({
      data,
      select: {
        username: true,
        email: true,
        id: true,
      },
    });

    const result2 = await prisma.goal.create({
      data: {
        userId: result.id,
      },
    });

    const { access_token, refresh_token } = generateTokens(
      result.email,
      result.username,
      result.id
    );
    console.log(result);
    res
      .status(200)
      .json({ message: "Signed Up :)", access_token, refresh_token });
  } catch (error) {
    console.log(error);
  }
}
