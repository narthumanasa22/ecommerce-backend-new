
import "dotenv/config";
import express from "express";

import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import { connectRedis } from "./redis";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware: Parse incoming JSON request bodies
app.use(express.json());

// API routes
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

// Start server after Redis connection
async function start() {
  try {
    await connectRedis();

    app.listen(PORT, () => {
      console.log("Redis connected successfully");
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
