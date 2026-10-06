import { prisma } from "../prisma";


// ===============================
// CREATE PRODUCT
// ===============================

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

  const createdProduct = await prisma.product.create({
    data: {
      name: product.name,
      price: product.price
    }
  });

  return createdProduct;
};


// ===============================
// GET ALL PRODUCTS
// ===============================

export const getProductsService = async () => {

  const products = await prisma.product.findMany({
    orderBy: {
      id: "asc"
    }
  });

  return products;
};


// ===============================
// UPDATE PRODUCT
// ===============================

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

  const updatedProduct = await prisma.product.update({
    where: {
      id: Number(id)
    },

    data: {
      name: product.name,
      price: product.price
    }
  });

  return updatedProduct;
};


// ===============================
// DELETE PRODUCT
// ===============================

export const deleteProductService = async (id: string) => {

  const deletedProduct = await prisma.product.delete({
    where: {
      id: Number(id)
    }
  });

  return deletedProduct;
};