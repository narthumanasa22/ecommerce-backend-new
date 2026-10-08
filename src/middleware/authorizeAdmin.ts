import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const authorizeAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  // User login ayyada?
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }

  // User ADMIN aa?
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Admin access required"
    });
  }

  // Everything okay
  next();
};