export const createProductService = (product: any) => {
  if (!product.name) {
    throw new Error("Product name is required");
  }

  if (product.price === undefined) {
    throw new Error("Product price is required");
  }

  if (product.price <= 0) {
    throw new Error("Product price must be greater than 0");
  }

  return product;
};