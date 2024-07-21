import { CardImageProps } from "@/types/types";
import { Redo } from "lucide-react";
import Link from "next/link";



const CardImage = ({ cardImage, cardName, edhrec_link, doubleFaced, flipCard }: CardImageProps) => {
    return (
        <div className="relative">
            {cardImage ? (
                <>
                    <Link href={edhrec_link}>
                        <img className="w-full object-cover" src={cardImage} alt={cardName} />
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
    );
};

export default CardImage;
