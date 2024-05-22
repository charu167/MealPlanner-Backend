"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createMeal_controller_1 = __importDefault(require("../controllers/meal/createMeal.controller"));
const getMeals_controller_1 = __importDefault(require("../controllers/meal/getMeals.controller"));
const deleteMeal_controller_1 = __importDefault(require("../controllers/meal/deleteMeal.controller"));
const addFood_controller_1 = require("../controllers/meal/addFood.controller");
const getMealDetails_1 = require("../controllers/meal/getMealDetails");
const updateMealDetails_1 = __importDefault(require("../controllers/meal/updateMealDetails"));
const deleteFoodFromMeal_controller_1 = __importDefault(require("../controllers/meal/deleteFoodFromMeal.controller"));
const mealRouter = (0, express_1.Router)();
mealRouter.post("/", createMeal_controller_1.default);
mealRouter.get("/", getMeals_controller_1.default);
mealRouter.delete("/", deleteMeal_controller_1.default);
mealRouter.post("/addMultipleFoods", addFood_controller_1.addMultipleFoods);
mealRouter.post("/addSingleFood", addFood_controller_1.addSingleFood);
mealRouter.get("/getMealDetails", getMealDetails_1.getMealDetails);
mealRouter.put("/updateMealDetails", updateMealDetails_1.default);
mealRouter.delete("/deleteFoodFromMeal", deleteFoodFromMeal_controller_1.default);
exports.default = mealRouter;
