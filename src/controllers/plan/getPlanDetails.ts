import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getPlanDetails(req: Request, res: Response) {
  try {
    // Extract planId from route parameters
    const { planId } = req.params;

    // Convert planId to a number
    const parsedPlanId = Number(planId);

    // Validate that planId is a valid positive integer
    if (isNaN(parsedPlanId) || parsedPlanId <= 0) {
      return res.status(400).json({ error: "Invalid planId provided." });
    }

    // Fetch the plan with associated PlanMeals and their PlanMealFoods
    const plan = await prisma.plan.findUnique({
      where: {
        id: parsedPlanId,
      },
      include: {
        PlanMeals: {
          include: {
            PlanMealFoods: true, // Include all PlanMealFoods for each PlanMeal
          },
        },
      },
    });

    // If the plan does not exist, return a 404 error
    if (!plan) {
      return res.status(404).json({ error: "Plan not found." });
    }

    // Return the retrieved plan details
    return res.status(200).json(plan);
  } catch (error) {
    // Log the error for server-side debugging
    console.error("Error fetching plan details:", error);

    // Respond with a generic server error message
    return res.status(500).json({ error: "Internal server error." });
  }
}
