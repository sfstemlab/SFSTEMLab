'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TimeslotCard } from '@/components/timeslotCard';
import { TimeslotModal } from '@/components/timeslotModal';
import { Card } from '@/components/card';
import { EventProps } from '@/types/types';
import { Loader2 } from 'lucide-react';

interface TimeslotModalProps {
	purpose?: string;
	teamNum?: number;
	date: Date;
	startTime: number;
	endTime: number;
}

const Events = () => {
	const [loadingEvents, setLoadingEvents] = useState(true);
    const [loadingTimeslots, setLoadingTimeslots] = useState(true);
	const [timeslots, setTimeslots] = useState<TimeslotModalProps[]>([]);
	const [events, setEvents] = useState<EventProps[]>([]);

	const fetchTimeslots = async () => {
		try {
			const res = await fetch('/api/getTimeslots', { method: 'GET' });
			if (!res.ok) throw new Error('Failed to fetch timeslots');
			const data = await res.json();
			const formattedTS = Array.isArray(data.timeslots)
				? data.timeslots
				: Object.values(data.timeslots ?? {});
			setTimeslots(formattedTS);
		} catch (e) {
			console.error(e);
		} finally {
			setLoadingTimeslots(false);
		}
	};

	// Fetch events and timeslots from API
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const res = await fetch('/api/events', { method: 'GET' });
				if (!res.ok) throw new Error('Failed to fetch events');
				const data = await res.json();
				setEvents(data.events ?? []);
			} catch (e) {
				console.error(e);
			} finally {
                setLoadingEvents(false)
            }
		};

		fetchEvents();
		fetchTimeslots();
	}, []);

	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.1, duration: 0.4 },
		}),
	};

	return (
		<div className="w-full bg-darkBlue px-6 md:px-12 lg:px-20 py-12 flex flex-col lg:flex-row gap-16">
			{/* Page Header */}
            <div className='flex flex-col w-full lg:w-1/2 min-w-0'>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <div className="text-center sm:text-left mb-6 sm:mb-0">
                        <h1 className="text-4xl font-extrabold text-white">Upcoming Events</h1>
                        <p className="text-white/70 text-sm mt-2">
                            Find all of the latest STEM Lab events here.
                        </p>
                    </div>
                    {/* <TimeslotModal /> */}
                </div>

                {/* Loading State */}
                {loadingEvents && (
                    <div className="flex justify-center items-center h-[200px]">
                        <Loader2 className="text-brand animate-spin mr-3" size={24} />
                        <span className="text-white/70">Loading events...</span>
                    </div>
                )}

                {/* Events & Timeslots Grid */}
                {!loadingEvents && events.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8"
                    >
                        {events.map((event, i) => (
                            <motion.div key={i} variants={fadeIn} custom={i}>
                                <Card event={event} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : ( // no events found
                    !loadingEvents && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-white/70 mt-20"
                        >
                            <h2 className="text-xl font-semibold mb-2">More events coming soon...</h2>
                            <p className="text-sm">
                                Check back later or follow us for updates on future STEM experiences!
                            </p>
                        </motion.div>
                    )
                )}
            </div>
            <div className='flex flex-col w-full lg:w-1/2 min-w-0'>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <div className="text-center sm:text-left mb-6 sm:mb-0">
                        <h1 className="text-4xl font-extrabold text-white">FRC Team Bookings</h1>
                        <p className="text-white/70 text-sm mt-2">
                            See who is coming to STEM Lab!
                        </p>
                    </div>
                    <TimeslotModal onCreated={fetchTimeslots} />
                </div>

                {/* Loading State */}
                {loadingTimeslots && (
                    <div className="flex justify-center items-center h-[200px]">
                        <Loader2 className="text-brand animate-spin mr-3" size={24} />
                        <span className="text-white/70">Loading bookings...</span>
                    </div>
                )}

                {
                    !loadingTimeslots && timeslots.length > 0 ? (
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
                            {timeslots.map((slot, i) => (
                                <motion.div key={i} variants={fadeIn} custom={i + events.length}>
                                    <TimeslotCard
                                        slot={{
                                            date: slot.date,
                                            purpose: slot.purpose,
                                            teamNum: slot.teamNum,
                                            startTime: slot.startTime,
                                            endTime: slot.endTime,
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ) : !loadingTimeslots && ( // no timeslots found
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-white/70 mt-20"
                        >
                            <h2 className="text-xl font-semibold mb-2">Be the first to book a practice time!</h2>
                        </motion.div>
                    )
                }
            </div>
		</div>
	);
};

export default Events;
