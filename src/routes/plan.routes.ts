import { Router } from "express";
import createPlan from "../controllers/plan/createPlan.controller";
import getPlans from "../controllers/plan/getPlans.controller";
import deletePlan from "../controllers/plan/deletePlan.controller";
import addMultipleMeals from "../controllers/plan/addMultipleMeals.controller";
import getPlanDetails from "../controllers/plan/getPlanDetails";
import deleteMealFromPlan from "../controllers/plan/deleteMealFromPlan.controller";
import addSingleMEal from "../controllers/plan/addSingleMeal";
import getPlanMealFoodIds from "../controllers/plan/getPlanMealFoodIds.controller";

const planRouter = Router();

planRouter.post("/", createPlan);
planRouter.get("/", getPlans);
planRouter.delete("/", deletePlan);

planRouter.post("/addMultipleMeals", addMultipleMeals);
planRouter.post("/addSingleMEal", addSingleMEal);
planRouter.get("/getPlanDetails", getPlanDetails);
planRouter.delete("/deleteMealFromPlan", deleteMealFromPlan);

planRouter.get("/getPlanMealFoodIds", getPlanMealFoodIds);

export default planRouter;
