const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 1000;

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home",
  "Sports",
  "Beauty",
  "Toys",
  "Automotive",
];

function randomPrice() {
  return Number((Math.random() * 5000 + 10).toFixed(2));
}

async function main() {
  console.log("Seeding started...");

  const base = Date.now();

  for (let start = 0; start < TOTAL_PRODUCTS; start += BATCH_SIZE) {
    const batch = [];

    for (
      let i = start;
      i < Math.min(start + BATCH_SIZE, TOTAL_PRODUCTS);
      i++
    ) {
      const createdAt = new Date(base - i);

      const updatedAt = new Date(
        createdAt.getTime() + Math.floor(Math.random() * 1000000)
      );

      batch.push({
        name: `Product ${i + 1}`,
        category:
          categories[Math.floor(Math.random() * categories.length)],
        price: randomPrice(),
        createdAt,
        updatedAt,
      });
    }

    await prisma.product.createMany({
      data: batch,
    });

    console.log(
      `Inserted ${Math.min(start + BATCH_SIZE, TOTAL_PRODUCTS)} / ${TOTAL_PRODUCTS}`
    );
  }

  console.log("✅ Seeding complete");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });