import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

const formSchema = z.object({
    teamNum: z.coerce.number().int().optional(),
    contactEmail: z.string().email('Please enter a valid contact email'),
    contactPerson: z.string().optional(),
    purpose: z.string().optional(),
    startTime: z.coerce.number().int('Please choose a start time'),
    endTime: z.coerce.number().int('Please choose an end time'),
    date: z.coerce.date({ errorMap: () => ({ message: 'Please choose a date' }) }),
});

export async function POST(req: NextRequest) {
    try {
        let body: any;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ error: 'Invalid json request' }, { status: 400 });
        }

        const result = formSchema.safeParse(body);
        if (!result.success) {
            const message = result.error.issues[0].message;
            return NextResponse.json({ error: message }, { status: 400 });
        }

        const data = result.data;

        if (data.startTime >= data.endTime) {
            return NextResponse.json(
                { error: 'Start time must be before end time' },
                { status: 422 }
            );
        }

        const clerkUser = await currentUser();
        const user = clerkUser
            ? await db.user.findUnique({
                  where: { clerkId: clerkUser.id },
                  select: { id: true },
              })
            : null;

        const created = await db.timeslot.create({
            data: {
                userId: user?.id ?? null,
                teamNum: data.teamNum,
                contactEmail: data.contactEmail,
                contactPerson: data.contactPerson,
                purpose: data.purpose,
                approved: true,
                startTime: data.startTime,
                endTime: data.endTime,
                date: data.date,
            },
        });

        return NextResponse.json({ created }, { status: 201 });
    } catch (err: any) {
        console.error('[API:createTimeslot] error', err);
        return NextResponse.json({ error: 'Failed to create timeslot' }, { status: 500 });
    }
}
