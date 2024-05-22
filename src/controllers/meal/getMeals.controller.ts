import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get All Meals and Their food items
export default async function getMeals(req: Request, res: Response) {
  try {
    const id = Number(req.user?.id);
    const result = await prisma.meal.findMany({
      where: {
        userId: id,
      },
      select: {
        name: true,
        id: true,
      },
    });

    const result1 = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        Meal: {
          select: {
            id: true,
            name: true,
            MealFoods: true,
          },
        },
      },
    });

    res.status(200).json(result1);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
