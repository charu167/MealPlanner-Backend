import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getUserDetails(req: Request, res: Response) {
  try {
    const userId = Number(req.user?.id);
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        gender: true,
        height: true,
        weight: true,
        date_of_birth: true,
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
