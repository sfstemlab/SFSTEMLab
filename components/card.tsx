"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import Tag from "./tag";
import { MoveRight, X } from "lucide-react";
import Link from "next/link";

interface EventProps {
    title: string;
    day: number;
    month: string;
    desc: string;
    tags?: string[];
    expandedContent: any;
  }

export function Card(event:EventProps) {
    const [active, setActive] = useState<
        (typeof event) | boolean | null
    >(null);
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
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 h-full w-full z-10 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.div
                            // layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="absolute top-[200px] w-full max-w-[500px]  h-[400px] flex flex-col bg-brand/80 border-2 border-brand backdrop-blur-lg sm:rounded-2xl"
                        >
                            <div className="items-center py-4">
                                <div className='flex justify-between w-full px-8 pb-2 items-center'>
                                    <motion.h3
                                        // layoutId={`title-${active.title}-${id}`}
                                        className="font-extrabold underline text-redBrand text-2xl text-left"
                                    >
                                        {active.title}
                                    </motion.h3>
                                    <button
                                        className='flex items-center justify-center rounded-md p-1 bg-brand text-white'
                                        onClick={() => setActive(false)}>
                                        <X />
                                    </button>
                                </div>
                                <div className=" relative px-4">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="px-4 h-96 md:h-fit pb-20 flex flex-col items-start gap-4 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                    >
                                        {active.expandedContent()}
                                        <div className='flex w-full justify-between px-4 items-center'>
                                            <div className=" flex space-x-2">
                                                {
                                                    event.tags &&
                                                    event.tags.length > 0 &&
                                                    event.tags.map((tag, index) => (
                                                        <Tag key={index} value={tag} />
                                                    ))
                                                }
                                            </div>
                                            <Link 
                                                href={`/signup/${event.title}`} 
                                                className='bg-darkBlue py-1 px-3 rounded-md flex space-x-2 items-center'
                                            >
                                                <h1>
                                                    Sign Up
                                                </h1>
                                                <MoveRight className='w-5 h-5' />
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
                <motion.div
                // layoutId={`card-${event.title}-${id}`}
                    key={event.title}
                    onClick={() => setActive(event)}
                    className="text-white w-[330px] rounded-md py-2 px-1 items-center border-2 border-brand bg-brand/50 hover:bg-[#8db5e3]/90 transition duration-700 ease-in-out cursor-pointer"
                >
                    <div className="flex w-full">
                        <div className="flex justify-center items-center flex-col">
                            <motion.h3
                                // layoutId={`title-${event.title}-${id}`}
                                className="font-bold underline text-xl text-redBrand text-left flex"
                            >
                                {event.title}
                            </motion.h3>
                            <motion.p
                                // layoutId={`description-${event.desc}-${id}`}
                                className="text-white text-center md:text-left text-base px-2"
                            >
                                {event.desc}
                            </motion.p>
                            <div className="p-2 flex space-x-2">
                                {event.tags &&
                                event.tags.length > 0 &&
                                event.tags.map((tag, index) => (
                                    <Tag key={index} value={tag} />
                                ))}
                            </div>
                        </div>
                        <div className="mx-1 rounded-sm bg-brand/60  text-redBrand py-1 pb-2 px-3 items-center text-center h-5/6">
                            <h2 className="font-black text-lg">{event.month}</h2>
                            <h3 className="font-black text-5xl">{event.day}</h3>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
