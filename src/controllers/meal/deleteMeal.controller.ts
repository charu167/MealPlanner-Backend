import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Handler to delete a meal by its ID.
 *
 * Expected Route: DELETE /meal/:id
 *
 * Responses:
 * - 200 OK: Meal successfully deleted.
 * - 400 Bad Request: Invalid or missing meal ID.
 * - 404 Not Found: Meal with the specified ID does not exist.
 * - 500 Internal Server Error: Unexpected server error.
 */
export default async function deleteMeal(req: Request, res: Response) {
  try {
    // Extract mealId from route parameters or query parameters
    const mealIdParam = req.params.mealId;

    // Check if mealId is provided
    if (!mealIdParam) {
      return res.status(400).json({ error: "Meal ID is required." });
    }

    // Convert mealId to a number
    const mealId = Number(mealIdParam);

    // Validate that mealId is a valid number
    if (isNaN(mealId) || mealId <= 0) {
      return res.status(400).json({ error: "Invalid Meal ID provided." });
    }

    // Attempt to delete the meal from the database
    const deletedMeal = await prisma.meal.delete({
      where: { id: mealId },
      select: {
        id: true,
        name: true,
        // Add any other fields you want to return upon deletion
      },
    });

    // If deletion is successful, respond with the deleted meal's information
    return res.status(200).json({
      message: "Meal deleted successfully.",
      meal: deletedMeal,
    });
  } catch (error: any) {
    // Handle Prisma's "Record to delete does not exist" error
    if (error.code === "P2025") {
      // Prisma error code for "Record not found"
      return res.status(404).json({ error: "Meal not found." });
    }

    // Log the error for server-side debugging
    console.error("Error deleting meal:", error);

    // Respond with a generic server error message
    return res.status(500).json({ error: "An unexpected error occurred." });
  } finally {
    // Optional: Disconnect Prisma client to prevent hanging connections
    // Uncomment the line below if you're not using a global Prisma client
    // await prisma.$disconnect();
  }
}
