import { prisma } from "../../src/lib/prisma.js";

const publishers = [
  {
    name: "Penguin Random House",
    summary:
      "One of the world’s largest trade book publishers, offering fiction and non-fiction titles.",
  },
  {
    name: "HarperCollins",
    summary:
      "A global publishing company known for a wide range of fiction, non-fiction, and educational books.",
  },
  {
    name: "Simon & Schuster",
    summary:
      "An American publishing company producing books across many genres and categories.",
  },
  {
    name: "Hachette Book Group",
    summary:
      "A leading publishing house with strong offerings in literature, education, and entertainment.",
  },
  {
    name: "Macmillan Publishers",
    summary:
      "An international publishing company focused on academic, educational, and trade books.",
  },
  {
    name: "Oxford University Press",
    summary:
      "The largest university press in the world, publishing academic and educational materials.",
  },
  {
    name: "Cambridge University Press",
    summary:
      "A prestigious academic publisher specializing in research, education, and scholarly works.",
  },
  {
    name: "Pearson Education",
    summary:
      "A major education publisher providing learning materials and digital content.",
  },
  {
    name: "O’Reilly Media",
    summary:
      "A technology-focused publisher known for books on programming, software, and innovation.",
  },
  {
    name: "Packt Publishing",
    summary:
      "A publisher specializing in practical books for developers, IT professionals, and engineers.",
  },
];

async function main() {
  console.log("🌱 Seeding publishers...");

  for (const publisher of publishers) {
    await prisma.publisher.upsert({
      where: { name: publisher.name },
      update: {},
      create: publisher,
    });
  }

  console.log("✅ Publishers seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
