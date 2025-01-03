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
const prisma = new client_1.PrismaClient();
function deleteMealFromPlan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const existingMeal = yield prisma.planMeals.findUnique({
                where: { id: entryId },
            });
            if (!existingMeal) {
                return res.status(404).json({ error: "PlanMeal not found." });
            }
            // Delete the PlanMeal
            const deletedMeal = yield prisma.planMeals.delete({
                where: { id: entryId },
                select: { id: true },
            });
            // Respond with a success message and the deleted meal's ID
            res.status(200).json({
                message: "PlanMeal deleted successfully.",
                deletedMealId: deletedMeal.id,
            });
        }
        catch (error) {
            console.error("Error deleting PlanMeal:", error);
            res.status(500).json({ error: "An internal server error occurred." });
        }
    });
}
exports.default = deleteMealFromPlan;
