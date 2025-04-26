import React, { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface Section2Props {
    width: number;
    height:number;
}

const Section2 = ({width, height}:Section2Props) => {
    const descLg = (`SF STEM Lab's workshops are entirely free and open to all. We \n
        are commited to ensuring that students from all backgrounds have \n
        the opportunity to explore and create with STEM. SF STEM Lab aims \n
        to make high-quality STEM education available to a wider audience, \n
        helping to inspire the next generation of innovators, thinkers, \n
        and problem-solvers.`).split('\n')
    const descSm = (`SF STEM Lab's workshops are \n
        entirely free and open to all. We \n
        are commited to ensuring that students \n
        from all backgrounds have \n
        the opportunity to explore and create \n
        with STEM. SF STEM Lab aims \n
        to make high-quality STEM education \n
        available to a wider audience, \n
        helping to inspire the next \n
        generation of innovators, thinkers, \n
        and problem-solvers.`).split('\n')
    const svgHeight = 3000
    const top = 1350
    // console.log('1/3: '+ width*1/3 + ' 2/3: '+width*2/3+' 1: '+width)
    const angleRadians = 20*Math.PI/180
    // console.log('slope: '+angleRadians)
    const findYAlongLine = (x1:number, y1:number, x2:number, negative:boolean) => {
        const y = y1 - (x2 - x1) * (Math.tan(angleRadians) * (negative == true ? -1 : 1) )
        // console.log('y: '+y)
        // y = mx + b
        // y = -(Math.tan(angleRadians) * x2) + y1  * (negative == true ? -1 : 1) )
        return y
    }
    const y1 = top+338;
    const x2 = width*2/3; 
    const y2 = y1 - x2 * Math.tan(angleRadians)
    const points = [
        { x: 0, y: y1-380},
        { x: x2, y: findYAlongLine(0, y1, x2, false)-330},
        {x: width, y: findYAlongLine(x2, y2, width, true)-355},
        {x: width, y: height+850},
        {x: 0, y: height+850}
      ];
    return (
        <svg 
            height={svgHeight} 
            width="100%" 
            fill="#1e439d" className='z-50 absolute'>

            {/* The polygon for the background shape */}
            <polygon
                points={`
                    ${points[0].x}, ${points[0].y}
                    ${points[1].x}, ${points[1].y}
                    ${points[2].x}, ${points[2].y}
                    ${points[3].x}, ${points[3].y}
                    ${points[4].x}, ${points[4].y}
                `}
                    className=''
                />
            {/* points: (0%,180), (75%,50), (100%,100), (100%,535), (25%,650), (0%,600) */}
            {/*  title */}
            <text
                className="text-4xl font-extrabold"
                x="66.66%" // Horizontally position text
                y={top - 125}  // Vertically position text
                textAnchor="middle"  // Make sure text is centered horizontally within its position
                style={{
                    fill: "white"
                }}
            >
                Free and Accesible for All
            </text>
            {/* descLg */}
            {width >= 430 && descLg.map((line, index) => (
                <text
                    key={index}
                    className="text-xl"
                    x='66.66%'  // Horizontally position text
                    y={top - 80 + index * 15}  // Vertically position each line, spaced 15px apart
                    textAnchor="middle"  // Center text horizontally
                    style={{
                        fill: "white"
                    }}
                >
                    {line}
                </text>
            ))}

            {/* descSm */}
            { width <= 430 && descSm.map((line, index) => (
                <text
                    key={index}
                    className="text-xl"
                    x='50%'  // Horizontally position text
                    y={top - 80 + index * 15}  // Vertically position each line, spaced 15px apart
                    textAnchor="middle"  // Center text horizontally
                    style={{
                        fill: "white"
                    }}
                >
                    {line}
                </text>
            ))}
            {/* button */}
            <foreignObject x="75%" y={top + 125} width="400" height="100" transform="translate(-200,0)">
                <Link href={'/events'}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-[#1e439d] px-6 py-2 rounded-lg flex items-center gap-2"
                    >
                        Donate
                        <MoveRight className="w-5 h-5" />
                    </motion.button>
                </Link>
            </foreignObject>
        </svg>

    );
};

export default Section2;
