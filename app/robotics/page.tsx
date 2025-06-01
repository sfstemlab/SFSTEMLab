"use client"
import Navbar from '@/components/navbar'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const RoboticsPage = () => {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, // each child will start animating 0.3s after the prev.
        },
        y: -10,
        },
    };
    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            setIsInView(true);
            }
        },
        { threshold: 0.5 }
        );

        if (ref.current) {
        observer.observe(ref.current);
        }

        return () => {
        if (ref.current) {
            observer.unobserve(ref.current);
        }
        };
    }, []);
    return (
        <div>
            <Navbar />
            <div className="relative w-full overflow-visible">
                <img
                    src="@/../images/mentorship.png"
                    alt="Robotics Page Hero Section"
                    className="w-full object-cover min-h-[600px]"
                    height={6000}
                ></img>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="font-extrabold text-4xl md:text-5xl text-white mb-4 underline">
                        FRC Team Resources
                    </h1>
                    <p className="text-white text-lg font-bold">
                        Your nexus for all things FIRST Robotics Competition!
                    </p>
                </div>
                <motion.div
                    className="absolute bottom-[-10px] top-[305px] md:top-[675px] bg-[#1e439d] w-full p-4 text-center justify-center space-x-4 text-white flex"
                    variants={containerVariants}
                    initial="visible"
                >
                    <Link
                        href="/robotics/scouting/match"
                        className="w-1/2 rounded-md py-2 px-1 items-center border-2 border-brand bg-brand/50 hover:bg-[#8db5e3]/90 transition duration-700 ease-in-out cursor-pointer"
                    >
                        <h1 className="font-bold underline text-2xl text-redBrand">
                            Match Scouting
                        </h1>
                        <h2>The place for all of your match scouting needs!</h2>
                    </Link>
                    <Link
                        href="/robotics/scouting/pit"
                        className="w-1/2 rounded-md py-2 px-1 items-center border-2 border-brand bg-brand/50 hover:bg-[#8db5e3]/90 transition duration-700 ease-in-out cursor-pointer"
                    >
                        <h1 className="font-bold underline text-2xl text-redBrand">
                            Pit Scouting
                        </h1>
                        <h2>The place for all of your pit scouting needs!</h2>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

export default RoboticsPage
