import { useState } from "react";
import CardImage from "./CardImage";
import CardInfo from "./CardInfo";
import { CardProps } from "@/types/types";


const Card = ({ cardName, cardImage, cardArt, cardTreatment, prices, setCode, edhrec_link }: CardProps) => {
    const [doubleFaced, setDoubleFaced] = useState(false);
    const [cardFace, setCardFace] = useState(0);

    const flipCard = () => {
        setCardFace(cardFace === 0 ? 1 : 0);
    };

    return (
        <div className="max-w-sm bg-gray-800 rounded-lg shadow-lg ">
            <CardImage
                cardImage={cardImage}
                cardName={cardName}
                edhrec_link={edhrec_link}
                doubleFaced={doubleFaced}
                flipCard={flipCard}
            />
            <CardInfo
                cardName={cardName}
                cardArt={cardArt}
                cardTreatment={cardTreatment}
                prices={prices}
                setCode={setCode}
            />
        </div>
    );
};

export default Card;
