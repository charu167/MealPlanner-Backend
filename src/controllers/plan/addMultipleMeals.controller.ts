import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function addMultipleMeals(req: Request, res: Response) {
  try {
    const data = req.body;
    const result = await prisma.planMeals.createMany({ data });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
