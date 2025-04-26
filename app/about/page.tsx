"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { Transition, Variants, motion } from "framer-motion";

import Navbar from "@/components/navbar";
import Link from "next/link";
import { Timeline } from "@/components/timeline";
import { Dot, MoveLeft, MoveRight } from "lucide-react";
interface Person {
  name: string;
  picture: any;
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
      repeatType?: "loop" | "reverse" | "mirror";
    };
  };
};

const data = [
    {
        title: "Febuary-March 2025",
        content: (
            <div className='rounded-md bg-[#b1d5e6]/20 border-2 border-[#b1d5e6] items-center hover:bg-[#8db5e3]/60 hover:text-white transition duration-700 ease-in-out'>
                <div className='flex mb-2 mt-1'>
                    <Dot className='stroke-2'/>
                    <p className="text-[#b1d5e6] text-md font-semibold">
                        Robotics demonstrations   
                    </p>
                </div>
                <div className='flex my-2'>
                    <Dot className='stroke-2'/>
                    <p className="text-[#b1d5e6] text-md font-semibold">
                        Two STEM Workshops per month
                    </p>
                </div>
                <div className='flex my-2'>
                    <Dot className='stroke-2'/>
                    <p className="text-[#b1d5e6] text-md font-semibold">
                        Community invite to robotics competitions
                    </p>
                </div>
                <div className='flex mt-2 mb-1'>
                    <Dot className='stroke-2'/>
                    <p className="text-[#b1d5e6] text-md font-semibold">
                        Continued outreach and recruitment
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "April-May 2025",
        content: (
        <div className='rounded-md bg-[#b1d5e6]/20 border-2 border-[#b1d5e6] items-center hover:bg-[#8db5e3]/60 hover:text-white transition duration-700 ease-in-out'>
            <div className='flex mb-2 mt-1'>
                <Dot className='stroke-2'/>
                <p className="text-[#b1d5e6] text-md font-semibold">
                    Robotics demonstrations
                </p>
            </div>
            <div className='flex my-2'>
                <Dot className='stroke-2'/>
                <p className="text-[#b1d5e6] text-md font-semibold">
                    Two full-day STEM Workshops per month
                </p>
            </div>
            <div className='flex my-2'>
                <Dot className='stroke-2'/>
                <p className="text-[#b1d5e6] text-md font-semibold">
                    Continued outreach and recruitment 
                </p>
            </div>
            <div className='flex mt-2 mb-1'>
                <Dot className='stroke-2'/>
                <p className="text-[#b1d5e6] text-md font-semibold">
                    Workshop planning                 
                </p>
            </div>
        </div>
        ),
    },
  {
    title: "Summer 2025",
    content: (
        <div className='rounded-md bg-[#b1d5e6]/20 border-2 border-[#b1d5e6] items-center hover:bg-[#8db5e3]/60 hover:text-white transition duration-700 ease-in-out'>
            <div className='flex m-2'>
                <p className="text-[#b1d5e6] text-md font-semibold">
                    Possible Program TBD
                </p>
            </div>
        </div>
    ),
  }
];

const About = () => {
    const [expandedProfile, setExpandedProfile] = useState<Person>();
    
    const ref = useRef(null);
    const teamContainerRef = useRef<HTMLDivElement>(null);
    const collaboratorsContainerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    const toggleExpandedProfile = (profile: Person) => {
        console.log("expanded: " + expandedProfile?.name);
        console.log("profile: " + profile?.name);
        setExpandedProfile(
        expandedProfile?.name == profile?.name ? undefined : profile
        );
    };

    const people: Person[] = [
        {
        name: "Daniel Linhardt",
        picture: "@/../images/DanielLinhardt.png",
        bio: `This is a very cool bio for Example 1! This is a very cool bio for Example 1! This is a very cool bio for Example 1! 
                This is a very cool bio for Example 1! This is a very cool bio for Example 1! This is a very cool bio for Example 1! This is 
                a very cool bio for example 1! This is a very cool bio for Example 1! This is a very cool bio for Example 1! This is a very 
                cool bio for Example 1! This is a very cool bio for Example 1! This is a very cool bio for Example 1! This is a very cool 
                bio for Example 1! This is a very cool bio for Example 1! This is a very cool bio for Example 1! This is a very cool bio for 
                Example 1! This is a very cool bio for Example 1! This is a very cool bio for Example 1! This is a very cool bio for 
                Example 1! This is a very cool bio for Example 1! `,
        titles: ["President - SOTA Robotics", "Project Leader"],
        email: "example1@ststemlab.org",
        open: false,
        },
        {
        name: "Benjamin Thayer",
        picture: "",
        bio: `This is a very cool bio for Example 2! This is a very cool bio for Example 2! This is a very cool bio for Example 2! 
                This is a very cool bio for Example 2! This is a very cool bio for Example 2! This is a very cool bio for Example 2! This is 
                a very cool bio for Example 2! This is a very cool bio for Example 2! This is a very cool bio for Example 2! This is a very 
                cool bio for Example 2! This is a very cool bio for Example 2! This is a very cool bio for Example 2! This is a very cool 
                bio for Example 2! This is a very cool bio for Example 2! This is a very cool bio for Example 2! This is a very cool bio for 
                Example 2! This is a very cool bio for Example 2! This is a very cool bio for Example 2! This is a very cool bio for 
                Example 2! This is a very cool bio for Example 2! `,
        titles: ["President - Galileo Robotics", "Project Leader"],
        email: "example2@ststemlab.org",
        open: false,
        },
        {
        name: "Katharine Kasperski",
        picture: "",
        bio: `This is a very cool bio for Example 3! This is a very cool bio for Example 3! This is a very cool bio for Example 3! 
                This is a very cool bio for Example 3! This is a very cool bio for Example 3! This is a very cool bio for Example 3! This is 
                a very cool bio for example 3! This is a very cool bio for Example 3! This is a very cool bio for Example 3! This is a very 
                cool bio for Example 3! This is a very cool bio for Example 3! This is a very cool bio for Example 3! This is a very cool 
                bio for Example 3! This is a very cool bio for Example 3! This is a very cool bio for Example 3! This is a very cool bio for 
                Example 3! This is a very cool bio for Example 3! This is a very cool bio for Example 3! This is a very cool bio for 
                Example 3! This is a very cool bio for Example 3! `,
        titles: ["Outreach - Lowell Robotics", "Project Leader"],
        email: "example3@ststemlab.org",
        open: false,
        },
        {
        name: "Mario Romero Barbieri",
        picture: "",
        bio: "",
        titles: ["Mechanical Engineering Co-Lead - SOTA Robotics"],
        email: "",
        open: false,
        },
        {
        name: "Santiago Reid",
        picture: "",
        bio: "",
        titles: ["Mechanical Engineering Co-Lead - SOTA Robotics"],
        email: "",
        open: false,
        },
        {
        name: "Tyler Chew",
        picture: "",
        bio: "",
        titles: ["Software Lead - SOTA Robotics"],
        email: "",
        open: false,
        },
        {
        name: "Zoe Arkin",
        picture: "",
        bio: "",
        titles: ["Buisness Lead - SOTA Robotics"],
        email: "",
        open: false,
        },
        {
        name: "Sam Lako-Cave",
        picture: "",
        bio: "",
        titles: ["Member - SOTA Robotics"],
        email: "",
        open: false,
        },
        {
            name: "August White",
            picture: "",
            bio: "",
            titles: ["Member - SOTA Robotics"],
            email: "",
            open: false,
        },
        {
            name: "Ember Ximm",
            picture: "@/../images/EmberPFP.png",
            bio: "I'm a 17 year old high school student and visual artist living in San Francisco, interested in pursuing robotics, science, math, programming and engineering opportunities. As an older sister and babysitter, I'm also super excited to bring more STEM education to elementary and middle schools in the district.",
            titles: ["Electrical Lead - SOTA Robotcs"],
            email: "",
            open: false,
        },
        {
        name: "Maxwell Liu",
        picture: "",
        bio: "",
        titles: ["President - Lowell Robotics"],
        email: "",
        open: false,
        },
        {
        name: "Derrick Lam",
        picture: "",
        bio: "",
        titles: ["Member - Lowell Robotics"],
        email: "",
        open: false,
        },
        {
        name: "Yu-Faye Yang",
        picture: "",
        bio: "",
        titles: ["Vice President of Mechanical Engineering - Lowell Robotics"],
        email: "",
        open: false,
        },
        {
        name: "Mia Ly",
        picture: "",
        bio: "",
        titles: ["Member - Galileo Robotics"],
        email: "",
        open: false,
        },
        {
        name: "Roman Lopez",
        picture: "",
        bio: "",
        titles: ["Member - Galileo Robotics"],
        email: "",
        open: false,
        },
        {
        name: "Davia Ferree",
        picture: "",
        bio: "",
        titles: ["Member - Galileo Robotics"],
        email: "",
        open: false,
        },
        {
        name: "Alvin He",
        picture: "",
        bio: "",
        titles: ["Member - Galileo Robotics"],
        email: "",
        open: false,
        },
        {
        name: "Bryan Cooley",
        picture: "",
        bio: "",
        titles: ["Mentor", "Coach - Lowell Robotics", "Physics Teacher"],
        email: "",
        open: false,
        },
        {
        name: "Danny Tan",
        picture: "",
        bio: "",
        titles: [
            "Mentor",
            "Coach - Galileo Robotics",
            "Computer Science Teacher",
        ],
        email: "",
        open: false,
        },
        {
        name: "Francisco Hernandez",
        picture: "",
        bio: "",
        titles: ["Coach - SOTA Robotics", "Science Teacher"],
        email: "",
        open: false,
        },
        {
        name: "John Hajel",
        picture: "",
        bio: "",
        titles: ["Coach - Washington Robotics", "Computer Science Teacher"],
        email: "",
        open: false,
        },
    ];

    const collaborators: Person[] = [
        {
        name: "SOTA Cyberdragons",
        picture: "../../images/CyberdragonsLogoSmall.png",
        open: false,
        },
        {
        name: "CardinalBotics",
        picture: "../../images/CardinalBoticsLogo.png",
        open: false,
        },
        {
        name: "Robotic Eagles",
        picture: "../../images/RoboticEaglesLogo.png",
        open: false,
        },
        {
        name: "Galileo Robotics",
        picture: "../../images/GalileoRoboticsLogo.png",
        open: false,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, // each child will start animating 0.3s after the prev.
        },
        y: -10,
        },
    };

    const backgroundVariants: BackgroundVariants = {
        hidden: { backgroundPosition: "0% 50%" },
        visible: {
        backgroundPosition: "100% 50%",
        transition: {
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        },
        },
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            setIsInView(true);
            }
        },
        { threshold: 0.5 }
        );

        if (ref.current) {
        observer.observe(ref.current);
        }

        return () => {
        if (ref.current) {
            observer.unobserve(ref.current);
        }
        };
    }, []);

    return (
        <motion.div
        className="relative w-full bg-white min-h-screen items-center justify-center text-[#b1d5e6]"
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        >
            <Navbar />
            <div className="relative w-full max-h-[500px] overflow-visible">
                <img
                src="@/../images/aboutPage_HeroSection.png"
                alt="About Page Hero Section"
                className="w-full object-cover min-h-[600px]"
                height={6000}
                ></img>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="font-extrabold text-4xl md:text-5xl text-white mb-4 underline">
                        Welcome to the SF STEM Lab
                    </h1>
                    <p className="text-white max-w-2xl">
                        SF STEM Lab is a non-profit organization devoted to educating
                        children about the wonders of STEM: from learning how to use a
                        3D-printer to building fully functional robots.
                    </p>
                </div>
            </div>
            <motion.div
                className="bg-[#1e439d] w-full p-4 text-center"
                variants={containerVariants}
                initial="visible"
                ref={ref}
            >
                <div className="">
                    {/* Mentors section */}
                    <div className='flex items-center space-x-4'>
                        <div className='space-x-2 my-2 w-1/6'>
                            <button 
                                className='py-1 px-3 rounded-2xl items-center border-2 border-[#b1d5e6] bg-[#b1d5e6]/15 hover:bg-[#8db5e3]/60 transition duration-700 ease-in-out'
                                onClick={() => teamContainerRef.current?.scrollBy({left: -300, behavior: 'smooth'})}
                                >
                                <MoveLeft />
                            </button>
                            <button 
                                className='py-1 px-3 rounded-2xl items-center border-2 border-[#b1d5e6] bg-[#b1d5e6]/15 hover:bg-[#8db5e3]/60 hover:text-white transition duration-700 ease-in-out'
                                onClick = {() => teamContainerRef.current?.scrollBy({left: 300, behavior:'smooth'})}
                                >
                                <MoveRight />
                            </button>
                        </div>
                        <h2 className="font-extrabold text-2xl mb-2 w-4/6">Our Team</h2>
                    </div>
                    <div className="rounded-md flex overflow-x-scroll no-scrollbar gap-3" ref={teamContainerRef}>
                        {people.length > 0 &&
                        people.map((person, index) => (
                            <button
                            key={index}
                            className={cn('min-w-[400px] items-center space-x-5 py-2 px-1 rounded-md bg-[#b1d5e6]/15 border-2 border-[#b1d5e6] mb-2 flex hover:bg-[#8db5e3] hover:text-white transition duration-700 ease-in-out', 
                                expandedProfile === person ? 'bg-[#cc1616] text-white' 
                                : ''
                            )}
                            onClick={() => toggleExpandedProfile(person)}
                            >
                                <div className=" overflow-visible text-white">
                                    <img width={100} src={person.picture} alt={person.name}></img>
                                </div>
                                <div className="">
                                    <h3 className="font-bold text-lg text-left">
                                        {person.name}
                                    </h3>
                                    <h4 className="text-sm text-left">
                                        {person.titles?.join(", ")}
                                    </h4>
                                </div>
                            </button>
                        ))}
                    </div>
                    {expandedProfile !== undefined && expandedProfile.bio && (
                        /* Expanded Profile Section */
                        <div className="text-center mt-4">
                            <p className="text-lg text-center">{expandedProfile.bio}</p>
                            <h5 className="text-[#cc1616] font-bold mt-4 text-xl cursor-pointer">
                                {expandedProfile.email}
                            </h5>
                        </div>
                    )}
                </div>
                <div className="m-3 py-2">
                    {/* Collaborators section */}
                    <div className='flex items-center justify-center flex-col space-x-4 w-full'>
                        {/* <div className='space-x-2 my-2 w-1/6'>
                            <button 
                                className='py-1 px-3 rounded-2xl items-center border-2 border-[#b1d5e6] bg-[#b1d5e6]/15 hover:bg-[#8db5e3]/60 transition duration-700 ease-in-out'
                                onClick={() => collaboratorsContainerRef.current?.scrollBy({left: -300, behavior: 'smooth'})}
                                >
                                <MoveLeft />
                            </button>
                            <button 
                                className='py-1 px-3 rounded-2xl items-center border-2 border-[#b1d5e6] bg-[#b1d5e6]/15 hover:bg-[#8db5e3]/60 hover:text-white transition duration-700 ease-in-out'
                                onClick = {() => collaboratorsContainerRef.current?.scrollBy({left: 300, behavior:'smooth'})}
                                >
                                <MoveRight />
                            </button>
                        </div> */}
                        <h2 className="font-extrabold text-2xl mb-2">Our Collaborators</h2>
                    </div>
                    <div className="rounded-md flex overflow-x-scroll no-scrollbar" ref={collaboratorsContainerRef}>
                        {collaborators.length > 0 &&
                        collaborators.map((collaborator, index) => (
                            <button
                            key={index}
                            className="min-w-[305px] items-center space-x-5 px-5 rounded-md bg-[#b1d5e6]/15 border-2 border-[#b1d5e6] m-2 p-2 flex hover:bg-[#8db5e3] hover:text-white transition duration-700 ease-in-out"
                            onClick={() => toggleExpandedProfile(collaborator)}
                            >
                            <div className="w-1/6 overflow-visible">
                                <img
                                src={collaborator.picture}
                                alt={collaborator.name}
                                ></img>
                            </div>
                            <div className="w-5/6">
                                <h3 className="font-semibold text-lg text-left">
                                {collaborator.name}
                                </h3>
                                <h4 className="text-xs mb-2 text-left">
                                {collaborator.titles?.join(", ")}
                                </h4>
                            </div>
                            </button>
                            /*
                                                            TODO: add an extended bit at the bottom that shows the bio for the 
                                                            person and make it show when the element is hovered over 
                                                            */
                        ))}
                    </div>
                </div>
                <Timeline data={data} />
            </motion.div>
          
        </motion.div>
    );
};

export default About;
