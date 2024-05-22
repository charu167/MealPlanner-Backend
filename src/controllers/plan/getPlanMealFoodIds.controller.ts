import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getPlanMealFoodIds(req: Request, res: Response) {
  try {
    const planId = Number(req.query.planId);
    const result = await prisma.planMeals.findMany({
      where: {
        planId,
      },
      include: {
        meal: {
          include: {
            MealFoods: true,
          },
        },
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
