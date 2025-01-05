"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const JWT_PASSWORD = process.env.JWT_PASSWORD || "";
    if (!JWT_PASSWORD) {
        console.log("No JWT password");
        return;
    }
    const user = jsonwebtoken_1.default.verify(token, JWT_PASSWORD, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
}
exports.isAuthenticated = isAuthenticated;
