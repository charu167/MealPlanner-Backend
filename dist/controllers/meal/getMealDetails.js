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
exports.getMealDetails = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get a single meal and it's food items based on mealId
function getMealDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mealId = Number(req.query.mealId);
            console.log(req.query);
            const result = yield prisma.meal.findUnique({
                where: {
                    id: mealId,
                },
                include: {
                    MealFoods: true,
                },
            });
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getMealDetails = getMealDetails;
