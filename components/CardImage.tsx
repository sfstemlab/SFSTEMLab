import { CardImageProps } from "@/types/types";
import { Redo } from "lucide-react";
import Link from "next/link";



const CardImage = ({ cardImage, cardName, edhrec_link, doubleFaced, flipCard }: CardImageProps) => {
    return (
        <div className="relative bg-emerald-950 backdrop-blur-sm bg-opacity-50 opacity-70 hover:opacity-100 transition duration-200 ease-linear ">
            {cardImage ? (
                <>
                    <Link href={edhrec_link}>
                        <img className="w-full object-cover p-4 rounded-3xl" src={cardImage} alt={cardName} />
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
