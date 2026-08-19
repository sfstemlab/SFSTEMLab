import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod"

const formSchema = z.object({
    eventId: z.coerce.number().int("Event is required"),
    email: z.string().email('Please enter a valid email'),
    firstName: z.string().min(1, 'Please enter your first name'),
    lastName: z.string().min(1, 'Please enter your last name'),
    pronouns: z.string().optional(),
    accessSource: z.string().optional(),
    reasonForAttending: z.string().optional(),
    school: z.string().optional(),
    grade: z.coerce.number().int('Please enter a grade')
})

// POST: create a new event sign-up record
export async function POST (req: NextRequest) {
    try {
        // parse json body (or return 400)
        let body: any;
        try {
            body = await req.json()
        } catch {
            return NextResponse.json({error: 'Invalid json request'}, {status: 400})
        } 
    
        // validate + parse with zod
        const result = formSchema.safeParse(body)
        if (!result.success) {
            const message = result.error.issues[0].message;
            return NextResponse.json({error: message}, {status: 400})
        }
    
        const data = result.data
        console.log("EVENT_SIGNUP_API_DATA: ", data)

        const clerkUser = await currentUser(); 
        let user = clerkUser 
            ? await db.user.findUnique({
                where: { clerkId : clerkUser?.id }, 
                select: {id: true, email: true},
            })
            : null

        const eventExists = await db.event.findUnique({
            where: {id: data.eventId },
        })

        if(!eventExists) {
            return NextResponse.json({
                error: "Selected event does not exists"
            }, {status: 404})
        }
        
        const created = await db.eventSignup.create({
            data: {
                userId: user?.id ?? null,
                eventId: data.eventId,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                pronouns: data.pronouns,
                accessSource: data.accessSource,
                reasonForAttending: data.reasonForAttending,
                school: data.school,
                grade: data.grade,
            },
            include: {event :true},
        })
    
        console.log("New signup created"); 
    
        return NextResponse.json(created, {status: 201})

    } catch (e:any) {
        console.log(e)
        return NextResponse.json({error: e.message},  {status: 500})
    }

    
}