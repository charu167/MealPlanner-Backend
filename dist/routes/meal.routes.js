"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createMeal_controller_1 = __importDefault(require("../controllers/meal/createMeal.controller"));
const getMeals_controller_1 = __importDefault(require("../controllers/meal/getMeals.controller"));
const deleteMeal_controller_1 = __importDefault(require("../controllers/meal/deleteMeal.controller"));
const updateMeal_1 = __importDefault(require("../controllers/meal/updateMeal"));
const mealRouter = (0, express_1.Router)();
mealRouter.post("/", createMeal_controller_1.default);
mealRouter.get("/", getMeals_controller_1.default);
mealRouter.put("/:mealId", updateMeal_1.default);
mealRouter.delete("/:mealId", deleteMeal_controller_1.default);
exports.default = mealRouter;
