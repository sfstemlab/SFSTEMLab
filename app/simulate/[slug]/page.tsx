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
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-950 p-6">
            <div className="bg-[#0d0c0c] border border-gray-600 shadow-lg shadow-gray-700 rounded-lg p-8 text-center w-full max-w-4xl">
                <h1 className="text-4xl font-bold mb-4 text-gray-200">
                    Welcome to the <span className="text-indigo-500 border border-cyan-300/20 rounded-md px-3 bg-cyan-500/20 backdrop-blur-sm ">{setName.toUpperCase()}</span> Simulator!
                </h1>
                <div className="flex justify-center mb-6">
                    <select
                        className="py-2 px-4 text-lg bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md mr-4"
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
                    <Link href="/sets" className="inline-block bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 px-4 rounded-md transition duration-300">
                        <ArrowBigLeftDash className="inline-block mr-2" />Back to Sets
                    </Link>
                </div>
                <button
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-gray-200 font-bold py-3 px-6 rounded-md transition duration-300 mb-6"
                    onClick={simulate}
                >
                    Simulate
                </button>
                {loading && <div className="text-lg text-gray-200">Loading...</div>}
                {error && <div className="text-lg text-red-500">{error}</div>}
                <div className={`w-full grid grid-cols-2 md:grid-cols-3  gap-4 ${simulated ? 'mt-8' : 'hidden'}`}>
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
        </div>
    );
};

export default Simulator;
