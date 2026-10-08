import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepo from "../repositories/userRepository";

// =========================
// REGISTER USER
// =========================
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  // 1. Check existing email
  const existing = await userRepo.findByEmail(email);

  if (existing) {
    throw new Error("Email already registered");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user
  const user = await userRepo.createUser({
    name,
    email,
    password: hashedPassword
  });

  // 4. Remove password from response
  const { password: _, ...safeUser } = user;

  return safeUser;
};


// =========================
// LOGIN USER
// =========================
export const loginUser = async (
  email: string,
  password: string
) => {

  // 1. Find user by email
  const user = await userRepo.findByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 2. Compare password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  // 3. Create JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h"
    }
  );

  // 4. Remove password
  const { password: _, ...safeUser } = user;

  // 5. Return user + token
  return {
    user: safeUser,
    token
  };
};