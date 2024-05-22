import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function updateUserDetails(req: Request, res: Response) {
  try {
    const userId = Number(req.user?.id);
    const username = req.body.username;
    const date_of_birth = req.body.date_of_birth;
    const gender = req.body.gender;
    const height = Number(req.body.height);
    const weight = Number(req.body.weight);
    console.log("req body: ", req.body);
    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: username,
        date_of_birth: date_of_birth,
        gender: gender,
        height: height,
        weight: weight,
      },
      select: {
        id: true,
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
