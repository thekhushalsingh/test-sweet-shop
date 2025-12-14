import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

/* =========================
   ADMIN: ADD SWEET
========================= */
export const addSweet = async (req: Request, res: Response) => {
  const { name, category, description, price, quantity } = req.body;

  const sweet = await prisma.sweet.create({
    data: {
      name,
      category,
      description,
      price,
      quantity
    }
  });

  res.status(201).json(sweet);
};

/* =========================
   GET ALL SWEETS
========================= */
export const getSweets = async (_req: Request, res: Response) => {
  const sweets = await prisma.sweet.findMany({
    orderBy: { createdAt: "desc" }
  });

  res.json(sweets);
};

/* =========================
   SEARCH SWEETS
========================= */
export const searchSweets = async (req: Request, res: Response) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const sweets = await prisma.sweet.findMany({
    where: {
      name: name ? { contains: String(name), mode: "insensitive" } : undefined,
      category: category ? String(category) : undefined,
      price: {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined
      }
    }
  });

  res.json(sweets);
};

/* =========================
   ADMIN: UPDATE SWEET
========================= */
export const updateSweet = async (req: Request, res: Response) => {
  const { id } = req.params;

  const sweet = await prisma.sweet.update({
    where: { id },
    data: req.body
  });

  res.json(sweet);
};

/* =========================
   ADMIN: DELETE SWEET
========================= */
export const deleteSweet = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.sweet.delete({
    where: { id }
  });

  res.json({ message: "Sweet deleted successfully" });
};

/* =========================
   USER: PURCHASE SWEET
========================= */
export const purchaseSweet = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { quantity = 1 } = req.body;
  const userId = req.user!.userId;

  const sweet = await prisma.sweet.findUnique({ where: { id } });

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  if (sweet.quantity < quantity) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  const total = sweet.price * quantity;

  await prisma.$transaction([
    prisma.sweet.update({
      where: { id },
      data: { quantity: { decrement: quantity } }
    }),
    prisma.purchaseHistory.create({
      data: {
        sweetId: id,
        userId,
        quantity,
        price: sweet.price,
        total
      }
    })
  ]);

  res.status(201).json({
    message: "Purchase successful",
    total
  });
};

/* =========================
   ADMIN: RESTOCK SWEET
========================= */
export const restockSweet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const sweet = await prisma.sweet.update({
    where: { id },
    data: {
      quantity: { increment: quantity }
    }
  });

  res.json(sweet);
};
