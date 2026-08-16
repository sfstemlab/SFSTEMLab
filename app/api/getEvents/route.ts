import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from '@clerk/nextjs/server'

export async function GET() {
    console.log("[GET /api/fetchEvents] Route hit")
    const user = await currentUser();
    console.log("[API:fetchEvents] currentUser ->", user?.id || "no user")

    if (!user) {
        return NextResponse.json({error: 'User not signed in', status: 401}) // unauthorized error code
    }

    try {
        // find user first
        const prismaUser = await db.user.findUnique({
            where: {clerkId: user.id}, 
            select: {id : true, email: true}
        });

        // if a prisma user is found, use id otherwise use email
        const email = user.emailAddresses?.[0]?.emailAddress ?? null; 

        const whereClause = 
            prismaUser && email
                ? { OR: [{ userId: prismaUser.id }, { email } ]} : prismaUser
                ? { userId: prismaUser.id } : email
                ? { email } : undefined 

        if (!whereClause) {
            return NextResponse.json({ events: []}, {status: 200})
        }

        const events = await db.eventSignup.findMany({
            where: whereClause, 
            include: {
                event: true, // fetch related event info (title, desc, etc.)
            },
            orderBy: { createdAt: "desc" }
        })

        console.log("Events found: ", events.length); 
        
        
        console.log("events found: ", events); 
        return NextResponse.json({ events }, { status: 200 });
    } catch (e:any) {
        console.error("[API:getevents] error", e)
        return NextResponse.json(
            { error: "Failed to load events", e }, 
            { status: 500 }
        );
    }
}