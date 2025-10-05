//import { db } from "@/database/prisma";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"

const db = new PrismaClient(); 


const formSchema = z.object({
    event: z.string().min(1, "Event is required"),
    firstName: z.string().min(1, 'Please enter your name').optional(),
    lastName: z.string().min(1, 'Please enter your name').optional(),
    pronouns: z.string().optional(),
    accessSource: z.string().optional(),
    reasonForAttending: z.string().optional(),
    school: z.string().optional(),
    grade: z.string().optional()
})

// POST: create a new event sign-up record
export async function POST (req: NextRequest) {
    // await db.$connect(); 
    // // parse json body (or return 400)
    // let body: any;
    // try {
    //     body = await req.json()
    // } catch {
    //     return NextResponse.json({error: 'Invalid json request'}, {status: 400})
    // } finally {
    //     await db.$disconnect(); 
    // }


    // // validate + parse with zod
    // const result = formSchema.safeParse(body)
    // if (!result.success) {
    //     const message = result.error.issues[0].message;
    //     return NextResponse.json({error: message}, {status: 400})
    // }

    // const data = result.data
    
    // // insert it into our db via prisma
    // try {
    //     // const created = await db.eventSignup.create({data})
    //     // return NextResponse.json(created, {status: 201})
    // } catch(e) {
    //     return NextResponse.json({error: 'Database insert fail'}, {status: 500})
    // }
    // await db.$disconnect();
    
    
}