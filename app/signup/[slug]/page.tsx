"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import { Transition, Variants, motion } from "framer-motion";
import Navbar from "../../../components/navbar";


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

const SignupPage = () => {
    const { slug } = useParams();

    // reformat the slug event title to have spaces instead of URL encoded characters and remove the space at the end
    const event = (slug as string).split('%20').join(' ').slice(0, -1);

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
        <motion.div
            className="relative w-full bg-white min-h-screen items-center justify-center text-brand"
            variants={backgroundVariants}
            initial="hidden"
            animate="visible"
        >
            <Navbar />
            <div className="relative w-full max-h-[500px] overflow-visible">
                <img
                    src="/images/controllers.png"
                    alt="Signup Page Hero Section"
                    className="w-full object-cover min-h-[600px]"
                    height={6000}
                ></img>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-white font-extrabold text-4xl md:text-5xl mb-4 underline decoration-dotted decoration-redBrand">
                        Sign up
                    </h1>
                </div>
                <div className="bg-[#1e439d] z-20 w-full p-4 text-center absolute top-[305px] md:top-[675px]">
                    <h1 className="text-brand text-center font-extrabold text-2xl mb-2">
                        Thank you for signing up for the {event}!
                    </h1>
                    <div className="flex flex-col justify-center items-center px-8 space-y-4">
                        <div className="flex space-x-4">
                            <p className="w-2/5">How many students are planning to attend?</p>
                            <input
                                type="number"
                                className="w-3/5 border-2 border-brand bg-white/60 focus:border-2 rounded-md px-2 py-1 text-redBrand"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <p className="w-2/5">
                                Please enter a phone number or email that we can contact you by in
                                case of emergencies.
                            </p>
                            <input
                                type="text"
                                placeholder="Input a phone number or email address.."
                                className="w-3/5 border-2 border-brand bg-white/60 focus:border-2 rounded-md px-2 py-1 text-redBrand placeholder-redBrand/70"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default SignupPage