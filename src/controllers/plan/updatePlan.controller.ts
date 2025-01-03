import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface UpdateFood {
  foodId: string;
  quantity?: number; // Optional: Only update if provided
}

interface UpdateMeal {
  mealId: number;
  foods?: UpdateFood[]; // Optional: Only update if provided
}

interface UpdatePlanBody {
  name?: string; // Optional: Only update if provided
  meals?: UpdateMeal[]; // Optional: Only update if provided
}

export default async function updatePlan(req: Request, res: Response) {
  const { name, meals } = req.body as UpdatePlanBody;

  try {
    const { planId } = req.params;

    if (!planId) {
      return res.status(400).json({ message: "planId not provided" });
    }

    const parsedPlanId = Number(planId);

    if (isNaN(parsedPlanId)) {
      return res.status(400).json({ message: "Invalid planId provided" });
    }

    // Build the data object dynamically based on the provided fields
    const data: any = {};

    if (name) {
      data.name = name;
    }

    if (meals && Array.isArray(meals)) {
      data.PlanMeals = {
        update: meals.map((meal) => {
          const mealUpdate: any = {
            where: { id: meal.mealId },
            data: {},
          };

          if (meal.foods && Array.isArray(meal.foods)) {
            mealUpdate.data.PlanMealFoods = {
              update: meal.foods.map((food) => {
                const foodUpdate: any = {
                  where: { foodId: food.foodId },
                  data: {},
                };

                if (food.quantity !== undefined) {
                  foodUpdate.data.quantity = food.quantity;
                }

                return foodUpdate;
              }),
            };
          }

          return mealUpdate;
        }),
      };
    }

    const updatedPlan = await prisma.plan.update({
      where: {
        id: parsedPlanId,
      },
      data,
      include: {
        PlanMeals: {
          include: {
            PlanMealFoods: true,
          },
        },
      },
    });

    res.status(200).json({ message: "Plan updated successfully", updatedPlan });
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ message: "Oops! Something went wrong", error });
  }
}
