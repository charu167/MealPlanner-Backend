import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function deleteMealFromPlan(req: Request, res: Response) {
  try {
    // Extract and validate the 'entryId' from query parameters
    const entryIdParam = req.params.entryId;

    if (!entryIdParam) {
      return res
        .status(400)
        .json({ error: "Missing 'entryId' query parameter." });
    }

    const entryId = Number(entryIdParam);

    if (isNaN(entryId)) {
      return res
        .status(400)
        .json({ error: "'entryId' must be a valid number." });
    }

    // Check if the PlanMeal exists before attempting deletion
    const existingMeal = await prisma.planMeals.findUnique({
      where: { id: entryId },
    });

    if (!existingMeal) {
      return res.status(404).json({ error: "PlanMeal not found." });
    }

    // Delete the PlanMeal
    const deletedMeal = await prisma.planMeals.delete({
      where: { id: entryId },
      select: { id: true },
    });

    // Respond with a success message and the deleted meal's ID
    res.status(200).json({
      message: "PlanMeal deleted successfully.",
      deletedMealId: deletedMeal.id,
    });
  } catch (error) {
    console.error("Error deleting PlanMeal:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}
