import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function updateMealDetails(req: Request, res: Response) {
  interface MealFood {
    id?: number;
    foodName: string;
    mealId: number;
    foodId: string;
    quantity: number;
    macros: {
      protein: number;
      carbs: number;
      fats: number;
      calories: number;
    };
  }

  const mealId = Number(req.query.mealId);
  const { name: mealName, MealFoods }: { name: string; MealFoods: MealFood[] } =
    req.body;

  try {
    // Update meal name
    await prisma.meal.update({
      where: { id: mealId },
      data: { name: mealName },
    });

    // Update or add MealFoods
    await Promise.all(
      MealFoods.map(async (food) => {
        if (food.id) {
          // Update existing food
          return await prisma.mealFoods.update({
            where: { id: food.id },
            data: {
              quantity: food.quantity,
              // Possibly update other details like foodName, macros etc., if needed
            },
          });
        } else {
          // Add new food
          return await prisma.mealFoods.create({
            data: {
              mealId: mealId,
              foodName: food.foodName,
              foodId: food.foodId,
              quantity: food.quantity,
              // You might want to store macros as well, depending on your schema adjustments
            },
          });
        }
      })
    );

    res.status(200).json({ message: "Meal updated successfully!" });
  } catch (error) {
    console.error("Error updating meal details: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
