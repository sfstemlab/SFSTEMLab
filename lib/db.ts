// lib/db.ts
import { PrismaClient } from '.prisma/client';
import { scoutedTeam, scoutingTeam } from '@prisma/client';

const globalForPrisma = global as unknown as { db?: PrismaClient };

export const db = globalForPrisma.db || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db;

// Export a function to get data from ALL teams in the database
export async function getAllTeams(): Promise<scoutingTeam[]> {
    try {
        // Fetch all teams including their scoutedTeams relation
        const teams = await db.scoutingTeam.findMany({
            include: { scoutedTeams: true }
        });
        return teams;
    } catch (error) {
        console.error("Error fetching all teams", error);
        throw new Error("Unable to fetch teams");
    }
}

// Export a function to fetch a specific team's data from the database
export async function getTeamData(team: number): Promise<scoutingTeam | null> {
    return db.scoutingTeam.findUnique({
        where: { teamNumber: team },
        include: { scoutedTeams: true }, // Ensuring scoutedTeams are included in the result
    });
}

export async function submitDataToDatabase(
    yourTeamNumber: number,
    scoutedData: scoutedTeam
) {
    let yourTeamsData = await getTeamData(yourTeamNumber);

    // If no data for the team, create a new scoutingTeam entry
    if (!yourTeamsData) {
        await db.scoutingTeam.create({
            data: { teamNumber: yourTeamNumber },
        });
        // Re-fetch to get the scoutedTeams relation included
        yourTeamsData = await getTeamData(yourTeamNumber);
    }

    // Check if the team has already scouted the target team
    if (
        yourTeamsData?.scoutedTeams &&
        yourTeamsData.scoutedTeams.find(
            (team) => team.teamNumber === scoutedData.teamNumber
        )
    ) {
        // Team already scouted — handle accordingly
        console.log(`Team ${yourTeamNumber} has already scouted team ${scoutedData.teamNumber}`);
    } else {
        // Team not yet scouted — proceed with necessary actions
        console.log(`Team ${yourTeamNumber} has not scouted team ${scoutedData.teamNumber}`);
        // Here, you can insert logic for adding the scouted team if needed
        await db.scoutedTeam.create({
            data: {
                teamNumber: scoutedData.teamNumber,
                scoutingTeamId: yourTeamsData.id,
                // Other necessary fields from scoutedData
                coralScoringId: scoutedData.coralScoringId,
                coralIntakeId: scoutedData.coralIntakeId,
                algaeScoringId: scoutedData.algaeScoringId,
                algaeIntakeId: scoutedData.algaeIntakeId,
                climb: scoutedData.climb,
                autoId: scoutedData.autoId,
                driverExpComps: scoutedData.driverExpComps,
                driverExpYears: scoutedData.driverExpYears,
            },
        });
    }
}


    // Create an instance of coralScoring in the database (to later be linked to the scoutedTeam)
    // const coralScoring