
import { Router, type Response } from "express";

import {
  register,
  login,
  getMe,
} from "../controllers/authController";

import {
  authenticate,
  requireAdmin,
  type AuthRequest,
} from "../middleware/authMiddleware";

const router = Router();

// Register a new user
router.post("/register", register);

// Login and generate JWT token
router.post("/login", login);

// Get logged-in user's details
router.get("/me", authenticate, getMe);

// Admin-only route
router.get(
  "/admin",
  authenticate,
  requireAdmin,
  (req: AuthRequest, res: Response) => {
    return res.status(200).json({
      message: "Welcome Admin! Access granted.",
      user: req.user,
    });
  }
);

export default router;
