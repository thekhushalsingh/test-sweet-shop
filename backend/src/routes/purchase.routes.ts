import { Router } from "express";
import { getPurchaseHistory } from "../controllers/purchase.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, getPurchaseHistory);

export default router;
