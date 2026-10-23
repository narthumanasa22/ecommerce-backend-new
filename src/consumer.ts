
import "dotenv/config";
import { connectRabbitMQ, getRabbitMQChannel } from "./rabbitmq";

async function main() {
  await connectRabbitMQ();

  const channel = getRabbitMQChannel();

  await channel.consume(
    "order_notifications",
    (message: any) => {
      if (message === null) return;

      try {
        const order = JSON.parse(message.content.toString());

        console.log("Received order message:", order);

        // Message process ayyaka RabbitMQ ki acknowledge chestham
        channel.ack(message);
      } catch (error) {
        console.error("Failed to process message:", error);
        channel.nack(message, false, false);
      }
    },
    { noAck: false }
  );

  console.log("Consumer waiting for order messages...");
}

main().catch((error) => {
  console.error("Consumer failed:", error);
  process.exit(1);
});
