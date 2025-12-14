import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getPurchaseHistory = async (req: any, res: Response) => {
  const userId = req.user.id;

  const purchases = await prisma.purchaseHistory.findMany({
    where: { userId },
    include: {
      sweet: {
        select: {
          name: true,
          category: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  res.json(purchases);
};
