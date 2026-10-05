import { Request, Response } from "express";

import {
  createProductService,
  getProductsService,
  updateProductService,
  deleteProductService
} from "../services/productService";


// CREATE PRODUCT
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const createdProduct = await createProductService(product);

    res.status(201).json({
      message: "Product created successfully",
      product: createdProduct
    });

  } catch (error) {
    console.error("Create product error:", error);

    res.status(400).json({
      message: "Invalid product data",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};


// GET ALL PRODUCTS
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProductsService();

    res.status(200).json({
      message: "Products fetched successfully",
      products: products
    });

  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      message: "Failed to fetch products",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};


// UPDATE PRODUCT
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const product = req.body;

    console.log("UPDATE ID:", id);
    console.log("UPDATE PRODUCT:", product);

    const updatedProduct = await updateProductService(id, product);

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);

    res.status(400).json({
      message: "Invalid product data",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};


// DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    console.log("DELETE ID:", id);

    const deletedProduct = await deleteProductService(id);

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(400).json({
      message: "Failed to delete product",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};