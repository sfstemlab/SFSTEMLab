import TeamMatchScoutingArea from "@/components/teamMatchScoutingArea";

type fieldPlacement = 'r1' | 'r2' | 'r3' | 'b1' | 'b2' | 'b3';

type climb = 'none' | 'deep' | 'shallow'

type autoStart = 'left' | 'center' | 'right'

export type PitScoutedTeam = {
    teamNumber: number;
    event: string;
    coralScoring: {
        L1: boolean;
        L2: boolean;
        L3: boolean;
        L4: boolean;
    };
    coralIntake: {
        floor: boolean;
        source: boolean;
    };
    algaeScoring: {
        processor: boolean;
        net: boolean;
    };
    algaeIntake: {
        reef: boolean;
        floor: boolean;
        dealgifyOnly: boolean;
    };
    climb: climb;
    auto: {
        start: autoStart;
        L1?: number;
        L2?: number;
        L3?: number;
        L4?: number;
        processor?: number;
        net?: number;
    };
    driverExp: { comps?: number; years?: number };
};

export interface Answers {
    teamNumber: number;
    coralScoring?: {
        L1: boolean;
        L2: boolean;
        L3: boolean;
        L4: boolean;
    };
    coralIntake?: {
        floor: boolean;
        source: boolean;
    };
    algaeScoring?: {
        processor: boolean;
        net: boolean;
    };
    algaeIntake?: {
        reef: boolean;
        floor: boolean;
        dealgify: boolean;
    };
    climb?: climb;
    auto: {
        start: start;
        L1?: number;
        L2?: number;
        L3?: number;
        L4?: number;
        processor?: number;
        net?: number;
    };
    driverExp: {
        comps?: number;
        years: number;
    };
}

interface MatchResults {
    matchNumber: number | null;
    matchType: string;
    event: string;
    winner: string;
}

interface teamResults {
    id: number;
    teamNumber: number;
    fieldPlacement: fieldPlacement;
    event: string;
    scoutingTeamId: number;
    scoutingTeam: {
        id: number;
        teamNumber: number;
    };
    coralScoringId: number;
    coralScoring: {
        id: number;
        L1: number;
        L2: number;
        L3: number;
        L4: number;
    };
    coralIntakeId: number;
    coralIntake: {
        id: number;
        floor: boolean;
        source: boolean;
    };
    algaeScoringId: number;
    algaeScoring: {
        id: number;
        processor: number;
        net: number;
    };
    algaeIntakeId: number;
    algaeIntake: {
        id: number;
        floor: boolean;
        reef: boolean;
        dealgifyOnly: boolean;
    };
    climb: climb;
    climbTime: number;
    autoId: number;
    auto: {
        id: number;
        start: autoStart;
        move: boolean;
        L1: number;
        L2: number;
        L3: number;
        L4: number;
        processor: number;
        net: number;
    };
    driverExpId: number;
    driverExp: {
        id: number;
        defense: boolean;
        drivePrecision: number;
        driveSpeed: number;
        maneuvering: number;
        consistency: number;
        fouls: string[];
        defenseImpact: number;
        brickTime: number;
        comments: string;
    };
}

type GamePart = 'auto' | 'teleop' | 'endgame';

type GamePartKeys = {
    auto: keyof teamResults['auto'];
    teleop: keyof teamResults['teleop'];
    endgame: 'climb' | 'climbTime' | 'totalScore';
};

interface MatchScoutingButtonProps {
    buttonType?: 'number' | 'climb' | 'text';
    team: teamResults;
    setTeam:  React.Dispatch<React.SetStateAction<teamResults>>;
    content: string;
    attribute: keyof teamResults;
    subattribute?: 'L1' | 'L2' | 'L3' | 'L4' | 'floor' | 'source' | 'processor' | 'net' | 'reef' | 'dealgifyOnly' | 'start' | 'move' | 'defense' | 'driverPrecision' | 'driveSpeed' | 'maneuvering' | 'consistency' | 'fouls' | 'defenseImpact' | 'brickTime' | 'comments'
}
interface TeamMatchScoutingAreaProps {
    team: teamResults;
    setTeam: React.Dispatch<React.SetStateAction<teamResults>>;
}

interface MatchScoutingProps {
    match: MatchResults;
    setMatch: React.Dispatch<React.SetStateAction<MatchResults>>; // the function to change the matchResults vairalbe
    team: Team; // This should match the type of valid teams
}
