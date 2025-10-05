'use client';

import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, UserProfile } from '@clerk/nextjs';
import React from 'react';
import { Home, Settings as SettingsIcon, ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';

const PreferencesPage = () => (
    <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Preferecnces</h2>
        <p>Manage your preferences and settings here.</p>
        {/* Add more settings as needed */}
    </div>
);

const MyEventsPage = () => (
    <div className = 'p-6'>
        <h2 className = 'text-2xl font-semibold mb-4'>My Events</h2>
            <p>Find all of your upcoming events here.</p>
            {/* TODO: Add a calendar (shadcn?) with all of the upcoming events for the user */}
    </div>
)
const Account = () => {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className='antialiased'>
                    <header className="flex justify-end items-center p-4 gap-4 h-16">
                        <SignedOut>
                        <SignInButton />
                        <SignUpButton>
                            <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            Sign Up
                            </button>
                        </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                        </SignedIn>
                    </header>
                    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-indigo-900 text-white flex justify-center items-center">
                        <div className="w-full max-w-4xl p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
                            <UserProfile>
                                {/* Custom Pages */}
                                <UserProfile.Page
                                    label="My Events"
                                    url="my-events"
                                    labelIcon={<Calendar className="w-5 h-5" />}
                                >
                                    <MyEventsPage />
                                </UserProfile.Page>

                                <UserProfile.Page
                                    label="Preferences "
                                    url="preferences"
                                    labelIcon={<SettingsIcon className="w-5 h-5" />}
                                >
                                    <PreferencesPage />
                                </UserProfile.Page>
                            </UserProfile>
                        </div>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
};

export default Account;


