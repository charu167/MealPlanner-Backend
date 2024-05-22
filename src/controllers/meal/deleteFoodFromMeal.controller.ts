import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function deleteFoodFromMeal(req: Request, res: Response) {
  try {
    const foodId = String(req.query.foodId);
    const mealId = Number(req.query.mealId);
    const result1 = await prisma.mealFoods.findFirst({
      where: {
        foodId,
        mealId,
      },
      select: {
        id: true,
      },
    });

    const entryId = result1?.id;
    const result = await prisma.mealFoods.delete({
      where: {
        id: entryId,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
