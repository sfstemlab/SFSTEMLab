// import { PrismaClient } from '@prisma/client'

// const db = new PrismaClient(); 

// export async function getCards() {
//     try {
//         const cards = await db.card.findMany({
//             select: {
//                 id: true,
//                 name: true,
//                 cmc: true,
//                 rarity: true,
//                 cardSetId: true
//             }
//         })
//         return cards
//     } catch (error:any) {
//         throw new Error(`Failed to fetch cards: ${error.message}`)
//     }
// }

// export async function getCardsById(id:number) {
//     try {
//         const card = await db.card.findMany({
//             where: { id },
//             select: {
//                 id: true,
//                 name: true,
//                 cmc: true,
//                 rarity: true,
//                 cardSetId: true
//             }
//         })
//         if (!card) throw new Error('Card not found')

//         return card
//     } catch (error:any) {
//         throw new Error(`Failed to fetch cards: ${error.message}`)
//     }
// }

