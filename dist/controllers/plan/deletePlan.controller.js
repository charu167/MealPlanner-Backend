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
function deletePlan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { planId } = req.params;
            if (!planId) {
                res.status(400).json({ message: "planId not provided" });
            }
            const result = yield prisma.plan.delete({
                where: {
                    id: Number(planId),
                },
                select: {
                    id: true,
                    name: true,
                },
            });
            res.status(200).json({ message: "Plan deleted successfully!", result });
        }
        catch (error) {
            res.status(500).json({ message: "Oops! Something went wrong", error });
        }
    });
}
exports.default = deletePlan;
