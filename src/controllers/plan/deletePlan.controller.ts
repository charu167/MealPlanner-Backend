import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function deletePlan(req: Request, res: Response) {
  try {
    const { planId } = req.params;
    if (!planId) {
      res.status(400).json({ message: "planId not provided" });
    }
    const result = await prisma.plan.delete({
      where: {
        id: Number(planId),
      },
      select: {
        id: true,
        name: true,
      },
    });
    res.status(200).json({ message: "Plan deleted successfully!", result });
  } catch (error) {
    res.status(500).json({ message: "Oops! Something went wrong", error });
  }
}
