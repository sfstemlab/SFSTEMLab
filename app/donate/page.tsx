'use client';

import Navbar from '@/components/navbar';
import PageTitle from '@/components/pageTitle';
import LinkButton from '@/components/linkButton';
import Newsletter from '@/components/newsletter';


export default function DonatePage() {
    return (
        <div className="bg-gradient-to-r from-brand-light to-darkBlue-light bg-[length:200%_200%]">
            <Navbar />
            <PageTitle />

            <div className="main-section md:p-24 relative">
                <div className="flex flex-col md:flex-row items-center justify-between md:space-x-8 mb-24">
                    <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
                        <p className="text-4xl font-extrabold mb-3 text-white">
                            Fuel the Future of STEM
                        </p>
                        <p className="text-xl text-white w-full md:w-5/6 mb-6">
                            Your donation empowers students through free hands-on workshops, tools,
                            mentorship, and access to STEM opportunities. Every dollar goes directly
                            toward making STEM education more accessible and inspiring.
                        </p>
                    </div>
                    <img
                        src=""
                        alt="Image Placeholder"
                        className="rounded-full w-80 h-80 object-cover hidden md:block"
                    />
                </div>

                <div
                    id="donate"
                    className="bg-cardColor border-2 border-brand rounded-2xl shadow-xl p-10 max-w-2xl mx-auto text-center"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Choose Your Donation Amount
                    </h2>
                    <p className="text-white/90 mb-6 max-w-xl mx-auto">
                        Whether it's $10 or $100, your support fuels equipment, materials, and event
                        access. Pick a preset or enter your own amount.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        {[10, 25, 50, 100].map((amt) => (
                            <button
                                key={amt}
                                onClick={() => alert(`Redirect to donation platform for $${amt}`)}
                                className="bg-redBrand hover:scale-105 text-white font-bold py-2 px-4 rounded-xl transition"
                            >
                                ${amt}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => alert('Redirect to custom amount')}
                        className="text-white font-medium underline hover:bg-darkBlue/50 px-3 py-2 rounded-md transition duration-300"
                    >
                        Donate a custom amount
                    </button>
                </div>

                <div className="mt-24">
                    <Newsletter />
                </div>
            </div>
        </div>
    );
}
