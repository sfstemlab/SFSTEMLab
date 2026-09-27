'use client';
import React, { useEffect, useRef, useState } from 'react';
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
		return () => {
			window.removeEventListener('keydown', onKeyDown);
			document.body.style.overflow = 'auto';
		};
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
					<div className="fixed inset-0 grid place-items-center z-[100] p-4">
						<motion.div
							ref={ref}
							className="w-full max-w-[600px] max-h-[85vh] flex flex-col bg-cardColor border-2 border-brand backdrop-blur-lg rounded-2xl overflow-hidden"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							<div className="flex flex-col min-h-0 py-4">
								{/* Header */}
								<header className="flex flex-wrap justify-between gap-2 w-full px-4 pb-2 items-start">
									<motion.h3 className="font-extrabold underline text-redBrand text-2xl text-left pl-2 break-words min-w-0 flex-1">
										{active.title}
									</motion.h3>
									<div className="flex flex-wrap gap-2">
										<div className="rounded-md bg-brand/60 text-redBrand py-1 px-3 items-center text-center flex cursor-default whitespace-nowrap">
											<h2 className="font-extrabold text-lg tracking-wide">
												{event.month} {event.day}
											</h2>
										</div>
										<div className="rounded-md bg-brand/60 text-redBrand py-1 px-3 items-center text-center flex cursor-default whitespace-nowrap">
											<h2 className="font-extrabold text-lg tracking-wide">
												{formatTime(event.startTime)} - {formatTime(event.endTime)}
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

								{/* Body */}
								<div className="relative px-4 mb-6 min-h-0 flex-1">
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="px-1 h-full flex flex-col items-start overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
									>
										<p className="text-white leading-relaxed text-base break-words">
											{active.expandedContent || active.desc}
										</p>
									</motion.div>
								</div>

								{/* Footer */}
								<footer className="flex flex-wrap justify-between items-center gap-2 w-full px-4">
									<div className="flex flex-wrap gap-2">
										{event.tags?.map((tag, index) => (
											<Tag key={index} value={tag} />
										))}
									</div>
									<Link
										href={`/signup/${event.id}`}
										className="bg-brand/50 shadow shadow-brand/20 hover:scale-105 transition duration-150 py-1 px-3 rounded-md flex space-x-2 items-center whitespace-nowrap"
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
				<h3 className="text-xl font-semibold text-redBrand mb-2 break-words">{event.title}</h3>
				<p className="text-sm text-white/80 line-clamp-3 mb-4 break-words">{event.desc}</p>

                <div className='flex flex-wrap gap-2 mb-2'>
                    {event.tags && event.tags.map((tag:string, key:number) =>
                        <Tag value={tag} key={key}/>
                    )}
                </div>
                <div className='flex flex-wrap gap-2'>
                    <span className="flex text-sm text-redBrand gap-2 bg-brand/60 rounded-md px-2 py-2 font-bold h-8 text-center items-center whitespace-nowrap">
                        <Calendar className="w-4 h-4" />
                        {event.month} {event.day}
                    </span>
                    <span className="flex text-sm text-redBrand gap-2 bg-brand/60 rounded-md px-2 py-2 font-bold h-8 text-center items-center whitespace-nowrap">
                        <Clock className="w-4 h-4" />
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </span>
                </div>
			</motion.div>
		</>
	);
}
