import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

// Initialize Prisma Client for database interactions
const prisma = new PrismaClient();

// Interface representing the structure of a Goal object
interface Goal {
  activity_level: number;
  caloric_adjustment: number;
  carbs: number;
  fats: number;
  id: number;
  protein: number;
  surplus: boolean;
  target_weight: number;
}

/**
 * Controller function to update a user's goal.
 *
 * @param req - Express Request object, expects user information from authentication middleware
 * @param res - Express Response object to send back the response
 */
export default async function updateGoal(req: Request, res: Response) {
  try {
    // Extract user ID from the authenticated request
    const userId = Number(req.user?.id);

    // Validate that userId exists
    if (!userId) {
      return res.status(400).json({ message: "Invalid or missing user ID." });
    }

    // Extract goal data from the request body and type it as Goal
    const data = req.body as Goal;

    // Start a transaction to ensure atomicity of database operations
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Find the existing goal for the user
      const existingGoal = await tx.goal.findFirst({
        where: {
          userId,
        },
      });

      // If no goal exists for the user, throw an error
      if (!existingGoal) {
        throw new Error("Goal not found for the specified user.");
      }

      // Update the existing goal with the new data
      const updatedGoal = await tx.goal.update({
        where: {
          id: existingGoal.id, // Use the ID of the found goal
        },
        data, // Update data from the request body
        select: {
          id: true,
          userId: true,
          target_weight: true,
          caloric_adjustment: true,
          surplus: true,
          protein: true,
          fats: true,
          carbs: true,
          activity_level: true,
        }, // Select specific fields to return
      });

      // Return the updated goal
      return updatedGoal;
    });

    // Send a successful response with the updated goal data
    res
      .status(200)
      .json({ message: "Goal updated successfully.", goal: result });
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error("Error updating goal:", error);

    // Determine the type of error and respond accordingly
    if (error.message === "Goal not found for the specified user.") {
      return res.status(404).json({ message: error.message });
    }

    // For other errors, send a generic server error response
    res
      .status(500)
      .json({
        message: "An internal server error occurred.",
        error: error.message,
      });
  }
}
