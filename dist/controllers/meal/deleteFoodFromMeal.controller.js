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
function deleteFoodFromMeal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foodId = String(req.query.foodId);
            const mealId = Number(req.query.mealId);
            const result1 = yield prisma.mealFoods.findFirst({
                where: {
                    foodId,
                    mealId,
                },
                select: {
                    id: true,
                },
            });
            const entryId = result1 === null || result1 === void 0 ? void 0 : result1.id;
            const result = yield prisma.mealFoods.delete({
                where: {
                    id: entryId,
                },
            });
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = deleteFoodFromMeal;
