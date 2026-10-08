import express from "express";

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controllers/productController";

import { authenticate } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/authorizeAdmin";

const router = express.Router();

router.get("/products", getProducts);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.delete(
  "/products/:id",
  authenticate,
  authorizeAdmin,
  deleteProduct
);

export default router;