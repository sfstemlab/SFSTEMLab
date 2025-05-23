import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import MatchScoutingButton from './matchScoutingButton';
import { TeamMatchScoutingAreaProps, teamResults } from '@/types/types';

const TeamMatchScoutingArea = ({team, setTeam}: TeamMatchScoutingAreaProps) => {
    return (
        <div>
            <Tabs defaultValue="auto" className="">
                <TabsList className="w-[400px] justify-around bg-brand">
                    <TabsTrigger value="auto">Auto</TabsTrigger>
                    <TabsTrigger value="teleop">Teleop</TabsTrigger>
                    <TabsTrigger value="endgame">Endgame/Climb</TabsTrigger>
                </TabsList>
                <TabsContent value="auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center items-center">
                        <MatchScoutingButton team={team} setTeam={setTeam} content={'L1'} attribute='auto' subattribute='L1'/>
                        <MatchScoutingButton team={team} setTeam={setTeam} content={'L2'} attribute='auto' subattribute='L2' />
                        <MatchScoutingButton team={team} setTeam={setTeam} content={'L3'} attribute='auto' subattribute='L3' />
                        <MatchScoutingButton team={team} setTeam={setTeam} content={'L4'} attribute='auto' subattribute='L4' />
                        <MatchScoutingButton team={team} setTeam={setTeam} content={'Processor'} attribute='auto' subattribute='processor' />
                        <MatchScoutingButton team={team} setTeam={setTeam} content={'Net'} attribute='auto' subattribute='net' />
                    </div>
                    {/* TODO: add checker for move */}
                </TabsContent>
                <TabsContent value="teleop">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center items-center">
                        <MatchScoutingButton team={team} setTeam={setTeam} content='L1' attribute='coralScoring' subattribute='L1' />
                        <MatchScoutingButton team={team} setTeam={setTeam} content='L2' attribute='coralScoring' subattribute='L2' />
                        <MatchScoutingButton team={team} setTeam={setTeam} content='L3' attribute='coralScoring' subattribute='L3' />
                        <MatchScoutingButton team={team} setTeam={setTeam} content='L4' attribute='coralScoring' subattribute='L4' />
                        <MatchScoutingButton team={team} setTeam={setTeam} content={'Processor'} attribute='algaeScoring' subattribute='processor' />
                        <MatchScoutingButton team={team} setTeam={setTeam} content={'Net'} attribute='algaeScoring' subattribute='net' />
                    </div>
                </TabsContent>
                <TabsContent value="endgame">
                    <div className="flex space-x-3 justify-center items-center">
                        <MatchScoutingButton team={team} setTeam={setTeam} content={'Climb'} attribute='climb' buttonType='climb' />
                        <MatchScoutingButton team={team} setTeam={setTeam} content={'Climb Time'} attribute='climbTime' />
                    </div>
                    {/* TODO: Add checker for climb */}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default TeamMatchScoutingArea