'use client';
import React, { useState } from 'react';
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

    const [selectedPronoun, setSelectedPronoun] = useState('');

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

            <div className="main-section p-4">
                <h1 className="font-extrabold text-4xl mb-2 w-full">
                    Thank you for signing up for the {event}!
                </h1>
                <h3 className='font-bold text-lg mb-2 w-full text-center'>
                    Just a few quick questions, then you'll be good to go!
                </h3>
                <div className="flex flex-col space-y-3 p-16">
                    <div className="flex space-x-3 justify-center">
                        {/* Row 1 */}
                        <div className="flex space-x-3">
                            <div className="flex flex-col">
                                <h1>First Name</h1>
                                <input
                                    type="text"
                                    className="w-full text-white p-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                                    placeholder="Type here.."
                                />
                            </div>
                            <div className="flex flex-col">
                                <h1>Last Name</h1>
                                <input
                                    type="text"
                                    className="text-white p-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                                    placeholder="Type here.."
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h1>Pronouns</h1>
                            <div>
                                <select
                                    name="pronouns"
                                    className="text-white h-9 px-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out"
                                    value={selectedPronoun}
                                    onChange={(e) => setSelectedPronoun(e.target.value)}
                                >
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
                                    <option value="no-answer">Prefer not to answer</option>
                                    <option value="other">Other (please specify)</option>
                                </select>
                                {selectedPronoun === 'other' && (
                                    <input
                                        type="text"
                                        placeholder="Enter custom pronouns.."
                                        className="text-white px-1 h-9 ml-2 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3 justify-center">
                        {/* Row 2 */}
                        <div className="flex flex-col w-1/2">
                            <h1>How did you hear about us?</h1>
                            <textarea
                                className="h-32 text-white p-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                                placeholder="Type here.."
                            ></textarea>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <h1>Why did you decide to attend this event?</h1>
                            <textarea
                                className="h-32 text-white p-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                                placeholder="Type here.."
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex space-x-3 justify-center">
                        {/* Row 3 */}
                        <div className="flex flex-col w-3/4">
                            <h1>What school do you go to?</h1>
                            <input
                                type="text"
                                className="text-white p-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                                placeholder="Type here.."
                            />
                        </div>
                        <div className="flex flex-col w-1/4">
                            <h1>What grade are you in?</h1>
                            <input
                                type="number"
                                className="text-white p-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                                placeholder="Type here.."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
