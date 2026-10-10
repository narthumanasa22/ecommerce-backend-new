
import express from "express";

import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();

// Middleware: Read JSON request bodies
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "E-Commerce Backend is running 🚀",
  });
});

// Product routes
app.use(productRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);

// Cart routes
app.use("/cart", cartRoutes);

// Order routes
app.use("/orders", orderRoutes);

// Start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
