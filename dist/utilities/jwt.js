"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateTokens(email, username, id) {
    const JWT_PASSWORD = process.env.JWT_PASSWORD || "";
    const access_token = jsonwebtoken_1.default.sign({ id, email, username }, JWT_PASSWORD, {
        expiresIn: "3h",
    });
    const refresh_token = jsonwebtoken_1.default.sign({ id, email, username }, JWT_PASSWORD, {
        expiresIn: "15d",
    });
    return { access_token, refresh_token };
}
exports.generateTokens = generateTokens;
function refreshToken(refresh_token) {
    const JWT_PASSWORD = process.env.JWT_PASSWORD || "";
    const decoded = jsonwebtoken_1.default.verify(refresh_token, JWT_PASSWORD);
    const { email, username, id } = decoded;
    const access_token = jsonwebtoken_1.default.sign({ id, email, username }, JWT_PASSWORD, {
        expiresIn: "3h",
    });
    return access_token;
}
exports.refreshToken = refreshToken;
