interface MatchResults extends Record<Team, teamResults> {
  matchNumber: number | null;
  matchType: string;
  event: string;
  winner: string;
}

interface teamResults {
  name: string;
  auto: {
    move: number; // move is a number so that it is easy to add together with other things when calculating score (and so that I don't have to know how many points it is)
    L1: number;
    L2: number;
    L3: number;
    L4: number;
    Processor: number;
    Barge: number;
    brickTime: number;
    score: number;
  };
  teleop: {
    L1: number;
    L2: number;
    L3: number;
    L4: number;
    Processor: number;
    Barge: number;
    brickTime: number;
    defense: boolean;
    score: number;
  };
  climb: "shallow" | "deep" | "park" | "none";
  climbTime: number;
  totalScore: number;
}

type Team = "r1" | "r2" | "r3" | "b1" | "b2" | "b3";

type GamePart = "auto" | "teleop" | "endgame";

type GamePartKeys = {
  auto: keyof teamResults["auto"];
  teleop: keyof teamResults["teleop"];
  endgame: "climb" | "climbTime" | "totalScore";
};

interface MatchScoutingButtonProps<T extends GamePart> {
  match: MatchResults;
  setMatch: React.Dispatch<React.SetStateAction<MatchResults>>; // the function to change the matchResults vairalbe
  team: Team;
  content: GamePartKeys[T];
  gamePart: T;
}

interface MatchScoutingProps {
  match: MatchResults;
  setMatch: React.Dispatch<React.SetStateAction<MatchResults>>; // the function to change the matchResults vairalbe
  team: Team; // This should match the type of valid teams
}