// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { db?: PrismaClient };

export const db = globalForPrisma.db || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db;

// export async function to getAllCards
export async function getAllCards(){
  try {
    const cards = await db.card.findMany({
      include: {
        rarity: true, 
        cardSet: true, 
        colors: {
          include: {
            color: true
          },
        },
        types: true,
        supertypes: true,
        subtypes: true
      },
    });
    return cards
  } catch (error) {
    console.error("Error fetching all cards", error);
    throw new Error("unable to fetch cards")
  }
}
// Export a function to fetch cards by rarity 
export async function getCardsByRarity(rarityLevel: string) {
  try {
    const cards = await db.card.findMany({
      where: {
        rarity: {
          level: rarityLevel,
        },
      },
      include: {
        // these are the columns that i want back
        rarity: true, 
        cardSet: true,
      }
    });
    return cards;
  } catch (error) {
    console.error("Error fetching cards by rarity", error); 
    throw new Error("unable to fetch cards"); 
  }
}

