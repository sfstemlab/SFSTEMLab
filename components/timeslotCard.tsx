'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '../hooks/use-outside-click';
import Tag from './tag';
import { Calendar, Clock, X } from 'lucide-react';

interface CreateTimeslotProps {
	purpose?: string;
	teamNum?: number;
	date: Date;
	startTime: number;
	endTime: number;
}

interface TimeslotCardProps {
	slot: CreateTimeslotProps;
}

export function TimeslotCard({ slot }: TimeslotCardProps) {
	const [active, setActive] = useState<CreateTimeslotProps | boolean | null>(null);
	const ref = useRef<HTMLDivElement>(null);

	const formattedDate = new Date(slot.date).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
	});

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setActive(false);
			}
		}

		if (active && typeof active === 'object') {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [active]);

	useOutsideClick(ref, () => setActive(null));

	function formatTime(time: number) {
		const period = time >= 12 ? 'pm' : 'am'; 
		const hour = time % 12 === 0 ? 12 : time % 12; 
		return `${hour} ${period}`;
	}

	

	return (
		<>
			<AnimatePresence>
				{active && typeof active === 'object' && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/40 h-full w-full z-10 backdrop-blur-sm"
					/>
				)}
			</AnimatePresence>
			{/* Pop-up */}
			<AnimatePresence>
				{active && typeof active === 'object' ? (
					<div className="fixed inset-0 grid place-items-center z-[100] p-4">
                        <motion.div
                            ref={ref}
                            className="w-full max-w-[600px] max-h-[85vh] flex flex-col bg-cardColor-light border-2 border-brand backdrop-blur-lg rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
							<div className="flex flex-col min-h-0 py-4">
								<header className="flex flex-wrap justify-between gap-2 w-full px-4 pb-2 items-start">
									<motion.h3 className="font-extrabold underline text-redBrand text-2xl text-left pl-2 break-words min-w-0 flex-1">
										Reservation by team {slot.teamNum ?? 'Unknown'}
									</motion.h3>
									<div className="flex flex-wrap gap-2">
                                        <div className="rounded-md bg-brand/60 text-redBrand py-1 px-3 items-center text-center flex cursor-default whitespace-nowrap">
                                            <h2 className="font-extrabold text-md">
												{formattedDate}
											</h2>
                                        </div>
										<div className="rounded-md bg-brand/60 text-redBrand py-1 px-3 items-center text-center flex cursor-default whitespace-nowrap">
											<h2 className="font-extrabold text-md">
												{formatTime(slot.startTime)} - {formatTime(slot.endTime)}
											</h2>
										</div>
										<button
											className="flex items-center justify-center rounded-md p-1.5 bg-brand/60 text-white font-black"
											onClick={() => setActive(false)}
										>
											<X />
										</button>
									</div>
								</header>

								<div className="relative px-4 mb-6 min-h-0 flex-1">
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="px-1 h-full flex flex-col items-start overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] break-words"
									>
										{slot.purpose}
									</motion.div>
								</div>
							</div>
						</motion.div>
					</div>
				) : null}
			</AnimatePresence>
			{/* card */}
			<motion.div
				whileHover={{ scale: 1.05 }}
				transition={{ duration: 0.2 }}
				onClick={() => setActive(slot)}
				className="group relative bg-cardColor border-2 border-brand rounded-xl p-5 cursor-pointer shadow-md hover:shadow-lg transition duration-300 max-w-sm w-full mx-auto"
			>
				<h3 className="text-xl font-semibold text-redBrand mb-2 break-words">
					Reservation by team {slot.teamNum}
                </h3>

				<p className="text-sm text-white/80 mb-4 break-words">{slot.purpose}</p>

				<div className="flex flex-wrap gap-2 mb-2">
                    <Tag value='FRC Booking' />
                </div>
                <div className='flex flex-wrap justify-end gap-2'>
                    <span className="flex text-sm text-redBrand tracking-wide gap-2 bg-brand/60 rounded-md px-3 py-2 font-bold whitespace-nowrap">
                        <Calendar className="w-4 h-4" />
                        {formattedDate}
                    </span>
                    <span className="flex text-sm text-redBrand tracking-wide gap-2 bg-brand/60 rounded-md px-3 py-2 font-bold whitespace-nowrap">
                        <Clock className="w-4 h-4" />
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </span>
				</div>
			</motion.div>
		</>
	);
}
