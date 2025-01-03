"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Initialize Prisma Client for database interactions
const prisma = new client_1.PrismaClient();
/**
 * Controller function to update a user's goal.
 *
 * @param req - Express Request object, expects user information from authentication middleware
 * @param res - Express Response object to send back the response
 */
function updateGoal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // Extract user ID from the authenticated request
            const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            // Validate that userId exists
            if (!userId) {
                return res.status(400).json({ message: "Invalid or missing user ID." });
            }
            // Extract goal data from the request body and type it as Goal
            const data = req.body;
            // Start a transaction to ensure atomicity of database operations
            const result = yield prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                // Find the existing goal for the user
                const existingGoal = yield tx.goal.findFirst({
                    where: {
                        userId,
                    },
                });
                // If no goal exists for the user, throw an error
                if (!existingGoal) {
                    throw new Error("Goal not found for the specified user.");
                }
                // Update the existing goal with the new data
                const updatedGoal = yield tx.goal.update({
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
            }));
            // Send a successful response with the updated goal data
            res
                .status(200)
                .json({ message: "Goal updated successfully.", goal: result });
        }
        catch (error) {
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
    });
}
exports.default = updateGoal;
