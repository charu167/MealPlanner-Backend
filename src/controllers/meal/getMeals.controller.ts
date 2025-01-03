import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get All Meals and Their food items
export default async function getMeals(req: Request, res: Response) {
  try {
    const userId = Number(req.user?.id);
    const result = await prisma.meal.findMany({
      where: {
        userId: userId,
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
