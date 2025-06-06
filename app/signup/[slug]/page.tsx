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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                        <h1>How did you hear about us?</h1>
                        <textarea className='bg-brand rounded-md'></textarea>
                    </div>
                    <div className="flex flex-col">
                        <h1>Why did you decide to attend this event?</h1>
                        <textarea></textarea>
                    </div>
                    <div className="flex flex-col">
                        <h1>What grade are you in?</h1>
                        <input type="number"></input>
                    </div>
                    <div className="flex flex-col">
                        <h1>What are your preferred pronouns?</h1>
                        <select name="pronouns" required>
                            <option value="" disabled selected>
                                Select your pronouns
                            </option>
                            <option value="she/her">She/Her</option>
                            <option value="he/him">He/Him</option>
                            <option value="they/them">They/Them</option>
                            <option value="she/they">She/They</option>
                            <option value="he/they">He/They</option>
                            <option value="they/she">They/She</option>
                            <option value="they/he">They/He</option>
                            <option value="xe/xem">Xe/Xem</option>
                            <option value="ze/hir">Ze/Hir</option>
                            <option value="it/its">It/Its</option>
                            <option value="no-answer">Prefer not to answer</option>
                            <option value="other">Other (please specify below)</option>
                        </select>
                        <input
                            type="text"
                            value="custom_pronouns"
                            placeholder="If your pronouns don't fit any of the above options, select 'Other' and specify here" 
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1>What school do you go to?</h1>
                        <input 
                            type='text'
                            value='school'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
