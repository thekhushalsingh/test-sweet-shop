import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  log: ["warn", "error"],
});

/* ==============================
   SWEETS DATA
================================ */
const sweets = [
  // Chocolate Category (8)
  {
    name: "Belgian Dark Chocolate",
    category: "Chocolate",
    description: "70% dark chocolate from Belgium with rich cocoa flavor",
    price: 5.99,
    quantity: 45,
  },
  {
    name: "Milk Chocolate Bar",
    category: "Chocolate",
    description: "Creamy milk chocolate with hazelnut pieces",
    price: 3.49,
    quantity: 75,
  },
  {
    name: "White Chocolate Truffles",
    category: "Chocolate",
    description: "White chocolate truffles with vanilla cream filling",
    price: 8.99,
    quantity: 25,
  },
  {
    name: "Chocolate Covered Almonds",
    category: "Chocolate",
    description: "Roasted almonds coated in dark chocolate",
    price: 6.49,
    quantity: 40,
  },
  {
    name: "Chocolate Orange Slices",
    category: "Chocolate",
    description: "Dark chocolate with candied orange peel",
    price: 4.99,
    quantity: 35,
  },
  {
    name: "Sea Salt Caramel Chocolate",
    category: "Chocolate",
    description: "Dark chocolate with sea salt caramel filling",
    price: 7.99,
    quantity: 30,
  },
  {
    name: "Chocolate Mint Wafers",
    category: "Chocolate",
    description: "Crisp mint wafers coated in dark chocolate",
    price: 5.49,
    quantity: 50,
  },
  {
    name: "Chocolate Raspberry Hearts",
    category: "Chocolate",
    description: "Heart-shaped chocolates with raspberry filling",
    price: 9.99,
    quantity: 20,
  },

  // Gummy Category (6)
  {
    name: "Sour Gummy Worms",
    category: "Gummy",
    description: "Tangy sour gummy worms in assorted flavors",
    price: 2.99,
    quantity: 120,
  },
  {
    name: "Fruit Gummy Bears",
    category: "Gummy",
    description: "Classic fruit-flavored gummy bears",
    price: 2.49,
    quantity: 150,
  },
  {
    name: "Gummy Dinosaurs",
    category: "Gummy",
    description: "Colorful dinosaur-shaped gummies",
    price: 3.29,
    quantity: 85,
  },
  {
    name: "Cola Bottle Gummies",
    category: "Gummy",
    description: "Cola-flavored gummy bottles",
    price: 2.79,
    quantity: 95,
  },
  {
    name: "Gummy Peach Rings",
    category: "Gummy",
    description: "Peach-flavored gummy rings with sugar coating",
    price: 3.49,
    quantity: 60,
  },
  {
    name: "Gummy Sharks",
    category: "Gummy",
    description: "Blue raspberry flavored gummy sharks",
    price: 3.99,
    quantity: 55,
  },

  // Hard Candy (5)
  {
    name: "Peppermint Candy Canes",
    category: "Hard Candy",
    description: "Classic peppermint candy canes",
    price: 1.99,
    quantity: 200,
  },
  {
    name: "Butterscotch Drops",
    category: "Hard Candy",
    description: "Rich butterscotch flavored hard candies",
    price: 2.49,
    quantity: 110,
  },
  {
    name: "Cinnamon Hard Candies",
    category: "Hard Candy",
    description: "Hot cinnamon flavored hard candies",
    price: 1.79,
    quantity: 130,
  },
  {
    name: "Strawberry Hard Candy",
    category: "Hard Candy",
    description: "Sweet strawberry flavored hard candies",
    price: 1.89,
    quantity: 125,
  },
  {
    name: "Lemon Drops",
    category: "Hard Candy",
    description: "Tangy lemon flavored hard candies",
    price: 1.99,
    quantity: 115,
  },

  // Caramel (4)
  {
    name: "Salted Caramels",
    category: "Caramel",
    description: "Soft caramels with sea salt topping",
    price: 4.99,
    quantity: 65,
  },
  {
    name: "Caramel Apples",
    category: "Caramel",
    description: "Crisp apples covered in caramel",
    price: 6.99,
    quantity: 30,
  },
  {
    name: "Caramel Popcorn",
    category: "Caramel",
    description: "Popcorn coated in buttery caramel",
    price: 5.49,
    quantity: 45,
  },
  {
    name: "Chocolate Caramel Bites",
    category: "Caramel",
    description: "Caramel pieces covered in milk chocolate",
    price: 7.49,
    quantity: 40,
  },

  // Marshmallow (3)
  {
    name: "Marshmallow Chicks",
    category: "Marshmallow",
    description: "Colorful marshmallow chicks",
    price: 3.99,
    quantity: 80,
  },
  {
    name: "Marshmallow Pops",
    category: "Marshmallow",
    description: "Marshmallows on sticks with chocolate coating",
    price: 2.99,
    quantity: 90,
  },
  {
    name: "Marshmallow Squares",
    category: "Marshmallow",
    description: "Soft marshmallow squares with coconut",
    price: 4.49,
    quantity: 55,
  },

  // Special + Edge Cases
  {
    name: "Cotton Candy",
    category: "Candy Floss",
    description: "Fluffy pink cotton candy",
    price: 3.99,
    quantity: 40,
  },
  {
    name: "Rare Candy",
    category: "Special",
    description: "Very rare candy, almost sold out",
    price: 15.99,
    quantity: 1,
  },
  {
    name: "Sold Out Chocolate",
    category: "Chocolate",
    description: "This item is currently out of stock",
    price: 6.99,
    quantity: 0,
  },
];

/* ==============================
   SEED FUNCTION
================================ */
async function main() {
  console.log("🌱 Starting database seed...");

  // Clean database (order matters)
  await prisma.purchaseHistory.deleteMany();
  await prisma.sweet.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const passwordHash = await bcrypt.hash("password123", 12);

  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      password: passwordHash,
      role: UserRole.USER,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: passwordHash,
      role: UserRole.ADMIN,
    },
  });

  console.log("👤 Users created");

  // Insert sweets in batches
  const batchSize = 10;
  for (let i = 0; i < sweets.length; i += batchSize) {
    await prisma.sweet.createMany({
      data: sweets.slice(i, i + batchSize),
    });
  }

  console.log(`🍬 ${sweets.length} sweets inserted`);

  // Create sample purchase history
  const testSweet = await prisma.sweet.findFirst();

  if (testSweet) {
    await prisma.purchaseHistory.createMany({
      data: [
        {
          sweetId: testSweet.id,
          userId: user.id,
          quantity: 2,
          price: testSweet.price,
          total: testSweet.price * 2,
        },
        {
          sweetId: testSweet.id,
          userId: admin.id,
          quantity: 5,
          price: testSweet.price,
          total: testSweet.price * 5,
        },
      ],
    });
  }

  // Summary
  console.log("\n📊 SEED SUMMARY");
  console.log(`• Users: ${await prisma.user.count()}`);
  console.log(`• Sweets: ${await prisma.sweet.count()}`);
  console.log(`• Purchases: ${await prisma.purchaseHistory.count()}`);

  console.log("\n🔐 Test Accounts");
  console.log("Admin → admin@example.com / password123");
  console.log("User  → user@example.com / password123");

  console.log("\n🎉 Database seeded successfully!");
}

/* ==============================
   RUN
================================ */
main()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
