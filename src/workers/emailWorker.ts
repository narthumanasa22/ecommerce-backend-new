
import "dotenv/config";
import { Worker } from "bullmq";

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { email, message } = job.data;

    console.log("Processing job:", job.id);
    console.log("Sending email to:", email);
    console.log("Message:", message);

    // Demo only: actual email send cheyyatledu
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Email job processed successfully!");
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  }
);

emailWorker.on("completed", (job) => {
  console.log("Job completed:", job.id);
});

emailWorker.on("failed", (job, error) => {
  console.error("Job failed:", job?.id, error.message);
});

emailWorker.on("error", (error) => {
  console.error("Worker error:", error.message);
});

console.log("Email worker waiting for jobs...");
