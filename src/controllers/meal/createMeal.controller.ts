import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createMeal(req: Request, res: Response) {
  // Interfaces
  interface Meal {
    name: string;
    userId: number | undefined;
  }

  try {
    const data = {
      name: req.body.name,
      userId: Number(req.user?.id),
    };
    const result = await prisma.meal.create({
      data,
      select: {
        id: true,
        name: true,
      },
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
}

export default createMeal;
