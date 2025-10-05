import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
    try {
        const timeslots = await db.timeslot.findMany();

        return NextResponse.json({ timeslots }, { status: 200 });
    } catch (e:any) {
        console.error("[API:getTimeslots] error", e)
        return NextResponse.json(
            { error: "Failed to load timeslots", e }, 
            { status: 500 }
        );
    }
}