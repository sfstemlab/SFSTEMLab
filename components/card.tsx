"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import Tag from "./tag";
import { MoveRight, X } from "lucide-react";
import Link from "next/link";
import { EventProps } from "@/types/types";
import DifficultyIndicator from "./diffucultyIndicator";

interface CardProps {
    event: EventProps; 
}

export function Card( { event } : CardProps) {
    const [active, setActive] = useState<(EventProps) | boolean | null>(null);
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
                {active && typeof active === 'object' ? (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.div
                            ref={ref}
                            className="absolute top-[200px] w-full max-w-[600px] h-[460px] flex flex-col bg-cardColor-light border-2 border-brand backdrop-blur-lg sm:rounded-2xl"
                        >
                            <div className="items-center py-4">
                                <header className="flex justify-between w-full px-4 pb-2 items-center">
                                    <motion.h3
                                        className="font-extrabold underline text-redBrand text-2xl text-left pl-2"
                                    >
                                        {active.title}
                                    </motion.h3>
                                    <div className='flex space-x-1'>
                                        <div className="ml-2 rounded-l-md bg-brand/60  text-redBrand py-1 px-3 items-center text-center flex space-x-2 cursor-default">
                                            <h2 className="font-extrabold text-lg">{event.month}</h2>
                                            <h3 className="font-extrabold text-lg">{event.day}</h3>
                                        </div>
                                        <div className='mr-2 rounded-r-md bg-brand/60  text-redBrand py-1 px-3 items-center text-center flex cursor-default'>
                                            <h2 className='font-extrabold text-lg'>{event.duration}</h2>
                                        </div>
                                    </div>
                                    <button
                                        className="flex items-center justify-center rounded-md p-1.5 bg-brand/60 text-white font-black"
                                        onClick={() => setActive(false)}
                                    >
                                        <X />
                                    </button>
                                </header>
                                
                                <div className=" relative px-4 mb-6">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="px-1 h-80 flex flex-col items-start overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                    >
                                        {active.expandedContent()}
                                        <div className="mt-4 flex w-full justify-between px-4 py-1 items-center bg-brand/20 border-3 border-brand rounded-md">
                                            <div className='flex flex-col rounded-md bg-brand/50 h-14 items-center justify-center px-3'>
                                                <h2 className='font-bold text-redBrand text-sm'>What To Bring </h2>
                                                <p className='text-redBrand text-md'>
                                                    {event.materials.join(', ')}
                                                </p>
                                            </div>
                                            <div className='flex flex-col mx-1 rounded-sm bg-brand/60 text-redBrand px-3 h-14 items-center justify-center text-center'>
                                                <h2 className='font-extrabold text-sm'>Age Range</h2>
                                                <h2 className='font-bold text-md'>{event.ageGroup}</h2>
                                            </div>
                                            <DifficultyIndicator level={event.difficulty}/>
                                        </div>
                                    </motion.div>
                                </div>
                                <footer className="flex w-full justify-between px-5 items-center">
                                    <div className=" flex space-x-2">
                                        {event.tags &&
                                            event.tags.length > 0 &&
                                            event.tags.map((tag, index) => (
                                                <Tag key={index} value={tag} />
                                            ))}
                                    </div>
                                    <Link
                                        href={`/signup/${event.title}`}
                                        className="bg-brand/50 shadow shadow-brand/20 hover:scale-105 transition duration-150 py-1 px-3 rounded-md flex space-x-2 items-center"
                                    >
                                        <h1 className="text-lg text-redBrand">Sign Up</h1>
                                        <MoveRight className="w-5 h-5 text-redBrand" />
                                    </Link>
                                </footer>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            {/* card */}
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    key={event.title}
                    onClick={() => setActive(event)}
                    className="text-white w-[380px] rounded-lg py-4 px-4 items-center border-2 border-brand bg-cardColor hover:bg-cardColor-light transition duration-700 ease-in-out cursor-pointer"
                >
                    <div className="flex w-full">
                        <div className="flex justify-center items-left flex-col w-15/24 mr-2">
                            <motion.h3
                                // layoutId={`title-${event.title}-${id}`}
                                className="font-bold underline text-xl text-redBrand text-left flex"
                            >
                                {event.title}
                            </motion.h3>
                            <motion.p
                                // layoutId={`description-${event.desc}-${id}`}
                                className="text-white text-center md:text-left text-base"
                            >
                                {event.desc}
                            </motion.p>
                            <div className="p-2 flex space-x-2">
                                {event.tags &&
                                    event.tags.length > 0 &&
                                    event.tags.map((tag, index) => <Tag key={index} value={tag} />)}
                            </div>
                        </div>
                        <div className='flex flex-col w-9/24'>
                            <div className="mx-1 rounded-sm bg-brand/60  text-redBrand py-1 px-3 items-center text-center h-1/2">
                                <h2 className="font-black text-lg">{event.month.toUpperCase()}</h2>
                                <h3 className="font-black text-5xl">{event.day}</h3>
                            </div>
                            <DifficultyIndicator level={event.difficulty}/>
                            <div className='mx-1 rounded-sm bg-brand/60 text-redBrand py-1 px-2 items-center text-center h-14'>
                                <h2 className='font-extrabold text-sm'>Age Range</h2>
                                <h2 className='font-bold text-md'>{event.ageGroup}</h2>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
