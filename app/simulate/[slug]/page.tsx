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
<<<<<<< HEAD
    // Delay function to comply with rate limiting
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Fetch card image
    const fetchCardImage = async (cardName: string): Promise<string> => {
        let formattedName = cardName.replaceAll(' ', '+');
        if (formattedName.includes('/')) {
            formattedName = formattedName.split('/')[0];
        }
        const link = `https://api.scryfall.com/cards/named?exact=${formattedName}`;
        try {
            const res = await fetch(link);
            if (!res.ok) {
                throw new Error('Response failed');
            }
            const data = await res.json();
            if (data.card_faces && data.card_faces.length > 1) {
                return data.card_faces[0].image_uris.normal;
            }
            if (!data.reprint){
                return data.image_uris.normal;
            }
            else{
                const res2 = await fetch(data.prints_search_uri);
                const data2 = await res2.json();
                console.log(data2)
                return data2.filter((card: { set: string | string[]; }) => card.set === setName)[0].image_uris['normal']

            }
        } catch (error) {
            console.error('Error fetching card image:', error);
            return 'https://placehold.co/600x400';
        }
    };

    // Fetch data for a specific set
    const fetchData = async (set: string | string[]): Promise<CardData[] | null> => {
        const link = `https://api.scryfall.com/cards/search?q=s:${set}`;
        try {
            const res = await fetch(link);
            if (!res.ok) {
                throw new Error('Response failed');
            }
            const data = await res.json();
            const cards = data.data;
            const cardsWithImages = await Promise.all(cards.map(async (card: any) => {
                const cardImage = await fetchCardImage(card.name);
                await delay(75); // Delay to avoid hitting rate limits
                return {
                    name: card.name,
                    prices: card.prices,
                    set: card.set,
                    related_uris: card.related_uris,
                    rarity: card.rarity,
                    cardImage
                };
            }));
            return cardsWithImages;
        } catch (error: any) {
            console.error('Error fetching data:', error);
            setError(error.message);
            return null;
        }
    };

    // Get random cards from the fetched data
    const getRandomCards = (cards: CardData[], count: number) => {
=======

    const getRandomCards = (cards: CardData[], count: number): CardData[] => {
>>>>>>> dev
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

<<<<<<< HEAD
    // Fetch data when the component mounts
    useEffect(() => {
        simulate();
    },[setName] );

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-black to-gray-800 p-6">
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-200">Welcome to the Simulator!</h1>
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
=======
    return (
        <div className="h-screen w-full p-8 flex flex-col justify-center items-center
                bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-950 rounded-lg"
        >
            <div className="bg-[#0d0c0c] border border-gray-600 shadow-lg shadow-gray-700 rounded-lg p-8 text-center w-full max-w-4xl">
                <h1 className="text-4xl font-bold mb-4 text-gray-200">
                    Welcome to the <span className="text-orange-500/90 border border-indigo-300/60 rounded-md px-3 bg-cyan-500/50 backdrop-blur-sm ">{setName.toUpperCase()}</span> Simulator!
                </h1>
                <div className="flex justify-center mb-6">
                    <select
                        className="py-2 px-4 text-lg bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md mr-4"
                        value={booster}
                        onChange={(e) => setBooster(e.target.value)}
>>>>>>> dev
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
                <div className={`w-full grid grid-cols-2 md:grid-cols-3 gap-4  ${simulated ? 'mt-8' : 'hidden'}`}>
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
<<<<<<< HEAD
            </div>
            {loading && <div className="mt-4 text-gray-200">Loading...</div>}
            {error && <div className="mt-4 text-red-500">{error}</div>}
            <div className={`w-full overflow-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 p-8 mt-4 ${simulated ? 'h-full' : 'hidden'}`}>
                {simulatedCards.map((card, index) => (
                    <Card
                        key={index}
                        cardName={card.name}
                        cardImage={card.cardImage}
                        prices={card.prices}
                        setCode={card.set}
                        w={230}
                        h={200}
                        edhrec_link={card.related_uris.edhrec}
                    />
                ))}
=======
>>>>>>> dev
            </div>
        </div>
    );
};

export default Simulator;
