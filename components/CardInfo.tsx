import { CardInfoProps } from "@/types/types";

const CardInfo = ({ cardName, cardArt, cardTreatment, prices, setCode }: CardInfoProps) => {
    return (
        <div className="p-6 bg-[#1e1e1e] rounded-bl-lg rounded-br-lg shadow-lg text-gray-300">
            <h2 className="text-xl font-semibold tracking-wider mb-3 text-center">{cardName}</h2>
            {cardArt && <p className="text-sm mb-3 italic text-gray-300">{cardArt}</p>}
            {cardTreatment && <p className="text-sm mb-3 italic text-gray-300">{cardTreatment}</p>}
            <div className="flex justify-around text-lg font-semibold mb-4">
                <div className="text-center">
                    <p className="text-blue-400">USD</p>
                    <p className="text-white">${prices.usd}</p>
                </div>
                <div className="text-center">
                    <p className="text-red-400">EUR</p>
                    <p className="text-white">€{prices.eur}</p>
                </div>
                <div className="text-center">
                    <p className="text-orange-400">TIX</p>
                    <p className="text-white">{prices.tix}</p>
                </div>
            </div>
            {setCode && (
                <div className="text-center mt-4 text-sm text-gray-400">
                    <p>Set Code: <span className="text-gray-200">{setCode}</span></p>
                </div>
            )}
        </div>
    );
};

export default CardInfo;
