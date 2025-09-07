'use client';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { Transition, Variants, motion } from 'framer-motion';

import Navbar from '@/components/navbar';
import Link from 'next/link';
import { Timeline } from '@/components/timeline';
import { Dot, MoveLeft, MoveRight } from 'lucide-react';

import PageTitle from '@/components/pageTitle'
import CollaboratorsAccordion from '@/components/collaboratorsAccordion';
interface Person {
    name: string;
    picture: string;
    bio?: string;
    titles?: string[];
    email?: string;
    open: Boolean;
}

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

const data = [
    {
        title: 'Febuary-March 2025',
        content: (
            <div className="rounded-md bg-cardColor border-2 border-brand items-center hover:bg-cardColor-light text-white transition duration-700 ease-in-out">
                <div className="flex mb-2 mt-1">
                    <Dot className="stroke-2" />
                    <p className="text-md font-semibold">Robotics demonstrations</p>
                </div>
                <div className="flex my-2">
                    <Dot className="stroke-2" />
                    <p className="text-md font-semibold">Two STEM Workshops per month</p>
                </div>
                <div className="flex my-2">
                    <Dot className="stroke-2" />
                    <p className=" text-md font-semibold">
                        Community invite to robotics competitions
                    </p>
                </div>
                <div className="flex mt-2 mb-1">
                    <Dot className="stroke-2" />
                    <p className=" text-md font-semibold">
                        Continued outreach and recruitment
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: 'April-May 2025',
        content: (
            <div className="rounded-md bg-cardColor border-2 border-brand items-center hover:bg-cardColor-light text-white transition duration-700 ease-in-out">
                <div className="flex mb-2 mt-1">
                    <Dot className="stroke-2" />
                    <p className=" text-md font-semibold">Robotics demonstrations</p>
                </div>
                <div className="flex my-2">
                    <Dot className="stroke-2" />
                    <p className=" text-md font-semibold">
                        Two full-day STEM Workshops per month
                    </p>
                </div>
                <div className="flex my-2">
                    <Dot className="stroke-2" />
                    <p className=" text-md font-semibold">
                        Continued outreach and recruitment
                    </p>
                </div>
                <div className="flex mt-2 mb-1">
                    <Dot className="stroke-2" />
                    <p className=" text-md font-semibold">Workshop planning</p>
                </div>
            </div>
        ),
    },
    {
        title: 'Summer 2025',
        content: (
            <div className="rounded-md bg-cardColor border-2 border-brand items-center hover:bg-cardColor-light text-white transition duration-700 ease-in-out">
                <div className="flex m-2">
                    <p className="text-md font-semibold">Possible Program TBD</p>
                </div>
            </div>
        ),
    },
];

const About = () => {
    const ref = useRef(null);
    const teamContainerRef = useRef<HTMLDivElement>(null);
    const collaboratorsContainerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    const people: Person[] = [
        {
            name: 'Daniel Linhardt',
            picture: '@/../images/DanielLinhardt.png',
            bio: ``,
            titles: ['Previous President - SOTA Cyberdragons', 'Project Leader'],
            email: 'daniel@team5700.org',
            open: false,
        },
        {
            name: 'Benjamin Thayer',
            picture: '',
            bio: ``,
            titles: ['President - Galileo Robotics', 'Project Leader'],
            email: 'example2@sfstemlab.org',
            open: false,
        },
        {
            name: 'Katharine Kasperski',
            picture: '',
            bio: ``,
            titles: ['Outreach - CardinalBotics', 'Project Leader'],
            email: 'example3@sfstemlab.org',
            open: false,
        },
        {
            name: 'Mario Romero Barbieri',
            picture: '',
            bio: '',
            titles: ['Member - SOTA Cyberdragons'],
            email: 'mario@team5700.org',
            open: false,
        },
        {
            name: 'Santiago Reid',
            picture: '',
            bio: '',
            titles: ['President - SOTA Cyberdragons'],
            email: 'santi@team5700.org',
            open: false,
        },
        {
            name: 'Tyler Chew',
            picture: '',
            bio: '',
            titles: ['Member - SOTA Cyberdragons'],
            email: 'tyler@team5700.org',
            open: false,
        },
        {
            name: 'Zoe Arkin',
            picture: '',
            bio: '',
            titles: ['Member - SOTA Cyberdragons'],
            email: 'zoe@team5700.org',
            open: false,
        },
        {
            name: 'Sam Lako-Cave',
            picture: '',
            bio: '',
            titles: ['Member - SOTA Cyberdragons'],
            email: 'sam@team5700.org',
            open: false,
        },
        {
            name: 'August White',
            picture: '@/../images/AugustBioPhoto.png',
            bio: "Hi! I'm a 15-year-old high school student and lover of all things STEAM. WhenI can, I love to read, draw, and code websites, as well as play Dungeons and Dragons and other role-playing games with my friends. I'm excited to continue bringing STEM education to new places, and teaching the younger generation more about the wonders of computers and machines.",
            titles: ['Software Development Lead - SOTA Cyberdragons'],
            email: 'august@team5700.org',
            open: false,
        },
        {
            name: 'Carter Benson',
            picture: '',
            bio: '',
            titles: ['Buisness Lead - SOTA Cyberdragons'],
            email: 'carter@team5700.org',
            open: false
        },
        {
            name: 'Ember Ximm',
            picture: '@/../images/EmberPFP.png',
            bio: "I'm a 17 year old high school student and visual artist living in San Francisco, interested in pursuing robotics, science, math, programming and engineering opportunities. As an older sister and babysitter, I'm also super excited to bring more STEM education to elementary and middle schools in the district.",
            titles: ['Mechanical Engineering Lead - SOTA Cyberdragons'],
            email: 'ember@team5700.org',
            open: false,
        },
        {
            name: 'Maxwell Liu',
            picture: '',
            bio: '',
            titles: ['President - CardinalBotics'],
            email: '',
            open: false,
        },
        {
            name: 'Maelys Kerherve',
            picture: '',
            bio: '',
            titles: ['Media Lead - SOTA Cyberdragons'],
            email: 'maelys@team5700.org',
            open: false
        },
        {
            name: 'Derrick Lam',
            picture: '',
            bio: '',
            titles: ['Member - CardinalBotics'],
            email: '',
            open: false,
        },
        {
            name: 'Faye Yang',
            picture: '',
            bio: "I am a junior at Lowell High School and passionate about robotics, piano, and journalism. I'm excited to teach and introduce students to STEM and help them discover their interests.",
            titles: ['President - CardinalBotics'],
            email: 'faye.yang@team4159.org',
            open: false,
        },
        {
            name: 'Mia Ly',
            picture: '',
            bio: '',
            titles: ['Member - Galileo Robotics'],
            email: '',
            open: false,
        },
        {
            name: 'Roman Lopez',
            picture: '',
            bio: '',
            titles: ['Member - Galileo Robotics'],
            email: '',
            open: false,
        },
        {
            name: 'Davia Ferree',
            picture: '',
            bio: '',
            titles: ['Member - Galileo Robotics'],
            email: '',
            open: false,
        },
        {
            name: 'Alvin He',
            picture: '',
            bio: '',
            titles: ['Member - Galileo Robotics'],
            email: '',
            open: false,
        },
        {
            name: 'Bryan Cooley',
            picture: '',
            bio: '',
            titles: ['Mentor', 'Coach - CardinalBotics', 'Physics Teacher'],
            email: '',
            open: false,
        },
        {
            name: 'Danny Tan',
            picture: '',
            bio: '',
            titles: ['Mentor', 'Coach - Galileo Robotics', 'Computer Science Teacher'],
            email: '',
            open: false,
        },
        {
            name: 'Francisco Hernandez',
            picture: '',
            bio: '',
            titles: ['Coach - SOTA Cyberdragons', 'Science Teacher'],
            email: '',
            open: false,
        },
        {
            name: 'John Hajel',
            picture: '',
            bio: '',
            titles: ['Coach - Washington Robotics', 'Computer Science Teacher'],
            email: '',
            open: false,
        },
    ];

    const [expandedProfile, setExpandedProfile] = useState<Person>(people[0]);


    const collaborators: Person[] = [
        {
            name: 'SOTA Cyberdragons',
            picture: '../../images/CyberdragonsLogoSmall.png',
            bio: 'The SOTA Cyberdragons, also known as Team 5700, is a FIRST robotics team based out of Ruth Asawa School of the Arts in San Francisco, California. As one of the few robotics teams based out art schools, the SOTA Cyberdragons strive to incorporate their artistic talent into the robots they create.',
            open: false,
        },
        {
            name: 'CardinalBotics',
            picture: '../../images/CardinalBoticsLogo.png',
            bio: 'CardinalBotics, also known as Team 4159, is a FIRST Robotics team based out of Lowell High School in San Francisco. As the oldest FRC team in the city, CardinalBotics strives to support other teams and promote equal access to STEM education and resources throughout the community.',
            open: false,
        },
        {
            name: 'Robotic Eagles',
            picture: '../../images/RoboticEaglesLogo.png',
            open: false,
        },
        {
            name: 'Galileo Robotics',
            picture: '../../images/GalileoRoboticsLogo.png',
            open: false,
        },
    ];

    function getImportance(person: Person): number {
        if (person.titles && person.titles !== undefined){
            const titleString = person.titles.join(' ').toLowerCase();
    
            if (titleString.includes('project lead')) return 1;
            if (titleString.includes('president')) return 2;
            if (titleString.includes('lead')) return 3
            if (titleString.includes('coach') || titleString.includes('mentor')) return 4;
            return 5;
        } else return 6
    }

    // Sort people by importance
    people.sort((a, b) => getImportance(a) - getImportance(b));

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

            <div className="main-section">
                <div className='flex flex-col md:flex-row'>
                    {/* 2/3 of screen */}
                    <div className='flex flex-col w-full md:w-2/3 md:pr-10'>
                        {/* Left/right buttons */}
                        <div className="flex items-center justify-around  ">
                            <div className="hidden md:block items-center justify-center space-x-2 w-1/3">
                                <button
                                    className="text-white py-1 px-3 rounded-2xl items-center border-2 border-brand bg-cardColor hover:bg-cardColor-light transition duration-700 ease-in-out"
                                    onClick={() =>
                                        teamContainerRef.current?.scrollBy({
                                            left: -300,
                                            behavior: 'smooth',
                                        })
                                    }
                                >
                                    <MoveLeft />
                                </button>
                                <button
                                    className="text-white py-1 px-3 rounded-2xl items-center border-2 border-brand bg-cardColor hover:bg-cardColor-light transition duration-700 ease-in-out"
                                    onClick={() =>
                                        teamContainerRef.current?.scrollBy({
                                            left: 300,
                                            behavior: 'smooth',
                                        })
                                    }
                                >
                                    <MoveRight />
                                </button>
                            </div>
                            <h2 className="font-extrabold text-center text-4xl mb-4 w-1/2">Our Team</h2>
                        </div>
                        { /* People section */}
                        <div
                            className="rounded-md flex overflow-x-scroll no-scrollbar space-x-3 md:mx-8 py-4"
                            ref={teamContainerRef}
                        >
                            {people.length > 0 &&
                                people.map((person, index) => (
                                    <button
                                        key={index}
                                        className={cn(
                                            'min-w-[350px] md:min-w-[400px] max-w-[400px] h-24 items-center space-x-5 py-2 pl-2 pr-1 rounded-md mb-2 flex border-2 border-brand-dark transition duration-700 ease-in-out justify-center',
                                            expandedProfile && expandedProfile.name == person.name ? 'bg-brand/90 hover:bg-brand-light/80 text-darkBlue' : 'bg-cardColor hover:bg-cardColor-light text-white'
                                        )}
                                        onClick={() => setExpandedProfile(person)}
                                    >
                                        <img
                                            width={115}
                                            height={115}
                                            src={person.picture}
                                            alt={person.name}
                                            className='rounded-full object-cover'
                                        />
                                        <div className="">
                                            <h3 className="font-bold text-lg text-left">
                                                {person.name}
                                            </h3>
                                            <h4 className="text-sm text-left">
                                                {person.titles?.join(', ')}
                                            </h4>
                                        </div>
                                    </button>
                                ))}
                        </div>
                        {expandedProfile !== undefined && expandedProfile.bio && (
                            /* Expanded Profile Section */
                            <div className="text-center mt-4 mb-9 items-center w-full flex flex-col p-4 md:p-0">
                                <p className="text-lg text-center">{expandedProfile.bio}</p>
                                <h5 className="flex text-center text-redBrand font-bold mt-4 text-xl cursor-pointer py-1 px-2 rounded-md bg-brand/60 hover:bg-brand/80 transition duration-300">
                                    {expandedProfile.email}
                                </h5>
                            </div>
                        )}
                        <div className="px-6 md:px-0"> { /* Mission section */}
                            <h3 className="text-left font-extrabold text-4xl mb-2">Our Mission</h3>
                            <p className="text-left text-xl text-brand">
                                Our mission is to provide a community STEM hub by hosting
                                interactive robotics demonstrations and hands-on workshops that
                                promote STEM education, drawing interest from students, families,
                                and the broader community. The SF STEM Lab enables high school
                                students to mentor younger students (particularly those underserved
                                in STEM education, robotics, and engineering), fostering a learning
                                environment that benefits both mentors and mentees.
                            </p>
                        </div>
                        <div className="mt-4">
                            {/* Our need */}
                            <div className="flex items-center justify-center flex-col w-full px-6 md:px-0">
                                <h2 className="text-left w-full font-extrabold text-4xl mb-2">Our Need</h2>
                                <p className="text-left text-xl text-brand">
                                    The SF STEM Lab is seeking a practical yet versatile space of approximately 3,100 square feet to support our diverse educational programs and growing community engagement. This space would be large enough to comfortably host events, demonstrations, and interactive presentations, providing participants with room to move and engage fully. At the same time, it would allow us to set up a dedicated area for hands-on workshops and learning activities. With this space, we can create an inviting and dynamic environment where curiosity, collaboration, and innovation in STEM can truly thrive.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* 1/3 of screen */}
                    <div className="flex flex-col w-full md:w-1/3">
                        {/* Section title */}
                        <h2 className="text-center items-center w-full font-extrabold text-4xl mb-4">
                            Our Collaborators
                        </h2>
                        <CollaboratorsAccordion collaborators={collaborators} />
                        <div className="mt-6 md:mt-0 px-6 md:px-0"> { /* Vision section */}
                            <h3 className="text-left font-extrabold text-4xl mb-2">Our Vision</h3>
                            <p className="text-left text-xl text-brand">
                                Our vision is for a long term space that students can rely on for
                                free STEM enrichment and education. We want to foster a space that
                                local robotics teams can use for practice, collaboration, and
                                comunity service.
                            </p>
                        </div>
                    </div>
                </div>
                <Timeline data={data} />
            </div>
    );
};

export default About;
