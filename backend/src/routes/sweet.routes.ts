import { Router } from "express";
import prisma from "../utils/prisma";

import {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from "../controllers/sweet.controller";

import { authenticate } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";

const router = Router();

/* ============================
   ✅ PUBLIC ROUTE (VERY IMPORTANT)
   This MUST be BEFORE authenticate
============================ */
router.get("/public", async (_req, res) => {
  const sweets = await prisma.sweet.findMany({
    orderBy: { createdAt: "desc" }
  });

  res.json(sweets);
});

/* ============================
   🔒 PROTECTED ROUTES
============================ */
router.get("/", authenticate, getSweets);
router.get("/search", authenticate, searchSweets);

router.post("/", authenticate, isAdmin, addSweet);
router.put("/:id", authenticate, isAdmin, updateSweet);
router.delete("/:id", authenticate, isAdmin, deleteSweet);

router.post("/:id/restock", authenticate, isAdmin, restockSweet);
router.post("/:id/purchase", authenticate, purchaseSweet);


export default router;
