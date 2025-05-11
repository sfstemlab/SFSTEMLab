import React, { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";


const Section1 = (info:any) => {
    const desc1 = (`SF STEM Lab offers hands-on workshops designed for elementary and middle\n 
        schoolstudents, welcoming all skill levels — even beginners with little to\n
        no prior STEM experience. The workshops are structured to help students dive\n
        into a variety of engaging activities, from building robots to mastering \n
        coding, 3D printing, and CAD design. Through these interactive sessions,\n
        students gainpractical experience and a deeper understanding of how the\n
        technology works, encouraging curiosity and creativity.`).split('\n')

    const desc2 = (`At SF STEM Lab, our focus is on mentorship and collaborativelearning.\n
        Experienced student mentors and professionals from the community\n
        play a key role in teaching the workshops, sharing their expertise and\n
        guiding students through the process of building and creating. This\n
        environment provides students with valuable skills and teaches the\n
        importance of teamwork, problem-solving, and working wtih others\n
        toward a common goal.`).split('\n')

    return (
      <div className="bg-[#1e439d] text-white px-12 py-10 items-center justify-center grid grid-cols-2 gap-12">

        <div className=''>
            <p className="text-4xl font-extrabold text-center text-white mb-3">
            Explore Hands-on STEM Workshops
            </p>
            <p className="text-xl text-center">{desc1}</p>
            <Link href={"/events"}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#1e439d] px-6 py-2 rounded-lg flex items-center gap-2"
                >
                    Sign Up Now
                    <MoveRight className="w-5 h-5" />
                </motion.button>
            </Link>
        </div>


        <div className="items-center justify-center">
            <p className="text-4xl font-extrabold text-center text-white mb-3">
            Benefit From Mentorship and Collaborative Learning
            </p>

            <p className="text-xl text-center">{desc2}</p>
            <Link href={"/about"} className="items-center justify-center">
                <button
                    className="bg-white text-[#1e439d] px-6 py-2 rounded-lg flex items-center gap-2"
                >
                    Learn More
                    <MoveRight className="w-5 h-5" />
                </button>
            </Link>
        </div>
            

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
      </div>
    );
};

export default Section1;
