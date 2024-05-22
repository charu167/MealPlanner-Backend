import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function addSingleMEal(req: Request, res: Response) {
  try {
    const planId = Number(req.body.planId);
    const mealId = Number(req.body.mealId);
    const mealName = req.body.mealName;
    const result = await prisma.planMeals.create({
      data: { planId, mealId, mealName },
      select: {
        id: true,
        mealName: true,
        mealId: true,
        planId: true,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
