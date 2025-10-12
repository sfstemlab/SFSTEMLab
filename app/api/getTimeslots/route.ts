import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
    try {
        console.log("searching for timeslots...")
        const timeslots = await db.timeslot.findMany();
        console.log("Timeslots found: ", timeslots); 
        return NextResponse.json({ timeslots }, { status: 200 });
    } catch (e:any) {
        console.error("[API:getTimeslots] error", e)
        return NextResponse.json(
            { error: "Failed to load timeslots", e }, 
            { status: 500 }
        );
    }
}