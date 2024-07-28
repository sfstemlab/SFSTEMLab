"use client"
import { useState } from "react";
import CardImage from "./CardImage";
import CardInfo from "./CardInfo";
import { CardProps } from "@/types/types";
import Link from "next/link";
import { Redo } from "lucide-react";


const Card = ({ cardName, cardImage, cardArt, cardTreatment, prices, setCode, edhrec_link }: CardProps) => {
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
                        <Link href={edhrec_link}>
                            <img className="w-full rounded-md" src={cardImage} alt={cardName} />
                        </Link>
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
                <h2 className="text-center text-lg font-bold mb-2">{cardName}</h2>
                {cardArt && <p className="text-sm mb-2">{cardArt}</p>}
                {cardTreatment && <p className="text-sm mb-2">{cardTreatment}</p>}
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
