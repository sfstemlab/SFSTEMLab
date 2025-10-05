"use client"
import React, { useEffect, useRef, useState } from 'react'
import Event from '../../components/event';
import Navbar from '../../components/navbar';

import { Transition, Variants, motion } from "framer-motion";
import { Card } from '@/components/card';
import PageTitle from '@/components/pageTitle';
import { TimeslotModal } from '@/components/timeslotModal';
import { TimeslotCard } from '@/components/timeslotCard';

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

interface TimeslotModalProps {
    title: string,
    desc: string,
    teamNum?: number
    date: Date,
    startTime: number,
    endTime: number
}

interface EventProps {
    title:string;
    day:number;
    month:string;
    desc:string;
    tags?:string[];
    expandedContent:any;
    difficulty?: number;
    startTime: number;
    endTime: number;
    materials?: string[];
    ageGroup?: string;
}

const Events = () => {


    const [loading, setLoading] = useState<boolean>(true)
    const [timeslots, setTimeslots] = useState<TimeslotModalProps[]>([]);

    useEffect(() => {
        const fetchTimeslots = async () => {
            try {
                const res = await fetch ('/api/getTimeslots', { method: 'GET' })
                console.log('res: ', res)
                
                if (!res.ok){
                    throw new Error('failed to fetch timeslots')
                }
                const data = await res.json()
                setTimeslots(data.timeslots)
                console.log('timeslots', timeslots)
            } catch (e){
                console.error(e)
            } finally {
                setLoading(false)
            } 
        }
        fetchTimeslots()
    }, [])

    useEffect(() => {
        console.log('timeslot variable changing')
    }, [timeslots])


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
            month: 'September',
            desc: 'Learn about the wonders of Computer-Aided Design and the Computer Numerical Control (CNC) machine',
            tags: ['CNC', 'CAD', 'CAM'],
            difficulty: 3,
            startTime: 12,
            endTime: 3,
            materials: ['Water Bottle'],
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
    console.log('events length: ', events.length, 'timeslots length: ', timeslots.length)
    return (

        <div className="main-section md:px-20">
            <div className='flex clex-row justify-between items-center'>
                <h2 className="font-extrabold text-4xl mb-2 w-full">Upcoming Events</h2>
                <TimeslotModal />
            </div>

            { loading ? (
                <p>loading events & timeslots</p>
            ) : (events.length > 0 || timeslots.length > 0) ? (
                <div className="rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    {events?.map((event, index) => (
                        <Card
                            key={index}
                            event={event}
                        />
                    ))}
                    {timeslots.map((slot, index) => (
                        <TimeslotCard
                            key = {index}
                            slot = {{
                                title: slot.title,
                                date: slot.date,
                                desc: slot.desc,
                                startTime: slot.startTime,
                                endTime: slot.endTime
                            }}
                        />
                    ))

                    }
                </div>
            ) : (
                <h1 className="font-bold text-lg text-center w-full mt-6 h-full">
                    More events coming soon..
                </h1>
            )}
        
        </div>
    );
}

export default Events