"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ArrowBigLeftDash } from 'lucide-react';

import Card from '@/components/Card';
import useFetchCardData from '@/hooks/useFetchCardData';
import { CardData } from '@/types/types';

const Simulator = () => {
    const { slug } = useParams();
    const setName = slug as string;
    const { data, loading, error } = useFetchCardData(setName);
    const [booster, setBooster] = useState('draft-booster');
    const [simulated, setSimulated] = useState(false);
    const [simulatedCards, setSimulatedCards] = useState<CardData[]>([]);

    const getRandomCards = (cards: CardData[], count: number): CardData[] => {
        const shuffled = [...cards].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const simulate = () => {
        if (data) {
            setSimulated(true);
            const uncommons = data.filter(card => card.rarity === 'uncommon');
            const boosterCards: CardData[] = getRandomCards(uncommons, 3);
            setSimulatedCards(boosterCards);
        } else {
            setSimulated(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-black to-gray-800 p-6">
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-200">Welcome to the {setName.toUpperCase()} Simulator!</h1>
                <select
                    className="py-1 mb-2 text-xl bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md"
                    value={booster}
                    onChange={(e) => setBooster(e.target.value)}
                >
                    <optgroup label='Booster Products'>
                        <option value="draft-booster">Draft Booster</option>
                        <option value="play-booster">Play Booster</option>
                        <option value="collector-booster">Collector Booster</option>
                        <option value="collector-booster-box">Collector Booster Box</option>
                        <option value="draft-booster-box">Draft Booster Box</option>
                        <option value="play-booster-box">Play Booster Box</option>
                        <option value="set-booster">Set Booster</option>
                        <option value="set-booster-box">Set Booster Box</option>
                    </optgroup>
                </select>
                <div className="flex space-x-3 justify-center">
                    <Link href="/sets" className="w-1/6 inline-block bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 px-4 rounded-md transition duration-300">
                        <ArrowBigLeftDash />
                    </Link>
                    <button
                        className="w-5/6 bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 px-4 rounded-md transition duration-300"
                        onClick={simulate}
                    >
                        Simulate
                    </button>
                </div>
            </div>
            {loading && <div className="mt-4 text-gray-200">Loading...</div>}
            {error && <div className="mt-4 text-red-500">{error}</div>}
            <div className={`w-full overflow-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 mt-4 ${simulated ? 'h-full' : 'hidden'}`}>
                {simulatedCards.map((card, index) => (
                    <Card
                        key={index}
                        cardName={card.name}
                        cardImage={card.cardImage}
                        prices={card.prices}
                        setCode={card.set}
                        edhrec_link={card.related_uris.edhrec}
                    />
                ))}
            </div>
        </div>
    );
};

export default Simulator;
