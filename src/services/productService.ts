import {
  findAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../repositories/productRepository";


// CREATE PRODUCT
export const createProductService = async (product: any) => {

  // Validation
  if (!product.name) {
    throw new Error("Product name is required");
  }

  if (product.price === undefined) {
    throw new Error("Product price is required");
  }

  if (product.price <= 0) {
    throw new Error("Product price must be greater than 0");
  }

  // Database work goes to Repository
  const createdProduct = await createProduct(
    product.name,
    product.price
  );

  return createdProduct;
};


// GET ALL PRODUCTS
export const getProductsService = async () => {

  // Repository handles Prisma/database
  const products = await findAllProducts();

  return products;
};


// UPDATE PRODUCT
export const updateProductService = async (
  id: string,
  product: any
) => {

  // Validation
  if (!product.name) {
    throw new Error("Product name is required");
  }

  if (product.price === undefined) {
    throw new Error("Product price is required");
  }

  if (product.price <= 0) {
    throw new Error("Product price must be greater than 0");
  }

  const productId = Number(id);

  if (isNaN(productId)) {
    throw new Error("Invalid product ID");
  }

  // Repository handles database update
  const updatedProduct = await updateProduct(
    productId,
    product.name,
    product.price
  );

  return updatedProduct;
};


// DELETE PRODUCT
export const deleteProductService = async (id: string) => {

  const productId = Number(id);

  if (isNaN(productId)) {
    throw new Error("Invalid product ID");
  }

  // Repository handles database delete
  const deletedProduct = await deleteProduct(productId);

  return deletedProduct;
};