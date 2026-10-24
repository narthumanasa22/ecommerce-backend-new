
import "dotenv/config";
import {
  addEmailJob,
  emailQueue,
} from "./queues/emailQueue";

async function main() {
  try {
    const job = await addEmailJob(
      "test@example.com",
      "Your order has been confirmed!"
    );

    console.log("Test job added successfully:", job.id);
  } catch (error) {
    console.error("Failed to add email job:", error);
    process.exitCode = 1;
  } finally {
    await emailQueue.close();
  }
}

main();
