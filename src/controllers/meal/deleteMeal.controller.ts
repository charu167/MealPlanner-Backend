import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function deleteMeal(req: Request, res: Response) {
  try {
    const mealId = Number(req.query.mealId);
    console.log(req.query.mealId);
    const result = await prisma.meal.delete({
      where: {
        id: mealId,
      },
      select: {
        name: true,
        id: true,
      },
    });
    console.log("result: ", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
}
