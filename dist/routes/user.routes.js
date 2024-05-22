"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getUserDetails_controller_1 = __importDefault(require("../controllers/user/getUserDetails.controller"));
const updateUserDetails_controller_1 = __importDefault(require("../controllers/user/updateUserDetails.controller"));
const userRouter = (0, express_1.Router)();
userRouter.get("/", getUserDetails_controller_1.default);
userRouter.put("/", updateUserDetails_controller_1.default);
exports.default = userRouter;
