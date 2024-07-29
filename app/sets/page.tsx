"use client";
import SetCard from '@/components/SetCard';
import { AlertTriangle } from 'lucide-react';
import { useState, useEffect } from "react";

interface Set {
    card_count?: number;
    code: string; 
    icon_svg_uri: string;
    id?: string; 
    name: string; 
    parent_set_code?: string;
    released_at: string;
    set_type: string; 
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
            console.log('Data received:', data);
            const badSetTypes = ['commander', 'promo', 'token', 'memorabilia', 'alchemy', 'masterpiece', 'minigame', 'funny', 'box', 'arsenal', 'duel_deck', 'spellbook', 'planechase', 'from_the_vault', 'archenemy', 'starter', 'premium_deck'];
            const date = new Date();
            console.log(data[0].code)
            const filteredSets: Set[] = data.filter(
                (set: { set_type: string; digital: boolean; released_at: string;}) => 
                    !badSetTypes.includes(set.set_type) &&
                    !set.digital &&
                    new Date(set.released_at) <= date
            )
            console.log(filteredSets)
            const mappedSets = data.map((set: {name: string; abbreviation: string; icon: string; releaseDate: string;}) => ({
                name: set.name,
                code: set.abbreviation,
                icon_svg_uri: set.icon,
                released_at: set.releaseDate
            }));
            setSets(mappedSets);
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
            <div className="flex flex-col items-center w-screen justify-center min-h-screen bg-gradient-to-r from-gray-900 to-indigo-900 text-white">
                <div className="loader mb-4"></div>
                <p className="text-2xl font-bold">Fetching sets...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-900 to-pink-900 text-white">
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
    console.log(sets[0])
    return (
        <div className="pt-16 px-6 min-h-screen w-screen justify-center bg-gray-950">
            <h1 className="text-2xl font-bold mb-8 text-center">
                Welcome to my MTG pack simulator!
            </h1>
            <div className="lg:grid grid-cols-2 gap-x-6">
                {
                    sets.map((set, index) => (
                        <SetCard 
                            key={index}
                            name={set.name}
                            abbreviation={set.code}
                            icon={set.icon_svg_uri}
                            tags={set.tags}
                            releaseDate={set.released_at}
                            type={set.set_type}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default SetsPage;
