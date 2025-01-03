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
function createMeal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        try {
            const data = req.body;
            if (!data) {
                res.status(400).json({ message: "Data not found" });
            }
            const result = yield prisma.meal.create({
                data: {
                    name: data.name,
                    userId: Number(userId),
                    MealFoods: {
                        create: data.MealFoods.map((food) => ({
                            foodName: food.foodName,
                            foodId: food.foodId,
                            quantity: food.quantity,
                        })),
                    },
                },
                select: {
                    id: true,
                    name: true,
                    MealFoods: true,
                },
            });
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Oops something went wrong", error });
            console.log(error);
        }
    });
}
exports.default = createMeal;
