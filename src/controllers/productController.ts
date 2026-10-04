import { Request, Response } from "express";
import { createProductService } from "../services/productService";

export const createProduct = (req: Request, res: Response) => {
  try {
    const product = req.body;

    const createdProduct = createProductService(product);

    res.status(201).json({
      message: "Product created successfully",
      product: createdProduct
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid product data"
    });
  }
};