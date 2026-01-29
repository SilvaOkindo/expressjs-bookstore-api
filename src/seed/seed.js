import { prisma } from "../../src/lib/prisma.js";

const categories = [
  {
    name: "Fiction",
    description: "Imaginary stories including novels and short stories.",
  },
  {
    name: "Non-Fiction",
    description: "Books based on real events, facts, and information.",
  },
  {
    name: "Science & Technology",
    description: "Books on science, engineering, programming, and technology.",
  },
  {
    name: "Business & Economics",
    description: "Entrepreneurship, finance, economics, and management.",
  },
  {
    name: "Self-Help & Personal Development",
    description: "Books focused on mindset, productivity, and personal growth.",
  },
  {
    name: "History",
    description: "Historical events, civilizations, and world history.",
  },
  {
    name: "Biography & Memoir",
    description: "Life stories and autobiographies of notable individuals.",
  },
  {
    name: "Children’s Books",
    description: "Books written for children and early readers.",
  },
  {
    name: "Young Adult",
    description: "Books targeted at teenage and young adult readers.",
  },
  {
    name: "Religion & Philosophy",
    description: "Religious texts and philosophical discussions.",
  },
  {
    name: "Romance",
    description: "Stories centered around love and relationships.",
  },
  {
    name: "Mystery & Thriller",
    description: "Suspenseful stories involving crime, mystery, or thrill.",
  },
];

async function main() {
  console.log("🌱 Seeding categories...");

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log("✅ Categories seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
