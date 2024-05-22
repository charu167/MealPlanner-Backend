import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getGoal(req: Request, res: Response) {
  try {
    const userId = Number(req.user?.id);
    const result = await prisma.goal.findFirst({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        target_weight: true,
        caloric_adjustment: true,
        surplus: true,
        protein: true,
        fats: true,
        carbs: true,
        activity_level: true,
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
