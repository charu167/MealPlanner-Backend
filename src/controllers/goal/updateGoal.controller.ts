import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function updateGoal(req: Request, res: Response) {
  try {
    const userId = Number(req.user?.id);
    const target_weight = Number(req.body.target_weight);
    const caloric_adjustment = Number(req.body.caloric_adjustment);
    const surplus = Boolean(req.body.surplus);
    const protein = Number(req.body.protein);
    const fats = Number(req.body.fats);
    const carbs = Number(req.body.carbs);
    const activity_level = Number(req.body.activity_level);

    const goal = await prisma.goal.findFirst({
      where: {
        userId,
      },
    });

    const result = await prisma.goal.update({
      where: {
        id: goal?.id,
      },
      data: {
        target_weight,
        caloric_adjustment,
        surplus,
        protein,
        fats,
        carbs,
        activity_level,
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
