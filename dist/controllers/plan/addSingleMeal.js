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
function addSingleMeal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // Extract and validate input data
            const planId = Number(req.body.planId);
            const mealId = Number(req.body.mealId);
            const mealName = ((_a = req.body.mealName) === null || _a === void 0 ? void 0 : _a.trim()) || "";
            // Basic validation
            if (isNaN(planId) || isNaN(mealId)) {
                return res.status(400).json({ error: "Invalid planId or mealId." });
            }
            // Check if the plan exists
            const planExists = yield prisma.plan.findUnique({
                where: { id: planId },
            });
            if (!planExists) {
                return res.status(404).json({ error: "Plan not found." });
            }
            // Check if the meal exists
            const mealExists = yield prisma.meal.findUnique({
                where: { id: mealId },
            });
            if (!mealExists) {
                return res.status(404).json({ error: "Meal not found." });
            }
            // Use a transaction to ensure both steps succeed or fail together
            const planMeal = yield prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                // 1. Create the PlanMeals record
                const createdPlanMeal = yield tx.planMeals.create({
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
                const originalMealFoods = yield tx.mealFoods.findMany({
                    where: { mealId },
                });
                // 3. Copy each MealFoods row into PlanMealFoods using the transactional client
                if (originalMealFoods.length > 0) {
                    yield tx.planMealFoods.createMany({
                        data: originalMealFoods.map((food) => ({
                            planMealId: createdPlanMeal.id,
                            foodName: food.foodName,
                            foodId: food.foodId,
                            quantity: food.quantity,
                        })),
                        skipDuplicates: true, // Optional: skip duplicates if applicable
                    });
                }
                return createdPlanMeal;
            }));
            return res.status(200).json({
                message: "Meal successfully added to the plan.",
                planMeal,
            });
        }
        catch (error) {
            console.error("Error in addSingleMeal:", error);
            // Handle Prisma validation errors
            // Generic server error
            return res.status(500).json({ error: "Internal server error." });
        }
    });
}
exports.default = addSingleMeal;
