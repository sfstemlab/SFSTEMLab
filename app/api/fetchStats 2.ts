import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  total_cards: number;
};

let cache: { [key: string]: number } = {};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { setAbbr, rarity } = req.query;

  if (typeof setAbbr !== 'string' || typeof rarity !== 'string') {
    res.status(400).json({ error: 'Invalid query parameters' });
    return;
  }

  const cacheKey = `${setAbbr}-${rarity}`;
  if (cache[cacheKey]) {
    res.status(200).json({ total_cards: cache[cacheKey] });
    return;
  }

  const link = `https://api.scryfall.com/cards/search?q=s:${setAbbr.toLowerCase()}+r:${rarity}`;
  try {
    const response = await fetch(link);
    if (!response.ok) {
      throw new Error('Response failed');
    }
    const data: Data = await response.json();
    cache[cacheKey] = data.total_cards;
    res.status(200).json({ total_cards: data.total_cards });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default handler;
