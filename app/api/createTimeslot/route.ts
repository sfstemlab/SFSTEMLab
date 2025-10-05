import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

 const availableHours: Record<string,  [number, number]> = {
    Mon: [4, 6],
    Tue: [4, 6],
    Wed: [4, 6],
    Thu: [4, 6],
    Fri: [4, 6],
    Sat: [11, 6],
    Sun: [11, 6]
}



export async function POST(req: NextRequest) {
    console.log('running POST request')
    try {
        const body = await req.json()

        console.log("[API:createTimeslot-Body: ", JSON.stringify(body, null, 2))

        const dateObj = new Date(body.date);

        //basic input validation 
        // if(
        //     !body.title ||
        //     !body.desc || 
        //     typeof body.startTime !== "number" ||
        //     typeof body.endTime !== "number" ||
        //     !body.date
        // ) {
        //     return NextResponse.json({ error: "Missing required fields "}, { status: 422 })
        // }

        

        // // check to make sure that the event starts before it ends
        // if (body.startTime >= body.endTime) {
        //     return NextResponse.json({ error: "Due to the laws of time, events must start before they end"}, { status: 422 })
        // }
        
        // hours window validation
        // find the day of the week (eg. Mon, Tue, so on)
        // const dayOfWeek = dateObj.toLocaleString('en-US', {weekday: 'short'}).slice(0,3)
        // const hours = availableHours[dayOfWeek]
        // if (!hours) {
        //     return NextResponse.json({ error: "Invalid day of week"}, { status: 422 })
        // }
        
        // const [openTime, closingTime] = hours

        // const withinHours = 
        //     body.startTime >= openTime &&
        //     body.endTime <= closingTime &&
        //     body.startTime >= 0 && 
        //     body.endTime <= 24

        // if (!withinHours) {
        //     return NextResponse.json({ error: "Event not within open hours"}, { status: 422 })
        // }
        
        //Prisma query syntax options: lt, lte, gt, gte, equals, in, contains
            
        // check conflicts/overlap validation 
        // const conflicting = await db.timeslot.findFirst({
        //     where: {
        //         date: dateObj,
        //         AND: [
        //             // events conflict at the end of the event that the user inputted
        //             {startTime: {lt: body.endTime}},
        //             {endTime: {gt: body.startTime}},
        //         ],
        //     },
        //     // select: { id: true, title, true, startTime: true, endTime: true }
        // })

        // if (conflicting){
        //     return NextResponse.json(
        //         { 
        //             error: "The event that you inputted conflicted with another event. Please enter another time",
        //             conflict: conflicting, 
        //         }, 
        //         { status: 409 })
        // } 

        const created = await db.timeslot.create({ 
            data: {
                title: body.title, 
                desc: body.desc,
                teamNum: Number(body.teamNum) || 0,
                startTime: Number(body.startTime),
                endTime: Number(body.endTime),
                date: dateObj
            }
        })
        
        console.log("✅ Created Timeslot: ", created)
        return NextResponse.json({created}, {status: 201})

        // const intersects = currentTimeslots.forEach((slot:any) => {
        //     if (body.startTime<=slot.endTime && body.startTime >= slot.startTime){ 
        //         // the user is trying to enter an event that starts before another event ends but after that event starts
        //         return true
        //     }

        //     if (body.endTime >= slot.startTime && body.endTime <= slot.endTime){ 
        //         // the user is trying to enter an event that ends after another event starts but before that event ends
        //         return true
        //     }
        // })
        // if (
        //     body.startTime >= availableHours[body.dayOfWeek][0] && 
        //     body.endTime <= availableHours[body.dayOfWeek][1] &&
        //     // check that the requested time starts after we open and before we close
        //     !intersects
        //     // check that the event does not intersect with any other events
        // ){
        //     const created = await db.timeslot.create({ 
        //         data: {
        //             title: body.title, 
        //             desc: body.desc,
        //             startTime: body.startTime,
        //             endTime: body.endTime,
        //             day: body.day,
        //             dayOfWeek: body.dayOfWeek,
        //             month: body.month
        //         }
        //     })
        //     return NextResponse.json({created}, {status: 201})
        // } else {
        //     return NextResponse.json({error: 'Event is invalid'}, {status: 400})
        // }

    } catch (err) {
        alert('DB insert fail: '+err)
        return NextResponse.json({error: `❌ db insert fail`}, {status: 500 })
    }
}

