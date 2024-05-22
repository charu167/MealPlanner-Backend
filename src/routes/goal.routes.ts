import { Router } from "express";
import updateGoal from "../controllers/goal/updateGoal.controller";
import getGoal from "../controllers/goal/getGoal";
const goalRouter = Router();

goalRouter.put("/", updateGoal);
goalRouter.get("/", getGoal);

export default goalRouter;
