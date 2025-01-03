import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Interface
interface Data {
  name: string;
  MealFoods: {
    foodName: string;
    foodId: string;
    quantity: number;
  }[];
}

async function createMeal(req: Request, res: Response) {
  const userId = req.user?.id;

  try {
    const data = req.body as Data;
    if (!data) {
      res.status(400).json({ message: "Data not found" });
    }

    const result = await prisma.meal.create({
      data: {
        name: data.name,
        userId: Number(userId),
        MealFoods: {
          create: data.MealFoods.map((food) => ({
            foodName: food.foodName,
            foodId: food.foodId,
            quantity: food.quantity,
          })),
        },
      },
      select: {
        id: true,
        name: true,
        MealFoods: true,
      },
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Oops something went wrong", error });
    console.log(error);
  }
}

export default createMeal;
