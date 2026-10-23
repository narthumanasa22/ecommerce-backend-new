
import amqp from "amqplib";

let connection: any;
let channel: any;

export async function connectRabbitMQ() {
  try {
    const username = process.env.RABBITMQ_USER;
    const password = process.env.RABBITMQ_PASSWORD;

    if (!username || !password) {
      throw new Error("RabbitMQ credentials missing in .env");
    }

    const url = `amqp://${encodeURIComponent(username)}:${encodeURIComponent(password)}@localhost:5672`;

    connection = await amqp.connect(url);
    channel = await connection.createChannel();

    await channel.assertQueue("order_notifications", {
      durable: true,
    });

    console.log("RabbitMQ connected successfully");
    console.log("Queue ready: order_notifications");
  } catch (error) {
    console.error("RabbitMQ connection failed:", error);
    throw error;
  }
}

export function getRabbitMQChannel() {
  if (!channel) {
    throw new Error("RabbitMQ channel is not initialized");
  }

  return channel;
}
