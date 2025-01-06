import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface PlanMealFoodToCreate {
  foodName: string;
  foodId: string;
  quantity?: number; // Optional: Only update if provided
}

interface PlanMealFoodToUpdate {
  id: number;
  quantity?: number; // Optional: Only update if provided
}

interface PlanMealFoodToDelete {
  id: number;
}

interface PlanMeal {
  id: number;
  planMealFoodsToCreate?: PlanMealFoodToCreate[];
  planMealFoodsToUpdate?: PlanMealFoodToUpdate[];
  planMealFoodsToDelete?: PlanMealFoodToDelete[];
}

interface Plan {
  name?: string;
  planMeal?: PlanMeal;
}

export default async function updatePlan(req: Request, res: Response) {
  const { name, planMeal } = req.body as Plan;
  const { planId } = req.params;

  if (!planId) {
    return res.status(400).json({ message: "planId not provided" });
  }

  const parsedPlanId = Number(planId);
  if (isNaN(parsedPlanId)) {
    return res.status(400).json({ message: "Invalid planId provided" });
  }

  try {
    // 1) Perform the nested update as usual

    await prisma.plan.update({
      where: { id: parsedPlanId },
      data: {
        name,
        PlanMeals: planMeal?.id
          ? {
              update: {
                where: { id: planMeal?.id },
                data: {
                  PlanMealFoods: {
                    create: planMeal?.planMealFoodsToCreate?.map((food) => ({
                      foodId: food.foodId,
                      foodName: food.foodName,
                      quantity: food.quantity,
                    })),
                    update: planMeal?.planMealFoodsToUpdate?.map((food) => ({
                      where: { id: food.id },
                      data: { quantity: food.quantity },
                    })),
                    delete: planMeal?.planMealFoodsToDelete?.map((food) => ({
                      id: food.id,
                    })),
                  },
                },
              },
            }
          : {},
      },
      // We no longer do `include: {...}` to avoid returning the entire plan
    });

    // 2) If we created new items, we want to find them in the DB
    let createdFoods: any = [];
    if (planMeal?.planMealFoodsToCreate?.length) {
      // The simplest approach is to query by planMealId + each unique combination
      // For a single 'PlanMeals' update, we can just fetch newly inserted items by matching:
      //  - The planMeal.id
      //  - The 'foodId' or 'foodName' we just created
      // If you create multiple items at once, we can match them in a single query:
      const allFoodIds = planMeal.planMealFoodsToCreate.map(
        (food) => food.foodId
      );

      // Query the PlanMealFoods table for these newly created items
      createdFoods = await prisma.planMealFoods.findMany({
        where: {
          planMealId: planMeal.id,
          foodId: { in: allFoodIds }, // or match on [foodName, ...]
        },
      });
    }

    // 3) Return only newly created items (plus a success message, if desired)
    return res.status(200).json({
      message: "Plan updated successfully",
      createdFoods, // The client can merge these into local state
    });
  } catch (error) {
    console.error("Error updating plan:", error);
    return res
      .status(500)
      .json({ message: "Oops! Something went wrong", error });
  }
}
