import express from "express";
import productRoutes from "./routes/productRoutes";
import { pool } from "./database";

const app = express();


// JSON BODY PARSER
app.use(express.json());


// PRODUCT ROUTES
app.use(productRoutes);


// HOME ROUTE
app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce Backend is running 🚀"
  });
});


// START SERVER
app.listen(3000, async () => {
  console.log("Server running on http://localhost:3000");

  try {
    await pool.query("SELECT NOW()");

    console.log("PostgreSQL connected successfully ✅");

  } catch (error) {

    console.error(
      "Database connection failed ❌",
      error
    );

  }
});