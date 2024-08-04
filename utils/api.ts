import { CardData, Stats } from "@/types/types";

interface Card {
  set:string
  name: string; 
  card_faces?: { image_uris: { normal: string } }[];
  image_uris: { normal: string }
}

interface ScryfallResponse {
  data: Card[]; 
  total_cards?: string; 
}

export const fetchStats = async (abbreviation: string, rarity: string): Promise<string> => {
  try {
    console.log('fetching stats')
    const res = await fetch(`https://api.scryfall.com/cards/search?q=s:${abbreviation}+r:${rarity}`);
    console.log('response', res);
    if (!res.ok) {
      throw new Error('Response failed');
    }
    const data: ScryfallResponse = await res.json(); 
    return data.total_cards || '0'; 
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

const fetchCardImage = async (cardName: string, set:string ): Promise<string | null> => {
  
  let formattedName = cardName.replaceAll(' ', '-');
  if (formattedName.includes('/')) {
    formattedName = formattedName.split('/')[0];
  }
  const link = `https://api.scryfall.com/cards/search?q=!${formattedName}&unique=prints`;
  try {
    const res = await fetch(link);
    if (!res.ok) {
      throw new Error('Response failed');
    }
    const data: ScryfallResponse = await res.json();
    console.log('data', data); 
    const correctCard = data.data.find((card:Card) => card.set === set);
    console.log('correct card: ', correctCard);
    if(!correctCard) {
      return 'https://placehold.co/600x400';
    }
    
    if (correctCard.card_faces && correctCard.card_faces.length > 1) {
      return correctCard.card_faces[0].image_uris.normal;
    }
    return correctCard.image_uris.normal;
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
      const cardImage = await fetchCardImage(card.name, card.set);
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


