import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import MatchScoutingButton from './matchScoutingButton';

const TeamMatchScoutingArea: React.FC<any> = ({ match, setMatch, team }) => {
    return (
        <div>
            <Tabs defaultValue='auto' className=''>
                <TabsList className='w-[400px] justify-around'>                                    
                    <TabsTrigger value='auto'>Auto</TabsTrigger>
                    <TabsTrigger value='teleop'>Teleop</TabsTrigger>
                    <TabsTrigger value='endgame'>Endgame/Climb</TabsTrigger>
                </TabsList>
                <TabsContent value='auto'>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center items-center'>
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'L1'} gamePart={'auto'} />
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'L2'} gamePart={'auto'} />
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'L3'} gamePart={'auto'} />
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'L4'} gamePart={'auto'} />
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'Processor'} gamePart={'auto'} />
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'Barge'} gamePart={'auto'} />
                    </div>
                    {/* TODO: add checker for move */}
                </TabsContent>
                <TabsContent value='teleop'>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center items-center'>
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'L1'} gamePart={'teleop'} />
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'L2'} gamePart={'teleop'} />
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'L3'} gamePart={'teleop'} />
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'L4'} gamePart={'teleop'} />
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'Processor'} gamePart={'teleop'} />
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'Barge'} gamePart={'teleop'} />
                    </div>
                </TabsContent>
                <TabsContent value='endgame'>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center items-center'>
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'climb'} gamePart={'endgame'} />
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'climbTime'} gamePart={'endgame'} />
                        <MatchScoutingButton match={match} setMatch={setMatch} team={team} content={'totalScore'} gamePart={'endgame'} />
                    </div>
                    {/* TODO: Add checker for climb */}
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default TeamMatchScoutingArea