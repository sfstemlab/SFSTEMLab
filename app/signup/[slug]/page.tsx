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
        <div className="root-div">
            <Navbar />
            <img
                src="/images/controllers.png"
                alt="Signup Page Hero Section"
                className="hero-image"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-white font-extrabold text-4xl md:text-5xl mb-4 underline decoration-dashed decoration-redBrand">
                    Sign up
                </h1>
            </div>

            <div className="main-section">
                <h1 className="text-brand text-center font-extrabold text-2xl mb-2">
                    Thank you for signing up for the {event}!
                </h1>
                <div className="flex flex-col justify-center items-center px-8 space-y-4">
                    Form stuff
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
