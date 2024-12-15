"use client"
import { useState } from "react";
import Link from "next/link";
import { Redo } from "lucide-react";
import { CardData } from "@/types/types";


const Card = ({ name, cardImage, prices, related_uris }: CardData) => {
    const [doubleFaced, setDoubleFaced] = useState(false);
    const [cardFace, setCardFace] = useState(0);

    const flipCard = () => {
        setCardFace(cardFace === 0 ? 1 : 0);
    };

    return (                    
        <div className="max-w-xs bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="relative">

                {cardImage ? (
                    <>
                        {/* <Link href={related_uris.edhrec}> */}
                            <img className="w-full rounded-md bg-black" src={cardImage} alt={name} />
                        {/* </Link> */}
                        {doubleFaced && (
                            <button 
                                className="absolute top-4 right-4 bg-blue-700 hover:bg-blue-800 p-2 rounded-full"
                                onClick={flipCard}
                            >
                                <Redo className="text-white" />
                            </button>
                        )}
                    </>
                ) : (
                    <div className="h-96 bg-gray-500 flex items-center justify-center">
                        Loading...
                    </div>
                )}
            </div>
            <div className="p-4 text-white">
                <h2 className="text-center text-lg font-bold mb-2">{name}</h2>
                <div className="flex justify-between text-md font-semibold">
                    <div className="text-blue-400">
                        <p>USD</p>
                        <p>${prices.usd}</p>
                    </div>
                    <div className="text-red-400">
                        <p>EUR</p>
                        <p>€{prices.eur}</p>
                    </div>
                    <div className="text-orange-400">
                        <p>TIX</p>
                        <p>{prices.tix}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
