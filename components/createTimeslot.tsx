"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import Tag from "./tag";
import { Calendar, MoveRight, X } from "lucide-react";
import Link from "next/link";
import DifficultyIndicator from "./diffucultyIndicator";
import { CreateTimeslotProps } from "@/types/types";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export function CreateTimeslot() {
    const [active, setActive] = useState<boolean | null>(null);
    const [calendarActive, setCalendarActive] = useState<boolean | null>(null);

    const [eventInfo, setEventInfo] = useState<CreateTimeslotProps>({
        title: '',
        teamNum: '',
        day: 1,
        month: 'January',
        duration: 1,
        desc: '',
    })

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
                            className="absolute top-[200px] w-full max-w-[600px] h-[460px] flex flex-col bg-cardColor-light border-2 border-brand backdrop-blur-lg sm:rounded-2xl"
                        >
                            <div className="items-center py-4">
                                <header className="flex justify-between w-full px-4 pb-2 items-center">
                                    <input
                                        className="font-bold text-redBrand text-xl text-left pl-2 bg-brand/80 py-1.5 rounded-md placeholder-cardColor w-4/6"
                                        placeholder='Event Title'
                                        type='text'
                                        onChange={(e) => setEventInfo({ ...eventInfo, title: e.target.value})}
                                    />
                                    <div className='flex space-x-1'>
                                        <div 
                                            className="flex"
                                            onClick = {() => setCalendarActive(true)} // TODO: make this work
                                        >
                                            <select 
                                                className="ml-2 rounded-l-md bg-brand/80  text-redBrand text-lg py-2 pl-2 items-center text-center flex cursor-pointer w-2/6"
                                                onChange={(e) => setEventInfo({ ...eventInfo, month: e.target.value })}
                                            >
                                                <optgroup label='Select a month'>
                                                    <option value="January">January</option>
                                                    <option value="Febuary">Febuary</option>
                                                    <option value="March">March</option>
                                                    <option value="April">April</option>
                                                    <option value="May">May</option>
                                                    <option value="June">June</option>
                                                    <option value="July">July</option>
                                                    <option value="August">August</option>
                                                    <option value="September">September</option>
                                                    <option value="October">October</option>
                                                    <option value="November">November</option>
                                                    <option value="December">December</option>
                                                </optgroup>
                                            </select> 
                                            <input 
                                                className="rounded-r-md bg-brand/80  text-redBrand py-1 items-center text-center flex cursor-pointer w-[40px]"
                                                placeholder='Day'
                                                type='number'
                                                onChange={(e) => setEventInfo({ ...eventInfo, day: Number(e.target.value)})}
                                            />
                                            <input 
                                                className='ml-2 rounded-l-md bg-brand/80  text-redBrand py-1 pl-3 items-center text-center flex cursor-text w-1/6'
                                                placeholder='Event Duration (Hours)'
                                                type='text'
                                                onChange={(e) => setEventInfo({ ...eventInfo, duration: Number(e.target.value)})}
                                            />
                                            <select className='rounded-r-md bg-brand/80 text-redBrand py-1 items-center justify-center flex cursor-text w-[75px]'>
                                                <option label='hours'>hours</option>
                                                <option label='minutes'>minutes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        className="flex items-center justify-center rounded-md p-1.5 bg-brand/60 text-white font-black"
                                        onClick={() => setActive(false)}
                                    >
                                        <X />
                                    </button>
                                </header>
                                
                                <motion.textarea
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="mx-4 px-1 h-80 w-[560px] flex flex-col items-start overflow-auto text-left justify-start [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                    onChange={(e) => setEventInfo({ ...eventInfo, desc: e.target.value})}
                                    placeholder='Event Description'
                                />
                            </div>
                        </div>
                    </div>
                ) : null}
            </AnimatePresence>
            <AnimatePresence>
                {calendarActive && typeof calendarActive === 'boolean' ? (
                    <Calendar className="fixed inset-0 grid place-items-center z-[100]"/>
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
