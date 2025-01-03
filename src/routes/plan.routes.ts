import { Router } from "express";
import createPlan from "../controllers/plan/createPlan.controller";
import getPlans from "../controllers/plan/getPlans.controller";
import deletePlan from "../controllers/plan/deletePlan.controller";
import getPlanDetails from "../controllers/plan/getPlanDetails";
import deleteMealFromPlan from "../controllers/plan/deleteMealFromPlan.controller";
import addSingleMEal from "../controllers/plan/addSingleMeal";
import updatePlan from "../controllers/plan/updatePlan.controller";

const planRouter = Router();

planRouter.post("/", createPlan);
planRouter.get("/", getPlans);
planRouter.delete("/:planId", deletePlan);
planRouter.put("/:planId", updatePlan);

planRouter.post("/addSingleMEal", addSingleMEal);
planRouter.get("/getPlanDetails/:planId", getPlanDetails);
planRouter.delete("/deleteMealFromPlan/:entryId", deleteMealFromPlan);

export default planRouter;
