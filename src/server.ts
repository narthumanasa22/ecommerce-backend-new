
import express from "express";

import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";

const app = express();

// Middleware to read JSON request bodies
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "E-Commerce Backend is running 🚀"
  });
});

// Product APIs
app.use(productRoutes);

// Authentication APIs
app.use("/api/auth", authRoutes);

// Cart APIs
app.use("/cart", cartRoutes);

// Start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
