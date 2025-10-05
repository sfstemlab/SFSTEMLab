import { PrismaClient } from "@prisma/client";

const prisma = global as unknown as {prisma : PrismaClient } 

export const db = prisma.prisma || new PrismaClient({log: ['query', 'error', 'warn']})

if (process.env.node_env !== 'production') {
    prisma.prisma = db  
} 