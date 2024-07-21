import { Redo } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CardProps {
    cardName: string;
    cardImage: string | null;
    cardArt?: string;
    cardTreatment?: string;
    prices: {    
        usd: string;
        eur: string;
    }
    setCode?: string;
    w: number;
    h: number;
    edhrec_link: string;
}

const Card = ({ cardName, cardImage, cardArt, cardTreatment, prices, setCode, w, h, edhrec_link }: CardProps) => {
    // const [image, setImage] = useState<string | null>(cardImage);
    const [doubleFaced, setDoubleFaced] = useState(false);
    const [cardFace, setCardFace] = useState(0);
    const flipCard = () => {
        setCardFace(cardFace === 0 ? 1 : 0);
    
    };

    return (                    
        <div className={`w-64 h-64 bg-white/20 backdrop-blur-sm rounded-lg p-6`}>
            {cardImage ? (
                <div className="relative text-black">
                    <Link href={edhrec_link}>
                        <img className={`h-${h/4} rounded-lg mb-2`} src={cardImage} alt={cardName} width={w} />
                    </Link>
                    <button 
                        className={`absolute top-16 bg-blue-700 hover:bg-blue-800 p-2 outline outline-white rounded-lg right-3 ${doubleFaced ? '' : 'hidden'}`}
                        onClick={flipCard}
                    >
                        <Redo />
                    </button>
                    
                </div>
            ) : (
                <div className="h-80 bg-gray-500 mb-2 rounded flex items-center justify-center">
                    Loading...
                </div>
            )}         
            <div className="flex h-15">
                <p className="w-1/2 text-center text-blue-500 font-bold">USD</p>
                <p className="w-1/2 text-center text-red-500 font-bold">EUR</p>
            </div>   
            <div className="flex h-15">
                <div className="w-1/2 text-center text-blue-500">{prices['usd']}</div>
                <div className="w-1/2 text-center text-red-500">{prices['eur']}</div>
            </div>
        </div>
    );
};

export default Card;
