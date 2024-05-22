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
exports.addSingleFood = exports.addMultipleFoods = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function addMultipleFoods(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            const result = yield prisma.mealFoods.createMany({ data: data });
            console.log(result);
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.addMultipleFoods = addMultipleFoods;
function addSingleFood(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            const result = yield prisma.mealFoods.create({
                data,
                select: {
                    id: true,
                },
            });
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.addSingleFood = addSingleFood;
