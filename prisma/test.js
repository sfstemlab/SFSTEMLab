import { PrismaClient } from "@prisma/client"

const db = new PrismaClient(); 

async function validateConnection() {
    try {
        await db.$connect(); 
        console.log("looks good", process.env.DATABASE_URL);

        const ex = await db.eventSignup.findFirst(); 
        console.log("ex", ex); 
    } catch (err) {
        consol.log(err);
    } finally {
        await db.$disconnect(); 
    }

    
}

validateConnection(); 