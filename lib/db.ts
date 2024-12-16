// lib/db.ts
import { Card, PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { db?: PrismaClient };

export const db = globalForPrisma.db || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db;

// export async function to getAllCards
export async function getAllCards(): Promise<Card[]>{
  try {
    const cards = await db.card.findMany({
        select: {
            id: true,
            released_at: true,
            image_uris: true,
            mana_cost: true,
            cmc: true,
            type_line: true,
            oracale_text: true,
            power: true,
            toughness: true,
            colors: true,  // Simple string array
            color_identity: true,
            legalities: true,
            games: true,
            finishes: true,
            reprint: true,
            booster: true,
            set: true,  // Simple string field
            set_name: true,
            set_type: true,
            set_uri: true,
            rulings_uri: true,
            digital: true,
            rarity: true,  // Simple string field
            layout: true,
            edhrec_rank: true,
            prices: true,
            related_uris: true,
            purchase_uris: true,
        },
    });
    return cards
  } catch (error) {
    console.error("Error fetching all cards", error);
    throw new Error("unable to fetch cards")
  }
}
// Export a function to fetch cards by rarity 
export async function getCardsByRarity(rarityLevel: string): Promise<Card[]> {
  try {
    const cards = await db.card.findMany({
      where: {
        rarity: rarityLevel,
      },
      select: {
        // these are the columns that i want back
        id: true,
        released_at: true,
        image_uris: true,
        mana_cost: true,
        cmc: true,
        type_line: true,
        oracale_text: true,
        power: true,
        toughness: true,
        colors: true,  // Simple string array
        color_identity: true,
        legalities: true,
        games: true,
        finishes: true,
        reprint: true,
        booster: true,
        set: true,  // Simple string field
        set_name: true,
        set_type: true,
        set_uri: true,
        rulings_uri: true,
        digital: true,
        rarity: true,  // Simple string field
        layout: true,
        edhrec_rank: true,
        prices: true,
        related_uris: true,
        purchase_uris: true,
      }
    });
    return cards;
  } catch (error) {
    console.error("Error fetching cards by rarity", error); 
    throw new Error("unable to fetch cards"); 
  }
}

