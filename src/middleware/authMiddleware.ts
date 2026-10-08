import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    // 2. Get token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing"
      });
    }

    // 3. Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      id: number;
      email: string;
      role: string;
    };

    // 4. Store user information
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    // 5. Continue
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};