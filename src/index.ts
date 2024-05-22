import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { isAuthenticated } from "./middleware/auth.middleware";
import authRouter from "./routes/auth.routes";
import mealRouter from "./routes/meal.routes";
import planRouter from "./routes/plan.routes";
import userRouter from "./routes/user.routes";
import goalRouter from "./routes/goal.routes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.use(isAuthenticated);
app.use("/meal", mealRouter);
app.use("/plan", planRouter);
app.use("/user", userRouter);
app.use("/goal", goalRouter);

app.get("/", (req: any, res: any) => {
  console.log("home");
});

const port: number = 3000; // You can choose any port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
