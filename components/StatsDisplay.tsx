import React, { useEffect, useState } from "react";
import { CardData, StatsDisplayProps, Stats } from "@/types/types";
import Card from "./card";
import { fetchCardData } from "@/utils/api";

const StatsDisplay: React.FC<StatsDisplayProps> = ({
  set,
  stats,
  loading,
  error,
}) => {
  const [valuableCards, setValuableCards] = useState<CardData[]>([]);
  const [cardsLoading, setCardsLoading] = useState<boolean>(false);
  const [cardsError, setCardsError] = useState<string | null>(null);
  useEffect(() => {
    // Define an async function to fetch valuable cards
    const getValuableCards = async () => {
      setCardsLoading(true);
      setCardsError(null);
      try {
        const data = await fetchCardData(set);
        if (data) {
          const sortedData = data
            .filter((card) => card.prices.usd)
            .sort((a, b) => parseFloat(b.prices.usd) - parseFloat(a.prices.usd))
            .slice(0, 5);
          const sortedDataArray = [...sortedData];
          setValuableCards(sortedData);
        } else {
          setValuableCards([]);
        }
      } catch (err: any) {
        setCardsError(err.message || "Failed to fetch valuable cards.");
      } finally {
        setCardsLoading(false);
      }
    };

    getValuableCards();
  }, [set]);

  // Combine loading states
  const isLoading = loading || cardsLoading;
  // Combine error states
  const combinedError = error || cardsError;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-6">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (combinedError) {
    return (
      <div className="flex justify-center items-center py-6">
        <div className="text-red-500 text-lg font-semibold">
          {combinedError}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="w-full mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="text-gray-300 justify-center text-center">Commons:</div>
          <div className="text-white font-semibold justify-center text-center">{stats.commons}</div>
          <div className="text-gray-300 justify-center text-center">Uncommons:</div>
          <div className="text-white font-semibold justify-center text-center">{stats.uncommons}</div>
          <div className="text-gray-300 justify-center text-center">Rares:</div>
          <div className="text-white font-semibold justify-center text-center">{stats.rares}</div>
          <div className="text-gray-300 justify-center text-center">Mythics:</div>
          <div className="text-white font-semibold justify-center text-center">{stats.mythics}</div>
        </div>
        <div className="items-center justify-center flex gap-3 mt-2">
          <div className="text-gray-300 font-semibold text-lg">Total:</div>
          <div className="text-white font-semiboldtext-lg">{stats.total}</div>
        </div>
      </div>

      {/* Most Valuable Cards Section */}
      <div className="mx-auto">
        <p className="font-bold text-2xl text-white mb-6 text-center">
          Most Valuable Cards
        </p>
        {valuableCards && valuableCards.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {valuableCards.map((card: CardData) => (
              <Card
                key={card.name}
                name={card.name}
                cardImage={card.cardImage}
                prices={card.prices}
                related_uris={card.related_uris}
                set={card.set}
                rarity={card.rarity}
                colors={card.colors}
                typeline={card.typeline}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-center">
            No valuable cards found.
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsDisplay;
