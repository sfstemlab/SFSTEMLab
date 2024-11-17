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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [sortedSets, setSortedSets] = useState<Set[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [sortOption, setSortOption] = useState<'name' | 'releaseDate'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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
            const mappedSets = data.map((set: {name: string; abbreviation: string; icon: string; releaseDate: string; set_type:string}) => ({
                name: set.name,
                code: set.abbreviation,
                icon_svg_uri: set.icon,
                released_at: set.releaseDate,
                type: set.set_type,
            }));
            console.log('mapped: '+ mappedSets[0])
            setSets(mappedSets);
            setSortedSets(mappedSets);
            setLoading(false);
            console.log(sortedSets[0])
        } catch (error: any) {
            console.error('Fetching error:', error);
            setError(error.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchSets();
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        const lowercaseTerm = term.toLowerCase()
        const filtered = sets.filter(set => 
            set.name.toLowerCase().includes(lowercaseTerm) || set.code.toLowerCase().includes(lowercaseTerm)
        )
        setSortedSets(filtered)
    }

    const handleSort = (option: 'name' | 'releaseDate', order: 'asc' | 'desc') => {
        // set state variables
        setSortOption(option)
        setSortOrder(order)
        // create a sorted variable 
        const sorted = [...sortedSets].sort((a, b) => {
            let comparison = 0
            if (option === 'name') {
                comparison = a.name.localeCompare(b.name)
            } else {
                comparison = new Date(a.released_at).getTime() -  new Date(b.released_at).getTime()
            }
            return order === 'asc' ? comparison : -comparison
        })
        setSortedSets(sorted)
            
    }

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
            <div className='flex-col md:flex-row items-center justify-between mb-4 space-x-4'>
                <input 
                    type='text'
                    placeholder='Search sets by name or code'
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className='p-2 border border-gray-600 rounded-md w-full mb-2 bg-gray-700 text-white'
                />
                
                <div className="flex justify-center gap-2">
                    <select
                        value={sortOption}
                        onChange={(e) => handleSort(e.target.value as 'name' | 'releaseDate', sortOrder)}
                        className="p-2  border border-gray-600 rounded-md w-1/6 mb-2 bg-gray-700 text-white"
                        >
                            <option value='name'>Name</option>
                            <option value='releaseDate'>Release Date</option>
                    </select>
                    <select
                        value={sortOrder}
                        onChange={(e) => handleSort(sortOption, e.target.value as 'asc' | 'desc')}
                        className="p-2 border border-gray-600 rounded-md w-1/6 mb-2 bg-gray-700 text-white"

                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                    </select>
                </div>

            </div>
            <div className="">
                {
                    sortedSets.map((set, index) => (
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
