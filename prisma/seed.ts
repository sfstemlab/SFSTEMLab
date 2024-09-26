import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main (){
    const user_1 = await prisma.user.upsert({
        where: {
            email: '1234@gmail.com'
        },
        update: {},
        create: {
            name: 'August',
            email: '1234@gmail.com'
        },
    })
    console.log('database seeded')
}


main().catch((e) => {
    console.error(e)
    process.exit(1)
})
.finally(async () => {
    await prisma.$disconnect()
})