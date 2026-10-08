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
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Register user
    const user = await userService.registerUser(
      name,
      email,
      password
    );

    return res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
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
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Login user
    const result = await userService.loginUser(
      email,
      password
    );

    return res.status(200).json({
      message: "Login successful",
      user: result.user,
      token: result.token
    });

  } catch (error: any) {
    return res.status(401).json({
      message: error.message
    });
  }
};


// =====================================
// GET CURRENT USER
// =====================================
export const getMe = (
  req: any,
  res: Response
) => {
  return res.status(200).json({
    message: "Authenticated user",
    user: req.user
  });
};