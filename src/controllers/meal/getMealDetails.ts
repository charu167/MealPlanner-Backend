import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get a single meal and it's food items based on mealId
export async function getMealDetails(req: Request, res: Response) {
  try {
    const mealId = Number(req.query.mealId);
    console.log(req.query);
    const result = await prisma.meal.findUnique({
      where: {
        id: mealId,
      },
      include: {
        MealFoods: true,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
