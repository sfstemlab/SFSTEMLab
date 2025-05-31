

"use client";
import Navbar from "@/components/navbar";
import PitScoutingButton from "@/components/pitScoutingButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { submitPitDataToDatabase } from "@/lib/db";
import { Answers, PitScoutedTeam } from "@/types/types";
import React, { useState } from "react";





const PitScoutingPage = () => {
    const [yourTeamNumber, setYourTeamNumber] = useState<number>(0);
    const [data, setData] = useState<PitScoutedTeam[]>([]);
    const [liveAnswers, setLiveAnswers] = useState<PitScoutedTeam>({
        teamNumber: 1234,
        event: 'casf',
        coralScoring: { L1: false, L2: false, L3: false, L4: false },
        coralIntake: { floor: false, source: false },
        algaeScoring: { processor: false, net: false },
        algaeIntake: { reef: false, floor: false, dealgifyOnly: false },
        climb: 'none',
        auto: {start: 'center'},
        driverExp: { comps: 0, years: 0}
    });
    const [draftAnswers, setDraftAnswers] = useState<PitScoutedTeam>(
        structuredClone(liveAnswers)
    );

    const handleInputChange = (field: keyof PitScoutedTeam, value: any, subfield?:'start' | 'L1' | 'L2' | 'L3' | 'L4' | 'processor' | 'net' | 'comps' | 'years') => {
        setDraftAnswers((prev) => {
            if (subfield && typeof prev[field] === "object" && prev[field] !== null) {
                return {
                    ...prev,
                    [field]: {
                        ...(prev[field] as any),
                        [subfield]: value,
                    },
                };
            } else {
                return {
                    ...prev,
                    [field]: value,
                };
            }
        });
    };

    const handleMultiSelectChange = (
        section: keyof Answers,
        keys: string[],
        checked: boolean
    ) => {
        /*
        Example:
            section: scoreCoral
            keys: L4
            checked: true

            This will set the scoreCoral[L4] for the team to true
        */
        setDraftAnswers(prev => {
            const updated: Record<string, boolean> = {}; 
            keys.forEach(key => {
                updated[key] = checked;
            })
            return { ...prev, [section]: updated }
        })
        // console.log('handling nested checkbox')
        // console.log(`section: ${section}, key: ${keys}, checked: ${checked}`)
        // keys.forEach((key: string) => {
        //     setDraftAnswers((prev) => ({
        //         ...prev,
        //         [section]: {
        //             ...(prev[section] as Record<string, boolean> | {}),
        //             [key]: checked,
        //         },
        //     }));
        // })
    };
    // Submits the data collected in the scouting questions to the table and to the database
    const submitData = async () => {
        // Don't mess with this if possible
        setData((prevData) => {
            const key = Number(draftAnswers.teamNumber)
            console.log(key, typeof key)
            const next = prevData.filter((t) => Number(t.teamNumber) !== key); 
            next.push(structuredClone(draftAnswers))
            return next;
        });
        
        setLiveAnswers(structuredClone(draftAnswers));

        // await submitPitDataToDatabase(yourTeamNumber, structuredClone(draftAnswers));

    };

    const getTrueKeys = (team: PitScoutedTeam, attribute: keyof Answers) => {
        const attr = team[attribute];
        if (typeof attr === "object" && attr !== null) {
            return Object.entries(attr)
                .filter(([_, value]) => value === true)
                .map(([key]) => key);
            }
        return [];
    };

    const formulateAutoDesc = (
    //   autoStart: Answers["autoStart"],
    //   autoL1: Answers["autoL1"],
    //   autoL2: Answers["autoL2"],
    //   autoL3: Answers["autoL3"],
    //   autoL4: Answers["autoL4"],
    //   autoProcessor: Answers['autoProcessor'],
    //   autoNet: Answers['autoNet'],
    auto: Answers["auto"]
    ) => {
        if (auto){
            let autoDesc = `Start ${auto.start}`;
            if (auto.L1) autoDesc += `, score ${auto.L1} coral on L1`;
            if (auto.L2) autoDesc += `, score ${auto.L2} coral on L2`;
            if (auto.L3) autoDesc += `, score ${auto.L3} coral on L3`;
            if (auto.L4) autoDesc += `, score ${auto.L4} coral on L4`;
            if (auto.processor) autoDesc += `, ${auto.processor} algae in processor`;
            if (auto.net) autoDesc += `, ${auto.net} algae in net`;
            return autoDesc;
        } else {
            return 'No auto'
        }
    };

    return (
      <div className="bg-[#1e439d] w-screen h-full flex flex-col items-center">
        <Navbar />
        <div className="py-4 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-center w-full text-3xl font-bold text-white underline">
            Pit Scouting for FRC
          </h1>

          <div className="flex flex-col space-y-4 justify-center mt-4 items-center">
            <input
              className="my-4 placeholder-white text-white rounded-md py-2 px-4 w-72 border-2 border-brand bg-brand/50 hover:bg-[#8db5e3]/90 transition duration-70 ease-in-out"
              type="number"
              placeholder="Your Team Number"
              onChange={(e) => setYourTeamNumber(Number(e.target.value))}
            />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team</TableHead>
                  <TableHead>Score Coral</TableHead>
                  <TableHead>Coral Intake</TableHead>
                  <TableHead>Score Algae</TableHead>
                  <TableHead>Algae Intake</TableHead>
                  <TableHead>Climb</TableHead>
                  <TableHead>Auto</TableHead>
                  <TableHead>Experience</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((team) => (
                  <TableRow key={team.teamNumber}>
                    <TableCell>{team.teamNumber}</TableCell>
                    <TableCell>
                      {getTrueKeys(team, "coralScoring").join(",  HeLLO")}
                    </TableCell>
                    <TableCell>
                      {getTrueKeys(team, "coralIntake").join(", HELLO")}
                    </TableCell>
                    <TableCell>
                      {getTrueKeys(team, "algaeScoring").join(", HELLO")}
                    </TableCell>
                    <TableCell>
                      {getTrueKeys(team, "algaeIntake").join(", HELLO")}
                    </TableCell>
                    <TableCell>{team.climb || "none"}</TableCell>
                    <TableCell>
                      {team.auto && formulateAutoDesc(team.auto)}
                    </TableCell>
                    <TableCell>
                      {team.driverExp.comps ?? 0} comps,{" "}
                      {team.driverExp.years ?? 0} yrs
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <h3 className="mt-4 text-2xl text-white font-semibold text-center">
              Pit Scouting Questions
            </h3>

            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <PitScoutingButton
                content="Team Number"
                inputType="number"
                onChange={(e: { target: { value: any } }) =>
                  handleInputChange("teamNumber", Number(e.target.value))
                }
              />
              <PitScoutingButton
                content="Score Coral"
                inputType="multi-select"
                options={["L1", "L2", "L3", "L4"]}
                onChange={(value: string) =>
                  handleMultiSelectChange("coralScoring", [value], true)
                }
              />
              <PitScoutingButton
                content="Intake Coral"
                inputType="multi-select"
                options={["floor", "source"]}
                onChange={(value: string) =>
                  handleMultiSelectChange("coralIntake", [value], true)
                }
              />
              <PitScoutingButton
                content="Score Algae"
                inputType="multi-select"
                options={["processor", "net"]}
                onChange={(value: string) =>
                  handleMultiSelectChange("algaeScoring", [value], true)
                }
              />
              <PitScoutingButton
                content="Intake Algae"
                inputType="multi-select"
                options={["reef", "floor", "dealgify"]}
                onChange={(value: string) => {
                  console.log(typeof value);
                  console.log(value);
                  handleMultiSelectChange("algaeIntake", [value], true);
                }}
              />
              <PitScoutingButton
                content="Climb"
                inputType="select"
                options={["none", "shallow", "deep"]}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleInputChange(
                    "climb",
                    e.target.value as Answers["climb"]
                  );
                }}
              />
              <PitScoutingButton
                content="Auto Start"
                inputType="select"
                options={["left", "center", "right"]}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleInputChange("auto", e.target.value, "start");
                }}
              />
              <PitScoutingButton
                content="Auto L1"
                inputType="number"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleInputChange("auto", Number(e.target.value), "L1");
                }}
              />
              <PitScoutingButton
                content="Auto L2"
                inputType="number"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleInputChange("auto", Number(e.target.value), "L2");
                }}
              />
              <PitScoutingButton
                content="Auto L3"
                inputType="number"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleInputChange("auto", Number(e.target.value), "L3");
                }}
              />
              <PitScoutingButton
                content="Auto L4"
                inputType="number"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleInputChange("auto", Number(e.target.value), "L4");
                }}
              />
              <PitScoutingButton
                content="Auto Processor"
                inputType="number"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleInputChange(
                    "auto",
                    Number(e.target.value),
                    "processor"
                  );
                }}
              />
              <PitScoutingButton
                content="Auto Net"
                inputType="number"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleInputChange("auto", Number(e.target.value), "net");
                }}
              />
              <PitScoutingButton
                content="Driver Experience (Comps)"
                inputType="number"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleInputChange(
                    "driverExp",
                    Number(e.target.value),
                    "comps"
                  )
                }
              />
              <PitScoutingButton
                content="Driver Experience (Years)"
                inputType="number"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleInputChange(
                    "driverExp",
                    Number(e.target.value),
                    "years"
                  )
                }
              />
            </div>

            <button
              className="p-2 text-center bg-redBrand/75 rounded-md w-full hover:bg-redBrand/90 transition duration-500 ease-in-out text-white font-semibold"
              onClick={submitData}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
};

export default PitScoutingPage;
