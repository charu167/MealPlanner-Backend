"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../utilities/jwt");
const prisma = new client_1.PrismaClient();
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body; // Extracting data
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    email: data.email,
                },
                select: {
                    password: true,
                    username: true,
                    email: true,
                    id: true,
                },
            });
            if (user && (yield bcrypt_1.default.compare(data.password, user === null || user === void 0 ? void 0 : user.password))) {
                const { access_token, refresh_token } = (0, jwt_1.generateTokens)(user === null || user === void 0 ? void 0 : user.username, user === null || user === void 0 ? void 0 : user.email, user.id);
                res
                    .status(200)
                    .json({ message: "Logged in :)", access_token, refresh_token });
            }
            else {
                res.status(400).json({ message: "Couldn't log in :(" });
            }
        }
        catch (error) {
            res.status(400).json({ message: "Couldn't log in :(", error });
            console.log(error);
        }
    });
}
exports.login = login;
