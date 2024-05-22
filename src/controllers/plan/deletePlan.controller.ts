import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function deletePlan(req: Request, res: Response) {
  try {
    const planId = Number(req.query.planId);
    const result = await prisma.plan.delete({
      where: {
        id: planId,
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
