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
// Get All Meals and Their food items
function getMeals(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const id = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const result = yield prisma.meal.findMany({
                where: {
                    userId: id,
                },
                select: {
                    name: true,
                    id: true,
                },
            });
            const result1 = yield prisma.user.findUnique({
                where: {
                    id: id,
                },
                select: {
                    Meal: {
                        select: {
                            id: true,
                            name: true,
                            MealFoods: true,
                        },
                    },
                },
            });
            res.status(200).json(result1);
            console.log(result);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = getMeals;
