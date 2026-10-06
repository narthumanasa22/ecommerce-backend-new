import "dotenv/config";

import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seeding products...");

  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "Laptop",
        price: 50000,
      },
      {
        name: "Phone",
        price: 25000,
      },
      {
        name: "Headphones",
        price: 3000,
      },
      {
        name: "Keyboard",
        price: 1500,
      },
      {
        name: "Mouse",
        price: 800,
      },
    ],
  });

  const products = await prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
  });

  console.log("Products created successfully ✅");
  console.log(products);
}

main()
  .catch((error) => {
    console.error("Seed failed ❌", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });