// lib/db.ts
import { PrismaClient } from '.prisma/client';
import { Answers } from '@/types/types';
import { pitScoutedTeam, pitScoutingTeam, matchScoutedTeam, matchScoutingTeam } from '@prisma/client';

const globalForPrisma = global as unknown as { db?: PrismaClient };

export const db = globalForPrisma.db || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db;

// get data from ALL pit scouting teams in the database
export async function getAllPitScoutingTeams(): Promise<pitScoutingTeam[]> {
    try {
        // Fetch all teams including their scoutedTeams relation
        const teams = await db.pitScoutingTeam.findMany({
            include: { scoutedTeams: true }
        });
        return teams;
    } catch (error) {
        console.error("Error fetching all teams", error);
        throw new Error("Unable to fetch teams");
    }
}

// get data from ALL match scouting teams in the database
export async function getAllMatchScoutingTeams(): Promise<matchScoutingTeam[]> {
  try {
    // Fetch all teams including their scoutedTeams relation
    const teams = await db.matchScoutingTeam.findMany({
      include: { scoutedTeams: true },
    });
    return teams;
  } catch (error) {
    console.error("Error fetching all teams", error);
    throw new Error("Unable to fetch teams");
  }
}

// Export a function to fetch a specific team's data from the database
export async function getTeamData(team: number, dataType: 'match' | 'pit'): Promise<pitScoutingTeam | matchScoutingTeam> {
    console.log('getTeamData running')
    let teamData = null
    // get different data based on the dataType -- either data from pit scouting or match scouting
    if (dataType == 'match') {
        teamData = await db.matchScoutingTeam.findUnique({
            where: { teamNumber: team },
            include: { scoutedTeams: true,
             },
        })
    } else if (dataType == 'pit') {
        teamData = await db.pitScoutingTeam.findUnique({
          where: { teamNumber: team },
          include: { scoutedTeams: true },
        });
    }
    // check to see if the passed team has data in the database
    if (teamData) {
        // if so, find that data
        console.log('getTeamData if running')
        return teamData;
    } else {
        // if not, create an entry for the passed team
        console.log('getTeamData else running')
        // change the type of the created data based on the dataTyoe
        if (dataType == 'match') {
            return await db.matchScoutingTeam.create({
                data: { 
                    teamNumber: team,
                }
            })
        } else {
            // this runs if dataType == 'pit'
            return await db.pitScoutingTeam.create({
              data: {
                teamNumber: team,
              },
            });
        }
    }
}

export async function submitPitDataToDatabase(
    yourTeamNumber: number,
    scoutedData: pitScoutedTeam,
) {
    let yourTeamsData = await getTeamData(yourTeamNumber, 'pit')
    console.log(typeof yourTeamsData)
    // Check if the team has already scouted the target team
    if (
        yourTeamsData?.pitScoutedTeams &&
        yourTeamsData.pitScoutedTeams.find(
            (team: pitScoutedTeam) => team.teamNumber === scoutedData.teamNumber
        )
    ) {
        // Team already scouted TODO: add more here
        console.log(`Team ${yourTeamNumber} has already scouted team ${scoutedData.teamNumber}`);
    } else {
        // Team not yet scouted
        console.log(`Team ${yourTeamNumber} has not scouted team ${scoutedData.teamNumber}`);
        await db.pitScoutedTeam.create({
            data: {
                teamNumber: scoutedData.teamNumber,
                scoutingTeamId: yourTeamsData.id,
                coralScoringId: scoutedData.coralScoringId,
                coralIntakeId: scoutedData.coralIntakeId,
                algaeScoringId: scoutedData.algaeScoringId,
                algaeIntakeId: scoutedData.algaeIntakeId,
                climb: scoutedData.climb,
                autoId: scoutedData.autoId,
                driverExpId: scoutedData.driverExpId
            },
        });
    }
}


    // Create an instance of coralScoring in the database (to later be linked to the scoutedTeam)
    // const coralScoring