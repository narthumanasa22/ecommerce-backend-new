import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce Backend is running 🚀"
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});