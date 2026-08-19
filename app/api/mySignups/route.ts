import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from '@clerk/nextjs/server'

export async function GET() {
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: 'User not signed in' }, { status: 401 })
    }

    try {
        const prismaUser = await db.user.findUnique({
            where: { clerkId: user.id },
            select: { id: true, email: true }
        });

        const email = user.emailAddresses?.[0]?.emailAddress ?? null;

        const whereClause =
            prismaUser && email
                ? { OR: [{ userId: prismaUser.id }, { email }] } : prismaUser
                ? { userId: prismaUser.id } : email
                ? { email } : undefined

        if (!whereClause) {
            return NextResponse.json({ events: [] }, { status: 200 })
        }

        const events = await db.eventSignup.findMany({
            where: whereClause,
            include: {
                event: true, // fetch related event info (title, desc, etc.)
            },
            orderBy: { createdAt: "desc" }
        })

        return NextResponse.json({ events }, { status: 200 });
    } catch (e: any) {
        console.error("[API:mySignups] error", e)
        return NextResponse.json(
            { error: "Failed to load signups", e },
            { status: 500 }
        );
    }
}
