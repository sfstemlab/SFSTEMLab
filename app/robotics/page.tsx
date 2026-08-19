"use client"
import Navbar from '@/components/navbar'
import PageTitle from '@/components/pageTitle'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

const RoboticsPage = () => {
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
    return (
        <div>
            <Navbar />
            <div className="root-div">
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
