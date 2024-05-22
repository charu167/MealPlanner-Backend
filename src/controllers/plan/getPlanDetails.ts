import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getPlanDetails(req: Request, res: Response) {
  try {
    const planId = Number(req.query.planId);
    const result = await prisma.plan.findUnique({
      where: {
        id: planId,
      },
      include: {
        PlanMeals: true,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
