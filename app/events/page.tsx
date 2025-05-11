"use client"
import React, { useEffect, useRef, useState } from 'react'
import Event from '../../components/event';
import Navbar from '../../components/navbar';

import { Transition, Variants, motion } from "framer-motion";
import { Card } from '@/components/card';

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

interface EventProps {
    title:string;
    day:number;
    month:string;
    desc:string;
    tags?:string[];
    expandedContent:any;
}

const Events = () => {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const events: EventProps[] = [
        {
          title: "STEM Workshop #2",
          day: 16,
          month: "Apr",
          desc: "Learn about the wonders of Computer-Aided Design and the CNC machine",
          tags: ["CNC", "CAD", "CAM"],
          expandedContent: () => {
            return (
              <p className="text-white">
                Join us for an exciting, hands-on workshop that introduces
                middle school students to the world of STEM through the creative
                power of CNC machining, 3D printing, and computer-aided design
                (CAD). In this beginner-friendly session, students will learn
                the fundamentals of digital design and manufacturing by creating
                their own custom projects from start to finish. They&apos;ll
                explore how ideas go from screen to physical object, gain
                confidence using real engineering tools, and spark curiosity
                about the technology shaping our future. No prior experience is
                needed—just curiosity and a willingness to learn and build!
              </p>
            );
          },
        },
      ];
      

    const containerVariants = {
        hidden: { opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // each child will start animating 0.3s after the prev.
            },
            y: 10
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
    <motion.div
        className="relative w-full bg-white min-h-screen justify-center text-black"
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        >
            <Navbar />
            <img src='@/../images/eventsPage_HeroSection.png' alt='Events Page Hero Section' className='sticky top-0 z-0 w-full'></img>
            <motion.div
                className="bg-[#1e439d] z-20 w-full p-4 text-center"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                ref={ref}
                >
                    <h1 className="text-white font-extrabold text-2xl mb-2 underline underline-offset-4">Upcoming Events</h1>
                    <div className="rounded-md mx-20 p-4 grid grid-cols-3 gap-x-6 gap-4">
                        {events.length > 0 &&
                        events.map((event, index) => (
                            <Card 
                                key={index}
                                title={event.title}
                                day={event.day}
                                month={event.month.toUpperCase()}
                                desc={event.desc}
                                tags={event.tags}
                                expandedContent={event.expandedContent}
                            />
                        ))}
                    </div>
            </motion.div>
    </motion.div>
  )
}

export default Events