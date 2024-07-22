// app/card/[slug]/page.tsx

'use client';
import { useRouter, usePathname } from 'next/navigation';
import { Redo } from "lucide-react";

interface Price {
  marketplace: string;
  amount: string;
}

interface CardData {
  name: string;
  cardImage: string | null;
  description: string;
  rarity: string;
  setName: string;
  manaCost: string;
  type: string;
  power: string;
  toughness: string;
  loyalty: string;
  prices: Price[];
  edhrec_link: string;
}

const dummyData: CardData = {
  name: 'Sample Card',
  cardImage: 'https://via.placeholder.com/400x600',
  description: 'This is a sample description of the card.',
  rarity: 'Rare',
  setName: 'Sample Set',
  manaCost: '3RR',
  type: 'Creature',
  power: '5',
  toughness: '5',
  loyalty: 'N/A',
  prices: [
    { marketplace: 'TCGPlayer', amount: '10.99' },
    { marketplace: 'CardMarket', amount: '9.99' }
  ],
  edhrec_link: 'https://edhrec.com/',
};

export default function CardPage() {
  const router = useRouter();
  const slug = usePathname();

  // Here, you could potentially use slug to fetch the actual data

  const cardData = dummyData; // Use dummy data for now

  if (!cardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-950 text-gray-200">
      <div className="max-w-6xl mx-auto p-8">
        <button
          onClick={() => router.back()}
          className="mb-8 text-lg bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-md"
        >
          Back
        </button>
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img
              src={cardData.cardImage || ''}
              alt={cardData.name}
              className="rounded-md shadow-md mb-4"
            />
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h1 className="text-4xl font-bold mb-4">{cardData.name}</h1>
            <p className="text-lg mb-4">{cardData.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold">Attributes</h2>
                <ul className="list-disc list-inside">
                  <li><strong>Rarity:</strong> {cardData.rarity}</li>
                  <li><strong>Set:</strong> {cardData.setName}</li>
                  <li><strong>Mana Cost:</strong> {cardData.manaCost}</li>
                  <li><strong>Type:</strong> {cardData.type}</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Statistics</h2>
                <ul className="list-disc list-inside">
                  <li><strong>Power:</strong> {cardData.power}</li>
                  <li><strong>Toughness:</strong> {cardData.toughness}</li>
                  <li><strong>Loyalty:</strong> {cardData.loyalty}</li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Prices</h2>
              <div className="flex space-x-4">
                {cardData.prices && cardData.prices.map((price, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-md shadow-md">
                    <p><strong>{price.marketplace}:</strong> ${price.amount}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <a
                href={cardData.edhrec_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg bg-indigo-600 hover:bg-indigo-500 text-gray-200 py-2 px-4 rounded-md transition duration-300"
              >
                View on EDHREC
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
