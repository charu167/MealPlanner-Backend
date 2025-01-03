import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Handler to add a single meal to a plan.
 *
 * Expected Route: POST /plan/addSingleMeal
 *
 * Request Body:
 * {
 *   planId: number,
 *   mealId: number,
 *   mealName?: string
 * }
 *
 * Responses:
 * - 200 OK: Meal successfully added to the plan.
 * - 400 Bad Request: Invalid input data.
 * - 404 Not Found: Plan or Meal not found.
 * - 500 Internal Server Error: Unexpected server error.
 */
export default async function addSingleMeal(req: Request, res: Response) {
  try {
    // Extract and validate input data
    const planId = Number(req.body.planId);
    const mealId = Number(req.body.mealId);
    const mealName = req.body.mealName?.trim() || "";

    // Basic validation
    if (isNaN(planId) || isNaN(mealId)) {
      return res.status(400).json({ error: "Invalid planId or mealId." });
    }

    // Check if the plan exists
    const planExists = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!planExists) {
      return res.status(404).json({ error: "Plan not found." });
    }

    // Check if the meal exists
    const mealExists = await prisma.meal.findUnique({
      where: { id: mealId },
    });

    if (!mealExists) {
      return res.status(404).json({ error: "Meal not found." });
    }

    // Use a transaction to ensure both steps succeed or fail together
    const planMeal = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        // 1. Create the PlanMeals record
        const createdPlanMeal = await tx.planMeals.create({
          data: { planId, mealId, mealName },
          select: {
            id: true,
            mealName: true,
            mealId: true,
            planId: true,
          },
        });

        console.log("createdPlanMeal: ", createdPlanMeal);

        // 2. Fetch the original MealFoods for that Meal
        const originalMealFoods = await tx.mealFoods.findMany({
          where: { mealId },
        });

        // 3. Copy each MealFoods row into PlanMealFoods using the transactional client
        if (originalMealFoods.length > 0) {
          await tx.planMealFoods.createMany({
            data: originalMealFoods.map((food: any) => ({
              planMealId: createdPlanMeal.id,
              foodName: food.foodName,
              foodId: food.foodId,
              quantity: food.quantity,
            })),
            skipDuplicates: true, // Optional: skip duplicates if applicable
          });
        }

        return createdPlanMeal;
      }
    );

    return res.status(200).json({
      message: "Meal successfully added to the plan.",
      planMeal,
    });
  } catch (error: any) {
    console.error("Error in addSingleMeal:", error);

    // Handle Prisma validation errors
    

    // Generic server error
    return res.status(500).json({ error: "Internal server error." });
  }
}
