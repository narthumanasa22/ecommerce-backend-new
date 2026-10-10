
import {
  createOrderFromCart,
  findOrdersByUserId,
  findOrderById,
} from "../repositories/orderRepository";

// CREATE ORDER
export const createOrderService = async (userId: number) => {
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error("Invalid user ID");
  }

  return await createOrderFromCart(userId);
};

// GET ALL ORDERS OF A USER
export const getOrdersService = async (userId: number) => {
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error("Invalid user ID");
  }

  return await findOrdersByUserId(userId);
};

// GET A SINGLE ORDER
export const getOrderByIdService = async (
  userId: number,
  orderId: number
) => {
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw new Error("Invalid order ID");
  }

  const order = await findOrderById(userId, orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};
