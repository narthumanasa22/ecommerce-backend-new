import express from "express";
import productRoutes from "./routes/productRoutes";
import redisClient from "./redis";

const app = express();

app.use(express.json());

// Products API routes
app.use("/products", productRoutes);

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    // Connect to Redis before accepting requests
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    console.log("Redis connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();