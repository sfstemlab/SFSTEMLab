import {  PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    
    // clerk user 
    const User = await db.user.upsert({
        where: {
            email: 'test@test.test',
        },
        update: {},
        create: {
            email: 'test@test.test',
            name: 'test name',
            clerkId: 'user_33RZjAOGNnifz2v1TPrge1IxvSL'
            
        }
    })

    const Event = await db.event.create({
        data: {
            title: "STEM Workshop #1", 
            desc: "Learn about CAD & CNC machining in this hands on workshop", 
            tags: ["CNC", "CAD", "CAM"],
            difficulty: 3, 
            materials: ["Water Bottle"], 
            ageGroup: "14-18", 
            startTime: 14, 
            endTime: 16, 
            day: 23, 
            month: "Nov", 
            year: 2025, 
            date: new Date()
        }
    })
    
    const EventSignup = await db.eventSignup.create({
        data: {
            userId: User.id,
            eventId: Event.id,
            email: User.email,
            firstName: 'August',
            lastName: "White",
            pronouns: 'he/him',
            accessSource: 'the world wide web',
            reasonForAttending: 'world domination',
            school: 'SOTA',
            grade: 10
        }
    })


    const TeamMember = await db.teamMember.create({
        data: {
            name: 'August White',
            picture: '@/../images/AugustBioPhoto.png',
            bio: "Hi! I'm a 15-year-old high school student and lover of all things STEAM. WhenI can, I love to read, draw, and code websites, as well as play Dungeons and Dragons and other role-playing games with my friends. I'm excited to continue bringing STEM education to new places, and teaching the younger generation more about the wonders of computers and machines.",
            titles: ['Software Development Lead - SOTA Cyberdragons'],
            email: 'august@team5700.org',
        }
    })

    const Timeslot = await db.timeslot.create({
        data: {
            userId: User.id,
            teamNum: 4159,
            contactEmail: 'coach@lowellhs.edu',
            contactPerson: 'Coach Doe',
            purpose: 'make cool stickers',
            approved: true,
            startTime: 12,
            endTime: 14,
            date: new Date("2025-02-21T12:00:00.000Z")
        }
    })

    console.table({
        user: User.email, 
        event: Event.title, 
        signup: EventSignup.firstName,
        teamMember: TeamMember.name,
        timeslot: Timeslot.teamNum
    })
    
    
    console.log("Seed data has been inserted successfully.");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
    process.exit(0); 
  });