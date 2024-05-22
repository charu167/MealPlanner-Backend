import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default async function createPlan(req: Request, res: Response) {
  try {
    const userId = Number(req.user?.id);
    const name = req.body.name;

    const result = await prisma.plan.create({
      data: {
        name,
        userId,
      },
      select: {
        id: true,
        name: true,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
