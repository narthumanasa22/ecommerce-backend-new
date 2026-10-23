
import "dotenv/config";
import { connectRabbitMQ } from "./rabbitmq";
import { sendOrderMessage } from "./producer";

async function main() {
  await connectRabbitMQ();

  sendOrderMessage(101);

  setTimeout(() => {
    process.exit(0);
  }, 1000);
}

main().catch((error) => {
  console.error("Producer test failed:", error);
  process.exit(1);
});
