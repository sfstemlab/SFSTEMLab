'use client'
import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeamMatchScoutingArea from '@/components/teamMatchScoutingArea';
import { climbEnum, matchScoutedTeam, matchScoutingTeam, coralScoringMatch , coralIntakeMatch, algaeScoringMatch, algaeIntakeMatch, auto, driverExpMatch} from '@prisma/client';
import { MatchResults } from '@/types/types';
import { cn } from '@/lib/utils';

const MatchScoutingPage = () => {

    // Default values
    const createDefaultTeam = () => ({
        id: 0,
        teamNumber: 0,
        fieldPlacement: "r1",
        event: '',
        scoutingTeamId: 0,
        scoutingTeam: {
            id: 0,
            teamNumber: 0,
        },
        coralScoringId: 0,
        coralScoring: {
            id: 0,
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
        },
        coralIntakeId: 0,
        coralIntake: {
            id: 0,
            floor: false,
            source: false,
        },
        algaeScoringId: 0,
        algaeScoring: {
            id: 0,
            processor: 0,
            net: 0,
        },
        algaeIntakeId: 0,
        algaeIntake: {
            id: 0,
            floor: false,
            reef: false,
            dealgifyOnly: false,
        },
        climb: "none",
        autoId: 0,
        auto: {
            id: 0,
            start: 'center',
            move: false,
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            processor: 0,
            net: 0,
        },
        driverExpId: 0,
        driverExp: {
            id: 0,
            defense: false,
            drivePrecision: 0,
            driveSpeed: 0,
            maneuvering: 0,
            consistency: 0,
            fouls: [''],
            defenseImpact: 0,
            brickTime: 0.0,
            comments: "",
        },
    });

    const teams = Array(6)
      .fill(null)
      .map(() => createDefaultTeam());

        // copy that data to create the list of all teams
    
    const [matchResults, setMatchResults] = useState<MatchResults>({
        matchNumber: null,
        matchType: "",
        event: "",
        winner: "",
    });
    const [yourTeamNumber, setYourTeamNumber] = useState<number>(0);

    const handleInputChange = (
        key: "matchType" | "matchNumber" | "event",
        value: string
    ) => {
        setMatchResults((prev) => ({
        ...prev,
        [key]: key === "matchNumber" ? Number(value) : value,
        }));
    };

    const calculateAutoScore = (team: any):number => {
        return (
        team.autoMatch?.move? 2 : 0 +
        team.auto.L1 * 3 +
        team.auto.L2 * 4 +
        team.auto.L3 * 6 +
        team.auto.L4 * 7 +
        team.auto.processo * 6 +
        team.auto.barge * 4
        );
    }; // calculate the team's score in auto by adding all of the scoring methods together

    const calculateTeleopScore = (team: any):number => {
        return (
        team.coralScoring.L1 +
        team.coralScoring.L2 +
        team.coralScoring.L3 +
        team.coralScoring.L4 +
        team.algaeScoring.Processor +
        team.algaeScoring.Barge
        );
    };

    const calculateEndgameScore = (team: any):number => {
        if (team.climb == 'deep') {
            return 12
        } else if (team.climb == 'shallow') {
            return 6
        } else {
            // runs if climb == 'none'
            return 0
        }
    }

    const calculateTotalScore = (team: any) => {
        return calculateAutoScore(team) + calculateTeleopScore(team) + calculateEndgameScore(team)
    };

    const isThereCoopertition = (teams: any[]):boolean => {
        const redAlliance = teams.filter(team => team.fieldPlacement.includes('r'))
        const blueAlliance = teams.filter(team => team.fieldPlacement.includes('b'))

        let redAllianceProcessor = 0
        redAlliance.forEach((team: any) => {
            redAllianceProcessor += team.algaeScoring.processor
        })

        let blueAllianceProcessor = 0;
        blueAlliance.forEach((team: any) => {
          blueAllianceProcessor += team.algaeScoring.processor;
        });

        if (blueAllianceProcessor >= 2 && redAllianceProcessor >= 2) {
            return true}
        else return false
    } // replace this logic with new logic to find if coopertation was acheived every year

    useEffect(() => {
        const updatedResults = { ...matchResults };
        // let changed = false;

        teams.forEach((team) => {
            const autoScore = calculateAutoScore(team);
            const teleopScore = calculateTeleopScore(team);
            const totalScore = calculateTotalScore(team);

            // if (
            //     teamData.auto.score !== autoScore ||
            //     teamData.teleop.score !== teleopScore ||
            //     teamData.totalScore !== totalScore
            // ) {
            //     teamData.auto.score = autoScore;
            //     teamData.teleop.score = teleopScore;
            //     teamData.totalScore = totalScore;
            //     changed = true;
            // } TODO: make a version of this using the models from the database

        });
        setMatchResults(updatedResults);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(matchResults)]); // Only rerun when actual content of matchResults changes

    return (
      <div className="bg-[#1e439d] w-screen h-full flex flex-col items-center">
        <Navbar />
        <div className="p-4 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-center w-full text-3xl font-bold text-white underline">
            Match Scouting for FRC
          </h1>
          <div className="flex space-x-4 justify-center mt-4 px-4 items-center">
            <input
              className="my-4 placeholder-white text-white rounded-md py-2 px-4 w-64 border-2 border-[#b1d5e6] bg-[#b1d5e6]/50 hover:bg-[#8db5e3]/90 transition duration-700 ease-in-out"
              type="number"
              placeholder="   Your Team Number"
              onChange={(e) => {
                setYourTeamNumber(Number(e.target.value));
              }}
            />
            <input
              className="my-4 placeholder-white text-white rounded-md py-2 px-4 w-64 border-2 border-[#b1d5e6] bg-[#b1d5e6]/50 hover:bg-[#8db5e3]/90 transition duration-700 ease-in-out"
              type="text"
              placeholder="   Match Type"
              onChange={(e) => handleInputChange("matchType", e.target.value)}
            />
            <input
              className="my-4 placeholder-white text-white rounded-md py-2 px-4 w-64 border-2 border-[#b1d5e6] bg-[#b1d5e6]/50 hover:bg-[#8db5e3]/90 transition duration-700 ease-in-out"
              type="number"
              placeholder="   Match Number"
              onChange={(e) => handleInputChange("matchNumber", e.target.value)}
            />
            <input
              className="my-4 placeholder-white text-white rounded-md py-2 px-4 w-64 border-2 border-[#b1d5e6] bg-[#b1d5e6]/50 hover:bg-[#8db5e3]/90 transition duration-700 ease-in-out"
              type="text"
              placeholder="   Event"
              onChange={(e) => handleInputChange("event", e.target.value)}
            />
          </div>
          <h2 className="text-2xl text-center text-white font-bold">Scores</h2>
          <div className="mt-2">
            {/* Scores section */}
            <div className="grid grid-cols-7 gap-2 mr-4 justify-center mb-4">
              {/* Table Headers */}
              <h3 className="py-1 rounded-md text-center text-xl text-white w-[150px]">
                Team Name
              </h3>
              {teams.map((team) => (
                <h3
                  key={team.id}
                  className="py-1 rounded-md text-center text-xl bg-[#b1d5e6]/50 text-white hover:bg-[#b1d5e6]/65 transition duration-300 ease-in-out"
                >
                  {team.teamNumber}
                </h3>
              ))}
              <h3 className="py-1 rounded-md text-center text-xl text-white w-[150px]">
                Auto Score
              </h3>
              {/* map over teams and give them blue or red bgs based on alliance */}
              {teams.map((team) => (
                <h3
                  key={team.id}
                  className={cn(
                    "py-1 rounded-md text-center text-xl  text-white transition duration-300 ease-in-out",
                    team.fieldPlacement.includes("r")
                      ? "bg-red-700/85 hover:bg-red-600/90"
                      : "bg-blue-700/85 hover:bg-blue-600/90"
                  )}
                >
                  {calculateAutoScore(team)}
                </h3>
              ))}

              <h3 className="py-1 rounded-md text-center text-xl text-white w-[150px]">
                Teleop Score
              </h3>
              {teams.map((team) => (
                <h3
                  key={team.id}
                  className={cn(
                    "py-1 rounded-md text-center text-xl  text-white transition duration-300 ease-in-out",
                    team.fieldPlacement.includes("r")
                      ? "bg-red-700/85 hover:bg-red-600/90"
                      : "bg-blue-700/85 hover:bg-blue-600/90"
                  )}
                >
                  {calculateTeleopScore(team)}
                </h3>
              ))}
              <h3 className="py-1 rounded-md text-center text-xl text-white w-[150px]">
                Climb
              </h3>
              {teams.map((team) => (
                <h3
                  key={team.id}
                  className={cn(
                    "py-1 rounded-md text-center text-xl  text-white transition duration-300 ease-in-out",
                    team.fieldPlacement.includes("r")
                      ? "bg-red-700/85 hover:bg-red-600/90"
                      : "bg-blue-700/85 hover:bg-blue-600/90"
                  )}
                >
                  {calculateEndgameScore(team)}
                </h3>
              ))}
              <h3 className="py-1 rounded-md text-center text-xl text-white w-[150px]">
                Team Total
              </h3>
              {teams.map((team) => (
                <h3
                  key={team.id}
                  className={cn(
                    "py-1 rounded-md text-center text-xl  text-white transition duration-300 ease-in-out",
                    team.fieldPlacement.includes("r")
                      ? "bg-red-700/85 hover:bg-red-600/90"
                      : "bg-blue-700/85 hover:bg-blue-600/90"
                  )}
                >
                  {calculateTotalScore(team)}
                </h3>
              ))}
            </div>
            {/* Score table */}
            <div className="flex space-x-2 items-center justify-center">
              <h2 className="text-2xl font-bold text-white text-left pl-4 w-1/2 py-1 rounded-md bg-[#b1d5e6]/50 hover:bg-[#b1d5e6]/65 transition duration-300 ease-in-out">
                WINNER: {matchResults.winner}
              </h2>
              {isThereCoopertition(teams) && ( // If coopertition is acheived, show coopertition button
                  <h2 className="text-2xl font-bold text-black text-center w-1/5 py-1 px-2 rounded-md bg-yellow-400/75 hover:bg-yellow-400/85 transition duration-300 ease-in-out">
                    COOPERTITION
                  </h2>
                )}
            </div>
          </div>
          <div className="mt-2">
            <Tabs defaultValue="r1" className="">
              <TabsList className="w-[500px] justify-around">
                {teams.map(
                  (team) => (
                    <TabsTrigger key={team.id} value={String(team.id)}>
                      {team.teamNumber}
                    </TabsTrigger>
                  )
                )}
              </TabsList>
              {teams.map((team) => (
                <TabsContent key={team.id} value={String(team.id)}>
                  <TeamMatchScoutingArea
                    match={matchResults}
                    setMatch={setMatchResults}
                    team={team}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    );
};

export default MatchScoutingPage;
