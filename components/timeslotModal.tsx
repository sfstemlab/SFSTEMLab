"use client";
import React, { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/use-outside-click";
import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Calendar } from "./ui/calendar";
import { useToast } from "@/hooks/use-toast";

interface CreateTimeslotProps {
    teamNum?: number,
    contactEmail: string,
    contactPerson?: string,
    purpose?: string,
    date: Date,
    startTime: number,
    endTime: number
}

const Required = () => <span className="text-redBrand">&nbsp;*</span>;

interface TimeslotModalProps {
    onCreated?: () => void;
}

export function TimeslotModal({ onCreated }: TimeslotModalProps) {
    const [active, setActive] = useState<boolean | null>(null);
    const { toast } = useToast();

    const today = new Date()
    const emptyForm: CreateTimeslotProps = {
        date: today,
        startTime: 12,
        endTime: 13,
        contactEmail: '',
        contactPerson: '',
        purpose: '',
    };
    const [eventInfo, setEventInfo] = useState<CreateTimeslotProps>(emptyForm);
    const [submitting, setSubmitting] = useState(false);

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
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    const submitTimeslot = async () => {
        setSubmitting(true);
        try {
            const res = await fetch("/api/createTimeslot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventInfo),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');

            toast({
                title: 'Timeslot booked!',
                description: `Your booking for ${eventInfo.date.toLocaleDateString()} has been submitted.`,
            });
            setEventInfo(emptyForm);
            setActive(false);
            onCreated?.();
        } catch (err: any) {
            toast({
                title: 'Could not book timeslot',
                description: err.message,
                variant: 'destructive',
            });
        } finally {
            setSubmitting(false);
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
                    <div className="fixed inset-0 grid place-items-center z-[100] p-4">
                        <motion.div
                            ref={ref}
                            className="w-full max-w-[560px] max-h-[85vh] flex flex-col bg-cardColor-light border-2 border-brand backdrop-blur-lg rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex flex-col min-h-0 py-4 overflow-y-auto">
                                <header className="flex flex-wrap justify-between gap-2 w-full px-4 pb-2 items-center">
                                    <input
                                        className="font-bold text-redBrand text-base text-left pl-2 bg-brand/80 py-1.5 rounded-md placeholder-cardColor flex-1 min-w-[140px]"
                                        placeholder='Contact Person'
                                        type='text'
                                        value={eventInfo.contactPerson}
                                        onChange={(e) => setEventInfo({ ...eventInfo, contactPerson: e.target.value})}
                                    />
                                    <input
                                        className='font-bold text-redBrand text-base text-left pl-2 bg-brand/80 py-1.5 rounded-md placeholder-cardColor w-24'
                                        placeholder='Team #'
                                        type='text'
                                        value={eventInfo.teamNum ?? ''}
                                        onChange={((e) => {setEventInfo({...eventInfo, teamNum: e.target.value ? Number(e.target.value) : undefined})})}
                                    />
                                    <button
                                        className="flex items-center justify-center rounded-md p-1.5 bg-brand/60 text-white font-black"
                                        onClick={() => setActive(false)}
                                    >
                                        <X />
                                    </button>
                                </header>
                                <div className="px-4 pb-2">
                                    <label className="block mb-1 text-xs font-bold text-redBrand">
                                        Contact Email<Required />
                                    </label>
                                    <input
                                        className="w-full font-medium text-redBrand text-sm pl-2 bg-brand/80 py-1.5 rounded-md placeholder-cardColor"
                                        placeholder='you@team.org'
                                        type='email'
                                        required
                                        value={eventInfo.contactEmail}
                                        onChange={(e) => setEventInfo({ ...eventInfo, contactEmail: e.target.value})}
                                    />
                                </div>
                                <div className='flex flex-col md:flex-row gap-4 w-full px-4'>
                                    <div className='flex flex-col mx-0 md:mx-2 px-4 py-2 w-full md:w-1/2 items-center overflow-auto text-center justify-center rounded-md bg-brand/80 text-white'>
                                        <div className='flex flex-row gap-4'>
                                            <label className='text-[10px] font-black text-redBrand'>
                                                START TIME
                                                <input
                                                    className='bg-transparent border-b border-redBrand w-full text-sm focus:outline-none'
                                                    type='number'
                                                    value={eventInfo.startTime}
                                                    min={0}
                                                    max={24}
                                                    onChange={(e) => setEventInfo({ ...eventInfo, startTime: Number(e.target.value)})}
                                                />
                                            </label>
                                            <label className="text-[10px] font-black text-redBrand">
                                                END TIME
                                                <input
                                                    className="bg-transparent border-b border-redBrand w-full text-sm focus:outline-none"
                                                    type='number'
                                                    value={eventInfo.endTime}
                                                    min={0}
                                                    max={24}
                                                    placeholder="e.g. 17"
                                                    onChange={(e) => setEventInfo({ ...eventInfo, endTime: Number(e.target.value)})}
                                                />
                                            </label>
                                        </div>
                                        <Calendar
                                            className='p-2 w-full flex flex-col items-center overflow-auto text-center justify-center rounded-md bg-transparent text-redBrand'
                                            selected={eventInfo.date}
                                            onSelect={(date) => {
                                                if (date) setEventInfo({ ...eventInfo, date });
                                            }}
                                            mode='single'
                                        />
                                    </div>

                                    <motion.textarea
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="px-4 py-2 h-40 md:h-auto w-full md:w-1/2 flex flex-col items-start overflow-auto text-left justify-start rounded-md bg-brand/80 text-white placeholder-cardColor [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                        value={eventInfo.purpose}
                                        onChange={(e) => setEventInfo({ ...eventInfo, purpose: e.target.value})}
                                        placeholder='Purpose of visit'
                                    />
                                </div>
                                <div className='w-full flex flex-row mt-3 items-end justify-end px-4'>
                                    <button
                                        className='px-3 py-2 rounded-md bg-redBrand hover:bg-redBrand-light transition-colors text-white disabled:opacity-70 disabled:cursor-not-allowed'
                                        disabled={submitting || !eventInfo.contactEmail}
                                        onClick = {() => submitTimeslot()}
                                    >
                                        {submitting ? 'Submitting...' : 'Submit Timeslot'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
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
