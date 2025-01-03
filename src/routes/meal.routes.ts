import { Router } from "express";
import createMeal from "../controllers/meal/createMeal.controller";
import getMeals from "../controllers/meal/getMeals.controller";
import deleteMeal from "../controllers/meal/deleteMeal.controller";
import updateMeal from "../controllers/meal/updateMeal";

const mealRouter = Router();

mealRouter.post("/", createMeal);
mealRouter.get("/", getMeals);
mealRouter.put("/:mealId", updateMeal);
mealRouter.delete("/:mealId", deleteMeal);

export default mealRouter;
