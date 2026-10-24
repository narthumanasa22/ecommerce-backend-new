
import { Request, Response } from "express";
import * as userService from "../services/userService";

// =====================================
// REGISTER
// =====================================
export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body ?? {};

    // 1. Check required fields and data types
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // 2. Validate name
    if (cleanName.length < 2 || cleanName.length > 50) {
      return res.status(400).json({
        message: "Name must be between 2 and 50 characters"
      });
    }

    // 3. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address"
      });
    }

    // 4. Validate password length
    if (password.length < 8 || password.length > 72) {
      return res.status(400).json({
        message: "Password must be between 8 and 72 characters"
      });
    }

    // 5. Register user
    const user = await userService.registerUser(
      cleanName,
      cleanEmail,
      password
    );

    return res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Registration failed";

    return res.status(400).json({ message });
  }
};

// =====================================
// LOGIN
// =====================================
export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body ?? {};

    // 1. Check required fields and data types
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address"
      });
    }

    // 3. Login user
    const result = await userService.loginUser(
      cleanEmail,
      password
    );

    return res.status(200).json({
      message: "Login successful",
      user: result.user,
      token: result.token
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Login failed";

    return res.status(401).json({ message });
  }
};

// =====================================
// GET CURRENT USER
// =====================================
export const getMe = (
  req: Request,
  res: Response
) => {
  // The authenticate middleware verifies the token.
  // The existing AuthRequest type can be used here
  // if it is exported from your auth middleware.
  const user = (req as Request & {
    user?: { id: number; email: string; role: string };
  }).user;

  return res.status(200).json({
    message: "Authenticated user",
    user
  });
};
