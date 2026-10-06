import express from "express";

import productRoutes from "./routes/productRoutes";
import { pool } from "./database";
import { prisma } from "./prisma";


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


  // PostgreSQL connection using pg
  try {

    await pool.query("SELECT NOW()");

    console.log("PostgreSQL connected successfully ✅");

  } catch (error) {

    console.error(
      "PostgreSQL connection failed ❌",
      error
    );

  }


  // Prisma connection test
  try {

    const products = await prisma.product.findMany();

    console.log(
      "Prisma connected successfully ✅"
    );

    console.log(
      "Products from Prisma:",
      products
    );

  } catch (error) {

    console.error(
      "Prisma connection failed ❌",
      error
    );

  }

});