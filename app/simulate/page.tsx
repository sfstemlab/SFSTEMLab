"use client";
import Card from '@/components/card';
import { ArrowBigLeftDash } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface CardData {
    name: string;
    prices: {
        usd: string;
        eur: string;
    };
    set: string;
    related_uris: {
        'edhrec': string;
    };
    rarity: string;
    cardImage: string;
}

const Simulator = () => {
    const [setName, setSetName] = useState('mh3');
    const [booster, setBooster] = useState('draft');
    const [simulated, setSimulated] = useState(false);
    const [data, setData] = useState<CardData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [simulatedCards, setSimulatedCards] = useState<CardData[]>([]);

    const fetchCardImage = async (cardName: string): Promise<string | null> => {
        let card_name = cardName.replaceAll(' ', '');
        if (card_name.includes('/')) {
            card_name = card_name.split('/')[0];
        }
        const link = `https://api.scryfall.com/cards/search?q=!${card_name}`;
        try {
            const res = await fetch(link);
            if (!res.ok) {
                throw new Error('response failed');
            }
            const data = await res.json();
            const cardData = data.data[0];
            if (cardData.card_faces && cardData.card_faces.length > 1) {
                return cardData.card_faces[0].image_uris['normal'];
            }
            return cardData.image_uris['normal'];
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const fetchData = async (set: string): Promise<CardData[] | null> => {
        const link = `https://api.scryfall.com/cards/search?q=s:${set}`;
        try {
            const res = await fetch(link);
            if (!res.ok) {
                throw new Error('response failed');
            }
            const data = await res.json();
            const cards = data.data;
            const cardsWithImages = await Promise.all(cards.map(async (card: any) => {
                const cardImage = await fetchCardImage(card.name);
                return { ...card, cardImage };
            }));
            return cardsWithImages;
        } catch (error: any) {
            console.error('Error fetching data:', error);
            setError(error.message);
            return null;
        }
    };

    const getRandomCards = (cards: CardData[], count: number) => {
        const shuffled = [...cards].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const simulate = async () => {
        setLoading(true);
        const fetchedData = await fetchData(setName);
        if (fetchedData) {
            setData(fetchedData);
            setSimulated(true);
            const commons = fetchedData.filter(card => card.rarity === 'common');
            const uncommons = fetchedData.filter(card => card.rarity === 'uncommon');
            const rares = fetchedData.filter(card => card.rarity === 'rare');
            const mythics = fetchedData.filter(card => card.rarity === 'mythic');
            let boosterCards: CardData[] = [];
            boosterCards = [...boosterCards, ...getRandomCards(uncommons, 3)];

            // Uncomment the following logic if you need to add more cards to the booster pack
            /*
            if (booster.includes('draft')) {
                const rmCardRarity = Math.random() < 0.125 ? 'mythic' : 'rare';
                const rmCard = fetchedData.filter(card => card.rarity === rmCardRarity);
                const uncommonCards = getRandomCards(uncommons, 3);
                const commonCards = getRandomCards(commons, 10);
                boosterCards = [...boosterCards, ...rmCard, ...uncommonCards, ...commonCards];
            } else if (booster.includes('set')) {
                // Additional logic for set boosters
            }
            */

            setSimulatedCards(boosterCards);
        } else {
            setSimulated(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        simulate();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-black to-gray-800 p-6">
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
                        w={230}
                        h={200}
                        edhrec_link={card.related_uris['edhrec']}
                    />
                ))}
            </div>
        </div>
    );
};

export default Simulator;
