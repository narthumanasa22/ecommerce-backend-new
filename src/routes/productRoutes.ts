import express from "express";

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controllers/productController";

const router = express.Router();


// GET ALL PRODUCTS
router.get("/products", getProducts);


// CREATE PRODUCT
router.post("/products", createProduct);


// UPDATE PRODUCT
router.put("/products/:id", updateProduct);


// DELETE PRODUCT
router.delete("/products/:id", deleteProduct);


export default router;