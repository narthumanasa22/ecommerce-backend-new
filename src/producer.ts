
import { getRabbitMQChannel } from "./rabbitmq";

export function sendOrderMessage(orderId: number) {
  const channel = getRabbitMQChannel();

  const message = {
    orderId,
    message: "Order created successfully",
    createdAt: new Date().toISOString(),
  };

  const sent = channel.sendToQueue(
    "order_notifications",
    Buffer.from(JSON.stringify(message)),
    { persistent: true }
  );

  if (sent) {
    console.log("Order message sent:", message);
  } else {
    console.log("RabbitMQ write buffer is full; wait before sending more");
  }
}
