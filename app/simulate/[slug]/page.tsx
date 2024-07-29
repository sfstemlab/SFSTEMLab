"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ArrowBigLeftDash } from 'lucide-react';

import Card from '@/components/card';
import useFetchCardData from '@/hooks/useFetchCardData';
import { CardData } from '@/types/types';
import SelectDropdown from '@/components/SelectDropdown';
import CustomSelect from '@/components/CustomSelect';

const Simulator = () => {
    const { slug } = useParams();
    const set = slug as string;
    const { data, loading, error } = useFetchCardData(set);
    const [booster, setBooster] = useState('draft-booster');
    const [simulated, setSimulated] = useState(false);
    const [simulatedCards, setSimulatedCards] = useState<CardData[]>([]);
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
                return data2.filter((card: { set: string | string[]; }) => card.set === set)[0].image_uris['normal']

            }
        } catch (error) {
            console.error('Error fetching card image:', error);
            return 'https://placehold.co/600x400';
        }
    };

    // Get random cards from the fetched data
    const getRandomCards = (cards: CardData[], count: number) => {
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

    const slugify = (text: string) => {
        return text
          .toString()
          .toLowerCase()
          .replace(/\s+/g, '-')        // Replace spaces with -
          .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
          .replace(/\-\-+/g, '-')      // Replace multiple - with single -
          .replace(/^-+/, '')          // Trim - from start of text
          .replace(/-+$/, '');         // Trim - from end of text
      };

    // Fetch data when the component mounts
    useEffect(() => {
        simulate();
    },[set] );

    return (
        <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-r from-black to-gray-800 p-6">
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-200">Welcome to the Simulator!</h1>
                <div className="flex space-x-3 justify-center">
                    <Link href="/sets" className="flex h-10 items-center bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-1 px-4 rounded-md transition duration-300">
                        <ArrowBigLeftDash />
                        <p>Sets</p>
                    </Link>
                    <SelectDropdown />
                    <CustomSelect 
                        options={[]}
                        placeholder={'Sets'}
                        value={''} 
                        onChange={function (value: string): void {
                            throw new Error('Function not implemented.');
                        } }                    
                    />
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
            </div>
        </div>
    );
};

export default Simulator;
