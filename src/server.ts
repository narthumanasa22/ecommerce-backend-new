
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

const app = express();

// 1. Parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// 3. Health check
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "E-Commerce Backend is running 🚀",
  });
});

// 4. Authentication routes
app.use("/auth", authRoutes);

// 5. Cart routes
app.use("/cart", cartRoutes);

// 6. Order routes
app.use("/orders", orderRoutes);

// 7. Handle unknown routes (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// 8. Centralized error-handling middleware
app.use(
  (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error("Request error:", err.message);

    res.status(500).json({
      message: "Internal server error",
    });
  }
);

// 9. Start server
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
