'use client';
import React, { useState } from 'react';
import { Timeline } from '@/components/timeline';
import CommunityHeart, { HeartPerson } from '@/components/communityHeart';

const data = [
    {
        title: 'Febuary-March 2025',
        content: (
            <div className="rounded-md bg-cardColor border-2 border-brand items-center hover:bg-cardColor-light text-white transition duration-700 ease-in-out">
                <div className="flex mb-2 mt-1">
                    <p className="text-md font-semibold">• Robotics demonstrations</p>
                </div>
                <div className="flex my-2">
                    <p className="text-md font-semibold">• Two STEM Workshops per month</p>
                </div>
                <div className="flex my-2">
                    <p className=" text-md font-semibold">
                        • Community invite to robotics competitions
                    </p>
                </div>
                <div className="flex mt-2 mb-1">
                    <p className=" text-md font-semibold">
                        • Continued outreach and recruitment
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
                    <p className=" text-md font-semibold">• Robotics demonstrations</p>
                </div>
                <div className="flex my-2">
                    <p className=" text-md font-semibold">
                        • Two full-day STEM Workshops per month
                    </p>
                </div>
                <div className="flex my-2">
                    <p className=" text-md font-semibold">
                        • Continued outreach and recruitment
                    </p>
                </div>
                <div className="flex mt-2 mb-1">
                    <p className=" text-md font-semibold">• Workshop planning</p>
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

const people: HeartPerson[] = [
    {
        name: 'Daniel Linhardt',
        picture: '/images/DanielLinhardt.png',
        bio: '',
        titles: ['Previous President - SOTA Cyberdragons', 'Project Leader'],
        email: 'daniel@team5700.org',
    },
    {
        name: 'Mario Romero Barbieri',
        titles: ['Member - SOTA Cyberdragons'],
        email: 'mario@team5700.org',
    },
    {
        name: 'Santiago Reid',
        titles: ['President - SOTA Cyberdragons'],
        email: 'santi@team5700.org',
    },
    {
        name: 'August White',
        picture: '/images/AugustBioPhoto.png',
        bio: "Hi! I'm a 15-year-old high school student and lover of all things STEAM. When I can, I love to read, draw, and code websites, as well as play Dungeons and Dragons and other role-playing games with my friends. I'm excited to continue bringing STEM education to new places, and teaching the younger generation more about the wonders of computers and machines.",
        titles: ['President - SOTA Cyberdragons'],
        email: 'august@team5700.org',
    },
    {
        name: 'Carter Benson',
        titles: ['Buisness Lead - SOTA Cyberdragons'],
    },
    {
        name: 'Ember Ximm',
        picture: '/images/EmberPFP.png',
        bio: "I'm a 17 year old high school student and visual artist living in San Francisco, interested in pursuing robotics, science, math, programming and engineering opportunities. As an older sister and babysitter, I'm also super excited to bring more STEM education to elementary and middle schools in the district.",
        titles: ['Mechanical Engineering Lead - SOTA Cyberdragons'],
        email: 'ember@team5700.org',
    },
    {
        name: 'Maelys Kerherve',
        titles: ['Media Lead - SOTA Cyberdragons'],
    },
    {
        name: 'Derrick Lam',
        titles: ['Member - CardinalBotics'],
    },
    {
        name: 'Faye Yang',
        bio: "I am a senior at Lowell High School and passionate about robotics, piano, and journalism. I'm excited to teach and introduce students to STEM and help them discover their interests.",
        titles: ['President - CardinalBotics'],
        email: 'faye.yang@team4159.org',
    },
    {
        name: 'Mia Ly',
        titles: ['Member - Galileo Robotics'],
    },
    {
        name: 'Roman Lopez',
        titles: ['Member - Galileo Robotics'],
    },
    {
        name: 'Alvin He',
        titles: ['Member - Galileo Robotics'],
    },
    {
        name: 'Bryan Cooley',
        titles: ['Mentor', 'Coach - CardinalBotics', 'Physics Teacher'],
    },
    {
        name: 'Danny Tan',
        titles: ['Mentor', 'Coach - Galileo Robotics', 'Computer Science Teacher'],
    },
    {
        name: 'Francisco Hernandez',
        titles: ['Coach - SOTA Cyberdragons', 'Science Teacher'],
    },
    {
        name: 'John Hajel',
        titles: ['Coach - Washington Robotics', 'Computer Science Teacher'],
    },
];

const collaborators: HeartPerson[] = [
    {
        name: 'SOTA Cyberdragons',
        picture: '/images/CyberdragonsLogoSmall.png',
        bio: 'The SOTA Cyberdragons, also known as Team 5700, is a FIRST robotics team based out of Ruth Asawa School of the Arts in San Francisco, California. As one of the few robotics teams based out art schools, the SOTA Cyberdragons strive to incorporate their artistic talent into the robots they create.',
    },
    {
        name: 'CardinalBotics',
        picture: '/images/CardinalBoticsLogo.png',
        bio: 'CardinalBotics, also known as Team 4159, is a FIRST Robotics team based out of Lowell High School in San Francisco. As the oldest FRC team in the city, CardinalBotics strives to support other teams and promote equal access to STEM education and resources throughout the community.',
    },
    {
        name: 'Robotic Eagles',
        picture: '/images/RoboticEaglesLogo.png',
    },
    {
        name: 'Galileo Robotics',
        picture: '/images/GalileoRoboticsLogo.png',
    },
];

function getImportance(person: HeartPerson): number {
    if (person.titles && person.titles.length > 0) {
        const titleString = person.titles.join(' ').toLowerCase();

        if (titleString.includes('project lead')) return 1;
        if (titleString.includes('president')) return 2;
        if (titleString.includes('lead')) return 3;
        if (titleString.includes('coach') || titleString.includes('mentor')) return 4;
        return 5;
    } else return 6;
}

const sortedPeople = [...people].sort((a, b) => getImportance(a) - getImportance(b));

const About = () => {
    const [selected, setSelected] = useState<HeartPerson | null>(null);

    return (
        <div className="w-full bg-darkBlue px-6 md:px-20 py-12">
            {/* Mission + Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div>
                    <h3 className="text-left font-extrabold text-4xl mb-2">Our Mission</h3>
                    <p className="text-left text-lg md:text-xl text-brand">
                        The SF STEM Lab provides a community hub for hands-on robotics demonstrations and
                        STEM workshops that engage students, families, and the wider community. High school
                        students mentor younger, underserved students, creating a learning environment that
                        benefits everyone involved.
                    </p>
                </div>
                <div>
                    <h3 className="text-left font-extrabold text-4xl mb-2">Our Vision</h3>
                    <p className="text-left text-lg md:text-xl text-brand">
                        We envision a permanent space that students can rely on for free STEM enrichment and
                        education. We want local robotics teams to have a home for practice, collaboration,
                        and community service.
                    </p>
                </div>
            </div>

            {/* Community heart */}
            <div className="mb-16">
                <h2 className="text-center font-extrabold text-4xl mb-10">Our Community</h2>

                {/* Desktop: heart + halo (info shown via hover tooltip) */}
                <div className="hidden md:block">
                    <CommunityHeart
                        people={sortedPeople}
                        collaborators={collaborators}
                        getImportance={getImportance}
                    />
                </div>

                {/* Mobile fallback: scrollable lists */}
                <div className="md:hidden">
                    <h3 className="font-bold text-xl mb-3">Team</h3>
                    <div className="rounded-md flex overflow-x-scroll no-scrollbar space-x-3 py-2">
                        {sortedPeople.map((person) => (
                            <button
                                key={person.name}
                                className={`min-w-[280px] max-w-[280px] h-20 items-center space-x-4 py-2 px-2 rounded-md flex border-2 border-brand-dark transition duration-300 ${
                                    selected?.name === person.name
                                        ? 'bg-brand/90 text-darkBlue'
                                        : 'bg-cardColor text-white'
                                }`}
                                onClick={() => setSelected(person)}
                            >
                                {person.picture ? (
                                    <img
                                        src={person.picture}
                                        alt={person.name}
                                        width={56}
                                        height={56}
                                        className="rounded-full object-cover w-14 h-14"
                                    />
                                ) : (
                                    <div className="w-14 h-14 rounded-full bg-brand/60 flex items-center justify-center font-bold shrink-0">
                                        {person.name
                                            .split(' ')
                                            .slice(0, 2)
                                            .map((p) => p[0])
                                            .join('')}
                                    </div>
                                )}
                                <div className="text-left min-w-0">
                                    <h4 className="font-bold text-sm truncate">{person.name}</h4>
                                    <h5 className="text-xs truncate">{person.titles?.join(', ')}</h5>
                                </div>
                            </button>
                        ))}
                    </div>

                    <h3 className="font-bold text-xl mb-3 mt-6">Collaborators</h3>
                    <div className="flex flex-wrap gap-3">
                        {collaborators.map((c) => (
                            <button
                                key={c.name}
                                onClick={() => setSelected(c)}
                                className={`flex items-center gap-2 py-2 px-3 rounded-md border-2 transition duration-300 ${
                                    selected?.name === c.name
                                        ? 'bg-brand/90 border-brand text-darkBlue'
                                        : 'bg-cardColor border-redBrand text-white'
                                }`}
                            >
                                {c.picture && (
                                    <img src={c.picture} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                                )}
                                <span className="text-sm font-bold">{c.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Shared bio panel */}
                {selected && (
                    <div className="text-center mt-8 mb-4 items-center w-full flex flex-col p-4 md:p-0">
                        <h3 className="text-2xl font-extrabold text-redBrand">{selected.name}</h3>
                        {selected.titles && (
                            <p className="text-brand font-semibold mt-1">{selected.titles.join(', ')}</p>
                        )}
                        {selected.bio && <p className="text-lg text-center mt-3 max-w-2xl">{selected.bio}</p>}
                        {selected.email && (
                            <h5 className="flex text-center text-redBrand font-bold mt-4 text-xl cursor-pointer py-1 px-2 rounded-md bg-brand/60 hover:bg-brand/80 transition duration-300">
                                {selected.email}
                            </h5>
                        )}
                    </div>
                )}
            </div>

            {/* Our Need */}
            <div className="flex items-center justify-center flex-col w-full mb-4">
                <h2 className="text-left w-full font-extrabold text-4xl mb-2">Our Need</h2>
                <p className="text-left text-xl text-brand">
                    The SF STEM Lab is seeking a practical yet versatile space of approximately 3,100 square
                    feet to support our diverse educational programs and growing community engagement. This
                    space would be large enough to comfortably host events, demonstrations, and interactive
                    presentations, providing participants with room to move and engage fully. At the same
                    time, it would allow us to set up a dedicated area for hands-on workshops and learning
                    activities. With this space, we can create an inviting and dynamic environment where
                    curiosity, collaboration, and innovation in STEM can truly thrive.
                </p>
            </div>

            <Timeline data={data} />
        </div>
    );
};

export default About;
