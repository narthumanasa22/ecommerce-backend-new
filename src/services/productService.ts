
import {
  findAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../repositories/productRepository";

import redisClient from "../redis";

const PRODUCTS_CACHE_KEY = "products:all";
const CACHE_TTL = 60;

// CREATE PRODUCT
export const createProductService = async (product: any) => {
  if (!product.name) {
    throw new Error("Product name is required");
  }

  if (product.price === undefined || product.price === null) {
    throw new Error("Product price is required");
  }

  if (Number(product.price) <= 0) {
    throw new Error("Product price must be greater than 0");
  }

  const createdProduct = await createProduct(
    product.name,
    Number(product.price)
  );

  // Clear old cache after creating a product
  await redisClient.del(PRODUCTS_CACHE_KEY);

  return createdProduct;
};

// GET ALL PRODUCTS — Redis Cache
export const getProductsService = async () => {
  // 1. Check Redis cache
  const cachedProducts = await redisClient.get(PRODUCTS_CACHE_KEY);

  if (cachedProducts) {
    console.log("Products fetched from Redis cache");

    return {
      products: JSON.parse(cachedProducts),
      source: "redis",
    };
  }

  // 2. Cache miss: fetch from PostgreSQL
  const products = await findAllProducts();

  // 3. Store results in Redis for 60 seconds
  await redisClient.set(
    PRODUCTS_CACHE_KEY,
    JSON.stringify(products),
    { EX: CACHE_TTL }
  );

  console.log("Products fetched from database");

  return {
    products,
    source: "database",
  };
};

// UPDATE PRODUCT
export const updateProductService = async (
  id: string,
  product: any
) => {
  if (!product.name) {
    throw new Error("Product name is required");
  }

  if (product.price === undefined || product.price === null) {
    throw new Error("Product price is required");
  }

  if (Number(product.price) <= 0) {
    throw new Error("Product price must be greater than 0");
  }

  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    throw new Error("Invalid product ID");
  }

  const updatedProduct = await updateProduct(
    productId,
    product.name,
    Number(product.price)
  );

  // Clear old cache after updating a product
  await redisClient.del(PRODUCTS_CACHE_KEY);

  return updatedProduct;
};

// DELETE PRODUCT
export const deleteProductService = async (id: string) => {
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    throw new Error("Invalid product ID");
  }

  const deletedProduct = await deleteProduct(productId);

  // Clear old cache after deleting a product
  await redisClient.del(PRODUCTS_CACHE_KEY);

  return deletedProduct;
};
