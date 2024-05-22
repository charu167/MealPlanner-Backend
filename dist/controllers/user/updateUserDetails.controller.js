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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function updateUserDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const username = req.body.username;
            const date_of_birth = req.body.date_of_birth;
            const gender = req.body.gender;
            const height = Number(req.body.height);
            const weight = Number(req.body.weight);
            console.log("req body: ", req.body);
            const result = yield prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    username: username,
                    date_of_birth: date_of_birth,
                    gender: gender,
                    height: height,
                    weight: weight,
                },
                select: {
                    id: true,
                },
            });
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = updateUserDetails;
