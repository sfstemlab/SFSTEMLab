// import { PrismaClient } from '@prisma/client'

// const db = new PrismaClient(); 


// export async function getUsers() {
//     try {
//         const users = await db.user.findMany({
//             select: {
//                 id: true,
//                 email: true, 
//                 username: true, 
//                 avatarUrl: true, 
//                 createdAt: true,
//             }
//         })
//         return users
//     } catch (error:any) {
//         throw new Error(`Failed to fetch users: ${error.message}`)
//     }
// }



// export async function getUserById(id: number) {
//     try {
//         const user = await db.user.findUnique({
//             where: { id }, 
//             select: {
//                 id: true, 
//                 email: true, 
//                 username: true,
//                 avatarUrl: true, 
//                 packs: true, 
//                 collection: true
//             }
//         })
//         if (!user) throw new Error('User not found')
//         return user
//     } catch (error:any){
//         throw new Error(`Failed to fetch user: ${error.message}`)
//     }
// }



// // getPacks