'use client';

import { UserButton, UserProfile } from '@clerk/nextjs';
import React from 'react';
import { Home, Settings as SettingsIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const CustomSettingsPage = () => (
    <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Custom Account Settings</h2>
        <p>Manage your preferences and settings here.</p>
        {/* Add more settings as needed */}
    </div>
);

const MyCollection = () => (
    <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">My Collection</h2>
        <p>View and manage your Magic: The Gathering card collection.</p>
        {/* Integrate collection management features */}
    </div>
);

const Statistics = () => (
    <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
        <p>View your pack opening statistics and collection insights.</p>
        {/* Integrate charts and data visualizations */}
    </div>
);

const Account = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 to-indigo-900 text-white flex justify-center items-center">
            <div className="w-full max-w-4xl p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
                <UserProfile>
                    {/* Custom Pages */}
                    <UserProfile.Page
                        label="My Collection"
                        url="my-collection"
                        labelIcon={<SettingsIcon className="w-5 h-5" />}
                    >
                        <MyCollection />
                    </UserProfile.Page>

                    <UserProfile.Page
                        label="Statistics"
                        url="statistics"
                        labelIcon={<SettingsIcon className="w-5 h-5" />}
                    >
                        <Statistics />
                    </UserProfile.Page>

                    <UserProfile.Page
                        label="Custom Settings"
                        url="custom-settings"
                        labelIcon={<SettingsIcon className="w-5 h-5" />}
                    >
                        <CustomSettingsPage />
                    </UserProfile.Page>


                    <UserProfile.Link
                        label="External Resource"
                        url="https://example.com"
                        labelIcon={<ExternalLink className="w-5 h-5" />}
                    />

                    {/* Default Pages */}
                    <UserProfile.Page label="account" />
                    <UserProfile.Page label="security" />
                </UserProfile>
            </div>
        </div>
    );
};

export default Account;
