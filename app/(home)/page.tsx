"use client";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { Variants, Transition } from "framer-motion";
import Navbar from '@/components/navbar'
import Section1 from "@/components/section1";

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

    const containerVariants = {
        hidden: { opacity: 0},
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, // each child will start animating 0.3s after the prev.
        },
        y: -10
        },
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 20,
        },
        },
        hover: {
        scale: 1.1,
        transition: {
            duration: 1,
        },
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        },
    };
    const backgroundVariants: BackgroundVariants = {
        hidden: { backgroundPosition: "0% 50%" },
        visible: {
        backgroundPosition: "100% 50%",
        transition: {
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror", 
        },
        },
    };



  
    
    // useEffect(() => {
    //     const handleResize = () => {
    //         setSvgWidth(window.innerWidth);
    //         setOriginalSize([window.innerWidth, window.innerHeight])
    //         // console.log('window: '+window.innerWidth)
    //     };

    //     // Set initial size
    //     handleResize();
    //     // Update size on window resize
    //     window.addEventListener("resize", handleResize);

    //     // Cleanup on unmount
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);
    

    return (
        <motion.div
            className="w-full bg-white min-h-screen justify-center text-black relative"
            variants={backgroundVariants}
            initial="visible"
            animate="visible"
            >
                <Navbar />
                <img 
                    src='@/../images/HomePage_HeroSection.png' 
                    alt='Home Page Hero Section'  
                    width={1190} 
                    className='w-full h-full z-0 sticky top-0' 
                />
                <motion.div variants={sectionVariants} className='z-40 absolute top-[675px]'>
                    <Section1 />
                </motion.div>
        </motion.div>
    );
}
