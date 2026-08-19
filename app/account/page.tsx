'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import MyEvents from '@/components/myEvents';
import { Loader2, LogOut, Settings } from 'lucide-react';

const AccountPage = () => {
    const { user, isLoaded } = useUser();
    const { signOut, openUserProfile } = useClerk();

    if (!isLoaded) {
        return (
            <div className="main-section flex justify-center items-center h-[200px]">
                <Loader2 className="text-brand animate-spin mr-3" size={24} />
                <span className="text-white/70">Loading...</span>
            </div>
        );
    }

    return (
        <div className="main-section">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Profile card */}
                <div className="bg-cardColor border-2 border-brand rounded-2xl shadow-xl p-8 flex flex-col sm:flex-row items-center gap-6">
                    <img
                        src={user?.imageUrl}
                        alt={user?.fullName ?? 'Profile picture'}
                        className="w-24 h-24 rounded-full object-cover border-2 border-brand"
                    />
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-white">{user?.fullName || 'Welcome'}</h2>
                        <p className="text-white/80">{user?.primaryEmailAddress?.emailAddress}</p>
                        <p className="text-white/60 text-sm mt-1">
                            Member since{' '}
                            {user?.createdAt
                                ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                      month: 'long',
                                      year: 'numeric',
                                  })
                                : ''}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => openUserProfile()}
                            className="bg-redBrand hover:bg-redBrand-light transition-colors text-white font-semibold px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                        >
                            <Settings className="w-4 h-4" />
                            Manage Account
                        </button>
                        <button
                            onClick={() => signOut({ redirectUrl: '/' })}
                            className="bg-cardColor-dark hover:bg-darkBlue transition-colors text-white font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-2 border-2 border-brand"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* My Events card */}
                <div className="bg-cardColor border-2 border-brand rounded-2xl shadow-xl overflow-hidden">
                    <MyEvents />
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
