import { Router } from "express";
import getUserDetails from "../controllers/user/getUserDetails.controller";
import updateUserDetails from "../controllers/user/updateUserDetails.controller";
const userRouter = Router();

userRouter.get("/", getUserDetails);
userRouter.put("/", updateUserDetails);

export default userRouter;
