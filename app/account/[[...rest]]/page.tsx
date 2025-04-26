'use client';

import { UserButton, UserProfile } from '@clerk/nextjs';
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
    );
};

export default Account;
