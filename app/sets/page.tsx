"use client";
import Set_Card from '@/components/set_card';
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
}

const SetsPage = () => {
    const [sets, setSets] = useState<Set[]>([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchSets = async () => {
        try {
            console.log('Fetching sets...');
            const res = await fetch('https://api.scryfall.com/sets');
            if (!res.ok) {
                throw new Error('Response failed with status ' + res.status);
            }
            const data = await res.json();
            console.log('Data received:', data);
            const badSetTypes = ['commander', 'promo', 'token', 'memorabilia', 'alchemy', 'masterpiece', 'minigame', 'funny', 'box', 'arsenal', 'duel_deck', 'spellbook', 'planechase', 'from_the_vault', 'archenemy', 'starter', 'premium_deck'];
            const date = new Date();
            const mappedSets: Set[] = data.data.filter(
                (set: { set_type: string; digital: boolean; released_at: string; parent_set_code: string; code: string; }) => 
                    !badSetTypes.includes(set.set_type) &&
                    !set.digital &&
                    new Date(set.released_at) <= date
            ).map((set: any) => ({
                name: set.name,
                code: set.code.toUpperCase(),
                tags: [set.set_type.replaceAll('_', ' ')],
                icon_svg_uri: set.icon_svg_uri,
                released_at: set.released_at
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
        const fetchData = async () => {
            await delay(100); // delay 100 milliseconds between requests
            await fetchSets();
        };
        fetchData();
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
            <div>
                {
                    sets.map((set, index) => (
                        <Set_Card 
                            key={index}
                            setName={set.name}
                            setAbbr={set.code}
                            setIcon={set.icon_svg_uri}
                            tags={set.tags}
                            releaseDate={set.released_at}
                            setType={set.set_type}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default SetsPage;
