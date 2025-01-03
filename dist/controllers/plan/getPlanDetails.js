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
function getPlanDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const plan = yield prisma.plan.findUnique({
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
        }
        catch (error) {
            // Log the error for server-side debugging
            console.error("Error fetching plan details:", error);
            // Respond with a generic server error message
            return res.status(500).json({ error: "Internal server error." });
        }
    });
}
exports.default = getPlanDetails;
