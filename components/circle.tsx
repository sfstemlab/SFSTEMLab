import { cn } from '@/lib/utils';
import React from 'react';

interface CircleProps {
    color?: string; // eg. red-500
    title: string;
    content?: string;
    y: number; // top-left is 0,0
    color2:string;
    screenWidth: number
    cutoff: 'l' | 'r'
}

const Circle = ({ color, title, content, y, color2, screenWidth, cutoff }: CircleProps) => {
    const bgColor = `bg-${color}`
    const colorClass = `bg-gradient-to-br from-${color} to-${color2}`;

    const positionMap: Record<typeof cutoff, number> = { // tested values: 30, -170
        l: -30,
        r: screenWidth-190,
    };
    
    const x = positionMap[cutoff]

    const alignClass =
        x < screenWidth * 0.25?
            'text-left pl-16'
            : x > screenWidth * 0.75?
                'text-right pr-16'
                : 'text-center';

    return (
        <div
            className={cn(
                `z-0 absolute rounded-full text-white w-52 sm:w-[225px] h-52 sm:h-[225px] flex justify-center items-center bg-gradient-to-br from-blue-500 to-green-500`,
                colorClass
            )}
            style={{ top: y, left: x }}
        >
            <div className={`${alignClass} p-10`}>
                <h1 className="font-bold text-xl">{title}</h1>
                {content && <p>{content}</p>}
            </div>
        </div>
    );
};

export default Circle;
