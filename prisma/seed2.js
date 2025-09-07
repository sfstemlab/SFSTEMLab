import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
// teamData.team5700
async function main() {

    const eventSignup = await db.eventSignup.create({
        data: {
            event: 'TEST EVENT',
            firstName: 'TEST FIRST NAME',
            lastName: "TEST LAST NAME",
            pronouns: 'TEST PRONOUNS',
            accessSource: 'TEST ACCESS SOURCE',
            reasonForAttending: 'TEST REASON',
            school: 'TEST SCHOOL',
            grade: 'TEST GRADE'
        }
    })

    const Person = await db.Person.create({
        data: {
            name: 'TEST NAME',
            picture: 'TEST PICTURE',
            bio: 'TEST BIO',
            titles: ['TEST', 'TITLES'],
            email: 'TEST EMAIL',
        }
    })

    console.log("Seed Record: ", eventSignup, Person)
    // let scouting5700 = await db.scoutingTeam.findUnique({
    //     where: { teamNumber: 5700 }
    // })

    // if (!scouting5700) {
    //     scouting5700 = await db.scoutingTeam.create({
    //         data: { teamNumber: 5700 }
    //     })
    // }

    // // perf. detail records for scouted team 1323
    // const coralScoring = await db.coralScoring.create({
    //     data: {
    //         L1: true, 
    //         L2: true, 
    //         L3: true,
    //         L4: true
    //     }
    // })
    
    // const coralIntake = await db.coralIntake.create({
    //     data: {
    //         floor: true,
    //         source: true
    //     }
    // })

    // const algaeScoring = await db.algaeScoring.create({
    //     data: {
    //         processor: true,
    //         net: true
    //     }
    // })

    // const algaeIntake = await db.algaeIntake.create({
    //     data: {
    //         reef: true,
    //         floor: true,
    //         dealgify: true
    //     }
    // })

    // const auto = await db.auto.create({
    //     data: {
    //         start: 'center',
    //         L1: 5,
    //         L2: 0,
    //         L3: 0,
    //         L4: 0,
    //         processor: 0,
    //         net: 0
    //     }
    // })


    // // create scouted team (1323) with all our models linked
    // await db.scoutedTeam.create({
    //     data: {
    //         teamNumber: 1323, 
    //         scoutingTeamId: scouting5700.id,
    //         coralScoringId: coralScoring.id,
    //         coralIntakeId: coralIntake.id,
    //         algaeScoringId: algaeScoring.id,
    //         algaeIntakeId: algaeIntake.id,
    //         climb: 'deep',
    //         autoId: auto.id,
    //         driverExpComps: 12,
    //         driverExpYears: 5
    //     }
    // })
    
    
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