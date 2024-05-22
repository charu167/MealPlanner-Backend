"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const meal_routes_1 = __importDefault(require("./routes/meal.routes"));
const plan_routes_1 = __importDefault(require("./routes/plan.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const goal_routes_1 = __importDefault(require("./routes/goal.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_routes_1.default);
app.use(auth_middleware_1.isAuthenticated);
app.use("/meal", meal_routes_1.default);
app.use("/plan", plan_routes_1.default);
app.use("/user", user_routes_1.default);
app.use("/goal", goal_routes_1.default);
app.get("/", (req, res) => {
    console.log("home");
});
const port = 3001; // You can choose any port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
