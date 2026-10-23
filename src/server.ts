
import "dotenv/config";
import express from "express";

import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import { connectRedis } from "./redis";
import { connectRabbitMQ } from "./rabbitmq";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

// Health check
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "E-Commerce Backend is running",
  });
});

// Start server
async function start() {
  try {
    await connectRedis();
    await connectRabbitMQ();

    app.listen(PORT, () => {
      console.log("Redis connected successfully");
      console.log("RabbitMQ connected successfully");
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
