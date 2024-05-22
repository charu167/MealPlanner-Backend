import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function deleteMealFromPlan(req: Request, res: Response) {
  try {
    const entryId = Number(req.query.entryId);
    const result = await prisma.planMeals.delete({
      where: {
        id: entryId,
      },
      select: {
        id: true,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
