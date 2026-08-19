import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
    try {
        const events = await db.event.findMany({
            orderBy: { date: "asc" },
        });
        return NextResponse.json({ events }, { status: 200 });
    } catch (e: any) {
        console.error("[API:events] error", e);
        return NextResponse.json(
            { error: "Failed to load events", e },
            { status: 500 }
        );
    }
}
