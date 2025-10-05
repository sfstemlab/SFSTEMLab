import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testDB() {
  try {
    await prisma.$connect();
    console.log("✅ DB connection successful!");
  } catch (e) {
    console.error("❌ DB connection failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

testDB();