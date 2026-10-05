import { pool } from "../database";

// CREATE PRODUCT
export const createProductService = async (product: any) => {

  if (!product.name) {
    throw new Error("Product name is required");
  }

  if (product.price === undefined) {
    throw new Error("Product price is required");
  }

  if (product.price <= 0) {
    throw new Error("Product price must be greater than 0");
  }

  const result = await pool.query(
    `INSERT INTO products (name, price)
     VALUES ($1, $2)
     RETURNING id, name, price`,
    [product.name, product.price]
  );

  return result.rows[0];
};


// GET ALL PRODUCTS
export const getProductsService = async () => {

  const result = await pool.query(
    `SELECT id, name, price
     FROM products
     ORDER BY id`
  );

  return result.rows;
};


// UPDATE PRODUCT
export const updateProductService = async (
  id: string,
  product: any
) => {

  if (!product.name) {
    throw new Error("Product name is required");
  }

  if (product.price === undefined) {
    throw new Error("Product price is required");
  }

  if (product.price <= 0) {
    throw new Error("Product price must be greater than 0");
  }

  const result = await pool.query(
    `UPDATE products
     SET name = $1, price = $2
     WHERE id = $3
     RETURNING id, name, price`,
    [product.name, product.price, id]
  );

  if (result.rows.length === 0) {
    throw new Error("Product not found");
  }

  return result.rows[0];
};


// DELETE PRODUCT
export const deleteProductService = async (id: string) => {

  const result = await pool.query(
    `DELETE FROM products
     WHERE id = $1
     RETURNING id, name, price`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Product not found");
  }

  return result.rows[0];
};