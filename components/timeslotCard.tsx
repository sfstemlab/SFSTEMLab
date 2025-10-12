'use client';
import Image from 'next/image';
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '../hooks/use-outside-click';
import Tag from './tag';
import { Calendar, Clock, MoveRight, X } from 'lucide-react';
import Link from 'next/link';
import DifficultyIndicator from './diffucultyIndicator';

interface CreateTimeslotProps {
	title: string;
	desc: string;
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
	const id = useId();
	const ref = useRef<HTMLDivElement>(null);

	const formattedDate = new Date(slot.date).toLocaleDateString('en-us', {
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
									<motion.h3 className="font-extrabold underline text-redBrand text-2xl text-left pl-2">
										{active.title}
									</motion.h3>
									<div className="flex space-x-1">
                                        <div className="mr-2 rounded-l-md bg-brand/60  text-redBrand py-1 px-3 items-center text-center flex cursor-default">
                                            <h2 className="font-extrabold text-lg">
												{formattedDate}
											</h2>
                                        </div>
										<div className="mr-2 rounded-r-md bg-brand/60  text-redBrand py-1 px-3 items-center text-center flex cursor-default">
											<h2 className="font-extrabold text-lg">
												{slot.startTime} - {slot.endTime}
											</h2>
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
										{slot.desc}
									</motion.div>
								</div>
							</div>
						</motion.div>
					</div>
				) : null}
			</AnimatePresence>
			{/* card */}
			<motion.div
				whileHover={{ y: -6 }}
				transition={{ duration: 0.2 }}
				onClick={() => setActive(slot)}
				className="group relative bg-cardColor border-2 border-brand hover:border-redBrand/80 rounded-xl p-5 cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full mx-auto"
			>
				<h3 className="text-xl font-semibold text-redBrand mb-2 group-hover:text-redBrand/90 transition">
					{slot.title}
				</h3>

				<p className="text-sm text-white/80 line-clamp-3 mb-4">{slot.desc}</p>

				<div className="flex items-center justify-between">
					<span className="flex text-xs text-redBrand tracking-wide gap-2 bg-brand/60 rounded-md px-3 py-2 font-bold">
						<Calendar className="w- h-4" />
						{formattedDate}
					</span>
					<span className="flex text-xs text-redBrand tracking-wide gap-2 bg-brand/60 rounded-md px-3 py-2 font-bold">
						<Clock className="w-4 h-4" />
						{slot.startTime} - {slot.endTime}
					</span>
				</div>
			</motion.div>
		</>
	);
}
