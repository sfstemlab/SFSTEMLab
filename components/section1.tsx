import React, { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
interface Section1Props {
    width: number;
    height:number;
}

const Section1 = ({width, height}:Section1Props) => {
    const desc1 = (`SF STEM Lab offers hands-on workshops designed for elementary and middle\n 
        schoolstudents, welcoming all skill levels — even beginners with little to\n
        no prior STEM experience. The workshops are structured to help students dive\n
        into a variety of engaging activities, from building robots to mastering \n
        coding, 3D printing, and CAD design. Through these interactive sessions,\n
        students gainpractical experience and a deeper understanding of how the\n
        technology works, encouraging curiosity and creativity.`).split('\n')

    const desc2Lg = (`At SF STEM Lab, our focus is on mentorship and collaborativelearning.\n
        Experienced student mentors and professionals from the community\n
        play a key role in teaching the workshops, sharing their expertise and\n
        guiding students through the process of building and creating. This\n
        environment provides students with valuable skills and teaches the\n
        importance of teamwork, problem-solving, and working wtih others\n
        toward a common goal.`).split('\n')

    const desc2Sm = (`At SF STEM Lab, our focus is on mentorship and collaborativelearning.\n
        Experienced student mentors and professionals from the community\n
        play a key role in teaching the workshops, sharing their expertise and\n
        guiding students through the process of building and creating. This\n
        environment provides students with valuable skills and teaches the\n
        importance of teamwork, problem-solving, and working wtih others\n
        toward a common goal.`).split('\n')
    const top = 0

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
    const x1 = 0
    const y1 = top+338;
    const x2 = width*2/3; 
    const y2 = y1 - x2 * Math.tan(angleRadians)
    const points = [
        { x: x1, y: y1-150},
        { x: x2, y: findYAlongLine(x1, y1, x2, false)-50},
        {x: width, y: findYAlongLine(x2, y2, width, true)-75},
        {x: width, y: height-150},
        {x: width*1/3, y: findYAlongLine(width, height-200, width*1/3, false)},
        {x: 0, y: findYAlongLine(width*1/3, findYAlongLine(width, height-200, width*1/3, false), 0, true)+25}
      ];
    // console.log(points)
    return (
        <svg 
            height={height+340} 
            width="100%" 
            fill="#1e439d" 
            className='absolute top-[607px] z-20 bg-opacity-60'>

            {/* The polygon for the background shape */}
            <polygon
                points={`
                    ${points[0].x}, ${points[0].y}
                    ${points[1].x}, ${points[1].y}
                    ${points[2].x}, ${points[2].y}
                    ${points[3].x}, ${points[3].y}
                    ${points[4].x}, ${points[4].y}
                    ${points[5].x}, ${points[5].y}
                    `}
                    className=''
                />
            {/* points: (0%,180), (75%,50), (100%,100), (100%,535), (25%,650), (0%,600) */}
            {/*  title 1 */}
            <text
                className="text-4xl font-extrabold"
                x="68%" // Horizontally position text
                y={points[1].y + 150}  // Vertically position text
                textAnchor="middle"  // Make sure text is centered horizontally within its position
                style={{
                    fill: "white"
                }}
            >
                Explore Hands-on STEM Workshops
            </text>
            {/* desc 1 */}
            {desc1.map((line, index) => (
                <text
                    key={index}
                    className="text-xl"
                    x='68%'  // Horizontally position text
                    y={points[1].y + 200 + index * 15}  // Vertically position each line, spaced 15px apart
                    textAnchor="middle"  // Center text horizontally
                    style={{
                        fill: "white"
                    }}
                >
                    {line}
                </text>
            ))}
            {/* button 1 */}
            <foreignObject x="75%" y={points[1].y + 405} width="400" height="100" transform="translate(-200,0)">
                <Link href={'/events'}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-[#1e439d] px-6 py-2 rounded-lg flex items-center gap-2"
                    >
                        Sign Up Now
                        <MoveRight className="w-5 h-5" />
                    </motion.button>
                </Link>
            </foreignObject>

            {/* title 2 */}
            <text
                className="text-4xl font-extrabold"
                x="33.333%" // Horizontally position text
                y={top+680}  // Vertically position text
                textAnchor="middle"  // Make sure text is centered horizontally within its position
                style={{
                    fill: "white"
                }}
            >
                <tspan x="33.333%" dy="1.2em">Benefit From Mentorship</tspan>
                <tspan x="33.333%" dy="1.2em">and Collaborative Learning</tspan>
            </text>
            {desc2Lg.map((line, index) => (
                <text
                    key={index}
                    className="text-xl"
                    x={width*1/3}  // Horizontally position text
                    y={top+805 + index * 15}  // Vertically position each line, spaced 15px apart
                    textAnchor="middle"  // Center text horizontally
                    style={{
                        fill: "white"
                    }}
                >
                    {line}
                </text>
            ))}
            {desc2Sm.map((line, index) => (
                <text
                    key={index}
                    className="text-xl"
                    x={width*1/3}  // Horizontally position text
                    y={top+805 + index * 15}  // Vertically position each line, spaced 15px apart
                    textAnchor="middle"  // Center text horizontally
                    style={{
                        fill: "white"
                    }}
                >
                    {line}
                </text>
            ))}
            {/* button 2 */}
            <foreignObject x={width*1/3-80} y={top+1010} width="400" height="100">
                <Link href={'/about'}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-[#1e439d] px-6 py-2 rounded-lg flex items-center gap-2"
                    >
                        Learn More
                        <MoveRight className="w-5 h-5" />
                    </motion.button>
                </Link>
            </foreignObject>
            {/* <g>
                <image 
                    href="/images/drillPress.png"
                    x={0}
                    y={height+200}
                    width={width*2/3}
                    height={width*2/3}
                    preserveAspectRatio="xMidYMid slice"
                    className='z-0'
                />
                  <image 
                    href="/images/drillPress.png"
                    x={width-150}
                    y={height}
                    width="150"
                    height="150"
                    preserveAspectRatio="xMidYMid slice"
                    className='z-0'
                />
            </g> */}
        </svg>

    );
};

export default Section1;
