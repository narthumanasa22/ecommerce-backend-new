import express from "express";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

// JSON request body ni read cheyyadaniki
app.use(express.json());

// Product APIs
app.use(productRoutes);

// Authentication APIs
app.use("/api/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce Backend is running 🚀"
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});