import { Router } from "express";
import { createUser } from "../controllers/auth/signup.controller";
import { login } from "../controllers/auth/login.controller";
import refreshAccessToken from "../controllers/auth/refresh-token";
const authRouter = Router();

authRouter.post("/signup", createUser);
authRouter.post("/signin", login);
authRouter.post("/refresh-token", refreshAccessToken);

export default authRouter;
