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
function updateMealDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const mealId = Number(req.query.mealId);
        const { name: mealName, MealFoods } = req.body;
        try {
            // Update meal name
            yield prisma.meal.update({
                where: { id: mealId },
                data: { name: mealName },
            });
            // Update or add MealFoods
            yield Promise.all(MealFoods.map((food) => __awaiter(this, void 0, void 0, function* () {
                if (food.id) {
                    // Update existing food
                    return yield prisma.mealFoods.update({
                        where: { id: food.id },
                        data: {
                            quantity: food.quantity,
                            // Possibly update other details like foodName, macros etc., if needed
                        },
                    });
                }
                else {
                    // Add new food
                    return yield prisma.mealFoods.create({
                        data: {
                            mealId: mealId,
                            foodName: food.foodName,
                            foodId: food.foodId,
                            quantity: food.quantity,
                            // You might want to store macros as well, depending on your schema adjustments
                        },
                    });
                }
            })));
            res.status(200).json({ message: "Meal updated successfully!" });
        }
        catch (error) {
            console.error("Error updating meal details: ", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.default = updateMealDetails;
