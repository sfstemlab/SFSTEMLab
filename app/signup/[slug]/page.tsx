'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Transition, Variants, motion } from 'framer-motion';
import Navbar from '../../../components/navbar';

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

const SignupPage = () => {
    const { slug } = useParams();
    const event = (slug as string).split('%20').join(' ').slice(0, -1);

    return (
        <div className="min-h-screen w-full overflow-auto">
            <div className="relative w-full bg-white text-brand">
                <Navbar />

                {/* Hero Image */}
                <div className="relative w-full">
                    <img
                        src="/images/controllers.png"
                        alt="Signup Page Hero Section"
                        className="w-full object-cover min-h-[600px]"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-white font-extrabold text-4xl md:text-5xl mb-4 underline decoration-dotted decoration-redBrand">
                            Sign up
                        </h1>
                    </div>
                </div>

                {/* Signup Form Section */}
                <div className="bg-[#1e439d] w-full p-4 text-center">
                    <h1 className="text-brand text-center font-extrabold text-2xl mb-2">
                        Thank you for signing up for the {event}!
                    </h1>
                    <div className="flex flex-col justify-center items-center px-8 space-y-4">
                        Form stuff
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
