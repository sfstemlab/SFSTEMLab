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

const fadeIn = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: 'easeOut' },
  },
});

export default function Home() {
  const sections = [
    {
      title: 'Explore Hands-on STEM Workshops',
      desc: `We offer hands-on workshops for elementary and middle school students — even beginners with no prior STEM experience. Each session builds practical understanding and sparks curiosity through creative exploration.`,
      img: '/images/tools.png',
      link: '/events',
      linkText: 'Sign Up Now',
      reverse: false,
    },
    {
      title: 'Mentorship and Collaborative Learning',
      desc: `Our student mentors and community professionals guide learners through each activity, fostering collaboration and problem-solving while helping students discover the joy of teamwork and innovation.`,
      img: '/images/wiring.png',
      link: '/about',
      linkText: 'Learn More',
      reverse: true,
    },
    {
      title: 'Free and Accessible for All',
      desc: `Our workshops are completely free and open to all. SF STEM Lab is dedicated to making quality STEM education accessible — inspiring the next generation of innovators, thinkers, and problem-solvers.`,
      img: '/images/homePage_Image2.png',
      link: '/donate',
      linkText: 'Donate',
      reverse: false,
    },
  ];


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
		<motion.div className="w-full h-1/2 bg-darkBlue px-6 md:px-20 py-12">
			<div className="flex items-center justify-between md:space-x-8 mb-12">
				<h1 className="text-xl md:text-4xl font-black text-center">
					We are a{' '}
					<mark className="bg-cardColor  rounded-md pb-1 px-2 text-white underline decoration-dashed decoration-redBrand underline-offset-4 transition duration-300">
						student-led
					</mark>{' '}
					collective of{' '}
					<mark className="bg-cardColor rounded-md pb-1 px-2 text-white underline decoration-dashed decoration-redBrand underline-offset-4 transition duration-300">
						FIRST Robotics Competition
					</mark>{' '}
					(FRC) teams based out of{' '}
					<mark className="bg-cardColor rounded-md pb-1 px-2 text-white underline decoration-dashed decoration-redBrand underline-offset-4 transition duration-300">
						public schools
					</mark>{' '}
					in San Francisco
				</h1>
			</div>

			<div className="flex flex-col items-center justify-between md:space-x-8 mb-12">
                {sections.map((section:any, idx: number) => (
                    <motion.section
                        key={section.title}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{once:true}}
                        // variants={fadeIn(idx * 0.2)}
                        className={`flex flex-col md:flex-row ${section.reverse? 'md:flex-row-reverse' : ''} items-center justify-between mb-12`}
                    >
                        <div className="flex-1 text-center md:text-left space-y-2 px-4">
                            <h2 className='text-3xl md:text-4xl font-extrabold text-center md:text-left mb-3 text-white'>
                                {section.title}
                            </h2>
                            <p className='text-xl text-center md:text-left w-full'>
                                {section.desc}
                            </p>
                            <div className="pb-6">
                                <LinkButton href={section.link} title={section.linkText} />
                            </div>
                        </div>
                        <div className={`flex-1 flex justify-center ${section.reverse ? 'md:justify-start' : 'md:justify-end'}`}>
                            <motion.img
                                src={section.img}
                                alt={section.title}
								className="rounded-2xl w-[320px] md:w-[400px] h-[320px] md:h-[400px] object-cover border-2 border-brand shadow-[0_0_25px_rgba(255,255,255,0.05)]"
                                whileHover={{
                                    scale: 1.03
                                }}
                                transition={{
                                    duration:0.3
                                }}
                            />
                        </div>
					</motion.section>
                ))}
                </div>
		</motion.div>
	);
}
