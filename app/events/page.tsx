"use client"
import React, { useEffect, useRef, useState } from 'react'
import Event from '../../components/event';
import Navbar from '../../components/navbar';

import { Transition, Variants, motion } from "framer-motion";
import { Card } from '@/components/card';
import PageTitle from '@/components/pageTitle';
import { EventProps } from '@/types/types';

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

const Events = () => {

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1 // account for getMonth starting at January = 0
    const currentDay = currentDate.getDate()
    const monthMap: Record<string, number> = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
    };

    const events: EventProps[] = [
        {
            title: 'STEM Workshop #2',
            day: 16,
            month: 'July',
            desc: 'Learn about the wonders of Computer-Aided Design and the Computer Numerical Control (CNC) machine',
            tags: ['CNC', 'CAD', 'CAM'],
            difficulty: 3,
            duration: '3 hrs',
            materials: ['Water bottle'],
            ageGroup: '10-12',
            expandedContent: () => {
                return (
                    <p className="text-white text-left">
                        Join us for an exciting, hands-on workshop that introduces middle school
                        students to the world of STEM through the creative power of CNC machining,
                        3D printing, and computer-aided design (CAD). In this beginner-friendly
                        session, students will learn the fundamentals of digital design and
                        manufacturing by creating their own custom projects from start to finish.
                        They&apos;ll explore how ideas go from screen to physical object, gain
                        confidence using real engineering tools, and spark curiosity about the
                        technology shaping our future. No prior experience is needed—just curiosity
                        and a willingness to learn and build!
                    </p>
                );
            },
        },
    ].filter((event) => {
        const eventMonthNum = monthMap[event.month];
        if (eventMonthNum > currentMonth) return true;
        if (eventMonthNum === currentMonth && event.day >= currentDay) return true;
        return false;
    });

      

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

    return (
        <motion.div
            className="root-div"
            variants={backgroundVariants}
            initial="hidden"
            animate="visible"
        >
            <Navbar />
            {/* <img
                src="@/../images/eventsPage_HeroSection.png"
                alt="Events Page Hero Section"
                className="hero-image"
            /> */}
            <PageTitle />
            <div className="main-section">
                {/* TODO: Add a calendar showing all of the events */}
                <h2 className="font-extrabold text-4xl mb-2 w-full">Upcoming Events</h2>
                {(events.length > 0 && (
                    <div className="rounded-md md:mx-20 p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        {events.map((event, index) => (
                            <Card
                                key={index}
                                // title={event.title}
                                // day={event.day}
                                // month={event.month}
                                // desc={event.desc}
                                // tags={event.tags}
                                // expandedContent={event.expandedContent}
                                event={event}
                            />
                        ))}
                    </div>
                )) || (
                    <h1 className="font-bold text-lg text-center w-full mt-6 h-full">
                        More events coming soon..
                    </h1>
                )}
            </div>
        </motion.div>
    );
}

export default Events