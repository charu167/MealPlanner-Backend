import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addMultipleFoods(req: Request, res: Response) {
  const data = req.body;

  try {
    const result = await prisma.mealFoods.createMany({ data: data });
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}

export async function addSingleFood(req: Request, res: Response) {
  const data = req.body;

  try {
    const result = await prisma.mealFoods.create({
      data,
      select: {
        id: true,
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
