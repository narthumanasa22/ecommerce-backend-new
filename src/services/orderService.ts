
import {
  createOrderFromCart,
  findOrdersByUserId,
  findOrderById,
} from "../repositories/orderRepository";

import { findById } from "../repositories/userRepository";
import { addEmailJob } from "../queues/emailQueue";

// Create a new order and queue a background notification
export const createOrderService = async (userId: number) => {
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error("Invalid user ID");
  }

  // 1. Find the user
  const user = await findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // 2. Create the order from the user's cart
  const order = await createOrderFromCart(userId);

  console.log("Order created:", order.id);

  // 3. Queue the notification job
  try {
    const job = await addEmailJob(
      user.email,
      `Order ${order.id} created successfully`
    );

    console.log("Email job queued successfully:", job.id);
  } catch (error) {
    console.error("Order notification could not be queued:", error);
  }

  return order;
};

// Get all orders for a user
export const getOrdersService = async (userId: number) => {
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error("Invalid user ID");
  }

  return await findOrdersByUserId(userId);
};

// Get a specific order belonging to a user
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
