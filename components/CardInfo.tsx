import { CardInfoProps } from "@/types/types";


const CardInfo = ({ cardName, cardArt, cardTreatment, prices, setCode }: CardInfoProps) => {
  return (
      <div className="p-4 text-white">
          <h2 className="text-lg font-bold mb-2">{cardName}</h2>
          {cardArt && <p className="text-sm mb-2">{cardArt}</p>}
          {cardTreatment && <p className="text-sm mb-2">{cardTreatment}</p>}
          <div className="flex justify-between text-lg font-semibold">
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
          {setCode && (
              <div className="mt-4 text-sm text-gray-400">
                  <p>Set Code: {setCode}</p>
              </div>
          )}
      </div>
  );
};

export default CardInfo;
