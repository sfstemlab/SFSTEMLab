import { NextApiRequest, NextApiResponse } from 'next';

const badSetTypes = [
  'commander', 'promo', 'token', 'memorabilia', 'alchemy', 'masterpiece',
  'minigame', 'funny', 'box', 'arsenal', 'duel_deck', 'spellbook',
  'planechase', 'from_the_vault', 'archenemy', 'starter', 'premium_deck'
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch('https://api.scryfall.com/sets');
    if (!response.ok) {
      throw new Error('Response failed');
    }
    const data = await response.json();
    const date = new Date();
    const filteredSets = data.data.filter((set: any) =>
      !badSetTypes.includes(set.set_type) &&
      !set.digital &&
      new Date(set.released_at) <= date
    ).map((set: any) => ({
      name: set.name,
      abbreviation: set.code.toUpperCase(),
      description: set.description,
      icon: set.icon_svg_uri,
      tags: [set.set_type.replaceAll('_', ' ')],
      releaseDate: set.released_at,
      type: set.set_type
    }));

    res.status(200).json(filteredSets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
