import { Router } from "express";
import createMeal from "../controllers/meal/createMeal.controller";
import getMeals from "../controllers/meal/getMeals.controller";
import deleteMeal from "../controllers/meal/deleteMeal.controller";
import {
  addMultipleFoods,
  addSingleFood,
} from "../controllers/meal/addFood.controller";
import { getMealDetails } from "../controllers/meal/getMealDetails";
import updateMealDetails from "../controllers/meal/updateMealDetails";
import deleteFoodFromMeal from "../controllers/meal/deleteFoodFromMeal.controller";

const mealRouter = Router();

mealRouter.post("/", createMeal);
mealRouter.get("/", getMeals);
mealRouter.delete("/", deleteMeal);
mealRouter.post("/addMultipleFoods", addMultipleFoods);
mealRouter.post("/addSingleFood", addSingleFood);
mealRouter.get("/getMealDetails", getMealDetails);

mealRouter.put("/updateMealDetails", updateMealDetails);
mealRouter.delete("/deleteFoodFromMeal", deleteFoodFromMeal);

export default mealRouter;
