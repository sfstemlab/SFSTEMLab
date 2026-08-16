'use client';
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '../hooks/use-outside-click';
import { Calendar, Clock, MoveRight, X } from 'lucide-react';
import Link from 'next/link';
import Tag from './tag';
import { EventProps } from '@/types/types';

interface CardProps {
	event: EventProps;
}

export function Card({ event }: CardProps) {
	const [active, setActive] = useState<EventProps | boolean | null>(null);
	const id = useId();
	const ref = useRef<HTMLDivElement>(null);

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
			{/* Backdrop */}
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

			{/* Modal */}
			<AnimatePresence>
				{active && typeof active === 'object' ? (
					<div className="fixed inset-0 grid place-items-center z-[100]">
						<motion.div
							ref={ref}
							className="absolute top-[200px] w-full max-w-[600px] h-[460px] flex flex-col bg-cardColor border-2 border-brand backdrop-blur-lg sm:rounded-2xl"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							<div className="items-center py-4">
								{/* Header */}
								<header className="flex justify-between w-full px-4 pb-2 items-center">
									<motion.h3 className="font-extrabold underline text-redBrand text-2xl text-left pl-2">
										{active.title}
									</motion.h3>
									<div className="flex">
										<div className="mr-2 rounded-l-md bg-brand/60 text-redBrand py-1 px-3 items-center text-center flex cursor-default">
											<h2 className="font-extrabold text-lg tracking-wide">
												{event.month} {event.day}
											</h2>
										</div>
										<div className="rounded-r-md bg-brand/60 text-redBrand py-1 px-3 items-center text-center flex cursor-default">
											<h2 className="font-extrabold text-lg tracking-wide">
												{event.duration}
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

								{/* Body */}
								<div className="relative px-4 mb-6">
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="px-1 h-80 flex flex-col items-start overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
									>
										{active.expandedContent()}
									</motion.div>
								</div>

								{/* Footer */}
								<footer className="flex justify-between items-center w-full px-4">
									<div className="flex space-x-2">
										{event.tags?.map((tag, index) => (
											<Tag key={index} value={tag} />
										))}
									</div>
									<Link
										href={`/signup/${event.title}`}
										className="bg-brand/50 shadow shadow-brand/20 hover:scale-105 transition duration-150 py-1 px-3 rounded-md flex space-x-2 items-center"
									>
										<h1 className="text-lg text-redBrand font-semibold">Sign Up</h1>
										<MoveRight className="w-5 h-5 text-redBrand" />
									</Link>
								</footer>
							</div>
						</motion.div>
					</div>
				) : null}
			</AnimatePresence>

			{/* Card */}
			<motion.div
				whileHover={{ scale: 1.05 }}
				transition={{ duration: 0.2 }}
				onClick={() => setActive(event)}
				className="group relative bg-cardColor border-2 border-brand rounded-xl p-5 cursor-pointer shadow-md hover:shadow-lg transition duration-300 max-w-sm w-full mx-auto"
			>
				<h3 className="text-xl font-semibold text-redBrand mb-2">{event.title}</h3>
				<p className="text-sm text-white/80 line-clamp-3 mb-4">{event.desc}</p>

                <div className='flex space-x-2 mb-2'>
                    {event.tags && event.tags.map((tag:string, key:number) => 
                        <Tag value={tag} key={key}/>
                    )}
                </div>
                <div className='flex justify-between'>
                    <div className=" flex items-center justify-between space-x-2">
                        <span className="flex text-sm text-redBrand gap-2 bg-brand/60 rounded-md px-2 py-2 font-bold h-8 text-center items-center">
                            <Calendar className="w-4 h-4" />
                            {event.month} {event.day}
                        </span>
                        <span className="flex text-sm text-redBrand gap-2 bg-brand/60 rounded-md px-2 py-2 font-bold h-8 text-center items-center">
                            <Clock className="w-4 h-4" />
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </span>
                    </div>
                </div>
			</motion.div>
		</>
	);
}
