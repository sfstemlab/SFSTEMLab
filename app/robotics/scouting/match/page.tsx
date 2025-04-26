'use client'
import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeamMatchScoutingArea from '@/components/teamMatchScoutingArea';

const MatchScoutingPage = () => {
    const teams = useMemo<Team[]>(() => ["r1", "r2", "r3", "b1", "b2", "b3"], []);
    const [matchResults, setMatchResults] = useState<MatchResults>({
        matchNumber: null,
        matchType: "",
        event: "",
        r1: {
        name: "1",
        auto: {
            move: 0,
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            Processor: 0,
            Barge: 0,
            brickTime: 0,
            score: 0,
        },
        teleop: {
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            Processor: 0,
            Barge: 0,
            brickTime: 0,
            defense: false,
            score: 0,
        },
        climb: "none",
        climbTime: 0,
        totalScore: 0,
        },
        r2: {
        name: "2",
        auto: {
            move: 0,
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            Processor: 0,
            Barge: 0,
            brickTime: 0,
            score: 0,
        },
        teleop: {
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            Processor: 0,
            Barge: 0,
            brickTime: 0,
            defense: false,
            score: 0,
        },
        climb: "none",
        climbTime: 0,
        totalScore: 0,
        },
        r3: {
        name: "3",
        auto: {
            move: 0,
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            Processor: 0,
            Barge: 0,
            brickTime: 0,
            score: 0,
        },
        teleop: {
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            Processor: 0,
            Barge: 0,
            brickTime: 0,
            defense: false,
            score: 0,
        },
        climb: "none",
        climbTime: 0,
        totalScore: 0,
        },
        b1: {
        name: "4",
        auto: {
            move: 0,
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            Processor: 0,
            Barge: 0,
            brickTime: 0,
            score: 0,
        },
        teleop: {
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            Processor: 0,
            Barge: 0,
            brickTime: 0,
            defense: false,
            score: 0,
        },
        climb: "none",
        climbTime: 0,
        totalScore: 0,
        },
        b2: {
        name: "5",
        auto: {
            move: 0,
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            Processor: 0,
            Barge: 0,
            brickTime: 0,
            score: 0,
        },
        teleop: {
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            Processor: 0,
            Barge: 0,
            brickTime: 0,
            defense: false,
            score: 0,
        },
        climb: "none",
        climbTime: 0,
        totalScore: 0,
        },
        b3: {
        name: "6",
        auto: {
            move: 0,
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            Processor: 0,
            Barge: 0,
            brickTime: 0,
            score: 0,
        },
        teleop: {
            L1: 0,
            L2: 0,
            L3: 0,
            L4: 0,
            Processor: 0,
            Barge: 0,
            brickTime: 0,
            defense: false,
            score: 0,
        },
        climb: "none",
        climbTime: 0,
        totalScore: 0,
        },
        winner: "",
    }); // Initial values
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

    const calculateAutoScore = (team: teamResults) => {
        return (
        team.auto.move +
        team.auto.L1 +
        team.auto.L2 +
        team.auto.L3 +
        team.auto.L4 +
        team.auto.Processor +
        team.auto.Barge
        );
    }; // calculate the team's score in auto by adding all of the scoring methods together

    const calculateTeleopScore = (team: teamResults) => {
        return (
        team.teleop.L1 +
        team.teleop.L2 +
        team.teleop.L3 +
        team.teleop.L4 +
        team.teleop.Processor +
        team.teleop.Barge
        );
    };

    const calculateTotalScore = (team: teamResults) => {
        return team.auto.score + team.teleop.score + team.climb == "deep"
        ? 12
        : team.climb == "shallow"
        ? 6
        : team.climb == "park"
        ? 2
        : 0;
    }; // add auto score to teleop score and then subsequently check for each type of climb and add the appropriate amount of scores to come to the total score

    useEffect(() => {
        const updatedResults = { ...matchResults };
        let changed = false;

        teams.forEach((team) => {
            const teamData = updatedResults[team];

            const autoScore = calculateAutoScore(teamData);
            const teleopScore = calculateTeleopScore(teamData);
            const totalScore = calculateTotalScore(teamData);

            if (
                teamData.auto.score !== autoScore ||
                teamData.teleop.score !== teleopScore ||
                teamData.totalScore !== totalScore
            ) {
                teamData.auto.score = autoScore;
                teamData.teleop.score = teleopScore;
                teamData.totalScore = totalScore;
                changed = true;
            }
        });

        if (changed) {
            setMatchResults(updatedResults);
        }
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
                        type="number"
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
                        {(["r1", "r2", "r3", "b1", "b2", "b3"] as Team[]).map((team) => (
                        <h3
                            key={team}
                            className="py-1 rounded-md text-center text-xl bg-[#b1d5e6]/50 text-white hover:bg-[#b1d5e6]/65 transition duration-300 ease-in-out"
                        >
                            {matchResults[team].name}
                        </h3>
                        ))}
                        <h3 className="py-1 rounded-md text-center text-xl text-white w-[150px]">
                        Auto Score
                        </h3>

                        {(["r1", "r2", "r3"] as Team[]).map((team) => (
                        <h3
                            key={team}
                            className="py-1 rounded-md text-center text-xl bg-red-700/85 text-white hover:bg-red-600/90 transition duration-300 ease-in-out"
                        >
                            {matchResults[team].auto.score}
                        </h3>
                        ))}

                        {(["b1", "b2", "b3"] as Team[]).map((team) => (
                        <h3
                            key={team}
                            className="py-1 rounded-md text-center text-xl bg-blue-700/85 text-white hover:bg-blue-600/90 transition duration-300 ease-in-out"
                        >
                            {matchResults[team].auto.score}
                        </h3>
                        ))}

                        <h3 className="py-1 rounded-md text-center text-xl text-white w-[150px]">
                        Teleop Score
                        </h3>
                        {(["r1", "r2", "r3"] as Team[]).map((team) => (
                        <h3
                            key={team}
                            className="py-1  rounded-md text-center text-xl bg-red-700/85 text-white hover:bg-red-600/90 transition duration-300 ease-in-out"
                        >
                            {matchResults[team].teleop.score}
                        </h3>
                        ))}

                        {(["b1", "b2", "b3"] as Team[]).map((team) => (
                        <h3
                            key={team}
                            className="py-1  rounded-md text-center text-xl bg-blue-700/85 text-white hover:bg-blue-600/90 transition duration-300 ease-in-out"
                        >
                            {matchResults[team].teleop.score}
                        </h3>
                        ))}
                        <h3 className="py-1 rounded-md text-center text-xl text-white w-[150px]">
                        Climb
                        </h3>
                        {(["r1", "r2", "r3"] as Team[]).map((team) => (
                        <h3
                            key={team}
                            className="py-1  rounded-md text-center text-xl bg-red-700/85 text-white hover:bg-red-600/90 transition duration-300 ease-in-out"
                        >
                            {matchResults[team].climb == "deep"
                            ? 12
                            : matchResults[team].climb == "shallow"
                            ? 6
                            : matchResults[team].climb == "park"
                            ? 2
                            : 0}
                        </h3>
                        ))}

                        {(["b1", "b2", "b3"] as Team[]).map((team) => (
                        <h3
                            key={team}
                            className="py-1  rounded-md text-center text-xl bg-blue-700/85 text-white hover:bg-blue-600/90 transition duration-300 ease-in-out"
                        >
                            {matchResults[team].climb == "deep"
                            ? 12
                            : matchResults[team].climb == "shallow"
                            ? 6
                            : matchResults[team].climb == "park"
                            ? 2
                            : 0}
                        </h3>
                        ))}
                        <h3 className="py-1 rounded-md text-center text-xl text-white w-[150px]">
                        Team Total
                        </h3>
                        {(["r1", "r2", "r3"] as Team[]).map((team) => (
                        <h3
                            key={team}
                            className="py-1  rounded-md text-center text-xl bg-red-700/85 text-white hover:bg-red-600/90 transition duration-300 ease-in-out"
                        >
                            {matchResults[team].totalScore}
                        </h3>
                        ))}

                        {(["b1", "b2", "b3"] as Team[]).map((team) => (
                        <h3
                            key={team}
                            className="py-1  rounded-md text-center text-xl bg-blue-700/85 text-white hover:bg-blue-600/90 transition duration-300 ease-in-out"
                        >
                            {matchResults[team].totalScore}
                        </h3>
                        ))}
                    </div>
                    {/* Score table */}
                    <div className="flex space-x-2 items-center justify-center">
                        <h2 className="text-2xl font-bold text-white text-left pl-4 w-1/2 py-1 rounded-md bg-[#b1d5e6]/50 hover:bg-[#b1d5e6]/65 transition duration-300 ease-in-out">
                        WINNER: {matchResults.winner}
                        </h2>
                        {matchResults.r1.auto.Processor +
                        matchResults.r1.teleop.Processor +
                        matchResults.r2.auto.Processor +
                        matchResults.r2.teleop.Processor +
                        matchResults.r3.auto.Processor +
                        matchResults.r3.teleop.Processor >=
                        2 &&
                        matchResults.b1.auto.Processor +
                            matchResults.b1.teleop.Processor +
                            matchResults.b2.auto.Processor +
                            matchResults.b2.teleop.Processor +
                            matchResults.b3.auto.Processor +
                            matchResults.b3.teleop.Processor >=
                            2 && ( // If coopertition is acheived, show coopertition button
                            <h2 className="text-2xl font-bold text-black text-center w-1/5 py-1 px-2 rounded-md bg-yellow-400/75 hover:bg-yellow-400/85 transition duration-300 ease-in-out">
                            COOPERTITION
                            </h2>
                        )}
                    </div>
                </div>
                <div className="mt-2">
                <Tabs defaultValue="r1" className="">
                    <TabsList className="w-[500px] justify-around">
                    {(["r1", "r2", "r3", "b1", "b2", "b3"] as Team[]).map((team) => (
                        <TabsTrigger key={team} value={team}>
                        {matchResults[team].name}
                        </TabsTrigger>
                    ))}
                    </TabsList>
                    {(["r1", "r2", "r3", "b1", "b2", "b3"] as Team[]).map((team) => (
                    <TabsContent key={team} value={team}>
                        <TeamMatchScoutingArea match={matchResults} setMatch={setMatchResults} team={team} />
                    </TabsContent>
                    ))}
                </Tabs>
                </div>
            </div>
        </div>
    );
};

export default MatchScoutingPage;
