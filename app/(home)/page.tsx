"use client";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { Variants, Transition } from "framer-motion";
import Navbar from '@/components/navbar'
import Link from "next/link";
import Circle from "@/components/circle";
import LinkButton from '@/components/linkButton'
import PageTitle from "@/components/pageTitle";

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


export default function Home() {

    const desc1 = `We offer hands-on workshops for elementary and middle
        school students of skill levels — even beginners with
        no prior STEM experience. The workshops are designed
        to give students practical experience and a deeper understanding of how
        technology works, and encourage curiosity and creativity.`.split('.')
    // const desc1v2 = `* Hands-on and student-led
    //                 * Designed for elementary to middle schoolers
    //                 * Fun and engaging for all skill levels
    //     `.split('');

    const desc2 = `Our experienced student mentors and professionals from the community
        play a key role in teaching the workshops by sharing their expertise and
        guiding students through the activites. This
        environment provides students with valuable skills and teaches the
        importance of teamwork, problem-solving, and working wtih others
        toward a common goal.`

    const desc3 = `SF STEM Lab's workshops are entirely free and open to all. We 
    are commited to ensuring that students from all backgrounds have 
    the opportunity to explore and create with STEM. SF STEM Lab aims 
    to make high-quality STEM education available to a wider audience, 
    helping to inspire the next generation of innovators, thinkers, 
    and problem-solvers.`
    

    return (
        <div className="root-div">
            <Navbar />
            <img
                src="@/../images/HomePage_HeroSection.png"
                alt="Home Page Hero Section"
                width={1190}
                className="hero-image"
            />
            <PageTitle title="Welcome to the SF STEM Lab!" />
            <div className="main-section grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-4xl font-extrabold text-center mb-3 text-white">
                        Explore Hands-on STEM Workshops
                    </p>
                    {/* {desc1.map((ln, idx) => (
                        <p className="text-xl text-left indent-10 mt-4" key={idx}>
                            {ln}
                        </p>
                    ))} */}
                    <p className="text-xl text-center">{desc1}</p>
                    <LinkButton href="/events" title="Sign Up Now" />
                </div>

                <div className="flex flex-col items-center">
                    <p className="text-4xl font-extrabold text-center mb-3 text-white">
                        Mentorship and Collaborative Learning
                    </p>
                    {/* {desc2.map((ln, idx) => (
                        <p className="text-xl text-left indent-10 mt-4" key={idx}>
                            {ln}
                        </p>
                    ))} */}
                    <p className="text-xl text-center">{desc2}</p>

                    <LinkButton href="/about" title="Learn More" />
                </div>

                <div className="flex flex-col items-center justify-center">
                    <p className="text-4xl font-extrabold text-center mb-3 text-white">
                        Free and Accesible for All
                    </p>
                    {/* {desc3.map((ln, idx) => (
                        <p className="text-xl text-left indent-10 mt-4" key={idx}>
                            {ln}
                        </p>
                    ))} */}
                    <p className="text-xl text-center">{desc3}</p>

                    <LinkButton href="/events" title="Donate" />
                </div>

                {/* <Circle
                    color={'red-500'}
                    color2={'green-500'}
                    title={'Heya!'}
                    content={'Did you know that we have these cool circles with fun facts in them?'}
                    y={400}
                    screenWidth={screenWidth}
                    cutoff={'l'}
                />
                <Circle
                    color={'red-500'}
                    color2={'green-500'}
                    title={'Hi Again!'}
                    content={'Whaddya think? Pretty cool right?'}
                    y={590}
                    screenWidth={screenWidth}
                    cutoff={'r'}
                /> */}
            </div>
        </div>
    );
}
