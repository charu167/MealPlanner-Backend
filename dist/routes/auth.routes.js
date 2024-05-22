"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_controller_1 = require("../controllers/auth/signup.controller");
const login_controller_1 = require("../controllers/auth/login.controller");
const refresh_token_1 = __importDefault(require("../controllers/auth/refresh-token"));
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", signup_controller_1.createUser);
authRouter.post("/signin", login_controller_1.login);
authRouter.post("/refresh-token", refresh_token_1.default);
exports.default = authRouter;
