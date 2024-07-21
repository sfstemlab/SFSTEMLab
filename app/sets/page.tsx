"use client";
import SetCard from '@/components/SetCard';
import { AlertTriangle } from 'lucide-react';
import { useState, useEffect } from "react";

interface Set {
    key: number;
    name: string;
    abbreviation: string;
    description?: string;
    icon: string;
    tags: string[];
    releaseDate: string;
    type: string;
}

const SetsPage = () => {
    const [sets, setSets] = useState<Set[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSets = async () => {
        try {
            const res = await fetch('/api/fetchSets');
            if (!res.ok) {
                throw new Error('Response failed with status ' + res.status);
            }
            const data = await res.json();
            setSets(data);
            setLoading(false);
        } catch (error: any) {
            console.error('Fetching error:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSets();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-indigo-900 text-white">
                <div className="loader mb-4"></div>
                <p className="text-2xl font-bold">Fetching sets...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-900 to-pink-900 text-white">
                <AlertTriangle className="h-20 w-20 text-yellow-500 mb-4 animate-bounce" />
                <h1 className="text-3xl font-bold mb-2">Oops! Something went wrong.</h1>
                <p className="text-lg mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-600 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="pt-16 px-24 min-h-screen justify-items-center bg-gray-950">
            <h1 className="text-2xl font-bold mb-8 text-center">
                Welcome to my MTG pack simulator!
            </h1>
            <div className='grid grid-cols-2 gap-4'>
                {sets.map((set, index) => (
                    <SetCard
                        key={index}
                        name={set.name}
                        abbreviation={set.abbreviation}
                        icon={set.icon}
                        tags={set.tags}
                        releaseDate={set.releaseDate}
                        type={set.type}
                    />
                ))}
            </div>
        </div>
    );
}

export default SetsPage;
