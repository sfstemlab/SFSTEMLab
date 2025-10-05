"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import Tag from "./tag";
import { MoveRight, X } from "lucide-react";
import Link from "next/link";
import DifficultyIndicator from "./diffucultyIndicator";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Calendar } from "./ui/calendar";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

interface CreateTimeslotProps {
    title: string,
    teamNum?: number,
    desc: string,
    date: Date,
    startTime: number,
    endTime: number
}

export function TimeslotModal() {
    const [active, setActive] = useState<boolean | null>(null);
    const [calendarActive, setCalendarActive] = useState<boolean | null>(null);
    const [selected, setSelected] = useState<Date | undefined>(undefined);

    const today = new Date()
    const [eventInfo, setEventInfo] = useState<CreateTimeslotProps>({
        title: '',
        date: today,
        startTime: 12,
        endTime: 1,
        desc: '',
    });

    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    const submitTimeslot = async () => {
        console.log('eventinfo: ', eventInfo)
        const res = await fetch("/api/createTimeslot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventInfo),
        });
        console.log(" Response", res)
        if (res.ok) {
            console.log("Timeslot created!");
        } else {
            console.log("Error creating timeslot");
        }
    }
    

    return (
        <>
        {/* shade on bg */}
            <AnimatePresence>
                {active && typeof active === 'object' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 h-full w-full z-10 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>
            {/* Pop-up */}
            <AnimatePresence>
                {active && typeof active === 'boolean' ? (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <div
                            ref={ref}
                            className="absolute top-[200px] w-full max-w-[560px] h-[455px] flex flex-col bg-cardColor-light border-2 border-brand backdrop-blur-lg sm:rounded-2xl"
                        >
                            <div className="items-center py-4">
                                <header className="flex justify-between w-full px-4 pb-2 items-center">
                                    <input
                                        className="font-bold text-redBrand text-xl text-left pl-2 bg-brand/80 py-1.5 rounded-md placeholder-cardColor w-4/6"
                                        placeholder='Event Title'
                                        type='text'
                                        onChange={(e) => setEventInfo({ ...eventInfo, title: e.target.value})}
                                    />
                                    <input
                                        className='mx-2 font-bold text-redBrand text-xl text-left pl-2 bg-brand/80 py-1.5 rounded-md placeholder-cardColor w-1/4'
                                        placeholder='Team #'
                                        type='text'
                                        onChange={((e) => {setEventInfo({...eventInfo, teamNum: Number(e.target.value)})})}
                                    />
                                    <button
                                        className="flex items-center justify-center rounded-md p-1.5 bg-brand/60 text-white font-black"
                                        onClick={() => setActive(false)}
                                    >
                                        <X />
                                    </button>
                                </header>
                                <div className='flex flex-row w-[560px]'>
                                    <div className='flex flex-col mx-2 px-4 py-2 h-80 w-1/2 items-center overflow-auto text-center justify-center rounded-md bg-brand/80 text-white'>
                                        <div className='flex flex-row'>
                                            <label className='text-[10px] font-black text-redBrand'>
                                                START TIME
                                                <input 
                                                    className='bg-transparent border-b border-redBrand w-full text-sm focus:outline-none'
                                                    type='text'
                                                    value={eventInfo.startTime}
                                                    min={1}
                                                    max={24}
                                                    onChange={(e) => setEventInfo({ ...eventInfo, startTime: Number(e.target.value)})}
                                                />
                                            </label>
                                            <label className="text-[10px] font-black text-redBrand">
                                                END TIME
                                                <input 
                                                    className="bg-transparent border-b border-redBrand w-full text-sm focus:outline-none"
                                                    type='text'
                                                    value={eventInfo.endTime}
                                                    min={1}
                                                    max={24}
                                                    placeholder="e.g. 17"
                                                    onChange={(e) => setEventInfo({ ...eventInfo, endTime: Number(e.target.value)})}
                                                />
                                            </label>
                                        </div>
                                        <Calendar 
                                            className='p-2 w-full flex flex-col items-center overflow-auto text-center justify-center rounded-md bg-transparent text-redBrand' 
                                            onSelect={(date:any) => {
                                                console.log(date)
                                                setSelected(date)
                                            }}
                                            mode='single'
                                        />
                                    </div>

                                    <motion.textarea
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="mx-4 px-4 py-2 h-80 w-1/2 flex flex-col items-start overflow-auto text-left justify-start rounded-md bg-brand/80 text-white placeholder-cardColor [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                        onChange={(e) => setEventInfo({ ...eventInfo, desc: e.target.value})}
                                        placeholder='Event Description'
                                    />
                                </div>
                                <div className='w-full flex flex-row mt-3 items-end justify-end pr-5'>
                                    <button
                                        className='px-3 py-2 rounded-md bg-redBrand text-white'
                                        onClick = {() => submitTimeslot()}
                                    >
                                        Submit Timeslot
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </AnimatePresence>
            {/* card */}
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    onClick={() => setActive(true)}
                    className="flex items-center justify-center rounded-md bg-brand text-darkBlue px-3 py-2 cursor-pointer"
                >
                    Book a Timeslot!
                </motion.div>
            </div>
        </>
    );
}
