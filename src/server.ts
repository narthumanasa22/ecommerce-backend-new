
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

const app = express();

// 1. Middleware: parse incoming JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Debugging middleware
app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Request body:", req.body);
  next();
});

// 3. Home route
app.get("/", (req, res) => {
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

// 7. Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// 8. Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
