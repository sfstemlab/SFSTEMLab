import { GamePart, MatchScoutingButtonProps, teamResults } from "@/types/types";
import React from "react";

const MatchScoutingButton = <T extends GamePart>({match, setMatch, team, content, gamePart}: any) => {
    const changeTeamAttribute = (
        attribute:
            | keyof teamResults["auto"]
            | keyof teamResults["teleop"]
            | "climb"
            | "climbTime"
            | "totalScore",
        change: -1 | 1
    ) => {
        console.log(`changing attribute ${attribute} by ${change}`)
        const teamData = match[team];
        const part = teamData[gamePart as keyof teamResults];

        if (typeof part !== "object") return;

        const currentVal = (part as any)[attribute];

        if (typeof currentVal === "number") {
            (match[team] as any)[gamePart] = {
            ...part,
            [attribute]: currentVal + change,
            };
            console.log((match[team] as any)[gamePart]);
        }
    };

    return (
        <div className="rounded-md bg-[#b1d5e6]/50 px-2 py-3 ">
            <h3>{content}</h3>
            <div className="space-y-2">
                <button
                className="bg-[#b1d5e6]/75 rounded-md w-full hover:bg-[#b1d5e6]/85 transition duration-500 ease-in-out"
                onClick={() => changeTeamAttribute(content, -1)}
                >
                -
                </button>
                <button
                className="bg-[#b1d5e6]/75 rounded-md w-full hover:bg-[#b1d5e6]/90 transition duration-500 ease-in-out"
                onClick={() => changeTeamAttribute(content, 1)}
                >
                +
                </button>
            </div>
        </div>
    );
};

export default MatchScoutingButton;
