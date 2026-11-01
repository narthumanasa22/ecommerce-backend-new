
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import adminRoutes from "./routes/adminRoutes";

import { connectRedis } from "./redis";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Health check
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce Backend is running 🚀",
  });
});

// API routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/admin", adminRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error("Server Error:", err.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
);

// Start server only after Redis connects
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
