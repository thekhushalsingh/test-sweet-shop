import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();

/**
 * POST /api/auth/register
 * POST /api/auth/login
 */
router.post("/register", register);
router.post("/login", login);

export default router;
