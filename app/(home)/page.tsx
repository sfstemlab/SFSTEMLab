"use client";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { Variants, Transition } from "framer-motion";
import Navbar from '@/components/navbar'
import Link from "next/link";
import Circle from "@/components/circle";

type BackgroundVariants = Variants & {
  hidden: { backgroundPosition: string };
  visible: {
    backgroundPosition: string;
    transition: Transition & {
      repeat?: number;
      repeatType?: "loop" | "reverse" | "mirror";
    };
  };
};


export default function Home() {

    const desc1 = `SF STEM Lab offers hands-on workshops designed for elementary and middle\n 
        schoolstudents, welcoming all skill levels — even beginners with little to\n
        no prior STEM experience. The workshops are structured to help students dive\n
        into a variety of engaging activities, from building robots to mastering \n
        coding, 3D printing, and CAD design. Through these interactive sessions,\n
        students gainpractical experience and a deeper understanding of how the\n
        technology works, encouraging curiosity and creativity.`.split('\n');

    const desc2 = `At SF STEM Lab, our focus is on mentorship and collaborativelearning.\n
        Experienced student mentors and professionals from the community\n
        play a key role in teaching the workshops, sharing their expertise and\n
        guiding students through the process of building and creating. This\n
        environment provides students with valuable skills and teaches the\n
        importance of teamwork, problem-solving, and working wtih others\n
        toward a common goal.`.split('\n');

    const desc3 = `SF STEM Lab's workshops are entirely free and open to all. We \n
    are commited to ensuring that students from all backgrounds have \n
    the opportunity to explore and create with STEM. SF STEM Lab aims \n
    to make high-quality STEM education available to a wider audience, \n
    helping to inspire the next generation of innovators, thinkers, \n
    and problem-solvers.`.split('\n');
    

    return (
        <div className="root-div">
            <Navbar />
            <img
                src="@/../images/HomePage_HeroSection.png"
                alt="Home Page Hero Section"
                width={1190}
                className="hero-image"
            />
            <div className="main-section grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-4xl font-extrabold text-center text-white mb-3">
                        Explore Hands-on STEM Workshops
                    </p>
                    <p className="text-xl text-center">{desc1}</p>
                    <Link href={'/events'} className="z-10">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-[#1e439d] px-6 py-2 rounded-lg flex items-center mt-4"
                        >
                            Sign Up Now
                            <MoveRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>

                <div className="flex flex-col items-center">
                    <p className="text-4xl font-extrabold text-center text-white mb-3">
                        Mentorship and Collaborative Learning
                    </p>
                    <p className="text-xl text-center">{desc2}</p>
                    <Link href={'/about'} className="z-10">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-[#1e439d] px-6 py-2 rounded-lg flex items-center mt-4"
                        >
                            Learn More
                            <MoveRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <p className="text-4xl font-extrabold text-center text-white mb-3">
                        Free and Accesible for All
                    </p>

                    <p className="text-xl text-center">{desc3}</p>
                    <Link href={'/events'}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-[#1e439d] px-6 py-2 rounded-lg flex items-center mt-4"
                        >
                            Donate
                            <MoveRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>

                {/* <Circle
                    color={'red-500'}
                    color2={'green-500'}
                    title={'Heya!'}
                    content={'Did you know that we have these cool circles with fun facts in them?'}
                    y={400}
                    screenWidth={screenWidth}
                    cutoff={'l'}
                />
                <Circle
                    color={'red-500'}
                    color2={'green-500'}
                    title={'Hi Again!'}
                    content={'Whaddya think? Pretty cool right?'}
                    y={590}
                    screenWidth={screenWidth}
                    cutoff={'r'}
                /> */}
            </div>
        </div>
    );
}
