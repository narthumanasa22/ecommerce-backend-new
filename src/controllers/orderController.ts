
import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import * as orderService from "../services/orderService";

// CREATE ORDER FROM CART
export const createOrder = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const order = await orderService.createOrderService(
      req.user.id
    );

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to create order",
    });
  }
};

// GET ALL ORDERS OF LOGGED-IN USER
export const getOrders = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const orders = await orderService.getOrdersService(
      req.user.id
    );

    return res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch orders",
    });
  }
};

// GET A SINGLE ORDER
export const getOrderById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const orderId = Number(req.params.orderId);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return res.status(400).json({
        message: "Valid order ID is required",
      });
    }

    const order = await orderService.getOrderByIdService(
      req.user.id,
      orderId
    );

    return res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch order";

    const status = message === "Order not found" ? 404 : 400;

    return res.status(status).json({ message });
  }
};
