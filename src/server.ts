import express from "express";
import productRoutes from "./routes/productRoutes";


const app = express();
app.use(express.json());
app.use(productRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce Backend is running 🚀"
  });
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});