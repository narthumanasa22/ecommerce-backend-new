
import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

import {
  authenticate,
  requireAdmin,
} from "../middleware/authMiddleware";

const router = Router();

router.get("/", getProducts);

// Only authenticated ADMIN can create products
router.post("/", authenticate, requireAdmin, createProduct);

// Only authenticated ADMIN can update products
router.put("/:id", authenticate, requireAdmin, updateProduct);

// Only authenticated ADMIN can delete products
router.delete("/:id", authenticate, requireAdmin, deleteProduct);

export default router;
