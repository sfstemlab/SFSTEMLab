import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient()

export async function POST(req: NextRequest) {
    let body:any = {}

    try {
        body = await req.json()
    } catch (e) {
        console.log(e)
        return NextResponse.json({error: 'Invalid json request', e}, {status: 400})
    }

    try {
        const created = await db.person.create({data: body})
        return NextResponse.json({created}, {status: 201})
    } catch (e) {
        return NextResponse.json({error: 'db insert fail', e}, {status: 500 })
    }
}