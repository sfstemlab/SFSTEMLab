'use client';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Variants, Transition } from 'framer-motion';
import Navbar from '@/components/navbar';
import LinkButton from '@/components/linkButton';
import PageTitle from '@/components/pageTitle';
import Newsletter from '@/components/newsletter';
import { Quote } from 'lucide-react';


type BackgroundVariants = Variants & {
	hidden: { backgroundPosition: string };
	visible: {
		backgroundPosition: string;
		transition: Transition & {
			repeat?: number;
			repeatType?: 'loop' | 'reverse' | 'mirror';
		};
	};
};

export default function Home() {
	const desc1 = `We offer hands-on workshops for elementary and middle
        school students of skill levels — even beginners with
        no prior STEM experience. The workshops are designed
        to give students practical experience and a deeper understanding of how
        technology works, and encourage curiosity and creativity.`;

	const desc2 = `Our student mentors and professionals from the community
        play a key role in teaching the workshops by sharing their expertise and
        guiding students through the activites. This
        environment provides students with valuable skills and teaches the
        importance of teamwork, problem-solving, and working wtih others
        toward a common goal.`;

	const desc3 = `Our workshops are entirely free and open to all. We 
        are commited to ensuring that students from all backgrounds have 
        the opportunity to explore and create with STEM. SF STEM Lab aims 
        to make high-quality STEM education available to a wider audience, 
        helping to inspire the next generation of innovators, thinkers, 
        and problem-solvers.`;

	const backgroundVariants: BackgroundVariants = {
		hidden: { backgroundPosition: '0% 50%' },
		visible: {
			backgroundPosition: '100% 50%',
			transition: {
				duration: 10,
				repeat: Infinity,
				repeatType: 'mirror',
			},
		},
	};

	return (
		<div className="main-section md:px-32 md:py-24">
			<div className="flex items-center justify-between md:space-x-8 mb-12">
				<h1 className="text-4xl font-black text-center">
					We are a{' '}
					<mark className="text-brand bg-transparent hover:bg-cardColor hovver:border border-brand rounded-md pb-1 px-2 hover:text-white hover:underline decoration-dashed decoration-redBrand underline-offset-4 transition duration-300">
						student-led
					</mark>{' '}
					collective of{' '}
					<mark className="text-brand bg-transparent hover:bg-cardColor hovver:border border-brand rounded-md pb-1 px-2 hover:text-white hover:underline decoration-dashed decoration-redBrand underline-offset-4 transition duration-300">
						FIRST Robotics Competition
					</mark>{' '}
					(FRC) teams based out of{' '}
					<mark className="text-brand bg-transparent hover:bg-cardColor hovver:border border-brand rounded-md pb-1 px-2 hover:text-white hover:underline decoration-dashed decoration-redBrand underline-offset-4 transition duration-300">
						public schools
					</mark>{' '}
					in San Francisco
				</h1>
			</div>
			<div className="flex items-center justify-between md:space-x-8 mb-12">
				<div className="flex flex-col items-center md:items-start">
					<p className="text-4xl font-extrabold text-center md:text-left mb-3 text-white">
						Explore Hands-on STEM Workshops
					</p>
					<p className="text-xl text-center md:text-left w-full ">{desc1}</p>
					<LinkButton href="/events" title="Sign Up Now" />
				</div>
                <img
                    src='/images/gearSVG.svg'
                    className='hidden'
                />
				<img
					src="/images/tools.png"
					className="bg-redBrand rounded-full w-80 h-80 object-cover hidden md:block"
				/>
			</div>
			<div className="flex items-center justify-between md:space-x-8 mb-12">
				<img
					src="/images/wiring.png"
					className="rounded-full w-80 h-80 object-cover hidden md:block"
				/>
				<div className="flex flex-col items-center md:items-end">
					<p className="text-4xl font-extrabold text-center md:text-right mb-3 text-white">
						Mentorship and Collaborative Learning
					</p>
					<p className="text-xl text-center md:text-end w-full md:w-5/6">{desc2}</p>
					<LinkButton href="/about" title="Learn More" />
				</div>
			</div>

			<div className="flex items-center justify-between md:space-x-8 mb-12">
				<div className="flex flex-col items-center md:items-start">
					<p className="text-4xl font-extrabold text-center mb-3 text-white">
						Free and Accesible for All
					</p>
					<p className="text-xl text-center md:text-left w-full md:w-5/6">{desc3}</p>

					<LinkButton href="/events" title="Donate" />
				</div>
				<img
					src="/images/homePage_Image2.png"
					className="rounded-full w-80 h-80 object-cover hidden md:block"
				/>
			</div>
			<Newsletter />
		</div>
	);
}
