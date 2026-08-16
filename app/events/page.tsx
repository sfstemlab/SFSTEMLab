'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TimeslotCard } from '@/components/timeslotCard';
import { TimeslotModal } from '@/components/timeslotModal';
import { Card } from '@/components/card';
import { EventProps } from '@/types/types';
import { Loader2 } from 'lucide-react';

interface TimeslotModalProps {
	title: string;
	purpose: string;
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

	//   useEffect(() => {
	//     async function fetchData() {
	//         try {
	//             const [timeslotRes, eventRes] = await Promise.all([
	//                 fetch("/api/getTimeslots"),
	//                 fetch("/api/getEvents")
	//             ])

	//             if(!timeslotRes.ok || !eventRes.ok) {
	//                 throw new Error("Failed to fetch one or more endpoints");
	//             }

	//             const timeslotData = await timeslotRes.json();
	//             const eventData = await eventRes.json();
	//             setTimeslots(timeslotData.timeslots ?? []);
	//             setEvents(eventData.events ?? []);
	//         } catch (e) {
	//             console.error(e)
	//         } finally {
	//         setLoading(false);
	//         }
	//     }

	//     fetchData();
	//   }, [])

	// Fetch timeslots from API
	useEffect(() => {
		const fetchTimeslots = async () => {
			try {
				const res = await fetch('/api/getTimeslots', { method: 'GET' });
				if (!res.ok) throw new Error('Failed to fetch timeslots');
				const data = await res.json();
				const formattedTS = Array.isArray(data.timeslots)
					? data.timeslots
					: Object.values(data.timeslots ?? {});
				setTimeslots(formattedTS);
				console.log('timeslots: ', formattedTS);
			} catch (e) {
				console.error(e);
			} finally {
				setLoadingTimeslots(false);
			}
		};

		const fetchEvents = async () => {
			try {
				const res = await fetch('/api/getEvents', { method: 'GET' });
				if (!res.ok) throw new Error('Failed to fetch events');
				const data = await res.json();
				const tempEvents = data.events.map((event: any) => event.event);
				setEvents(tempEvents);
			} catch (e) {
				console.error(e);
			} finally {
                setLoadingEvents(false)
            }
		};

		fetchEvents();
		fetchTimeslots();
	}, []);

	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1;
	const currentDay = currentDate.getDate();
	const currentYear = currentDate.getFullYear();

	const monthMap: Record<string, number> = {
		Jan: 1,
		Feb: 2,
		Mar: 3,
		Apr: 4,
		May: 5,
		Jun: 6,
		Jul: 7,
		Aug: 8,
		Sep: 9,
		Oct: 10,
		Nov: 11,
		Dec: 12,
	};

	// TODO: replace with /fetchEvents
	/*
        Sunday 11/23/25, 2-4pm
        Sunday 12/21/25, 2-4pm
        Sunday 1/5/26, 2-4pm
        Saturday 2/21/26, 2-4pm
        Competition Tours! 3/14-3/15
    */
	// {
	//   title: "STEM Workshop #1",
	//   day: 23,
	//   month: "Nov",
	//   year: 2025,
	//   desc: "Learn about the wonders of CAD & CNC machining in this hands-on workshop.",
	//   tags: ["CNC", "CAD", "CAM"],
	//   difficulty: 3,
	//   startTime: 2,
	//   duration: 2,
	//   endTime: 4,
	//   ampm: 'pm',
	//   materials: ["Water Bottle"],
	//   ageGroup: "10-12",
	//   expandedContent: () => (
	//     <p className="text-white leading-relaxed text-base">
	//       Join us for an exciting, hands-on workshop that introduces middle school students
	//       to the world of STEM through CAD and CNC machining. Create your own design from
	//       start to finish — no prior experience required!
	//     </p>
	//   ),
	// },
	// {
	//     title: "STEM Workshop #2",
	//     day: 21,
	//     month: "Dec",
	//     year: 2025,
	//     desc: "Learn about the wonders of CAD & CNC machining in this hands-on workshop.",
	//     tags: ["CNC", "CAD", "CAM"],
	//     difficulty: 3,
	//     startTime: 2,
	//     duration: 2,
	//     endTime: 4,
	//     ampm: 'pm',
	//     materials: ["Water Bottle"],
	//     ageGroup: "10-12",
	//     expandedContent: () => (
	//         <p className="text-white leading-relaxed text-base">
	//         Join us for an exciting, hands-on workshop that introduces middle school students
	//         to the world of STEM through CAD and CNC machining. Create your own design from
	//         start to finish — no prior experience required!
	//         </p>
	//     ),
	// },
	// {
	//     title: "STEM Workshop #3",
	//     day: 5,
	//     month: "Jan",
	//     year: 2026,
	//     desc: "Learn about the wonders of CAD & CNC machining in this hands-on workshop.",
	//     tags: ["CNC", "CAD", "CAM"],
	//     difficulty: 3,
	//     startTime: 2,
	//     duration: 2,
	//     endTime: 4,
	//     ampm: 'pm',
	//     materials: ["Water Bottle"],
	//     ageGroup: "10-12",
	//     expandedContent: () => (
	//         <p className="text-white leading-relaxed text-base">
	//         Join us for an exciting, hands-on workshop that introduces middle school students
	//         to the world of STEM through CAD and CNC machining. Create your own design from
	//         start to finish — no prior experience required!
	//         </p>
	//     ),
	// },
	// {
	//     title: "STEM Workshop #4",
	//     day: 21,
	//     month: "Feb",
	//     year: 2026,
	//     desc: "Learn about the wonders of CAD & CNC machining in this hands-on workshop.",
	//     tags: ["CNC", "CAD", "CAM"],
	//     difficulty: 3,
	//     startTime: 2,
	//     duration: 2,
	//     endTime: 4,
	//     ampm: 'pm',
	//     materials: ["Water Bottle"],
	//     ageGroup: "10-12",
	//     expandedContent: () => (
	//         <p className="text-white leading-relaxed text-base">
	//         Join us for an exciting, hands-on workshop that introduces middle school students
	//         to the world of STEM through CAD and CNC machining. Create your own design from
	//         start to finish — no prior experience required!
	//         </p>
	//     ),
	// },
	//   .filter((event:any) => {
	//     // filter out past events
	//     const eventMonthNum = monthMap[event.month];
	//     if (eventMonthNum > currentMonth) return true;
	//     if (event.year > currentYear) return true;
	//     if (event.year === currentYear && eventMonthNum === currentMonth && event.day >= currentDay) return true;
	//     return false;
	//   });
	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.1, duration: 0.4 },
		}),
	};

	return (
		<div className="w-full h-1/2 bg-darkBlue px-6 md:pl-20 py-12 flex">
			{/* Page Header */}
            <div className='flex flex-col w-1/2'>
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
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
            <div className='flex flex-col w-1/2'>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <div className="text-center sm:text-left mb-6 sm:mb-0">
                        <h1 className="text-4xl font-extrabold text-white">FRC Team Bookings</h1>
                        <p className="text-white/70 text-sm mt-2">
                            See who is coming to STEM Lab!
                        </p>
                    </div>
                    <TimeslotModal />
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
                        timeslots.map((slot, i) => (
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
                        ))
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
