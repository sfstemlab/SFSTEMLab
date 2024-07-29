import { CardData, Stats } from "@/types/types";

export const fetchStats = async (abbreviation: string, rarity: string): Promise<string> => {
  try {
    console.log('fetching stats')
    const res = await fetch(`https://api.scryfall.com/cards/search?q=s:${abbreviation}+r:${rarity}`);
    console.log('response', res);
    if (!res.ok) {
      throw new Error('Response failed');
    }
    const data = await res.json();
    return data.total_cards;
  } catch (error: any) {
    throw new Error('fetching stats: ', error.message);
  }
};

export const fetchAllStats = async (abbreviation: string): Promise<Stats> => {
  const commons = await fetchStats(abbreviation, 'c');
  const uncommons = await fetchStats(abbreviation, 'u');
  const rares = await fetchStats(abbreviation, 'r');
  const mythics = await fetchStats(abbreviation, 'm');
  const total = await fetchStats(abbreviation, '');
  return { commons, uncommons, rares, mythics, total };
};

const fetchCardImage = async (cardName: string): Promise<string | null> => {
  let formattedName = cardName.replaceAll(' ', '+');
  if (formattedName.includes('/')) {
    formattedName = formattedName.split('/')[0];
  }
  const link = `https://api.scryfall.com/cards/named?exact=${formattedName}`;
  try {
    const res = await fetch(link);
    if (!res.ok) {
      throw new Error('Response failed');
    }
    const data = await res.json();
    if (data.card_faces && data.card_faces.length > 1) {
      return data.card_faces[0].image_uris.normal;
    }
    return data.image_uris.normal;
  } catch (error) {
    console.error('Error fetching card image:', error);
    return 'https://placehold.co/600x400';
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCardData = async (set?: string, name?:string, rarity?:string): Promise<CardData[] | null> => {
  let link = `https://api.scryfall.com/cards/search?q=`
  if (set) {
    link += `s:${set}`
  }
  if (name) {
    link += `&!${name}`
  }
  if (rarity) {
    link += `r:${rarity}`
  }

  try {
    const res = await fetch(link);
    if (!res.ok) {
      throw new Error('Response failed');
    }
    const data = await res.json();
    const cards = data.data;
    const cardsWithImages = await Promise.all(cards.map(async (card: any) => {
      const cardImage = await fetchCardImage(card.name);
      await delay(75); // Delay to avoid hitting rate limits
      return {
        name: card.name,
        prices: card.prices,
        set: card.set,
        related_uris: card.related_uris,
        rarity: card.rarity,
        cardImage
      };
    }));
    return cardsWithImages;
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return null;
  }
};


