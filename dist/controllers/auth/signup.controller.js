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
exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../utilities/jwt");
const prisma = new client_1.PrismaClient();
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body; // Extracting data from request object
        data.password = yield bcrypt_1.default.hash(data.password, 10); // Hashing the password before storing in the db
        try {
            const result = yield prisma.user.create({
                data,
                select: {
                    firstname: true,
                    email: true,
                    id: true,
                },
            });
            const result2 = yield prisma.goal.create({
                data: {
                    userId: result.id,
                },
            });
            const { access_token, refresh_token } = (0, jwt_1.generateTokens)(result.email, result.firstname, result.id);
            res
                .status(200)
                .json({ message: "Signed Up :)", access_token, refresh_token });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createUser = createUser;
