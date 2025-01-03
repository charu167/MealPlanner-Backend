import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { generateTokens } from "../../utilities/jwt";

const prisma = new PrismaClient();

export async function login(req: Request, res: Response) {
  interface Data {
    email: string;
    password: string;
  }

  const data: Data = req.body; // Extracting data

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        password: true,
        firstname: true,
        email: true,
        id: true,
      },
    });

    if (user && (await bcrypt.compare(data.password, user?.password))) {
      const { access_token, refresh_token } = generateTokens(
        user?.firstname,
        user?.email,
        user.id
      );
      res
        .status(200)
        .json({ message: "Logged in :)", access_token, refresh_token });
    } else {
      res.status(400).json({ message: "Couldn't log in :(" });
    }
  } catch (error) {
    res.status(400).json({ message: "Couldn't log in :(", error });
    console.log(error);
  }
}
