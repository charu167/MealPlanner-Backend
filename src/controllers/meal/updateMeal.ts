import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function updateMeal(req: Request, res: Response) {
  // Define the MealFood interface without macros
  interface MealFood {
    id?: number;
    foodName: string;
    mealId: number;
    foodId: string;
    quantity: number;
    // macros field is omitted since it's handled on the frontend
  }

  // Extract mealId from route parameters
  const mealId = Number(req.params.mealId);

  // Validate mealId
  if (isNaN(mealId)) {
    return res.status(400).json({ error: "Invalid meal ID." });
  }

  // Extract mealName and MealFoods from the request body
  const { name: mealName, MealFoods }: { name: string; MealFoods: MealFood[] } =
    req.body;

  try {
    // Check if the meal exists
    const existingMeal = await prisma.meal.findUnique({
      where: { id: mealId },
      include: { MealFoods: true },
    });

    if (!existingMeal) {
      return res.status(404).json({ error: "Meal not found." });
    }

    // Update meal name
    await prisma.meal.update({
      where: { id: mealId },
      data: { name: mealName },
    });

    // Get existing MealFoods from the database
    const existingMealFoods = existingMeal.MealFoods;

    // Extract existing MealFood IDs
    const existingMealFoodIds = existingMealFoods.map((mf: MealFood) => mf.id);

    // Extract incoming MealFood IDs (those that have an id)
    const incomingMealFoodIds = MealFoods.filter((mf: MealFood) => mf.id).map(
      (mf: MealFood) => mf.id
    );

    // Determine which MealFoods to delete (existing in DB but not in incoming array)
    const mealFoodsToDelete = existingMealFoods.filter(
      (mf: MealFood) => !incomingMealFoodIds.includes(mf.id)
    );

    // Delete removed MealFoods
    await Promise.all(
      mealFoodsToDelete.map(async (mf: MealFood) => {
        return await prisma.mealFoods.delete({
          where: { id: mf.id },
        });
      })
    );

    // Update existing MealFoods and add new ones
    await Promise.all(
      MealFoods.map(async (food) => {
        if (food.id) {
          // Update existing MealFood
          return await prisma.mealFoods.update({
            where: { id: food.id },
            data: {
              foodName: food.foodName,
              foodId: food.foodId,
              quantity: food.quantity,
              // macros are not stored, so they are ignored
            },
          });
        } else {
          // Add new MealFood
          return await prisma.mealFoods.create({
            data: {
              mealId: mealId,
              foodName: food.foodName,
              foodId: food.foodId,
              quantity: food.quantity,
              // macros are handled on the frontend
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
