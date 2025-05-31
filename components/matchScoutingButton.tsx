'use client';

import { MatchScoutingButtonProps } from '@/types/types';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const MatchScoutingButton = ({
    team,
    setTeam,
    buttonType = 'number',
    content,
    attribute,
    subattribute,
}: MatchScoutingButtonProps) => {
    // console.log(attribute, subattribute)
    let currentVal = null
    if (buttonType === 'number'){
        currentVal =
            subattribute && typeof team[attribute] === 'object' && team[attribute] !== null?
                (team[attribute] as Record<string, number>)[subattribute]
                : typeof team[attribute] === 'number'?
                    (team[attribute] as number)
                    : 0;
    } else if (buttonType === 'climb') {
        currentVal = team.climb
    } else if (buttonType === 'text') {
        currentVal = ''
    }
    // console.log('currentVal: '+currentVal)
    const changeSubAttribute = (delta: -1 | 1, subAttribute: string) => {
        setTeam((prev) => {
            // console.log(prev)
            const prevAttribute = (prev[attribute]) as Record<string, number>;
            // console.log('prevAttribute: ', prevAttribute)
            const prevVal = prevAttribute[subAttribute] ?? 0;
            // console.log('prevVal: '+prevVal)

            return {
                ...prev,
                [attribute]: {
                    ...prevAttribute,
                    [subAttribute]: prevVal + delta,
                },
            };
        });
    };

    const changeAttribute = (delta: -1 | 1) => {
        setTeam((prev) => {
            const prevVal = prev[attribute] as number;
            return {
                ...prev,
                [attribute]: prevVal + delta,
            };
        });
    };

    return (
        <Card className="rounded-md bg-brand/50">
            <CardHeader className='items-center'>
                <CardTitle className="text-white">{content}</CardTitle>
            </CardHeader>
            <CardContent className="space-x-2 flex max-w-52">

                {buttonType === 'number' &&
                    <Button
                        size="sm"
                        className="bg-brand/75 rounded-md w-1/3 hover:bg-brand/85 transition duration-500 ease-in-out"
                        onClick={() => {
                            if (subattribute) {
                                changeSubAttribute(-1, subattribute);
                            } else {
                                changeAttribute(-1);
                            }
                        }}
                    >
                        -
                    </Button>
                }

                {buttonType === 'number' && 
                    <input
                        value={currentVal ?? 0}
                        readOnly
                        className="text-center bg-brand/75 rounded-md w-1/3 hover:bg-brand/85 transition duration-500 ease-in-out"
                    />
                }

                {buttonType === 'number' && 
                    <Button
                        size="sm"
                        className="bg-brand/75 rounded-md w-1/3 hover:bg-brand/90 transition duration-500 ease-in-out"
                        onClick={() => {
                            if (subattribute) {
                                changeSubAttribute(1, subattribute);
                            } else {
                                changeAttribute(1);
                            }
                        }}
                    >
                        +
                    </Button>
                }

                {buttonType === 'climb' && 
                    <Select> 
                        <SelectTrigger className='h-9 bg-brand/75 border-none text-neutral-600 hover:bg-brand/90'>
                            <SelectValue placeholder='Select climb' className='mr-2'/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value='none'>None</SelectItem>
                                <SelectItem value='shallow'>Shallow</SelectItem>
                                <SelectItem value='deep'>Deep</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                }
            </CardContent>
        </Card>
    );
};

export default MatchScoutingButton;
