import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id);

    if (!Number.isInteger(id)) {
        return NextResponse.json({ error: "Invalid event id" }, { status: 400 });
    }

    try {
        const event = await db.event.findUnique({ where: { id } });

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ event }, { status: 200 });
    } catch (e: any) {
        console.error("[API:events/[id]] error", e);
        return NextResponse.json(
            { error: "Failed to load event", e },
            { status: 500 }
        );
    }
}
