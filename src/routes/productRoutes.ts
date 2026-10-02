import express from "express";

const router = express.Router();
router.get("/products", (req, res) => {
  res.json({
    products: [
      { id: 1, name: "Laptop", price: 50000 },
      { id: 2, name: "Phone", price: 25000 },
      { id: 3, name: "Headphones", price: 3000 },
      { id: 4, name: "Keyboard", price: 1500 },
      { id: 5, name: "Mouse", price: 800 },
      { id: 6, name: "Smart Watch", price: 5000 },
      { id: 7, name: "Bluetooth Speaker", price: 2500 },
      { id: 8, name: "Power Bank", price: 1800 },
      { id: 9, name: "Tablet", price: 22000 },
      { id: 10, name: "USB Cable", price: 500 }
    ]
  });
});
router.post("/products", (req, res) => {
  const product = req.body;

  res.json({
    message: "Product created successfully",
    product: product
  });
});
router.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = req.body;

  res.json({
    message: "Product updated successfully",
    id: id,
    product: product
  });
});
router.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = req.body;

  res.json({
    message: "Product updated successfully",
    id: id,
    product: product
  });
});
router.delete("/products/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    message: "Product deleted successfully",
    id: id
  });
});


export default router;