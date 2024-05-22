import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default async function getPlans(req: Request, res: Response) {
  try {
    const userId = Number(req.user?.id);
    const result = await prisma.plan.findMany({
      where: {
        userId,
      },
      select: {
        name: true,
        id: true,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
